# MJ.dev Portfolio

QA 경험을 가진 풀스택 개발자의 포트폴리오 웹사이트입니다.
Three.js 3D 배경, GSAP/Framer Motion 애니메이션, RAG 기반 AI 어시스턴트, 관리자 CMS를 갖춘 인터랙티브 포트폴리오입니다.

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + shadcn/ui |
| **Database** | Neon Postgres + Prisma 7 ORM |
| **3D Graphics** | Three.js + React Three Fiber / Drei |
| **Animation** | Framer Motion, GSAP (ScrollTrigger) |
| **Smooth Scroll** | Lenis |
| **PDF** | @react-pdf/renderer, react-pdf |
| **AI Assistant** | FastAPI + Groq API (llama-3.1-8b-instant) |
| **Deployment** | Vercel (앱) + Render/Railway (RAG API) |

## 주요 기능

- **KR/EN 다국어 지원** — Context 기반 언어 전환, 120+ 번역 문자열
- **Three.js 3D 배경** — 와이어프레임 오브젝트, 파티클, 마우스 인터랙션, 스크롤 패럴랙스
- **스크롤 애니메이션** — Scroll reveal (스프링 바운스), stagger reveal, GSAP ScrollTrigger
- **관리자 CMS** — 프로젝트, 블로그, 사이트 설정 CRUD + 재배포 없이 실시간 반영
- **RAG AI 어시스턴트** — 포트폴리오 컨텍스트 기반 AI 채팅 (FastAPI + Groq)
- **Markdown 블로그** — remark-gfm 기반 마크다운 렌더링
- **PDF 이력서 생성** — @react-pdf/renderer로 동적 PDF 생성 및 다운로드
- **연락 폼** — IP 기반 Rate Limiting (분당 3회) + 메시지 관리
- **httpOnly cookie 인증** — timing-safe 비밀번호 비교, 24시간 세션 만료

## 포트폴리오 섹션

| 섹션 | 설명 |
|------|------|
| **About** | 5가지 핵심 역량 (호버 시 상세 설명) |
| **Experience** | 타임라인 기반 경력 사항 |
| **Projects** | 프로젝트 카드 + 플로팅 모달 상세 (콘텐츠 블록 시스템) |
| **AI Lab** | AI 원칙, Claude.md, 스킬 규칙, 디자인 규칙, AI 도구, 미디어 노트 (6개 탭) |
| **Articles** | 연구 논문 / 졸업 논문 PDF 뷰어 |
| **Skills** | 45+ 기술 스택 (6개 카테고리) |
| **Contact** | 프로필 카드 + 학력/자격증 + 연락처 링크 |

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일에서 아래 값을 설정하세요:

```
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
ADMIN_PASSWORD=<관리자-비밀번호>
RAG_API_URL=https://your-deployed-rag-api.com
```

### 3. Neon Postgres 설정

1. [Neon Console](https://console.neon.tech/)에서 프로젝트 생성
2. Connection string 복사
3. `.env`의 `DATABASE_URL`에 붙여넣기

### 4. DB 마이그레이션 및 시드

```bash
npm run db:push
npm run db:seed
```

### 5. 개발 서버 실행

```bash
npm run dev
```

## 관리자 페이지

- URL: `/admin`
- 비밀번호: `.env`의 `ADMIN_PASSWORD` 값
- 기능: 프로젝트/블로그/메시지 관리, 사이트 설정 편집

## 배포

### Next.js 앱 (Vercel)

1. GitHub에 push
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 환경변수 설정:
   - `DATABASE_URL`: Neon DB 연결 문자열
   - `ADMIN_PASSWORD`: 관리자 비밀번호
   - `RAG_API_URL`: 별도 배포한 RAG API 주소
4. 배포

### RAG AI 어시스턴트 (별도 서버)

AI 어시스턴트는 `rag-assistant/`의 FastAPI 서버로 동작하며, Vercel과 별도로 배포해야 합니다.

1. `rag-assistant/`를 Render, Railway, Fly.io 등에 별도 배포
2. RAG 서버 환경변수 설정:
   - `GROQ_API_KEY`: Groq API 키
   - `GROQ_MODEL`: `llama-3.1-8b-instant`
3. 배포된 RAG API 주소를 Vercel의 `RAG_API_URL`에 등록
   - 예: `https://portfolio-rag-api.onrender.com`

## 폴더 구조

```
src/
├── app/
│   ├── (public)/              # 공개 페이지 (포트폴리오, 블로그, 어시스턴트)
│   ├── admin/                 # 관리자 페이지 (대시보드, 프로젝트, 포스트, 메시지, 설정)
│   └── api/                   # API 라우트 (admin, contact, rag)
├── components/
│   ├── sections/              # 포트폴리오 7개 섹션 컴포넌트
│   ├── shared/                # 레이아웃, 네비게이션, 3D 배경, PDF 뷰어
│   ├── three/                 # Three.js 3D 씬 (엔트리, 포트폴리오)
│   ├── admin/                 # 관리자 UI 컴포넌트
│   └── ui/                    # shadcn/ui 기본 컴포넌트
├── hooks/                     # 커스텀 훅 (scroll-reveal, stagger-reveal, parallax)
├── lib/                       # 유틸리티 (prisma, auth, i18n, pdf, settings)
├── data/                      # 정적 데이터 (about, profile, ai-lab)
└── generated/prisma/          # Prisma 생성 클라이언트
prisma/
├── schema.prisma              # DB 스키마 (5 모델)
└── seed.ts                    # 초기 데이터
rag-assistant/                 # FastAPI RAG 서버 (Python)
docs/                          # 프로젝트 문서 (디자인 시스템, 섹션 스펙, AI 가이드)
```

## 디자인 시스템

- **테마**: Clean Document (에디토리얼, 미니멀, 라이트 모드 전용)
- **배경**: 노트북 느낌의 미세 그리드 패턴 (20px x 28px)
- **폰트**: Pretendard Variable (한국어 최적화) + Geist Mono
- **컬러**: 그레이 기반 (#37352F / #F7F6F3 / #FFFFFF) + 파스텔 액센트
- **Primary**: `#6C5CE7` (퍼플)

## 보안 참고사항

- 관리자 비밀번호는 반드시 환경변수로 관리 (코드에 하드코딩 금지)
- 운영 환경에서는 기본 비밀번호를 반드시 변경
- 모든 관리자 API는 서버에서 세션 검증
- httpOnly cookie로 세션 토큰 관리 (XSS 방지)
- timing-safe 비밀번호 비교 (타이밍 공격 방지)
- 연락 폼 IP 기반 Rate Limiting
