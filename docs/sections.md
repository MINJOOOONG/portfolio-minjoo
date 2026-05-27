# Sections

포트폴리오의 진입 페이지와 주요 섹션 문서를 하나로 모은 문서다.

## 목차

1. [Entry 페이지](#entry-페이지)
2. [About 섹션](#about-섹션)
3. [Experience 섹션](#experience-섹션)
4. [Projects 섹션](#projects-섹션)
5. [AI Lab 섹션](#ai-lab-섹션)
6. [Skills 섹션](#skills-섹션)
7. [Contact 섹션](#contact-섹션)

---

## Entry 페이지

### 개요

포트폴리오의 진입 페이지(`/`). 전체 화면 이미지 배지를 표시하고, 클릭 시 `/portfolio#about`으로 전환한다.

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/app/(public)/page.tsx` | 라우트 (`HomePage`) |
| `src/components/shared/entry-loader.tsx` | `EntryPage` 컴포넌트 |
| `public/entry-page.png` | 진입 페이지 이미지 |

### 컴포넌트 구조

#### EntryPage

- `"use client"`
- `/portfolio` prefetch (`useEffect`)
- 상태: `leaving` (전환 중 여부)
- 전체 화면 `<main>` -> `role="button"`, `tabIndex={0}`
- `next/image` fill 모드로 `entry-page.png` 표시
- `data-cursor="ENTER"` (커스텀 커서)

### 인터랙션

1. 클릭 또는 Enter/Space 키 -> `leaving = true`
2. 400ms 딜레이 후 `router.push("/portfolio#about")`
3. leaving 상태에서 CSS 클래스 `entry-overlay--leaving` 적용 (페이드 아웃)

### CSS 클래스

- `.entry-overlay`: 전체 화면 컨테이너 (`globals.css`에 정의)
- `.entry-overlay--leaving`: 페이드 아웃 전환
- `.entry-image`: 이미지 스타일

### 이전 구현 이력

이전에는 Swiss-Style 실험적 타이포그래피 + Three.js 3D 배경으로 구현되었으나, 현재는 정적 이미지 배지 방식으로 변경되었다. 이전 구현의 디자인 스펙은 `docs/design.md`의 "Entry Page" 섹션에 기록되어 있다.

### 참고

- 이미지: `/public/entry-page.png` (전체 화면 배지 이미지)
- priority 로딩 적용 (`next/image priority`)
- sizes: `100vw`

---

## About 섹션

### 개요

About 섹션은 마스터-디테일 레이아웃으로 5개의 핵심 역량을 소개한다. 왼쪽에 번호 네비게이션, 오른쪽에 상세 내용을 표시하며, 키워드에 마우스를 올리면 주석이 나타난다.

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/sections/about.tsx` | 메인 컴포넌트 (`About`) + `SlideHeading` 공용 컴포넌트 |
| `src/components/sections/about-section-row.tsx` | 왼쪽 번호 네비게이션 항목 (`AboutSectionRow`) |
| `src/components/sections/about-detail-panel.tsx` | 오른쪽 상세 패널 (`AboutDetailPanel`) |
| `src/components/sections/about-keyword-annotation.tsx` | 키워드 주석 컴포넌트 |
| `src/data/about-sections.ts` | 데이터: 섹션 목록 + 키워드 주석 |

### 데이터 구조

#### AboutSection

```typescript
interface AboutSection {
  number: string;        // "01" ~ "05"
  koreanTitle: string;   // 한국어 제목
  englishTitle: string;  // 영어 제목 (네비게이션 표시용)
  sentence: string;      // 리드 문장
  paragraphs: string[];  // 본문 단락들
  detailLink?: {         // 다른 섹션으로 이동하는 링크
    label: string;
    targetId: string;
  };
}
```

#### 현재 5개 항목

| 번호 | 한국어 | 영어 | 요약 |
|------|--------|------|------|
| 01 | 빠른 적응력 | Fast Adaptability | 낯선 환경에 먼저 뛰어들어 구조를 파악, 토스 QA에서 빠른 변화 대응, AI 기술 선제 도입 |
| 02 | 본질 이해 | Essence First | '왜 필요한 일인지' 먼저 파고드는 태도, 백엔드 부트캠프 자비 수강으로 입체적 문제 이해 |
| 03 | 개선 지향 | Improvement Driven | 반복 업무의 불편함을 개선의 형태로 전환, Tossion 유사 자체 페이지 제작 |
| 04 | 협업과 기록 | Collaborative Growth | 기록과 공유 중심의 업무 방식, 매일 상세 업무보고, 동료와 피드백 교환 |
| 05 | AI 활용력 | AI-Loving Builder | AI를 협업 파트너로 활용, 검증 습관화, 더 나은 일하는 방식 실험 -> AI Lab 섹션 링크 |

#### 키워드 주석 (`keywordAnnotations`)

본문 텍스트에서 특정 키워드를 자동으로 감지하여 호버 시 설명을 표시한다.

주요 키워드: `카페 창업`, `소프트웨어 관련 전공`, `AI 관련 논문`, `토스`, `애자일 환경`, `QA Engineer`, `이슈 트래킹`, `이커머스 백엔드 부트캠프`, `Regression Test`, `Tossion`, `TC API`, `Claude와 Codex`, `AI`, `업무보고`, `피드백`

### 컴포넌트 구조

#### About (메인)

- `memo()` 래핑
- Props: `{ content: string }` (DB `about_content` - 현재 미사용, `aboutSections` 정적 데이터 사용)
- 상태: `activeId` (기본값 `"01"`)
- 레이아웃: `flex-col md:flex-row`
- 데스크톱: 왼쪽 네비게이션 (240~260px) | 오른쪽 디테일 (flex-1, 좌측 border)
- 모바일: 네비게이션 -> 디테일 (세로 배치)

#### AboutSectionRow (네비게이션 항목)

- Framer Motion `motion.div`로 순차 등장 (delay: `0.1 + index * 0.06`)
- 번호 (13px mono, active 시 opacity 변화) + 영문 타이틀 (16~17px)
- active 시 하단 라인 표시 (1.5px, `bg-foreground/40`)
- `onClick` / `onFocus` / `onKeyDown`으로 활성화

#### AboutDetailPanel (상세 패널)

- `AnimatePresence mode="wait"`로 섹션 전환 애니메이션
- 메타 라벨: 번호 + 영문 타이틀
- 리드 문장: 20~22px, semibold
- 본문: `renderAnnotatedText()`로 키워드 자동 감지 및 주석 연결
- detailLink: 다른 섹션으로 이동 버튼 (`slide-nav-goto` CustomEvent)

#### SlideHeading (공용)

- 다른 섹션에서도 import하여 사용 (`experience`, `skills`, `ai-lab`, `profile`, `education`, `articles`)
- Props: `{ label: string; title?: string }`
- label: 10px uppercase tracking 넓은 보조 텍스트
- title: `clamp(2rem, 4.5vw, 3.2rem)` font-black 메인 타이틀
- 영문 only 판별: `/^[A-Za-z0-9 /&|+-]+$/` -> title 표시, 아니면 label 표시

### 인터랙션

1. 왼쪽 항목 클릭/포커스 -> `activeId` 변경 -> 오른쪽 패널 전환 (Framer Motion fade + slide)
2. 키워드 호버 -> 주석 팝업 표시
3. "AI Lab에서 활용 방식 보기" 버튼 클릭 -> AI Lab 섹션으로 스크롤 이동

### 스타일 특성

- max-width: `980px`
- 섹션 간 구분: 디테일 패널 좌측 `border-l border-foreground/[0.06]`
- 본문 텍스트: `text-foreground/65`, `leading-[1.82]`
- `word-break-keep-all` (한국어 줄바꿈 최적화)

---

## Experience 섹션

### 개요

경력 사항을 타임라인 형태로 표시하며, 인라인 편집 모드를 지원한다.

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/sections/experience.tsx` | 메인 컴포넌트 (`ViewCard`, `EditCard`, `PasswordModal`) |
| `prisma/seed.ts` | 초기 시드 데이터 |

### 데이터 구조

#### ExperienceItem

```typescript
interface ExperienceItem {
  company: string;        // 회사명
  role: string;           // 직무
  period: string;         // 기간 (예: "2025.11 - Present")
  summary: string;        // 한 줄 요약
  achievements: string[]; // 핵심 성과 목록
  status?: string;        // "재직 중" 등 (있으면 active 표시)
  techStack?: string[];   // 기술 태그
}
```

#### 현재 데이터 (`seed.ts` 기준)

| 회사 | 직무 | 기간 | 상태 |
|------|------|------|------|
| Viva Republica (Toss) | Toss Commerce QA Assistant | 2025.11 - Present | 재직 중 |
| Riwonsoft | QA Intern | 2025.06 - 2025.09 | - |

#### Toss techStack

Jira, Slack, TestRail, Deus, Notion

#### Riwonsoft techStack

Redmine, Notion, Unity, C#, Slack, Jira

### 컴포넌트 구조

#### Experience (메인)

- `memo()` 래핑
- Props: `{ items: ExperienceItem[] }`
- 상태: `isEditMode`, `showPasswordModal`, `editItems`, `saving`, `displayItems`
- `displayItems`로 클라이언트 즉시 반영 (저장 성공 시)
- 헤딩: `SlideHeading label="Experience" title="Work Experience"`

#### ViewCard (보기 모드)

- 타임라인 레이아웃: 왼쪽 dot + 세로선 | 오른쪽 콘텐츠
- `TimelineDot`: `status` 있으면 크게 표시 (active dot)
- 상세: summary + achievements (최대 4개)
- techStack: 파스텔 tint 배경 뱃지 (`NOTION_TINTS` 순환)

#### EditCard (편집 모드)

- 회사명, 기간, 직무, 상태 입력
- summary 입력
- achievements: 동적 추가/삭제
- techStack: 콤마 구분 입력

#### PasswordModal

- Admin 인증 모달 (`/api/admin/login` POST)
- 인증 성공 -> `enterEditMode()` 호출

### 편집 흐름

1. "수정" 버튼 클릭 -> `PasswordModal` 표시
2. 비밀번호 입력 -> `POST /api/admin/login` -> 인증 성공
3. `enterEditMode()` -> `editItems = deepCopy(displayItems)` -> `EditCard` 렌더링
4. 항목 수정/추가/삭제
5. "저장" -> `PUT /api/admin/settings` (`experience_data` 키) -> DB 업데이트
6. 성공 시 `displayItems` 갱신, 편집 모드 종료

### 스타일 특성

- `NOTION_TINTS`: 7가지 파스텔 색상 순환 (lavender, mint, sky, peach, rose, yellow, cream)
- techStack 뱃지: 11px, `rounded-md`, `text-foreground/70`
- achievements 목록: 12~13px, 좌측 불릿 (1.5w, `rounded-full`, `bg-foreground/35`)
- 편집 모드 카드: `border border-border rounded-lg bg-background`

---

## Projects 섹션

### 개요

프로젝트를 카드 그리드로 표시하고, 클릭 시 플로팅 모달로 상세 내용을 보여준다. `contentBlocks` 시스템으로 블로그 스타일 콘텐츠를 지원하며, 논문/연구 항목은 Articles 섹션으로 분리된다.

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/sections/projects.tsx` | 메인 컴포넌트 (`ProjectCard`, `ProjectModal`, `ContentBlockRenderer` 등) |
| `src/components/sections/articles.tsx` | Articles 섹션 (논문/연구 항목) |
| `src/components/three/project-scenes/` | 프로젝트별 3D 미니 씬 |
| `src/components/shared/pdf-viewer.tsx` | PDF 뷰어 (dynamic import) |
| `src/lib/project-groups.ts` | `isArticleProject()` 필터 함수 |
| `prisma/seed.ts` | 초기 시드 데이터 |
| `prisma/notion-project-assets.ts` | Notion에서 가져온 프로젝트 미디어 자산 |

### 데이터 구조

#### ProjectItem

```typescript
interface ProjectItem {
  title: string;
  teamSize: string;          // "개인 / 1인 개발", "4명", "팀 프로젝트" 등
  period: string;
  summary: string;
  description: string[];     // 상세 설명 항목들
  techStack: string[];
  media?: ProjectMedia;      // 대표 미디어 (image/video/pdf)
  gallery?: ProjectMedia[];  // 추가 미디어 갤러리
  attachments?: ProjectAttachment[];
  githubUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  caseStudy?: CaseStudyBlock[];    // 수동 케이스 스터디
  contentBlocks?: ContentBlock[];  // 블로그 스타일 콘텐츠
  achievement?: string;     // 한 줄 성과
  role?: string;            // 역할
}
```

#### ProjectMedia

```typescript
interface ProjectMedia {
  type: "image" | "video" | "pdf";
  url: string;
  title?: string;
}
```

#### ContentBlock (블로그 스타일)

```typescript
type ContentBlock =
  | { type: "text"; heading?: string; body: string[] }
  | { type: "image"; url: string; caption?: string }
  | { type: "video"; url: string; caption?: string }
  | { type: "pdf"; url: string; caption?: string }
  | { type: "audio"; url: string; caption?: string }
  | { type: "file"; url: string; title: string };
```

#### CaseStudyBlock (자동 생성 가능)

```typescript
interface CaseStudyBlock {
  heading: string;
  body: string[];
}
```

### 현재 프로젝트 목록 (`seed.ts` 기준)

| 제목 | 유형 | 기간 |
|------|------|------|
| 포트폴리오 웹사이트 | 개인 / 1인 개발 | 2026.05 - 진행중 |
| 개인 기술 블로그 joodev | 개인 | 2025.04 - 진행중 |
| E-commerce Backend Engineering | 부트캠프 프로젝트 | 2025.01 - 2025.03 |
| 아두이노를 이용한 사회적 제품 제작 | 4명 | 2023.09 - 2023.12 |
| FSM과 BT 구조를 활용한 게임 인공지능 분석 | 졸업논문 | 2024.03 - 2025.02 |
| UNIST 해상 물류 창업 오디션 | 팀 프로젝트 | 2024.03 - 2024.12 |
| 2024 K-HTML 대학대항전 해커톤 | 팀 프로젝트 | 2024.07 |
| 미니 산학 연계 캡스톤 프로젝트 | 개인 | 2024.06 - 2024.08 |
| 폴가이즈 기반 레고 파티클 게임 | 팀 프로젝트 | 2025.01 - 2025.02 |

### 컴포넌트 구조

#### Projects (메인)

- `memo()` 래핑
- `viewItems = displayItems.filter(item => !isArticleProject(item))` - 논문 항목 제외
- 100vh 스크롤 가능 컨테이너 (`overflowY: scroll`, `overscrollBehavior: contain`)
- 카드 그리드: `.pj-grid` CSS 클래스

#### ProjectCard

- 포스터 영역 (`.pj-card__poster`): 이미지 있으면 배경, 없으면 기하학 심볼
- 심볼: `◆ ○ △ □ ◇ ▽ ⬡ ✦` 순환
- 번호: `01`, `02`, ... 형식
- 콘텐츠: 제목 (20px, font-black), summary, achievement, period
- `useScrollReveal` 적용 (stagger: `index * 0.08`)
- 파스텔 tint 순환: `--poster-tint` CSS 변수

#### ProjectModal (플로팅 상세)

- `AnimatePresence` + `motion.div` (scale 0.96 -> 1, y 20 -> 0)
- 배경: `bg-black/40 backdrop-blur-[2px]`
- 키보드: Escape=닫기, ←→=이전/다음
- body `overflow: hidden` 설정

모달 콘텐츠 구조:

1. 상단 네비게이션 (←→ 이전/다음, 번호, ✕ 닫기)
2. 미디어 영역 (video/pdf만 - 카드 대표 이미지는 반복 표시 안 함)
3. 번호 + 제목
4. summary
5. techStack 뱃지
6. 메타 정보 (기간, 개발 인원, GitHub/Live/Blog 링크)
7. 구분선
8. 콘텐츠 영역: `contentBlocks` 있으면 `ContentBlockRenderer`, 없으면 `buildCaseStudy()` 자동 생성 + 갤러리 + 첨부파일

#### ContentBlockRenderer

- text: 헤딩 + 불릿 리스트
- image: `SafeImage` + caption
- video: `<video>` + caption
- pdf: `PdfViewer` + caption
- audio: `<audio>` + caption
- file: 첨부 파일 링크
- 각 블록 `motion.section` (fade-up 애니메이션, stagger)

#### SafeImage

- `next/image` 래퍼
- 로드 실패 시 fallback UI 표시 (아이콘 + 텍스트)

#### buildCaseStudy()

- `contentBlocks`와 `caseStudy`가 없을 때 `description`에서 자동 생성
- 구조: 프로젝트 개요 -> 주요 구현 -> 기술적 고민 -> 기술 스택 -> 결과 및 배운 점

### Articles 섹션

`isArticleProject()` 필터로 분리된 항목을 표시한다 (졸업논문 등).

- `ArticleItem`: PDF 미리보기 + 텍스트 정보 2단 레이아웃
- PDF 뷰어: `dynamic(() => import("pdf-viewer"), { ssr: false })`
- techStack: 스태거 등장 (`useStaggerReveal`)
- 헤딩: `SlideHeading label="Articles" title="논문 / 연구"`

### 미디어 중복 방지

- `filterRepeatedMediaBlocks()`: contentBlocks에서 카드 대표 이미지와 같은 URL의 블록 제거
- `normalizeMediaUrl()`: URL에서 `#` 이후와 `?` 이후 제거하여 비교
- 카드 대표 이미지가 image 타입이면 모달에서 반복 표시하지 않음

### 스타일 특성

- 카드 그리드: `.pj-grid` (CSS로 정의, 반응형)
- 모달: `.pj-modal` (CSS 클래스)
- 모달 body: `.pj-modal__body` (스크롤 가능)
- 콘텐츠 블록: `.pj-content-flow`, `.pj-content-block`
- 기술 뱃지: 흰 배경 + `border-[var(--notion-hairline)]`

---

## AI Lab 섹션

### 개요

AI 활용 철학, 규칙, 도구 리뷰, 미디어 학습 노트를 탭 기반 UI로 정리한 섹션이다. 6개 카테고리 탭으로 구성되며, 각 탭은 서로 다른 UI를 렌더링한다.

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/sections/ai-lab.tsx` | 메인 컴포넌트 (`AILab`, `RulesList`, `ToolsGrid`, `ToolCard`, `MediaNotesList`, `MediaNoteCard`) |
| `src/data/ai-lab-data.ts` | 전체 데이터 (정적) |

### 카테고리 구조

```typescript
type AILabCategory =
  | "Principles"
  | "Claude.md"
  | "Skills Rules"
  | "Design Rules"
  | "AI Tools"
  | "Media Notes";
```

#### 카테고리별 UI 매핑

| 카테고리 | 컴포넌트 | 데이터 |
|----------|----------|--------|
| Principles | `RulesList` | `principles` (8개 규칙) |
| Claude.md | `RulesList` | `claudeMdRules` (8개 규칙) |
| Skills Rules | `RulesList` | `skillsRules` (6개 규칙) |
| Design Rules | `RulesList` | `designRules` (7개 규칙) |
| AI Tools | `ToolsGrid` | `aiTools` (13개 도구) |
| Media Notes | `MediaNotesList` | `mediaNotes` (1+개 노트) |

### 데이터 구조

#### AIRule (Principles, Claude.md, Skills Rules, Design Rules)

```typescript
interface AIRule {
  text: string;
}
```

#### AITool (AI Tools)

```typescript
interface AITool {
  name: string;
  category: string;      // "Coding Agent", "Thinking Partner" 등
  usedFor: string;       // 한 줄 용도
  useCase: string;       // 상세 사용 사례
  strengths: string[];   // 강점 목록
  limitations: string[]; // 한계 목록
  review: string;        // 개인 리뷰
  tags: string[];        // 태그
}
```

#### 현재 등록된 AI 도구 (13개)

| 도구 | 카테고리 | 아이콘 |
|------|----------|--------|
| Claude Code | Coding Agent | `/images/ai-tools/claude.png` |
| ChatGPT | Thinking Partner / Prompt Design | `/images/ai-tools/chatgpt.png` |
| Cursor | AI Code Editor | `/images/ai-tools/cursor.png` |
| GitHub Copilot | Code Autocomplete | `/images/ai-tools/github-copilot.png` |
| Perplexity | AI Search Engine | `/images/ai-tools/perplexity.png` |
| Suno | Music Generation | `/images/ai-tools/suno.png` |
| Midjourney | Image Generation | `/images/ai-tools/midjourney.png` |
| v0 by Vercel | UI Generation | `/images/ai-tools/v0.png` |
| Image to Code Tool | UI Generation / Image to Code | `/images/ai-tools/v0.png` |
| Notion AI | Productivity / Writing | `/images/ai-tools/notion.png` |
| Wrtn / 뤼튼 | Korean AI Writing Tool | `/images/ai-tools/wrtn.png` |
| Claude (Web) | AI Assistant | `/images/ai-tools/claude.png` |
| Gemini | Multimodal AI | `/images/ai-tools/gemini.png` |

#### MediaNote (Media Notes)

```typescript
interface MediaNote {
  id: string;
  sourceType: "YouTube" | "Article" | "Reference";
  url: string;
  title: string;
  topic: string;
  summary: string;
  myTake: string;
  insight: string;
  appliedTo: string;
  keywords: string[];
}
```

### 컴포넌트 구조

#### AILab (메인)

- `memo()` 래핑
- Props: 없음 (모든 데이터 정적)
- 상태: `activeCategory` (기본값: `"Principles"`)
- 100vh 스크롤 컨테이너, padding: `100px 40px 120px`
- max-width: `960px`
- 헤딩: `SlideHeading label="AI Lab" title="AI Lab"`
- 서브텍스트: "A personal operating system for working, learning, and building with AI."

#### RulesList

- 규칙 번호 (01, 02, ...) + 텍스트
- 구분선: `border-b border-[var(--notion-hairline)]`

#### ToolsGrid

- 2열 그리드 (`sm:grid-cols-2`)
- 각 카드: `ToolCard`

#### ToolCard

- 접기/펼치기 (`ChevronDown`)
- 기본: 아이콘 + 이름 + category + usedFor + tags
- 펼침: useCase + strengths + limitations + review
- 아이콘: `toolIconSrcMap`에서 이름으로 매핑 -> `next/image`
- 태그: `--notion-surface` 배경

#### MediaNotesList

- 아카이브 설명 텍스트
- 각 노트: `MediaNoteCard`

#### MediaNoteCard

- 소스 아이콘: `{ YouTube: Play, Article: FileText, Reference: Link2 }` (`lucide-react`)
- YouTube -> iframe 임베드 (`getYouTubeId()`)
- 2단 레이아웃: 프리뷰(좌) + 노트(우)
- 노트: Summary, My Take, Insight, Applied To
- 키워드 태그 + 원본 링크

### Principles 데이터 (8개)

1. AI 결과물을 그대로 믿지 않고 반드시 검증한다.
2. 프롬프트는 단순 질문이 아니라 작업 기준서처럼 작성한다.
3. AI가 만든 결과물의 의도, 구조, 리스크를 사람이 설명할 수 있어야 한다.
4. 보안, 데이터 민감도, 저작권, 품질 검증을 항상 고려한다.
5. AI는 대체 도구가 아니라 사고를 확장하고 반복 업무를 줄이는 협업 도구로 사용한다.
6. 빠르게 시도하되, 최종 판단과 책임은 사람이 가져야 한다.
7. AI에게 넘기기 전에 내가 먼저 구조를 이해하고 있어야 한다.
8. 같은 질문이라도 컨텍스트를 얼마나 주느냐에 따라 결과가 달라진다.

### 스타일 특성

- 탭: Skills 섹션과 동일한 패턴 (active: `bg-[var(--notion-ink)] text-white`)
- 도구 카드: `rounded-lg border border-[var(--notion-hairline)]`, hover 시 `border-[var(--notion-muted)]`
- 미디어 노트: 16:9 비율 프리뷰, `border-t` 구분

---

## Skills 섹션

### 개요

전체 기술 스택을 6개 카테고리로 나누어 아이콘 타일 그리드로 표시한다. 카테고리 탭으로 필터링 가능하며, 각 스킬에 아이콘과 브랜드 컬러를 매핑한다.

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/sections/skills.tsx` | 메인 컴포넌트 + 전체 스킬 데이터 (하드코딩) |

### 데이터 구조

#### SkillItem

```typescript
type SkillCategory = "Frontend" | "Backend" | "Library" | "QA" | "Environment & Deploy" | "Design";

interface SkillItem {
  name: string;
  category: SkillCategory;
  icon?: IconType;           // react-icons 아이콘 (없으면 label 사용)
  color?: string;            // 아이콘 색상
  tileBackground?: string;   // 타일 배경색
  label?: string;            // 아이콘 없을 때 표시할 텍스트
  labelColor?: string;       // label 텍스트 색상
}
```

### 카테고리별 스킬 목록

#### Frontend (7개)

| 이름 | 아이콘 | 색상 | 배경 |
|------|--------|------|------|
| JavaScript | `SiJavascript` | `#111111` | `#f7df1e` |
| React | `SiReact` | `#00d8ff` | - |
| Next.js | `SiNextdotjs` | `#000000` | - |
| TypeScript | `SiTypescript` | `#3178c6` | - |
| Zustand | label `Z` | - | `#211d19` (labelColor: `#f5c46b`) |
| Tailwind CSS | `SiTailwindcss` | `#38bdf8` | - |
| Three.js | `SiThreedotjs` | `#000000` | - |

#### Backend (9개)

| 이름 | 아이콘 | 색상 | 배경 |
|------|--------|------|------|
| Java | `FaJava` | `#f89820` | `#5382a1` |
| Spring Boot | `SiSpringboot` | `#6db33f` | - |
| Python | `SiPython` | `#3776ab` | - |
| FastAPI | `SiFastapi` | `#009688` | - |
| Prisma | `SiPrisma` | `#2d3748` | - |
| PostgreSQL | `SiPostgresql` | `#4169e1` | - |
| Redis | `SiRedis` | `#dc382d` | - |
| Kafka | `SiApachekafka` | `#231f20` | - |
| REST API | label `API` | - | `#2b2d42` (labelColor: `#a8dadc`) |

#### Library (11개)

| 이름 | 아이콘 | 색상 | 배경 |
|------|--------|------|------|
| React Query | `SiReactquery` | `#ff4154` | - |
| Recoil | `SiRecoil` | `#3578e5` | - |
| Redux | `SiRedux` | `#764abc` | - |
| LangChain | `SiLangchain` | `#1c3c3c` | - |
| FAISS | label `FA` | - | `#3b5998` (labelColor: `#ffffff`) |
| Storybook | `SiStorybook` | `#ff4785` | - |
| GraphQL | `SiGraphql` | `#e10098` | - |
| GSAP | `SiGreensock` | `#88ce02` | - |
| Sass | `SiSass` | `#cc6699` | - |
| Webpack | `SiWebpack` | `#8dd6f9` | - |
| Vite | `SiVite` | `#646cff` | - |

#### QA (5개)

| 이름 | 아이콘 | 색상 | 배경 |
|------|--------|------|------|
| Jira | `SiJira` | `#0052cc` | - |
| TestRail | label `TR` | - | `#65c179` (labelColor: `#ffffff`) |
| Redmine | label `Rm` | - | `#b32024` (labelColor: `#ffffff`) |
| Regression Test | label `RT` | - | `#2b2d42` (labelColor: `#ef8354`) |
| TC 설계 | label `TC` | - | `#1b2838` (labelColor: `#66c0f4`) |

#### Environment & Deploy (8개)

| 이름 | 아이콘 | 색상 | 배경 |
|------|--------|------|------|
| GitHub | `SiGithub` | `#000000` | - |
| Vercel | `SiVercel` | `#000000` | - |
| AWS | `FaAws` | `#ff9900` | `#232f3e` |
| Docker | `SiDocker` | `#2496ed` | - |
| Gradle | `SiGradle` | `#02303a` | - |
| Testcontainers | label `TC` | - | `#2b2d42` (labelColor: `#23d18b`) |
| Slack | `SiSlack` | `#4a154b` | - |
| Notion | `SiNotion` | `#000000` | - |

#### Design (5개)

| 이름 | 아이콘 | 색상 | 배경 |
|------|--------|------|------|
| Photoshop | label `Ps` | - | `#001e36` (labelColor: `#31a8ff`) |
| Illustrator | label `Ai` | - | `#330000` (labelColor: `#ff9a00`) |
| Premiere Pro | label `Pr` | - | `#00005b` (labelColor: `#9999ff`) |
| Figma | `SiFigma` | `#f24e1e` | `#1e1e1e` |
| Adobe XD | label `Xd` | - | `#470137` (labelColor: `#ff61f6`) |

### 컴포넌트 구조

#### Skills (메인)

- `memo()` 래핑
- Props: `{ data: Record<string, string[]> }` (DB 데이터 - 현재 UI에서 미사용)
- 상태: `activeCategory` (null이면 전체 표시)
- `visibleSkills`: activeCategory로 필터링 (`useMemo`)
- 헤딩: `SlideHeading label="Skills" title="Skills"`
- 서브텍스트: "Tools and technologies I use to build, test, and design products."
- 카테고리 탭: 클릭 시 토글 (같은 카테고리 재클릭 -> 전체 표시)

#### SkillTile (개별 타일)

- CSS 변수로 컬러 전달: `--skill-color`, `--skill-tile-bg`, `--skill-label-color`
- 아이콘 있으면 `<Icon>`, 없으면 `<span>{label}</span>`
- 호버 시 이름 표시 (absolute, 10px, fade-in)
- CSS 클래스: `.skills-icon-card`, `.skills-icon-card__icon`, `.skills-icon-card__label`

### 아이콘 라이브러리

- `react-icons/si` (Simple Icons): 대부분의 기술 아이콘
- `react-icons/fa` (Font Awesome): `FaJava`, `FaAws`

### 스타일 특성

- 카테고리 탭: 텍스트 버튼, active 시 `bg-[var(--notion-ink)] text-white`
- 아이콘 그리드: `.skills-icon-grid` (CSS로 정의)
- 타일: `.skills-icon-card` (CSS로 정의, group hover 효과)
- 섹션 구분: 탭 하단 `border-b border-[var(--notion-hairline)]`

### 참고: DB 데이터와의 관계

`skills_data` (DB)는 `Record<string, string[]>` 형태로 카테고리별 스킬 이름만 저장한다. 현재 UI는 하드코딩된 `SKILLS[]` 배열을 직접 사용하며 DB 데이터는 `_data`로 무시한다. 향후 DB 연동 시 아이콘/컬러 매핑 로직 추가가 필요하다.

---

## Contact 섹션

### 개요

프로필 사진, 이름, 태그라인, 연락처 링크를 표시하며, 하단에 Education/Certifications 정보를 포함한다.

### 파일 구조

| 파일 | 역할 |
|------|------|
| `src/components/sections/profile.tsx` | 메인 컴포넌트 (`ContactSection`) + `LinkBadge` |
| `src/components/sections/education.tsx` | `EducationItem`, `CertificationItem` 타입 + 독립 컴포넌트 |
| `src/data/profile-data.ts` | 프로필 데이터 + 연락처 링크 (정적) |

### 데이터 구조

#### 프로필 (정적 - `profile-data.ts`)

```typescript
const contactProfile = {
  name: "MINJOO SUH",
  title: "",
  tagline: "Building reliable products from QA insight to backend systems.",
  photo: "/images/profile.JPEG",
};
```

#### 연락처 링크 (정적 - `profile-data.ts`)

```typescript
interface ContactLink {
  label: string;
  href: string;
  icon: "mail" | "github" | "globe" | "linkedin";
}
```

| 라벨 | URL | 아이콘 |
|------|-----|--------|
| Email | `mailto:zzz1577@naver.com` | mail |
| GitHub | `https://github.com/MINJOOOONG` | github |
| Blog | `https://joodev-sandy.vercel.app/` | globe |
| LinkedIn | `https://www.linkedin.com/in/minjooooo` | linkedin |

#### Education (DB - `education_data`)

```typescript
interface EducationItem {
  school: string;
  major: string;
  period: string;
}
```

#### Certifications (DB - `certifications_data`)

```typescript
interface CertificationItem {
  name: string;
  date: string;
  certificateNo?: string;
  verifyUrl?: string;
}
```

### 컴포넌트 구조

#### ContactSection (메인)

- `memo()` 래핑
- Props: `{ educationItems?: EducationItem[]; certificationItems?: CertificationItem[] }`
- 헤딩: `SlideHeading label="Contact" title="Contact"`
- `useScrollReveal`: headingRef, profileRef
- `useStaggerReveal`: bottomRef (Education/Certifications)

#### 프로필 영역

- 프로필 사진: `w-36 h-44 sm:w-40 sm:h-48 md:w-44 md:h-52`, `rounded-xl`, `object-cover object-top`
- 이름: `text-3xl sm:text-4xl font-black`, `--notion-navy`
- 태그라인: `15px`, `--notion-slate`
- 링크 뱃지: `LinkBadge` 컴포넌트

#### LinkBadge

- 아이콘 매핑: `{ mail: Mail, github: Github, globe: Globe, linkedin: Linkedin }` (`lucide-react`)
- 스타일: transparent 배경, `hover:-translate-y-0.5`
- mailto 링크는 `target` 속성 없음

#### Education/Certifications 영역

- 구분선 후 2단 그리드 (`sm:grid-cols-2`)
- Education: school(bold) + major(text) + period(tiny)
- Certifications: name(bold) + date(right)
- `useStaggerReveal`로 순차 등장

### 스타일 특성

- max-width: `980px`
- 프로필 레이아웃: `flex-col items-start md:flex-row md:gap-16`
- Education 헤딩: `10px uppercase tracking-[0.22em]`, `--notion-stone`
- 구분선: `border-t border-[var(--notion-hairline)] mt-12 mb-12`

### ResumeData 연동

`portfolio-page.tsx`에서 PDF 내보내기를 위한 `ResumeData`에 프로필 정보가 하드코딩되어 있다:

```typescript
profile: {
  name: "서민주",
  title: "QA Engineer | Backend Developer",
  phone: "+82 10-4948-5089",
  email: "zzz1577@naver.com",
  birthday: "1999.09.21",
  location: "경기도 고양시",
  github: "https://github.com/MINJOOOONG",
  linkedin: "https://www.linkedin.com/in/minjooooo",
  summary: "QA 실무와 백엔드 개발 경험을 바탕으로...",
}
```
