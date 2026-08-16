"""문서 분할기: 문서를 chunk 단위로 분리합니다. (순수 Python 구현)

분할 전략
---------
1. 마크다운 헤더(`#`~`######`) 경계에서 먼저 자릅니다. 구분자를 잘라내지 않고
   뒤쪽 조각에 붙여 두므로 헤더 텍스트가 유실되지 않습니다.
2. 헤더 블록이 여전히 `chunk_size` 를 넘으면 빈 줄 → 줄바꿈 → 공백 순으로
   더 잘게 나눕니다. 어떤 경계도 없으면 마지막 수단으로 글자 수로 자릅니다.
3. 잘게 나뉜 조각들을 `chunk_size` 를 넘지 않는 선에서 다시 이어 붙입니다.
4. 인접 청크 사이에 `chunk_overlap` 글자만큼의 실제 중복 구간을 넣습니다.

따라서 각 청크의 본문은 `chunk_size` 이하이고, overlap 접두부를 포함한 전체
길이는 최대 `chunk_size + chunk_overlap` 입니다.
"""

from __future__ import annotations

import re

from rag.config import DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_SIZE

# 줄 시작의 마크다운 헤더 위치(헤더 문자는 소비하지 않음)
_HEADING_BOUNDARY = re.compile(r"(?m)(?=^#{1,6}[ \t])")


def split_documents(
    documents: list[dict],
    chunk_size: int = DEFAULT_CHUNK_SIZE,
    chunk_overlap: int = DEFAULT_CHUNK_OVERLAP,
) -> list[dict]:
    """Document 리스트를 chunk 단위로 분할합니다.

    Args:
        documents: `{"page_content": str, "source": str}` 리스트
        chunk_size: 청크 본문의 최대 글자 수 (1 이상)
        chunk_overlap: 인접 청크가 공유할 글자 수 (0 이상, chunk_size 미만)

    Returns:
        `{"page_content", "source", "chunk_index"}` 리스트

    Raises:
        ValueError: chunk_size / chunk_overlap 값이 유효하지 않은 경우
    """
    validate_chunk_params(chunk_size, chunk_overlap)

    chunks: list[dict] = []

    for doc in documents:
        text = doc.get("page_content") or ""
        source = doc.get("source", "unknown")

        bodies = _pack(_split_units(text, chunk_size), chunk_size)
        bodies = [b for b in (body.strip() for body in bodies) if b]
        overlapped = _apply_overlap(bodies, chunk_overlap)

        for index, content in enumerate(overlapped):
            chunks.append({
                "page_content": content,
                "source": source,
                "chunk_index": index,
            })

    return chunks


def validate_chunk_params(chunk_size: int, chunk_overlap: int) -> None:
    """chunk_size / chunk_overlap 조합이 유효한지 검사합니다."""
    if not isinstance(chunk_size, int) or isinstance(chunk_size, bool):
        raise ValueError("chunk_size는 정수여야 합니다.")
    if not isinstance(chunk_overlap, int) or isinstance(chunk_overlap, bool):
        raise ValueError("chunk_overlap은 정수여야 합니다.")
    if chunk_size <= 0:
        raise ValueError(f"chunk_size는 1 이상이어야 합니다. (받은 값: {chunk_size})")
    if chunk_overlap < 0:
        raise ValueError(
            f"chunk_overlap은 0 이상이어야 합니다. (받은 값: {chunk_overlap})"
        )
    if chunk_overlap >= chunk_size:
        raise ValueError(
            "chunk_overlap은 chunk_size보다 작아야 합니다. "
            f"(chunk_size={chunk_size}, chunk_overlap={chunk_overlap})"
        )


# ── 1단계: 의미 단위로 쪼개기 ──────────────────────────────────────────────


def _split_units(text: str, chunk_size: int) -> list[str]:
    """텍스트를 chunk_size 이하의 조각들로 나눕니다. (구분자 보존)"""
    if not text.strip():
        return []
    if len(text) <= chunk_size:
        return [text]

    for splitter in (
        _split_at_headings,
        _split_after_blank_line,
        _split_after_newline,
        _split_after_space,
    ):
        parts = splitter(text)
        if len(parts) > 1:
            units: list[str] = []
            for part in parts:
                units.extend(_split_units(part, chunk_size))
            return units

    return _hard_split(text, chunk_size)


def _split_at_headings(text: str) -> list[str]:
    """마크다운 헤더 앞에서 자릅니다. 헤더 문자는 뒤쪽 조각에 남습니다."""
    parts = [p for p in _HEADING_BOUNDARY.split(text) if p]
    return parts


def _split_after_blank_line(text: str) -> list[str]:
    return _split_keeping_separator(text, "\n\n")


def _split_after_newline(text: str) -> list[str]:
    return _split_keeping_separator(text, "\n")


def _split_after_space(text: str) -> list[str]:
    return _split_keeping_separator(text, " ")


def _split_keeping_separator(text: str, separator: str) -> list[str]:
    """구분자를 앞 조각 끝에 남긴 채 분할합니다. (문자 유실 없음)"""
    pieces = text.split(separator)
    if len(pieces) <= 1:
        return [text]

    parts = [piece + separator for piece in pieces[:-1]]
    if pieces[-1]:
        parts.append(pieces[-1])
    return parts


def _hard_split(text: str, chunk_size: int) -> list[str]:
    """마지막 수단: 경계가 전혀 없을 때 글자 수 기준으로 자릅니다."""
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]


# ── 2단계: chunk_size 한도까지 다시 이어 붙이기 ────────────────────────────


def _pack(units: list[str], chunk_size: int) -> list[str]:
    """조각들을 chunk_size 를 넘지 않는 선에서 순서대로 합칩니다."""
    packed: list[str] = []
    current = ""

    for unit in units:
        if not current:
            current = unit
            continue

        if len(current) + len(unit) <= chunk_size:
            current += unit
        else:
            packed.append(current)
            current = unit

    if current:
        packed.append(current)

    return packed


# ── 3단계: overlap 적용 ────────────────────────────────────────────────────


def _apply_overlap(bodies: list[str], chunk_overlap: int) -> list[str]:
    """인접 청크 앞에 직전 청크의 꼬리를 붙여 실제 중복 구간을 만듭니다."""
    if chunk_overlap <= 0 or len(bodies) < 2:
        return list(bodies)

    result = [bodies[0]]
    for index in range(1, len(bodies)):
        tail = _overlap_tail(bodies[index - 1], chunk_overlap)
        body = bodies[index]
        result.append(f"{tail}\n{body}" if tail else body)

    return result


def _overlap_tail(previous: str, chunk_overlap: int) -> str:
    """직전 청크의 마지막 chunk_overlap 글자를 단어 경계에 맞춰 잘라냅니다."""
    if chunk_overlap <= 0 or not previous:
        return ""

    tail = previous[-chunk_overlap:]
    if len(previous) > chunk_overlap:
        # 단어/줄 중간에서 시작하지 않도록 첫 공백 이후로 밀어냅니다.
        match = re.search(r"\s", tail)
        if match is not None:
            tail = tail[match.end():]

    return tail.strip()
