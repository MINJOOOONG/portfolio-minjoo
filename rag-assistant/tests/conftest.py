"""테스트 공통 픽스처.

모든 테스트는 외부 API를 호출하지 않습니다. Groq 호출은 respx 로 가로챕니다.
"""

from __future__ import annotations

import pytest

from rag.chunker import split_documents
from rag.embedder import build_index
from rag.loader import load_documents


@pytest.fixture(autouse=True)
def isolated_env(monkeypatch):
    """실행 환경의 RAG_* / GROQ_* 설정이 테스트에 새어 들어오지 않게 합니다."""
    for name in (
        "RAG_DATA_DIR",
        "RAG_CHUNK_SIZE",
        "RAG_CHUNK_OVERLAP",
        "RAG_TOP_K",
        "RAG_SCORE_THRESHOLD",
        "GROQ_API_KEY",
        "GROQ_MODEL",
    ):
        monkeypatch.delenv(name, raising=False)


@pytest.fixture
def sample_documents() -> list[dict]:
    """검색 동작 검증용 소형 코퍼스."""
    return [
        {
            "source": "alpha.md",
            "page_content": (
                "# Alpha 프로젝트\n\n"
                "## 개요\n\n"
                "Alpha 프로젝트는 Kafka를 사용해 주문 이벤트를 비동기로 처리합니다.\n"
                "Spring Boot 기반 백엔드로 구현했습니다.\n"
            ),
        },
        {
            "source": "beta.md",
            "page_content": (
                "# Beta 프로젝트\n\n"
                "## 기술 스택\n\n"
                "Beta 프로젝트는 Next.js와 TypeScript로 만든 프론트엔드입니다.\n"
                "Three.js로 3D 배경을 렌더링합니다.\n"
            ),
        },
        {
            "source": "gamma.md",
            "page_content": (
                "# Gamma 문서\n\n"
                "## 검색\n\n"
                "Gamma 문서는 TF-IDF 검색 인덱스를 설명합니다.\n"
                "형태소 분석기 없이 한국어 조사를 처리합니다.\n"
            ),
        },
    ]


@pytest.fixture
def sample_index(sample_documents):
    return build_index(split_documents(sample_documents))


@pytest.fixture(scope="session")
def portfolio_chunks() -> list[dict]:
    """실제 data/*.md 로 만든 청크 (통합 검증용)."""
    from rag.config import DEFAULT_DATA_DIR

    return split_documents(load_documents(DEFAULT_DATA_DIR))


@pytest.fixture(scope="session")
def portfolio_index(portfolio_chunks):
    return build_index(portfolio_chunks)
