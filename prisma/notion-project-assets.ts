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
      // ── 1. 프로젝트 개요 ──
      { type: "text", heading: "프로젝트 개요", body: [
        "기존 Notion 기반 포트폴리오의 한계를 느끼고, 인터랙티브한 웹 포트폴리오를 직접 설계하고 개발한 프로젝트입니다. 단순한 정적 페이지가 아니라, 프로젝트 탐색·상세 모달·섹션 네비게이션·PDF 출력·RAG 기반 AI 검색까지 포함한 개인 포트폴리오 플랫폼을 목표로 했습니다.",
        "Next.js App Router와 React Server Component를 활용해 SSR로 초기 로딩을 최적화하면서도, Three.js 3D 배경·커스텀 커서·스크롤 애니메이션 등 클라이언트 인터랙션은 별도로 분리해 사용자 경험을 확보했습니다.",
        "Python 기반 RAG Assistant를 연동해 포트폴리오 문서(프로젝트, 경력, 스킬 등)를 검색하고, 근거 기반으로 답변하며, 답변과 관련된 포트폴리오 섹션으로 이동할 수 있는 AI Navigation 기능까지 구현했습니다.",
      ] },
      { type: "image", url: "/images/projects/portfolio-website/01-entry.png", caption: "진입 페이지 — 사원증 콘셉트의 인터랙티브 랜딩" },

      // ── 2. 프로젝트 구조 ──
      { type: "text", heading: "프로젝트 구조", body: [
        "프론트엔드는 Next.js App Router 기반으로, src/components/sections/ 아래에 Hero·About·Experience·Projects·Skills·Contact 등 섹션 컴포넌트를 배치하고, src/components/shared/ 에 레이아웃·네비게이션·3D 배경·커스텀 커서 등 공용 컴포넌트를 구성했습니다.",
        "데이터 계층은 Prisma ORM + Neon PostgreSQL(서버리스)로 프로젝트·경력·스킬·교육 등 모든 콘텐츠를 DB 기반으로 관리하며, Admin 페이지에서 실시간 CRUD가 가능한 CMS 구조를 설계했습니다. SiteSetting 테이블을 key-value 형태로 설계해 hero 문구, about 소개글 등 사이트 전반의 텍스트를 유연하게 관리합니다.",
        "RAG 백엔드는 rag-assistant/ 디렉토리에 Python FastAPI 서버로 분리했습니다. rag/ 모듈 아래 loader.py → chunker.py → embedder.py → retriever.py → chain.py 5단계 파이프라인으로 구성되며, api.py가 POST /ask 엔드포인트를 제공합니다.",
        "전체 데이터 흐름:\n사용자 → Next.js Portfolio UI → PortfolioAskBar 검색창\n→ Next.js API Route (/api/portfolio-assistant)\n→ Python FastAPI RAG Server (POST /ask)\n→ FAISS Retriever (유사 문서 검색)\n→ Groq LLM (답변 생성)\n→ answer + sources + recommended_section 반환\n→ 포트폴리오 화면에 답변 표시 + 관련 섹션 이동 버튼 제공",
      ] },
      { type: "image", url: "/images/projects/portfolio-website/02-about.png", caption: "About 섹션 — 좌측 마스터 메뉴 + 우측 디테일 콘텐츠 레이아웃" },

      // ── 3. 주요 기능 ──
      { type: "text", heading: "주요 기능", body: [
        "섹션 기반 포트폴리오 네비게이션: Lenis 스무스 스크롤과 IntersectionObserver 기반 섹션별 등장 애니메이션을 적용해 PPT 슬라이드를 넘기는 듯한 탐색 경험을 제공합니다. 좌측 Scene Navbar로 섹션 간 빠른 이동이 가능합니다.",
        "Projects 카드 및 상세 모달: 프로젝트 카드 클릭 시 상세 모달이 열리며, contentBlocks 구조로 텍스트·이미지·영상·PDF·첨부파일을 블로그 스타일로 자유롭게 구성할 수 있습니다. 키보드 네비게이션(화살표, Escape)도 지원합니다.",
        "PDF 출력 기능: @react-pdf/renderer를 활용해 DB에 저장된 포트폴리오 데이터를 실시간으로 PDF로 변환하고 다운로드할 수 있습니다.",
        "커스텀 커서 / 인터랙션: Framer Motion 기반의 커스텀 커서를 설계해 탄성 변형, 클릭 리플, 호버 시 라벨 표시, mix-blend-mode 반전 등 에디토리얼 스타일의 인터랙션을 구현했습니다.",
        "Three.js 3D 시각 요소: Three.js와 @react-three/fiber를 활용해 프로젝트 카드별로 고유한 3D 배경 씬을 렌더링하고, 마우스 움직임에 반응하는 패럴랙스 효과를 적용했습니다.",
        "PortfolioAskBar 검색창: 포트폴리오 상단에 AI 검색창을 배치하고, 질문 입력 → 답변 표시 → 참고 문서 뱃지 → 관련 섹션 이동 버튼까지 하나의 흐름으로 연결됩니다.",
        "Python 기반 RAG Assistant 연동: Next.js API Route가 Python FastAPI 서버를 호출하는 프록시 패턴으로, 프론트엔드와 RAG 백엔드의 관심사를 분리했습니다.",
        "AI Navigation: RAG 답변과 함께 질문/문서 키워드를 분석해 관련 포트폴리오 섹션(Experience, Projects, Skills 등)을 추천하고, 버튼 클릭으로 해당 섹션으로 스크롤 이동합니다.",
      ] },
      { type: "image", url: "/images/projects/portfolio-website/03-experience.png", caption: "경력 섹션 — 타임라인 기반 경력 카드" },
      { type: "image", url: "/images/projects/portfolio-website/04-projects.png", caption: "프로젝트 섹션 — 카드 그리드와 상세 모달" },

      // ── 4. RAG 파이프라인 핵심 코드 ──
      { type: "text", heading: "RAG 파이프라인 핵심 코드", body: [
        "RAG 파이프라인은 5개 모듈로 분리되어 있으며, 각 단계가 독립적으로 동작합니다.",

        "loader.py — 문서 로드: data/ 디렉토리의 마크다운 파일을 LangChain Document로 변환합니다.\n```python\ndef load_documents(data_dir: str = \"data\") -> list[Document]:\n    for md_file in sorted(Path(data_dir).glob(\"*.md\")):\n        content = md_file.read_text(encoding=\"utf-8\")\n        doc = Document(\n            page_content=content,\n            metadata={\"source\": md_file.name},\n        )\n        documents.append(doc)\n    return documents\n```",

        "chunker.py — 청크 분할: 마크다운 구조를 고려한 RecursiveCharacterTextSplitter로 500자 단위 청크를 생성합니다.\n```python\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=500, chunk_overlap=100,\n    separators=[\"\\n## \", \"\\n### \", \"\\n\\n\", \"\\n\", \" \"],\n)\nchunks = splitter.split_documents(documents)\n```",

        "embedder.py — 임베딩 + FAISS 저장: sentence-transformers 로컬 모델로 임베딩 후 FAISS 벡터스토어를 생성합니다.\n```python\ndef build_vectorstore(chunks: list[Document]) -> FAISS:\n    embeddings = HuggingFaceEmbeddings(\n        model_name=\"sentence-transformers/all-MiniLM-L6-v2\"\n    )\n    vectorstore = FAISS.from_documents(chunks, embeddings)\n    vectorstore.save_local(\"vectorstore\")\n    return vectorstore\n```",

        "retriever.py — 유사 문서 검색: 질문을 임베딩하여 상위 4개 관련 문서를 검색합니다.\n```python\ndef retrieve_documents(vectorstore, query, top_k=4):\n    return vectorstore.similarity_search(query, k=top_k)\n\ndef format_context(documents):\n    for i, doc in enumerate(documents, 1):\n        source = doc.metadata.get(\"source\", \"unknown\")\n        context_parts.append(f\"[문서 {i}] (출처: {source})\\n{doc.page_content}\")\n    return \"\\n\\n---\\n\\n\".join(context_parts)\n```",

        "chain.py — Groq LLM 답변 생성: 검색된 context와 질문을 기반으로 LLM 답변을 생성합니다.\n```python\ndef generate_answer(context: str, question: str) -> str:\n    llm = ChatGroq(\n        model=\"llama-3.1-8b-instant\",\n        temperature=0.2,\n    )\n    prompt = ChatPromptTemplate.from_messages([\n        (\"system\", SYSTEM_PROMPT),  # RAG grounding 규칙\n        (\"human\", \"{question}\"),\n    ])\n    chain = prompt | llm | StrOutputParser()\n    return chain.invoke({\"context\": context, \"question\": question})\n```",

        "api.py — POST /ask 엔드포인트: FastAPI 서버가 전체 파이프라인을 조합하고, 섹션 추천까지 포함해 응답합니다.\n```python\n@app.post(\"/ask\", response_model=AskResponse)\nasync def ask(req: AskRequest):\n    retrieved_docs = retrieve_documents(vectorstore, req.question)\n    context = format_context(retrieved_docs)\n    answer = generate_answer(context, req.question)\n    sources = get_source_list(retrieved_docs)\n    recommended = get_recommended_section(req.question, sources)\n    return AskResponse(\n        answer=answer, sources=sources,\n        recommended_section=recommended,\n    )\n```",
      ] },
      { type: "image", url: "/images/projects/portfolio-website/05-skills.png", caption: "기술 스택 섹션 — 카테고리별 뱃지 그리드" },

      // ── 5. Groq 선택 이유 ──
      { type: "text", heading: "기술 선택: Groq + 로컬 임베딩 + FAISS", body: [
        "LLM 응답 생성에는 Groq API를 사용했습니다. 포트폴리오 검색 기능은 사용자가 짧은 질문을 던지고 빠르게 답변을 확인하는 UX가 중요하기 때문에, 빠른 응답 속도와 가벼운 테스트 환경을 제공하는 Groq를 선택했습니다.",
        "Groq 모델은 Llama 계열 모델(llama-3.1-8b-instant)을 사용해 답변 생성을 담당하고, 임베딩은 sentence-transformers/all-MiniLM-L6-v2를 사용해 문서 검색을 수행했습니다.",
        "임베딩은 외부 API 비용에 의존하지 않도록 sentence-transformers 로컬 모델을 사용하고, 검색 결과는 FAISS로 관리해 별도의 벡터 DB 인프라 없이 로컬 파일 기반으로 운영할 수 있도록 했습니다.",
        "연동 구조는 Next.js API Route가 Python FastAPI 서버를 호출하는 프록시 패턴으로, 프론트엔드와 RAG 백엔드의 관심사를 분리했습니다. 이를 통해 RAG 시스템을 독립적으로 개선하거나 교체할 수 있는 구조를 유지합니다.",
      ] },
      { type: "image", url: "/images/projects/portfolio-website/06-contact.png", caption: "Contact 섹션 — 메시지 폼과 소셜 링크" },

      // ── 6. 검색 기반 Assistant로의 확장 ──
      { type: "text", heading: "단순 챗봇이 아닌 검색 기반 Assistant로 확장", body: [
        "단순 LLM API 호출이 아니라 문서 검색(retrieval) → context 구성 → LLM 응답 생성 → UI 연동까지의 전체 흐름을 직접 설계하고 구현했습니다. RAG 파이프라인의 각 단계를 모듈화하여 독립적으로 테스트하고 교체할 수 있는 구조를 만들었습니다.",
        "Python RAG 시스템을 FastAPI 서버로 분리하고, Next.js 포트폴리오와 API Route 프록시 패턴으로 연동했습니다. 프론트엔드(TypeScript)와 백엔드(Python) 간 관심사 분리를 통해 각각 독립적으로 배포·개선할 수 있습니다.",
        "답변과 함께 관련 섹션으로 이동하는 AI Navigation UX를 구현했습니다. 질문 키워드와 검색된 문서의 source 파일명을 분석해 Experience, Projects, Skills 등 가장 관련 있는 섹션을 추천하고, 버튼 클릭 한 번으로 해당 섹션으로 스크롤 이동합니다.",
        "비용·속도·운영 부담을 고려해 Groq(빠른 응답, 무료 티어) + sentence-transformers 로컬 임베딩(외부 API 비용 없음) + FAISS(별도 인프라 불필요) 구조를 선택했습니다. 포트폴리오 규모의 문서에서 충분한 검색 품질을 확보하면서도 운영 비용을 최소화하는 구성입니다.",
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
