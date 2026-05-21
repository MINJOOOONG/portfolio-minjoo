"""문서 로더: data/ 폴더의 마크다운 파일을 LangChain Document로 변환합니다."""

import os
from pathlib import Path

from langchain_core.documents import Document


def load_documents(data_dir: str = "data") -> list[Document]:
    """data 디렉토리의 모든 .md 파일을 Document 객체로 로드합니다.

    각 Document의 metadata에 원본 파일명(source)을 저장합니다.
    """
    documents: list[Document] = []
    data_path = Path(data_dir)

    if not data_path.exists():
        raise FileNotFoundError(f"데이터 디렉토리가 존재하지 않습니다: {data_dir}")

    for md_file in sorted(data_path.glob("*.md")):
        content = md_file.read_text(encoding="utf-8")
        if not content.strip():
            continue

        doc = Document(
            page_content=content,
            metadata={"source": md_file.name},
        )
        documents.append(doc)

    if not documents:
        raise ValueError(f"{data_dir} 디렉토리에 .md 파일이 없습니다.")

    return documents
