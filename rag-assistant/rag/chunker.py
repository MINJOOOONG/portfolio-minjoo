"""문서 분할기: 문서를 chunk 단위로 분리합니다. (순수 Python 구현)"""

import re


def split_documents(
    documents: list[dict],
    chunk_size: int = 500,
    chunk_overlap: int = 100,
) -> list[dict]:
    """Document 리스트를 chunk 단위로 분할합니다.

    마크다운 구조를 고려하여 헤더, 줄바꿈 단위로 분할합니다.
    """
    separators = ["\n## ", "\n### ", "\n\n", "\n"]
    chunks: list[dict] = []

    for doc in documents:
        text = doc["page_content"]
        source = doc["source"]
        parts = _recursive_split(text, separators, chunk_size)

        for part in parts:
            part = part.strip()
            if not part:
                continue
            chunks.append({
                "page_content": part,
                "source": source,
            })

    return chunks


def _recursive_split(text: str, separators: list[str], chunk_size: int) -> list[str]:
    """재귀적으로 텍스트를 분할합니다."""
    if len(text) <= chunk_size:
        return [text]

    for sep in separators:
        parts = text.split(sep)
        if len(parts) > 1:
            result: list[str] = []
            current = ""
            for part in parts:
                candidate = current + sep + part if current else part
                if len(candidate) <= chunk_size:
                    current = candidate
                else:
                    if current:
                        result.append(current)
                    current = part
            if current:
                result.append(current)
            return result

    # 마지막 수단: 글자 수 기준 자르기
    result = []
    for i in range(0, len(text), chunk_size):
        result.append(text[i:i + chunk_size])
    return result
