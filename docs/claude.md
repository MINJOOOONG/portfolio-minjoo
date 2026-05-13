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

## 파일 구조 규칙

| 위치 | 용도 |
|------|------|
| `src/components/sections/` | 포트폴리오 섹션 (hero, about, experience 등) |
| `src/components/shared/` | 레이아웃, 네비게이션, 3D 배경, 공용 컴포넌트 |
| `src/components/ui/` | shadcn 기본 UI 컴포넌트 |
| `src/hooks/` | 커스텀 훅 (scroll-reveal, stagger-reveal, parallax) |
| `src/lib/` | 유틸리티, DB, 인증, PDF |
| `src/app/(public)/` | 공개 라우트 (진입, 포트폴리오, 블로그) |
| `src/app/admin/` | Admin 대시보드 |

---

## 코딩 패턴

### 컴포넌트
- `"use client"` — 인터랙션/훅 사용 시 필수
- `memo()` 래핑 — 섹션 컴포넌트는 `memo`로 불필요한 리렌더링 방지
- Props는 `interface`로 명시 타입 정의

### 애니메이션
- `useScrollReveal` — 섹션 전체 바운스 등장 (IntersectionObserver + CSS transition)
- `useStaggerReveal` — 자식 요소 순차 등장 (childSelector로 대상 지정)
- 이징: `cubic-bezier(0.175, 0.885, 0.32, 1.6)` — 스프링 바운스 (오버슈트 후 정착)
- Three.js `useFrame` — 매 프레임 애니메이션 (마우스 반응, 스크롤 패럴랙스)

### 데이터
```typescript
// 설정 불러오기
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

---

## 주요 주의사항

1. **CSS 변수 변경 시** — `:root`에 정의된 Notion 토큰과 shadcn 변수가 모든 컴포넌트에 영향. 신중하게 변경
2. **Three.js 컴포넌트** — `Canvas` 내부에서만 Three.js 훅 (`useFrame`, `useThree` 등) 사용 가능
3. **PDF 내보내기** — `@react-pdf/renderer`는 Tailwind 클래스 불가. `src/lib/pdf/` 내 별도 스타일 사용
4. **Admin 기능** — 편집 모드, 인증 등 Admin 관련 로직은 변경 시 반드시 동작 확인
5. **Lenis 스크롤** — `SmoothScrollProvider`가 스크롤을 제어. `window.scrollTo` 대신 Lenis API 고려

---

## 자주 쓰는 명령어

```bash
npm run dev          # 개발 서버 (Turbopack)
npm run build        # 프로덕션 빌드
npm run db:studio    # Prisma Studio (DB GUI)
npm run db:push      # 스키마 변경 반영
```
