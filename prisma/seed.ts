import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { notionProjectAssets } from "./notion-project-assets";

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
      role: "Toss Core Commerce QA Assistant",
      period: "2025.11 - Present",
      status: "재직 중",
      companyIconUrl: "https://favicon.im/toss.im?larger=true",
      companyIconFallback: "T",
      summary: "현재 Toss Core의 Commerce 팀에서 QA Assistant로 근무하며, 주 단위 버전 업데이트와 잦은 배포가 이루어지는 애자일한 모바일 커머스 서비스의 품질 검증을 담당하고 있습니다.",
      summaryEn: "I currently work as a QA Assistant on Toss Core's Commerce team, responsible for quality verification of an agile mobile commerce service with weekly version updates and frequent releases.",
      achievements: [
        "주요 업무로는 Web, iOS, Android 환경에서 회귀 테스트와 탐색 테스트를 수행하고 있습니다. Toss 내부 Figma 기반 디자인 시스템인 Deus와 Notion에 정리된 기획서 및 디자인 사양을 확인하며, 신규 기능과 UI/UX 변경 사항이 제품 요구사항, 정책 및 컴플라이언스 기준, 기능 품질 기준에 맞게 동작하는지 검증합니다.",
        "또한 웹에서 등록되거나 변경된 상품 정보가 iOS와 Android 앱에서 정상적으로 노출되고 동작하는지 확인하는 등 커머스 서비스의 end-to-end 흐름을 검증합니다. 새로운 프로젝트가 진행될 때마다 테스트 케이스를 작성하고 수정하며, 예외 케이스를 식별하고 사용자 및 품질 관점에서 의견을 제시합니다.",
        "이슈 발생 시 재현 절차, 기대 결과, 실제 결과, 영향 범위, 발생 조건을 명확히 정리하고, Jira와 Slack을 통해 PM, 디자이너, 엔지니어와 협업하며 이슈를 추적합니다.",
        "또한 업무 과정에서 Claude와 Codex 등 AI Agent를 적극적으로 활용하여 생산성과 문제 해결 효율을 높이고 있습니다. 반복적인 QA 업무의 수작업 부담을 줄이기 위해 간단한 자동화 스크립트나 구조화된 업무 흐름을 만들며, 테스트 효율성과 일관성, 프로세스 품질을 개선하고 있습니다.",
      ],
      achievementsEn: [
        "My main work includes regression and exploratory testing across Web, iOS, and Android. I review Deus, Toss's internal Figma-based design system, along with specs and design requirements documented in Notion, verifying that new features and UI/UX changes meet product requirements, policy and compliance standards, and functional quality criteria.",
        "I verify the end-to-end commerce flow, including whether product information registered or changed on the web is displayed and works correctly in the iOS and Android apps. For each new project, I write and update test cases, identify edge cases, and provide feedback from user and quality perspectives.",
        "When issues occur, I clearly document reproduction steps, expected results, actual results, impact scope, and occurrence conditions, then track issues by collaborating with PMs, designers, and engineers through Jira and Slack.",
        "I also actively use AI Agents such as Claude and Codex to improve productivity and problem-solving efficiency. To reduce manual burden in repetitive QA work, I create simple automation scripts and structured workflows, improving test efficiency, consistency, and process quality.",
      ],
      techStack: ["Web", "iOS", "Android", "Deus", "Notion", "Jira", "Slack", "Claude", "Codex"],
    },
    {
      company: "Riwonsoft",
      role: "QA Tester",
      period: "2025.06 - 2025.09",
      companyIconFallback: "R",
      summary: "모바일 게임 출시 전 기능 안정성, 사용자 흐름, UI·서버·아이템 연동을 검증했습니다.",
      achievements: [
        "사용자 행동 흐름을 기준으로 기능을 검증하고, 문제 발생 지점을 화면·데이터·서버 응답 관점으로 분류했습니다.",
        "50건 이상 이슈 리포트를 작성하며 재현 경로, 기대 결과, 실제 결과, 발생 조건을 구체화했습니다.",
        "UI·서버·아이템 지급 및 사용 흐름을 교차 검증해 실사용자 관점의 동작을 확인했습니다.",
        "수정 완료 이슈를 반복 테스트하며 재발 여부와 사이드 이펙트를 확인했습니다.",
        "테스트 과정에서 발견한 불편 사항을 바탕으로 UX와 기능 개선 방향을 제안했습니다.",
      ],
      techStack: ["Redmine", "Notion", "Unity", "C#", "Slack", "Jira"],
    },
  ];

  const projectData = [
    {
      title: "포트폴리오 웹사이트",
      teamSize: "개인 / 1인 개발",
      period: "2026.05 - 진행중",
      summary: "AI Agent와 RAG 검색을 적용한 인터랙티브 포트폴리오 웹사이트입니다.",
      description: [
        "Next.js App Router와 React Server Component 기반으로 SSR과 클라이언트 인터랙션을 분리해 초기 로딩 성능과 사용자 경험을 동시에 확보",
        "Three.js + @react-three/fiber로 프로젝트별 3D 배경 씬을 구현하고 마우스 반응, 스크롤 패럴랙스 등 몰입형 인터랙션 적용",
        "Prisma + Neon PostgreSQL로 프로젝트, 경력, 스킬 등 전체 콘텐츠를 DB화하고 Admin 페이지에서 실시간 CRUD 가능한 CMS 구조 설계",
        "Python 기반 RAG 파이프라인(문서 로딩 → chunking → sentence-transformers 로컬 임베딩 → FAISS vector search → Groq LLM 답변 생성)을 설계하고 FastAPI 서버로 구현",
        "Next.js 포트폴리오 상단에 AI 검색창(PortfolioAskBar)을 추가하고, Next.js API Route → Python FastAPI 프록시 구조로 RAG 시스템과 연동",
        "RAG 답변과 함께 관련 포트폴리오 섹션으로 이동하는 AI Navigation 기능을 추가하여 탐색 경험을 개선",
      ],
      techStack: ["Next.js", "TypeScript", "Three.js", "React Three Fiber", "Framer Motion", "GSAP", "Tailwind CSS", "Prisma", "Neon", "Python", "FastAPI", "FAISS", "Groq API", "LangChain"],
      role: "프론트엔드 구현, RAG 파이프라인 설계, Python 백엔드 구현",
      githubUrl: "https://github.com/MINJOOOONG/portfolio-minjoo",
      liveUrl: "https://portfolio-minjoo.vercel.app",
      ...notionProjectAssets.portfolioWebsite,
    },
    {
      title: "개인 기술 블로그 joodev",
      teamSize: "개인",
      period: "2025.04 - 진행중",
      summary: "기술 글 작성과 관리를 직접 운영하는 CMS형 개인 블로그입니다.",
      description: [
        "Next.js App Router와 TypeScript 기반으로 SSR과 React Server Component를 적용해 페이지별 데이터 흐름을 분리하고 불필요한 클라이언트 상태를 축소",
        "Prisma와 PostgreSQL로 게시글, 태그, 이미지, 관리자 데이터를 구조화해 콘텐츠 확장과 관리가 가능한 데이터 모델 설계",
        "TipTap 에디터 기반으로 코드 블록, Mermaid, 접기 기능 등 기술 문서 작성에 최적화된 작성 환경 구현",
        "Vercel Blob을 활용해 서버리스 환경에서도 이미지 업로드, 저장, 조회 흐름이 안정적으로 동작하도록 파일 관리 구조 구현",
        "Admin 페이지에서 게시글 CRUD, 공개 여부 관리, 콘텐츠 탐색 기능을 제공해 운영 관리 비용을 줄임",
      ],
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "TipTap", "Vercel Blob"],
      achievement: "TipTap 에디터, 태그/카테고리, Admin CMS 구현",
      role: "기획, 풀스택 구현, 배포",
      githubUrl: "https://github.com/MINJOOOONG/joodev",
      liveUrl: "https://joodev-sandy.vercel.app/",
      ...notionProjectAssets.joodevBlog,
    },
    {
      title: "E-commerce Backend Engineering",
      teamSize: "부트캠프 프로젝트",
      period: "2025.01 - 2025.03",
      summary: "주문·결제·이벤트 흐름을 구현한 이커머스 백엔드 프로젝트입니다.",
      description: [
        "요구사항을 기능 단위로 분해하고 매주 구현, 테스트, 회고를 반복하며 API 동작과 예외 케이스를 함께 검증",
        "PR 및 코드 리뷰에서 받은 멘토 피드백을 반영해 pass/fail 기준, 예외 처리, 테스트 가능성을 중심으로 코드 품질을 개선",
        "시퀀스 다이어그램, ERD, 클래스 설계를 작성해 주문, 결제, 재고, 이벤트 발행 흐름의 책임 경계를 정의",
        "Kafka 기반 이벤트 아키텍처를 도입해 결제 이후 후속 처리를 비동기 구조로 분리하고 서비스 간 결합도를 낮춤",
        "결제/주문 흐름에서 중복 요청과 이벤트 재처리 상황을 가정하고 Outbox 패턴과 Idempotency Key를 적용해 데이터 정합성 문제를 설계 단계에서 방지",
        "Claude와 Codex 등 AI Agent를 활용해 설계 검토, 테스트 케이스 도출, 리팩토링 후보 탐색 속도를 높임",
      ],
      techStack: ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "REST API"],
      achievement: "Redis 대기열, Kafka 이벤트, 실시간 랭킹, Spring Batch 구현",
      role: "백엔드 구조 설계 및 기능 구현",
      githubUrl: "https://github.com/MINJOOOONG",
      ...notionProjectAssets.ecommerceBackend,
    },
    {
      title: "아두이노를 이용한 사회적 제품 제작",
      category: "activity" as const,
      teamSize: "4명",
      period: "2023.09 - 2023.12",
      summary: "Arduino와 OpenCV로 사회문제 해결 아이디어를 프로토타입으로 만든 팀 프로젝트입니다.",
      description: [
        "제품 아이디어를 문제 정의, 사용자 상황, 구현 가능성 기준으로 좁히고 센서 입력과 시각 처리 흐름을 함께 설계",
        "Arduino 기반 하드웨어 입력과 Python 로직을 연결해 실제 사용 상황에서 동작하는 프로토타입을 제작",
        "OpenCV를 활용해 카메라 입력을 처리하고, 인식 결과를 제품 동작 로직과 연결하는 흐름을 구현",
        "Flow chart로 전체 동작 과정을 정리하며 팀원 간 구현 범위와 데이터 흐름을 명확히 공유",
        "제한된 장비와 기간 안에서 완성 가능한 형태로 기능을 줄이고 검증 가능한 데모를 만드는 경험을 축적",
      ],
      techStack: ["Arduino", "Python", "OpenCV", "Hardware Prototype"],
      achievement: "Arduino·OpenCV 연동 프로토타입 구현",
      role: "하드웨어-소프트웨어 연동 개발",
      blogUrl: "https://m.blog.naver.com/minjoongthi/223239867325",
      ...notionProjectAssets.arduinoSocialProduct,
    },
    {
      title: "FSM과 BT 구조를 활용한 게임 인공지능 분석",
      teamSize: "졸업논문",
      period: "2024.03 - 2025.02",
      summary: "Unity 2021.3 기반 2D 액션 게임에서 FSM과 Behavior Tree를 동일 조건으로 구현하고, 응답 속도·오류율·전환 효율·행동 다양성 및 사용자 평가를 비교한 졸업논문입니다.",
      description: [
        "Vampire Survivors류 2D 액션 게임을 직접 제작하고, 몬스터 AI·무한 맵·웨이브 스폰·무기 전환 4개 서브시스템을 FSM과 BT 방식으로 각각 구현했습니다.",
        "동일한 게임 조건에서 60초 단위 테스트를 구조별 5회 반복하고, 50개 몬스터 엔티티 기준으로 Unity Time.time API와 커스텀 CSV 로그를 사용해 데이터를 수집했습니다.",
        "정량 결과에서 BT는 FSM 대비 응답 속도 21% 개선(140ms → 110ms), 오류율 72% 감소(7.4% → 2.1%), 전환 시간 47% 단축(85ms → 45ms)을 보였습니다.",
        "행동 다양성도 BT가 44% 높게 측정되었으며(3.2 → 4.6 actions/min), 복잡한 상황에서 더 자연스럽고 덜 반복적인 행동 패턴을 보였습니다.",
        "정성 평가는 10명 대상 5점 리커트 설문으로 진행했으며, 몰입감(4.4 vs 3.1), 자연스러움(4.5 vs 2.8), 유지보수성(4.3 vs 2.6)에서 BT가 더 높은 평가를 받았습니다.",
        "FSM은 작은 상태 집합에는 단순하고 직관적이지만, 상태 수와 전환 조건이 늘수록 state explosion, 조건 충돌, 평가 순서 의존성이 발생한다는 한계를 확인했습니다.",
        "최종적으로 단순한 애니메이션/게임 모드 전환에는 FSM, 복잡한 NPC와 시스템 AI에는 BT를 적용하는 하이브리드 선택 기준을 제안했습니다.",
      ],
      techStack: ["Unity 2021.3 LTS", "C#", "FSM", "Behavior Tree", "NodeCanvas", "Unity Time.time", "CSV Logger", "Likert Survey"],
      achievement: "BT의 성능·안정성·사용자 경험 우위를 실험 데이터로 검증",
      role: "연구 설계, Unity 구현, 논문 집필",
      media: {
        type: "pdf",
        url: "/pdf/fsm-vs-bt-thesis-english.pdf",
      },
      ...notionProjectAssets.fsmBtThesis,
    },
    {
      title: "UNIST 해상 물류 창업 오디션",
      category: "activity" as const,
      teamSize: "팀 프로젝트",
      period: "2024.03 - 2024.12",
      summary: "해상 물류 교육 아이템을 기획하고 창업 오디션에 선발된 활동입니다.",
      description: [
        "PM으로서 문제 정의, 아이템 기획, 프로토타입 개발, 사업화 검증, 발표까지 전 과정을 주도",
        "Unity 기반 VR 시뮬레이션과 Arduino 하드웨어를 결합해 실제 조작감을 반영한 해양 사고 교육 콘텐츠 설계",
        "사용자 흐름을 고려한 UI/UX 구조와 시뮬레이션 인터페이스를 직접 구현하고 체험 과정에서 발견된 불편을 개선",
        "UNIST 창업 오디션 최종 선정 및 1,000만 원 창업 지원금을 수주하며 아이디어의 실행 가능성을 검증",
      ],
      techStack: ["Unity", "Arduino", "PM", "UI/UX", "Product Validation"],
      achievement: "최종 선정 및 1,000만 원 창업 지원금 수주",
      role: "PM (기획, 프로토타입 개발, 발표)",
      ...notionProjectAssets.unistStartupAudition,
    },
    {
      title: "2024 K-HTML 대학대항전 해커톤",
      category: "activity" as const,
      teamSize: "팀 프로젝트",
      period: "2024.07",
      summary: "Azure OpenAI를 활용해 사회문제 해결 서비스를 만든 해커톤 프로젝트입니다.",
      description: [
        "한국외국어대학교 대표팀으로 참가해 문제 정의부터 UI 설계, 서비스 구현까지 수행",
        "사용자 행동 흐름 기반 UI 구조와 인터랙션을 설계하고 HTML, CSS, JavaScript로 구현",
        "Azure OpenAI 기반 응답 기능을 연동해 사용자 입력에 따라 동적으로 반응하는 기능을 구현",
        "AWS 배포 환경을 고려해 짧은 시간 안에 화면, 기능, 데이터 흐름을 하나의 서비스로 묶음",
        "문제 정의, UI 설계, 구현, 검증 과정을 짧은 주기로 반복하며 제한 시간 내 작동 가능한 결과물을 완성",
      ],
      techStack: ["Python", "HTML", "Azure OpenAI", "AWS", "UI Design"],
      achievement: "48시간 내 Azure OpenAI 연동 MVP 완성",
      role: "UI/UX 설계, 프론트엔드 구현",
      githubUrl: "https://github.com/MINJOOOONG/ssaknayong.git",
      ...notionProjectAssets.kHtmlHackathon,
    },
    {
      title: "미니 산학 연계 캡스톤 프로젝트",
      category: "activity" as const,
      teamSize: "개인",
      period: "2024.06 - 2024.08",
      summary: "클라우드·생성형 AI 교육 기반으로 서비스 아이디어를 실험한 프로젝트입니다.",
      description: [
        "40시간 클라우드 및 인공지능 교육을 통해 AWS와 Microsoft 기반 생성형 AI 활용 흐름을 학습",
        "마이크로소프트와 구글 코리아 본사 탐방을 통해 실제 클라우드, AI 서비스 운영 사례를 접하고 프로젝트 방향을 구체화",
        "생성형 AI 기능을 서비스 문제 해결에 연결하기 위해 사용자 입력, 응답 생성, 결과 검증 흐름을 설계",
        "클라우드 기반 배포와 외부 AI API 연동을 고려해 기능 구조를 작은 단위로 나누어 실험",
        "AI를 단순 기능이 아니라 제품 문제 해결을 돕는 도구로 사용하는 관점을 쌓음",
      ],
      techStack: ["AWS", "Cloud", "Azure OpenAI", "Generative AI"],
      achievement: "AWS Lambda 기반 AI API 파이프라인 실험",
      role: "서비스 설계, 구현 실험",
      ...notionProjectAssets.miniCapstoneAiCloud,
    },
    {
      title: "폴가이즈 기반 레고 파티클 게임",
      category: "activity" as const,
      teamSize: "팀 프로젝트",
      period: "2025.01 - 2025.02",
      summary: "UE5로 레고 콘셉트 멀티플레이 미니게임 UI를 구현한 팀 프로젝트입니다.",
      description: [
        "Unreal Engine 5와 C++ 기반으로 플레이어 이동, 라운드 진행, UI 표시 흐름을 구현",
        "플레이어 머리 위 화살표, 게임 시작 전 카운트다운, 옵션 UI 등 실제 플레이에 필요한 인터페이스를 설계",
        "게임 상태 변화에 맞춰 UI가 갱신되도록 위젯 구조와 이벤트 연결 방식을 정리",
        "팀 프로젝트에서 SVN과 Git을 병행하며 작업 단위를 나누고 충돌 가능성이 있는 리소스 변경을 관리",
        "폴가이즈류 게임에서 중요한 즉각적인 피드백과 화면 가독성을 중심으로 UI 디테일을 개선",
      ],
      techStack: ["Unreal Engine 5", "C++", "UI", "SVN", "Git"],
      achievement: "UE5 C++ 기반 게임 UI 시스템 구현",
      role: "UI/UX 설계, UMG 위젯 구현",
      ...notionProjectAssets.legoParticleParty,
    },
    {
      title: "AWS DeepRacer 경진 대회 1등",
      category: "activity" as const,
      teamSize: "팀 프로젝트",
      period: "2024.09",
      summary: "AWS DeepRacer 강화학습 모델을 개선해 대회 1위를 달성한 프로젝트입니다.",
      description: [
        "AWS DeepRacer 기반 머신러닝 교육을 통해 강화학습, 보상 함수 설계, 모델 학습 구조를 학습",
        "자율주행 모델 개발을 위해 보상 함수를 직접 설계하고 하이퍼파라미터를 조정하며 성능 개선",
        "다양한 트랙 환경에서 반복 학습과 시뮬레이션을 수행해 주행 안정성과 lap time을 지속적으로 최적화",
        "학습 로그와 결과 데이터를 분석해 성능을 정량적으로 평가하고 개선 방향을 도출해 최종 1위 달성",
      ],
      techStack: ["AWS DeepRacer", "Reinforcement Learning", "Python", "AWS"],
      achievement: "강화학습 모델 튜닝으로 대회 1위",
      role: "모델 설계, 로그 분석, 파라미터 튜닝",
      ...notionProjectAssets.awsDeepRacer,
    },
    {
      title: "QA Minjoo Helper",
      teamSize: "개인",
      period: "2025.05 - 진행중",
      summary: "QA 중 TC 수정 요청을 기록하고 요약하는 AI 업무 보조 도구입니다.",
      description: [
        "QA 실무에서 테스트 중 발생하는 수정/추가/삭제 요청을 실시간으로 기록하고 관리하는 도구를 직접 설계하고 개발",
        "Supabase를 활용한 실시간 데이터 동기화로 팀원 간 수정 이력 공유 가능한 구조 구현",
        "Zustand 기반 상태 관리로 복잡한 TC 수정 이력의 필터링, 정렬, 검색 기능 구현",
        "수정 요청 사항을 카테고리별로 자동 분류하고 요약 리포트를 생성하는 기능으로 커뮤니케이션 비용 절감",
        "Vercel 배포로 팀원 누구나 접근 가능한 웹 기반 도구로 운영",
      ],
      techStack: ["Next.js", "TypeScript", "Supabase", "Zustand", "Vercel"],
      achievement: "TC 변경 이력 기록과 요약 자동화",
      role: "기획, UI 설계, 프론트엔드 구현, 데이터 구조 설계",
      ...notionProjectAssets.qaMinjooHelper,
    },
  ];

  const skillsData = {
    Frontend: ["React", "Next.js App Router", "TypeScript", "Three.js", "Tailwind CSS"],
    "State / Styling": ["React Query", "Zustand", "Emotion", "Framer Motion"],
    Backend: ["Spring Boot", "Java", "Python", "FastAPI", "REST API", "Prisma", "PostgreSQL", "Redis", "Kafka"],
    "AI / Data": ["LangChain", "FAISS", "Groq API", "sentence-transformers", "RAG Pipeline"],
    "Build & CI/CD": ["Webpack", "Babel", "Vercel", "GitHub Actions", "SVN"],
    QA: ["TestRail", "Jira", "Redmine", "Regression Test", "TC 설계 및 관리"],
    Collaboration: ["Slack", "Notion", "Git", "Agile / Scrum"],
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
    await prisma.project.upsert({
      where: { slug: project.slug },
      create: project,
      update: project,
    });
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
