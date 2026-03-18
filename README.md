# MJ.dev Portfolio

QA 경험을 가진 개발자의 개인 포트폴리오 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Neon Postgres + Prisma ORM
- **Deployment**: Vercel

## 주요 기능

- 다크모드 기본 적용
- 관리자 페이지에서 모든 콘텐츠 CRUD (프로젝트, 블로그, 사이트 설정)
- Markdown 기반 블로그
- 연락 폼 + 메시지 관리
- 재배포 없이 콘텐츠 실시간 반영
- httpOnly cookie 기반 안전한 인증

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일에서 실제 Neon DB URL과 관리자 비밀번호를 설정하세요.

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
- 기본 비밀번호: `.env`의 `ADMIN_PASSWORD` 값

## 배포 (Vercel)

1. GitHub에 push
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 환경변수 설정:
   - `DATABASE_URL`: Neon DB 연결 문자열
   - `ADMIN_PASSWORD`: 관리자 비밀번호
4. 배포

## 폴더 구조

```
src/
├── app/
│   ├── (public)/          # 공개 페이지 (Home, About, Projects, Blog, Contact)
│   ├── admin/             # 관리자 페이지
│   └── api/               # API 라우트
├── components/
│   ├── admin/             # 관리자 컴포넌트
│   ├── shared/            # 공용 컴포넌트
│   └── ui/                # shadcn/ui 컴포넌트
├── lib/                   # 유틸리티 (prisma, auth, settings)
└── generated/prisma/      # Prisma 생성 클라이언트
prisma/
├── schema.prisma          # DB 스키마
└── seed.ts                # 초기 데이터
```

## 보안 참고사항

- 관리자 비밀번호는 반드시 환경변수로 관리 (코드에 하드코딩 금지)
- 운영 환경에서는 기본 비밀번호를 반드시 변경하세요
- 모든 관리자 API는 서버에서 세션 검증
- httpOnly cookie로 세션 토큰 관리 (XSS 방지)
