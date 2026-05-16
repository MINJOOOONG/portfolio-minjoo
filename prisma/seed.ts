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

  const experienceData = [
    {
      company: "Viva Republica (Toss)",
      role: "Toss Commerce QA Assistant",
      period: "2025.11 - Present",
      status: "재직 중",
      summary: "커머스 서비스의 운영 시나리오와 사용자 흐름을 분석해 기능 검증 범위와 반복 QA 프로세스를 구조화합니다.",
      achievements: [
        "Deus와 Notion 기반 기획서를 분석해 커머스 운영 시나리오, 검증 조건, 예외 흐름을 기능 단위로 정리",
        "TestRail과 Jira를 활용해 테스트 케이스, 재현 조건, 처리 상태를 추적하고 Regression Test 범위를 관리",
        "Slack 기반 협업 과정에서 이슈의 발생 조건, 영향 범위, 담당자 확인 상태를 명확히 공유해 커뮤니케이션 비용을 절감",
        "반복 QA 중 발견한 비효율적인 사용자 흐름과 운영 리스크를 개선 포인트로 정리해 제품 완성도 향상에 기여",
        "Agile 환경에서 빠르게 변경되는 요구사항을 반영하며 운영 서비스 구조와 품질 검증 프로세스에 대한 이해를 축적",
      ],
      techStack: ["Jira", "Slack", "TestRail", "Deus", "Notion"],
    },
    {
      company: "Riwonsoft",
      role: "QA Intern",
      period: "2025.06 - 2025.09",
      summary: "모바일 게임 출시 전 기능 안정성, 사용자 흐름, UI/서버/아이템 연동을 검증했습니다.",
      achievements: [
        "출시 전 테스트에서 사용자 행동 흐름 단위로 기능을 검증하고 문제 발생 지점을 화면, 데이터, 서버 응답 관점으로 분류",
        "50건 이상의 이슈를 리포트하며 재현 경로, 기대 결과, 실제 결과, 발생 조건을 구체화해 개발자가 빠르게 원인을 추적할 수 있도록 지원",
        "UI, 서버, 아이템 지급 및 사용 흐름을 교차 검증해 서비스 안정성과 실제 사용자 관점의 기능 동작을 점검",
        "수정 완료된 이슈를 반복 테스트하며 재발 여부와 사이드 이펙트를 확인해 릴리스 전 품질 리스크를 낮춤",
        "테스트 과정에서 발견한 불편을 기반으로 UX와 기능 개선 방향을 제안해 서비스 완성도 향상에 기여",
      ],
      techStack: ["Redmine", "Notion", "Unity", "C#", "Slack", "Jira"],
    },
  ];

  const projectData = [
    {
      title: "포트폴리오 웹사이트",
      teamSize: "개인",
      period: "2025",
      summary: "Three.js 3D 배경, 커스텀 커서 인터랙션, GSAP 애니메이션 등 인터랙티브 요소를 결합한 프리미엄 포트폴리오 사이트입니다.",
      description: [
        "Next.js App Router와 React Server Component 기반으로 SSR과 클라이언트 인터랙션을 분리해 초기 로딩 성능과 사용자 경험을 동시에 확보",
        "Three.js + @react-three/fiber로 프로젝트별 3D 배경 씬을 구현하고 마우스 반응, 스크롤 패럴랙스 등 몰입형 인터랙션 적용",
        "Framer Motion 기반 커스텀 커서를 설계해 탄성 변형, 클릭 리플, 호버 라벨, mix-blend-mode 등 에디토리얼 스타일 인터랙션 구현",
        "Prisma + Neon PostgreSQL로 프로젝트, 경력, 스킬 등 전체 콘텐츠를 DB화하고 Admin 페이지에서 실시간 CRUD 가능한 CMS 구조 설계",
        "GSAP 기반 엔트리 페이지 애니메이션, Lenis 스무스 스크롤, IntersectionObserver 기반 섹션별 등장 효과로 페이지 전환 경험 강화",
        "@react-pdf/renderer로 포트폴리오 데이터를 PDF로 내보내는 기능을 구현해 오프라인 공유 지원",
      ],
      techStack: ["Next.js", "TypeScript", "Three.js", "Framer Motion", "GSAP", "Prisma", "Neon", "Tailwind CSS"],
      githubUrl: "https://github.com/MINJOOOONG/portfolio-minjoo",
    },
    {
      title: "개인 기술 블로그 joodev",
      teamSize: "개인",
      period: "2025",
      summary: "기술 기록과 콘텐츠 관리 비효율을 해결하기 위해 직접 설계하고 개발한 CMS형 블로그 플랫폼입니다.",
      description: [
        "Next.js App Router와 TypeScript 기반으로 SSR과 React Server Component를 적용해 페이지별 데이터 흐름을 분리하고 불필요한 클라이언트 상태를 축소",
        "Prisma와 PostgreSQL로 게시글, 태그, 이미지, 관리자 데이터를 구조화해 콘텐츠 확장과 관리가 가능한 데이터 모델 설계",
        "TipTap 에디터 기반으로 코드 블록, Mermaid, 접기 기능 등 기술 문서 작성에 최적화된 작성 환경 구현",
        "Vercel Blob을 활용해 서버리스 환경에서도 이미지 업로드, 저장, 조회 흐름이 안정적으로 동작하도록 파일 관리 구조 구현",
        "Admin 페이지에서 게시글 CRUD, 공개 여부 관리, 콘텐츠 탐색 기능을 제공해 운영 관리 비용을 줄임",
      ],
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TipTap", "Vercel Blob"],
      githubUrl: "https://github.com/MINJOOOONG/joodev",
      liveUrl: "https://joodev-sandy.vercel.app/",
    },
    {
      title: "E-commerce Backend Engineering",
      teamSize: "부트캠프 프로젝트",
      period: "2025",
      summary: "이커머스 도메인의 주문, 결제, 이벤트 흐름을 설계하며 백엔드 트랜잭션과 데이터 정합성을 학습한 프로젝트입니다.",
      description: [
        "요구사항을 기능 단위로 분해하고 매주 구현, 테스트, 회고를 반복하며 API 동작과 예외 케이스를 함께 검증",
        "PR 및 코드 리뷰에서 받은 멘토 피드백을 반영해 pass/fail 기준, 예외 처리, 테스트 가능성을 중심으로 코드 품질을 개선",
        "시퀀스 다이어그램, ERD, 클래스 설계를 작성해 주문, 결제, 재고, 이벤트 발행 흐름의 책임 경계를 정의",
        "Kafka 기반 이벤트 아키텍처를 도입해 결제 이후 후속 처리를 비동기 구조로 분리하고 서비스 간 결합도를 낮춤",
        "결제/주문 흐름에서 중복 요청과 이벤트 재처리 상황을 가정하고 Outbox 패턴과 Idempotency Key를 적용해 데이터 정합성 문제를 설계 단계에서 방지",
        "Claude와 Codex 등 AI Agent를 활용해 설계 검토, 테스트 케이스 도출, 리팩토링 후보 탐색 속도를 높임",
      ],
      techStack: ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "REST API"],
      githubUrl: "https://github.com/MINJOOOONG",
    },
    {
      title: "FSM과 BT 구조를 활용한 게임 인공지능 분석",
      teamSize: "졸업논문",
      period: "2024 - 2025",
      summary: "게임 AI 구조를 직접 구현하고 성능 지표를 기반으로 FSM과 Behavior Tree의 적합성을 비교 분석한 연구 프로젝트입니다.",
      description: [
        "FSM과 Behavior Tree 기반 AI 구조를 비교 분석하고 실제 게임 환경에서 구조별 동작 차이와 성능 차이를 검증",
        "Unity 기반으로 동일한 로직을 가진 FSM/BT 구조를 직접 구현하고 동일 시나리오에서 반복 테스트 수행",
        "Unity Profiler로 응답 속도, 오류 발생 패턴, 처리 흐름 등 주요 지표를 수집해 성능을 정량적으로 분석",
        "구조별 유지보수성, 확장성, 상황 대응 방식의 차이를 바탕으로 상황별 적합한 AI 구조 선택 기준을 도출",
      ],
      techStack: ["Unity", "C#", "FSM", "Behavior Tree", "Profiler"],
      media: {
        type: "pdf",
        url: "/pdf/fsm-vs-bt-thesis-english.pdf",
      },
    },
    {
      title: "UNIST 해상 물류 창업 오디션",
      teamSize: "팀 프로젝트",
      period: "2024",
      summary: "1년간 창업 아이템을 기획, 검증하고 최종 선발 및 창업 지원금을 수주한 제품 실행 경험입니다.",
      description: [
        "PM으로서 문제 정의, 아이템 기획, 프로토타입 개발, 사업화 검증, 발표까지 전 과정을 주도",
        "Unity 기반 VR 시뮬레이션과 Arduino 하드웨어를 결합해 실제 조작감을 반영한 해양 사고 교육 콘텐츠 설계",
        "사용자 흐름을 고려한 UI/UX 구조와 시뮬레이션 인터페이스를 직접 구현하고 체험 과정에서 발견된 불편을 개선",
        "UNIST 창업 오디션 최종 선정 및 1,000만 원 창업 지원금을 수주하며 아이디어의 실행 가능성을 검증",
      ],
      techStack: ["Unity", "Arduino", "PM", "UI/UX", "Product Validation"],
    },
    {
      title: "2024 K-HTML 대학대항전 해커톤",
      teamSize: "팀 프로젝트",
      period: "2024",
      summary: "제한된 시간 내 문제 정의, UI 설계, AI 연동 기능 구현까지 완료한 웹 서비스 프로젝트입니다.",
      description: [
        "한국외국어대학교 대표팀으로 참가해 문제 정의부터 UI 설계, 서비스 구현까지 수행",
        "사용자 행동 흐름 기반 UI 구조와 인터랙션을 설계하고 HTML, CSS, JavaScript로 구현",
        "OpenAI API를 연동해 사용자 입력에 따라 동적으로 응답하는 기능을 구현하고 서비스 형태로 완성",
        "문제 정의, UI 설계, 구현, 검증 과정을 짧은 주기로 반복하며 제한 시간 내 작동 가능한 결과물을 완성",
      ],
      techStack: ["HTML", "CSS", "JavaScript", "OpenAI API", "UI Design"],
    },
    {
      title: "AWS DeepRacer 경진 대회 1등",
      teamSize: "팀 프로젝트",
      period: "2024",
      summary: "강화학습 기반 자율주행 모델을 실험하고 로그 기반으로 개선해 AWS DeepRacer 대회 1위를 달성했습니다.",
      description: [
        "AWS DeepRacer 기반 머신러닝 교육을 통해 강화학습, 보상 함수 설계, 모델 학습 구조를 학습",
        "자율주행 모델 개발을 위해 보상 함수를 직접 설계하고 하이퍼파라미터를 조정하며 성능 개선",
        "다양한 트랙 환경에서 반복 학습과 시뮬레이션을 수행해 주행 안정성과 lap time을 지속적으로 최적화",
        "학습 로그와 결과 데이터를 분석해 성능을 정량적으로 평가하고 개선 방향을 도출해 최종 1위 달성",
      ],
      techStack: ["AWS DeepRacer", "Reinforcement Learning", "Python", "AWS"],
    },
  ];

  const skillsData = {
    Frontend: ["React", "Next.js App Router", "TypeScript"],
    "State / Styling": ["React Query", "Tailwind CSS", "Emotion"],
    "Build & CI/CD": ["Webpack", "Babel", "Vercel", "GitHub Actions", "SVN"],
    Backend: ["Spring Boot", "Java", "REST API", "Prisma", "PostgreSQL", "Redis", "Kafka"],
    "Collaboration / QA": ["Jira", "TestRail", "Redmine", "Slack", "Notion"],
  };

  const educationData = [
    {
      school: "한국외국어대학교",
      major: "정보통신공학과",
      period: "2021.03 - 2026.02",
    },
  ];

  const certificationsData = [
    {
      name: "MA TRIZ Certified Specialist Lv.1",
      date: "2024.05.23",
      certificateNo: "01/27509/A-72",
      verifyUrl: "https://matriz.org/certification/#certified-specialists",
    },
  ];

  // Site Settings
  const settings = [
    {
      key: "site_name",
      value: "MJ.dev",
    },
    {
      key: "site_description",
      value: "QA 실무 경험과 백엔드 개발 역량을 가진 서민주의 포트폴리오",
    },
    {
      key: "hero_title",
      value: "안녕하세요,\n품질을 코드로 증명하는\n개발자입니다.",
    },
    {
      key: "hero_subtitle",
      value: "QA 경험을 바탕으로 테스트 가능한 코드와 신뢰할 수 있는 시스템을 만듭니다.\nAI를 활용해 업무 효율을 높이는 개발에 관심이 많습니다.",
    },
    {
      key: "about_content",
      value: `"단순한 기능 구현이 아니라, 왜 이렇게 개발하는지에 대한 기준과 철학을 가진" 개발자입니다.

제한된 시간과 리소스 안에서 **최대의 효율을 끌어내는 개발**을 지향합니다. 모든 기능에는 명확한 의도와 이유가 있어야 하고, 기술 자체보다 사용자가 실제로 편리함을 느끼는 서비스를 만드는 것이 중요하다고 생각합니다.

QA 실무와 백엔드 개발을 병행하며 **"왜 이 기능이 이렇게 동작해야 하는지"**를 끝까지 질문하는 습관을 갖게 되었습니다. 자신이 만든 기능과 구조를 동료에게 설명하고 설득할 수 있어야 진짜 이해한 것이라 믿습니다.

서비스의 방향성과 사용자 경험까지 고려한 설계, 역할과 책임이 명확히 분리된 구조를 추구합니다. 해커톤, 논문, 창업, QA 현장까지 다양한 환경에서 쌓은 경험을 바탕으로 문제를 하나의 관점에 가두지 않고 **로그, 데이터, 코드, 제품 흐름**을 함께 분석해 핵심 원인을 찾아냅니다.`,
    },
    {
      key: "about_interests",
      value: `- **QA & Testing**: Selenium, TestRail, Regression Test, 탐색적 테스트
- **Backend Development**: Spring Boot, Java, REST API, Prisma, PostgreSQL
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **DevOps**: Docker, Nginx, Vercel CI/CD, GitHub Actions
- **Data & AI**: AWS DeepRacer 강화학습, FSM/BT 게임 AI 분석`,
    },
    {
      key: "about_workstyle",
      value: `- 문제의 근본 원인을 데이터와 코드 관점에서 분석합니다
- 탐색적 테스트 과정에서 UX 리뷰와 제안까지 확대합니다
- 비개발 파트도 포함한 QA 프로세스를 주도합니다
- "왜 그렇게 동작해야 하는지"를 끝까지 질문합니다`,
    },
    {
      key: "about_timeline",
      value: `- **2025.11~현재** - Viva Republica (Toss) Test/Commerce QA Assistant
- **2025.06~09** - Riwonsoft QA Intern
- **2024** - UNIST 해상물류 창업 오디션 최종 선발, K-HTML 해커톤, AWS DeepRacer 1등
- **2021.03~2026.02** - 한국외국어대학교 재학`,
    },
    {
      key: "github_url",
      value: "https://github.com/MINJOOOONG",
    },
    {
      key: "email",
      value: "zzz1577@naver.com",
    },
    {
      key: "blog_url",
      value: "https://joodev-sandy.vercel.app/",
    },
    {
      key: "linkedin_url",
      value: "https://www.linkedin.com/in/minjooooo",
    },
    {
      key: "contact_intro",
      value: "프로젝트 협업, 기술 토론, 또는 그냥 인사도 환영합니다.\n아래 채널이나 폼을 통해 연락해주세요.",
    },
    {
      key: "experience_data",
      value: JSON.stringify(experienceData),
    },
    {
      key: "project_data",
      value: JSON.stringify(projectData),
    },
    {
      key: "skills_data",
      value: JSON.stringify(skillsData),
    },
    {
      key: "education_data",
      value: JSON.stringify(educationData),
    },
    {
      key: "certifications_data",
      value: JSON.stringify(certificationsData),
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
      githubUrl: "https://github.com/MINJOOOONG/portfolio-minjoo",
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
      githubUrl: null,
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
      githubUrl: null,
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
