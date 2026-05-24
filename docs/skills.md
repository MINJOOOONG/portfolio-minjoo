# Tech Stack & Skills

## Core Framework

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.7 | App Router, RSC, Turbopack |
| React | 19.2.3 | UI 렌더링 |
| TypeScript | 5.x | 타입 안전성 |
| Tailwind CSS | 4.x | 유틸리티 기반 스타일링 |

---

## 3D & Animation

| Technology | Version | Purpose |
|-----------|---------|---------|
| Three.js | 0.184.0 | WebGL 3D 렌더링 |
| @react-three/fiber | 9.6.1 | React Three.js 바인딩 |
| @react-three/drei | 10.7.7 | Three.js 헬퍼/프리셋 |
| Framer Motion | 12.38.0 | React 애니메이션 |
| GSAP | 3.15.0 | 고급 스크롤 애니메이션 |
| Lenis | 1.3.23 | 부드러운 스크롤 |

### 3D 사용 현황

**진입 페이지 (`/`)**
- 현재: 정적 이미지 배지 (`entry-page.png`)
- 이전: `three-background.tsx` — 와이어프레임 Icosahedron + 80개 파티클

**포트폴리오 페이지 (`/portfolio`)**
- `three-portfolio-bg.tsx` — 5개 와이어프레임 도형 + 120개 파티클 + 연결선
- Icosahedron, Octahedron, Dodecahedron, Tetrahedron
- 스크롤 패럴랙스, 마우스 반응형 회전/밀려남

### 애니메이션 훅

| Hook | File | Description |
|------|------|-------------|
| `useScrollReveal` | `src/hooks/use-scroll-reveal.ts` | IntersectionObserver 기반 스프링 바운스 등장 |
| `useStaggerReveal` | `src/hooks/use-stagger-reveal.ts` | 자식 요소 순차 바운스 등장 |
| `useParallax` | `src/hooks/use-parallax.ts` | 스크롤 패럴랙스 |

---

## Database & ORM

| Technology | Version | Purpose |
|-----------|---------|---------|
| Prisma | 7.5.0 | ORM, 스키마 관리, 마이그레이션 |
| Neon (PostgreSQL) | — | 서버리스 PostgreSQL |
| @prisma/adapter-neon | 7.5.0 | Neon 서버리스 드라이버 |

### DB 명령어

```bash
npm run db:generate   # Prisma 클라이언트 생성
npm run db:migrate    # 마이그레이션 실행
npm run db:push       # 스키마 푸시 (dev)
npm run db:seed       # 시드 데이터 입력
npm run db:studio     # Prisma Studio 실행
```

---

## UI & Styling

| Technology | Purpose |
|-----------|---------|
| shadcn/ui | 기본 UI 컴포넌트 (Button 등) |
| class-variance-authority | 컴포넌트 variant 관리 |
| tailwind-merge | Tailwind 클래스 병합 |
| clsx | 조건부 클래스명 |
| Lucide React | 아이콘 |
| react-icons | 기술 스택 아이콘 (Simple Icons, Font Awesome) |
| @tailwindcss/typography | 마크다운 prose 스타일 |

---

## Content & Export

| Technology | Purpose |
|-----------|---------|
| react-markdown | 마크다운 렌더링 (블로그, About) |
| remark-gfm | GitHub Flavored Markdown |
| rehype-highlight | 코드 구문 강조 |
| rehype-raw | HTML 허용 |
| @react-pdf/renderer | 이력서 PDF 내보내기 |
| react-pdf | PDF 뷰어 (프로젝트 모달 내) |

---

## Auth & Security

| Technology | Purpose |
|-----------|---------|
| bcryptjs | 비밀번호 해싱 |
| cookie | 세션 쿠키 관리 |
| Custom auth | `src/lib/auth.ts` — Admin 인증 |

---

## 포트폴리오 Skills 섹션 전체 스킬 목록

`src/components/sections/skills.tsx`에 하드코딩된 전체 기술 스택 (45개):

### Frontend (7개)
JavaScript, React, Next.js, TypeScript, Zustand, Tailwind CSS, Three.js

### Backend (9개)
Java, Spring Boot, Python, FastAPI, Prisma, PostgreSQL, Redis, Kafka, REST API

### Library (11개)
React Query, Recoil, Redux, LangChain, FAISS, Storybook, GraphQL, GSAP, Sass, Webpack, Vite

### QA (5개)
Jira, TestRail, Redmine, Regression Test, TC 설계

### Environment & Deploy (8개)
GitHub, Vercel, AWS, Docker, Gradle, Testcontainers, Slack, Notion

### Design (5개)
Photoshop, Illustrator, Premiere Pro, Figma, Adobe XD

상세 아이콘/컬러 매핑은 `docs/sections.md`의 Skills 섹션 참조

---

## seed.ts 기준 프로젝트별 기술 스택

| 프로젝트 | 기술 스택 |
|----------|-----------|
| 포트폴리오 웹사이트 | Next.js, TypeScript, Three.js, Prisma, Neon, Python, FastAPI, FAISS, Groq API, LangChain |
| 개인 기술 블로그 joodev | Next.js, TypeScript, Prisma, PostgreSQL, TipTap, Vercel Blob |
| E-commerce Backend | Java, Spring Boot, Kafka, Redis, PostgreSQL, REST API |
| 아두이노 사회적 제품 | Arduino, Python, OpenCV, Hardware Prototype |
| FSM/BT 게임 AI 분석 | Unity, C#, FSM, Behavior Tree, Profiler |
| UNIST 해상 물류 창업 | Unity, Arduino, PM, UI/UX, Product Validation |
| K-HTML 해커톤 | Python, HTML, Azure OpenAI, AWS, UI Design |
| 미니 캡스톤 | AWS, Cloud, Azure OpenAI, Generative AI |
| 폴가이즈 레고 파티클 게임 | Unreal Engine 5, Blueprints, C++, Multiplayer |

---

## Project Structure

```
src/
├── app/
│   ├── (public)/          # 공개 라우트
│   │   ├── page.tsx       # 진입 페이지 (/)
│   │   ├── portfolio/     # 포트폴리오 (/portfolio)
│   │   └── blog/          # 블로그 (/blog)
│   ├── admin/             # Admin 대시보드
│   │   ├── login/         # 로그인
│   │   ├── settings/      # 설정 관리
│   │   ├── projects/      # 프로젝트 관리
│   │   ├── posts/         # 포스트 관리
│   │   └── messages/      # 메시지 관리
│   ├── api/               # API 라우트
│   ├── globals.css        # CSS 변수, 글로벌 스타일
│   └── layout.tsx         # 루트 레이아웃
├── components/
│   ├── sections/          # 포트폴리오 섹션 컴포넌트
│   │   ├── about.tsx              # About + SlideHeading
│   │   ├── about-section-row.tsx  # About 네비게이션 항목
│   │   ├── about-detail-panel.tsx # About 상세 패널
│   │   ├── about-keyword-annotation.tsx # 키워드 주석
│   │   ├── experience.tsx         # Experience (보기/편집)
│   │   ├── projects.tsx           # Projects (카드/모달)
│   │   ├── articles.tsx           # Articles (논문/연구)
│   │   ├── skills.tsx             # Skills (아이콘 그리드)
│   │   ├── ai-lab.tsx             # AI Lab (탭 UI)
│   │   ├── profile.tsx            # Contact/Profile
│   │   └── education.tsx          # Education/Certifications
│   ├── shared/            # 공유 컴포넌트
│   │   ├── entry-loader.tsx        # 진입 페이지
│   │   ├── three-background.tsx    # 진입 3D 배경 (이전)
│   │   ├── three-portfolio-bg.tsx  # 포트폴리오 3D 배경
│   │   ├── scene-layout.tsx        # 포트폴리오 레이아웃
│   │   ├── scene-navbar.tsx        # 네비게이션
│   │   ├── scroll-progress.tsx     # 스크롤 진행 표시
│   │   ├── smooth-scroll-provider.tsx
│   │   ├── portfolio-page.tsx      # 데이터 로딩 + 섹션 조합 (RSC)
│   │   ├── pdf-viewer.tsx          # PDF 뷰어
│   │   └── pdf-export-button.tsx   # PDF 내보내기 버튼
│   ├── three/             # Three.js 3D 씬
│   │   └── project-scenes/        # 프로젝트별 미니 3D 씬
│   └── ui/                # shadcn 기본 UI
├── data/                  # 정적 데이터
│   ├── about-sections.ts          # About 5개 항목 + 키워드 주석
│   ├── profile-data.ts            # Contact 프로필 + 링크
│   └── ai-lab-data.ts             # AI Lab 전체 데이터
├── hooks/                 # 커스텀 훅
│   ├── use-scroll-reveal.ts
│   ├── use-stagger-reveal.ts
│   └── use-parallax.ts
├── lib/                   # 유틸리티, 설정
│   ├── prisma.ts
│   ├── settings.ts
│   ├── auth.ts
│   ├── project-groups.ts
│   └── pdf/               # PDF 생성
│       └── types.ts       # ResumeData 타입
└── generated/             # Prisma 생성 파일
    └── prisma/client/
```

---

## Data Flow

```
Admin Dashboard → Prisma → Neon PostgreSQL
                                ↓
Portfolio Page ← getSettings() ← prisma.siteSetting.findMany()
                                ↓
              parseJsonSetting() → sections에 props 전달
```

- 모든 포트폴리오 데이터(경력, 프로젝트, 스킬 등)는 DB `SiteSetting` 테이블에 JSON 문자열로 저장
- Admin에서 수정 → DB 반영 → 포트폴리오 페이지 서버 렌더링 시 반영
- 일부 데이터(About, Contact, AI Lab, Skills UI)는 `src/data/` 또는 컴포넌트 내 정적 데이터 사용
