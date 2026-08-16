"""평가 데이터셋과 평가기 자체의 검증."""

from __future__ import annotations

import pytest

from evaluation.dataset import (
    REQUIRED_CATEGORIES,
    EvalCase,
    category_counts,
    load_cases,
    validate_cases,
    verify_expected_sources_exist,
)
from evaluation.run_retrieval_eval import (
    DEFAULT_MIN_NO_EVIDENCE_ACCURACY,
    DEFAULT_MIN_SOURCE_HIT_RATE,
    aggregate,
    evaluate_case,
)
from rag.config import DEFAULT_DATA_DIR


@pytest.fixture(scope="module")
def cases():
    return load_cases()


def test_dataset_loads_and_is_valid(cases):
    assert len(cases) >= 30


def test_all_required_categories_present(cases):
    assert REQUIRED_CATEGORIES <= {case.category for case in cases}


def test_minimum_category_distribution(cases):
    counts = category_counts(cases)
    assert counts["answerable"] >= 10
    assert counts["unanswerable"] >= 6
    assert counts["korean_paraphrase"] >= 5
    assert counts["false_premise"] >= 3
    assert counts["cross_project_confusion"] >= 3
    assert counts["english"] >= 3
    assert counts["partial_evidence"] >= 1


def test_expected_sources_reference_real_files(cases):
    verify_expected_sources_exist(cases, DEFAULT_DATA_DIR)


def test_case_ids_are_unique(cases):
    ids = [case.id for case in cases]
    assert len(ids) == len(set(ids))


def test_expected_keywords_appear_in_their_source_documents(cases):
    """expected_keywords 는 실제 문서에 존재하는 문자열이어야 한다.

    문서에 없는 내용을 정답으로 삼으면 평가 자체가 근거 없는 기준이 됩니다.
    """
    from pathlib import Path

    contents = {
        path.name: path.read_text(encoding="utf-8").lower()
        for path in Path(DEFAULT_DATA_DIR).glob("*.md")
    }

    for case in cases:
        for keyword in case.expected_keywords:
            assert any(
                keyword.lower() in contents[source]
                for source in case.expected_sources
            ), f"{case.id}: '{keyword}' 가 {case.expected_sources} 어디에도 없습니다."


def test_refusal_cases_have_no_expected_sources(cases):
    for case in cases:
        if case.expects_empty:
            assert case.expected_sources == []
            assert case.expected_keywords == []


def test_unconstrained_cases_explain_themselves(cases):
    unconstrained = [c for c in cases if c.retrieval_expectation == "unconstrained"]
    assert unconstrained
    for case in unconstrained:
        assert case.note, f"{case.id}: 검색 판정을 생략한 이유가 없습니다."


# ── 스키마 검증 자체의 회귀 방지 ───────────────────────────────────────


def _case(**kwargs) -> EvalCase:
    base = dict(
        id="x-001",
        category="answerable",
        question="질문",
        retrieval_expectation="evidence",
        expected_sources=["about.md"],
    )
    base.update(kwargs)
    return EvalCase(**base)


def test_validation_rejects_duplicate_ids():
    with pytest.raises(ValueError, match="중복"):
        validate_cases([_case(), _case()] + _minimum_category_cases())


def test_validation_rejects_unknown_expectation():
    with pytest.raises(ValueError, match="retrieval_expectation"):
        validate_cases([_case(retrieval_expectation="maybe")] + _minimum_category_cases())


def test_validation_rejects_evidence_case_without_sources():
    with pytest.raises(ValueError, match="expected_sources"):
        validate_cases([_case(expected_sources=[])] + _minimum_category_cases())


def test_validation_rejects_contradictory_case():
    with pytest.raises(ValueError):
        validate_cases([_case(should_refuse=True)] + _minimum_category_cases())


def _minimum_category_cases() -> list[EvalCase]:
    """카테고리 누락 검사를 통과시키기 위한 최소 케이스 묶음."""
    return [
        EvalCase(
            id=f"filler-{name}",
            category=name,
            question="질문",
            retrieval_expectation="evidence",
            expected_sources=["about.md"],
        )
        for name in REQUIRED_CATEGORIES
    ]


# ── 평가기 동작 ────────────────────────────────────────────────────────


def test_evaluate_case_marks_unconstrained_as_not_applicable(portfolio_index):
    case = EvalCase(
        id="x",
        category="cross_project_confusion",
        question="QA Minjoo Helper에서 Kafka를 어떻게 활용했나요?",
        retrieval_expectation="unconstrained",
        should_refuse=True,
        note="검색 단계에서 판정하지 않음",
    )
    result = evaluate_case(portfolio_index, case)
    assert result["status"] == "not_applicable"
    assert result["passed"] is False


def test_aggregate_excludes_not_applicable_from_rates(portfolio_index):
    cases = [
        EvalCase(
            id="hit",
            category="answerable",
            question="Loopers 백엔드에서 쓴 메시지 큐는?",
            retrieval_expectation="evidence",
            expected_sources=["loopers-backend.md"],
        ),
        EvalCase(
            id="skip",
            category="cross_project_confusion",
            question="졸업논문에서 Groq LLM을 어떻게 썼나요?",
            retrieval_expectation="unconstrained",
            should_refuse=True,
            note="검색 단계에서 판정하지 않음",
        ),
    ]
    results = [evaluate_case(portfolio_index, c) for c in cases]
    metrics = aggregate(results, cases)

    assert metrics["total_cases"] == 2
    assert metrics["asserted_cases"] == 1
    assert metrics["not_asserted_cases"] == 1
    assert metrics["source_hit_rate"] == 1.0


def test_retrieval_evaluation_meets_thresholds(portfolio_index, cases):
    """현재 코드가 평가 기준을 실제로 만족하는지 pytest 에서도 확인한다."""
    results = [evaluate_case(portfolio_index, case) for case in cases]
    metrics = aggregate(results, cases)

    assert metrics["source_hit_rate"] >= DEFAULT_MIN_SOURCE_HIT_RATE
    assert metrics["no_evidence_routing_accuracy"] >= DEFAULT_MIN_NO_EVIDENCE_ACCURACY


def test_answerable_category_has_no_retrieval_failures(portfolio_index, cases):
    answerable = [c for c in cases if c.category == "answerable"]
    failures = [
        evaluate_case(portfolio_index, c)
        for c in answerable
        if evaluate_case(portfolio_index, c)["status"] == "fail"
    ]
    assert failures == [], [f["id"] for f in failures]
