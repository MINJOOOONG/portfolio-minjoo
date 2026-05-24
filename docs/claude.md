# Claude Code 가이드

이 프로젝트에서 Claude Code를 사용할 때 참고할 규칙과 컨텍스트.

---

## 절대 규칙

1. **라이트 모드 only** — 다크 모드 절대 불가. 모든 배경은 흰색(`#FFFFFF`) 또는 연한 회색(`#F7F6F3`) 계열
2. **Notion 디자인 토큰** 사용 — `--notion-canvas`, `--notion-ink` 등 `docs/design.md`에 정의된 CSS 변수를 따를 것
3. **기존 데이터 흐름 유지** — Admin → Prisma → Neon DB → getSettings() → 섹션 컴포넌트. 이 흐름을 깨뜨리지 말 것
4. **Three.js는 항상 dynamic import** — `next/dynamic`으로 `{ ssr: false }` 적용. SSR에서 Three.js/WebGL 실행 불가

---

## 디자인 원칙

- **Clean Document** 미학 — 종이 위 이력서, 노트 위 스케치 느낌
- 흰 배경 + 미세한 모눈 격자(grid)
- 그레이 계열 위주, 파스텔 tint는 포인트로만
- 미니멀 타이포, 충분한 여백
- Three.js 3D 오브젝트는 연한 회색 와이어프레임 (`#c0c0c0`~`#d0d0d0`, opacity 0.25~0.4)
- 상세 스펙은 `docs/design.md` 참조

---

## 기술 스택 요약

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Three.js** + @react-three/fiber + @react-three/drei — 3D 배경
- **Tailwind CSS v4** — 유틸리티 스타일링
- **Prisma + Neon** — 서버리스 PostgreSQL
- **Framer Motion + GSAP + Lenis** — 애니메이션/스크롤
- 상세 스택은 `docs/skills.md` 참조

---

## 현재 구현된 섹션

포트폴리오 페이지(`/portfolio`)는 `PortfolioPage` (RSC)에서 데이터를 로드하고 아래 섹션을 순서대로 렌더링한다.

| 순서 | 섹션 | 컴포넌트 | 문서 |
|------|------|----------|------|
| 1 | About | `About` (`sections/about.tsx`) | `docs/sections.md` |
| 2 | Experience | `Experience` (`sections/experience.tsx`) | `docs/sections.md` |
| 3 | Projects | `Projects` (`sections/projects.tsx`) | `docs/sections.md` |
| 4 | AI Lab | `AILab` (`sections/ai-lab.tsx`) | `docs/sections.md` |
| 5 | Articles | `Articles` (`sections/articles.tsx`) | `docs/sections.md` |
| 6 | Skills | `Skills` (`sections/skills.tsx`) | `docs/sections.md` |
| 7 | Contact | `ContactSection` (`sections/profile.tsx`) | `docs/sections.md` |

진입 페이지(`/`)도 `docs/sections.md`에 함께 정리되어 있다.

---

## 파일 구조 규칙

| 위치 | 용도 |
|------|------|
| `src/components/sections/` | 포트폴리오 섹션 (about, experience, projects, skills, ai-lab, profile, education, articles) |
| `src/components/shared/` | 레이아웃, 네비게이션, 3D 배경, entry-loader, pdf-viewer, portfolio-page |
| `src/components/ui/` | shadcn 기본 UI 컴포넌트 |
| `src/components/three/` | Three.js 3D 씬 (project-scenes) |
| `src/data/` | 정적 데이터 (about-sections, profile-data, ai-lab-data) |
| `src/hooks/` | 커스텀 훅 (scroll-reveal, stagger-reveal, parallax) |
| `src/lib/` | 유틸리티, DB, 인증, PDF, settings |
| `src/app/(public)/` | 공개 라우트 (진입 `/`, 포트폴리오 `/portfolio`, 블로그 `/blog`) |
| `src/app/admin/` | Admin 대시보드 (login, settings, projects, posts, messages) |
| `prisma/` | Prisma 스키마, seed.ts, notion-project-assets |
| `docs/` | 프로젝트 문서 (`claude.md`, `design.md`, `skills.md`, `sections.md`) |

---

## 데이터 흐름

### DB 기반 데이터 (서버 → 컴포넌트)
```
Admin Dashboard → PUT /api/admin/settings → Prisma → Neon PostgreSQL
                                                        ↓
Portfolio Page ← getSettings() ← prisma.siteSetting.findMany()
                                                        ↓
                    parseJsonSetting<T>(settings, "key", fallback)
                                                        ↓
                    섹션 컴포넌트에 props로 전달
```

DB에서 가져오는 데이터:
- `experience_data` → `ExperienceItem[]`
- `project_data` → `ProjectItem[]`
- `skills_data` → `Record<string, string[]>`
- `education_data` → `EducationItem[]`
- `certifications_data` → `CertificationItem[]`
- `about_content` → `string`

### 정적 데이터 (클라이언트)
- `src/data/about-sections.ts` — About 섹션 5개 항목 + 키워드 주석
- `src/data/profile-data.ts` — Contact 프로필 + 링크
- `src/data/ai-lab-data.ts` — AI Lab 원칙, 규칙, 도구, 미디어 노트

### 하드코딩 데이터
- `src/components/sections/skills.tsx` — 전체 스킬 목록 (아이콘, 컬러, 카테고리)

---

## 코딩 패턴

### 컴포넌트
- `"use client"` — 인터랙션/훅 사용 시 필수
- `memo()` 래핑 — 섹션 컴포넌트는 `memo`로 불필요한 리렌더링 방지
- Props는 `interface`로 명시 타입 정의
- `SlideHeading` 공통 컴포넌트로 섹션 헤딩 통일 (`about.tsx`에서 export)

### 애니메이션
- `useScrollReveal` — 섹션 전체 바운스 등장 (IntersectionObserver + CSS transition)
- `useStaggerReveal` — 자식 요소 순차 등장 (childSelector로 대상 지정)
- 이징: `cubic-bezier(0.175, 0.885, 0.32, 1.6)` — 스프링 바운스 (오버슈트 후 정착)
- Three.js `useFrame` — 매 프레임 애니메이션 (마우스 반응, 스크롤 패럴랙스)
- Framer Motion `AnimatePresence` — 모달, 패널 전환 애니메이션

### 데이터
```typescript
// 설정 불러오기 (RSC에서만)
const settings = await getSettings();
const data = parseJsonSetting<Type>(settings, "key", fallback);
```

### 3D 배경 추가 시
```typescript
// 반드시 dynamic import + ssr: false
const MyThreeComponent = dynamic(
  () => import("@/components/shared/my-three").then((m) => m.MyThree),
  { ssr: false }
);
```

### 인라인 편집 패턴
Experience 섹션은 인라인 편집 모드를 지원한다:
1. 수정 버튼 클릭 → 비밀번호 모달 (`/api/admin/login`)
2. 인증 성공 → 편집 모드 진입 (EditCard 렌더링)
3. 저장 → `PUT /api/admin/settings` → DB 업데이트
4. 클라이언트 상태 갱신 (`displayItems`)

---

## 주요 주의사항

1. **CSS 변수 변경 시** — `:root`에 정의된 Notion 토큰과 shadcn 변수가 모든 컴포넌트에 영향. 신중하게 변경
2. **Three.js 컴포넌트** — `Canvas` 내부에서만 Three.js 훅 (`useFrame`, `useThree` 등) 사용 가능
3. **PDF 내보내기** — `@react-pdf/renderer`는 Tailwind 클래스 불가. `src/lib/pdf/` 내 별도 스타일 사용
4. **Admin 기능** — 편집 모드, 인증 등 Admin 관련 로직은 변경 시 반드시 동작 확인
5. **Lenis 스크롤** — `SmoothScrollProvider`가 스크롤을 제어. `window.scrollTo` 대신 Lenis API 고려
6. **Skills 데이터 이중 관리** — DB(`skills_data`)와 하드코딩(`skills.tsx SKILLS[]`) 모두 존재. 현재 UI는 하드코딩 데이터를 사용
7. **Articles 필터링** — `projectData`에서 `isArticleProject()` 필터로 논문/연구 항목을 분리하여 Articles 섹션에 표시

---

## 섹션별 문서 목록

| 파일 | 내용 |
|------|------|
| `docs/sections.md` | Entry, About, Experience, Projects, AI Lab, Skills, Contact 섹션 통합 문서 |
| `docs/skills.md` | 기술 스택 전체 목록 (프로젝트 기술 + UI 스킬) |
| `docs/design.md` | 디자인 시스템, 컬러, 타이포, 3D |

---

## 자주 쓰는 명령어

```bash
npm run dev          # 개발 서버 (Turbopack)
npm run build        # 프로덕션 빌드
npm run db:studio    # Prisma Studio (DB GUI)
npm run db:push      # 스키마 변경 반영
npm run db:seed      # 시드 데이터 입력
npm run db:generate  # Prisma 클라이언트 생성
```
