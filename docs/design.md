# Design System

## Mood & Direction

- **Clean Document** aesthetic — 종이 위의 이력서, 노트 위 스케치 느낌
- 라이트 모드 only — 다크 모드 절대 불가
- 흰색 배경 + 미세한 모눈 격자(grid)로 노트 느낌
- 그레이 계열 색상 위주, 파스텔 tint는 포인트로만
- 미니멀한 타이포그래피, 충분한 여백
- Three.js 3D 와이어프레임/파티클로 깊이감 부여 (연한 회색, 라이트 모드)

---

## Color Palette

### Core Greys

| Token | Value | Usage |
|-------|-------|-------|
| `--notion-canvas` | `#FFFFFF` | 페이지 배경 |
| `--notion-surface` | `#F7F6F3` | 카드/섹션 배경 |
| `--notion-hairline` | `#E9E9E7` | 테두리, 구분선 |
| `--notion-muted` | `#C3C2BF` | 비활성 요소 |
| `--notion-stone` | `#9B9A97` | 보조 텍스트 (약) |
| `--notion-slate` | `#787774` | 보조 텍스트 |
| `--notion-ink` | `#37352F` | 본문 텍스트 |
| `--notion-navy` | `#191919` | 강조 텍스트 |

### Pastel Tints (포인트용)

| Token | Value | Usage |
|-------|-------|-------|
| `--notion-tint-lavender` | `#E8DEEE` | Active 상태, 뱃지 |
| `--notion-tint-mint` | `#DBEDDB` | 기술 태그 |
| `--notion-tint-sky` | `#D3E5EF` | 기술 태그 |
| `--notion-tint-peach` | `#FBE8DE` | 기술 태그 |
| `--notion-tint-rose` | `#F5E0E9` | 기술 태그 |
| `--notion-tint-yellow` | `#FBF3DB` | 기술 태그 |
| `--notion-tint-yellow-bold` | `#F5C518` | 강조 포인트 |
| `--notion-tint-cream` | `#F1EEEA` | 기술 태그 |

### Primary

| Token | Value | Usage |
|-------|-------|-------|
| `--notion-primary` | `#6C5CE7` | 브랜드 컬러, 링크 강조 |

### shadcn 매핑

| Token | Value | Notion 대응 |
|-------|-------|------------|
| `--background` | `#FFFFFF` | `--notion-canvas` |
| `--foreground` | `#37352F` | `--notion-ink` |
| `--card` | `#FFFFFF` | `--notion-canvas` |
| `--muted` | `#F7F6F3` | `--notion-surface` |
| `--muted-foreground` | `#787774` | `--notion-slate` |
| `--border` | `#E9E9E7` | `--notion-hairline` |
| `--primary` | `#6C5CE7` | `--notion-primary` |
| `--secondary` | `#F7F6F3` | `--notion-surface` |

---

## Typography

### Font Stack

```
"Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont,
system-ui, Roboto, "Helvetica Neue", "Segoe UI", sans-serif
```

Monospace: `var(--font-geist-mono), ui-monospace, monospace`

### Hierarchy

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Section title | `clamp(1.6rem, 2vw, 2.2rem)` | 700 | `--notion-ink` |
| Section kicker | `11px` | 500, uppercase, 0.15em spacing | `--muted-foreground` |
| Body text | `15px` | 400 | `--notion-slate` |
| Lead paragraph | `18px` → `20px (sm)` | 500 | `--notion-ink` |
| Small text | `12–13px` | 400 | `--notion-stone` |
| Caption | `11px` | 500, uppercase | `--notion-slate` |

### Editorial Typography Direction

Typography should be treated as a primary structural and atmospheric design element, not only as readable text. The site should move toward a restrained black-and-white editorial typography style rather than a colorful or decorative visual system.

- Use one font family as much as possible, and create variation through `font-size`, `font-weight`, `letter-spacing`, line length, opacity, and placement.
- Text should feel like a composed graphic element or poster, especially in hero and section-heading areas.
- Avoid repeating every text block at the same size. Create strong visual weight differences between words, phrases, and supporting metadata.
- Use scale contrast intentionally. Example composition: `Selected / Works / and / Experiments`, where `Works` can be very large and heavy, while `and` is small, thin, and quiet.
- Important keywords may use gigantic typography, including hero-scale values around `clamp(72px, 10vw, 180px)`.
- Use tight line-height and slightly narrow letter-spacing for large display text to create density.
- Pair ultra-bold display words with very small, thin, quiet supporting text.
- Use intentional line breaks to create asymmetric editorial compositions.
- Do not center every element. Prefer editorial placement such as small text in the upper-left, dominant typography near the middle, and secondary information in the lower-right.
- Preserve generous whitespace around large type so the layout feels premium rather than crowded.
- Use typography hierarchy and spacing as the main source of visual interest. Avoid relying on color for emphasis.
- The mood should reference Swiss editorial design, minimal portfolio sites, quiet luxury, and architecture magazines.
- Background can remain light, but when this direction is applied, prefer a softly toned off-white such as `#f5f5f3` with near-black typography such as `#111111`.
- Motion should remain subtle: fade-up, opacity transitions, word stagger, slight scale, or very small letter-spacing changes.
- Avoid neon, glow, bouncing, or flashy interactions.

---

## Background

모눈 격자(grid) 패턴으로 노트/스케치 느낌:

```css
background:
  linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
  var(--notion-canvas);
background-size: 20px 28px;
```

- 세로선과 가로선 간격이 다름 (20px x 28px) — 언밸런스한 모눈
- 매우 연한 격자선으로 은은하게

---

## Entry Page (`/`)

### 컨셉 — Swiss-Style Experimental Typography
- 흰 배경 + Three.js 3D 와이어프레임/파티클 (연한 회색, 라이트 모드)
- **Swiss poster design / modernist editorial typography** 영감
- 기하학적이고 해체된(deconstructed) 타이포그래피
- 글자가 그래픽 구성 요소로 사용됨 (가독성보다 시각적 구성 우선)
- 검정 타이포 on 흰 배경, 그리드 라인과 통합

### 3D Background (`three-background.tsx`)
- **WireframeObject**: Icosahedron, 반지름 1.8, detail 1
  - 색상: `#c0c0c0`, wireframe, opacity 0.4
  - 마우스 반응형 회전 (lerp 0.05)
  - 줌인 시 scale 1 → 9
- **Particles**: 80개 점
  - 색상: `#aaa`, size 0.04, opacity 0.6
  - 12×8×6 공간에 랜덤 배치
  - 마우스 밀려남 (반경 2.5, force 0.008)
  - 줌인 시 중앙으로 수렴
- **CameraController**: z 5 → -1 줌인 (lerp 0.025)
- Canvas: 투명 배경, dpr [1, 1.5], fov 60

### Swiss Grid Lines
- 수평선 3개 + 수직선 2개 (absolute, `--notion-ink`, opacity 0.03~0.06)
- scaleX/scaleY(0→1) 트랜지션으로 순차 등장
- 포스터 그리드 구조를 시각적으로 암시

### Typography — Deconstructed Letters
- "MINJOO" 각 글자를 개별 `<span>`으로 분리
- **M**: `clamp(5rem, 14vw, 13rem)`, weight 900 — 가장 큼
- **I**: `clamp(3.5rem, 10vw, 9rem)` — 작게, 살짝 회전(-3deg)
- **N**: `clamp(4rem, 11vw, 10rem)` — 아래로 오프셋
- **J**: `clamp(4.5rem, 12vw, 11rem)` — X/Y 오프셋
- **O₁**: `clamp(5rem, 14vw, 13rem)` — M과 동일 크기, 살짝 회전(2deg)
- **O₂**: `clamp(3rem, 8vw, 7rem)` — 스트로크만(text-stroke), opacity 0.4, 겹침
- 로드 시 각 글자가 서로 다른 위치에서 올바른 위치로 이동 (staggered)
- 글자 간 크기 차이로 시각적 리듬 생성

### Role & Subtitle — Asymmetric Placement
- 직함: 우측 상단 오프셋 (`right: 10%`), weight 500, tracking 0.25em
- 서브: 좌측 하단 (`left: 10%, bottom: 22%`), weight 200, tracking 0.35em, opacity 0.6
- 중앙 정렬 X → 비대칭 배치로 에디토리얼 구성감
- CTA: 하단 중앙 (`bottom: 8%`), monospace, pulsing opacity

### 애니메이션
- 로딩: 800ms 후 `data-loaded="true"` → 순차 등장
  - 그리드 라인: 0.3~0.7s delay, scaleX/Y(0→1)
  - 각 글자: 0.15~0.5s stagger, translateY/X/rotate → 정위치
  - 직함: 0.55s delay, translateX(20px) → 0
  - 서브: 0.65s delay, translateY(15px) → 0
  - CTA: 0.7s delay, opacity fade-in
- CTA 펄스: opacity 0.4 ↔ 1.0 (2.8s ease-in-out infinite)
- 줌인 전환: 기존과 동일 (scale(1.5) + fade-out)

### Reduced Motion
- 모든 transition/delay: 0.2s / 0s
- 줌인 animation: 0.3s

### 반응형 (≤640px)
- 직함/서브: 좌우 여백 6%, tracking 축소
- O₂ (스트로크 글자): 숨김
- CTA margin-top: 36px

---

## Portfolio Page (`/portfolio`)

### 3D Background (`three-portfolio-bg.tsx`)
- **FloatingShapes**: 5개 와이어프레임 도형
  - Icosahedron (size 1.2, 0.5), Octahedron (0.9), Dodecahedron (0.7), Tetrahedron (0.6)
  - 색상: `#d0d0d0`, wireframe, opacity 0.25
  - 각 도형 개별 속도로 회전 (0.05~0.1)
  - 부유 모션: sin/cos 기반 Y/X 이동
  - 스크롤 패럴랙스: `scrollY × 0.0003 × (i+1) × 0.5`만큼 Y 하강
  - 마우스 반응형 회전 (lerp 0.03)
- **BackgroundParticles**: 120개 점
  - 색상: `#bbb`, size 0.03, opacity 0.5
  - 16×10×8 공간에 랜덤 배치
  - 마우스 밀려남 (반경 2, force 0.005)
  - 경계 래핑: ±9 (X), ±6 (Y)
- **ConnectionLines**: 60개 점 간 근접 연결선
  - 연결 거리: 3 이내
  - 색상: `#ddd`, opacity 0.12
  - 미세 회전: sin/cos 기반 (0.05, 0.03)
  - 스크롤 반응: Y 위치 `scrollY × 0.0005` 하강
- Canvas: fixed position, inset 0, z-index 0, pointerEvents none

### 섹션 레이아웃
- max-width: `960px`, 중앙 정렬
- 섹션 간격: `min-height: 100vh`, flex center
- padding: `120px 40px 80px` (모바일: `100px 20px 60px`)
- Hero 섹션만 padding 없음 (`scene-section-hero`)
- main: `relative z-10` (3D 배경 위에 표시)

### 컴포넌트 스타일

**카드 (`.metric-card`)**
- 배경: `var(--card)` = `#FFFFFF`
- 테두리: `1px solid var(--border)` = `#E9E9E7`
- box-shadow 없음 (플랫)
- border-radius: `12px`
- padding: `20px`

**섹션 서피스 (`.section-surface`)**
- 배경: `var(--card)` = `#FFFFFF`
- 테두리: `1px solid var(--border)`
- border-radius: `32px`

**기술 태그 (`.tech-badge`)**
- 배경: `var(--notion-surface)` = `#F7F6F3`
- 텍스트: `var(--notion-ink)` = `#37352F`
- padding: `6px 12px`, border-radius: `6px`
- font-size: `12px`, font-weight: 500

**스킬 태그**
- 배경: pastel tint (lavender, mint, sky 등 `CATEGORY_TINTS` 순환)
- 텍스트: `var(--foreground)` = `#37352F`
- padding: `6px 12px`, border-radius: `6px`
- hover: shadow-sm

**타임라인 (Experience)**
- 왼쪽 border: `2px solid var(--notion-hairline)`
- 도트: `8px` 원, `bg-foreground`

**버튼**
- Ghost: transparent bg, `border-border`, `text-foreground`
- Hover: `bg-muted`
- Primary: `bg-foreground`, `text-background`

**구분선 (`.soft-divider`)**
- `height: 1px`, `background: var(--border)` = `#E9E9E7`

---

## Interaction

### 커서
- 검정 하트 SVG (`fill="#111111"`) 커스텀 커서
- `cursor: url(data:image/svg+xml,...) 12 12, auto`

### Scroll Reveal (스프링 바운스)
- `useScrollReveal` 훅 — IntersectionObserver (threshold 0.1)
- 초기 상태: `opacity: 0`, `translateY(120px) scale(0.92)`
- 등장 상태: `opacity: 1`, `translateY(0) scale(1)`
- **opacity**: `0.51s ease-out` (duration × 0.6)
- **transform**: `0.85s cubic-bezier(0.175, 0.885, 0.32, 1.6)` — 오버슈트 스프링 바운스
- 단방향 (스크롤 복귀 시 리셋 없음)

### Stagger Reveal (순차 스프링 바운스)
- `useStaggerReveal` 훅 — 자식 요소별 순차 등장
- 초기 상태: `opacity: 0`, `translateY(100px) scale(0.9)`
- stagger 간격: `0.07s`
- **opacity**: `0.48s ease-out` (duration × 0.6)
- **transform**: `0.8s cubic-bezier(0.175, 0.885, 0.32, 1.6)` — 동일한 스프링 바운스
- childSelector로 대상 지정 (기본: `> *`)

### Scroll Progress
- 우측 고정 세로 라인 (`right: 24px`, 수직 중앙)
- 배경: `var(--border)`, 높이 `96px`, 너비 `1px`
- 활성: `var(--foreground)`, `scaleY(0→1)` (GSAP ScrollTrigger)
- md 이상에서만 표시

### Reduced Motion
- 진입 페이지: transition 0.2s, animation 0.3s
- 포트폴리오: 별도 처리 없음 (향후 추가 가능)

---

## Hero Section (`/portfolio`)

### Profile
- 프로필 사진: `80×80px`, `rounded-full`, `ring-1 ring-border`

### Typography
- 이름: `text-5xl sm:text-7xl md:text-8xl`, `font-black`, tracking `-0.03em`
- 직함: `text-sm sm:text-base`, `font-light`, tracking `0.25em`, uppercase
- 요약: `text-sm sm:text-base`, `leading-[2]`, `text-muted-foreground/70`

### 상태 뱃지
- 배경: `var(--notion-tint-lavender)`
- 텍스트: `var(--notion-primary)`
- 좌측 점: `var(--notion-primary)`, `animate-pulse`

### 링크 버튼
- Ghost 스타일: `border-border`, `text-muted-foreground`
- hover: `border-foreground/30`, `text-foreground`
- `h-9`, `px-4`, `text-xs`, `tracking-wide`

### Scroll Indicator
- 세로 라인 `h-8 w-px bg-border`
- 내부 점: `bg-foreground/40`, `translateY(0→16px)` 반복 (2s)

---

## Navbar

### 구조
- `fixed top-0`, `z-50`
- 높이: `h-14`
- max-width: `960px`, 중앙 정렬
- 우측 정렬 (`justify-end`)

### 스크롤 상태
- 기본: `bg-transparent`
- 스크롤 (>50px): `bg-[var(--notion-canvas)]/80 backdrop-blur-xl border-b border-[var(--notion-hairline)]`
- transition: `500ms`

### 네비게이션 아이템
- `text-xs`, `font-medium`, `tracking-wide`
- 비활성: `text-muted-foreground`, hover → `text-foreground`
- 활성: `text-foreground`, `bg-muted`
- `rounded-md`, `px-3 py-1.5`
- sm 이상에서만 표시 (`hidden sm:flex`)

### 섹션 감지
- IntersectionObserver: rootMargin `-30% 0px -30% 0px`
- threshold: `[0, 0.25, 0.5, 0.75, 1]`
- 가장 많이 보이는 섹션이 active

---

## Spacing

| Scale | Value | Usage |
|-------|-------|-------|
| xs | `4px` | 태그 내부, 인라인 간격 |
| sm | `8px` | 컴포넌트 내부 |
| md | `16px` | 요소 간 간격 |
| lg | `32px` | 블록 간 간격 |
| xl | `64px` | 섹션 내부 |
| 2xl | `120px` | 섹션 상단 패딩 |

---

## Markdown Content

`.markdown-content` 클래스 스타일:

| Element | Style |
|---------|-------|
| 전체 | `line-height: 1.8`, `color: var(--foreground)` |
| h1 | `2em`, weight 700 |
| h2 | `1.5em`, weight 700, 하단 border |
| h3 | `1.25em`, weight 600 |
| code | `bg: var(--muted)`, monospace, `0.9em` |
| pre | `bg: #f8fafc`, `border: var(--border)`, `border-radius: 1em` |
| blockquote | `border-left: 3px var(--border)`, `bg: var(--muted)`, `border-radius: 0 8px 8px 0` |
| table | `border-collapse`, `border: var(--border)` |

### About 섹션 특수 스타일 (`.about-copy`)
- 첫 문단: `18px → 20px (sm)`, weight 500, `--notion-ink`
- 나머지: `15px → 17px (sm)`, weight 400, `--notion-slate`
- strong: `--notion-ink`, weight 700
- gap: `18px → 20px (sm)`

---

## File Reference

| File | Purpose |
|------|---------|
| `src/app/globals.css` | CSS 변수, body 격자, 진입 페이지, 공통 컴포넌트 스타일 |
| `src/components/shared/entry-loader.tsx` | 진입 페이지 (Three.js + 타이포 + 줌인 전환) |
| `src/components/shared/three-background.tsx` | 진입 3D 배경 (와이어프레임 + 파티클 + 카메라) |
| `src/components/shared/three-portfolio-bg.tsx` | 포트폴리오 3D 배경 (도형 + 파티클 + 연결선) |
| `src/components/shared/scene-layout.tsx` | 포트폴리오 레이아웃 (3D 배경 + 섹션 래핑) |
| `src/components/shared/scene-navbar.tsx` | 네비게이션 바 (IntersectionObserver) |
| `src/components/shared/scroll-progress.tsx` | 스크롤 진행 표시 (GSAP ScrollTrigger) |
| `src/components/shared/smooth-scroll-provider.tsx` | Lenis 스무스 스크롤 |
| `src/components/shared/portfolio-page.tsx` | 포트폴리오 데이터 로딩 + 섹션 조합 |
| `src/components/sections/` | 각 섹션 컴포넌트 (hero, about, experience 등) |
| `src/hooks/use-scroll-reveal.ts` | 스프링 바운스 스크롤 등장 훅 |
| `src/hooks/use-stagger-reveal.ts` | 순차 스프링 바운스 등장 훅 |
| `src/hooks/use-parallax.ts` | 패럴랙스 훅 |
| `src/app/icon.svg` | 파비콘 (검정 하트) |
