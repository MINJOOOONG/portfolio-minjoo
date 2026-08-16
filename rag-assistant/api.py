"""Portfolio RAG API — FastAPI 서버 (경량 키워드 검색 버전)

Next.js 포트폴리오 사이트에서 호출하는 RAG 백엔드입니다.
POST /ask 엔드포인트로 질문을 받아 키워드 검색 + LLM 답변을 반환합니다.

응답 계약(프론트엔드 호환): `{"answer": str, "sources": list[str]}`
근거를 찾지 못하면 LLM을 호출하지 않고 `sources: []` 와 함께 no-evidence
문구를 반환합니다.
"""

from __future__ import annotations

import logging
import time
import uuid
from contextlib import asynccontextmanager
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from rag.chain import (
    PROMPT_VERSION,
    LLMError,
    build_timeout,
    generate_answer,
    no_evidence_answer,
    user_facing_error,
)
from rag.chunker import split_documents
from rag.config import get_settings
from rag.embedder import KeywordIndex, build_index
from rag.language import detect_language
from rag.loader import load_documents
from rag.observability import log_event, metrics, question_fingerprint
from rag.retriever import (
    format_context,
    get_source_list,
    retrieve_documents,
    summarize_scores,
)

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
)

# ── 검색 인덱스를 앱 전역에서 공유 ──
search_index: Optional[KeywordIndex] = None

# ── LLM 호출용 AsyncClient (lifespan 에서 생성/종료) ──
http_client: Optional[httpx.AsyncClient] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """서버 시작 시 검색 인덱스와 HTTP 클라이언트를 준비합니다."""
    global search_index, http_client

    settings = get_settings()
    docs = load_documents(settings.data_dir)
    chunks = split_documents(
        docs,
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
    )
    search_index = build_index(chunks)
    http_client = httpx.AsyncClient(timeout=build_timeout())

    log_event(
        "index_built",
        documents=len(docs),
        chunks=len(chunks),
        prompt_version=PROMPT_VERSION,
        **settings.as_dict(),
    )

    try:
        yield
    finally:
        if http_client is not None:
            await http_client.aclose()
            http_client = None
        log_event("shutdown")


app = FastAPI(title="Portfolio RAG API", lifespan=lifespan)

# ── CORS 설정 ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://portfolio-minjoo.vercel.app",
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# ── 요청/응답 스키마 ──
class AskRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2_000)


class AskResponse(BaseModel):
    answer: str
    sources: list[str]


# ── 엔드포인트 ──
@app.post("/ask", response_model=AskResponse)
async def ask(req: AskRequest):
    """질문을 받아 RAG 파이프라인으로 답변을 생성합니다."""
    request_id = uuid.uuid4().hex[:12]
    settings = get_settings()
    language = detect_language(req.question)
    started = time.perf_counter()

    base_log = {
        "request_id": request_id,
        "prompt_version": PROMPT_VERSION,
        "model": settings.model,
        "question_length": len(req.question),
        "question_hash": question_fingerprint(req.question),
        "language": language,
        "score_threshold": settings.score_threshold,
    }

    metrics.increment("request_total")

    if search_index is None:
        metrics.increment("index_not_ready_total")
        log_event("ask_failed", status="index_not_ready", **base_log)
        return AskResponse(
            answer="검색 인덱스가 아직 준비되지 않았습니다.",
            sources=[],
        )

    # 1. 질문 → 키워드 인덱스에서 관련 문서 검색
    retrieval_started = time.perf_counter()
    retrieved_docs = retrieve_documents(search_index, req.question)
    retrieval_ms = _elapsed_ms(retrieval_started)

    sources = get_source_list(retrieved_docs)
    score_summary = summarize_scores(retrieved_docs)

    # 2. 근거가 없으면 LLM을 호출하지 않고 no-evidence 응답을 반환
    if not retrieved_docs:
        metrics.increment("no_evidence_total")
        total_ms = _elapsed_ms(started)
        metrics.observe_latency(total_ms)
        log_event(
            "ask_completed",
            status="no_evidence",
            no_evidence=True,
            source_count=0,
            score_summary=score_summary,
            retrieval_ms=retrieval_ms,
            llm_ms=None,
            total_ms=total_ms,
            **base_log,
        )
        return AskResponse(answer=no_evidence_answer(req.question), sources=[])

    # 3. context + 질문 → LLM 답변 생성
    context = format_context(retrieved_docs)
    llm_started = time.perf_counter()
    try:
        answer = await generate_answer(context, req.question, client=http_client)
    except LLMError as exc:
        metrics.increment("llm_error_total")
        metrics.increment(f"llm_error_type:{exc.error_type}")
        total_ms = _elapsed_ms(started)
        metrics.observe_latency(total_ms)
        # 오류 원인은 서버 로그에만 남기고 사용자에게는 안정적인 문구를 반환합니다.
        log_event(
            "ask_failed",
            status="llm_error",
            error_type=exc.error_type,
            error_detail=exc.detail,
            source_count=len(sources),
            score_summary=score_summary,
            retrieval_ms=retrieval_ms,
            llm_ms=_elapsed_ms(llm_started),
            total_ms=total_ms,
            **base_log,
        )
        return AskResponse(
            answer=user_facing_error(req.question, exc.error_type),
            sources=[],
        )

    llm_ms = _elapsed_ms(llm_started)
    total_ms = _elapsed_ms(started)
    metrics.observe_latency(total_ms)
    log_event(
        "ask_completed",
        status="ok",
        no_evidence=False,
        source_count=len(sources),
        score_summary=score_summary,
        retrieval_ms=retrieval_ms,
        llm_ms=llm_ms,
        total_ms=total_ms,
        **base_log,
    )

    return AskResponse(answer=answer, sources=sources)


@app.get("/health")
async def health():
    """헬스 체크: 인덱스 준비 여부와 현재 설정을 반환합니다."""
    settings = get_settings()
    return {
        "status": "ok" if search_index is not None else "starting",
        "index_ready": search_index is not None,
        "chunk_count": len(search_index.chunks) if search_index else 0,
        "prompt_version": PROMPT_VERSION,
        **settings.as_dict(),
    }


@app.get("/metrics")
async def metrics_endpoint():
    """프로세스 인메모리 지표(JSON). Prometheus 형식이 아닙니다."""
    return metrics.snapshot()


def _elapsed_ms(started: float) -> float:
    return round((time.perf_counter() - started) * 1000, 2)
