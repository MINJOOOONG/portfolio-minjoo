"""검색 테스트: 키워드 매칭, 한국어 조사 변형, threshold, no-evidence 동작."""

from __future__ import annotations

import pytest

from rag.embedder import build_index
from rag.retriever import (
    MAX_CONTEXT_CHARS,
    format_context,
    get_source_list,
    retrieve_documents,
    summarize_scores,
)


def _sources(docs):
    return [d["source"] for d in docs]


# ── 기본 매칭 ──────────────────────────────────────────────────────────


def test_exact_keyword_match_returns_right_document(sample_index):
    docs = retrieve_documents(sample_index, "Kafka 주문 이벤트 처리")
    assert docs
    assert docs[0]["source"] == "alpha.md"


def test_results_carry_scores_in_unit_range(sample_index):
    docs = retrieve_documents(sample_index, "Kafka 주문 이벤트")
    assert docs
    for doc in docs:
        assert "score" in doc
        assert 0.0 <= doc["score"] <= 1.0


def test_results_sorted_by_descending_score(sample_index):
    docs = retrieve_documents(sample_index, "프로젝트 Kafka Next.js", score_threshold=0.0)
    scores = [d["score"] for d in docs]
    assert scores == sorted(scores, reverse=True)


def test_english_query_ranks_right_document_first(sample_index):
    docs = retrieve_documents(
        sample_index, "Which framework renders the 3D background?", score_threshold=0.0
    )
    assert docs and docs[0]["source"] == "beta.md"


# ── 한국어 조사·어미 변형 ───────────────────────────────────────────────


@pytest.mark.parametrize(
    "query",
    [
        "Kafka를 사용했나요?",
        "Kafka는 어떻게 썼나요?",
        "Kafka의 역할이 무엇인가요?",
        "Kafka에서 처리하는 이벤트는?",
    ],
)
def test_korean_particle_variants_rank_same_document_first(sample_index, query):
    """조사·어미가 바뀌어도 같은 문서가 1위여야 한다.

    threshold 는 실제 코퍼스 기준으로 보정된 값이라, 문서 3개짜리 픽스처에서는
    IDF 분포가 달라 절대 점수를 비교하는 의미가 없습니다. 여기서는 순위만 봅니다.
    (threshold 동작은 아래 실제 코퍼스 테스트에서 검증합니다.)
    """
    docs = retrieve_documents(sample_index, query, score_threshold=0.0)
    assert docs and docs[0]["source"] == "alpha.md", (
        f"{query} 의 1위가 alpha.md 가 아닙니다: {_sources(docs)}"
    )


def test_inflected_token_is_normalized_to_stem(sample_index):
    """'프로젝트에서는' 같은 활용형이 '프로젝트'로 정규화되어야 한다."""
    assert sample_index.canonical_term("프로젝트에서는") == "프로젝트"
    assert sample_index.canonical_term("프로젝트를") == "프로젝트"


def test_unrelated_compound_is_not_stemmed_into_corpus_word():
    """'블록체인' 이 '블록' 으로 잘려 오탐되면 안 된다. (접두어 stemming 회귀)"""
    index = build_index(
        [{"page_content": "코드 블록 렌더링을 지원합니다.", "source": "a.md"}]
    )
    assert index.canonical_term("블록체인") == "블록체인"


def test_substring_query_matches_longer_token(sample_index):
    """'Spring' 처럼 문서 토큰의 일부인 질의도 찾을 수 있어야 한다."""
    docs = retrieve_documents(sample_index, "Spring Boot 백엔드", score_threshold=0.1)
    assert "alpha.md" in _sources(docs)


# ── no-evidence threshold ─────────────────────────────────────────────


def test_unrelated_question_returns_empty(sample_index):
    docs = retrieve_documents(sample_index, "양자컴퓨팅 큐비트 오류정정 알고리즘은?")
    assert docs == []


def test_never_falls_back_to_first_chunks(sample_index):
    """점수가 0이어도 코퍼스 앞부분을 반환하면 안 된다. (fallback 제거 회귀)"""
    for query in (
        "블록체인 스마트컨트랙트 감사",
        "!!!???",
        "quantum chromodynamics lattice simulation",
        "반려동물 이름",
    ):
        docs = retrieve_documents(sample_index, query)
        assert docs == [], f"{query!r} 가 임의 문서를 반환했습니다: {_sources(docs)}"


def test_empty_query_returns_empty(sample_index):
    assert retrieve_documents(sample_index, "") == []
    assert retrieve_documents(sample_index, "   ") == []


def test_threshold_is_configurable_via_environment(sample_index, monkeypatch):
    query = "Kafka 이벤트"

    monkeypatch.setenv("RAG_SCORE_THRESHOLD", "0.0")
    permissive = retrieve_documents(sample_index, query)

    monkeypatch.setenv("RAG_SCORE_THRESHOLD", "0.99")
    strict = retrieve_documents(sample_index, query)

    assert len(permissive) > len(strict)
    assert strict == []


def test_top_k_is_configurable_via_environment(sample_index, monkeypatch):
    monkeypatch.setenv("RAG_SCORE_THRESHOLD", "0.0")
    monkeypatch.setenv("RAG_TOP_K", "1")
    assert len(retrieve_documents(sample_index, "프로젝트")) == 1


def test_explicit_arguments_override_settings(sample_index, monkeypatch):
    monkeypatch.setenv("RAG_SCORE_THRESHOLD", "0.99")
    docs = retrieve_documents(sample_index, "Kafka 이벤트", score_threshold=0.0)
    assert docs


def test_non_positive_top_k_returns_empty(sample_index):
    assert sample_index.search("Kafka", top_k=0) == []


# ── 실제 코퍼스 통합 검증 ───────────────────────────────────────────────


def test_real_corpus_finds_grounded_answer(portfolio_index):
    docs = retrieve_documents(portfolio_index, "Loopers 백엔드에서 쓴 메시지 큐는?")
    assert "loopers-backend.md" in _sources(docs)


@pytest.mark.parametrize(
    "query",
    [
        "토스에서 어떤 일을 했나요?",
        "토스에서는 무슨 업무를 했어?",
        "토스의 QA 업무를 알려주세요",
        "토스에서 맡은 역할은?",
    ],
)
def test_real_corpus_handles_korean_particle_variants(portfolio_index, query):
    """실제 코퍼스 + 기본 threshold 로 조사 변형을 흡수하는지 확인."""
    docs = retrieve_documents(portfolio_index, query)
    assert docs, f"{query} 에서 근거를 찾지 못했습니다."
    assert {"experience.md", "resume.md", "about.md"} & set(_sources(docs))


def test_real_corpus_english_query(portfolio_index):
    docs = retrieve_documents(portfolio_index, "Where did Minjoo work as a QA Engineer?")
    assert {"experience.md", "resume.md", "about.md"} & set(_sources(docs))


def test_real_corpus_refuses_absent_topic(portfolio_index):
    for query in (
        "서민주의 토익 점수는 몇 점인가요?",
        "서민주가 다닌 고등학교는 어디인가요?",
        "서민주는 Flutter 앱을 몇 개 출시했나요?",
    ):
        assert retrieve_documents(portfolio_index, query) == [], query


# ── context / source 가공 ──────────────────────────────────────────────


def test_source_list_deduplicates_preserving_order():
    docs = [
        {"source": "b.md", "page_content": "x"},
        {"source": "a.md", "page_content": "y"},
        {"source": "b.md", "page_content": "z"},
        {"source": "a.md", "page_content": "w"},
    ]
    assert get_source_list(docs) == ["b.md", "a.md"]


def test_source_list_handles_missing_source():
    assert get_source_list([{"page_content": "x"}]) == ["unknown"]


def test_source_list_of_empty_result_is_empty():
    assert get_source_list([]) == []


def test_context_is_capped_at_6000_chars():
    docs = [
        {"source": f"doc{i}.md", "page_content": "가" * 5_000} for i in range(10)
    ]
    context = format_context(docs)
    assert len(context) <= MAX_CONTEXT_CHARS + 4  # 잘림 표시("\n...") 허용
    assert MAX_CONTEXT_CHARS == 6_000


def test_context_includes_source_labels(sample_index):
    docs = retrieve_documents(sample_index, "Kafka 이벤트")
    context = format_context(docs)
    assert "출처: alpha.md" in context


def test_context_of_empty_result_is_empty():
    assert format_context([]) == ""


def test_score_summary_shape(sample_index):
    docs = retrieve_documents(sample_index, "Kafka 이벤트")
    summary = summarize_scores(docs)
    assert summary["count"] == len(docs)
    assert summary["max"] >= summary["min"]

    empty = summarize_scores([])
    assert empty == {"count": 0, "max": None, "min": None, "mean": None}
