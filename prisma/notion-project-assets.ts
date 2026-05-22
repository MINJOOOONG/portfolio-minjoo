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
      { type: "point-cards", items: [
        { title: "AI Agent 협업 개발", body: "기획, 설계, 구현, 디버깅 과정에서 AI Agent를 적극 활용하고 결과를 직접 검증하는 워크플로우를 경험" },
        { title: "풀스택 구조 경험", body: "Next.js 프론트엔드, DB 기반 CMS, Python FastAPI 기반 RAG 검색 흐름을 하나의 프로젝트로 연결" },
        { title: "사용자 중심 검증", body: "디자인 결과를 그대로 수용하지 않고, 실제 화면과 탐색 흐름을 QA 관점에서 반복 검토" },
      ] },

      // ── 섹션 2: 디자인 규칙 ──
      { type: "section-heading", title: "02 — 디자인 규칙" },
      { type: "design-rules", image: "/images/projects/portfolio-website/02-about.png", rules: [
        { title: "전체 디자인 기준은 design.md에 먼저 정의한다", body: "포트폴리오의 색상, 여백, 타이포그래피, 버튼, 카드, 모션 규칙을 코드로 바로 만들기 전에 design.md에 먼저 정리했습니다. Claude Code와 협업할 때도 이 문서를 기준으로 수정 범위를 맞춰, 섹션마다 디자인이 따로 노는 문제를 줄였습니다." },
        { title: "섹션별 디자인 문서를 분리한다", body: "About, Experience, Projects, AI Lab, Articles, Skills, Contact처럼 성격이 다른 섹션은 하나의 규칙으로만 처리하지 않고, 각 섹션별 md 파일을 만들어 목적과 레이아웃을 따로 정리했습니다. 이를 통해 About은 자기소개 중심, Projects는 성과와 구현 중심, AI Lab은 실험과 기록 중심으로 다른 읽기 흐름을 갖도록 설계했습니다." },
        { title: "공통 컴포넌트는 유지하되 표현 방식은 섹션마다 다르게 둔다", body: "버튼, 뱃지, 제목, 구분선, 모달 같은 기본 UI 요소는 공통 스타일을 유지하지만, 각 섹션의 목적에 따라 배치와 강조 방식은 다르게 적용했습니다. 같은 디자인 시스템 안에서도 모든 화면이 똑같이 보이지 않도록 조정했습니다." },
        { title: "인터랙션은 디자인 문서의 규칙 안에서만 확장한다", body: "커스텀 커서, PPT식 섹션 이동, hover 효과, 모달 전환은 단순 장식이 아니라 탐색을 돕는 기능으로 정의했습니다. 새로운 인터랙션을 추가할 때도 design.md의 모션 강도, 속도, 사용 조건을 기준으로 과한 효과가 되지 않게 조절했습니다." },
        { title: "수정은 감각이 아니라 기준으로 반복한다", body: "화면을 보며 마음에 들지 않는 부분을 즉흥적으로 고치는 대신, 디자인 문서와 섹션별 md를 기준으로 원인을 나눠 수정했습니다. 예를 들어 글 간격, 제목 위계, 뱃지 정렬, 내부 스크롤, 모달 레이아웃처럼 문제를 작은 단위로 분리해 반복 개선했습니다." },
      ] },

      // ── 섹션 3: 설계 목표와 아키텍처 ──
      { type: "section-heading", title: "03 — 설계 목표와 아키텍처" },
      { type: "text", body: [
        "이 프로젝트의 설계 목표는 포트폴리오를 단순한 소개 페이지가 아니라, 하나의 인터랙티브 기술 문서처럼 읽히게 만드는 것이었습니다. 전체 섹션은 PPT처럼 명확한 화면 단위로 이동하고, Projects와 AI Lab처럼 깊이 읽어야 하는 콘텐츠는 내부 스크롤 영역으로 분리했습니다. 이를 통해 사용자는 전체 흐름을 잃지 않으면서도 필요한 프로젝트 설명과 기술 구현 내용을 충분히 탐색할 수 있도록 설계했습니다.",
      ] },
      { type: "image", url: "/images/projects/portfolio/architecture-diagram.svg", caption: "3-레이어 아키텍처: Frontend → Data/CMS → AI/RAG" },
      { type: "text", body: [
        "프론트엔드는 Next.js App Router + TypeScript 기반입니다. 섹션 구조가 명확한 포트폴리오 특성상, 서버 컴포넌트와 클라이언트 컴포넌트를 분리하기 쉬운 App Router가 적합했습니다. 프로젝트 목록이나 사이트 설정처럼 DB에서 가져오는 데이터는 React Server Component로 처리하고, Three.js 배경·커스텀 커서·애니메이션은 Client Component로 분리해 초기 로딩과 인터랙션을 동시에 확보했습니다.",
        "인터랙션은 Three.js(React Three Fiber), Framer Motion, GSAP을 조합했습니다. 3D 배경은 섹션 전환에 따라 도형 밀도와 회전 속도가 변해야 했기 때문에 React 상태와 연동 가능한 R3F를 선택했고, 모달·섹션 등장 같은 상태 기반 전환은 Framer Motion으로, 커서 추적처럼 프레임 단위 정밀 제어가 필요한 부분은 GSAP으로 나눠 처리했습니다.",
        "데이터는 Prisma ORM + Neon PostgreSQL(서버리스)로 관리합니다. 포트폴리오 텍스트와 프로젝트 정보를 코드에 하드코딩하지 않고 DB로 분리해, Admin 페이지에서 코드 배포 없이 수정할 수 있는 CMS 구조를 만들었습니다. Prisma는 TypeScript 타입 자동 생성이 강점이라 Next.js와 궁합이 좋았고, Neon은 서버리스 환경에서 cold start가 빨라 Vercel 배포와 잘 맞았습니다.",
        "RAG는 Python FastAPI 서버로 분리했습니다. 문서 로딩·임베딩·벡터 검색·LLM 응답 생성까지의 파이프라인이 Python 생태계(LangChain, sentence-transformers, FAISS)에 의존하기 때문에 Node.js가 아닌 별도 서버로 구성했습니다. FAISS는 외부 인프라 없이 로컬 벡터 검색이 가능해 비용 부담이 없었고, Groq API는 Llama 3.1 기반으로 응답 속도가 빨라 실시간 Q&A에 적합했습니다. Next.js API Route는 프론트엔드와 RAG 서버 사이의 프록시 역할만 담당합니다.",
        "결과적으로 프론트엔드(Next.js), 데이터(Prisma/Neon), AI(FastAPI/FAISS/Groq) 세 레이어가 독립적으로 동작하는 구조입니다. 각 레이어를 별도로 수정하거나 확장할 수 있어, 포트폴리오 규모가 커져도 유지보수가 어렵지 않도록 설계했습니다.",
      ] },

      // ── 섹션 4: 주요 기능 ──
      { type: "section-heading", title: "04 — 주요 기능" },

      { type: "feature-block", title: "4-1. 섹션 단위 내비게이션", body: [
        "About, Experience, Projects, AI Lab, Articles, Skills, Contact를 각각 하나의 화면 단위로 구성했습니다.",
        "상단 메뉴와 좌우 버튼으로 섹션을 명확히 이동할 수 있게 만들고, 현재 위치는 슬라이드 인디케이터로 확인할 수 있게 했습니다.",
        "Projects와 AI Lab처럼 내용이 긴 섹션은 내부 스크롤 영역으로 분리해, 전체 섹션 이동과 콘텐츠 스크롤이 충돌하지 않도록 처리했습니다.",
      ] },

      { type: "feature-block", title: "4-2. 프로젝트 상세 모달", body: [
        "프로젝트 카드는 목록에서 핵심 정보만 보여주고, 클릭하면 상세 모달에서 개발 과정과 구현 내용을 깊게 읽을 수 있게 했습니다.",
        "모달 본문은 contentBlocks 기반으로 렌더링해 text, image, video, pdf, code, tech-grid, rag-pipeline 같은 콘텐츠 타입을 확장할 수 있습니다.",
        "모달이 열렸을 때는 배경 스크롤을 잠그고, 본문만 독립적으로 스크롤되도록 분리해 탐색 흐름이 흔들리지 않게 했습니다.",
      ] },

      { type: "feature-block", title: "4-3. Three.js 3D 배경", body: [
        "포트폴리오 페이지 배경에 와이어프레임 도형과 파티클을 배치해, 정적인 이력서 페이지보다 깊이감 있는 화면을 만들었습니다.",
        "현재 활성 섹션에 따라 도형의 밀도, 회전 속도, 파티클 투명도가 달라지도록 구성해 섹션 전환에 반응하는 배경을 구현했습니다.",
        "Three.js는 브라우저 객체에 의존하므로 dynamic import와 ssr: false를 적용해 클라이언트에서만 렌더링되도록 분리했습니다.",
      ] },

      { type: "feature-block", title: "4-4. 커스텀 커서", body: [
        "기본 커서 대신 사이트 분위기에 맞춘 커스텀 커서를 적용해, 사용자가 어떤 요소와 상호작용 중인지 더 분명하게 느낄 수 있게 했습니다.",
        "버튼, 네비게이션, 프로젝트 카드처럼 역할이 다른 요소는 data-cursor 속성으로 커서 모드를 다르게 전환했습니다.",
        "모바일 터치 환경과 reduced-motion 설정에서는 커서 효과를 비활성화해 불필요한 모션 부담을 줄였습니다.",
      ] },

      { type: "feature-block", title: "4-5. About hover 설명 인터랙션", body: [
        "About 섹션은 긴 자기소개를 한 번에 보여주기보다, 핵심 문장과 키워드를 먼저 읽게 만드는 방식으로 구성했습니다.",
        "사용자가 특정 키워드에 hover, click, focus하면 보조 설명이 나타나도록 만들어 관심 있는 정보만 선택적으로 확인할 수 있게 했습니다.",
        "툴팁은 뷰포트 위치에 따라 위아래 배치가 바뀌고, Enter, Space, Escape 키로도 조작할 수 있게 했습니다.",
      ] },

      { type: "feature-block", title: "4-6. AI Lab 콘텐츠 설계", body: [
        "AI Lab은 AI 관련 링크를 모아두는 영역이 아니라, 학습한 자료와 개인적인 해석을 함께 기록하는 연구 노트처럼 설계했습니다.",
        "Principles, Practices, Prompting, AI Tools, Media Notes로 카테고리를 나눠 원칙, 실험, 도구 사용 경험을 분리했습니다.",
        "AI Tools와 Media Notes는 사용 목적, 장점, 한계, 적용 경험을 함께 보여주도록 구성해 단순한 도구 목록보다 맥락이 드러나게 했습니다.",
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

      // ── 섹션 7: 배운 점과 다음 개선 방향 ──
      { type: "section-heading", title: "07 — 배운 점과 다음 개선 방향" },
      { type: "text", body: [
        "AI Agent 협업 개발: Claude Code와 대화하며 설계 → 구현 → 디버깅을 반복하는 과정에서, 프롬프트를 잘 설계하면 복잡한 컴포넌트도 빠르게 구현할 수 있다는 것을 경험했습니다. 다만 AI가 생성한 코드를 그대로 사용하는 것이 아니라, 의도를 이해하고 검증하는 과정이 핵심이라는 점도 체감했습니다.",
        "풀스택 구조 설계: 프론트엔드(Next.js) + DB(Prisma/Neon) + RAG 백엔드(Python/FastAPI)를 하나의 프로젝트에서 설계하면서, 각 레이어의 책임 분리와 연동 인터페이스 설계 역량을 쌓았습니다.",
        "인터랙션 엔지니어링: Three.js 3D 렌더링, Framer Motion 스프링 물리, 커스텀 커서 구현 등 순수 기술적 도전을 통해 프론트엔드 인터랙션 구현의 깊이를 경험했습니다.",
      ] },
      { type: "text", body: [
        "향후 개선 방향으로는 ISR/SSG 전환을 통한 성능 최적화, 영문 포트폴리오 버전(i18n) 추가, 키보드 내비게이션과 스크린 리더 지원을 포함한 접근성 강화, 그리고 RAG 파이프라인의 청크 전략 개선과 멀티턴 대화 지원을 계획하고 있습니다.",
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
      { type: "text", heading: "프로젝트 배경", body: [
        "Velog, Tistory 등 기존 블로그 플랫폼에서는 코드 블록 커스터마이징, 레이아웃 자유도, 콘텐츠 소유권에 한계가 있었습니다.",
        "부트캠프에서 매주 작성하는 기술 회고와 학습 기록을 내가 원하는 형태로 쓰고, 내 DB에서 관리하고 싶어 직접 블로그를 만들기로 결정했습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/01-home.png", caption: "JooDev 홈 — 픽셀 아트 고양이 캐릭터와 다크 테마 기반 랜딩" },
      { type: "text", heading: "SSR 기반 아키텍처", body: [
        "Next.js App Router와 React Server Component를 적용해 글 목록(Explore), 상세 페이지 등 데이터 의존 페이지는 서버에서 렌더링하고, 에디터와 인터랙션 요소만 클라이언트 컴포넌트로 분리했습니다.",
        "페이지별로 필요한 데이터만 서버에서 fetch해 클라이언트 번들 크기를 줄이고, React Query 없이도 빠른 초기 로딩을 달성했습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/02-explore.png", caption: "Explore 페이지 — Backend, QA, Daily 등 카테고리별 글 목록과 태그 필터" },
      { type: "text", heading: "다양한 콘텐츠 지원", body: [
        "기술 글뿐 아니라 AI 도구(Suno, Gemini, Capcut)를 활용해 노래를 만들고 뮤직비디오를 제작한 경험, MCP와 Playwright를 결합한 QA 자동화 실험 등 다양한 주제의 콘텐츠를 작성하고 있습니다.",
        "각 포스트마다 고유한 픽셀 아트 커버 이미지를 적용해 글 목록에서의 시각적 구별과 브랜딩을 강화했습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/06-post-ai-music.png", caption: "AI와 노래 만들기 — Suno, Gemini, Capcut을 활용한 음악 제작 과정" },
      { type: "image", url: "/images/projects/joodev-blog/07-post-mcp.png", caption: "MCP + Playwright — QA 자동화 도구 연동 실험" },
      { type: "text", heading: "TipTap 에디터 기반 글 작성 환경", body: [
        "TipTap 에디터를 커스터마이징해 Syntax-highlighted 코드 블록, Mermaid 다이어그램, blockquote 인용, 접기/펼치기 토글 등 기술 문서에 필요한 기능을 구현했습니다.",
        "Vercel Blob을 활용해 서버리스 환경에서도 이미지 드래그&드롭 업로드가 안정적으로 동작하는 파일 관리 파이프라인을 구축했습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/04-post-tdd.png", caption: "TDD 포스트 — 코드 블록, 인용, 볼드 강조 등 리치 텍스트 렌더링" },
      { type: "image", url: "/images/projects/joodev-blog/05-post-kafka.png", caption: "Kafka 포스트 — 이벤트 아키텍처와 트랜잭션 경계를 분석한 기술 글" },
      { type: "text", heading: "관리자 인증 및 Admin 기능", body: [
        "httpOnly 쿠키 기반 관리자 인증 시스템을 구현해 로그인/로그아웃 기능을 제공하고, 비인가 접근 시 로그인 페이지로 리다이렉트합니다.",
        "Admin 페이지에서 게시글 CRUD, 공개/비공개 전환, 태그 관리, 이미지 라이브러리를 제공해 브라우저에서 바로 글을 작성하고 배포할 수 있습니다.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/09-admin-editor.png", caption: "관리자 로그인 — 비밀번호 기반 인증 후 에디터 접근" },
      { type: "text", heading: "데이터 모델 설계", body: [
        "Prisma와 PostgreSQL로 게시글(Post), 태그(Tag), 카테고리를 정규화된 스키마로 설계해 콘텐츠 확장이 용이한 구조를 만들었습니다.",
        "현재 Backend, QA, Daily 등 카테고리에 14개 이상의 글이 작성되어 있으며, 부트캠프 과정의 주차별 학습 기록을 지속적으로 업데이트하고 있습니다.",
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
      { type: "text", heading: "프로젝트 배경", body: [
        "일상 속 사회 문제를 기술로 개선할 수 있는 제품을 직접 만들어보자는 목표로 시작한 팀 프로젝트입니다.",
        "여러 아이디어 중에서 문제의 심각성, 실제 사용자 상황, 제한된 장비로 구현 가능한지를 기준으로 최종 아이템을 선정했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/02-image-2e661fd0.jpg", caption: "Arduino 기반 프로토타입 제작 과정" },
      { type: "text", heading: "하드웨어-소프트웨어 연동", body: [
        "Arduino 보드의 센서(초음파, 적외선 등) 입력값을 Python 스크립트가 실시간으로 수신해 제품 동작 로직을 처리하는 구조를 설계했습니다.",
        "OpenCV를 활용해 카메라 입력을 프레임 단위로 분석하고, 객체 인식 결과에 따라 Arduino 출력(LED, 부저 등)을 제어하는 양방향 통신 흐름을 구현했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/03-image-2e661fd0.png", caption: "시스템 구성도 — 센서 입력 → Python 처리 → 출력 제어 흐름" },
      { type: "image", url: "/images/projects/notion/arduino-social-product/04-image-2e661fd0.png", caption: "OpenCV 기반 영상 인식 처리 화면" },
      { type: "text", heading: "팀 협업 및 설계 문서화", body: [
        "전체 동작 과정을 Flow chart로 시각화해 팀원 4명 각자의 구현 범위(하드웨어 조립, 센서 캘리브레이션, Python 로직, 테스트)를 명확히 분배했습니다.",
        "매주 진행 상황을 공유하며 센서 입력 오차, 인식률 저하 등 실제 테스트에서 발견된 문제를 함께 해결했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/05-image-2e661fd0.png", caption: "Flow chart 기반 동작 흐름 설계" },
      { type: "image", url: "/images/projects/notion/arduino-social-product/06-image-2e661fd0.png", caption: "최종 프로토타입 시연 모습" },
      { type: "text", heading: "배운 점", body: [
        "제한된 장비(Arduino Uno, 웹캠)와 2주라는 짧은 기간 안에서 완벽한 제품이 아닌 '검증 가능한 데모'를 만드는 것에 집중하는 법을 배웠습니다.",
        "소프트웨어만으로는 해결할 수 없는 물리적 제약(센서 정밀도, 배선 안정성)을 직접 경험하며 하드웨어-소프트웨어 통합 관점의 시야를 넓혔습니다.",
      ] },
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
      { type: "text", heading: "대회 배경", body: [
        "2024 K-HTML 대학대항전 해커톤에 한국외국어대학교 대표팀으로 참가했습니다.",
        "용인시 지역 사회문제 개선이라는 주제가 주어졌고, 현장에서 문제 정의부터 서비스 기획, UI 설계, 구현, 발표까지 제한 시간 내에 완료해야 하는 대회였습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/03-image-2e661fd0.png", caption: "해커톤 현장 — 팀 작업 모습" },
      { type: "text", heading: "UI/UX 설계 및 프론트엔드 구현", body: [
        "용인시 주민의 실제 불편 사항을 조사하고, 사용자 행동 흐름(문제 인식 → 정보 탐색 → 해결 요청)을 기반으로 화면 구조를 설계했습니다.",
        "HTML, CSS, JavaScript로 반응형 UI를 구현하고, 사용자 입력 폼과 결과 표시 화면 간의 자연스러운 전환을 설계했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/04-image-2e661fd0.png", caption: "서비스 화면 설계 — 사용자 입력 흐름" },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/05-image-2e661fd0.png", caption: "UI 구현 결과물" },
      { type: "text", heading: "Azure OpenAI 기반 AI 기능 연동", body: [
        "사용자가 입력한 문제 상황을 Azure OpenAI API로 전달하고, 맥락에 맞는 해결 방안을 생성형 AI가 제안하는 기능을 구현했습니다.",
        "프롬프트 엔지니어링을 통해 용인시 지역 맥락에 맞는 답변이 나오도록 시스템 프롬프트를 설계하고 반복 테스트했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/06-image-2e661fd0.png", caption: "AI 응답 기능 — 사용자 질문에 대한 동적 답변 생성" },
      { type: "video", url: "/images/projects/notion/k-html-hackathon/07-video-2e661fd0.mp4", caption: "서비스 시연 영상 — 전체 사용자 흐름 데모" },
      { type: "text", heading: "AWS 배포 및 서비스 통합", body: [
        "AWS EC2에 서비스를 배포하고, 프론트엔드 화면 → AI API 호출 → 결과 렌더링까지의 전체 데이터 흐름을 하나의 서비스로 통합했습니다.",
        "제한된 시간(48시간) 안에 동작하는 결과물을 만들기 위해 기능 범위를 최소화하고, 핵심 시나리오 중심으로 구현 우선순위를 정했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/08-image-2e661fd0.png", caption: "최종 발표 자료" },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/09-image-2e661fd0.png" },
      { type: "text", heading: "결과 및 배운 점", body: [
        "문제 정의 → UI 설계 → 구현 → 검증 과정을 짧은 주기로 반복하며, '완벽한 서비스'보다 '작동 가능한 MVP'를 만드는 판단력을 길렀습니다.",
        "팀원 간 역할 분배(프론트엔드, 백엔드, 발표)를 빠르게 결정하고 병렬로 작업해 시간 내에 완성하는 실전 협업을 경험했습니다.",
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
      { type: "text", heading: "프로젝트 배경", body: [
        "UNIST 스마트 해상물류 창업 오디션 8기에 참가해, 1년간 아이디어 기획부터 프로토타입 개발, 사업화 검증, 최종 발표까지 전 과정을 수행한 프로젝트입니다.",
        "PM 역할을 맡아 팀 'Crew'를 이끌며 해양 사고 예방 교육이라는 문제를 정의하고, VR 기반 시뮬레이션 솔루션을 제안했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/unist-startup-audition/03-image-2e661fd0.png", caption: "팀 Crew 활동 사진 — 프로토타입 시연 장면" },
      { type: "text", heading: "VR 시뮬레이션 프로토타입 개발", body: [
        "Unity 기반 VR 환경에서 해양 사고 상황(선박 충돌, 화재 대피 등)을 재현하고, 사용자가 직접 대응 절차를 체험할 수 있는 교육 콘텐츠를 설계했습니다.",
        "Arduino 기반 물리 컨트롤러(조이스틱, 버튼 패널)를 VR 환경과 연동해 실제 선박 조작에 가까운 체감형 인터페이스를 구현했습니다.",
        "사용자 테스트를 통해 VR 멀미 유발 구간, 조작 혼란 포인트 등을 발견하고 UI/UX를 반복 개선했습니다.",
      ] },
      { type: "text", heading: "사업화 검증 및 발표", body: [
        "시장 조사를 통해 해양 안전 교육 시장 규모와 기존 교육 방식의 한계(비용, 접근성, 현실감 부족)를 분석하고 VR 솔루션의 차별점을 정리했습니다.",
        "사업비 집행 계획서, 법인 설립(사업자등록), 투자 유치 발표 자료까지 작성하며 아이디어를 사업으로 구체화하는 전 과정을 경험했습니다.",
      ] },
      { type: "text", heading: "결과", body: [
        "UNIST 창업 오디션 최종 선정 및 1,000만 원 창업 지원금을 수주했습니다.",
        "기술적 아이디어만이 아니라, 시장성과 실행 가능성을 함께 증명해야 한다는 창업 관점의 사고방식을 배웠습니다.",
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
      { type: "text", heading: "프로젝트 배경", body: [
        "학교와 기업이 연계한 미니 산학 캡스톤 프로그램에 참여해, 클라우드 인프라와 생성형 AI를 결합한 서비스 아이디어를 기획하고 구현 실험을 진행한 프로젝트입니다.",
        "40시간 집중 교육 과정에서 AWS 클라우드 아키텍처(EC2, S3, Lambda)와 Microsoft Azure OpenAI 서비스의 활용 방법을 체계적으로 학습했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/02-image-2e661fd0.png", caption: "교육 과정 현장 — 클라우드 및 AI 실습" },
      { type: "text", heading: "기업 현장 탐방", body: [
        "마이크로소프트 코리아 본사를 방문해 Azure 기반 클라우드 서비스의 실제 운영 구조와 엔터프라이즈 AI 도입 사례를 접했습니다.",
        "구글 코리아 본사에서는 GCP 기반 머신러닝 파이프라인과 대규모 데이터 처리 인프라의 설계 철학을 직접 들으며 프로젝트 방향을 구체화했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/03-image-2e661fd0.png", caption: "마이크로소프트 코리아 본사 탐방" },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/04-image-2e661fd0.png", caption: "구글 코리아 본사 탐방" },
      { type: "text", heading: "서비스 아이디어 구현 실험", body: [
        "생성형 AI를 단순한 챗봇이 아닌 서비스 문제 해결 도구로 활용하기 위해, 사용자 입력 → AI 응답 생성 → 결과 검증의 3단계 흐름을 설계했습니다.",
        "AWS Lambda와 API Gateway를 활용해 서버리스 구조로 AI API 호출 파이프라인을 구축하고, 비용 효율적인 배포 방식을 실험했습니다.",
        "기능 구조를 작은 단위(입력 파싱, 프롬프트 구성, 응답 후처리)로 분리해 각 모듈을 독립적으로 테스트할 수 있는 구조를 만들었습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/05-image-2e661fd0.png", caption: "서비스 아키텍처 설계 다이어그램" },
      { type: "text", heading: "배운 점", body: [
        "AI를 '기능'으로만 보는 것이 아니라, 제품의 어떤 문제를 풀 수 있는지를 먼저 정의하고 그에 맞는 AI 활용 방식을 선택해야 한다는 관점을 쌓았습니다.",
        "클라우드 인프라 위에서 AI 서비스를 설계할 때 비용, 응답 속도, 확장성 사이의 트레이드오프를 실제로 고민하는 경험을 했습니다.",
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
      { type: "text", heading: "프로젝트 배경", body: [
        "Fall Guys의 파티 게임 감각을 참고해, 레고 파티클 콘셉트의 멀티플레이 미니게임을 Unreal Engine 5로 구현한 부트캠프 팀 프로젝트입니다.",
        "팀 내에서 UI/UX 파트를 담당했으며, C++과 UMG(Unreal Motion Graphics)를 활용해 게임 내 인터페이스 전반을 설계하고 구현했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/03-image-2e661fd0.png", caption: "게임 플레이 화면 — 레고 파티클 콘셉트" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/04-image-2e661fd0.png", caption: "멀티플레이 미니게임 장면" },
      { type: "text", heading: "게임 UI 시스템 설계", body: [
        "플레이어 머리 위 방향 화살표, 게임 시작 전 3-2-1 카운트다운, 라운드 결과 표시, 옵션 메뉴 등 실제 플레이에 필요한 전체 UI 시스템을 설계했습니다.",
        "UMG 위젯 블루프린트와 C++ 바인딩을 조합해 게임 상태(대기 → 플레이 → 결과) 변화에 맞춰 UI가 자동으로 전환되도록 이벤트 기반 구조를 구현했습니다.",
        "플레이어 수, 남은 시간, 점수 등의 실시간 데이터를 위젯에 바인딩해 게임 진행 중에도 정보가 즉각 갱신되도록 처리했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/05-image-2e661fd0.png", caption: "카운트다운 UI 구현" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/06-image-2e661fd0.png", caption: "플레이어 상태 표시 UI" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/07-image-2e661fd0.png", caption: "옵션 메뉴 UI" },
      { type: "text", heading: "버전 관리 및 팀 협업", body: [
        "Unreal 프로젝트 특성상 바이너리 에셋(.uasset, .umap)의 충돌 방지를 위해 SVN으로 에셋을 관리하고, 코드(.cpp, .h)는 Git으로 분리해 병행 운영했습니다.",
        "팀원 5명 간 작업 단위를 맵/캐릭터/UI/네트워크로 분배하고, 주 2회 머지 타임을 정해 통합 빌드를 검증하는 방식으로 충돌을 최소화했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/08-image-2e661fd0.png", caption: "라운드 진행 화면" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/09-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/10-image-2e661fd0.png" },
      { type: "text", heading: "UI 피드백 및 가독성 개선", body: [
        "폴가이즈류 파티 게임에서 중요한 '즉각적인 피드백'에 집중해, 점수 획득 시 팝업 애니메이션, 탈락 시 화면 흔들림 등 시각적 반응을 추가했습니다.",
        "밝은 파스텔 톤의 레고 맵 위에서도 UI가 명확히 보이도록 반투명 배경 패널, 아웃라인 텍스트, 대비 높은 색상 팔레트를 적용해 가독성을 개선했습니다.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/11-image-2e661fd0.png", caption: "UI 개선 전후 비교" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/12-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/13-image-2e661fd0.png" },
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
      { type: "text", heading: "연구 배경", body: [
        "게임 AI에서 가장 널리 쓰이는 두 가지 구조인 FSM(Finite State Machine)과 Behavior Tree의 실제 성능 차이를 정량적으로 비교한 졸업논문 프로젝트입니다.",
        "대부분의 게임 AI 교재에서 FSM은 단순하고 BT는 확장성이 좋다고 설명하지만, 실제 게임 환경에서 응답 속도, 메모리 사용량, 유지보수 비용이 어떻게 다른지 검증한 연구는 부족했습니다.",
      ] },
      { type: "text", heading: "실험 설계", body: [
        "Unity 엔진에서 동일한 AI 행동 로직(순찰 → 적 감지 → 추적 → 공격 → 회피)을 FSM과 BT 두 가지 구조로 각각 구현했습니다.",
        "공정한 비교를 위해 동일한 맵, 동일한 적 배치, 동일한 시나리오(1:1 전투, 다수 적 대응, 환경 변화 대응)에서 반복 테스트를 수행했습니다.",
        "변수 통제를 위해 애니메이션, 물리 연산 등 AI 외 요소는 동일 설정으로 고정했습니다.",
      ] },
      { type: "text", heading: "성능 측정 및 분석", body: [
        "Unity Profiler를 활용해 프레임당 AI 연산 시간, 상태 전환 지연, CPU 점유율, GC 할당량 등의 성능 지표를 수집했습니다.",
        "FSM은 상태 수가 적을 때 더 빠른 응답 속도를 보였지만, 상태가 10개를 넘으면 전환 조건의 복잡도가 급격히 증가해 유지보수가 어려워졌습니다.",
        "BT는 초기 설정 비용이 높지만, 노드 추가만으로 새로운 행동을 확장할 수 있어 복잡한 AI일수록 구조적 이점이 명확했습니다.",
      ] },
      { type: "text", heading: "결론 및 기여", body: [
        "단순한 AI(상태 5개 이하)에는 FSM이, 복잡하고 확장 가능성이 높은 AI에는 BT가 적합하다는 실험 기반의 선택 기준을 도출했습니다.",
        "논문을 영문으로도 번역해 작성하며, 학술적 글쓰기와 실험 설계 방법론을 익혔습니다.",
      ] },
      { type: "text", heading: "논문 원문", body: [
        "졸업논문 최종본, 제안서, 영문 번역본을 아래에서 확인할 수 있습니다.",
      ] },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/02-pdf-2e661fd0.pdf", title: "졸업논문 최종_안재현서민주.pdf" },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/03-pdf-2e661fd0.pdf", title: "졸업 논문 제안서.pdf" },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/04-file-33461fd0.pdf", title: "FSM_vs_BT_Thesis_English.pdf" },
    ],
  },
} as const;
