# 시스템 아키텍처

## 전체 구조

```
[Browser] → [Vercel Edge] → [Next.js App Router] → [Neon PostgreSQL]
                                    ↓
                              [Prisma ORM]
```

- **프론트엔드/백엔드**: Next.js 16 (App Router, Server Components)
- **데이터베이스**: PostgreSQL (Neon Serverless)
- **ORM**: Prisma + @prisma/adapter-neon
- **배포**: Vercel
- **스타일**: Tailwind CSS v4 + 커스텀 CSS

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (Pretendard 폰트, 다크 테마)
│   ├── globals.css             # 전역 스타일, 컬러 토큰, 유틸리티 클래스
│   ├── (public)/               # 공개 라우트 그룹
│   │   ├── layout.tsx          # 공개 레이아웃 (패스스루)
│   │   ├── page.tsx            # 메인 싱글페이지 (모든 섹션 조합)
│   │   └── blog/
│   │       ├── layout.tsx      # 블로그 전용 헤더/푸터
│   │       ├── page.tsx        # 블로그 목록
│   │       └── [slug]/page.tsx # 블로그 상세
│   ├── admin/                  # 관리자 영역
│   │   ├── login/page.tsx
│   │   ├── page.tsx            # 대시보드
│   │   ├── posts/page.tsx      # 블로그 CRUD
│   │   ├── projects/page.tsx   # 프로젝트 CRUD (레거시)
│   │   ├── settings/page.tsx   # 사이트 설정
│   │   └── messages/page.tsx   # 문의 메시지
│   └── api/
│       ├── admin/              # 관리자 API (인증 필요)
│       └── contact/            # 공개 문의 API
├── components/
│   ├── sections/               # 메인 페이지 섹션 컴포넌트 (Client Components)
│   │   ├── navbar.tsx          # 스크롤 네비게이션
│   │   ├── hero.tsx            # 프로필 카드 (하드코딩)
│   │   ├── about.tsx           # 자기소개 (Markdown)
│   │   ├── experience.tsx      # 경력 (인라인 수정 가능)
│   │   ├── projects.tsx        # 프로젝트 (인라인 수정 가능)
│   │   ├── skills.tsx          # 기술 스택
│   │   ├── education.tsx       # 학력 + 자격증
│   │   └── blog-preview.tsx    # 최근 블로그 미리보기
│   ├── shared/                 # 공유 컴포넌트
│   ├── ui/                     # shadcn 기반 UI
│   └── admin/                  # 관리자 전용 컴포넌트
├── lib/
│   ├── prisma.ts               # Prisma 클라이언트 (Neon 어댑터)
│   ├── settings.ts             # 설정 조회 + JSON 파싱 헬퍼
│   ├── auth.ts                 # 인증 (비밀번호 검증, 세션)
│   ├── api-auth.ts             # API 라우트 인증 미들웨어
│   └── utils.ts                # cn() 유틸리티
└── middleware.ts               # /admin/* 경로 보호
```

## 데이터 흐름

### 공개 페이지 (`/`)

```
page.tsx (Server Component)
  ├── getSettings()              → SiteSetting 테이블 (key-value)
  └── prisma.blogPost.findMany() → BlogPost 테이블
         ↓
  parseJsonSetting()으로 JSON 문자열 → 객체 변환
         ↓
  각 섹션 컴포넌트에 props로 전달
```

### 인라인 수정 (Experience / Projects)

```
메인 페이지 → ✎ 수정 클릭
  → 비밀번호 모달 → POST /api/admin/login (서버 측 검증)
  → 성공 시 admin_session 쿠키 발급
  → 수정 모드 진입 (로컬 state 편집)
  → 저장 → PUT /api/admin/settings (쿠키 기반 인증)
  → SiteSetting 테이블 업데이트
```

### 관리자 영역

```
Browser (Client Component)
  → fetch("/api/admin/*")
  → requireAdmin() 미들웨어 (세션 검증)
  → Prisma CRUD
  → JSON 응답
```

### Settings 데이터 구조

| 키 | 타입 | 설명 |
|----|------|------|
| `about_content` | Markdown 문자열 | 자기소개 |
| `experience_data` | JSON 배열 | `[{company, role, period, summary, achievements, status?, techStack?}]` |
| `project_data` | JSON 배열 | `[{title, teamSize, period, summary, description, techStack, media?, githubUrl?, liveUrl?}]` |
| `skills_data` | JSON 객체 | `{"카테고리명": ["기술1", "기술2"]}` |
| `education_data` | JSON 배열 | `[{school, major, period}]` |
| `certifications_data` | JSON 배열 | `[{name, date}]` |
| `site_name` | 문자열 | 사이트 이름 |
| `site_description` | 문자열 | 메타 설명 |

## 페이지 구조

### 싱글 페이지 (`/`)
- Navbar → Hero(프로필 카드) → About → Experience → Projects → Skills → Education & Certs → Blog Preview → Footer
- Server Component에서 데이터 조회 후 Client Component 섹션에 props 전달
- Experience, Projects: Client Component (인라인 수정 기능 내장)
- Navbar: Client Component (스크롤 이벤트)

### 블로그 (`/blog`, `/blog/[slug]`)
- 별도 라우트 + 자체 layout (간단한 헤더/푸터)
- 메인 페이지와 독립적으로 동작

### 관리자 (`/admin/*`)
- middleware.ts로 모든 경로 보호 (세션 쿠키 검증)
- 클라이언트 컴포넌트 기반 CRUD UI
- API Routes로 서버와 통신

## 주요 설계 결정

### 왜 싱글 페이지인가?
- 채용 담당자가 한 번의 스크롤로 모든 정보를 파악할 수 있어야 함
- 페이지 이동은 정보 탐색을 방해하고 이탈률을 높임
- 이력서는 본질적으로 단일 문서

### 왜 프로필은 하드코딩인가?
- 첫 화면의 레이아웃 안정성이 가장 중요
- 이름, 연락처, 링크는 거의 변하지 않음
- CMS 입력값 길이에 따라 UI가 깨질 위험 방지

### 왜 나머지는 Settings 기반인가?
- 경력, 프로젝트, 학력, 자격증은 추가/수정이 발생할 수 있음
- JSON 문자열로 저장하면 별도 DB 마이그레이션 없이 구조 변경 가능
- 메인 페이지에서 인라인 수정 가능 (Experience, Projects)
- 관리자 페이지에서도 JSON 직접 편집 가능

### 인라인 수정 기능
- `/admin` 이동 없이 메인 페이지에서 바로 수정 가능
- 비밀번호 인증 → 수정 모드 전환 → 저장
- 기존 `/api/admin/login` + `/api/admin/settings` API 재사용
- 프론트엔드 비밀번호 하드코딩 없음, 서버 측 검증만 사용

### 인증 방식
- 단일 비밀번호 기반 (개인 포트폴리오이므로 충분)
- 환경변수 `ADMIN_PASSWORD`로 관리
- 24시간 세션 만료 + HttpOnly 쿠키
- 타이밍 공격 방지를 위한 constant-time 비교

### 디자인 원칙
- 이력서형 UI: 문서 느낌, 높은 정보 밀도, 빠른 스캔
- 다크 테마: #0a0a0f 배경, #a78bfa 퍼플 액센트
- 최소 장식: hover glow 없음, 애니메이션 없음
- 섹션 구분: 단순 border-top, uppercase 소제목
- 컨테이너: max-w-[880px] 중앙 정렬
