"""문서 분할기: Document를 chunk 단위로 분리합니다."""

from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


def split_documents(
    documents: list[Document],
    chunk_size: int = 500,
    chunk_overlap: int = 100,
) -> list[Document]:
    """Document 리스트를 chunk 단위로 분할합니다.

    마크다운 구조를 고려하여 헤더, 줄바꿈, 문장 단위로 분할합니다.
    각 chunk에 원본 source 메타데이터가 유지됩니다.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        separators=["\n## ", "\n### ", "\n\n", "\n", " "],
    )

    chunks = splitter.split_documents(documents)
    return chunks
