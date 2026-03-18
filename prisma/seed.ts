import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Site Settings
  const settings = [
    {
      key: "site_name",
      value: "MJ.dev",
    },
    {
      key: "site_description",
      value: "QA 경험을 가진 개발자의 포트폴리오",
    },
    {
      key: "hero_title",
      value: "안녕하세요,\n품질을 코드로 증명하는\n개발자입니다.",
    },
    {
      key: "hero_subtitle",
      value: "QA 경험을 바탕으로 테스트 가능한 코드, 신뢰할 수 있는 시스템을 만듭니다.\n백엔드 개발과 품질 엔지니어링에 관심이 많습니다.",
    },
    {
      key: "about_content",
      value: `소프트웨어 품질에 깊은 관심을 가진 개발자입니다.

QA 엔지니어로서의 경험이 개발자로서의 시각을 넓혀주었습니다. 단순히 동작하는 코드가 아니라, **테스트 가능하고 유지보수하기 쉬운 코드**를 작성하려고 노력합니다.

"버그를 찾는 것"에서 "버그가 생기지 않는 구조를 만드는 것"으로 관심이 이동하면서, 자연스럽게 개발의 세계로 들어오게 되었습니다.`,
    },
    {
      key: "about_interests",
      value: `- **Backend Development**: Java/Spring, Node.js, REST API 설계
- **Testing & QA**: TDD, 통합 테스트, E2E 테스트 자동화
- **Database**: PostgreSQL, Redis, 데이터 모델링
- **DevOps**: CI/CD, Docker, 모니터링
- **Clean Code**: 코드 리뷰, 리팩토링, 디자인 패턴`,
    },
    {
      key: "about_workstyle",
      value: `- 문제의 근본 원인을 파악하고 체계적으로 해결합니다
- 코드 리뷰를 통한 지식 공유를 중요하게 생각합니다
- 테스트 코드는 문서라고 생각합니다
- "왜?"라는 질문을 자주 합니다`,
    },
    {
      key: "about_timeline",
      value: `- **2024** - 풀스택 개발자로의 전환, 개인 프로젝트 시작
- **2023** - QA 엔지니어, 테스트 자동화 프레임워크 구축
- **2022** - 소프트웨어 테스팅 입문, 수동 테스트 및 버그 리포팅`,
    },
    {
      key: "github_url",
      value: "https://github.com",
    },
    {
      key: "email",
      value: "hello@example.com",
    },
    {
      key: "blog_url",
      value: "https://blog.example.com",
    },
    {
      key: "linkedin_url",
      value: "",
    },
    {
      key: "contact_intro",
      value: "프로젝트 협업, 기술 토론, 또는 그냥 인사도 환영합니다.\n아래 채널이나 폼을 통해 연락해주세요.",
    },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("✓ Site settings seeded");

  // Projects
  const projects = [
    {
      title: "포트폴리오 웹사이트",
      slug: "portfolio-website",
      summary: "Next.js 기반 개인 포트폴리오 사이트. 관리자 CMS 포함.",
      description: `## 프로젝트 소개

Next.js App Router를 사용한 개인 포트폴리오 웹사이트입니다.

### 주요 기능
- 관리자 페이지에서 모든 콘텐츠 CRUD 가능
- Markdown 기반 블로그
- 연락 폼 및 메시지 관리
- 다크모드 기본 적용

### 기술적 도전
- Prisma + Neon Postgres로 서버리스 DB 구현
- httpOnly cookie 기반 인증 시스템
- Server Component와 Client Component의 적절한 분리`,
      techStack: ["Next.js", "TypeScript", "Prisma", "Neon", "Tailwind CSS"],
      githubUrl: "https://github.com",
      liveUrl: null,
      featured: true,
      order: 1,
      published: true,
    },
    {
      title: "테스트 자동화 프레임워크",
      slug: "test-automation-framework",
      summary: "Selenium + TestNG 기반 E2E 테스트 자동화 프레임워크.",
      description: `## 프로젝트 소개

QA 엔지니어 시절 구축한 E2E 테스트 자동화 프레임워크입니다.

### 주요 기능
- Page Object Model 패턴 적용
- 데이터 기반 테스트 (Data-Driven Testing)
- CI/CD 파이프라인 연동
- 테스트 결과 리포트 자동 생성

### 성과
- 회귀 테스트 시간 70% 단축
- 릴리스 전 자동 검증 프로세스 확립`,
      techStack: ["Java", "Selenium", "TestNG", "Jenkins", "Allure Report"],
      githubUrl: "https://github.com",
      liveUrl: null,
      featured: true,
      order: 2,
      published: true,
    },
    {
      title: "API 모니터링 대시보드",
      slug: "api-monitoring-dashboard",
      summary: "REST API 상태 모니터링 및 응답 시간 추적 대시보드.",
      description: `## 프로젝트 소개

API 엔드포인트의 상태와 응답 시간을 실시간으로 모니터링하는 대시보드입니다.

### 주요 기능
- 주기적 헬스체크
- 응답 시간 히스토리 차트
- 장애 알림 (Slack, Email)
- 가동률 통계

### 기술 스택 선택 이유
- Spring Boot: 안정적인 스케줄링과 API 개발
- PostgreSQL: 시계열 데이터 저장에 적합
- React: 인터랙티브한 대시보드 UI`,
      techStack: ["Spring Boot", "React", "PostgreSQL", "Docker"],
      githubUrl: "https://github.com",
      liveUrl: null,
      featured: true,
      order: 3,
      published: true,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findUnique({
      where: { slug: project.slug },
    });
    if (!existing) {
      await prisma.project.create({ data: project });
    }
  }
  console.log("✓ Projects seeded");

  // Blog Posts
  const posts = [
    {
      title: "TDD를 실천하며 배운 것들",
      slug: "lessons-from-tdd",
      summary: "테스트 주도 개발을 실제 프로젝트에 적용하면서 얻은 교훈과 팁을 공유합니다.",
      content: `테스트 주도 개발(TDD)을 처음 접했을 때는 "테스트를 먼저 쓰라고?"라는 의문이 들었습니다.

## TDD의 리듬: Red-Green-Refactor

1. **Red**: 실패하는 테스트를 먼저 작성합니다
2. **Green**: 테스트를 통과시키는 최소한의 코드를 작성합니다
3. **Refactor**: 코드를 정리합니다

## 실제로 적용해보니

### 장점
- 설계를 먼저 생각하게 됩니다
- 리팩토링이 두렵지 않습니다
- 문서화 효과가 있습니다

### 주의할 점
- 모든 것에 TDD를 적용할 필요는 없습니다
- 테스트의 가치를 판단하는 눈이 필요합니다
- 과도한 모킹은 오히려 해롭습니다

## 결론

TDD는 도구입니다. 맹목적으로 따르기보다, **왜** 테스트를 작성하는지 이해하는 것이 더 중요합니다.`,
      tags: ["TDD", "Testing", "개발방법론"],
      published: true,
    },
    {
      title: "QA에서 개발자로: 전환 이야기",
      slug: "qa-to-developer",
      summary: "QA 엔지니어에서 개발자로 전환한 과정과 QA 경험이 개발에 미친 영향.",
      content: `QA 엔지니어로 일하면서 소프트웨어의 품질을 바깥에서 검증하는 일을 했습니다.

## 왜 개발로?

버그를 찾는 것도 중요하지만, **버그가 생기지 않는 코드를 짜는 것**이 더 근본적인 해결이라고 느꼈습니다.

## QA 경험이 개발에 미친 영향

### 1. 엣지 케이스에 민감해졌습니다
\`\`\`typescript
// Before: 해피 패스만 고려
function divide(a: number, b: number) {
  return a / b;
}

// After: 예외 상황도 고려
function divide(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
\`\`\`

### 2. 테스트 가능한 코드를 작성합니다
- 의존성 주입을 적극 활용합니다
- 순수 함수를 선호합니다
- 사이드 이펙트를 최소화합니다

### 3. 문서화의 중요성을 압니다
QA 시절 "이 기능 뭐하는 건가요?"라고 물어봤던 경험이 많아서, 코드 자체가 문서가 되도록 노력합니다.

## 결론

QA와 개발은 대립이 아닌 보완 관계입니다. QA 경험은 더 나은 개발자가 되는 데 큰 자산이 됩니다.`,
      tags: ["커리어", "QA", "개발"],
      published: true,
    },
  ];

  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });
    if (!existing) {
      await prisma.blogPost.create({ data: post });
    }
  }
  console.log("✓ Blog posts seeded");

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
