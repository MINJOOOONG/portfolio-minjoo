"""청킹 테스트: 크기, overlap, 마크다운 구조, 입력 검증."""

from __future__ import annotations

import pytest

from rag.chunker import DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE, split_documents


def _overlap_length(previous: str, current: str) -> int:
    """previous 의 접미사이면서 current 의 접두사인 가장 긴 문자열 길이."""
    limit = min(len(previous), len(current))
    for length in range(limit, 0, -1):
        if previous.endswith(current[:length]):
            return length
    return 0


def _long_document(paragraphs: int = 40) -> list[dict]:
    body = "\n\n".join(
        f"## 섹션 {i}\n\n섹션 {i} 의 본문입니다. " + "내용 " * 20
        for i in range(paragraphs)
    )
    return [{"page_content": body, "source": "long.md"}]


def test_defaults_are_800_and_150():
    """이력서에 적는 수치(800자 청크 / 150자 overlap)와 코드 기본값이 같아야 한다."""
    assert DEFAULT_CHUNK_SIZE == 800
    assert DEFAULT_CHUNK_OVERLAP == 150


def test_adjacent_chunks_actually_overlap():
    chunks = split_documents(_long_document())
    assert len(chunks) > 1

    for previous, current in zip(chunks, chunks[1:]):
        if previous["source"] != current["source"]:
            continue
        overlap = _overlap_length(previous["page_content"], current["page_content"])
        assert overlap > 0, (
            f"chunk {current['chunk_index']} 가 직전 청크와 겹치지 않습니다."
        )


def test_overlap_is_bounded_by_chunk_overlap():
    chunk_overlap = 150
    chunks = split_documents(_long_document(), chunk_overlap=chunk_overlap)

    for previous, current in zip(chunks, chunks[1:]):
        overlap = _overlap_length(previous["page_content"], current["page_content"])
        assert overlap <= chunk_overlap


def test_zero_overlap_produces_no_shared_text():
    chunks = split_documents(_long_document(), chunk_overlap=0)
    assert len(chunks) > 1

    for previous, current in zip(chunks, chunks[1:]):
        assert _overlap_length(previous["page_content"], current["page_content"]) == 0


def test_chunks_do_not_exceed_size_plus_overlap():
    chunk_size, chunk_overlap = 800, 150
    chunks = split_documents(
        _long_document(), chunk_size=chunk_size, chunk_overlap=chunk_overlap
    )

    for chunk in chunks:
        assert len(chunk["page_content"]) <= chunk_size + chunk_overlap


def test_real_corpus_chunks_stay_within_bounds(portfolio_chunks):
    for chunk in portfolio_chunks:
        assert len(chunk["page_content"]) <= DEFAULT_CHUNK_SIZE + DEFAULT_CHUNK_OVERLAP


def test_short_document_stays_single_chunk():
    docs = [{"page_content": "# 제목\n\n짧은 본문입니다.", "source": "short.md"}]
    chunks = split_documents(docs)

    assert len(chunks) == 1
    assert chunks[0]["page_content"] == "# 제목\n\n짧은 본문입니다."
    assert chunks[0]["source"] == "short.md"
    assert chunks[0]["chunk_index"] == 0


@pytest.mark.parametrize("content", ["", "   ", "\n\n\t\n"])
def test_empty_document_is_dropped_safely(content):
    assert split_documents([{"page_content": content, "source": "empty.md"}]) == []


def test_empty_document_list():
    assert split_documents([]) == []


def test_missing_page_content_does_not_crash():
    assert split_documents([{"source": "broken.md"}]) == []


@pytest.mark.parametrize(
    "chunk_size, chunk_overlap",
    [
        (0, 0),
        (-1, 0),
        (800, -1),
        (800, 800),
        (800, 900),
        (100, 100),
    ],
)
def test_invalid_parameters_are_rejected(chunk_size, chunk_overlap):
    with pytest.raises(ValueError):
        split_documents(
            [{"page_content": "본문", "source": "a.md"}],
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
        )


@pytest.mark.parametrize("bad", [None, "800", 8.5, True])
def test_non_integer_parameters_are_rejected(bad):
    with pytest.raises(ValueError):
        split_documents(
            [{"page_content": "본문", "source": "a.md"}], chunk_size=bad
        )


def test_markdown_headers_are_not_lost():
    """헤더 텍스트가 분할 과정에서 잘려 나가면 안 된다."""
    headers = [f"## 섹션 {i}" for i in range(30)]
    body = "\n\n".join(f"{h}\n\n" + "본문 내용 " * 25 for h in headers)
    chunks = split_documents([{"page_content": body, "source": "headers.md"}])

    combined = "\n".join(c["page_content"] for c in chunks)
    for header in headers:
        assert header in combined, f"{header} 가 유실되었습니다."


def test_header_marker_survives_when_chunk_starts_at_header():
    """'\\n## ' 로 split 하던 구현은 '## ' 접두어를 잘라먹었다. 회귀 방지."""
    body = "# 문서\n\n" + "\n\n".join(
        f"## 헤더 {i}\n\n" + "가나다라마바사 " * 40 for i in range(12)
    )
    chunks = split_documents([{"page_content": body, "source": "h.md"}])

    rendered = "\n".join(c["page_content"] for c in chunks)
    assert "## 헤더 0" in rendered
    assert "## 헤더 11" in rendered
    # 헤더 마커 없이 본문만 남은 형태가 있으면 안 된다
    assert rendered.count("헤더 5") >= 1
    assert "## 헤더 5" in rendered


def test_chunk_index_is_sequential_per_document():
    docs = _long_document() + [{"page_content": "짧은 문서", "source": "tiny.md"}]
    chunks = split_documents(docs)

    long_indices = [c["chunk_index"] for c in chunks if c["source"] == "long.md"]
    tiny_indices = [c["chunk_index"] for c in chunks if c["source"] == "tiny.md"]

    assert long_indices == list(range(len(long_indices)))
    assert tiny_indices == [0]


def test_no_content_is_dropped_between_chunks():
    """분할이 원문 문자를 잃지 않는지 확인 (구분자 보존)."""
    body = "\n\n".join(f"## S{i}\n\n" + f"고유토큰{i} " * 30 for i in range(20))
    chunks = split_documents([{"page_content": body, "source": "keep.md"}])
    rendered = " ".join(c["page_content"] for c in chunks)

    for i in range(20):
        assert f"고유토큰{i}" in rendered


def test_split_is_deterministic():
    docs = _long_document()
    assert split_documents(docs) == split_documents(docs)
