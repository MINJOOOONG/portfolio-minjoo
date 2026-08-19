"""런타임 설정: 환경변수로 조절 가능한 RAG 파라미터를 한곳에서 관리합니다.

모든 값은 환경변수로 덮어쓸 수 있고, 잘못된 값이 들어오면 기본값으로 되돌립니다.
평가 스크립트와 API 서버가 동일한 설정을 공유하도록 하는 것이 목적입니다.
"""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

# ── 기본값 ──
DEFAULT_CHUNK_SIZE = 800
DEFAULT_CHUNK_OVERLAP = 150
DEFAULT_TOP_K = 6
# 평가 세트(evaluation/cases.json) 위에서 threshold 를 스윕해 고른 값입니다.
# 0.40 미만에서는 근거 없는 질문이 새어 나가고, 0.42 이상에서는 answerable
# 질문의 검색 성공률이 급락합니다. 자세한 곡선은 README 를 참고하세요.
DEFAULT_SCORE_THRESHOLD = 0.40
DEFAULT_MODEL = "openai/gpt-oss-20b"

# 프로젝트 루트(= rag-assistant/) 기준 데이터 디렉터리
_PACKAGE_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DATA_DIR = str(_PACKAGE_ROOT / "data")


def _env_int(name: str, default: int) -> int:
    raw = os.getenv(name)
    if raw is None:
        return default
    try:
        return int(raw)
    except ValueError:
        return default


def _env_float(name: str, default: float) -> float:
    raw = os.getenv(name)
    if raw is None:
        return default
    try:
        return float(raw)
    except ValueError:
        return default


@dataclass(frozen=True)
class RagSettings:
    """RAG 파이프라인 설정 스냅샷."""

    data_dir: str = DEFAULT_DATA_DIR
    chunk_size: int = DEFAULT_CHUNK_SIZE
    chunk_overlap: int = DEFAULT_CHUNK_OVERLAP
    top_k: int = DEFAULT_TOP_K
    score_threshold: float = DEFAULT_SCORE_THRESHOLD
    model: str = DEFAULT_MODEL

    # LLM HTTP 타임아웃 (초)
    connect_timeout: float = 5.0
    read_timeout: float = 30.0
    write_timeout: float = 10.0
    pool_timeout: float = 5.0

    def as_dict(self) -> dict:
        return {
            "chunk_size": self.chunk_size,
            "chunk_overlap": self.chunk_overlap,
            "top_k": self.top_k,
            "score_threshold": self.score_threshold,
            "model": self.model,
        }


def get_settings() -> RagSettings:
    """환경변수를 읽어 현재 설정을 반환합니다.

    호출 시점에 환경변수를 읽으므로 테스트에서 monkeypatch 가 그대로 반영됩니다.
    """
    return RagSettings(
        data_dir=os.getenv("RAG_DATA_DIR", DEFAULT_DATA_DIR),
        chunk_size=_env_int("RAG_CHUNK_SIZE", DEFAULT_CHUNK_SIZE),
        chunk_overlap=_env_int("RAG_CHUNK_OVERLAP", DEFAULT_CHUNK_OVERLAP),
        top_k=_env_int("RAG_TOP_K", DEFAULT_TOP_K),
        score_threshold=_env_float("RAG_SCORE_THRESHOLD", DEFAULT_SCORE_THRESHOLD),
        model=os.getenv("GROQ_MODEL", DEFAULT_MODEL),
        connect_timeout=_env_float("RAG_LLM_CONNECT_TIMEOUT", 5.0),
        read_timeout=_env_float("RAG_LLM_READ_TIMEOUT", 30.0),
        write_timeout=_env_float("RAG_LLM_WRITE_TIMEOUT", 10.0),
        pool_timeout=_env_float("RAG_LLM_POOL_TIMEOUT", 5.0),
    )
