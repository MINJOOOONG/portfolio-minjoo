# 포트폴리오 웹사이트 프로젝트

## 개요

서민주의 개인 포트폴리오 웹사이트입니다. AI Agent를 활용해 기획부터 디자인 설계, 프론트엔드, 백엔드, RAG 기반 AI 검색 기능까지 직접 구현한 인터랙티브 포트폴리오입니다. PPT 스타일 섹션 내비게이션, 커스텀 커서, Three.js 3D 배경을 적용했습니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- **스타일링**: Tailwind CSS v4 + shadcn/ui
- **3D/애니메이션**: Three.js + @react-three/fiber + @react-three/drei + Framer Motion + GSAP + Lenis
- **데이터베이스**: Prisma + Neon PostgreSQL (서버리스)
- **AI/RAG**: Python FastAPI + sentence-transformers (로컬 임베딩) + FAISS (벡터 검색) + Groq API (Llama 3.1 LLM)
- **배포**: Vercel (프론트엔드) + Render (RAG 서버)

## 아키텍처

3-레이어 독립 아키텍처로 설계되어 있습니다:

1. **Frontend (Vercel)**: Next.js App Router, RSC 기반 서버 렌더링, Three.js 3D 배경
2. **Data/CMS (Neon PostgreSQL)**: Prisma ORM, Admin 페이지에서 재배포 없이 콘텐츠 수정 가능
3. **AI/RAG (Render)**: Python FastAPI 서버, 순수 Python TF-IDF 기반 검색 + Groq LLM 답변 생성

## RAG AI Assistant

포트폴리오 안에 AI Assistant가 내장되어 있습니다. 사용자가 질문을 입력하면:

1. 마크다운 문서를 500자 단위로 청크 분할
2. TF-IDF 기반 유사도 검색으로 관련 문서를 찾음
3. Groq LLM(Llama 3.1-8b-instant)이 문맥 기반 답변 생성
4. 관련 섹션으로 자동 이동하는 AI Navigation 연결

RAG 서버는 순수 Python 기반으로 경량화되어 있으며, 외부 유료 서비스 없이 비용 0원으로 운영됩니다. 기존에는 sentence-transformers + FAISS를 사용했으나, Render 무료 티어의 메모리 제한(512MB)으로 인해 순수 Python TF-IDF 기반으로 변경했습니다.

## 핵심 기능

### PPT 스타일 섹션 내비게이션
- 7개 섹션(About, Experience, Projects, AI Lab, Articles, Skills, Contact)을 독립 화면 단위로 구성
- 상단 메뉴, 좌우 버튼, 슬라이드 인디케이터로 이동
- Projects·AI Lab은 내부 스크롤로 분리해 콘텐츠 스크롤과 섹션 이동이 충돌하지 않도록 처리

### 프로젝트 상세 모달
- contentBlocks 배열을 순회하며 블록 타입별 렌더링 (text, image, video, pdf, code, section-heading 등 14가지 타입)
- 모달 배경 스크롤 잠금, 키보드(Escape, ←→) 조작 지원

### Three.js 3D 배경
- React Three Fiber로 와이어프레임 도형 + 파티클 + 연결선 렌더링
- 섹션 전환에 따라 도형 밀도, 회전 속도가 React 상태와 연동

### 디자인 시스템
- design.md에 색상, 여백, 타이포그래피, 모션 규칙을 먼저 정의
- 섹션별 md 파일로 레이아웃을 분리해 일관된 디자인 유지

## 이 프로젝트에서 보여주는 역량

- AI Agent(Claude Code) 협업 개발 — 기획, 설계, 구현, 디버깅에 AI를 활용하고 QA 관점에서 검증
- Next.js 풀스택 개발 — RSC, App Router, Prisma CMS, Admin 페이지
- Three.js 3D 웹 구현 — React Three Fiber, 섹션 연동 애니메이션
- Python RAG 파이프라인 — TF-IDF 검색, Groq LLM, FastAPI
- 디자인 시스템 문서화 — design.md 기반 일관된 UI/UX 유지
- 비용 0원 AI 인프라 — 로컬 검색 + Groq 무료 티어 조합
