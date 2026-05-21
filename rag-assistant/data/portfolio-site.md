# 포트폴리오 웹사이트 프로젝트

## 개요

서민주의 개인 포트폴리오 웹사이트입니다. 3D 배경, 부드러운 스크롤, 애니메이션을 활용하여 단순한 웹페이지가 아닌 "탐색하는 포트폴리오"를 목표로 구현했습니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- **스타일링**: Tailwind CSS v4 + shadcn/ui
- **3D/애니메이션**: Three.js + @react-three/fiber + @react-three/drei + Framer Motion + GSAP + Lenis
- **데이터베이스**: Prisma + Neon PostgreSQL (서버리스)
- **배포**: Vercel

## 핵심 기능

### 3D 배경
- 진입 페이지: 와이어프레임 Icosahedron + 80개 파티클, 마우스 반응형 회전, 클릭 시 카메라 줌인 전환
- 포트폴리오 페이지: 5개 와이어프레임 도형 + 120개 파티클 + 연결선, 스크롤 패럴랙스

### 데이터 관리
- Admin Dashboard에서 포트폴리오 데이터(경력, 프로젝트, 스킬 등)를 JSON으로 관리
- Prisma ORM + Neon PostgreSQL로 서버리스 DB 사용
- Admin → Prisma → Neon DB → getSettings() → 섹션 컴포넌트 데이터 흐름

### 디자인 원칙
- Clean Document 미학 — 종이 위 이력서, 노트 위 스케치 느낌
- Notion 디자인 토큰 기반 라이트 모드 전용
- 흰 배경 + 미세한 모눈 격자, 그레이 계열 위주
- 미니멀 타이포, 충분한 여백

### 섹션 구성
1. Hero - 랜딩 섹션
2. About - 핵심 강점 5가지와 키워드 어노테이션
3. Experience - 타임라인 형식 경력사항
4. Projects - 프로젝트 쇼케이스 (이미지, 비디오, PDF 지원)
5. Skills - 기술 스택 시각화
6. Education - 학력 및 자격증
7. AI Lab - AI 도구 활용 방식과 원칙
8. Articles - 블로그/기술 글

### 애니메이션
- IntersectionObserver 기반 스크롤 등장 애니메이션 (useScrollReveal)
- 자식 요소 순차 등장 (useStaggerReveal)
- 스크롤 패럴랙스 (useParallax)
- 스프링 바운스 이징

## 이 프로젝트에서 보여주는 역량

- React/Next.js 풀스택 개발 능력
- Three.js를 활용한 3D 웹 구현
- Prisma + PostgreSQL 데이터베이스 설계
- 디자인 시스템 구축 및 적용
- AI 도구(Claude Code)를 활용한 개발 워크플로우
