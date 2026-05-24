"""문서 로더: data/ 폴더의 마크다운 파일을 딕셔너리로 변환합니다."""

from pathlib import Path


def load_documents(data_dir: str = "data") -> list[dict]:
    """data 디렉토리의 모든 .md 파일을 로드합니다.

    Returns:
        [{"page_content": "...", "source": "filename.md"}, ...]
    """
    documents: list[dict] = []
    data_path = Path(data_dir)

    if not data_path.exists():
        raise FileNotFoundError(f"데이터 디렉토리가 존재하지 않습니다: {data_dir}")

    for md_file in sorted(data_path.glob("*.md")):
        content = md_file.read_text(encoding="utf-8")
        if not content.strip():
            continue

        documents.append({
            "page_content": content,
            "source": md_file.name,
        })

    if not documents:
        raise ValueError(f"{data_dir} 디렉토리에 .md 파일이 없습니다.")

    return documents
