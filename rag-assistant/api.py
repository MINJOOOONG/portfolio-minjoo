"""Portfolio RAG API — FastAPI 서버 (경량 키워드 검색 버전)

Next.js 포트폴리오 사이트에서 호출하는 RAG 백엔드입니다.
POST /ask 엔드포인트로 질문을 받아 키워드 검색 + LLM 답변을 반환합니다.
"""

import os
from contextlib import asynccontextmanager
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag.loader import load_documents
from rag.chunker import split_documents
from rag.embedder import build_index, KeywordIndex
from rag.retriever import retrieve_documents, format_context, get_source_list
from rag.chain import generate_answer

load_dotenv()

# ── 검색 인덱스를 앱 전역에서 공유 ──
search_index: Optional[KeywordIndex] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """서버 시작 시 키워드 검색 인덱스를 빌드합니다."""
    global search_index
    print("[RAG API] 키워드 인덱스 빌드 시작...")
    docs = load_documents("data")
    chunks = split_documents(docs)
    search_index = build_index(chunks)
    print(f"[RAG API] 인덱스 빌드 완료 (문서 {len(docs)}개 → 청크 {len(chunks)}개)")
    yield


app = FastAPI(title="Portfolio RAG API", lifespan=lifespan)

# ── CORS 설정 ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://portfolio-minjoo.vercel.app",
    ],
    allow_methods=["POST"],
    allow_headers=["*"],
)


# ── 요청/응답 스키마 ──
class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str
    sources: list[str]


# ── 엔드포인트 ──
@app.post("/ask", response_model=AskResponse)
async def ask(req: AskRequest):
    """질문을 받아 RAG 파이프라인으로 답변을 생성합니다."""
    if search_index is None:
        return AskResponse(
            answer="검색 인덱스가 아직 준비되지 않았습니다.",
            sources=[],
        )

    # 1. 질문 → 키워드 인덱스에서 관련 문서 검색
    retrieved_docs = retrieve_documents(search_index, req.question)

    # 2. 검색된 문서 → context 구성
    context = format_context(retrieved_docs)

    # 3. context + 질문 → LLM 답변 생성
    answer = generate_answer(context, req.question)

    # 4. 참고 문서 목록
    sources = get_source_list(retrieved_docs)

    return AskResponse(answer=answer, sources=sources)
