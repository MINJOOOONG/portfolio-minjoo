"""Portfolio RAG API — FastAPI 서버

Next.js 포트폴리오 사이트에서 호출하는 RAG 백엔드입니다.
POST /ask 엔드포인트로 질문을 받아 벡터스토어 검색 + LLM 답변을 반환합니다.
"""

import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from rag.loader import load_documents
from rag.chunker import split_documents
from rag.embedder import build_vectorstore, load_vectorstore
from rag.retriever import retrieve_documents, format_context, get_source_list
from rag.chain import generate_answer

load_dotenv()

# ── 벡터스토어를 앱 전역에서 공유 ──
vectorstore = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """서버 시작 시 벡터스토어를 로드합니다. 없으면 자동 빌드합니다."""
    global vectorstore
    try:
        vectorstore = load_vectorstore()
        print("[RAG API] 벡터스토어 로드 완료")
    except FileNotFoundError:
        print("[RAG API] 벡터스토어 없음 → 자동 빌드 시작...")
        docs = load_documents("data")
        chunks = split_documents(docs)
        vectorstore = build_vectorstore(chunks)
        print(f"[RAG API] 벡터스토어 빌드 완료 (문서 {len(docs)}개 → 청크 {len(chunks)}개)")
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


class RecommendedSection(BaseModel):
    label: str
    section_id: str


class AskResponse(BaseModel):
    answer: str
    sources: list[str]
    recommended_section: Optional[RecommendedSection] = None


# ── 섹션 추천 로직 ──
SECTION_RULES: list[tuple[list[str], list[str], str, str]] = [
    # (source 파일명 키워드, 질문 키워드, section_id, label)
    (
        ["experience.md"],
        ["근무", "경력", "회사", "토스", "toss", "부트캠프", "카페"],
        "experience",
        "Experience",
    ),
    (
        ["projects.md", "loopers-backend.md", "qa-minjoo-helper.md", "portfolio-site.md"],
        ["프로젝트", "project", "loopers", "helper", "포트폴리오", "블로그"],
        "projects",
        "Projects",
    ),
    (
        [],
        ["ai", "agent", "rag", "llm", "claude", "chatgpt", "도구"],
        "ai-lab",
        "AI Lab",
    ),
    (
        ["skills.md"],
        ["기술", "스택", "skill", "스킬", "언어", "프레임워크"],
        "skills",
        "Skills",
    ),
    (
        ["resume.md"],
        ["소개", "강점", "민주", "역량", "요약", "resume"],
        "about",
        "About",
    ),
    (
        [],
        ["연락", "메일", "email", "contact", "github", "linkedin"],
        "contact",
        "Contact",
    ),
]


def get_recommended_section(
    question: str, sources: list[str]
) -> Optional[RecommendedSection]:
    """질문과 source 파일명을 기반으로 관련 섹션을 추천합니다.

    질문 키워드를 먼저 전체 스캔한 뒤, 매칭되지 않으면 source 기반으로 판단합니다.
    """
    q_lower = question.lower()

    # 1차: 질문 키워드 매칭 (우선)
    for _, question_keywords, section_id, label in SECTION_RULES:
        if any(kw in q_lower for kw in question_keywords):
            return RecommendedSection(label=label, section_id=section_id)

    # 2차: source 파일명 매칭 (fallback)
    for source_keywords, _, section_id, label in SECTION_RULES:
        if any(sk in sources for sk in source_keywords):
            return RecommendedSection(label=label, section_id=section_id)

    return None


# ── 엔드포인트 ──
@app.post("/ask", response_model=AskResponse)
async def ask(req: AskRequest):
    """질문을 받아 RAG 파이프라인으로 답변을 생성합니다."""
    if vectorstore is None:
        return AskResponse(
            answer="벡터스토어가 아직 준비되지 않았습니다.",
            sources=[],
        )

    # 1. 질문 → 벡터스토어에서 관련 문서 검색
    retrieved_docs = retrieve_documents(vectorstore, req.question)

    # 2. 검색된 문서 → context 구성
    context = format_context(retrieved_docs)

    # 3. context + 질문 → LLM 답변 생성
    answer = generate_answer(context, req.question)

    # 4. 참고 문서 목록
    sources = get_source_list(retrieved_docs)

    # 5. 관련 섹션 추천
    recommended = get_recommended_section(req.question, sources)

    return AskResponse(answer=answer, sources=sources, recommended_section=recommended)
