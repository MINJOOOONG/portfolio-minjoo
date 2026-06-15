# MJ.dev — 인터랙티브 포트폴리오 & CMS 플랫폼

> **QA 엔지니어 경험과 백엔드 개발 역량을 갖춘 풀스택 개발자 서민주(Minjoo Suh)의 포트폴리오 웹사이트.**
> 단순 정적 페이지가 아니라, **자체 CMS · 경량 RAG AI 어시스턴트 · 3D 인터랙션 · 보안 인증**을 직접 설계·구현한 풀스택 프로덕트입니다.

🔗 **Live**: [portfolio-minjoo.vercel.app](https://portfolio-minjoo.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/Neon_Postgres-Serverless-336791?logo=postgresql&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=threedotjs&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-RAG_API-009688?logo=fastapi&logoColor=white)

---

## 📌 한눈에 보기 (TL;DR)

| 무엇을 만들었나 | 어떻게 |
| --- | --- |
| **풀스택 포트폴리오 웹앱** | Next.js 16 App Router + React 19 + TypeScript, Vercel 서버리스 배포 |
| **자체 콘텐츠 관리 시스템(CMS)** | 프로젝트·블로그·사이트 설정을 **재배포 없이** 실시간 편집 (DB 기반 CRUD) |
| **경량 RAG AI 어시스턴트** | **벡터 DB 없이** 순수 Python TF-IDF 검색 + LLM 답변 생성 (메모리/비용 최적화) |
| **보안 중심 관리자 인증** | DB 세션 토큰 · httpOnly 쿠키 · **timing-safe 비교** · IP Rate Limiting |
| **3D 인터랙티브 경험** | Three.js + React Three Fiber, 프로젝트별 6개 커스텀 3D 씬 |
| **동적 PDF 이력서** | `@react-pdf/renderer`로 클라이언트에서 이력서 생성·다운로드 |

> 단순 토이 프로젝트가 아니라 **프론트엔드·백엔드·DB·LLM 인프라·보안**을 한 사람이 end-to-end로 책임진 프로덕트입니다.

---

## 🏗 아키텍처

이 프로젝트는 **두 개의 독립 배포 단위**로 구성됩니다. 무거운 LLM/검색 로직을 Next.js 서버리스 함수와 분리해, 각자 적합한 인프라에서 독립적으로 스케일·재배포되도록 설계했습니다.

```
┌─────────────────────────────────────┐        ┌──────────────────────────────┐
│   Next.js 16 App (Vercel)           │        │  RAG API (FastAPI / Python)  │
│                                     │        │  Render · Railway · Fly.io   │
│  • 포트폴리오 7개 섹션 (SSR/CSR)     │  POST  │                              │
│  • 관리자 CMS (/admin)              │ /ask   │  • TF-IDF 키워드 인덱스       │
│  • API Routes (admin/contact/rag)   │ ─────▶ │  • 문서 검색 → context 구성   │
│  • Three.js 3D · GSAP 애니메이션     │        │  • Groq LLM 답변 생성         │
│                                     │ ◀───── │    (llama-3.1-8b-instant)     │
│         │                           │ answer │                              │
│         ▼                           │        │  data/*.md (포트폴리오 지식)  │
│  Neon Postgres (Prisma 7 ORM)       │        └──────────────────────────────┘
│  Project · BlogPost · Message · …   │
└─────────────────────────────────────┘
```

**설계 의도**
- LLM 추론·검색 인덱스는 콜드스타트가 무겁고 메모리를 많이 쓰므로, Vercel 서버리스가 아닌 **상시 구동 Python 서버**로 분리.
- Next.js 앱은 정적·동적 렌더링과 CMS API에 집중 → 빠른 빌드·배포 사이클 유지.
- 두 서버는 `POST /ask` HTTP 인터페이스로만 통신해 결합도를 낮춤.

---

## 🛠 기술 스택

| 분류 | 기술 | 선택 이유 |
| --- | --- | --- |
| **Framework** | Next.js 16 (App Router, Turbopack) | 서버 컴포넌트 + 서버리스 API를 한 코드베이스에서 |
| **Language** | TypeScript 5 | 도메인 모델·API 타입 안정성 |
| **UI / Styling** | Tailwind CSS v4 + shadcn/ui + Radix(base-ui) | 빠른 디자인 시스템 구축, 접근성 확보 |
| **Database** | Neon Postgres (Serverless) + Prisma 7 ORM | 서버리스 환경에 맞는 커넥션 풀링(`@prisma/adapter-neon`) |
| **3D Graphics** | Three.js + React Three Fiber / Drei | 선언적 3D 씬 관리 |
| **Animation** | Framer Motion + GSAP(ScrollTrigger) | 컴포넌트 전환 + 스크롤 기반 연출 분리 |
| **Smooth Scroll** | Lenis | 관성 스크롤 + 패럴랙스 동기화 |
| **PDF** | `@react-pdf/renderer`, `react-pdf` | 클라이언트 동적 이력서 생성 / 논문 PDF 뷰어 |
| **Markdown** | react-markdown + remark-gfm + rehype-highlight | 블로그·문서 렌더링, 코드 하이라이트 |
| **AI Backend** | FastAPI + httpx + Groq API | 경량 RAG 서버, 비동기 LLM 호출 |
| **Auth/Security** | Node `crypto` (timingSafeEqual), httpOnly cookie | 세션 토큰 기반 인증 |
| **Deployment** | Vercel (앱) + Render/Railway (RAG API) | 각 워크로드에 최적화된 분리 배포 |

---

## ✨ 주요 기능 (구현 디테일 포함)

### 1. 자체 콘텐츠 관리 시스템(CMS) — 재배포 없는 콘텐츠 운영
- `/admin` 대시보드에서 **프로젝트 · 블로그 · 연락 메시지 · 사이트 설정**을 CRUD.
- 모든 콘텐츠를 코드가 아닌 **Postgres에 저장** → 글을 고치거나 프로젝트를 추가해도 **빌드/배포가 필요 없음.**
- API Route(`/api/admin/*`)는 모두 서버에서 세션을 검증한 뒤에만 동작.

### 2. 경량 RAG AI 어시스턴트 — "벡터 DB 없는" RAG
포트폴리오 내용을 학습한 AI에게 "이 사람 백엔드 경험 있어?" 같은 질문을 하면, 포트폴리오 문서를 근거로 답합니다.

핵심은 **흔한 벡터 임베딩 + 벡터 DB 구조를 의도적으로 쓰지 않았다는 점**입니다.
- **순수 Python TF-IDF 키워드 인덱스**를 직접 구현 (`rag/embedder.py`). 외부 임베딩 API·벡터 DB 의존성 0.
- 한국어 형태소 분석기 없이도 동작하도록 **한글 토큰의 2자 이상 서브스트링을 생성**해 조사(을/를/이/가) 영향을 완화하는 휴리스틱 적용.
- 검색된 문서를 6,000자 context로 압축해 Groq LLM(`llama-3.1-8b-instant`)에 전달, temperature 0.3으로 환각 억제.
- 초기엔 LangChain 기반이었으나, **불필요한 추상화·메모리 오버헤드를 제거하기 위해 LangChain을 걷어내고 직접 `httpx`로 LLM을 호출**하도록 리팩터링.

> **왜 이렇게?** 포트폴리오 지식 베이스는 문서 9개 규모로 작아, 벡터 검색의 의미적 정확도보다 **무료 티어에서 돌아가는 가벼움·낮은 콜드스타트·운영 단순함**이 더 중요했습니다. "기술을 위한 기술"이 아니라 문제 규모에 맞춘 선택.

### 3. 보안 중심 관리자 인증
- **DB 세션 토큰**: 로그인 시 `crypto.randomBytes(32)`로 토큰 발급, `AdminSession` 테이블에 저장, **24시간 만료** + 만료 세션 자동 정리.
- **httpOnly 쿠키**로 토큰 관리 → JS 접근 차단으로 XSS 토큰 탈취 방지.
- **Timing-safe 비밀번호 비교**(`crypto.timingSafeEqual`)로 타이밍 공격 차단.
- **미들웨어 레벨 보호**: `middleware.ts`에서 `/admin/*` 경로를 가로채 미인증 시 로그인 페이지로 리다이렉트.
- 비밀번호는 전부 환경변수로만 관리 (하드코딩 0).

### 4. 연락 폼 — In-memory IP Rate Limiting
- `POST /api/contact`에 **IP 기준 분당 3회** 제한을 직접 구현해 스팸/어뷰징 방어.
- 만료 엔트리는 주기적으로 정리해 메모리 누수 방지.

### 5. 3D 인터랙티브 경험
- Three.js + R3F로 와이어프레임 오브젝트·파티클·마우스 인터랙션·스크롤 패럴랙스 배경 구현.
- 프로젝트마다 성격에 맞는 **6개 커스텀 3D 씬**(geometric / console / state-machine / document / flow / track)을 분리 설계.

### 6. 동적 PDF 이력서 & 논문 뷰어
- `@react-pdf/renderer`로 이력서를 **런타임에 생성·다운로드**.
- `react-pdf`로 졸업 논문(FSM vs Behavior Tree) 등 연구 PDF를 사이트 내에서 뷰잉.

### 7. KR/EN 다국어
- React Context 기반 언어 전환, 120+ 번역 문자열 관리.

---

## 🗄 데이터 모델 (Prisma · Postgres)

5개 도메인 모델로 구성:

| 모델 | 역할 |
| --- | --- |
| `Project` | 프로젝트(제목·요약·설명·tech stack 배열·featured·정렬·게시 여부) |
| `BlogPost` | 마크다운 블로그 글(태그 배열·게시 여부) |
| `ContactMessage` | 연락 폼 수신 메시지(읽음 처리) |
| `SiteSetting` | 사이트 전역 설정 key-value |
| `AdminSession` | 관리자 세션 토큰 · 만료 시각 |

> `tech_stack`, `tags`는 Postgres 배열 타입을 활용, 모든 모델은 `@@map`으로 snake_case 테이블명에 매핑.

---

## 📂 프로젝트 구조

```
src/
├── app/
│   ├── (public)/              # 공개 페이지 (포트폴리오 · 블로그 · 어시스턴트)
│   ├── admin/                 # 관리자 대시보드 (프로젝트 · 포스트 · 메시지 · 설정)
│   └── api/                   # API Routes (admin · contact · portfolio-assistant)
├── components/
│   ├── sections/              # 포트폴리오 섹션 (about · experience · projects · ai-lab · …)
│   ├── shared/                # 레이아웃 · 네비 · 3D 배경 · PDF 뷰어 · ID 뱃지
│   ├── three/                 # Three.js 씬 (tech-globe · project-scenes ×6)
│   ├── admin/                 # 관리자 UI (CRUD 매니저)
│   └── ui/                    # shadcn/ui 기본 컴포넌트
├── hooks/                     # scroll-reveal · stagger-reveal · parallax · active-section
├── lib/                       # prisma · auth · i18n · pdf · settings
├── data/                      # 정적 데이터 (about · profile · ai-lab)
├── middleware.ts              # /admin 경로 인증 가드
└── generated/prisma/          # Prisma 생성 클라이언트
prisma/
├── schema.prisma              # DB 스키마 (5 모델)
└── seed.ts                    # 초기 데이터 시드
rag-assistant/                 # FastAPI RAG 서버 (Python)
├── api.py                     # POST /ask 엔드포인트
└── rag/                       # loader · chunker · embedder(TF-IDF) · retriever · chain(Groq)
docs/                          # 디자인 시스템 · 섹션 스펙 · AI 가이드 문서
```

---

## 🚀 로컬 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
```bash
cp .env.example .env
```
```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
ADMIN_PASSWORD=<관리자-비밀번호>
RAG_API_URL=https://your-deployed-rag-api.com
```

### 3. DB 마이그레이션 & 시드
```bash
npm run db:push     # 스키마를 Neon Postgres에 반영
npm run db:seed     # 초기 데이터 시드
```

### 4. 개발 서버 실행
```bash
npm run dev         # http://localhost:3000
```

### 5. (선택) RAG 서버 로컬 실행
```bash
cd rag-assistant
pip install -r requirements.txt
# .env 에 GROQ_API_KEY 설정 후
uvicorn api:app --reload
```

---

## ☁️ 배포

### Next.js 앱 (Vercel)
1. GitHub에 push → Vercel에서 프로젝트 import
2. 환경변수(`DATABASE_URL` · `ADMIN_PASSWORD` · `RAG_API_URL`) 설정 후 배포

### RAG API (Render / Railway / Fly.io)
1. `rag-assistant/`를 별도 배포 (Dockerfile · render.yaml 포함)
2. 환경변수 `GROQ_API_KEY`, `GROQ_MODEL=llama-3.1-8b-instant` 설정
3. 배포된 주소를 Vercel의 `RAG_API_URL`에 등록

---

## 🎨 디자인 시스템

- **테마**: Clean Document — 에디토리얼·미니멀·라이트 모드 전용
- **배경**: 노트 느낌의 미세 그리드 패턴 (20px × 28px)
- **폰트**: Pretendard Variable(한국어 최적화) + Geist Mono
- **컬러**: 그레이 베이스(`#37352F` / `#F7F6F3` / `#FFFFFF`) + `#6C5CE7` 퍼플 액센트

---

## 💡 엔지니어링 의사결정 회고

이 프로젝트에서 의식적으로 내린 선택들:

1. **RAG에서 벡터 DB를 쓰지 않았다.** 작은 지식 베이스에는 TF-IDF 키워드 검색으로 충분했고, 무료 티어 운영·낮은 콜드스타트가 더 중요했다. → *문제 규모에 맞는 도구 선택.*
2. **LangChain을 걷어냈다.** 추상화가 주는 편의보다 메모리·복잡도 비용이 컸다. 직접 `httpx`로 LLM을 호출해 흐름을 투명하게 만들었다. → *불필요한 의존성 제거.*
3. **LLM 서버를 Vercel에서 분리했다.** 서버리스에 안 맞는 워크로드를 상시 구동 서버로 빼서 배포·스케일을 독립시켰다. → *워크로드 특성에 따른 인프라 분리.*
4. **CMS를 직접 만들었다.** 콘텐츠를 코드에서 빼내 DB로 옮겨, 글 한 줄 고치는 데 재배포가 필요 없게 했다. → *운영 효율을 코드 구조로 해결.*
5. **인증을 처음부터 보안 관점으로 설계했다.** timing-safe 비교·httpOnly 쿠키·DB 세션·미들웨어 가드까지, QA 경험에서 체화한 "공격 표면" 관점을 코드에 반영했다.
