"""검색기: 질문과 유사한 문서 chunk를 벡터스토어에서 검색합니다."""

from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS


def retrieve_documents(
    vectorstore: FAISS,
    query: str,
    top_k: int = 4,
) -> list[Document]:
    """질문을 임베딩하여 벡터스토어에서 유사도 기반으로 관련 문서를 검색합니다.

    Args:
        vectorstore: FAISS 벡터스토어
        query: 사용자 질문
        top_k: 반환할 상위 문서 수

    Returns:
        유사도가 높은 상위 k개의 Document 리스트
    """
    results = vectorstore.similarity_search(query, k=top_k)
    return results


def format_context(documents: list[Document]) -> str:
    """검색된 문서들을 LLM 프롬프트에 넣을 context 문자열로 변환합니다."""
    context_parts: list[str] = []

    for i, doc in enumerate(documents, 1):
        source = doc.metadata.get("source", "unknown")
        context_parts.append(
            f"[문서 {i}] (출처: {source})\n{doc.page_content}"
        )

    return "\n\n---\n\n".join(context_parts)


def get_source_list(documents: list[Document]) -> list[str]:
    """검색된 문서에서 중복 없는 source 파일명 목록을 반환합니다."""
    sources: list[str] = []
    seen: set[str] = set()

    for doc in documents:
        source = doc.metadata.get("source", "unknown")
        if source not in seen:
            sources.append(source)
            seen.add(source)

    return sources
