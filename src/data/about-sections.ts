export interface KeywordAnnotation {
  keyword: string;
  description: string;
}

export interface AboutSection {
  number: string;
  koreanTitle: string;
  englishTitle: string;
  sentence: string;
  sentenceEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
  detailLink?: {
    label: string;
    targetId: string;
  };
}

export const aboutSections: AboutSection[] = [
  {
    number: "01",
    koreanTitle: "빠른 적응력",
    englishTitle: "Fast Adaptability",
    sentence: "저는 변화가 빠를수록 더 빨리 배우고 움직이는 사람입니다.",
    sentenceEn: "The faster things change, the faster I learn and adapt.",
    paragraphs: [
      "익숙하지 않은 환경을 마주했을 때 오래 멈춰 있기보다, 먼저 뛰어들고 부딪히며 구조를 파악하는 편입니다. 학부 과정에서 Unity로 게임을 만들다가 Spring Boot로 백엔드를 배우고, 해커톤에서는 Azure OpenAI를 연동하고, 개인 프로젝트에서는 Next.js와 Three.js, Python FastAPI까지 — 필요할 때마다 새로운 기술을 직접 써보면서 익혀왔습니다.",
      "새로운 기술이 등장했을 때 관망하기보다 먼저 실험하는 쪽을 선택합니다. AI 도구가 개발 방식을 바꾸기 시작했을 때도 바로 프로젝트에 적용해보고, ISTQB를 공부할 때도 교재만 읽지 않고 직접 학습 앱을 만들었습니다. 모르는 분야라도 작은 결과물을 하나 만들어보면 구조가 보이기 시작한다고 생각합니다.",
    ],
    paragraphsEn: [
      "When faced with unfamiliar environments, I prefer to jump in and figure things out rather than standing still. From building games in Unity during college to learning Spring Boot for backend, integrating Azure OpenAI at a hackathon, and picking up Next.js, Three.js, and Python FastAPI for personal projects — I've learned new technologies by using them whenever I needed them.",
      "When new technology emerges, I choose to experiment first rather than wait. When AI tools started changing how developers work, I immediately applied them to my projects. When studying for ISTQB, instead of just reading textbooks, I built my own study app. I believe that building even a small project in an unfamiliar domain helps you see the bigger picture.",
    ],
  },
  {
    number: "02",
    koreanTitle: "본질 이해",
    englishTitle: "Essence First",
    sentence: "저는 주어진 일을 그대로 처리하기보다, 먼저 '왜 필요한 일인지' 파고드는 사람입니다.",
    sentenceEn: "Rather than just executing tasks, I first dig into why they matter.",
    paragraphs: [
      "라이브러리를 가져다 쓰는 것과 그 라이브러리가 어떤 문제를 해결하는지 이해하는 것은 다르다고 생각합니다. 기술을 사용할 때 '동작하니까 괜찮다'에서 멈추지 않고, 왜 이 구조인지, 다른 선택지는 없는지, 트레이드오프는 무엇인지 먼저 따져보는 편입니다.",
      "이커머스 백엔드 프로젝트에서 동시성 문제를 다룰 때도, Redis Lua 스크립트를 바로 적용하기 전에 왜 애플리케이션 레벨의 락만으로는 부족한지부터 정리했습니다. 졸업논문에서 FSM과 Behavior Tree를 비교할 때도 단순히 성능 수치만 나열하는 대신, 두 구조의 설계 철학 차이를 먼저 이해하고 실험을 설계했습니다. 표면의 동작보다 그 아래의 구조와 이유를 먼저 이해해야, 문제가 생겼을 때 더 정확한 판단을 할 수 있다고 믿습니다.",
    ],
    paragraphsEn: [
      "I think there's a difference between using a library and understanding what problem it solves. When working with technology, I don't stop at 'it works, so it's fine' — I tend to first ask why this architecture was chosen, what alternatives exist, and what trade-offs are involved.",
      "When dealing with concurrency issues in my e-commerce backend project, before applying Redis Lua scripts, I first documented why application-level locks alone weren't sufficient. When comparing FSM and Behavior Tree in my thesis, instead of just listing performance metrics, I first understood the design philosophy differences before designing the experiments. I believe understanding the structure and reasoning beneath the surface leads to better judgment when problems arise.",
    ],
  },
  {
    number: "03",
    koreanTitle: "구조적 문제 해결",
    englishTitle: "Structured Problem Solving",
    sentence: "저는 복잡한 문제를 한 번에 해결하려 하기보다, 구조를 나누고 핵심부터 확인하는 사람입니다.",
    sentenceEn: "Rather than tackling complex problems all at once, I break them down and verify from the core.",
    paragraphs: [
      "이커머스 백엔드 프로젝트에서 주문·결제·재고·쿠폰이 얽힌 흐름을 설계할 때, 처음부터 전체를 한꺼번에 만들지 않았습니다. 먼저 주문 흐름만 분리해서 트랜잭션 경계를 잡고, 재고 차감의 동시성 문제를 Redis Lua 스크립트로 해결한 뒤, 쿠폰 중복 사용 방지를 별도로 검증하는 순서로 진행했습니다.",
      "결제 실패 시 복구 흐름도 같은 방식으로 접근했습니다. PG 응답 타임아웃이 발생하면 PENDING 상태로 저장하고, 스케줄러가 재조회한 뒤, 실패 확인 시 재고 원복과 주문 취소를 보상 트랜잭션으로 처리하는 구조를 단계별로 구현했습니다. Kafka 이벤트 처리에서도 Transactional Outbox 패턴으로 트랜잭션과 이벤트 발행의 원자성을 분리하고, 컨슈머 측에서는 멱등성 저장소로 중복 소비를 방지했습니다.",
      "동시 100건 요청 테스트는 Testcontainers로 실제 Redis/MySQL 환경을 띄우고 ExecutorService로 검증했습니다. 복잡한 문제일수록 한 번에 풀려고 하면 어디서 틀렸는지 알기 어렵습니다. 문제를 작게 나누고, 각 단계에서 확인하고, 다음으로 넘어가는 방식이 결과적으로 더 빠르고 정확했습니다.",
    ],
    paragraphsEn: [
      "When designing the order-payment-inventory-coupon flow in my e-commerce backend project, I didn't try to build everything at once. I first isolated the order flow to set transaction boundaries, then solved inventory concurrency with Redis Lua scripts, and separately verified coupon duplicate prevention — step by step.",
      "I took the same approach for payment failure recovery. When PG response timeouts occur, the system saves a PENDING state, a scheduler re-queries later, and upon failure confirmation, stock restoration and order cancellation are handled through compensation transactions. For Kafka event processing, I separated transaction and event publishing atomicity using the Transactional Outbox pattern, and prevented duplicate consumption with an idempotency store on the consumer side.",
      "Concurrent 100-request testing was done with Testcontainers spinning up real Redis/MySQL environments, verified through ExecutorService. The more complex the problem, the harder it is to find where things went wrong when you try to solve everything at once. Breaking problems into smaller pieces, verifying at each step, and then moving forward turned out to be faster and more accurate.",
    ],
  },
  {
    number: "04",
    koreanTitle: "끝까지 실행",
    englishTitle: "End-to-End Execution",
    sentence: "저는 아이디어를 생각하는 데서 멈추지 않고, 실제로 동작하는 결과물까지 만들어보는 사람입니다.",
    sentenceEn: "I don't stop at ideas — I build them into working results.",
    paragraphs: [
      "궁금한 기술이 있으면 직접 프로젝트로 만들어봅니다. 포트폴리오 웹사이트는 Next.js App Router, Three.js 3D 배경, Prisma CMS, Python FastAPI 기반 RAG 검색까지 기획부터 배포까지 혼자 구현했습니다. 개인 블로그 joodev도 TipTap 에디터, 태그/카테고리 시스템, Admin CMS를 직접 만들어 운영하고 있습니다.",
      "이커머스 백엔드 프로젝트에서는 Clean Architecture 기반 4-Layer 구조를 설계하고, Redis 재고 관리, Kafka 이벤트 아키텍처, PG 결제 연동, Spring Batch 집계 파이프라인까지 직접 구현했습니다. 졸업논문에서는 Unity로 게임을 직접 제작하고, FSM과 BT를 동일 조건에서 구현·비교·검증해 논문으로 완성했습니다.",
      "완벽하게 준비된 다음에 시작하는 것보다, 일단 만들어보면서 부족한 부분을 반복해서 고치는 방식이 저한테 더 잘 맞습니다. 실제로 동작시켜봐야 어디가 부족한지 보이고, 그때 배우는 게 가장 빨랐습니다.",
    ],
    paragraphsEn: [
      "When I'm curious about a technology, I build a project with it. For my portfolio website, I implemented everything solo from planning to deployment — Next.js App Router, Three.js 3D backgrounds, Prisma CMS, and a Python FastAPI-based RAG search. I also built and operate my personal blog joodev with a custom TipTap editor, tag/category system, and Admin CMS.",
      "In the e-commerce backend project, I designed a Clean Architecture 4-layer structure and implemented Redis inventory management, Kafka event architecture, PG payment integration, and Spring Batch aggregation pipelines. For my thesis, I built a game in Unity, implemented both FSM and Behavior Tree under identical conditions, ran comparative experiments, and completed the research paper.",
      "Rather than waiting until everything is perfectly prepared, I find it works better for me to start building and iteratively fix what's lacking. You can only see what's missing once it's actually running, and that's when I learn the fastest.",
    ],
  },
  {
    number: "05",
    koreanTitle: "AI 활용력",
    englishTitle: "AI-Loving Builder",
    sentence:
      "저는 AI를 적극적으로 활용합니다. 다만 결과를 그대로 믿지는 않고, 문제 정의는 사람이 해야 한다고 생각합니다.",
    sentenceEn:
      "I actively use AI, but I don't trust outputs blindly — defining the problem is the human's job.",
    paragraphs: [
      "AI는 빠르게 초안을 만들고, 반복 작업을 줄이고, 아이디어를 구체화하는 데 강력한 도구라고 생각합니다. 저는 Claude, Codex, Cursor 같은 도구를 개인 프로젝트 전반에서 활용하고 있습니다. 포트폴리오 구현, 코드 리팩터링, 문서 구조화, RAG 파이프라인 설계까지 — AI와 함께 작업하면 혼자일 때보다 더 빠르게 움직일 수 있었습니다.",
      "하지만 AI가 만든 결과를 그대로 사용하지는 않습니다. AI에게 맡기기 전에 문제를 먼저 정의하고, 결과는 공식 문서와 실제 동작을 기준으로 검증합니다. AI가 빠르게 만들어낸 코드일수록 의도와 다르게 동작할 가능성이 있기 때문에, 결과를 받은 뒤에 확인하고 수정하는 과정을 빠뜨리지 않습니다.",
      "새로운 AI 도구가 나오면 빠르게 실험해봅니다. 다만 AI를 더 많은 결과물을 찍어내는 수단으로 보기보다는, 반복되는 과정을 줄이고 더 중요한 판단에 집중할 수 있게 해주는 도구로 활용하려고 합니다.",
    ],
    paragraphsEn: [
      "I think AI is a powerful tool for quickly drafting, reducing repetitive work, and turning vague ideas into concrete plans. I use tools like Claude, Codex, and Cursor throughout my personal projects — from portfolio implementation and code refactoring to documentation structuring and RAG pipeline design. Working with AI lets me move faster than working alone.",
      "But I don't use AI outputs as-is. Before delegating to AI, I define the problem first. After receiving results, I verify them against official documentation and actual behavior. The faster AI produces code, the more likely it might not match the intent — so I never skip the review and correction step.",
      "When new AI tools come out, I experiment with them quickly. But rather than viewing AI as a way to produce more output, I try to use it as a tool that reduces repetitive processes and lets me focus on the decisions that actually matter.",
    ],
    detailLink: {
      label: "See How I Work with AI →",
      targetId: "ai-lab",
    },
  },
];

export const keywordAnnotations: Record<string, { ko: string; en: string }> = {
  "카페 창업": {
    ko: "소프트웨어와 무관한 F&B 분야에서 직접 카페를 창업하고 운영하며, 사업 기획부터 운영, 고객 응대까지 전반적인 비즈니스 경험을 쌓았습니다.",
    en: "Gained hands-on business experience by starting and running a cafe in the F&B industry — from business planning and operations to customer service.",
  },
  "소프트웨어 관련 전공": {
    ko: "카페 운영 이후 IT 분야에 관심을 갖고, 소프트웨어 관련 학과로 편입하여 체계적으로 개발 기초를 학습했습니다.",
    en: "After running the cafe, I developed an interest in IT and transferred to a software-related major to systematically learn development fundamentals.",
  },
  "AI 관련 논문": {
    ko: "학부 과정에서 인공지능 관련 주제로 논문을 작성하며, 데이터 분석과 머신러닝에 대한 기초 역량을 갖추었습니다.",
    en: "Wrote an AI-related research paper during my undergraduate studies, building foundational skills in data analysis and machine learning.",
  },
  "애자일 환경": {
    ko: "스프린트 단위의 빠른 반복 개발과 배포, 데일리 스크럼, 회고 등 애자일 방법론 기반의 업무 프로세스를 직접 경험했습니다.",
    en: "Experienced agile development processes firsthand — sprint-based iterations, daily scrums, retrospectives, and rapid deployments.",
  },
  "이커머스 백엔드 부트캠프": {
    ko: "주말마다 자비로 수강한 부트캠프에서 Spring Boot 기반의 이커머스 백엔드 시스템을 구축하며 서버 개발 역량을 키웠습니다.",
    en: "Self-funded weekend bootcamp where I built an e-commerce backend system with Spring Boot, developing server-side development skills.",
  },
  "Claude, Codex, Cursor": {
    ko: "Anthropic의 Claude, OpenAI의 Codex, Cursor 등 AI 도구를 활용하여 코드 리팩터링, 문서 구조화, RAG 기반 검색 Assistant 설계 등에 적용해왔습니다.",
    en: "Used AI tools like Anthropic's Claude, OpenAI's Codex, and Cursor for code refactoring, documentation structuring, and RAG-based search assistant design.",
  },
  "AI": {
    ko: "반복 업무를 줄이고 사고 과정을 확장하기 위해 사용하는 협업 도구입니다. 결과를 그대로 믿기보다 검증 가능한 방식으로 활용하는 것을 중요하게 생각합니다.",
    en: "A collaboration tool I use to reduce repetitive work and expand my thinking process. I value using AI in verifiable ways rather than blindly trusting its output.",
  },
  "이슈 트래킹": {
    ko: "Jira, Linear 등의 도구를 활용해 버그와 개선사항을 체계적으로 기록하고 추적하며, 개발팀과 효율적으로 커뮤니케이션했습니다.",
    en: "Used tools like Jira and Linear to systematically track bugs and improvements while communicating efficiently with the development team.",
  },
  "피드백": {
    ko: "프로젝트를 진행하며 부족한 부분이나 개선 아이디어를 기록하고, 반복적으로 수정하며 결과물의 완성도를 높이는 과정을 중요하게 생각합니다.",
    en: "I value the process of documenting shortcomings and improvement ideas during projects, iteratively refining them to improve the quality of results.",
  },
};
