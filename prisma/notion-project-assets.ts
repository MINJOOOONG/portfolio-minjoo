export const notionProjectAssets = {
  portfolioWebsite: {
    media: {
      type: "image",
      url: "/images/projects/portfolio-website/01-entry.png",
    },
    gallery: [
      { type: "image", title: "About 섹션", url: "/images/projects/portfolio-website/02-about.png" },
      { type: "image", title: "프로젝트 섹션", url: "/images/projects/portfolio-website/04-projects.png" },
    ],
    attachments: [],
    contentBlocks: [
      // ── 섹션 1: 프로젝트를 시작한 이유 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", body: [
        "AI 시대에는 개발자가 단순히 코드를 직접 작성하는 것뿐만 아니라, 문제를 정의하고 AI Agent를 활용해 빠르게 설계·구현·검증하는 역량도 중요하다고 생각했습니다. 그래서 Claude Code, ChatGPT, Cursor 같은 도구를 실제 프로젝트 흐름 안에서 사용해보고 싶었습니다.",
        "처음에는 작은 기능 단위로 AI Agent를 활용해보는 실험을 했지만, 그 결과물이 흩어지는 문제가 있었습니다. 그래서 기획부터 디자인 설계, 프론트엔드, 백엔드, AI 기능까지 하나의 흐름으로 연결되는 프로젝트가 필요하다고 판단했고, 그 결과물로 포트폴리오 웹사이트를 만들기 시작했습니다.",
        "이 프로젝트에서 AI Agent는 단순히 코드를 대신 작성하는 도구가 아니라, 디자인 방향을 구체화하고, 컴포넌트 구조를 설계하고, 에러를 분석하고, 구현 결과를 다시 개선하는 협업 도구로 사용했습니다. 다만 AI가 만든 결과를 그대로 반영하지 않고, 실제 브라우저에서 확인하고, 코드 구조를 검토하고, QA 관점에서 사용성이 맞는지 계속 검증하며 수정했습니다.",
      ] },
      { type: "text", body: [
        "▸ AI Agent 협업 개발 — 기획, 설계, 구현, 디버깅 과정에서 AI Agent를 적극 활용하고, 결과를 직접 검증하는 워크플로우를 경험했습니다.",
        "▸ 풀스택 구조 경험 — Next.js 프론트엔드, DB 기반 CMS, Python FastAPI 기반 RAG 검색 흐름을 하나의 프로젝트로 연결했습니다.",
        "▸ 사용자 중심 검증 — 디자인 결과를 그대로 수용하지 않고, 실제 화면과 탐색 흐름을 QA 관점에서 반복 검토했습니다.",
      ] },

      // ── 섹션 2: 디자인 규칙 ──
      { type: "section-heading", title: "02 — 디자인 규칙" },
      { type: "design-rules", images: [
        { url: "/images/projects/portfolio-website/00-fullpage.png", title: "전체 페이지 구조" },
        { url: "/images/projects/portfolio-website/02-about.png", title: "About 섹션" },
        { url: "/images/projects/portfolio-website/04-projects.png", title: "Projects 섹션" },
        { url: "/images/projects/portfolio-website/03-experience.png", title: "Experience 섹션" },
        { url: "/images/projects/portfolio-website/05-skills.png", title: "Skills 섹션" },
      ], rules: [
        { title: "전체 디자인 기준은 design.md에 먼저 정의한다", body: "포트폴리오의 색상, 여백, 타이포그래피, 버튼, 카드, 모션 규칙을 코드로 바로 만들기 전에 design.md에 먼저 정리했습니다. Claude Code와 협업할 때도 이 문서를 기준으로 수정 범위를 맞춰, 섹션마다 디자인이 따로 노는 문제를 줄였습니다." },
        { title: "섹션별 디자인 문서를 분리한다", body: "About, Experience, Projects, AI Lab, Articles, Skills, Contact처럼 성격이 다른 섹션은 하나의 규칙으로만 처리하지 않고, 각 섹션별 md 파일을 만들어 목적과 레이아웃을 따로 정리했습니다. 이를 통해 About은 자기소개 중심, Projects는 성과와 구현 중심, AI Lab은 실험과 기록 중심으로 다른 읽기 흐름을 갖도록 설계했습니다." },
        { title: "공통 컴포넌트는 유지하되 표현 방식은 섹션마다 다르게 둔다", body: "버튼, 뱃지, 제목, 구분선, 모달 같은 기본 UI 요소는 공통 스타일을 유지하지만, 각 섹션의 목적에 따라 배치와 강조 방식은 다르게 적용했습니다. 같은 디자인 시스템 안에서도 모든 화면이 똑같이 보이지 않도록 조정했습니다." },
        { title: "인터랙션은 디자인 문서의 규칙 안에서만 확장한다", body: "커스텀 커서, PPT식 섹션 이동, hover 효과, 모달 전환은 단순 장식이 아니라 탐색을 돕는 기능으로 정의했습니다. 새로운 인터랙션을 추가할 때도 design.md의 모션 강도, 속도, 사용 조건을 기준으로 과한 효과가 되지 않게 조절했습니다." },
        { title: "수정은 감각이 아니라 기준으로 반복한다", body: "화면을 보며 마음에 들지 않는 부분을 즉흥적으로 고치는 대신, 디자인 문서와 섹션별 md를 기준으로 원인을 나눠 수정했습니다. 예를 들어 글 간격, 제목 위계, 뱃지 정렬, 내부 스크롤, 모달 레이아웃처럼 문제를 작은 단위로 분리해 반복 개선했습니다." },
      ] },

      // ── 섹션 3: 설계 목표와 아키텍처 ──
      { type: "section-heading", title: "03 — 설계 목표와 아키텍처" },
      { type: "text", heading: "설계 목표", body: [
        "포트폴리오를 단순 소개 페이지가 아닌, 탐색 가능한 인터랙티브 기술 문서로 만드는 것이 목표였습니다. 전체 섹션은 PPT처럼 화면 단위로 이동하고, Projects·AI Lab처럼 깊이 있는 콘텐츠는 내부 스크롤로 분리해 흐름을 끊지 않으면서 충분한 정보를 제공합니다.",
      ] },
      { type: "image", url: "/images/projects/portfolio-website/architecture-diagram.svg", caption: "3-레이어 아키텍처: Frontend → Data/CMS → AI/RAG" },
      { type: "text", heading: "Frontend — Next.js App Router", body: [
        "서버 컴포넌트(RSC)로 프로젝트 목록·설정 데이터를 fetch하고, Three.js 배경·커서·애니메이션은 Client Component로 분리했습니다. 초기 로딩 성능과 인터랙션을 동시에 확보하는 구조입니다.",
      ] },
      { type: "code", title: "RSC와 Client Component 분리 예시", language: "tsx", code: "// 서버 컴포넌트 — DB 데이터 fetch\nconst settings = await getSettings();\nconst projects = parseJsonSetting<ProjectItem[]>(settings, 'project_data', []);\n\n// 클라이언트 컴포넌트 — Three.js는 dynamic import\nconst ThreeBg = dynamic(\n  () => import('@/components/shared/three-portfolio-bg'),\n  { ssr: false }\n);" },
      { type: "text", heading: "인터랙션 — 라이브러리 역할 분리", body: [
        "Three.js(R3F): 3D 배경 렌더링. 섹션 전환에 따라 도형 밀도·회전 속도가 React 상태와 연동됩니다.",
        "Framer Motion: 모달 열기/닫기, 섹션 등장 같은 상태 기반 전환 애니메이션을 처리합니다.",
        "GSAP: 커서 추적처럼 프레임 단위 정밀 제어가 필요한 애니메이션에 사용합니다.",
      ] },
      { type: "text", heading: "Data — Prisma + Neon PostgreSQL", body: [
        "포트폴리오 콘텐츠를 코드에 하드코딩하지 않고 DB로 분리해, Admin 페이지에서 재배포 없이 수정 가능한 CMS 구조를 구현했습니다. Prisma의 TypeScript 타입 자동 생성으로 프론트엔드와 타입을 공유하고, Neon의 서버리스 PostgreSQL로 Vercel 배포 환경에서 cold start를 최소화했습니다.",
      ] },
      { type: "code", title: "DB → 컴포넌트 데이터 흐름", language: "typescript", code: "// Admin에서 수정한 데이터가 서버 렌더링 시 자동 반영\nconst settings = await prisma.siteSetting.findMany();\nconst experienceData = parseJsonSetting<ExperienceItem[]>(\n  settings, 'experience_data', []\n);\n// → Experience 컴포넌트에 props로 전달" },
      { type: "text", heading: "AI — Python FastAPI + FAISS + Groq", body: [
        "RAG 파이프라인은 Python 생태계(LangChain, sentence-transformers, FAISS)에 의존하기 때문에 별도 FastAPI 서버로 분리했습니다. Next.js API Route가 프록시 역할을 담당하고, 프론트엔드는 RAG 서버의 존재를 알 필요가 없습니다.",
        "FAISS로 로컬 벡터 검색(외부 인프라 비용 0원), Groq API로 Llama 3.1 기반 응답 생성(무료 티어, 빠른 응답 속도)을 조합했습니다.",
      ] },
      { type: "code", title: "RAG 파이프라인 구조", language: "python", code: "# 1. 문서 로드 → 청크 분할 → 임베딩 → FAISS 저장\ndocs = load_documents('data')          # 마크다운 7개\nchunks = split_documents(docs)          # 500자 단위, 100자 overlap\nvectorstore = build_vectorstore(chunks)  # multilingual 임베딩\n\n# 2. 질문 → 검색 → LLM 답변\nresults = vectorstore.similarity_search(query, k=6)\ncontext = format_context(results)\nanswer = generate_answer(context, question)  # Groq LLM" },

      // ── 섹션 4: 주요 기능 구현 ──
      { type: "section-heading", title: "04 — 주요 기능 구현" },

      { type: "text", heading: "섹션 단위 내비게이션", body: [
        "7개 섹션(About, Experience, Projects, AI Lab, Articles, Skills, Contact)을 각각 독립된 화면 단위로 구성했습니다. 상단 메뉴, 좌우 버튼, 슬라이드 인디케이터로 현재 위치를 명확히 표시하고 이동할 수 있습니다.",
        "Projects·AI Lab처럼 내용이 긴 섹션은 내부 스크롤 영역으로 분리해, 전체 섹션 이동과 콘텐츠 스크롤이 충돌하지 않도록 Lenis 스크롤과 이벤트 전파를 제어했습니다.",
      ] },
      { type: "code", title: "섹션 이동 이벤트 처리", language: "typescript", code: "// CustomEvent로 섹션 간 이동 트리거\nwindow.dispatchEvent(\n  new CustomEvent('slide-nav-goto', { detail: { index: sectionIndex } })\n);" },

      { type: "text", heading: "프로젝트 상세 모달 (contentBlocks 기반)", body: [
        "프로젝트 카드 클릭 시 상세 모달을 열고, 본문은 contentBlocks 배열을 순회하며 블록 타입별로 렌더링합니다. text, image, video, pdf, code, tech-grid, design-rules, rag-pipeline 등 11가지 콘텐츠 타입을 지원합니다.",
        "모달이 열리면 배경 스크롤을 잠그고 본문만 독립 스크롤되도록 분리했습니다. 키보드(Escape, ←→)로도 모달 닫기와 프로젝트 간 이동이 가능합니다.",
      ] },
      { type: "code", title: "contentBlocks 렌더링 구조", language: "tsx", code: "// 블록 타입별 분기 렌더링\n{blocks.map((block) => {\n  switch (block.type) {\n    case 'text':    return <TextBlock ... />;\n    case 'image':   return <SafeImage ... />;\n    case 'code':    return <CodeBlock ... />;\n    case 'tech-grid': return <TechGrid ... />;\n    // ... 11가지 타입 지원\n  }\n})}" },

      { type: "text", heading: "Three.js 3D 배경", body: [
        "React Three Fiber로 포트폴리오 배경에 와이어프레임 도형 + 파티클 + 연결선을 렌더링합니다. 현재 활성 섹션에 따라 도형 밀도, 회전 속도, 파티클 투명도가 달라지도록 React 상태와 연동했습니다.",
        "Three.js는 브라우저 객체(WebGL)에 의존하므로 dynamic import + ssr: false를 적용해 서버 렌더링 시 에러를 방지했습니다.",
      ] },

      { type: "text", heading: "커스텀 커서", body: [
        "data-cursor 속성으로 요소별 커서 모드를 전환합니다. 버튼, 네비게이션, 프로젝트 카드 등 역할에 따라 다른 시각 피드백을 제공합니다.",
        "모바일 터치 환경과 prefers-reduced-motion 설정에서는 자동 비활성화합니다.",
      ] },

      { type: "text", heading: "About 키워드 인터랙션", body: [
        "핵심 문장과 키워드를 먼저 보여주고, hover/click/focus 시 보조 설명이 나타나는 방식으로 정보를 계층화했습니다. 툴팁은 뷰포트 위치에 따라 방향이 자동 조정되고, Enter/Space/Escape 키보드 조작도 지원합니다.",
      ] },

      { type: "text", heading: "AI Lab", body: [
        "AI 도구 목록이 아닌 학습 기록과 해석을 담는 연구 노트 형태로 설계했습니다. Principles, Practices, Prompting, AI Tools, Media Notes 5개 탭으로 분류하고, 각 항목에 사용 목적·장점·한계·적용 경험을 함께 표시해 맥락이 드러나도록 구성했습니다.",
      ] },

      // ── 섹션 5: RAG AI Assistant (독립 섹션) ──
      { type: "section-heading", title: "05 — RAG AI Assistant" },
      { type: "rag-pipeline",
        diagram: {
          steps: [
            "사용자 질문 입력",
            "sentence-transformers 임베딩",
            "FAISS 벡터 검색 (Top-4)",
            "Groq LLM 답변 생성",
            "추천 섹션 연결 (AI Navigation)",
          ],
        },
        description: [
          "포트폴리오 안에 AI Assistant를 넣은 이유는 단순히 챗봇 기능을 보여주기 위해서가 아니라, 사용자가 프로젝트와 경험을 질문 기반으로 탐색할 수 있게 만들기 위해서입니다. 일반 AI 챗봇은 실제 포트폴리오에 없는 내용을 그럴듯하게 생성할 위험이 있어, 포트폴리오 문서를 기반으로 검색한 뒤 관련 문맥으로 답변하는 RAG 구조를 적용했습니다.",
          "Python FastAPI 서버에서 마크다운 문서를 로드하고, 500자 단위로 청크 분할한 뒤, sentence-transformers로 임베딩합니다. FAISS 벡터스토어에서 질문과 유사한 상위 4개를 검색하고, Groq LLM이 문맥 기반 답변을 생성합니다.",
          "AI Assistant의 답변이 단순 텍스트에서 끝나지 않고, 관련 섹션으로 이동할 수 있도록 AI Navigation을 연결했습니다. get_recommended_section() 함수에서 질문 키워드와 검색된 문서의 소스 파일명을 분석해 관련 섹션을 추천하고, 프론트엔드에서 CustomEvent('slide-nav-goto')를 dispatch해 해당 섹션으로 이동합니다.",
        ],
        troubleshooting: "RAG 파이프라인을 Next.js 서버 안에 직접 구현하면 Python 의존성(sentence-transformers, FAISS)을 Node.js 환경에서 처리할 수 없었습니다. Python FastAPI 서버를 별도로 분리하고, Next.js API Route가 프록시 역할을 담당하는 구조로 설계해 각 레이어의 책임을 명확히 분리했습니다.",
      },

      // ── 섹션 6: 기술 선택 이유 ──
      { type: "section-heading", title: "06 — 기술 선택 이유" },
      { type: "tech-grid", items: [
        { name: "Next.js App Router", reason: "RSC로 서버 데이터 페칭, 클라이언트 번들 최소화" },
        { name: "Three.js + R3F", reason: "React 생태계 안에서 3D 렌더링. useFrame 기반 애니메이션 루프" },
        { name: "Prisma + Neon", reason: "타입 안전 ORM + 서버리스 PostgreSQL. cold start 빠름" },
        { name: "Framer Motion", reason: "선언적 애니메이션 API. spring physics 기반 자연스러운 모션" },
        { name: "Groq API", reason: "Llama 3.1-8b-instant. 응답 속도 빠르고 무료 티어 제공" },
        { name: "sentence-transformers", reason: "로컬 임베딩. 외부 API 비용 없이 문서 벡터화" },
        { name: "FAISS", reason: "로컬 파일 기반 벡터 검색. 별도 인프라 불필요" },
        { name: "FastAPI", reason: "Python 비동기 서버. Pydantic 스키마 검증 내장" },
        { name: "Tailwind CSS", reason: "유틸리티 기반 스타일링. 디자인 토큰 커스텀 용이" },
        { name: "Vercel", reason: "Next.js 최적화 배포. Edge Function + ISR 지원" },
      ] },
      { type: "text", body: [
        "Groq + 로컬 임베딩 + FAISS 조합을 선택한 이유: 포트폴리오 규모(마크다운 10개 미만)에서는 OpenAI Embedding API나 Pinecone 같은 유료 인프라가 과잉이라고 판단했습니다. sentence-transformers로 로컬 임베딩하고 FAISS로 검색하면 비용 0원에 충분한 검색 품질을 확보할 수 있습니다.",
        "LLM은 Groq의 무료 티어를 활용합니다. llama-3.1-8b-instant 모델이 포트폴리오 Q&A에 충분한 품질을 제공하며, 응답 속도가 빨라 사용자 경험에 유리합니다.",
      ] },

      // ── 섹션 7: 주요 성과 ──
      { type: "section-heading", title: "07 — 주요 성과" },
      { type: "text", heading: "AI Agent 협업으로 1인 풀스택 구현", body: [
        "Claude Code를 활용해 기획 → 설계 → 구현 → 디버깅 사이클을 반복하며, 프론트엔드(Next.js 7개 섹션), 백엔드(Prisma CMS + Admin), AI(Python RAG 파이프라인)를 단독으로 구현했습니다. AI가 생성한 코드를 그대로 사용하지 않고 QA 관점에서 검증·수정하는 워크플로우를 실전에서 적용했습니다.",
      ] },
      { type: "text", heading: "3-레이어 독립 아키텍처 설계", body: [
        "Frontend(Vercel) / Data(Neon PostgreSQL) / AI(FastAPI + Render) 세 레이어를 독립 배포 가능한 구조로 분리했습니다. 각 레이어를 개별적으로 수정·확장할 수 있어 유지보수 비용을 최소화했습니다.",
      ] },
      { type: "text", heading: "RAG 기반 AI 검색 + 섹션 이동 연동", body: [
        "단순 챗봇이 아닌, 포트폴리오 문서 기반 검색 → LLM 답변 → 관련 섹션 자동 이동까지 연결되는 AI Navigation을 구현했습니다. 사용자가 질문만으로 프로젝트와 경험을 탐색할 수 있는 새로운 포트폴리오 UX를 만들었습니다.",
      ] },
      { type: "text", heading: "디자인 시스템 문서화 → 일관된 UI 유지", body: [
        "design.md에 색상·여백·모션 규칙을 먼저 정의하고, 섹션별 md로 레이아웃을 분리해 AI Agent와 협업 시에도 디자인이 흩어지지 않는 기준을 확보했습니다.",
      ] },
      { type: "text", heading: "비용 0원 AI 인프라", body: [
        "sentence-transformers 로컬 임베딩 + FAISS 파일 기반 벡터 검색 + Groq 무료 티어를 조합해, 외부 유료 서비스 없이 RAG 시스템을 운영하고 있습니다.",
      ] },
    ],
  },
  joodevBlog: {
    media: {
      type: "image",
      url: "/images/projects/joodev-blog/01-home.png",
    },
    gallery: [
      { type: "image", title: "블로그 홈", url: "/images/projects/joodev-blog/01-home.png" },
      { type: "image", title: "글 목록", url: "/images/projects/joodev-blog/02-explore.png" },
      { type: "image", title: "블로그 포스트", url: "/images/projects/joodev-blog/04-post-tdd.png" },
    ],
    attachments: [],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "콘텐츠 소유권과 자유도", body: [
        "Velog, Tistory 등 기존 블로그 플랫폼에서는 코드 블록 커스터마이징, 레이아웃 자유도, 콘텐츠 소유권에 한계가 있었습니다. 부트캠프에서 매주 작성하는 기술 회고와 학습 기록을 내가 원하는 형태로 쓰고, 내 DB에서 관리하고 싶어 직접 블로그를 만들기로 결정했습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/01-home.png", caption: "JooDev 홈 — 픽셀 아트 고양이 캐릭터와 다크 테마 기반 랜딩" },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "SSR 기반 아키텍처", body: [
        "Next.js App Router와 React Server Component를 적용해 글 목록(Explore), 상세 페이지 등 데이터 의존 페이지는 서버에서 렌더링하고, 에디터와 인터랙션 요소만 클라이언트 컴포넌트로 분리했습니다. 페이지별로 필요한 데이터만 서버에서 fetch해 클라이언트 번들 크기를 줄이고, React Query 없이도 빠른 초기 로딩을 달성했습니다.",
      ] },
      { type: "code", title: "SSR 데이터 페칭 구조", language: "tsx", code: "// 서버 컴포넌트 — 카테고리별 글 목록 fetch\nconst posts = await prisma.blogPost.findMany({\n  where: { published: true },\n  orderBy: { createdAt: 'desc' },\n  include: { tags: true },\n});\n\n// 클라이언트 컴포넌트 — 에디터만 분리\nconst TipTapEditor = dynamic(\n  () => import('@/components/editor/tiptap-editor'),\n  { ssr: false }\n);" },
      { type: "text", heading: "데이터 모델 설계", body: [
        "Prisma와 PostgreSQL로 게시글(Post), 태그(Tag), 카테고리를 정규화된 스키마로 설계해 콘텐츠 확장이 용이한 구조를 만들었습니다. 현재 Backend, QA, Daily 등 카테고리에 14개 이상의 글이 작성되어 있습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/02-explore.png", caption: "Explore 페이지 — Backend, QA, Daily 등 카테고리별 글 목록과 태그 필터" },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "TipTap 에디터 기반 글 작성 환경", body: [
        "TipTap 에디터를 커스터마이징해 Syntax-highlighted 코드 블록, Mermaid 다이어그램, blockquote 인용, 접기/펼치기 토글 등 기술 문서에 필요한 기능을 구현했습니다. Vercel Blob을 활용해 서버리스 환경에서도 이미지 드래그&드롭 업로드가 안정적으로 동작하는 파일 관리 파이프라인을 구축했습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/04-post-tdd.png", caption: "TDD 포스트 — 코드 블록, 인용, 볼드 강조 등 리치 텍스트 렌더링" },
      { type: "image", url: "/images/projects/joodev-blog/05-post-kafka.png", caption: "Kafka 포스트 — 이벤트 아키텍처와 트랜잭션 경계를 분석한 기술 글" },
      { type: "text", heading: "Admin CMS 및 인증", body: [
        "httpOnly 쿠키 기반 관리자 인증 시스템을 구현해 로그인/로그아웃 기능을 제공하고, 비인가 접근 시 로그인 페이지로 리다이렉트합니다. Admin 페이지에서 게시글 CRUD, 공개/비공개 전환, 태그 관리, 이미지 라이브러리를 제공해 브라우저에서 바로 글을 작성하고 배포할 수 있습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/09-admin-editor.png", caption: "관리자 로그인 — 비밀번호 기반 인증 후 에디터 접근" },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "다양한 콘텐츠 지원과 이미지 관리", body: [
        "기술 글뿐 아니라 AI 도구(Suno, Gemini, Capcut)를 활용해 노래를 만들고 뮤직비디오를 제작한 경험, MCP와 Playwright를 결합한 QA 자동화 실험 등 다양한 주제의 콘텐츠를 작성하고 있습니다. 각 포스트마다 고유한 픽셀 아트 커버 이미지를 적용해 글 목록에서의 시각적 구별과 브랜딩을 강화했습니다.",
        "서버리스 환경(Vercel)에서 파일 업로드를 안정적으로 처리하기 위해 Vercel Blob 스토리지를 도입하고, 이미지 드래그&드롭 → 업로드 → URL 반환 → 에디터 삽입 파이프라인을 구축했습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/06-post-ai-music.png", caption: "AI와 노래 만들기 — Suno, Gemini, Capcut을 활용한 음악 제작 과정" },
      { type: "image", url: "/images/projects/joodev-blog/07-post-mcp.png", caption: "MCP + Playwright — QA 자동화 도구 연동 실험" },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "CMS형 블로그 플랫폼 단독 구현", body: [
        "Next.js App Router SSR 기반으로 프론트엔드와 Admin CMS를 포함한 전체 블로그 시스템을 1인 풀스택으로 구현했습니다. TipTap 에디터 커스터마이징, Prisma 데이터 모델 설계, Vercel Blob 이미지 관리까지 기술 블로그에 필요한 기능을 직접 설계하고 운영하고 있습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/08-post-4layer.png", caption: "4계층 도메인 설계 — Interfaces, Application, Domain, Infrastructure 분석" },
      { type: "image", url: "/images/projects/joodev-blog/03-post-techblog.png", caption: "블로그 개발 후기 — 직접 만든 이유와 기술 선택 과정을 기록한 첫 글" },
    ],
  },
  arduinoSocialProduct: {
    media: {
      type: "image",
      url: "/images/projects/notion/arduino-social-product/02-image-2e661fd0.jpg",
    },
    gallery: [
      {
        type: "image",
        title: "프로토타입 제작 사진",
        url: "/images/projects/notion/arduino-social-product/02-image-2e661fd0.jpg",
      },
      {
        type: "image",
        title: "프로젝트 이미지 2",
        url: "/images/projects/notion/arduino-social-product/03-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 3",
        url: "/images/projects/notion/arduino-social-product/04-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 4",
        url: "/images/projects/notion/arduino-social-product/05-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 5",
        url: "/images/projects/notion/arduino-social-product/06-image-2e661fd0.png",
      },
    ],
    attachments: [],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "사회 문제 해결을 위한 제품 기획", body: [
        "일상 속 사회 문제를 기술로 개선할 수 있는 제품을 직접 만들어보자는 목표로 시작한 팀 프로젝트입니다. 여러 아이디어 중에서 문제의 심각성, 실제 사용자 상황, 제한된 장비로 구현 가능한지를 기준으로 최종 아이템을 선정했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/02-image-2e661fd0.jpg", caption: "Arduino 기반 프로토타입 제작 과정" },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "센서 입력과 Python 처리 구조", body: [
        "Arduino 보드의 센서(초음파, 적외선 등) 입력값을 Python 스크립트가 실시간으로 수신해 제품 동작 로직을 처리하는 구조를 설계했습니다. OpenCV를 활용해 카메라 입력을 프레임 단위로 분석하고, 객체 인식 결과에 따라 Arduino 출력(LED, 부저 등)을 제어하는 양방향 통신 흐름을 구현했습니다.",
      ] },
      { type: "code", title: "Arduino-Python 시리얼 통신", language: "python", code: "import serial\nimport cv2\n\n# Arduino 시리얼 연결\narduino = serial.Serial('/dev/ttyACM0', 9600)\n\n# OpenCV 카메라 캡처\ncap = cv2.VideoCapture(0)\n\nwhile True:\n    ret, frame = cap.read()\n    # 객체 인식 처리\n    result = detect_object(frame)\n    # 인식 결과를 Arduino로 전송\n    arduino.write(result.encode())" },
      { type: "image", url: "/images/projects/notion/arduino-social-product/03-image-2e661fd0.png", caption: "시스템 구성도 — 센서 입력 → Python 처리 → 출력 제어 흐름" },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "OpenCV 기반 영상 인식과 팀 협업", body: [
        "OpenCV를 활용해 카메라 입력을 프레임 단위로 분석하고, 객체 인식 결과에 따라 Arduino 출력(LED, 부저 등)을 제어하는 양방향 통신 흐름을 구현했습니다.",
        "전체 동작 과정을 Flow chart로 시각화해 팀원 4명 각자의 구현 범위(하드웨어 조립, 센서 캘리브레이션, Python 로직, 테스트)를 명확히 분배했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/04-image-2e661fd0.png", caption: "OpenCV 기반 영상 인식 처리 화면" },
      { type: "image", url: "/images/projects/notion/arduino-social-product/05-image-2e661fd0.png", caption: "Flow chart 기반 동작 흐름 설계" },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "센서 정밀도와 하드웨어 제약 대응", body: [
        "매주 진행 상황을 공유하며 센서 입력 오차, 인식률 저하 등 실제 테스트에서 발견된 문제를 함께 해결했습니다. 소프트웨어만으로는 해결할 수 없는 물리적 제약(센서 정밀도, 배선 안정성)을 직접 경험하며 하드웨어-소프트웨어 통합 관점의 시야를 넓혔습니다.",
      ] },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "제한된 환경에서의 프로토타입 완성", body: [
        "제한된 장비(Arduino Uno, 웹캠)와 2주라는 짧은 기간 안에서 완벽한 제품이 아닌 '검증 가능한 데모'를 만드는 것에 집중해 프로토타입을 완성했습니다. Arduino + OpenCV 연동 프로토타입을 제작하고 센서-소프트웨어 양방향 통신을 구현했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/06-image-2e661fd0.png", caption: "최종 프로토타입 시연 모습" },
    ],
  },
  kHtmlHackathon: {
    media: {
      type: "image",
      url: "/images/projects/notion/k-html-hackathon/01-cover-2e661fd0.png",
    },
    gallery: [
      {
        type: "image",
        title: "대표 커버 이미지",
        url: "/images/projects/notion/k-html-hackathon/01-cover-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 1",
        url: "/images/projects/notion/k-html-hackathon/03-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 2",
        url: "/images/projects/notion/k-html-hackathon/04-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 3",
        url: "/images/projects/notion/k-html-hackathon/05-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 4",
        url: "/images/projects/notion/k-html-hackathon/06-image-2e661fd0.png",
      },
      {
        type: "video",
        title: "프로젝트 시연 영상",
        url: "/images/projects/notion/k-html-hackathon/07-video-2e661fd0.mp4",
      },
      {
        type: "image",
        title: "프로젝트 이미지 5",
        url: "/images/projects/notion/k-html-hackathon/08-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 6",
        url: "/images/projects/notion/k-html-hackathon/09-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 7",
        url: "/images/projects/notion/k-html-hackathon/10-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 8",
        url: "/images/projects/notion/k-html-hackathon/11-image-2e661fd0.png",
      },
    ],
    attachments: [],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "K-HTML 대학대항전 해커톤 참가", body: [
        "2024 K-HTML 대학대항전 해커톤에 한국외국어대학교 대표팀으로 참가했습니다. 용인시 지역 사회문제 개선이라는 주제가 주어졌고, 현장에서 문제 정의부터 서비스 기획, UI 설계, 구현, 발표까지 제한 시간 내에 완료해야 하는 대회였습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/03-image-2e661fd0.png", caption: "해커톤 현장 — 팀 작업 모습" },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "사용자 흐름 기반 UI 설계", body: [
        "용인시 주민의 실제 불편 사항을 조사하고, 사용자 행동 흐름(문제 인식 → 정보 탐색 → 해결 요청)을 기반으로 화면 구조를 설계했습니다. HTML, CSS, JavaScript로 반응형 UI를 구현하고, 사용자 입력 폼과 결과 표시 화면 간의 자연스러운 전환을 설계했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/04-image-2e661fd0.png", caption: "서비스 화면 설계 — 사용자 입력 흐름" },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/05-image-2e661fd0.png", caption: "UI 구현 결과물" },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "Azure OpenAI 기반 AI 기능 연동", body: [
        "사용자가 입력한 문제 상황을 Azure OpenAI API로 전달하고, 맥락에 맞는 해결 방안을 생성형 AI가 제안하는 기능을 구현했습니다. 프롬프트 엔지니어링을 통해 용인시 지역 맥락에 맞는 답변이 나오도록 시스템 프롬프트를 설계하고 반복 테스트했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/06-image-2e661fd0.png", caption: "AI 응답 기능 — 사용자 질문에 대한 동적 답변 생성" },
      { type: "video", url: "/images/projects/notion/k-html-hackathon/07-video-2e661fd0.mp4", caption: "서비스 시연 영상 — 전체 사용자 흐름 데모" },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "48시간 제한 내 서비스 통합", body: [
        "AWS EC2에 서비스를 배포하고, 프론트엔드 화면 → AI API 호출 → 결과 렌더링까지의 전체 데이터 흐름을 하나의 서비스로 통합했습니다. 제한된 시간(48시간) 안에 동작하는 결과물을 만들기 위해 기능 범위를 최소화하고, 핵심 시나리오 중심으로 구현 우선순위를 정했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/08-image-2e661fd0.png", caption: "최종 발표 자료" },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/09-image-2e661fd0.png" },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "MVP 완성과 실전 협업 경험", body: [
        "문제 정의 → UI 설계 → 구현 → 검증 과정을 짧은 주기로 반복하며, '완벽한 서비스'보다 '작동 가능한 MVP'를 만드는 판단력을 길렀습니다. 팀원 간 역할 분배(프론트엔드, 백엔드, 발표)를 빠르게 결정하고 병렬로 작업해 시간 내에 Azure OpenAI 연동 서비스 MVP를 완성했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/10-image-2e661fd0.png", caption: "대회 참가 인증" },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/11-image-2e661fd0.png" },
    ],
  },
  unistStartupAudition: {
    media: {
      type: "image",
      url: "/images/projects/notion/unist-startup-audition/01-cover-2e661fd0.png",
    },
    gallery: [
      {
        type: "image",
        title: "대표 커버 이미지",
        url: "/images/projects/notion/unist-startup-audition/01-cover-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 1",
        url: "/images/projects/notion/unist-startup-audition/03-image-2e661fd0.png",
      },
    ],
    attachments: [
      {
        type: "pdf",
        title: "(크루) 2024년 스마트 해상물류 창업오디션 8기_수료증.pdf",
        url: "/images/projects/notion/unist-startup-audition/04-file-2e661fd0.pdf",
      },
      {
        type: "pdf",
        title: "crew_사업자등록증.pdf",
        url: "/images/projects/notion/unist-startup-audition/05-file-2e661fd0.pdf",
      },
      {
        type: "pdf",
        title: "사업비 집행 계획서 및 청구서_Crew (2).pdf",
        url: "/images/projects/notion/unist-startup-audition/06-file-2e661fd0.pdf",
      },
      {
        type: "pdf",
        title: "창업 오디션 지원 발표.pdf",
        url: "/images/projects/notion/unist-startup-audition/07-file-2e661fd0.pdf",
      },
      {
        type: "pdf",
        title: "창업오디션 8기 신청서류_crew.pdf",
        url: "/images/projects/notion/unist-startup-audition/08-file-2e661fd0.pdf",
      },
    ],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "해양 사고 예방 교육의 한계", body: [
        "UNIST 스마트 해상물류 창업 오디션 8기에 참가해, 1년간 아이디어 기획부터 프로토타입 개발, 사업화 검증, 최종 발표까지 전 과정을 수행한 프로젝트입니다. PM 역할을 맡아 팀 'Crew'를 이끌며 해양 사고 예방 교육이라는 문제를 정의하고, VR 기반 시뮬레이션 솔루션을 제안했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/unist-startup-audition/03-image-2e661fd0.png", caption: "팀 Crew 활동 사진 — 프로토타입 시연 장면" },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "Unity 기반 VR 시뮬레이션 설계", body: [
        "Unity 기반 VR 환경에서 해양 사고 상황(선박 충돌, 화재 대피 등)을 재현하고, 사용자가 직접 대응 절차를 체험할 수 있는 교육 콘텐츠를 설계했습니다. Arduino 기반 물리 컨트롤러(조이스틱, 버튼 패널)를 VR 환경과 연동해 실제 선박 조작에 가까운 체감형 인터페이스를 구현했습니다.",
      ] },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "사업화 검증과 시장 분석", body: [
        "시장 조사를 통해 해양 안전 교육 시장 규모와 기존 교육 방식의 한계(비용, 접근성, 현실감 부족)를 분석하고 VR 솔루션의 차별점을 정리했습니다. 사업비 집행 계획서, 법인 설립(사업자등록), 투자 유치 발표 자료까지 작성하며 아이디어를 사업으로 구체화하는 전 과정을 경험했습니다.",
      ] },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "VR 멀미 및 UX 반복 개선", body: [
        "사용자 테스트를 통해 VR 멀미 유발 구간, 조작 혼란 포인트 등을 발견하고 UI/UX를 반복 개선했습니다. 기술적 아이디어만이 아니라, 시장성과 실행 가능성을 함께 증명해야 한다는 창업 관점의 사고방식을 확보했습니다.",
      ] },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "최종 선정 및 창업 지원금 수주", body: [
        "UNIST 창업 오디션 최종 선정 및 1,000만 원 창업 지원금을 수주했습니다.",
      ] },
      { type: "text", heading: "관련 서류", body: [
        "창업 오디션 과정에서 작성한 주요 문서들입니다.",
      ] },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/04-file-2e661fd0.pdf", title: "(크루) 2024년 스마트 해상물류 창업오디션 8기_수료증.pdf" },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/05-file-2e661fd0.pdf", title: "crew_사업자등록증.pdf" },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/06-file-2e661fd0.pdf", title: "사업비 집행 계획서 및 청구서_Crew (2).pdf" },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/07-file-2e661fd0.pdf", title: "창업 오디션 지원 발표.pdf" },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/08-file-2e661fd0.pdf", title: "창업오디션 8기 신청서류_crew.pdf" },
    ],
  },
  miniCapstoneAiCloud: {
    media: {
      type: "image",
      url: "/images/projects/notion/mini-capstone-ai-cloud/02-image-2e661fd0.png",
    },
    gallery: [
      {
        type: "image",
        title: "프로젝트 이미지 1",
        url: "/images/projects/notion/mini-capstone-ai-cloud/02-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 2",
        url: "/images/projects/notion/mini-capstone-ai-cloud/03-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 3",
        url: "/images/projects/notion/mini-capstone-ai-cloud/04-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 4",
        url: "/images/projects/notion/mini-capstone-ai-cloud/05-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "교육 수료증 이미지",
        url: "/images/projects/notion/mini-capstone-ai-cloud/06-image-2e661fd0.jpg",
      },
    ],
    attachments: [],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "산학 연계 캡스톤 프로그램", body: [
        "학교와 기업이 연계한 미니 산학 캡스톤 프로그램에 참여해, 클라우드 인프라와 생성형 AI를 결합한 서비스 아이디어를 기획하고 구현 실험을 진행한 프로젝트입니다. 40시간 집중 교육 과정에서 AWS 클라우드 아키텍처(EC2, S3, Lambda)와 Microsoft Azure OpenAI 서비스의 활용 방법을 체계적으로 학습했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/02-image-2e661fd0.png", caption: "교육 과정 현장 — 클라우드 및 AI 실습" },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "마이크로소프트·구글 코리아 본사 방문", body: [
        "마이크로소프트 코리아 본사를 방문해 Azure 기반 클라우드 서비스의 실제 운영 구조와 엔터프라이즈 AI 도입 사례를 접했습니다. 구글 코리아 본사에서는 GCP 기반 머신러닝 파이프라인과 대규모 데이터 처리 인프라의 설계 철학을 직접 들으며 프로젝트 방향을 구체화했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/03-image-2e661fd0.png", caption: "마이크로소프트 코리아 본사 탐방" },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/04-image-2e661fd0.png", caption: "구글 코리아 본사 탐방" },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "서버리스 AI API 파이프라인", body: [
        "생성형 AI를 단순한 챗봇이 아닌 서비스 문제 해결 도구로 활용하기 위해, 사용자 입력 → AI 응답 생성 → 결과 검증의 3단계 흐름을 설계했습니다. AWS Lambda와 API Gateway를 활용해 서버리스 구조로 AI API 호출 파이프라인을 구축하고, 비용 효율적인 배포 방식을 실험했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/05-image-2e661fd0.png", caption: "서비스 아키텍처 설계 다이어그램" },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "모듈 분리와 독립 테스트 구조", body: [
        "기능 구조를 작은 단위(입력 파싱, 프롬프트 구성, 응답 후처리)로 분리해 각 모듈을 독립적으로 테스트할 수 있는 구조를 만들었습니다. 클라우드 인프라 위에서 AI 서비스를 설계할 때 비용, 응답 속도, 확장성 사이의 트레이드오프를 실제로 고민하는 경험을 했습니다.",
      ] },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "AI 서비스 설계 관점 확보", body: [
        "AI를 '기능'으로만 보는 것이 아니라, 제품의 어떤 문제를 풀 수 있는지를 먼저 정의하고 그에 맞는 AI 활용 방식을 선택해야 한다는 관점을 쌓았습니다. AWS Lambda 서버리스 AI API 파이프라인 구축 실험을 완료했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/06-image-2e661fd0.jpg", caption: "클라우드 및 AI 교육 과정 수료증" },
    ],
  },
  legoParticleParty: {
    media: {
      type: "image",
      url: "/images/projects/notion/lego-particle-party/03-image-2e661fd0.png",
    },
    gallery: [
      {
        type: "image",
        title: "프로젝트 이미지 1",
        url: "/images/projects/notion/lego-particle-party/03-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 2",
        url: "/images/projects/notion/lego-particle-party/04-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 3",
        url: "/images/projects/notion/lego-particle-party/05-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 4",
        url: "/images/projects/notion/lego-particle-party/06-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 5",
        url: "/images/projects/notion/lego-particle-party/07-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 6",
        url: "/images/projects/notion/lego-particle-party/08-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 7",
        url: "/images/projects/notion/lego-particle-party/09-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 8",
        url: "/images/projects/notion/lego-particle-party/10-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 9",
        url: "/images/projects/notion/lego-particle-party/11-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 10",
        url: "/images/projects/notion/lego-particle-party/12-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 11",
        url: "/images/projects/notion/lego-particle-party/13-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 12",
        url: "/images/projects/notion/lego-particle-party/14-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 13",
        url: "/images/projects/notion/lego-particle-party/15-image-2e661fd0.png",
      },
      {
        type: "image",
        title: "프로젝트 이미지 14",
        url: "/images/projects/notion/lego-particle-party/16-image-2e661fd0.png",
      },
    ],
    attachments: [],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "Fall Guys 감각의 파티 게임 구현", body: [
        "Fall Guys의 파티 게임 감각을 참고해, 레고 파티클 콘셉트의 멀티플레이 미니게임을 Unreal Engine 5로 구현한 부트캠프 팀 프로젝트입니다. 팀 내에서 UI/UX 파트를 담당했으며, C++과 UMG(Unreal Motion Graphics)를 활용해 게임 내 인터페이스 전반을 설계하고 구현했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/03-image-2e661fd0.png", caption: "게임 플레이 화면 — 레고 파티클 콘셉트" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/04-image-2e661fd0.png", caption: "멀티플레이 미니게임 장면" },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "게임 UI 시스템 설계", body: [
        "플레이어 머리 위 방향 화살표, 게임 시작 전 3-2-1 카운트다운, 라운드 결과 표시, 옵션 메뉴 등 실제 플레이에 필요한 전체 UI 시스템을 설계했습니다. UMG 위젯 블루프린트와 C++ 바인딩을 조합해 게임 상태(대기 → 플레이 → 결과) 변화에 맞춰 UI가 자동으로 전환되도록 이벤트 기반 구조를 구현했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/05-image-2e661fd0.png", caption: "카운트다운 UI 구현" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/06-image-2e661fd0.png", caption: "플레이어 상태 표시 UI" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/07-image-2e661fd0.png", caption: "옵션 메뉴 UI" },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "실시간 데이터 바인딩과 UI 피드백", body: [
        "플레이어 수, 남은 시간, 점수 등의 실시간 데이터를 위젯에 바인딩해 게임 진행 중에도 정보가 즉각 갱신되도록 처리했습니다.",
        "폴가이즈류 파티 게임에서 중요한 '즉각적인 피드백'에 집중해, 점수 획득 시 팝업 애니메이션, 탈락 시 화면 흔들림 등 시각적 반응을 추가했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/08-image-2e661fd0.png", caption: "라운드 진행 화면" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/09-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/10-image-2e661fd0.png" },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "버전 관리와 UI 가독성 개선", body: [
        "Unreal 프로젝트 특성상 바이너리 에셋(.uasset, .umap)의 충돌 방지를 위해 SVN으로 에셋을 관리하고, 코드(.cpp, .h)는 Git으로 분리해 병행 운영했습니다. 팀원 5명 간 작업 단위를 맵/캐릭터/UI/네트워크로 분배하고, 주 2회 머지 타임을 정해 통합 빌드를 검증하는 방식으로 충돌을 최소화했습니다.",
        "밝은 파스텔 톤의 레고 맵 위에서도 UI가 명확히 보이도록 반투명 배경 패널, 아웃라인 텍스트, 대비 높은 색상 팔레트를 적용해 가독성을 개선했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/11-image-2e661fd0.png", caption: "UI 개선 전후 비교" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/12-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/13-image-2e661fd0.png" },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "UE5 C++ 기반 게임 UI 시스템 완성", body: [
        "UE5 C++ 기반 게임 UI 전체 시스템을 설계하고 구현했습니다. UMG 위젯과 C++ 바인딩을 조합한 이벤트 기반 UI 구조, SVN/Git 병행 버전 관리, 파스텔 톤 맵에서의 UI 가독성 개선까지 게임 개발의 전체 흐름을 경험했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/14-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/15-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/16-image-2e661fd0.png" },
    ],
  },
  fsmBtThesis: {
    gallery: [],
    attachments: [
      {
        type: "pdf",
        title: "졸업논문 최종_안재현서민주 .pdf",
        url: "/images/projects/notion/fsm-bt-thesis/02-pdf-2e661fd0.pdf",
      },
      {
        type: "pdf",
        title: "졸업 논문 제안서.pdf",
        url: "/images/projects/notion/fsm-bt-thesis/03-pdf-2e661fd0.pdf",
      },
      {
        type: "pdf",
        title: "FSM_vs_BT_Thesis_English.pdf",
        url: "/images/projects/notion/fsm-bt-thesis/04-file-33461fd0.pdf",
      },
    ],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "게임 AI 구조의 정량적 비교 부족", body: [
        "게임 AI에서 가장 널리 쓰이는 두 가지 구조인 FSM(Finite State Machine)과 Behavior Tree의 실제 성능 차이를 정량적으로 비교한 졸업논문 프로젝트입니다. 대부분의 게임 AI 교재에서 FSM은 단순하고 BT는 확장성이 좋다고 설명하지만, 실제 게임 환경에서 응답 속도, 메모리 사용량, 유지보수 비용이 어떻게 다른지 검증한 연구는 부족했습니다.",
      ] },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "Unity 기반 실험 환경 설계", body: [
        "Unity 엔진에서 동일한 AI 행동 로직(순찰 → 적 감지 → 추적 → 공격 → 회피)을 FSM과 BT 두 가지 구조로 각각 구현했습니다. 공정한 비교를 위해 동일한 맵, 동일한 적 배치, 동일한 시나리오(1:1 전투, 다수 적 대응, 환경 변화 대응)에서 반복 테스트를 수행했습니다.",
        "변수 통제를 위해 애니메이션, 물리 연산 등 AI 외 요소는 동일 설정으로 고정했습니다.",
      ] },
      { type: "code", title: "FSM 상태 전환 구조 예시", language: "csharp", code: "// FSM 상태 전환 — 조건이 늘어날수록 복잡도 증가\nswitch (currentState) {\n  case State.Patrol:\n    if (DetectEnemy()) SetState(State.Chase);\n    break;\n  case State.Chase:\n    if (InAttackRange()) SetState(State.Attack);\n    else if (!DetectEnemy()) SetState(State.Patrol);\n    break;\n  case State.Attack:\n    if (!InAttackRange()) SetState(State.Chase);\n    if (health < threshold) SetState(State.Evade);\n    break;\n}" },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "성능 측정 및 분석", body: [
        "Unity Profiler를 활용해 프레임당 AI 연산 시간, 상태 전환 지연, CPU 점유율, GC 할당량 등의 성능 지표를 수집했습니다.",
        "FSM은 상태 수가 적을 때 더 빠른 응답 속도를 보였지만, 상태가 10개를 넘으면 전환 조건의 복잡도가 급격히 증가해 유지보수가 어려워졌습니다.",
        "BT는 초기 설정 비용이 높지만, 노드 추가만으로 새로운 행동을 확장할 수 있어 복잡한 AI일수록 구조적 이점이 명확했습니다.",
      ] },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "공정한 실험 조건 확보", body: [
        "FSM과 BT의 공정한 비교를 위해 동일한 맵, 동일한 적 배치, 동일한 시나리오에서 반복 테스트를 수행하고, 변수 통제를 위해 애니메이션, 물리 연산 등 AI 외 요소는 동일 설정으로 고정했습니다. 실험 결과의 신뢰도를 높이기 위해 각 시나리오를 여러 차례 반복 실행하고 평균값을 비교했습니다.",
      ] },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "구조별 선택 기준 도출", body: [
        "단순한 AI(상태 5개 이하)에는 FSM이, 복잡하고 확장 가능성이 높은 AI에는 BT가 적합하다는 실험 기반의 선택 기준을 도출했습니다. 논문을 영문으로도 번역해 작성하며, 학술적 글쓰기와 실험 설계 방법론을 익혔습니다.",
      ] },
      { type: "text", heading: "논문 원문", body: [
        "졸업논문 최종본, 제안서, 영문 번역본을 아래에서 확인할 수 있습니다.",
      ] },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/02-pdf-2e661fd0.pdf", title: "졸업논문 최종_안재현서민주.pdf" },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/03-pdf-2e661fd0.pdf", title: "졸업 논문 제안서.pdf" },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/04-file-33461fd0.pdf", title: "FSM_vs_BT_Thesis_English.pdf" },
    ],
  },
  ecommerceBackend: {
    media: undefined,
    gallery: [],
    attachments: [],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "동시성과 데이터 정합성, 실제로 부딪혀 보기", body: [
        "이커머스 도메인에서 가장 빈번하게 발생하는 문제는 '동시 요청 시 데이터가 꼬이는 것'입니다. 재고 오버셀, 쿠폰 중복 사용, 결제-주문 상태 불일치 같은 문제는 단순 CRUD로는 해결할 수 없고, 트랜잭션 경계 설계, 분산 락, 이벤트 아키텍처를 종합적으로 이해해야 합니다.",
        "이 프로젝트는 10주 동안 매주 하나의 핵심 주제(TDD → CRUD → 도메인 설계 → 동시성 제어 → 캐싱 → 결제 연동 → 이벤트 아키텍처 → 선착순 처리 → 실시간 랭킹 → 배치 처리)를 깊이 파고들며, 요구사항 분석 → 설계 → 구현 → PR → 멘토 코드 리뷰 → 기술 블로그 정리를 반복한 성장 기록입니다.",
      ] },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "Clean Architecture 기반 4-Layer 구조", body: [
        "Interfaces(Controller/DTO) → Application(UseCase/Facade) → Domain(Entity/Service) → Infrastructure(Repository/External API) 4계층으로 분리하여, 도메인 로직이 프레임워크나 인프라에 의존하지 않도록 설계했습니다.",
        "Application Layer의 Facade가 여러 도메인 서비스를 조합하는 유스케이스를 담당하고, @Transactional 경계를 Facade 메서드 단위로 설정하여 트랜잭션 범위를 명확히 제어했습니다.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/architecture-overview.svg", caption: "전체 아키텍처 — 4-Layer 구조를 중심으로 Redis, Kafka, PG, Batch를 외부 인프라로 분리" },
      { type: "code", title: "@Transactional 경계와 Facade 패턴", language: "java", code: "@Component\n@RequiredArgsConstructor\npublic class OrderFacade {\n    private final OrderService orderService;\n    private final StockService stockService;\n    private final PaymentService paymentService;\n    private final OutboxEventRepository outboxRepository;\n\n    @Transactional  // Facade 레벨에서 트랜잭션 경계 설정\n    public OrderResult placeOrder(OrderCommand cmd) {\n        // 1. 재고 차감 (Redis Lua → DB 동기화)\n        stockService.decreaseStock(cmd.getProductId(), cmd.getQuantity());\n        // 2. 주문 생성\n        Order order = orderService.create(cmd);\n        // 3. 결제 처리\n        PaymentResult payment = paymentService.process(order);\n        // 4. Outbox 이벤트 저장 (같은 트랜잭션 내)\n        outboxRepository.save(\n            OutboxEvent.of(\"order.completed\", order.getId())\n        );\n        return OrderResult.from(order, payment);\n    }\n}" },
      { type: "text", heading: "이벤트 기반 비동기 아키텍처", body: [
        "결제 완료 후의 후속 처리(랭킹 갱신, 알림 발송, 포인트 적립)를 Kafka 이벤트로 분리하여 주문 서비스와 후속 서비스 간 결합도를 제거했습니다. Consumer Group별 독립 처리로 한 Consumer의 장애가 다른 Consumer에 영향을 주지 않도록 격리했습니다.",
        "핵심 설계 원칙: 동기 흐름(주문 → 재고 차감 → 결제)은 @Transactional로 원자성 보장, 비동기 흐름(랭킹 갱신, 알림)은 Kafka로 분리하여 장애 전파를 차단합니다.",
      ] },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "Redis Lua 스크립트 기반 동시성 제어", body: [
        "재고 차감에서 가장 중요한 것은 '확인과 차감이 원자적으로 이루어지는 것'입니다. Java 레벨에서 if (stock > 0) stock-- 를 하면 check-then-act 경쟁 조건이 발생합니다. Redis Lua 스크립트는 싱글 스레드로 실행되므로 확인과 차감이 하나의 원자적 연산으로 처리됩니다.",
        "DB 비관적 락(SELECT ... FOR UPDATE)은 커넥션을 점유하므로 동시 요청이 많은 선착순 시나리오에서 커넥션 풀 고갈 위험이 있고, Redis 분산 락(Redisson)은 락 획득/해제 오버헤드가 있어 단순 차감에는 과도합니다. Lua 스크립트가 가장 가벼우면서 정확한 선택이었습니다.",
      ] },
      { type: "code", title: "Redis Lua 스크립트 — 재고 원자적 차감", language: "lua", code: "-- KEYS[1]: stock:{productId}\n-- ARGV[1]: 차감 수량\nlocal stock = tonumber(redis.call('GET', KEYS[1]))\nif stock == nil then\n    return -1  -- 재고 키 없음\nend\nif stock < tonumber(ARGV[1]) then\n    return 0   -- 재고 부족\nend\nredis.call('DECRBY', KEYS[1], ARGV[1])\nreturn 1       -- 차감 성공" },
      { type: "text", heading: "Transactional Outbox 패턴", body: [
        "@TransactionalEventListener를 사용하면 트랜잭션 커밋 후 이벤트를 발행하지만, 커밋과 Kafka 발행 사이에 애플리케이션이 죽으면 이벤트가 유실됩니다. Outbox 패턴은 이벤트를 비즈니스 데이터와 같은 DB 트랜잭션 내에 저장하므로 '커밋됐는데 이벤트는 없는' 상태가 원천적으로 불가능합니다.",
        "별도 스케줄러가 Outbox 테이블을 폴링하여 PENDING 상태 이벤트를 Kafka로 발행하고, 발행 성공 시 PUBLISHED로 상태를 변경합니다. Kafka 장애 시에도 이벤트가 DB에 보존되어 복구 후 재발행이 가능합니다.",
      ] },
      { type: "code", title: "Outbox 이벤트 스케줄러", language: "java", code: "@Scheduled(fixedDelay = 1000)  // 1초 간격 폴링\n@Transactional\npublic void publishPendingEvents() {\n    List<OutboxEvent> events = outboxRepository\n        .findByStatusOrderByCreatedAtAsc(EventStatus.PENDING);\n    \n    for (OutboxEvent event : events) {\n        try {\n            kafkaTemplate.send(event.getTopic(), event.getPayload());\n            event.markAsPublished();\n        } catch (Exception e) {\n            event.incrementRetryCount();\n            if (event.getRetryCount() >= MAX_RETRY) {\n                event.markAsFailed();\n            }\n        }\n    }\n}" },
      { type: "text", heading: "선착순 대기열 (Redis Queue)", body: [
        "이벤트 오픈 시 순간적으로 몰리는 트래픽을 Redis List(LPUSH)로 대기열에 적재하고, Consumer가 RPOP으로 순차 처리합니다. 대기열 진입 시점에 Lua 스크립트로 재고 확인과 대기열 추가를 원자적으로 수행하여, 재고 이상의 요청이 대기열에 진입하는 것 자체를 차단합니다.",
        "Redis Stream 대비 List를 선택한 이유: Stream은 Consumer Group, ACK, 재처리 같은 기능이 풍부하지만, 단순 선착순 큐에는 오버스펙이고 List의 LPUSH/RPOP이 더 직관적이며 성능 오버헤드가 적습니다.",
      ] },
      { type: "text", heading: "실시간 랭킹 (Redis Sorted Set + Spring Batch)", body: [
        "판매 이벤트마다 ZINCRBY로 상품별 점수를 증가시키고, ZREVRANGE로 Top-N을 O(log N + M)에 조회합니다. DB 집계 쿼리(GROUP BY + ORDER BY)는 데이터가 커질수록 풀 테이블 스캔에 가까워지므로, 실시간 조회는 Redis에 위임하고 정확한 일간 집계는 Spring Batch로 분리했습니다.",
        "Spring Batch는 Chunk-oriented Processing(ItemReader → ItemProcessor → ItemWriter)으로 일간 판매 메트릭을 집계합니다. chunk size를 500으로 설정하여 메모리 사용량을 제한하면서도 처리량을 확보하고, skip/retry 정책으로 부분 실패 시에도 전체 배치가 중단되지 않도록 설계했습니다.",
      ] },

      // ── 04 ── Architecture
      { type: "section-heading", title: "04 — 시스템 아키텍처" },
      { type: "text", heading: "Order Flow — 선착순 주문 처리", body: [
        "Client → API Gateway → Redis Lua(재고 확인) → Redis Queue(LPUSH) → Consumer(RPOP) → Order Service(@Transactional) → MySQL + Outbox Table",
        "요청이 들어오면 DB에 직접 접근하지 않고, Redis Lua로 재고를 먼저 확인합니다. 재고가 있으면 Redis Queue에 적재하고, Consumer가 순차적으로 꺼내 주문을 생성합니다. 이 구조로 DB 커넥션 풀 고갈 없이 순간 트래픽을 흡수합니다.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/queue-token-flow.svg", caption: "대기열 아키텍처 — Redis Sorted Set으로 순번을 관리하고 Scheduler + Lua로 입장 토큰을 원자적으로 발급" },
      { type: "text", heading: "Event Flow — Outbox → Kafka → Consumer", body: [
        "Order Service(@Transactional 내 Outbox 저장) → Outbox Scheduler(1초 폴링) → Kafka Topic(order.completed) → Consumer Group A(랭킹 갱신) / Consumer Group B(알림)",
        "Consumer Group을 분리하여 랭킹 갱신 Consumer의 장애가 알림 Consumer에 전파되지 않습니다. 각 Consumer는 독립적인 offset을 관리하므로 개별 재처리가 가능합니다.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/outbox-kafka-flow.svg", caption: "Outbox 이벤트 흐름 — DB 트랜잭션 안에서 이벤트를 저장하고 Relay가 Kafka로 발행, Consumer는 EventHandled로 멱등 처리" },
      { type: "text", heading: "Recovery Flow — 결제 실패 자동 복구", body: [
        "Payment(status=PENDING) → Scheduler(30초 간격) → PG API 재조회 → 성공 시 COMPLETED / 실패 시 보상 트랜잭션(재고 원복 + 주문 CANCELLED)",
        "보상 트랜잭션은 @Transactional(propagation = REQUIRES_NEW)로 원래 트랜잭션과 분리하여, 보상 로직 자체의 실패가 원래 트랜잭션에 영향을 주지 않도록 격리했습니다.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/payment-recovery-flow.svg", caption: "결제 복구 흐름 — PG 타임아웃을 PENDING 상태로 흡수하고 Callback/Scheduler가 최종 상태를 확정" },
      { type: "text", heading: "Batch Flow — 일간 메트릭 집계", body: [
        "Spring Batch Job(매일 02:00) → JpaPagingItemReader(판매 데이터) → ItemProcessor(집계 로직) → JpaItemWriter(ranking_snapshot 테이블) → Ranking API 캐시 갱신",
        "chunk size 500, skip limit 10으로 설정하여 일부 데이터 오류 시에도 배치가 중단되지 않고 완료됩니다.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/ranking-batch-flow.svg", caption: "랭킹 파이프라인 — Kafka 이벤트는 Redis ZSET 실시간 랭킹으로, Spring Batch는 일/주/월 조회 모델로 분리" },
      { type: "callout", variant: "info", title: "설계 원칙", body: [
        "모든 흐름은 '정상 동작'이 아닌 '장애 상황에서도 데이터가 유실되지 않는 구조'를 우선으로 설계했습니다.",
        "동기 처리(주문·결제·재고)는 @Transactional로 원자성을 보장하고, 비동기 처리(랭킹·알림)는 Kafka로 분리하여 장애 전파를 차단합니다.",
        "모든 외부 호출(PG, Kafka)은 실패를 전제로 설계하고, 재시도·보상·멱등성으로 최종 정합성(Eventual Consistency)을 확보합니다.",
      ] },

      // ── 05 ── Problem Solving
      { type: "section-heading", title: "05 — 문제 해결 기록" },

      { type: "text", heading: "1. 재고 오버셀 방지", body: [
        "문제 — 동시 주문 시 check-then-act 경쟁 조건으로 재고가 음수로 떨어지는 오버셀 발생. JMeter로 동시 100건 요청을 보내면 재고 10개인 상품에 대해 30건 이상이 주문 성공하는 현상 확인.",
        "고민 — (1) DB 비관적 락(SELECT ... FOR UPDATE): 정합성은 보장되지만 커넥션 점유 시간이 길어 HikariCP 커넥션 풀 고갈 위험. (2) Redisson 분산 락: 락 획득/해제 네트워크 왕복 오버헤드, 단순 차감에는 과도. (3) Redis Lua 스크립트: 싱글 스레드 실행으로 원자성 보장, 네트워크 왕복 1회.",
        "선택 — Redis Lua 스크립트로 재고 확인과 차감을 하나의 원자적 연산으로 처리. GET → 비교 → DECRBY가 중간에 끊기지 않으므로 경쟁 조건이 원천 차단됩니다.",
        "결과 — 동시 100건 요청 테스트에서 오버셀 0건 달성. DB 부하 없이 Redis 레벨에서 재고를 제어하여 커넥션 풀 안정성을 확보했습니다.",
      ] },

      { type: "text", heading: "2. 쿠폰 중복 사용 방지", body: [
        "문제 — 동일 사용자가 같은 쿠폰으로 동시에 여러 건의 주문을 요청하면, 애플리케이션 레벨 체크(findByUserIdAndCouponId)로는 두 요청 모두 '미사용' 상태를 읽어 중복 사용이 발생.",
        "고민 — (1) DB Unique 제약(user_id + coupon_id): 정합성은 보장되지만 DB 트랜잭션까지 가야 확인 가능. (2) Redis Set(SADD): 원자적 중복 체크, DB 접근 불필요. (3) 애플리케이션 레벨 synchronized: 단일 인스턴스에서만 유효, 분산 환경 불가.",
        "선택 — Redis Set에 SADD coupon:{couponId}:users {userId}를 실행하여, 반환값 1이면 최초 사용(성공), 0이면 이미 사용(거부). 원자적 연산이므로 동시 요청에서도 정확히 1건만 성공합니다.",
        "결과 — 중복 사용 시도를 Redis 레벨에서 즉시 거부하여 불필요한 DB 트랜잭션을 제거하고, 쿠폰 사용 체크 응답 시간을 sub-millisecond로 단축했습니다.",
      ] },

      { type: "text", heading: "3. 결제 실패 복구 (보상 트랜잭션)", body: [
        "문제 — PG 응답 타임아웃(3초 초과) 또는 네트워크 오류로 결제 결과를 알 수 없는 상태 발생. 이때 재고는 이미 차감된 상태이므로, 결제 실패 확인 시 재고 원복이 필요.",
        "고민 — (1) 즉시 재시도: PG 장애 시 재시도도 실패하여 의미 없음. (2) 스케줄러 기반 재조회: PG가 복구된 후 결과를 확인할 수 있어 안정적. (3) 사용자 수동 확인: UX 관점에서 최악.",
        "선택 — 결제 상태를 PENDING으로 저장 → 스케줄러가 30초 간격으로 PG API에 결제 결과를 재조회 → 실패 확인 시 보상 트랜잭션을 실행합니다. 보상 트랜잭션은 @Transactional(propagation = REQUIRES_NEW)로 분리하여 독립적으로 커밋됩니다.",
        "결과 — 결제 결과 불확실 상태를 시스템이 자동으로 해소합니다. 보상 트랜잭션 실패 시에도 원래 트랜잭션에 영향 없이, 다음 폴링에서 재시도됩니다.",
      ] },

      { type: "text", heading: "4. 이벤트 유실 방지 (Outbox 패턴)", body: [
        "문제 — @TransactionalEventListener로 트랜잭션 커밋 후 Kafka에 이벤트를 발행하면, 커밋 성공 → Kafka 발행 실패(네트워크 오류, Broker 다운) 시 이벤트가 유실됩니다. 주문은 완료됐는데 랭킹 갱신·알림이 누락됩니다.",
        "고민 — (1) @TransactionalEventListener: 트랜잭션 커밋과 이벤트 발행이 원자적이지 않음. (2) Outbox 패턴: 이벤트를 DB에 저장하므로 원자성 보장, 인프라 추가 비용 낮음. (3) CDC(Debezium): DB binlog를 감지하여 자동 발행하지만 인프라 복잡도 높음.",
        "선택 — Outbox 패턴을 적용했습니다. 비즈니스 로직과 Outbox 이벤트 저장이 같은 @Transactional 내에서 실행되므로, '커밋됐는데 이벤트 없음' 상태가 불가능합니다. 별도 스케줄러가 폴링하여 Kafka로 발행하고, 재시도 3회 초과 시 FAILED 처리 후 알림을 발송합니다.",
        "결과 — Kafka 장애 시에도 이벤트가 DB에 보존되어 복구 후 재발행이 가능합니다. CDC 대비 인프라 추가 없이 구현할 수 있어 프로젝트 규모에 적합했습니다.",
      ] },

      { type: "text", heading: "5. 선착순 트래픽 처리", body: [
        "문제 — 이벤트 오픈 시 순간적으로 수백 건의 동시 요청이 들어오면, 각 요청이 DB 커넥션을 점유하여 HikariCP 풀이 고갈되고 전체 서비스가 응답 불가 상태에 빠짐.",
        "고민 — (1) DB 큐 테이블: 결국 DB에 부하가 집중되어 근본적 해결이 안 됨. (2) Redis List: 인메모리 처리로 DB 부하 분산, LPUSH/RPOP으로 순서 보장. (3) Redis Stream: Consumer Group, ACK 등 기능이 풍부하지만 단순 선착순에는 오버스펙.",
        "선택 — Redis List(LPUSH/RPOP)로 요청을 대기열에 적재하고, Consumer가 순차적으로 처리합니다. 대기열 진입 시 Lua 스크립트로 재고 확인과 대기열 추가를 원자적으로 수행하여, 재고 이상의 요청이 대기열에 들어가는 것 자체를 차단합니다.",
        "결과 — DB 커넥션 사용을 Consumer 1개로 제한하여 풀 고갈을 원천 차단하고, 처리 순서를 보장하면서 오버셀 없이 선착순 로직을 구현했습니다.",
      ] },

      { type: "text", heading: "6. 실시간 랭킹 설계", body: [
        "문제 — 판매량 기반 실시간 랭킹을 매번 DB에서 SELECT COUNT(*) ... GROUP BY product_id ORDER BY count DESC로 조회하면, 데이터 증가에 따라 응답 시간이 선형적으로 늘어남.",
        "고민 — (1) DB 집계 쿼리: 인덱스를 타도 GROUP BY + ORDER BY 조합은 임시 테이블을 생성하여 성능 저하. (2) Redis Sorted Set: O(log N) 삽입, O(log N + M) 범위 조회로 데이터 규모와 무관하게 일정한 성능. (3) 캐시 + 배치 갱신: 실시간성 부족.",
        "선택 — Kafka Consumer에서 판매 이벤트를 수신할 때마다 ZINCRBY ranking:daily {productId} 1로 점수를 증가시키고, ZREVRANGE ranking:daily 0 9로 Top-10을 즉시 조회합니다. 일간 정확한 집계는 Spring Batch로 별도 처리하여 하이브리드 구조를 구성했습니다.",
        "결과 — 실시간 랭킹 조회 응답 시간을 O(log N) 수준으로 유지하면서, Spring Batch로 일간 정확도를 보완합니다. 실시간성과 정확성을 모두 확보하는 트레이드오프를 설계 단계에서 결정했습니다.",
      ] },

      // ── 06 ── Code Review & Testing
      { type: "section-heading", title: "06 — 코드 리뷰와 테스트 전략" },
      { type: "text", heading: "멘토 코드 리뷰 반영", body: [
        "매주 PR을 제출하고 멘토로부터 코드 리뷰를 받았습니다. 주요 피드백: (1) 서비스 레이어에서 도메인 로직을 분리할 것 — OrderService가 가격 계산, 할인 적용, 재고 확인을 모두 담당하던 것을 Order 엔티티와 StockService로 책임 분리. (2) 예외 처리 구체화 — RuntimeException 대신 InsufficientStockException, DuplicateCouponException 등 도메인 예외 정의. (3) 테스트 가능성 — 외부 의존(Redis, Kafka)을 인터페이스로 추상화하여 단위 테스트에서 Mock 주입 가능하도록 리팩토링.",
      ] },
      { type: "text", heading: "테스트 전략", body: [
        "단위 테스트: 도메인 로직(가격 계산, 할인 적용, 상태 전이)은 외부 의존 없이 순수 JUnit으로 검증. given-when-then 패턴을 일관 적용.",
        "통합 테스트: @SpringBootTest + Testcontainers로 실제 Redis/MySQL 환경에서 동시성 시나리오 검증. ExecutorService로 100개 스레드를 동시 실행하여 오버셀, 중복 사용 등을 테스트.",
        "API 테스트: MockMvc로 Controller 레이어의 요청/응답 구조, HTTP 상태 코드, 에러 응답 포맷을 검증.",
      ] },
      { type: "code", title: "동시성 테스트 — 재고 오버셀 검증", language: "java", code: "@Test\nvoid 동시_100건_주문에도_재고는_음수가_되지_않는다() throws Exception {\n    // given\n    stockService.setStock(productId, 10);  // 재고 10개\n    int threadCount = 100;\n    ExecutorService executor = Executors.newFixedThreadPool(32);\n    CountDownLatch latch = new CountDownLatch(threadCount);\n\n    // when\n    for (int i = 0; i < threadCount; i++) {\n        executor.submit(() -> {\n            try {\n                orderFacade.placeOrder(new OrderCommand(productId, 1));\n            } catch (InsufficientStockException ignored) {\n            } finally {\n                latch.countDown();\n            }\n        });\n    }\n    latch.await();\n\n    // then\n    long successCount = orderRepository.countByProductId(productId);\n    assertThat(successCount).isEqualTo(10);\n    assertThat(stockService.getStock(productId)).isZero();\n}" },

      // ── 07 ── Key Achievements
      { type: "section-heading", title: "07 — 주요 성과" },
      { type: "text", heading: "동시성 제어 설계 역량", body: [
        "Redis Lua 스크립트로 동시 100건 요청에서 오버셀 0건을 달성하고, DB 비관적 락 / Redisson 분산 락 / Lua 스크립트 간의 트레이드오프(정합성, 성능, 커넥션 점유)를 실측 기반으로 비교·선택한 경험을 확보했습니다.",
      ] },
      { type: "text", heading: "이벤트 아키텍처와 데이터 정합성", body: [
        "Transactional Outbox 패턴으로 '트랜잭션 커밋 + 이벤트 발행'의 원자성을 보장하고, Kafka 장애 시에도 이벤트 무손실 재발행이 가능한 구조를 설계했습니다. @TransactionalEventListener vs Outbox vs CDC 각각의 장단점을 이해하고 프로젝트 규모에 맞는 선택을 할 수 있게 되었습니다.",
      ] },
      { type: "text", heading: "장애 시나리오 중심 설계", body: [
        "PG 타임아웃 → PENDING → 스케줄러 재조회 → 보상 트랜잭션, Kafka 다운 → Outbox 보존 → 복구 후 재발행 등 모든 외부 호출에서 '실패를 전제한 설계'를 적용했습니다. 성공 케이스보다 실패·중복·지연 시나리오를 먼저 설계하는 사고방식을 체득했습니다.",
      ] },
      { type: "text", heading: "실시간 + 배치 하이브리드 구조", body: [
        "Redis Sorted Set(실시간 랭킹) + Spring Batch(일간 정확 집계)를 조합하여 실시간성과 정확성의 트레이드오프를 설계 수준에서 해결한 경험을 확보했습니다.",
      ] },

      // ── 08 ── Learning Journey
      { type: "section-heading", title: "08 — 10주 학습 여정" },
      { type: "text", body: [
        "10주 동안 매주 하나의 핵심 주제를 깊이 파고들며, 요구사항 분석 → 설계 문서 작성 → 구현 → PR 제출 → 멘토 코드 리뷰 → 기술 블로그 정리를 반복한 성장 기록입니다.",
      ] },

      { type: "text", heading: "Week 1 — TDD / 회원 / 인증", body: [
        "구현 범위 — 회원가입, 헤더 기반 인증, 내 정보 조회, 비밀번호 변경 API를 E2E 테스트 기준으로 구현했습니다. `UserV1Controller`는 HTTP 요청/응답과 헤더 검증을 담당하고, `UserService`는 회원가입·인증·비밀번호 변경의 트랜잭션 경계를 담당하도록 분리했습니다.",
        "도메인 규칙 — `LoginIdValidator`, `EmailValidator`, `BirthDateValidator`, `PasswordPolicyValidator`, `NameMasker`를 분리하여 입력 형식, 비밀번호 길이/문자 조합/생년월일 포함 여부, 이름 마스킹을 각각 테스트 가능한 단위로 만들었습니다.",
        "검증 — 회원가입 성공/중복 로그인ID, 인증 실패, 비밀번호 정책 위반, 현재 비밀번호 불일치, 이름 마스킹 응답까지 E2E와 단위 테스트로 검증했습니다. 단순 서비스 단위 테스트보다 실제 API 흐름을 먼저 고정해 인증·예외·상태 변경 누락을 줄였습니다.",
        "[Pull Request #37](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/37)",
        "[기술 블로그 — TDD](https://joodev-sandy.vercel.app/blog/tdd)",
      ] },
      { type: "code", title: "Week 1 인증/회원가입 흐름", language: "mermaid", code: "sequenceDiagram\n    participant Client\n    participant API as UserV1Controller\n    participant Service as UserService\n    participant Policy as PasswordPolicyValidator\n    participant DB as UserRepository\n\n    Client->>API: POST /api/v1/users/register\n    API->>Service: register(request)\n    Service->>Policy: validate(password)\n    Service->>DB: existsByLoginId(loginId)\n    alt duplicate\n        DB-->>Service: true\n        Service-->>API: CONFLICT\n    else valid\n        Service->>DB: save(encoded user)\n        Service-->>API: UserInfo\n    end\n    API-->>Client: ApiResponse" },

      { type: "text", heading: "Week 2 — CRUD / API 설계", body: [
        "구현 범위 — 요구사항 명세, 정책 정의서, 시퀀스 다이어그램, 클래스 다이어그램, ERD를 작성하며 API를 구현하기 전에 도메인 간 책임과 데이터 흐름을 먼저 고정했습니다. 회원 도메인에서는 Controller/Service/Repository/Validator 구조를 기준으로 CRUD와 인증 흐름을 문서화했습니다.",
        "설계 판단 — 요청/응답 DTO와 엔티티를 분리해 API 계약 변경이 도메인 모델에 직접 전파되지 않게 했고, Repository는 Domain에 인터페이스를 두고 Infrastructure에 JPA 구현체를 두는 방향으로 DIP 적용 기준을 잡았습니다.",
        "검증 — PR 단위로 완료 정의를 명시했습니다. API 정상 동작뿐 아니라 예외 응답 포맷, 인증 실패, 헤더 누락, 검증 실패가 공통 `ErrorType`과 `ApiControllerAdvice` 규칙을 따르는지 확인했습니다.",
        "[Pull Request #76](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/76)",
        "[기술 블로그 — CRUD](https://joodev-sandy.vercel.app/blog/crud)",
      ] },
      { type: "point-cards", items: [
        { title: "API 계약", body: "Controller는 DTO 변환과 HTTP 상태 코드만 담당하고, 비즈니스 판단은 Service/Domain으로 이동" },
        { title: "문서화", body: "요구사항 정의서, 시퀀스 다이어그램, 클래스 다이어그램, ERD를 PR에 함께 기록" },
        { title: "예외 규칙", body: "검증 실패, 인증 실패, 헤더 누락을 공통 ErrorType과 ControllerAdvice로 정리" },
      ] },

      { type: "text", heading: "Week 3 — 상품 / 브랜드 / 주문", body: [
        "구현 범위 — 4계층 패키지 구조(`interfaces / application / domain / infrastructure`)를 실제 코드에 적용하고, Brand, Product, Like, Order 도메인 모델을 구성했습니다. Brand-Product, Order-OrderItem 관계와 값 객체(상품명, 가격, 재고 수량 등)를 통해 도메인 규칙을 엔티티 내부로 이동했습니다.",
        "아키텍처 — Repository는 Domain에 인터페이스를 정의하고 Infrastructure에 JPA 구현체를 두었습니다. Application Layer의 Facade는 여러 도메인 서비스를 조합하는 유스케이스를 담당하고, Domain Service는 단일 도메인 규칙을 담당하도록 나눴습니다.",
        "주문 설계 — 주문 요청의 상품 ID를 집계해 동일 상품 중복 요청을 합산한 뒤 재고 차감이 한 번만 일어나도록 설계했습니다. 멘토 리뷰에서 `product.decreaseStock`이 같은 productId에 여러 번 호출될 수 있는 위험을 지적받아, 요청 정규화와 재고 차감 위치를 분리하는 방향으로 개선했습니다.",
        "[Pull Request #129](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/129)",
        "[기술 블로그 — 상품·브랜드·주문](https://joodev-sandy.vercel.app/blog/4)",
      ] },
      { type: "code", title: "Week 3 4-Layer 패키지 책임", language: "text", code: "interfaces\n  - ProductV1Controller, OrderV1Controller, DTO\napplication\n  - ProductFacade, OrderFacade: use case orchestration + transaction boundary\ndomain\n  - Brand, Product, Order, OrderItem, Like\n  - ProductService, OrderService, Repository interfaces\ninfrastructure\n  - JpaRepository, RepositoryImpl, JPA converters" },

      { type: "text", heading: "Week 4 — 좋아요 / 쿠폰", body: [
        "구현 범위 — 주문 트랜잭션, 좋아요/쿠폰 동시성 제어, 재고 차감 정합성을 다뤘습니다. 좋아요는 `LikeFacade`에서 상품 row lock을 획득한 뒤 likeCount 증감과 Like 저장/삭제를 같은 트랜잭션으로 묶어, 상품 목록의 `likes_desc` 정렬 기준이 실제 좋아요 상태와 어긋나지 않도록 했습니다.",
        "쿠폰 처리 — 사용자-쿠폰 중복 사용은 애플리케이션 조회 후 판단만으로는 동시에 두 요청이 통과할 수 있어, 원자적 중복 체크가 가능한 Redis Set(SADD) 또는 DB Unique 제약을 방어선으로 고려했습니다. 핵심은 '조회 후 삽입'이 아니라 '삽입 시점에 중복을 막는 구조'였습니다.",
        "검증 — 동시 요청에서 좋아요 수가 음수/중복 증가하지 않는지, 쿠폰이 한 사용자에게 두 번 적용되지 않는지, 주문 실패 시 재고와 쿠폰 상태가 남지 않는지 테스트했습니다.",
        "[Pull Request #164](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/164)",
        "[기술 블로그 — 좋아요·쿠폰](https://joodev-sandy.vercel.app/blog/like)",
      ] },
      { type: "code", title: "Week 4 좋아요 정합성 흐름", language: "mermaid", code: "sequenceDiagram\n    participant Client\n    participant Facade as LikeFacade\n    participant ProductRepo\n    participant LikeRepo\n    participant DB\n\n    Client->>Facade: POST /likes(productId)\n    Facade->>ProductRepo: getProductWithLock(productId)\n    ProductRepo->>DB: SELECT ... FOR UPDATE\n    Facade->>LikeRepo: existsByUserIdAndProductId(userId, productId)\n    alt not liked\n        Facade->>Facade: product.increaseLikeCount()\n        Facade->>LikeRepo: save(like)\n    else already liked\n        Facade-->>Client: idempotent success\n    end" },

      { type: "text", heading: "Week 5 — Redis Cache", body: [
        "구현 범위 — 상품 목록 조회 성능 개선, 좋아요 수 정렬 구조 개선, Redis Cache 적용을 진행했습니다. PR 본문 기준으로 `ProductFacade`, `ProductV1Controller`, `ProductV1Dto`, `ProductInfo`를 추가하고, `GET /api/v1/products`, `GET /api/v1/products/{productId}`에서 페이징·브랜드 필터·정렬(`latest`, `likes_desc`)을 지원했습니다.",
        "성능 판단 — 기존 방식은 `brandId` 필터와 `likes_desc` 정렬을 동시에 사용할 때 likes 테이블 count aggregation 비용이 커지는 구조였습니다. `Product.likeCount`를 비정규화 컬럼으로 두고, `brandId`, `likeCount` 인덱스를 추가해 읽기 경로의 정렬 비용을 낮췄습니다.",
        "캐시 설계 — Redis `CacheManager`를 구성하고 TTL 5분, JSON 직렬화를 적용했습니다. 상품 단건 조회는 `@Cacheable`로 캐시하고, 좋아요/언라이크처럼 likeCount가 바뀌는 쓰기 경로에서는 `@CacheEvict`로 상품 캐시를 제거해 캐시 일관성을 유지했습니다.",
        "검증 — Product E2E 테스트에서 캐시 hit/miss, 좋아요 후 캐시 제거, 정렬 파라미터 검증, 필터링·페이징을 함께 확인했습니다.",
        "[Pull Request #216](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/216)",
        "[기술 블로그 — Redis Cache](https://joodev-sandy.vercel.app/blog/post-mmswqd6z)",
      ] },
      { type: "code", title: "Week 5 상품 단건 조회 캐시 흐름", language: "mermaid", code: "sequenceDiagram\n    participant Client\n    participant Controller as ProductV1Controller\n    participant Facade as ProductFacade\n    participant Redis as Redis Cache\n    participant Service as ProductService\n    participant DB\n\n    Client->>Controller: GET /api/v1/products/{id}\n    Controller->>Facade: getProduct(productId)\n    Facade->>Redis: cache lookup\n    alt cache hit\n        Redis-->>Facade: ProductInfo\n    else cache miss\n        Facade->>Service: getProductById(productId)\n        Service->>DB: SELECT product\n        DB-->>Service: Product\n        Facade->>Redis: cache store (TTL 5m)\n    end\n    Facade-->>Controller: ProductInfo" },

      { type: "text", heading: "Week 6 — 결제 / PG 연동", body: [
        "구현 범위 — 외부 PG 연동에서 발생할 수 있는 지연, 장애, 응답 유실을 시스템 내부 상태로 흡수하는 Failure-Ready 결제 구조를 구현했습니다. `PaymentFacade`, `PaymentTransactionService`, `PaymentService`, PG Client, Callback API, Recovery Scheduler로 책임을 분리했습니다.",
        "상태 모델 — 결제 요청 후 결과를 즉시 확정할 수 없으면 `PENDING`으로 저장하고, PG callback 또는 scheduler 재조회가 최종 상태를 확정합니다. 이미 `PAID` 또는 `FAILED`가 된 결제에 callback이 다시 들어오면 상태를 바꾸지 않는 멱등 흐름으로 처리했습니다.",
        "복구 설계 — `PaymentRecoveryScheduler`가 60초 간격으로 오래된 PENDING 결제를 조회하고, `pgTransactionId`가 있으면 PG 상태를 재조회합니다. 실패 응답 또는 abandoned payment는 `failPaymentWithCompensation`을 호출해 결제 실패 저장, 주문 취소, 재고/쿠폰 원복을 한 흐름으로 묶었습니다.",
        "검증 — PG timeout, callback success/failure, 중복 callback, scheduler 재조회, abandoned payment, 보상 트랜잭션이 실패 없이 다음 payment 처리를 계속하는지 확인했습니다.",
        "[Pull Request #237](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/237)",
        "[기술 블로그 — 결제·PG 연동](https://joodev-sandy.vercel.app/blog/post-mmsvj2bz)",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/payment-recovery-flow.svg", caption: "Week 6 결제 복구 구조 — PENDING을 중심으로 Callback과 Scheduler가 같은 상태 전이 규칙을 공유" },

      { type: "text", heading: "Week 7 — Kafka / Transactional Outbox", body: [
        "구현 범위 — 기존 동기 기반 주문-쿠폰-집계 구조를 이벤트 기반 아키텍처로 전환했습니다. 먼저 `ApplicationEvent`로 내부 경계를 분리하고, 그 다음 Outbox 저장소, Relay, Kafka Producer/Consumer, EventHandled 멱등 저장소를 단계적으로 붙였습니다.",
        "핵심 판단 — Kafka를 바로 발행하지 않고, 비즈니스 트랜잭션 안에서는 'Kafka로 보낸다'가 아니라 '보낼 이벤트를 Outbox에 저장한다'를 책임으로 삼았습니다. 주문 데이터 저장 성공 후 Kafka 발행 실패로 이벤트가 사라지는 위험을 제거하기 위한 선택입니다.",
        "Consumer 안정성 — Kafka는 at-least-once 전달을 전제로 보고 `EventHandled` 저장소로 중복 소비를 방어했습니다. Producer는 `acks=all`, `enable.idempotence=true`, Consumer는 manual ack를 적용해 처리 완료 시점과 offset commit 시점을 맞췄습니다.",
        "확장 적용 — 선착순 쿠폰 발급도 API 직접 처리 대신 요청 저장 → Outbox → Kafka → CouponConsumer 처리 → polling 조회 구조로 바꿔, 동시성 제어 지점을 Consumer 한 곳으로 모았습니다.",
        "[Pull Request #293](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/293)",
        "[기술 블로그 — Kafka](https://joodev-sandy.vercel.app/blog/kafka)",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/outbox-kafka-flow.svg", caption: "Week 7 Outbox/Kafka 구조 — 트랜잭션 경계, 메시지 정합성, 멱등 소비를 분리" },

      { type: "text", heading: "Week 8 — Redis Queue / Lua", body: [
        "구현 범위 — 블랙프라이데이처럼 주문 API로 트래픽이 폭증하는 상황을 막기 위해 Redis Sorted Set 기반 주문 대기열을 구현했습니다. `ZADD NX`로 중복 진입을 막고, timestamp score로 FIFO를 보장하며, `ZRANK`로 O(log N) 순번 조회를 제공했습니다.",
        "API 흐름 — 사용자는 `POST /queue/enter`로 대기열에 들어가고, `GET /queue/position`을 polling해 `WAITING` 또는 `READY + token` 상태를 받습니다. 토큰이 있어야 `POST /orders`에 진입할 수 있으며, 취소 API는 토큰 검증 대상에서 제외했습니다.",
        "처리량 제어 — `OrderQueueScheduler`가 `fixedDelay = 1000`으로 BATCH_SIZE만큼만 dequeue하여 입장 토큰을 발급합니다. 유입 속도와 DB 처리 속도를 분리해 HikariCP 전체 고갈과 연쇄 장애를 막는 구조입니다.",
        "Lua 개선 — Java loop로 `ZPOPMIN` 후 `SET token`을 실행하면 서버 크래시 시 사용자가 대기열에서도 사라지고 토큰도 없는 유실 상태가 생깁니다. Lua Script로 `ZPOPMIN N + SET token EX`를 Redis 내부에서 원자적으로 처리해 이 결함을 제거했습니다.",
        "검증 — 동시 100명에서 2,000명까지 진입 테스트, BATCH_SIZE 초과 처리량 테스트, TTL 만료 후 403 테스트, 주문 실패 시 token 유지(validate/consume 분리) 테스트를 수행했습니다.",
        "[Pull Request #335](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/335)",
        "[기술 블로그 — Redis Queue·Lua](https://joodev-sandy.vercel.app/blog/lua)",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/queue-token-flow.svg", caption: "Week 8 대기열 구조 — Queue(buffer), Scheduler(valve), Token(gate)로 DB 진입 속도 제어" },

      { type: "text", heading: "Week 9 — Kafka Ranking / Redis Sorted Set", body: [
        "구현 범위 — Week 7에서 구축한 유저 행동 이벤트 파이프라인을 Redis ZSET 기반 실시간 상품 랭킹으로 연결했습니다. 조회/좋아요/주문 이벤트를 Kafka Consumer가 수신하고, `RankingScorePolicy`가 점수를 계산해 `RankingRedisRepository`가 ZSET에 반영합니다.",
        "ZINCRBY 선택 — `ZADD`로 덮어쓰기 방식은 `ZSCORE → 계산 → ZADD` 사이에 Lost Update가 발생할 수 있어, 점수 증가를 단일 명령으로 처리하는 `ZINCRBY`를 선택했습니다.",
        "점수 정책 — 단순 count가 아니라 행동의 의미를 반영했습니다. VIEW는 약한 관심 신호, LIKE는 선호 표현, ORDER는 구매 전환으로 보고 각각 다른 가중치를 부여해 조회 수가 높은 상품만 랭킹을 지배하지 않도록 설계했습니다.",
        "일별 키와 Carry-Over — `rank:all:yyyyMMdd` 형태의 일별 key로 오늘/어제 랭킹을 분리하고 TTL을 적용했습니다. 자정 직후 랭킹이 비어 보이는 Cold Start를 줄이기 위해 전날 점수 일부를 `ZUNIONSTORE`로 오늘 랭킹에 10% 가중 이월했습니다.",
        "API — `GET /api/v1/rankings`로 Top-N, `GET /api/v1/rankings/products/{productId}`로 개별 상품 rank + score를 제공하고, RankingFacade에서 Redis rank 결과와 Product 상세 정보를 조합했습니다.",
        "[Pull Request #373](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/373)",
        "[기술 블로그 — Kafka Ranking·Redis ZSet](https://joodev-sandy.vercel.app/blog/kafka-redis-zset)",
      ] },
      { type: "code", title: "Week 9 랭킹 이벤트 처리", language: "text", code: "Kafka UserActionEvent\n  -> RankingKafkaConsumer\n  -> RankingScorePolicy\n       VIEW  = weak interest signal\n       LIKE  = explicit preference signal\n       ORDER = purchase conversion signal\n  -> Redis ZSET ZINCRBY rank:all:yyyyMMdd productId score\n  -> Ranking API ZREVRANGE / ZREVRANK / ZSCORE" },

      { type: "text", heading: "Week 10 — Spring Batch / Metrics / Ranking Aggregation", body: [
        "구현 범위 — Redis 기반 실시간 랭킹을 일간 스냅샷, 주간/월간 집계, 조회 전용 테이블(MV), period 기반 API 조회까지 이어지는 랭킹 데이터 파이프라인으로 확장했습니다.",
        "Daily Metrics Snapshot — Redis 또는 이벤트 기반으로 누적된 상품 지표를 `product_metrics` 일별 스냅샷으로 저장합니다. 같은 날짜 재실행 시 기존 metric_date 데이터를 삭제 후 다시 저장하도록 설계해 배치 재실행 멱등성을 확보했습니다.",
        "Rank Aggregation Job — Spring Batch의 Reader → Processor → Writer 구조로 일간 메트릭을 읽고, 주간/월간 기준 점수를 계산해 `mv_product_rank_weekly`, `mv_product_rank_monthly` 같은 조회 전용 테이블에 TOP-N 형태로 저장했습니다.",
        "운영 이슈 대응 — PR 리뷰에서 chunk 단위 writer가 rank offset을 매번 0으로 시작하면 chunk 간 ranking이 중복될 수 있다는 지적이 있었고, 누적 counter를 유지해야 함을 확인했습니다. 또한 bulk DELETE 후 영속성 컨텍스트가 오염될 수 있어 `@Modifying(clearAutomatically = true, flushAutomatically = true)` 같은 동기화 옵션이 필요하다는 점을 학습했습니다.",
        "API — Ranking API는 period가 TODAY면 Redis 실시간 랭킹을, WEEK/MONTH면 배치가 만든 조회 전용 테이블을 조회하도록 분리했습니다. 실시간성과 정확 집계를 같은 API 계약 안에서 제공하는 구조입니다.",
        "[Pull Request #420](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/420)",
        "[기술 블로그 — Spring Batch·Metrics](https://joodev-sandy.vercel.app/blog/post-mo8jxik7)",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/ranking-batch-flow.svg", caption: "Week 10 랭킹 배치 구조 — 실시간 Redis 랭킹과 일/주/월 조회 모델을 분리해 API에서 period별로 선택" },
    ],
  },
  awsDeepRacer: {
    media: undefined,
    gallery: [],
    attachments: [],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "강화학습 기반 자율주행 경진대회", body: [
        "AWS DeepRacer 기반 머신러닝 교육을 통해 강화학습, 보상 함수 설계, 모델 학습 구조를 학습하고 대회에 참가했습니다. 이론으로만 접했던 강화학습을 실제 시뮬레이션 환경에서 실험하고, 성능을 정량적으로 개선하는 경험을 쌓고자 참가했습니다.",
      ] },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "보상 함수와 하이퍼파라미터 설계", body: [
        "자율주행 모델 개발을 위해 보상 함수를 직접 설계하고 하이퍼파라미터를 조정하며 성능 개선을 반복했습니다. 트랙 중앙 유지, 속도 최적화, 코너 감속 등 다양한 보상 전략을 실험하며 최적의 조합을 탐색했습니다.",
      ] },
      { type: "code", title: "보상 함수 설계 예시", language: "python", code: "def reward_function(params):\n    track_width = params['track_width']\n    distance_from_center = params['distance_from_center']\n    speed = params['speed']\n    \n    # 트랙 중앙 유지 보상\n    marker = track_width * 0.25\n    if distance_from_center <= marker:\n        reward = 1.0\n    elif distance_from_center <= track_width * 0.5:\n        reward = 0.5\n    else:\n        reward = 1e-3\n    \n    # 속도 보너스\n    if speed > 2.0:\n        reward *= 1.5\n    \n    return float(reward)" },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "반복 학습과 시뮬레이션", body: [
        "다양한 트랙 환경에서 반복 학습과 시뮬레이션을 수행해 주행 안정성과 lap time을 지속적으로 최적화했습니다. 학습 로그와 결과 데이터를 분석해 성능을 정량적으로 평가하고 개선 방향을 도출했습니다.",
      ] },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "로그 분석 기반 성능 개선", body: [
        "학습 로그에서 보상 누적 그래프, 랩 타임 추이, 코스 이탈 지점을 분석해 보상 함수의 약점을 파악하고 수정했습니다. 과적합으로 특정 트랙에서만 성능이 높아지는 문제를 발견하고, 다양한 트랙 조건에서 학습하는 일반화 전략을 적용했습니다.",
      ] },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "AWS DeepRacer 대회 1위 달성", body: [
        "강화학습 모델 최적화를 통해 AWS DeepRacer 경진대회에서 최종 1위를 달성했습니다. 보상 함수 설계 → 하이퍼파라미터 튜닝 → 로그 분석 → 모델 개선의 사이클을 반복하며 강화학습의 실전 적용 역량을 확보했습니다.",
      ] },
    ],
  },
  qaMinjooHelper: {
    media: undefined,
    gallery: [],
    attachments: [],
    contentBlocks: [
      // ── 01 ──
      { type: "section-heading", title: "01 — 프로젝트를 시작한 이유" },
      { type: "text", heading: "QA 업무 중 TC 수정 관리의 비효율", body: [
        "QA 실무에서 테스트 중 발생하는 수정/추가/삭제 요청을 실시간으로 기록하고 관리하는 도구가 부족했습니다. 기존에는 메모장이나 슬랙 메시지에 흩어져 있던 수정 이력을 구조화하고, 팀원과 공유 가능한 형태로 정리하기 위해 직접 도구를 만들기로 했습니다.",
      ] },

      // ── 02 ──
      { type: "section-heading", title: "02 — 설계 목표와 기술 구조" },
      { type: "text", heading: "실시간 동기화와 상태 관리", body: [
        "Supabase를 활용한 실시간 데이터 동기화로 팀원 간 수정 이력 공유 가능한 구조를 구현했습니다. Zustand 기반 상태 관리로 복잡한 TC 수정 이력의 필터링, 정렬, 검색 기능을 구현하고 Vercel에 배포해 팀원 누구나 접근 가능한 웹 기반 도구로 운영했습니다.",
      ] },
      { type: "code", title: "Zustand 상태 관리 구조", language: "typescript", code: "// TC 수정 이력 상태 관리\nconst useTCStore = create<TCState>((set) => ({\n  items: [],\n  filter: 'all',\n  addItem: (item) => set((s) => ({\n    items: [...s.items, { ...item, id: nanoid(), createdAt: new Date() }]\n  })),\n  setFilter: (filter) => set({ filter }),\n  getFiltered: () => {\n    // 카테고리별 필터링 + 정렬\n  },\n}));" },

      // ── 03 ──
      { type: "section-heading", title: "03 — 주요 기능 구현" },
      { type: "text", heading: "카테고리 자동 분류와 요약 리포트", body: [
        "수정 요청 사항을 카테고리별(수정/추가/삭제)로 자동 분류하고, 요약 리포트를 생성하는 기능으로 커뮤니케이션 비용을 절감했습니다. TC 수정 이력을 시간순으로 관리하고 검색·필터 기능을 제공해 이전 수정 내역을 빠르게 추적할 수 있도록 했습니다.",
      ] },

      // ── 04 ──
      { type: "section-heading", title: "04 — 문제 해결 / 트러블슈팅" },
      { type: "text", heading: "실시간 동기화와 데이터 충돌 대응", body: [
        "여러 팀원이 동시에 수정 이력을 추가할 때 발생할 수 있는 데이터 충돌을 Supabase의 실시간 구독(Realtime)과 낙관적 업데이트를 조합해 해결했습니다. Vercel 배포 환경에서 Supabase 연결 안정성을 확보하기 위해 재연결 로직과 에러 핸들링을 구현했습니다.",
      ] },

      // ── 05 ──
      { type: "section-heading", title: "05 — 주요 성과" },
      { type: "text", heading: "QA 업무 효율화 도구 완성", body: [
        "테스트 중 수정/추가/삭제 이력 기록 및 팀원 간 공유 가능한 요약 자동 정리 기능을 완성했습니다. QA 실무에서 발생하는 비효율을 직접 발견하고, 문제 해결을 위한 도구를 기획부터 배포까지 단독으로 구현한 경험을 쌓았습니다.",
      ] },
    ],
  },
} as const;
