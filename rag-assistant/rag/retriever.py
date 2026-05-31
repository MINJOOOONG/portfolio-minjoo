"""검색기: 질문과 관련된 문서 chunk를 키워드 인덱스에서 검색합니다."""

from rag.embedder import KeywordIndex

MAX_CONTEXT_CHARS = 6_000
MAX_CHUNK_CHARS = 1_000


def retrieve_documents(
    index: KeywordIndex,
    query: str,
    top_k: int = 8,
) -> list[dict]:
    """질문 키워드를 기반으로 관련 문서를 검색합니다."""
    return index.search(query, top_k=top_k)


def format_context(documents: list[dict]) -> str:
    """검색된 문서들을 LLM 프롬프트에 넣을 context 문자열로 변환합니다."""
    context_parts: list[str] = []

    for i, doc in enumerate(documents, 1):
        source = doc.get("source", "unknown")
        content = doc["page_content"].strip()
        if len(content) > MAX_CHUNK_CHARS:
            content = content[:MAX_CHUNK_CHARS].rstrip() + "\n..."

        context_parts.append(
            f"[문서 {i}] (출처: {source})\n{content}"
        )

    context = "\n\n---\n\n".join(context_parts)
    if len(context) > MAX_CONTEXT_CHARS:
        context = context[:MAX_CONTEXT_CHARS].rstrip() + "\n..."

    return context


def get_source_list(documents: list[dict]) -> list[str]:
    """검색된 문서에서 중복 없는 source 파일명 목록을 반환합니다."""
    sources: list[str] = []
    seen: set[str] = set()

    for doc in documents:
        source = doc.get("source", "unknown")
        if source not in seen:
            sources.append(source)
            seen.add(source)

    return sources
