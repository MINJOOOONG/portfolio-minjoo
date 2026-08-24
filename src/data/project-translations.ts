import type { ContentBlock } from "@/components/sections/projects";

interface ProjectTranslation {
  titleEn: string;
  summaryEn: string;
  descriptionEn: string[];
  teamSizeEn: string;
  roleEn?: string;
  achievementEn?: string;
  periodEn?: string;
  contentBlocksEn?: ContentBlock[];
}

export const projectTranslations: Record<string, ProjectTranslation> = {
  "포트폴리오 웹사이트": {
    titleEn: "Portfolio Website",
    summaryEn:
      "An interactive portfolio website with AI Agent workflow and RAG-based search.",
    descriptionEn: [
      "Separated SSR and client interaction using Next.js App Router and React Server Components to achieve both fast initial loading and rich user experience",
      "Implemented per-project 3D background scenes with Three.js + @react-three/fiber, applying immersive interactions like mouse response and scroll parallax",
      "Structured all content (projects, experience, skills) into a DB with Prisma + Neon PostgreSQL, designing a CMS with real-time CRUD via Admin page",
      "Designed and implemented a Python-based RAG pipeline (document loading → chunking → sentence-transformers local embedding → FAISS vector search → Groq LLM answer generation) with FastAPI server",
      "Added an AI search bar (PortfolioAskBar) to the portfolio, connected to the RAG system via Next.js API Route → Python FastAPI proxy architecture",
      "Added AI Navigation feature that links RAG answers to relevant portfolio sections, improving the exploration experience",
    ],
    teamSizeEn: "Solo / 1 Developer",
    roleEn: "Frontend, RAG Pipeline Design, Python Backend",
    periodEn: "2026.05 - Present",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", body: [
        "In the AI era, I believe developers need not only the ability to write code directly, but also the competence to define problems and rapidly design, implement, and verify solutions using AI Agents. So I wanted to use tools like Claude Code, ChatGPT, and Cursor within an actual project workflow.",
        "Initially, I experimented with AI Agents on small feature units, but the results were scattered. I decided I needed a project that connects planning, design, frontend, backend, and AI features in a single flow, which led me to start building this portfolio website.",
        "In this project, the AI Agent was used not simply as a tool that writes code, but as a collaboration tool that concretizes design direction, designs component structures, analyzes errors, and iteratively improves implementation results. However, I didn't apply AI-generated results as-is; I continuously verified them in the actual browser, reviewed code structure, and checked usability from a QA perspective.",
      ] },
      { type: "text", body: [
        "▸ AI Agent Collaboration — Actively utilized AI Agents in planning, design, implementation, and debugging, with a workflow of directly verifying results.",
        "▸ Full-stack Structure — Connected Next.js frontend, DB-based CMS, and Python FastAPI-based RAG search in a single project.",
        "▸ User-centered Verification — Did not accept design results as-is; repeatedly reviewed actual screens and navigation flows from a QA perspective.",
      ] },
      { type: "section-heading", title: "02 — Design Rules" },
      { type: "design-rules", images: [
        { url: "/images/projects/portfolio-website/00-fullpage.png", title: "Full Page Structure" },
        { url: "/images/projects/portfolio-website/02-about.png", title: "About Section" },
        { url: "/images/projects/portfolio-website/04-projects.png", title: "Projects Section" },
        { url: "/images/projects/portfolio-website/03-experience.png", title: "Experience Section" },
        { url: "/images/projects/portfolio-website/05-skills.png", title: "Skills Section" },
      ], rules: [
        { title: "Define overall design standards in design.md first", body: "Before writing code, I documented the portfolio's colors, spacing, typography, buttons, cards, and motion rules in design.md. When collaborating with Claude Code, this document served as the reference for aligning modification scope, reducing inconsistency across sections." },
        { title: "Separate design documents per section", body: "Sections with different characteristics like About, Experience, Projects, AI Lab, Articles, Skills, and Contact have separate md files defining their purpose and layout. This ensures About focuses on self-introduction, Projects on achievements and implementation, and AI Lab on experiments and records." },
        { title: "Maintain common components but vary presentation per section", body: "Basic UI elements like buttons, badges, titles, dividers, and modals maintain consistent styles, but placement and emphasis vary by section purpose. Even within the same design system, screens are adjusted to not look identical." },
        { title: "Expand interactions only within design document rules", body: "Custom cursor, PPT-style section navigation, hover effects, and modal transitions are defined as navigation-aiding features, not mere decoration. New interactions are controlled to avoid excess based on design.md's motion intensity, speed, and usage conditions." },
        { title: "Iterate based on standards, not intuition", body: "Instead of impulsively fixing parts that don't look right, I categorized and fixed issues based on design documents and section-specific md files. For example, I separated and iteratively improved issues like text spacing, heading hierarchy, badge alignment, internal scrolling, and modal layout." },
      ] },
      { type: "section-heading", title: "03 — Design Goals & Architecture" },
      { type: "text", heading: "Design Goals", body: [
        "The goal was to make the portfolio not a simple introduction page, but an explorable interactive technical document. Sections move as PPT-style screen units, and content-heavy sections like Projects and AI Lab are separated with internal scrolling to provide sufficient information without breaking the flow.",
      ] },
      { type: "image", url: "/images/projects/portfolio-website/architecture-diagram.svg", caption: "3-Layer Architecture: Frontend → Data/CMS → AI/RAG" },
      { type: "text", heading: "Frontend — Next.js App Router", body: [
        "Server Components (RSC) fetch project lists and settings data, while Three.js backgrounds, cursors, and animations are separated into Client Components. This structure secures both initial loading performance and interactivity.",
      ] },
      { type: "code", title: "RSC and Client Component Separation", language: "tsx", code: "// Server Component — DB data fetch\nconst settings = await getSettings();\nconst projects = parseJsonSetting<ProjectItem[]>(settings, 'project_data', []);\n\n// Client Component — Three.js via dynamic import\nconst ThreeBg = dynamic(\n  () => import('@/components/shared/three-portfolio-bg'),\n  { ssr: false }\n);" },
      { type: "text", heading: "Interaction — Library Role Separation", body: [
        "Three.js (R3F): 3D background rendering. Shape density and rotation speed sync with React state as sections transition.",
        "Framer Motion: Handles state-based transition animations like modal open/close and section entrance.",
        "GSAP: Used for frame-level precise control animations like cursor tracking.",
      ] },
      { type: "text", heading: "Data — Prisma + Neon PostgreSQL", body: [
        "Portfolio content is separated into a DB instead of being hardcoded, enabling a CMS structure where content can be modified from the Admin page without redeployment. Prisma's automatic TypeScript type generation shares types with the frontend, and Neon's serverless PostgreSQL minimizes cold start in Vercel deployment.",
      ] },
      { type: "code", title: "DB → Component Data Flow", language: "typescript", code: "// Data modified in Admin automatically reflected during server rendering\nconst settings = await prisma.siteSetting.findMany();\nconst experienceData = parseJsonSetting<ExperienceItem[]>(\n  settings, 'experience_data', []\n);\n// → Passed as props to Experience component" },
      { type: "text", heading: "AI — Python FastAPI + FAISS + Groq", body: [
        "The RAG pipeline depends on the Python ecosystem (LangChain, sentence-transformers, FAISS), so it's separated into a dedicated FastAPI server. Next.js API Route acts as a proxy, and the frontend doesn't need to know about the RAG server.",
        "FAISS for local vector search (zero external infrastructure cost), combined with Groq API for Llama 3.1-based answer generation (free tier, fast response speed).",
      ] },
      { type: "code", title: "RAG Pipeline Structure", language: "python", code: "# 1. Load docs → chunk → embed → FAISS store\ndocs = load_documents('data')          # 7 markdown files\nchunks = split_documents(docs)          # 500 char units, 100 overlap\nvectorstore = build_vectorstore(chunks)  # multilingual embedding\n\n# 2. Question → search → LLM answer\nresults = vectorstore.similarity_search(query, k=6)\ncontext = format_context(results)\nanswer = generate_answer(context, question)  # Groq LLM" },
      { type: "section-heading", title: "04 — Key Feature Implementation" },
      { type: "text", heading: "Section-based Navigation", body: [
        "7 sections (About, Experience, Projects, AI Lab, Articles, Skills, Contact) are organized as independent screen units. Top menu, left/right buttons, and slide indicators clearly show and allow navigation to the current position.",
        "Content-heavy sections like Projects and AI Lab are separated into internal scroll areas, controlling Lenis scroll and event propagation so section navigation and content scrolling don't conflict.",
      ] },
      { type: "code", title: "Section Navigation Event Handling", language: "typescript", code: "// CustomEvent triggers section transitions\nwindow.dispatchEvent(\n  new CustomEvent('slide-nav-goto', { detail: { index: sectionIndex } })\n);" },
      { type: "text", heading: "Project Detail Modal (contentBlocks-based)", body: [
        "Clicking a project card opens a detail modal, and the body is rendered by iterating through the contentBlocks array and rendering by block type. Supports 11 content types including text, image, video, pdf, code, tech-grid, design-rules, and rag-pipeline.",
        "When the modal opens, background scrolling is locked and only the body scrolls independently. Keyboard controls (Escape, arrow keys) also support modal close and project navigation.",
      ] },
      { type: "code", title: "contentBlocks Rendering Structure", language: "tsx", code: "// Branch rendering by block type\n{blocks.map((block) => {\n  switch (block.type) {\n    case 'text':    return <TextBlock ... />;\n    case 'image':   return <SafeImage ... />;\n    case 'code':    return <CodeBlock ... />;\n    case 'tech-grid': return <TechGrid ... />;\n    // ... 11 types supported\n  }\n})}" },
      { type: "text", heading: "Three.js 3D Background", body: [
        "React Three Fiber renders wireframe shapes + particles + connecting lines in the portfolio background. Shape density, rotation speed, and particle opacity change based on the currently active section via React state.",
        "Three.js depends on browser objects (WebGL), so dynamic import + ssr: false is applied to prevent server rendering errors.",
      ] },
      { type: "text", heading: "Custom Cursor", body: [
        "The data-cursor attribute switches cursor modes per element. Different visual feedback is provided based on role: buttons, navigation, project cards, etc.",
        "Automatically disabled in mobile touch environments and prefers-reduced-motion settings.",
      ] },
      { type: "text", heading: "About Keyword Interaction", body: [
        "Key sentences and keywords are shown first, with supplementary descriptions appearing on hover/click/focus, layering information hierarchically. Tooltips auto-adjust direction based on viewport position, and Enter/Space/Escape keyboard controls are supported.",
      ] },
      { type: "text", heading: "AI Lab", body: [
        "Designed as a research notebook for learning records and interpretations, not just a list of AI tools. Categorized into 5 tabs: Principles, Practices, Prompting, AI Tools, and Media Notes, with purpose, strengths, limitations, and application experience shown for each item to reveal context.",
      ] },
      { type: "section-heading", title: "05 — RAG AI Assistant" },
      { type: "rag-pipeline",
        diagram: {
          steps: [
            "User Question Input",
            "sentence-transformers Embedding",
            "FAISS Vector Search (Top-4)",
            "Groq LLM Answer Generation",
            "Recommended Section Link (AI Navigation)",
          ],
        },
        description: [
          "The reason for embedding an AI Assistant in the portfolio is not simply to showcase a chatbot feature, but to enable users to explore projects and experiences through question-based navigation. Since general AI chatbots risk generating plausible content not actually in the portfolio, I applied a RAG structure that searches portfolio documents first and answers based on relevant context.",
          "The Python FastAPI server loads markdown documents, splits them into 500-character chunks, and embeds them with sentence-transformers. FAISS vector store searches for the top 4 most similar results to the question, and Groq LLM generates context-based answers.",
          "To ensure AI Assistant answers don't end as mere text, AI Navigation is connected to allow navigation to related sections. The get_recommended_section() function analyzes question keywords and searched document source filenames to recommend related sections, and the frontend dispatches CustomEvent('slide-nav-goto') to navigate to that section.",
        ],
        troubleshooting: "Implementing the RAG pipeline directly inside the Next.js server couldn't handle Python dependencies (sentence-transformers, FAISS) in a Node.js environment. By separating a Python FastAPI server and having the Next.js API Route act as a proxy, each layer's responsibilities are clearly separated.",
      },
      { type: "section-heading", title: "06 — Technology Choice Rationale" },
      { type: "tech-grid", items: [
        { name: "Next.js App Router", reason: "Server data fetching with RSC, minimized client bundle" },
        { name: "Three.js + R3F", reason: "3D rendering within React ecosystem. useFrame-based animation loop" },
        { name: "Prisma + Neon", reason: "Type-safe ORM + serverless PostgreSQL. Fast cold start" },
        { name: "Framer Motion", reason: "Declarative animation API. Natural motion with spring physics" },
        { name: "Groq API", reason: "Llama 3.1-8b-instant. Fast response, free tier available" },
        { name: "sentence-transformers", reason: "Local embedding. Document vectorization without external API costs" },
        { name: "FAISS", reason: "Local file-based vector search. No separate infrastructure needed" },
        { name: "FastAPI", reason: "Python async server. Built-in Pydantic schema validation" },
        { name: "Tailwind CSS", reason: "Utility-based styling. Easy design token customization" },
        { name: "Vercel", reason: "Next.js optimized deployment. Edge Function + ISR support" },
      ] },
      { type: "text", body: [
        "Reason for choosing Groq + local embedding + FAISS: For the portfolio scale (fewer than 10 markdown files), paid infrastructure like OpenAI Embedding API or Pinecone was deemed excessive. Local embedding with sentence-transformers and FAISS search achieves sufficient search quality at zero cost.",
        "LLM uses Groq's free tier. The llama-3.1-8b-instant model provides sufficient quality for portfolio Q&A, and its fast response speed benefits user experience.",
      ] },
      { type: "section-heading", title: "07 — Key Achievements" },
      { type: "text", heading: "Solo Full-stack with AI Agent Collaboration", body: [
        "Using Claude Code, I iterated through planning → design → implementation → debugging cycles, independently implementing the frontend (Next.js 7 sections), backend (Prisma CMS + Admin), and AI (Python RAG pipeline). Applied a workflow of verifying and modifying AI-generated code from a QA perspective in practice.",
      ] },
      { type: "text", heading: "3-Layer Independent Architecture Design", body: [
        "Separated Frontend (Vercel) / Data (Neon PostgreSQL) / AI (FastAPI + Render) into independently deployable layers. Each layer can be modified and scaled individually, minimizing maintenance costs.",
      ] },
      { type: "text", heading: "RAG-based AI Search + Section Navigation", body: [
        "Implemented AI Navigation that connects portfolio document-based search → LLM answer → automatic related section navigation, not just a simple chatbot. Created a new portfolio UX where users can explore projects and experiences through questions alone.",
      ] },
      { type: "text", heading: "Design System Documentation → Consistent UI", body: [
        "Defined color, spacing, and motion rules in design.md first, separating layouts per section with individual md files to ensure design consistency even when collaborating with AI Agents.",
      ] },
      { type: "text", heading: "Zero-cost AI Infrastructure", body: [
        "Operating the RAG system without any paid external services by combining sentence-transformers local embedding + FAISS file-based vector search + Groq free tier.",
      ] },
    ],
  },

  "개인 기술 블로그 joodev": {
    titleEn: "Tech Blog — JooDev",
    summaryEn:
      "A CMS-based personal tech blog for writing and managing technical content.",
    descriptionEn: [
      "Applied SSR with Next.js App Router and React Server Components, separating data flow per page and reducing unnecessary client state",
      "Designed a scalable data model with Prisma and PostgreSQL for posts, tags, images, and admin data",
      "Built a writing environment optimized for technical documents with TipTap editor, including code blocks, Mermaid, and collapsible sections",
      "Implemented a file management structure using Vercel Blob for stable image upload, storage, and retrieval in serverless environments",
      "Provided post CRUD, visibility management, and content exploration in Admin page to reduce operational management costs",
    ],
    teamSizeEn: "Solo",
    achievementEn: "TipTap editor, tag/category system, Admin CMS",
    roleEn: "Planning, Full-stack Development, Deployment",
    periodEn: "2025.04 - Present",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Content Ownership and Freedom", body: [
        "Existing blog platforms like Velog and Tistory had limitations in code block customization, layout freedom, and content ownership. I decided to build my own blog to write weekly technical retrospectives and learning records from the bootcamp in the format I wanted, managed in my own DB.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/01-home.png", caption: "JooDev Home — Pixel art cat character with dark theme landing" },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "SSR-based Architecture", body: [
        "Applied Next.js App Router and React Server Components so data-dependent pages like the Explore page and detail pages are server-rendered, with only the editor and interaction elements as client components. Achieved fast initial loading without React Query by fetching only the necessary data per page on the server.",
      ] },
      { type: "code", title: "SSR Data Fetching Structure", language: "tsx", code: "// Server Component — fetch posts by category\nconst posts = await prisma.blogPost.findMany({\n  where: { published: true },\n  orderBy: { createdAt: 'desc' },\n  include: { tags: true },\n});\n\n// Client Component — editor only\nconst TipTapEditor = dynamic(\n  () => import('@/components/editor/tiptap-editor'),\n  { ssr: false }\n);" },
      { type: "text", heading: "Data Model Design", body: [
        "Designed a normalized schema for posts, tags, and categories with Prisma and PostgreSQL for easy content expansion. Currently has 14+ posts across categories like Backend, QA, and Daily.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/02-explore.png", caption: "Explore Page — Post list and tag filters by Backend, QA, Daily categories" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "TipTap Editor-based Writing Environment", body: [
        "Customized TipTap editor with syntax-highlighted code blocks, Mermaid diagrams, blockquote citations, and collapsible toggles for technical documentation. Built a file management pipeline with Vercel Blob for stable image drag-and-drop upload in serverless environments.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/04-post-tdd.png", caption: "TDD Post — Rich text rendering with code blocks, quotes, and bold emphasis" },
      { type: "image", url: "/images/projects/joodev-blog/05-post-kafka.png", caption: "Kafka Post — Technical article analyzing event architecture and transaction boundaries" },
      { type: "text", heading: "Admin CMS & Authentication", body: [
        "Implemented an httpOnly cookie-based admin authentication system with login/logout, redirecting unauthorized access to the login page. Admin page provides post CRUD, public/private toggle, tag management, and image library for writing and deploying posts directly from the browser.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/09-admin-editor.png", caption: "Admin Login — Password-based authentication before editor access" },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Diverse Content Support and Image Management", body: [
        "Beyond technical articles, I write about diverse topics including creating songs and music videos using AI tools (Suno, Gemini, Capcut), and QA automation experiments combining MCP and Playwright. Each post features unique pixel art cover images to enhance visual distinction and branding in the post list.",
        "To handle file uploads stably in serverless environments (Vercel), I introduced Vercel Blob storage and built an image drag-and-drop → upload → URL return → editor insertion pipeline.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/06-post-ai-music.png", caption: "Making Music with AI — Music production using Suno, Gemini, Capcut" },
      { type: "image", url: "/images/projects/joodev-blog/07-post-mcp.png", caption: "MCP + Playwright — QA automation tool integration experiment" },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "Solo CMS Blog Platform Implementation", body: [
        "Implemented the entire blog system including frontend and Admin CMS as a solo full-stack project based on Next.js App Router SSR. Personally designed and operate all technical blog features from TipTap editor customization, Prisma data model design, to Vercel Blob image management.",
      ] },
      { type: "image", url: "/images/projects/joodev-blog/08-post-4layer.png", caption: "4-Layer Domain Design — Interfaces, Application, Domain, Infrastructure analysis" },
      { type: "image", url: "/images/projects/joodev-blog/03-post-techblog.png", caption: "Blog Development Review — First post about reasons and tech choices" },
    ],
  },

  "E-commerce Backend Engineering": {
    titleEn: "E-commerce Backend Engineering",
    summaryEn:
      "An e-commerce backend project implementing concurrency control, event-driven architecture, and data consistency.",
    descriptionEn: [
      "Designed a Clean Architecture 4-Layer structure (Interfaces → Application → Domain → Infrastructure) separating domain logic from infrastructure, with clear responsibility boundaries between services",
      "Achieved 0 oversells in 100 concurrent request tests using Redis Lua scripts for atomic stock check-and-decrement, implemented O(log N) real-time ranking with Sorted Set (ZINCRBY + ZREVRANGE)",
      "Guaranteed atomicity of transaction commit + event publishing via Kafka event architecture + Transactional Outbox pattern, enabling lossless event re-publishing even during Kafka outages",
      "Implemented Recovery Flow for PG payment timeout/network errors: PENDING status → scheduler-based PG re-query → compensating transaction (stock rollback + order CANCELLED) for automatic recovery",
      "Blocked duplicate requests with Idempotency Key, prevented duplicate coupon usage atomically with Redis Set (SADD), controlled partial rollback by separating @Transactional boundaries with propagation REQUIRES_NEW",
      "Implemented daily sales metric aggregation pipeline with Spring Batch (Chunk-oriented Processing), with per-stage failure isolation across ItemReader/Processor/Writer",
    ],
    teamSizeEn: "Bootcamp Project",
    achievementEn: "0 oversells in 100 concurrent requests, Outbox-based lossless events, O(log N) real-time ranking",
    roleEn: "Backend Architecture Design & Implementation",
    periodEn: "2025.01 - 2025.03",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Hands-on Concurrency Control and Data Consistency", body: [
        "The most frequent problem in e-commerce domains is 'data corruption under concurrent requests.' Issues like inventory overselling, duplicate coupon usage, and payment-order status inconsistency cannot be solved with simple CRUD — they require comprehensive understanding of transaction boundary design, distributed locks, and event architecture.",
        "This project deep-dived into one core topic each week for 10 weeks (TDD → CRUD → domain design → concurrency control → caching → payment integration → event architecture → first-come-first-served processing → real-time ranking → batch processing), repeating the cycle of requirements analysis → design → implementation → PR → mentor code review → technical blog documentation.",
      ] },

      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Clean Architecture 4-Layer Structure", body: [
        "Separated into Interfaces (Controller/DTO) → Application (UseCase/Facade) → Domain (Entity/Service) → Infrastructure (Repository/External API) four layers, ensuring domain logic has no dependency on frameworks or infrastructure.",
        "The Application Layer's Facade handles use cases that compose multiple domain services, with @Transactional boundaries set at the Facade method level for clear transaction scope control.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/architecture-overview.svg", caption: "Architecture overview — 4-layer backend structure with Redis, Kafka, PG, and Batch isolated as infrastructure concerns" },
      { type: "code", title: "@Transactional Boundary with Facade Pattern", language: "java", code: "@Component\n@RequiredArgsConstructor\npublic class OrderFacade {\n    private final OrderService orderService;\n    private final StockService stockService;\n    private final PaymentService paymentService;\n    private final OutboxEventRepository outboxRepository;\n\n    @Transactional  // Transaction boundary at Facade level\n    public OrderResult placeOrder(OrderCommand cmd) {\n        // 1. Stock decrement (Redis Lua → DB sync)\n        stockService.decreaseStock(cmd.getProductId(), cmd.getQuantity());\n        // 2. Create order\n        Order order = orderService.create(cmd);\n        // 3. Process payment\n        PaymentResult payment = paymentService.process(order);\n        // 4. Save Outbox event (within same transaction)\n        outboxRepository.save(\n            OutboxEvent.of(\"order.completed\", order.getId())\n        );\n        return OrderResult.from(order, payment);\n    }\n}" },
      { type: "text", heading: "Event-Driven Async Architecture", body: [
        "Separated post-payment processing (ranking updates, notifications, point accumulation) into Kafka events, eliminating coupling between order service and downstream services. Independent processing per Consumer Group ensures one Consumer's failure doesn't propagate to others.",
        "Core design principle: synchronous flows (order → stock decrement → payment) guarantee atomicity with @Transactional; asynchronous flows (ranking, notifications) are separated via Kafka to block failure propagation.",
      ] },

      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Redis Lua Script-based Concurrency Control", body: [
        "The critical requirement for stock decrement is that 'check and decrement must be atomic.' A Java-level if (stock > 0) stock-- creates a check-then-act race condition. Redis Lua scripts execute single-threaded, so check and decrement become one atomic operation.",
        "DB pessimistic locks (SELECT ... FOR UPDATE) hold connections, risking connection pool exhaustion under high concurrency. Redisson distributed locks have lock acquire/release network round-trip overhead — overkill for simple decrements. Lua scripts were the lightest yet most accurate choice.",
      ] },
      { type: "code", title: "Redis Lua Script — Atomic Stock Decrement", language: "lua", code: "-- KEYS[1]: stock:{productId}\n-- ARGV[1]: decrement quantity\nlocal stock = tonumber(redis.call('GET', KEYS[1]))\nif stock == nil then\n    return -1  -- stock key not found\nend\nif stock < tonumber(ARGV[1]) then\n    return 0   -- insufficient stock\nend\nredis.call('DECRBY', KEYS[1], ARGV[1])\nreturn 1       -- decrement success" },
      { type: "text", heading: "Transactional Outbox Pattern", body: [
        "Using @TransactionalEventListener publishes events after transaction commit, but if the application dies between commit and Kafka publishing, events are lost. The Outbox pattern stores events within the same DB transaction as business data, making a 'committed but no event' state structurally impossible.",
        "A separate scheduler polls the Outbox table for PENDING events and publishes to Kafka, changing status to PUBLISHED on success. Events are preserved in the DB even during Kafka outages and can be re-published after recovery.",
      ] },
      { type: "code", title: "Outbox Event Scheduler", language: "java", code: "@Scheduled(fixedDelay = 1000)  // Poll every 1 second\n@Transactional\npublic void publishPendingEvents() {\n    List<OutboxEvent> events = outboxRepository\n        .findByStatusOrderByCreatedAtAsc(EventStatus.PENDING);\n    \n    for (OutboxEvent event : events) {\n        try {\n            kafkaTemplate.send(event.getTopic(), event.getPayload());\n            event.markAsPublished();\n        } catch (Exception e) {\n            event.incrementRetryCount();\n            if (event.getRetryCount() >= MAX_RETRY) {\n                event.markAsFailed();\n            }\n        }\n    }\n}" },
      { type: "text", heading: "First-Come-First-Served Queue (Redis Queue)", body: [
        "Burst traffic at event open is absorbed into a Redis List (LPUSH) queue, with a Consumer processing via RPOP sequentially. At queue entry, a Lua script atomically checks stock and adds to queue, blocking requests beyond available stock from even entering the queue.",
        "Why List over Redis Stream: Stream offers Consumer Groups, ACK, and reprocessing features, but for simple first-come-first-served queues it's overkill — List's LPUSH/RPOP is more intuitive with less performance overhead.",
      ] },
      { type: "text", heading: "Real-time Ranking (Redis Sorted Set + Spring Batch)", body: [
        "ZINCRBY increments product scores on each sales event, with ZREVRANGE querying Top-N in O(log N + M). DB aggregate queries (GROUP BY + ORDER BY) approach full table scans as data grows, so real-time queries are delegated to Redis while accurate daily aggregation is separated into Spring Batch.",
        "Spring Batch uses Chunk-oriented Processing (ItemReader → ItemProcessor → ItemWriter) for daily sales metric aggregation. Chunk size set to 500 to limit memory usage while maintaining throughput, with skip/retry policies ensuring partial failures don't halt the entire batch.",
      ] },

      // ── 04 ── Architecture
      { type: "section-heading", title: "04 — System Architecture" },
      { type: "text", heading: "Order Flow — First-Come-First-Served Processing", body: [
        "Client → API Gateway → Redis Lua (stock check) → Redis Queue (LPUSH) → Consumer (RPOP) → Order Service (@Transactional) → MySQL + Outbox Table",
        "Requests don't hit the DB directly — Redis Lua checks stock first. If available, the request is queued via Redis Queue, and the Consumer pulls and creates orders sequentially. This structure absorbs burst traffic without DB connection pool exhaustion.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/queue-token-flow.svg", caption: "Queue architecture — Redis Sorted Set tracks position, Scheduler + Lua atomically issues entry tokens" },
      { type: "text", heading: "Event Flow — Outbox → Kafka → Consumer", body: [
        "Order Service (Outbox saved within @Transactional) → Outbox Scheduler (1s polling) → Kafka Topic (order.completed) → Consumer Group A (ranking) / Consumer Group B (notifications)",
        "Separated Consumer Groups ensure ranking Consumer failures don't propagate to notification Consumers. Each Consumer manages independent offsets, enabling individual reprocessing.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/outbox-kafka-flow.svg", caption: "Outbox event flow — save event in the DB transaction, relay to Kafka, consume idempotently with EventHandled" },
      { type: "text", heading: "Recovery Flow — Automatic Payment Failure Recovery", body: [
        "Payment (status=PENDING) → Scheduler (30s interval) → PG API re-query → COMPLETED on success / compensating transaction on failure (stock rollback + order CANCELLED)",
        "Compensating transactions use @Transactional(propagation = REQUIRES_NEW) to isolate from the original transaction, ensuring compensation logic failures don't affect the original transaction.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/payment-recovery-flow.svg", caption: "Payment recovery flow — PENDING absorbs PG timeout, Callback/Scheduler resolves the final state" },
      { type: "text", heading: "Batch Flow — Daily Metric Aggregation", body: [
        "Spring Batch Job (daily 02:00) → JpaPagingItemReader (sales data) → ItemProcessor (aggregation) → JpaItemWriter (ranking_snapshot table) → Ranking API cache refresh",
        "Configured with chunk size 500 and skip limit 10 so partial data errors don't halt the batch.",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/ranking-batch-flow.svg", caption: "Ranking pipeline — Kafka events update real-time Redis ZSET, while Spring Batch builds daily/weekly/monthly read models" },
      { type: "callout", variant: "info", title: "Design Principles", body: [
        "All flows prioritize 'no data loss even during failures' over 'normal operation.'",
        "Synchronous processing (order/payment/stock) guarantees atomicity with @Transactional; asynchronous processing (ranking/notifications) is separated via Kafka to block failure propagation.",
        "All external calls (PG, Kafka) are designed assuming failure, achieving eventual consistency through retry, compensation, and idempotency.",
      ] },

      // ── 05 ── Problem Solving
      { type: "section-heading", title: "05 — Problem Solving Record" },

      { type: "text", heading: "1. Preventing Inventory Oversell", body: [
        "Problem — Check-then-act race condition causes stock to drop below zero under concurrent orders. JMeter tests with 100 concurrent requests showed 30+ successful orders for a product with only 10 in stock.",
        "Consideration — (1) DB pessimistic lock (SELECT ... FOR UPDATE): guarantees consistency but holds connections, risking HikariCP pool exhaustion. (2) Redisson distributed lock: network round-trip overhead for lock acquire/release, overkill for simple decrements. (3) Redis Lua script: atomicity guaranteed via single-threaded execution, single network round-trip.",
        "Decision — Redis Lua script atomically checks and decrements stock. GET → compare → DECRBY executes without interruption, structurally eliminating race conditions.",
        "Result — Achieved 0 oversells in 100 concurrent request tests. Stock controlled at Redis level, securing connection pool stability without DB load.",
      ] },

      { type: "text", heading: "2. Preventing Duplicate Coupon Usage", body: [
        "Problem — When the same user simultaneously sends multiple order requests with the same coupon, application-level checks (findByUserIdAndCouponId) read 'unused' for both requests, causing duplicate usage.",
        "Consideration — (1) DB Unique constraint (user_id + coupon_id): guarantees consistency but requires DB transaction to verify. (2) Redis Set (SADD): atomic duplicate check without DB access. (3) Application-level synchronized: only valid on single instance, not applicable in distributed environments.",
        "Decision — Execute SADD coupon:{couponId}:users {userId} on Redis Set. Return value 1 means first use (success), 0 means already used (reject). As an atomic operation, exactly 1 succeeds even under concurrent requests.",
        "Result — Duplicate attempts immediately rejected at Redis level, eliminating unnecessary DB transactions and reducing coupon check response time to sub-millisecond.",
      ] },

      { type: "text", heading: "3. Payment Failure Recovery (Compensating Transaction)", body: [
        "Problem — PG response timeout (>3s) or network error leaves payment result unknown. Stock is already decremented at this point, requiring rollback on confirmed payment failure.",
        "Consideration — (1) Immediate retry: meaningless during PG outages. (2) Scheduler-based re-query: stable as it can verify after PG recovery. (3) Manual user verification: worst UX.",
        "Decision — Save payment status as PENDING → scheduler re-queries PG API every 30 seconds → on failure confirmation, execute compensating transaction. Compensating transaction uses @Transactional(propagation = REQUIRES_NEW) for independent commit.",
        "Result — System automatically resolves uncertain payment states. Even if compensating transaction fails, it doesn't affect the original transaction and retries on next polling cycle.",
      ] },

      { type: "text", heading: "4. Preventing Event Loss (Outbox Pattern)", body: [
        "Problem — Using @TransactionalEventListener to publish to Kafka after transaction commit means commit success → Kafka publish failure (network error, broker down) results in lost events. Order completes but ranking/notification updates are missed.",
        "Consideration — (1) @TransactionalEventListener: transaction commit and event publishing aren't atomic. (2) Outbox pattern: stores events in DB for atomicity, low infrastructure cost. (3) CDC (Debezium): auto-publishes via DB binlog detection but high infrastructure complexity.",
        "Decision — Applied Outbox pattern. Business logic and Outbox event save execute within the same @Transactional, making a 'committed but no event' state impossible. Separate scheduler polls and publishes to Kafka, with FAILED status and alerting after 3 retry failures.",
        "Result — Events preserved in DB during Kafka outages, enabling re-publishing after recovery. Implementable without additional infrastructure compared to CDC, suitable for project scale.",
      ] },

      { type: "text", heading: "5. First-Come-First-Served Traffic Handling", body: [
        "Problem — Hundreds of concurrent requests at event open each hold a DB connection, exhausting the HikariCP pool and causing the entire service to become unresponsive.",
        "Consideration — (1) DB queue table: ultimately concentrates load on DB, no fundamental solution. (2) Redis List: in-memory processing distributes DB load, LPUSH/RPOP guarantees ordering. (3) Redis Stream: rich features (Consumer Groups, ACK) but overkill for simple first-come-first-served.",
        "Decision — Queue requests via Redis List (LPUSH/RPOP) with Consumer processing sequentially. Lua script atomically handles stock check and queue entry, blocking requests beyond available stock from entering the queue entirely.",
        "Result — DB connection usage limited to a single Consumer, structurally preventing pool exhaustion. Processing order guaranteed with first-come-first-served logic and zero overselling.",
      ] },

      { type: "text", heading: "6. Real-time Ranking Design", body: [
        "Problem — Querying sales-based real-time ranking via DB (SELECT COUNT(*) ... GROUP BY product_id ORDER BY count DESC) causes linearly increasing response times as data grows.",
        "Consideration — (1) DB aggregate query: even with indexes, GROUP BY + ORDER BY creates temp tables causing degradation. (2) Redis Sorted Set: O(log N) insert, O(log N + M) range query — consistent performance regardless of data scale. (3) Cache + batch refresh: insufficient real-time capability.",
        "Decision — On each sales event from Kafka Consumer, increment score with ZINCRBY ranking:daily {productId} 1, query Top-10 instantly with ZREVRANGE ranking:daily 0 9. Accurate daily aggregation handled separately by Spring Batch in a hybrid structure.",
        "Result — Real-time ranking query response maintained at O(log N) level, with Spring Batch complementing daily accuracy. Real-time responsiveness and accuracy tradeoff resolved at the design stage.",
      ] },

      // ── 06 ── Code Review & Testing
      { type: "section-heading", title: "06 — Code Review & Testing Strategy" },
      { type: "text", heading: "Mentor Code Review Integration", body: [
        "Submitted PRs weekly and received mentor code reviews. Key feedback: (1) Separate domain logic from service layer — refactored OrderService's price calculation, discount application, and stock check into Order entity and StockService. (2) Specific exception handling — defined domain exceptions like InsufficientStockException and DuplicateCouponException instead of RuntimeException. (3) Testability — abstracted external dependencies (Redis, Kafka) behind interfaces for Mock injection in unit tests.",
      ] },
      { type: "text", heading: "Testing Strategy", body: [
        "Unit tests: Domain logic (price calculation, discount application, state transitions) verified with pure JUnit without external dependencies. Consistent given-when-then pattern applied.",
        "Integration tests: @SpringBootTest + Testcontainers with actual Redis/MySQL for concurrency scenario verification. ExecutorService with 100 threads for concurrent oversell and duplicate usage tests.",
        "API tests: MockMvc for Controller layer request/response structure, HTTP status codes, and error response format verification.",
      ] },
      { type: "code", title: "Concurrency Test — Oversell Verification", language: "java", code: "@Test\nvoid concurrent_100_orders_should_not_oversell() throws Exception {\n    // given\n    stockService.setStock(productId, 10);  // 10 in stock\n    int threadCount = 100;\n    ExecutorService executor = Executors.newFixedThreadPool(32);\n    CountDownLatch latch = new CountDownLatch(threadCount);\n\n    // when\n    for (int i = 0; i < threadCount; i++) {\n        executor.submit(() -> {\n            try {\n                orderFacade.placeOrder(new OrderCommand(productId, 1));\n            } catch (InsufficientStockException ignored) {\n            } finally {\n                latch.countDown();\n            }\n        });\n    }\n    latch.await();\n\n    // then\n    long successCount = orderRepository.countByProductId(productId);\n    assertThat(successCount).isEqualTo(10);\n    assertThat(stockService.getStock(productId)).isZero();\n}" },

      // ── 07 ── Key Achievements
      { type: "section-heading", title: "07 — Key Achievements" },
      { type: "text", heading: "Concurrency Control Design Competency", body: [
        "Achieved 0 oversells in 100 concurrent requests using Redis Lua scripts, with hands-on comparison and selection among DB pessimistic lock / Redisson distributed lock / Lua script tradeoffs (consistency, performance, connection holding) based on actual measurements.",
      ] },
      { type: "text", heading: "Event Architecture and Data Consistency", body: [
        "Designed Transactional Outbox pattern guaranteeing atomicity of 'transaction commit + event publishing,' enabling lossless event re-publishing even during Kafka outages. Gained understanding of @TransactionalEventListener vs Outbox vs CDC pros/cons for project-appropriate selection.",
      ] },
      { type: "text", heading: "Failure-Scenario-Driven Design", body: [
        "Applied 'design assuming failure' across all external calls: PG timeout → PENDING → scheduler re-query → compensating transaction, Kafka down → Outbox preservation → re-publish after recovery. Internalized the mindset of designing failure/duplication/latency scenarios before success cases.",
      ] },
      { type: "text", heading: "Real-time + Batch Hybrid Architecture", body: [
        "Combined Redis Sorted Set (real-time ranking) + Spring Batch (accurate daily aggregation) to resolve the real-time vs accuracy tradeoff at the design level.",
      ] },

      // ── 08 ── Learning Journey
      { type: "section-heading", title: "08 — 10-Week Learning Journey" },
      { type: "text", body: [
        "Deep-dived into one core topic each week for 10 weeks, repeating the cycle of requirements analysis → design documentation → implementation → PR submission → mentor code review → technical blog documentation.",
      ] },

      { type: "text", heading: "Week 1 — TDD / Auth / Membership", body: [
        "Scope — Implemented signup, header-based authentication, current-user lookup, and password-change APIs using E2E tests as the acceptance criteria. `UserV1Controller` handles HTTP contracts and headers, while `UserService` owns signup/auth/password-change transaction boundaries.",
        "Domain rules — Extracted `LoginIdValidator`, `EmailValidator`, `BirthDateValidator`, `PasswordPolicyValidator`, and `NameMasker` so each policy could be tested independently.",
        "Verification — Covered signup success, duplicate loginId, auth failure, password policy violation, current password mismatch, and masked-name response through unit and E2E tests.",
        "[Pull Request #37](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/37)",
        "[Technical Blog — TDD](https://joodev-sandy.vercel.app/blog/tdd)",
      ] },
      { type: "code", title: "Week 1 Auth and Signup Flow", language: "mermaid", code: "sequenceDiagram\n    participant Client\n    participant API as UserV1Controller\n    participant Service as UserService\n    participant Policy as PasswordPolicyValidator\n    participant DB as UserRepository\n\n    Client->>API: POST /api/v1/users/register\n    API->>Service: register(request)\n    Service->>Policy: validate(password)\n    Service->>DB: existsByLoginId(loginId)\n    alt duplicate\n        DB-->>Service: true\n        Service-->>API: CONFLICT\n    else valid\n        Service->>DB: save(encoded user)\n        Service-->>API: UserInfo\n    end\n    API-->>Client: ApiResponse" },

      { type: "text", heading: "Week 2 — CRUD / API Design", body: [
        "Scope — Documented requirements, policy decisions, sequence diagrams, class diagrams, and ERD before expanding implementation. The goal was to define API behavior and domain responsibilities before adding more code.",
        "Design decisions — Separated request/response DTOs from entities, placed Repository interfaces in Domain and JPA implementations in Infrastructure, and used a common ErrorType + ApiControllerAdvice rule for validation/auth/header errors.",
        "Verification — Each PR included completion criteria covering success cases, failure responses, authentication failures, missing headers, and validation errors.",
        "[Pull Request #76](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/76)",
        "[Technical Blog — CRUD](https://joodev-sandy.vercel.app/blog/crud)",
      ] },
      { type: "point-cards", items: [
        { title: "API Contract", body: "Controller owns DTO conversion and HTTP status codes; domain decisions stay in Service/Domain." },
        { title: "Documentation", body: "Requirements, sequence diagrams, class diagrams, and ERD were included in PR context." },
        { title: "Error Rules", body: "Validation, auth, and missing-header failures follow the shared ErrorType and ControllerAdvice." },
      ] },

      { type: "text", heading: "Week 3 — Product / Brand / Order", body: [
        "Scope — Applied the 4-layer package structure (`interfaces / application / domain / infrastructure`) and modeled Brand, Product, Like, and Order domains. Product name, price, and stock quantity rules were pushed closer to entity/value-object code.",
        "Architecture — Repository interfaces live in Domain while JPA implementations live in Infrastructure. Application Facades compose use cases and own transaction boundaries; Domain Services keep single-domain rules focused.",
        "Order design — Normalized duplicate product IDs in order requests before stock decrement so the same product would not be decremented multiple times in one request. Mentor review surfaced this risk, and the design moved toward request aggregation before stock changes.",
        "[Pull Request #129](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/129)",
        "[Technical Blog — Product·Brand·Order](https://joodev-sandy.vercel.app/blog/4)",
      ] },
      { type: "code", title: "Week 3 4-Layer Responsibility Map", language: "text", code: "interfaces\n  - ProductV1Controller, OrderV1Controller, DTO\napplication\n  - ProductFacade, OrderFacade: use case orchestration + transaction boundary\ndomain\n  - Brand, Product, Order, OrderItem, Like\n  - ProductService, OrderService, Repository interfaces\ninfrastructure\n  - JpaRepository, RepositoryImpl, JPA converters" },

      { type: "text", heading: "Week 4 — Likes / Coupons", body: [
        "Scope — Worked on order transactions, like/coupon concurrency control, and stock consistency. `LikeFacade` locks the product row, then updates likeCount and Like state in one transaction so `likes_desc` sorting stays consistent with the actual like state.",
        "Coupon design — Duplicate coupon usage cannot rely only on application-level read-then-write checks. The important design point was preventing duplicates at insertion time through Redis Set or DB unique constraints.",
        "Verification — Tested like count not going negative or double-incrementing under concurrent requests, coupon double-use prevention, and cleanup of stock/coupon state on order failure.",
        "[Pull Request #164](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/164)",
        "[Technical Blog — Likes·Coupons](https://joodev-sandy.vercel.app/blog/like)",
      ] },
      { type: "code", title: "Week 4 Like Consistency Flow", language: "mermaid", code: "sequenceDiagram\n    participant Client\n    participant Facade as LikeFacade\n    participant ProductRepo\n    participant LikeRepo\n    participant DB\n\n    Client->>Facade: POST /likes(productId)\n    Facade->>ProductRepo: getProductWithLock(productId)\n    ProductRepo->>DB: SELECT ... FOR UPDATE\n    Facade->>LikeRepo: existsByUserIdAndProductId(userId, productId)\n    alt not liked\n        Facade->>Facade: product.increaseLikeCount()\n        Facade->>LikeRepo: save(like)\n    else already liked\n        Facade-->>Client: idempotent success\n    end" },

      { type: "text", heading: "Week 5 — Redis Cache", body: [
        "Scope — Improved product-list query performance, like-count sorting, and Redis Cache integration. Added ProductFacade, Product API DTOs/controllers, paging, brand filter, and sort modes (`latest`, `likes_desc`).",
        "Performance decision — Counting likes via aggregation becomes expensive when brand filtering and like sorting are combined. Denormalized `Product.likeCount` and added indexes on `brandId` and `likeCount` to reduce read-path sorting cost.",
        "Cache design — Configured Redis CacheManager with 5-minute TTL and JSON serialization. Product details use `@Cacheable`, while like/unlike write paths evict the affected product cache via `@CacheEvict`.",
        "Verification — Product E2E tests covered cache hit/miss, cache invalidation after like changes, sort parameter validation, filtering, and pagination.",
        "[Pull Request #216](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/216)",
        "[Technical Blog — Redis Cache](https://joodev-sandy.vercel.app/blog/post-mmswqd6z)",
      ] },
      { type: "code", title: "Week 5 Product Cache Flow", language: "mermaid", code: "sequenceDiagram\n    participant Client\n    participant Controller as ProductV1Controller\n    participant Facade as ProductFacade\n    participant Redis as Redis Cache\n    participant Service as ProductService\n    participant DB\n\n    Client->>Controller: GET /api/v1/products/{id}\n    Controller->>Facade: getProduct(productId)\n    Facade->>Redis: cache lookup\n    alt cache hit\n        Redis-->>Facade: ProductInfo\n    else cache miss\n        Facade->>Service: getProductById(productId)\n        Service->>DB: SELECT product\n        DB-->>Service: Product\n        Facade->>Redis: cache store (TTL 5m)\n    end\n    Facade-->>Controller: ProductInfo" },

      { type: "text", heading: "Week 6 — Payment / PG Integration", body: [
        "Scope — Built a Failure-Ready payment structure that absorbs PG latency, outages, and missing responses as internal state transitions. Responsibilities were split across PaymentFacade, PaymentTransactionService, PaymentService, PG Client, Callback API, and Recovery Scheduler.",
        "State model — When the system cannot immediately confirm the PG result, it stores payment as PENDING. Callback or scheduler re-query later resolves the final state. Duplicate callbacks for non-PENDING payments are treated idempotently.",
        "Recovery design — PaymentRecoveryScheduler periodically queries old PENDING payments. If `pgTransactionId` exists, it re-queries PG; if not and the payment is abandoned, it runs compensation: fail payment, cancel order, restore stock/coupon state.",
        "Verification — Covered PG timeout, callback success/failure, duplicate callback, scheduler re-query, abandoned payments, and continuation after per-payment recovery errors.",
        "[Pull Request #237](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/237)",
        "[Technical Blog — Payment·PG Integration](https://joodev-sandy.vercel.app/blog/post-mmsvj2bz)",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/payment-recovery-flow.svg", caption: "Week 6 payment recovery — Callback and Scheduler share the same PENDING-centered transition rules" },

      { type: "text", heading: "Week 7 — Kafka / Transactional Outbox", body: [
        "Scope — Converted synchronous order-coupon-aggregation flow into event-driven architecture. Implementation progressed from ApplicationEvent boundaries to Outbox storage, Relay, Kafka Producer/Consumer, and EventHandled idempotency storage.",
        "Core decision — The business transaction does not directly publish Kafka. It stores an Outbox event in the same DB transaction, preventing the dangerous case where order commit succeeds but Kafka publish fails.",
        "Consumer reliability — Assumed Kafka at-least-once delivery and guarded duplicate consumption with EventHandled. Added producer `acks=all`, `enable.idempotence=true`, and consumer manual ack so offset commits happen after successful processing.",
        "Extension — First-come-first-served coupon issue was moved to request storage → Outbox → Kafka → CouponConsumer → polling result, concentrating concurrency control in one consumer flow.",
        "[Pull Request #293](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/293)",
        "[Technical Blog — Kafka](https://joodev-sandy.vercel.app/blog/kafka)",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/outbox-kafka-flow.svg", caption: "Week 7 Outbox/Kafka — transaction boundary, message consistency, and idempotent consumption are separated" },

      { type: "text", heading: "Week 8 — Redis Queue / Lua", body: [
        "Scope — Implemented a Redis Sorted Set order queue to protect the order API during burst traffic. `ZADD NX` prevents duplicate entry, timestamp scores preserve FIFO, and `ZRANK` provides O(log N) position lookup.",
        "API flow — Users enter with `POST /queue/enter`, poll `GET /queue/position`, and receive either WAITING or READY + token. `POST /orders` requires the entry token, while cancel endpoints are excluded from token validation.",
        "Throughput control — OrderQueueScheduler runs every second with fixedDelay and dequeues only BATCH_SIZE users. This separates traffic intake from DB order execution and prevents HikariCP exhaustion.",
        "Lua improvement — A Java loop with `ZPOPMIN` then `SET token` can lose a user if the server crashes between commands. Lua executes `ZPOPMIN N + SET token EX` atomically inside Redis, removing that structural failure mode.",
        "Verification — Tested 100 to 2,000 concurrent entries, BATCH_SIZE throughput limits, token TTL expiry returning 403, and validate/consume split where order failure keeps the token for retry.",
        "[Pull Request #335](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/335)",
        "[Technical Blog — Redis Queue·Lua](https://joodev-sandy.vercel.app/blog/lua)",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/queue-token-flow.svg", caption: "Week 8 queue — Queue(buffer), Scheduler(valve), and Token(gate) control DB entry rate" },

      { type: "text", heading: "Week 9 — Kafka Ranking / Redis Sorted Set", body: [
        "Scope — Connected the Week 7 user-action event pipeline to Redis ZSET real-time product ranking. Kafka Consumer receives view/like/order events, RankingScorePolicy computes scores, and RankingRedisRepository updates ZSET.",
        "Why ZINCRBY — ZADD overwrite requires `ZSCORE → calculate → ZADD`, which can lose updates under concurrent events. ZINCRBY performs score increment as a single Redis command.",
        "Score policy — Ranking is not raw count. VIEW is weak interest, LIKE is explicit preference, and ORDER is purchase conversion, each with different weights so high view count alone does not dominate ranking.",
        "Daily key and carry-over — Used `rank:all:yyyyMMdd` keys with TTL for daily freshness. To reduce midnight cold start, copied part of yesterday's score into today via weighted `ZUNIONSTORE`.",
        "API — `GET /api/v1/rankings` returns Top-N, and `GET /api/v1/rankings/products/{productId}` returns rank + score by composing Redis ranking data with product details.",
        "[Pull Request #373](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/373)",
        "[Technical Blog — Kafka Ranking·Redis ZSet](https://joodev-sandy.vercel.app/blog/kafka-redis-zset)",
      ] },
      { type: "code", title: "Week 9 Ranking Event Pipeline", language: "text", code: "Kafka UserActionEvent\n  -> RankingKafkaConsumer\n  -> RankingScorePolicy\n       VIEW  = weak interest signal\n       LIKE  = explicit preference signal\n       ORDER = purchase conversion signal\n  -> Redis ZSET ZINCRBY rank:all:yyyyMMdd productId score\n  -> Ranking API ZREVRANGE / ZREVRANK / ZSCORE" },

      { type: "text", heading: "Week 10 — Spring Batch / Metrics / Ranking Aggregation", body: [
        "Scope — Extended the Redis real-time ranking system into a full ranking data pipeline: daily snapshots, weekly/monthly aggregation, materialized read tables, and period-based API lookup.",
        "Daily metrics snapshot — Stores product metrics by date. Same-date re-execution deletes existing metric_date rows and saves fresh rows, making the job rerunnable.",
        "Rank aggregation job — Spring Batch Reader → Processor → Writer reads daily metrics, calculates weekly/monthly scores, and stores TOP-N rows into read-model tables such as `mv_product_rank_weekly` and `mv_product_rank_monthly`.",
        "Operational learning — PR review surfaced chunk writer rank-offset duplication risk when each chunk starts from rank 0, requiring a cumulative counter. It also highlighted persistence-context issues after bulk DELETE, where `@Modifying(clearAutomatically = true, flushAutomatically = true)` may be needed for rerun safety.",
        "API — TODAY rankings can come from Redis, while WEEK/MONTH rankings come from batch-built read models under the same period-based API contract.",
        "[Pull Request #420](https://github.com/Loopers-dev-lab/loop-pack-be-l2-vol3-java/pull/420)",
        "[Technical Blog — Spring Batch·Metrics](https://joodev-sandy.vercel.app/blog/post-mo8jxik7)",
      ] },
      { type: "image", url: "/images/projects/ecommerce-backend/ranking-batch-flow.svg", caption: "Week 10 ranking batch — real-time Redis ranking and daily/weekly/monthly read models are selected by API period" },
    ],
  },

  "아두이노를 이용한 사회적 제품 제작": {
    titleEn: "Arduino-based Social Product Development",
    summaryEn:
      "A team prototype using Arduino and OpenCV to address everyday social problems.",
    descriptionEn: [
      "Narrowed down product ideas based on problem severity, user situations, and implementation feasibility, then designed sensor input and visual processing flows together",
      "Connected Arduino hardware inputs with Python logic to create a working prototype for real-world use cases",
      "Processed camera inputs with OpenCV and connected recognition results to product behavior logic",
      "Documented the entire operation process with flowcharts to clearly share implementation scope and data flows among team members",
      "Accumulated experience in reducing features to a completable form and creating verifiable demos within limited equipment and time",
    ],
    teamSizeEn: "4 Members",
    achievementEn: "Arduino + OpenCV integrated prototype",
    roleEn: "Hardware-Software Integration Development",
    periodEn: "2023.09 - 2023.12",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Product Planning for Social Problem Solving", body: [
        "A team project started with the goal of creating products that can improve everyday social problems through technology. Among various ideas, we selected the final item based on problem severity, actual user situations, and feasibility with limited equipment.",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/02-image-2e661fd0.jpg", caption: "Arduino-based Prototype Building Process" },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Sensor Input and Python Processing Architecture", body: [
        "Designed a structure where Arduino board sensor (ultrasonic, infrared, etc.) inputs are received in real-time by Python scripts to handle product behavior logic. Implemented bidirectional communication using OpenCV for frame-by-frame camera input analysis, controlling Arduino outputs (LED, buzzer, etc.) based on object recognition results.",
      ] },
      { type: "code", title: "Arduino-Python Serial Communication", language: "python", code: "import serial\nimport cv2\n\n# Arduino serial connection\narduino = serial.Serial('/dev/ttyACM0', 9600)\n\n# OpenCV camera capture\ncap = cv2.VideoCapture(0)\n\nwhile True:\n    ret, frame = cap.read()\n    # Object recognition processing\n    result = detect_object(frame)\n    # Send recognition result to Arduino\n    arduino.write(result.encode())" },
      { type: "image", url: "/images/projects/notion/arduino-social-product/03-image-2e661fd0.png", caption: "System Diagram — Sensor Input → Python Processing → Output Control Flow" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "OpenCV-based Video Recognition and Team Collaboration", body: [
        "Implemented bidirectional communication using OpenCV for frame-by-frame camera input analysis, controlling Arduino outputs (LED, buzzer, etc.) based on object recognition results.",
        "Visualized the entire operation process as a flowchart, clearly distributing the implementation scope among 4 team members (hardware assembly, sensor calibration, Python logic, testing).",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/04-image-2e661fd0.png", caption: "OpenCV-based Video Recognition Processing Screen" },
      { type: "image", url: "/images/projects/notion/arduino-social-product/05-image-2e661fd0.png", caption: "Flowchart-based Operation Flow Design" },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Sensor Precision and Hardware Constraints", body: [
        "Shared progress weekly and collaboratively resolved issues discovered during actual testing such as sensor input errors and recognition rate degradation. Gained broader perspective on hardware-software integration by directly experiencing physical constraints (sensor precision, wiring stability) that software alone cannot solve.",
      ] },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "Prototype Completion Under Constraints", body: [
        "Focused on creating a 'verifiable demo' rather than a perfect product within limited equipment (Arduino Uno, webcam) and a short 2-week period, completing the prototype. Built an Arduino + OpenCV integrated prototype with bidirectional sensor-software communication.",
      ] },
      { type: "image", url: "/images/projects/notion/arduino-social-product/06-image-2e661fd0.png", caption: "Final Prototype Demonstration" },
    ],
  },

  "FSM과 BT 구조를 활용한 게임 인공지능 분석": {
    titleEn: "Game AI Analysis: FSM vs Behavior Tree",
    summaryEn:
      "A graduation thesis comparing FSM and Behavior Tree under identical conditions in a Unity 2021.3 2D action game prototype.",
    descriptionEn: [
      "Built a Vampire Survivors-like 2D action game and implemented four AI subsystems in both FSM and BT forms: monster AI, infinite map logic, wave spawning, and weapon switching.",
      "Ran 60-second tests five times per structure under identical game conditions, using 50 monster entities and collecting data through Unity Time.time API plus a custom CSV event logger.",
      "In quantitative results, BT improved response speed by 21% (140ms → 110ms), reduced error rate by 72% (7.4% → 2.1%), and shortened transition time by 47% (85ms → 45ms) compared with FSM.",
      "BT also showed 44% higher behavioral diversity (3.2 → 4.6 actions/min), producing less repetitive and more natural behavior in complex situations.",
      "A 10-participant 5-point Likert survey rated BT higher in immersion (4.4 vs 3.1), naturalness (4.5 vs 2.8), and maintainability (4.3 vs 2.6).",
      "Confirmed that FSM is simple and intuitive for small state sets, but state explosion, condition conflicts, and evaluation-order dependency appear as states and transitions increase.",
      "Proposed a hybrid selection guideline: use FSM for simple animation/game-mode transitions and BT for complex NPC or system AI.",
    ],
    teamSizeEn: "Graduation Thesis",
    achievementEn: "Validated BT's performance, stability, and user-experience advantages with experimental data",
    roleEn: "Research Design, Unity Implementation, Thesis Writing",
    periodEn: "2024.03 - 2025.02",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Lack of Quantitative Game AI Structure Comparison", body: [
        "A graduation thesis project quantitatively comparing the actual performance differences between the two most widely used game AI structures: FSM (Finite State Machine) and Behavior Tree. Most game AI textbooks explain FSM as simple and BT as extensible, but there was insufficient research verifying how response speed, memory usage, and maintenance costs actually differ in real game environments.",
      ] },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Unity-based Experimental Environment Design", body: [
        "Implemented identical AI behavior logic (patrol → enemy detection → chase → attack → evade) in both FSM and BT structures within the Unity engine. Conducted repeated tests under identical maps, enemy placements, and scenarios (1v1 combat, multi-enemy response, environmental change response) for fair comparison.",
        "Fixed non-AI factors like animation and physics calculations to identical settings for variable control.",
      ] },
      { type: "code", title: "FSM State Transition Structure Example", language: "csharp", code: "// FSM state transition — complexity increases as conditions grow\nswitch (currentState) {\n  case State.Patrol:\n    if (DetectEnemy()) SetState(State.Chase);\n    break;\n  case State.Chase:\n    if (InAttackRange()) SetState(State.Attack);\n    else if (!DetectEnemy()) SetState(State.Patrol);\n    break;\n  case State.Attack:\n    if (!InAttackRange()) SetState(State.Chase);\n    if (health < threshold) SetState(State.Evade);\n    break;\n}" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Performance Measurement and Analysis", body: [
        "Collected performance metrics including per-frame AI computation time, state transition delay, CPU utilization, and GC allocation using Unity Profiler.",
        "FSM showed faster response times when state count was low, but transition condition complexity increased dramatically beyond 10 states, making maintenance difficult.",
        "BT had higher initial setup cost, but could extend behaviors by simply adding nodes, with clear structural advantages for complex AI.",
      ] },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Ensuring Fair Experimental Conditions", body: [
        "Conducted repeated tests under identical maps, enemy placements, and scenarios for fair FSM/BT comparison, fixing non-AI factors like animation and physics to identical settings. Ran each scenario multiple times and compared averages to improve experimental result reliability.",
      ] },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "Structure Selection Criteria Derivation", body: [
        "Derived experiment-based selection criteria: FSM is suitable for simple AI (5 states or fewer), while BT is suitable for complex AI with high extensibility needs. Also wrote the thesis in English translation, gaining academic writing and experimental design methodology skills.",
      ] },
      { type: "text", heading: "Thesis Documents", body: [
        "The final thesis, proposal, and English translation are available below.",
      ] },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/02-pdf-2e661fd0.pdf", title: "Final Thesis.pdf" },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/03-pdf-2e661fd0.pdf", title: "Thesis Proposal.pdf" },
      { type: "file", url: "/images/projects/notion/fsm-bt-thesis/04-file-33461fd0.pdf", title: "FSM_vs_BT_Thesis_English.pdf" },
    ],
  },

  "UNIST 해상 물류 창업 오디션": {
    titleEn: "UNIST Maritime Logistics Startup Audition",
    summaryEn:
      "A startup audition project for a maritime logistics education product.",
    descriptionEn: [
      "Led the entire process as PM: problem definition, item planning, prototype development, commercialization validation, and presentation",
      "Designed maritime accident training content combining Unity-based VR simulation with Arduino hardware for realistic operational feel",
      "Directly implemented UI/UX structures and simulation interfaces considering user flows, improving issues discovered during experience sessions",
      "Validated idea feasibility by being selected in the UNIST startup audition finals and receiving 10M KRW in startup funding",
    ],
    teamSizeEn: "Team Project",
    achievementEn: "Final selection and 10M KRW startup funding",
    roleEn: "PM (Planning, Prototype Development, Presentation)",
    periodEn: "2024.03 - 2024.12",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Limitations of Maritime Accident Prevention Training", body: [
        "Participated in the UNIST Smart Maritime Logistics Startup Audition 8th cohort, carrying out the entire process from idea planning to prototype development, commercialization validation, and final presentation over one year. As PM, I led team 'Crew', defined the problem of maritime accident prevention training, and proposed a VR-based simulation solution.",
      ] },
      { type: "image", url: "/images/projects/notion/unist-startup-audition/03-image-2e661fd0.png", caption: "Team Crew Activity — Prototype Demonstration Scene" },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Unity-based VR Simulation Design", body: [
        "Designed training content that recreates maritime accident situations (ship collision, fire evacuation, etc.) in a Unity-based VR environment where users can directly experience response procedures. Connected Arduino-based physical controllers (joystick, button panel) with the VR environment for a tactile interface close to actual ship operations.",
      ] },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Commercialization Validation and Market Analysis", body: [
        "Analyzed maritime safety training market size and existing training limitations (cost, accessibility, lack of realism) through market research, organizing VR solution differentiators. Experienced the entire process of turning an idea into a business through writing business expense plans, company registration, and investor presentation materials.",
      ] },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "VR Motion Sickness and UX Iteration", body: [
        "Discovered VR motion sickness-inducing sections and confusing control points through user testing, iteratively improving UI/UX. Gained a startup-oriented mindset that requires proving not just technical ideas but also market viability and feasibility.",
      ] },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "Final Selection and Startup Funding", body: [
        "Selected in the UNIST Startup Audition finals and received 10M KRW in startup funding.",
      ] },
      { type: "text", heading: "Related Documents", body: [
        "Key documents created during the startup audition process.",
      ] },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/04-file-2e661fd0.pdf", title: "2024 Smart Maritime Logistics Startup Audition 8th — Certificate of Completion.pdf" },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/05-file-2e661fd0.pdf", title: "Business Registration Certificate — Crew.pdf" },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/06-file-2e661fd0.pdf", title: "Business Expense Plan and Invoice — Crew.pdf" },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/07-file-2e661fd0.pdf", title: "Startup Audition Application Presentation.pdf" },
      { type: "file", url: "/images/projects/notion/unist-startup-audition/08-file-2e661fd0.pdf", title: "Startup Audition 8th Application Documents — Crew.pdf" },
    ],
  },

  "2024 K-HTML 대학대항전 해커톤": {
    titleEn: "2024 K-HTML University Hackathon",
    summaryEn:
      "A hackathon service using Azure OpenAI for local social issues.",
    descriptionEn: [
      "Participated as the HUFS representative team, performing everything from problem definition to UI design and service implementation",
      "Designed UI structure and interactions based on user behavior flows, implementing with HTML, CSS, and JavaScript",
      "Integrated Azure OpenAI-based response features for dynamic reactions to user inputs",
      "Integrated the screen, features, and data flow into a single service considering AWS deployment within the short timeframe",
      "Completed a functional result within the time limit by iterating through problem definition, UI design, implementation, and verification in short cycles",
    ],
    teamSizeEn: "Team Project",
    achievementEn: "Azure OpenAI MVP completed within 48 hours",
    roleEn: "UI/UX Design, Frontend Development",
    periodEn: "2024.07",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "K-HTML University Hackathon Participation", body: [
        "Participated in the 2024 K-HTML University Hackathon as the Hankuk University of Foreign Studies representative team. Given the theme of improving local social issues in Yongin city, we had to complete everything from problem definition to service planning, UI design, implementation, and presentation within the time limit.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/03-image-2e661fd0.png", caption: "Hackathon Scene — Team Working" },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "User Flow-based UI Design", body: [
        "Investigated actual inconveniences of Yongin city residents and designed screen structure based on user behavior flow (problem recognition → information search → resolution request). Implemented responsive UI with HTML, CSS, and JavaScript, designing smooth transitions between user input forms and result display screens.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/04-image-2e661fd0.png", caption: "Service Screen Design — User Input Flow" },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/05-image-2e661fd0.png", caption: "UI Implementation Result" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Azure OpenAI-based AI Feature Integration", body: [
        "Implemented a feature that sends user-described problem situations to Azure OpenAI API and generates context-appropriate solutions through generative AI. Designed and iteratively tested system prompts through prompt engineering to produce answers relevant to the Yongin city regional context.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/06-image-2e661fd0.png", caption: "AI Response Feature — Dynamic Answer Generation for User Questions" },
      { type: "video", url: "/images/projects/notion/k-html-hackathon/07-video-2e661fd0.mp4", caption: "Service Demo Video — Full User Flow" },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Service Integration Within 48-hour Limit", body: [
        "Deployed the service on AWS EC2 and integrated the entire data flow from frontend screens → AI API calls → result rendering into a single service. Minimized feature scope and prioritized implementation by core scenarios to create a working result within the limited 48 hours.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/08-image-2e661fd0.png", caption: "Final Presentation Materials" },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/09-image-2e661fd0.png" },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "MVP Completion and Practical Collaboration Experience", body: [
        "Developed judgment for creating a 'working MVP' rather than a 'perfect service' by rapidly iterating through problem definition → UI design → implementation → verification. Quickly decided team role distribution (frontend, backend, presentation) and worked in parallel to complete the Azure OpenAI-integrated service MVP within the time limit.",
      ] },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/10-image-2e661fd0.png", caption: "Competition Participation Certificate" },
      { type: "image", url: "/images/projects/notion/k-html-hackathon/11-image-2e661fd0.png" },
    ],
  },

  "미니 산학 연계 캡스톤 프로젝트": {
    titleEn: "Mini Industry-Academia Capstone Project",
    summaryEn:
      "A cloud and generative AI training project with service experiments.",
    descriptionEn: [
      "Learned AWS and Microsoft-based generative AI workflows through 40-hour cloud and AI intensive training",
      "Concretized project direction through visits to Microsoft and Google Korea headquarters to see real cloud/AI service operation cases",
      "Designed user input, response generation, and result verification flows to connect generative AI to service problem solving",
      "Split feature structure into small units for experimentation considering cloud-based deployment and external AI API integration",
      "Built perspective of using AI as a tool that helps solve product problems, not just a feature",
    ],
    teamSizeEn: "Solo",
    achievementEn: "AWS Lambda AI API pipeline experiment",
    roleEn: "Service Design, Implementation Experiment",
    periodEn: "2024.06 - 2024.08",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Industry-Academia Capstone Program", body: [
        "Participated in a mini industry-academia capstone program connecting university and industry, planning service ideas combining cloud infrastructure and generative AI, and conducting implementation experiments. Systematically learned AWS cloud architecture (EC2, S3, Lambda) and Microsoft Azure OpenAI service usage through a 40-hour intensive training program.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/02-image-2e661fd0.png", caption: "Training Session — Cloud and AI Hands-on Practice" },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Microsoft & Google Korea HQ Visits", body: [
        "Visited Microsoft Korea headquarters to learn about actual Azure-based cloud service operations and enterprise AI adoption cases. At Google Korea headquarters, directly heard about GCP-based ML pipeline and large-scale data processing infrastructure design philosophy, concretizing project direction.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/03-image-2e661fd0.png", caption: "Microsoft Korea HQ Visit" },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/04-image-2e661fd0.png", caption: "Google Korea HQ Visit" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Serverless AI API Pipeline", body: [
        "Designed a 3-step flow of user input → AI response generation → result verification to use generative AI as a service problem-solving tool, not just a chatbot. Built a serverless AI API call pipeline with AWS Lambda and API Gateway, experimenting with cost-efficient deployment approaches.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/05-image-2e661fd0.png", caption: "Service Architecture Design Diagram" },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Module Separation and Independent Testing", body: [
        "Separated feature structure into small units (input parsing, prompt composition, response post-processing) for independently testable modules. Gained real experience considering tradeoffs between cost, response speed, and scalability when designing AI services on cloud infrastructure.",
      ] },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "AI Service Design Perspective", body: [
        "Built the perspective that AI should not just be seen as a 'feature,' but requires first defining what product problem it solves, then selecting the appropriate AI approach. Completed the AWS Lambda serverless AI API pipeline construction experiment.",
      ] },
      { type: "image", url: "/images/projects/notion/mini-capstone-ai-cloud/06-image-2e661fd0.jpg", caption: "Cloud and AI Training Course Certificate" },
    ],
  },

  "폴가이즈 기반 레고 파티클 게임": {
    titleEn: "Fall Guys-inspired Lego Particle Party Game",
    summaryEn:
      "A UE5 team project implementing UI for a Lego-style multiplayer mini-game.",
    descriptionEn: [
      "Implemented player movement, round progression, and UI display flows using Unreal Engine 5 and C++",
      "Designed player-needed interfaces including overhead direction arrows, pre-game countdown, and option UI",
      "Organized widget structures and event connections so UI updates automatically with game state changes",
      "Managed work units using SVN and Git together, controlling asset changes with potential conflicts",
      "Improved UI details focusing on immediate feedback and screen readability, crucial for Fall Guys-style games",
    ],
    teamSizeEn: "Team Project",
    achievementEn: "UE5 C++ game UI system implementation",
    roleEn: "UI/UX Design, UMG Widget Implementation",
    periodEn: "2025.01 - 2025.02",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Fall Guys-inspired Party Game Implementation", body: [
        "A bootcamp team project implementing multiplayer mini-games with a Lego particle concept inspired by Fall Guys' party game feel using Unreal Engine 5. I was responsible for the UI/UX part within the team, designing and implementing the overall in-game interface using C++ and UMG (Unreal Motion Graphics).",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/03-image-2e661fd0.png", caption: "Gameplay Screen — Lego Particle Concept" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/04-image-2e661fd0.png", caption: "Multiplayer Mini-game Scene" },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Game UI System Design", body: [
        "Designed the complete UI system needed for actual gameplay: player overhead direction arrows, pre-game 3-2-1 countdown, round results display, and options menu. Combined UMG widget blueprints with C++ bindings to implement event-based structures where UI automatically transitions with game state changes (waiting → playing → results).",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/05-image-2e661fd0.png", caption: "Countdown UI Implementation" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/06-image-2e661fd0.png", caption: "Player Status Display UI" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/07-image-2e661fd0.png", caption: "Options Menu UI" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Real-time Data Binding and UI Feedback", body: [
        "Bound real-time data like player count, remaining time, and scores to widgets so information updates immediately during gameplay.",
        "Focused on 'immediate feedback' crucial for party games like Fall Guys, adding visual responses like score popup animations and screen shake on elimination.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/08-image-2e661fd0.png", caption: "Round Progression Screen" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/09-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/10-image-2e661fd0.png" },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Version Control and UI Readability Improvement", body: [
        "Due to Unreal project characteristics, managed binary assets (.uasset, .umap) with SVN for conflict prevention while code (.cpp, .h) was managed with Git in parallel. Distributed work among 5 team members by map/character/UI/network, with twice-weekly merge times for integration build verification to minimize conflicts.",
        "Applied semi-transparent background panels, outlined text, and high-contrast color palettes to ensure UI readability even on the bright pastel-toned Lego map.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/11-image-2e661fd0.png", caption: "UI Before/After Comparison" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/12-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/13-image-2e661fd0.png" },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "UE5 C++ Game UI System Completion", body: [
        "Designed and implemented the complete UE5 C++ game UI system. Experienced the full game development flow including event-based UI architecture with UMG widgets and C++ bindings, SVN/Git parallel version control, and UI readability improvements on pastel-toned maps.",
      ] },
      { type: "image", url: "/images/projects/notion/lego-particle-party/14-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/15-image-2e661fd0.png" },
      { type: "image", url: "/images/projects/notion/lego-particle-party/16-image-2e661fd0.png" },
    ],
  },

  "AWS DeepRacer 경진 대회 1등": {
    titleEn: "AWS DeepRacer Competition — 1st Place",
    summaryEn:
      "A reinforcement learning project that achieved 1st place in AWS DeepRacer.",
    descriptionEn: [
      "Learned reinforcement learning, reward function design, and model training structures through AWS DeepRacer ML training",
      "Directly designed reward functions and adjusted hyperparameters for autonomous driving model development and performance improvement",
      "Continuously optimized driving stability and lap time through repeated training and simulation across various track environments",
      "Analyzed training logs and result data to quantitatively evaluate performance and derive improvement directions, achieving final 1st place",
    ],
    teamSizeEn: "Team Project",
    achievementEn: "1st place through RL model tuning",
    roleEn: "Model Design, Log Analysis, Parameter Tuning",
    periodEn: "2024.09",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Reinforcement Learning Autonomous Driving Competition", body: [
        "Learned reinforcement learning, reward function design, and model training structures through AWS DeepRacer ML training and participated in the competition. Joined to gain experience experimenting with reinforcement learning in actual simulation environments and quantitatively improving performance, beyond just theory.",
      ] },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Reward Function and Hyperparameter Design", body: [
        "Directly designed reward functions and repeatedly adjusted hyperparameters for autonomous driving model development and performance improvement. Experimented with various reward strategies including track center maintenance, speed optimization, and corner deceleration to find the optimal combination.",
      ] },
      { type: "code", title: "Reward Function Design Example", language: "python", code: "def reward_function(params):\n    track_width = params['track_width']\n    distance_from_center = params['distance_from_center']\n    speed = params['speed']\n    \n    # Track center maintenance reward\n    marker = track_width * 0.25\n    if distance_from_center <= marker:\n        reward = 1.0\n    elif distance_from_center <= track_width * 0.5:\n        reward = 0.5\n    else:\n        reward = 1e-3\n    \n    # Speed bonus\n    if speed > 2.0:\n        reward *= 1.5\n    \n    return float(reward)" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Iterative Training and Simulation", body: [
        "Continuously optimized driving stability and lap time through repeated training and simulation across various track environments. Analyzed training logs and result data to quantitatively evaluate performance and derive improvement directions.",
      ] },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Log Analysis-based Performance Improvement", body: [
        "Analyzed reward accumulation graphs, lap time trends, and course departure points from training logs to identify reward function weaknesses and make corrections. Discovered overfitting issues where performance was high only on specific tracks, and applied generalization strategies by training across various track conditions.",
      ] },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "AWS DeepRacer Competition 1st Place", body: [
        "Achieved final 1st place in the AWS DeepRacer competition through reinforcement learning model optimization. Built practical reinforcement learning application skills by iterating through reward function design → hyperparameter tuning → log analysis → model improvement cycles.",
      ] },
    ],
  },

  "QA Minjoo Helper": {
    titleEn: "QA Minjoo Helper",
    summaryEn:
      "An AI work assistant for recording and summarizing QA TC changes.",
    descriptionEn: [
      "Personally designed and developed a tool for real-time recording and managing modification/addition/deletion requests during QA testing",
      "Implemented real-time data synchronization for sharing modification history among team members using Supabase",
      "Built filtering, sorting, and search functions for complex TC modification histories with Zustand-based state management",
      "Reduced communication costs with automatic categorization and summary report generation for modification requests",
      "Deployed on Vercel as a web-based tool accessible to all team members",
    ],
    teamSizeEn: "Solo",
    achievementEn: "TC change history recording and auto-summary",
    roleEn: "Planning, UI Design, Frontend Development, Data Structure Design",
    periodEn: "2025.05 - Present",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Inefficiency in TC Modification Management During QA", body: [
        "There was a lack of tools for real-time recording and managing modification/addition/deletion requests during QA testing. I decided to build my own tool to structure modification histories that were previously scattered across notepads and Slack messages, making them shareable with team members.",
      ] },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Real-time Synchronization and State Management", body: [
        "Implemented a structure for sharing modification history among team members using Supabase real-time data synchronization. Built filtering, sorting, and search functions for complex TC modification histories with Zustand-based state management, deployed on Vercel as a web-based tool accessible to all team members.",
      ] },
      { type: "code", title: "Zustand State Management Structure", language: "typescript", code: "// TC modification history state management\nconst useTCStore = create<TCState>((set) => ({\n  items: [],\n  filter: 'all',\n  addItem: (item) => set((s) => ({\n    items: [...s.items, { ...item, id: nanoid(), createdAt: new Date() }]\n  })),\n  setFilter: (filter) => set({ filter }),\n  getFiltered: () => {\n    // Category-based filtering + sorting\n  },\n}));" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Auto-categorization and Summary Reports", body: [
        "Reduced communication costs by automatically categorizing modification requests by type (modify/add/delete) and generating summary reports. Manages TC modification history chronologically with search and filter functions for quickly tracking previous modifications.",
      ] },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Real-time Sync and Data Conflict Resolution", body: [
        "Resolved potential data conflicts when multiple team members simultaneously add modification history by combining Supabase's real-time subscription (Realtime) with optimistic updates. Implemented reconnection logic and error handling to ensure Supabase connection stability in the Vercel deployment environment.",
      ] },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "QA Workflow Efficiency Tool Completion", body: [
        "Completed the shareable auto-summary feature for test modification/addition/deletion history recording among team members. Gained experience identifying inefficiencies in QA practice, then independently planning, building, and deploying a problem-solving tool from start to finish.",
      ] },
    ],
  },

  "ISTQB CTFL Quick Study": {
    titleEn: "ISTQB CTFL Quick Study",
    summaryEn:
      "A Korean ISTQB CTFL v4.0 exam-prep web app with practice questions, mock exams, wrong-answer notes, chapter summaries, and PDF viewers.",
    descriptionEn: [
      "Built quick 10-question practice, chapter-based practice, full shuffled practice, and 40-question mock exams from ISTQB sample exam A/B/C/D sets",
      "Implemented exam results with the 65% passing threshold, score, accuracy, and detailed review for incorrect answers",
      "Designed LocalStorage-based wrong-answer notes and chapter progress persistence so users can repeatedly study weak areas",
      "Integrated react-pdf viewers for the CTFL syllabus PDF and source sample exam PDFs inside the app",
      "Deployed on Vercel with PWA settings so the web app can be used from a mobile home screen",
    ],
    teamSizeEn: "Solo",
    roleEn: "Planning, frontend development, question data modeling, PDF viewer integration",
    achievementEn: "Deployed an ISTQB CTFL study app with mock exams and wrong-answer review flows",
    periodEn: "2026.06 - Present",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Project Background" },
      { type: "text", body: [
        "While preparing for the Korean ISTQB CTFL v4.0 exam, practice questions, wrong-answer tracking, chapter summaries, and original PDF references were scattered across separate materials.",
        "I built a web study app that combines sample exam A/B/C/D sets and syllabus summaries in one place, so users can solve questions like an exam and review incorrect answers repeatedly.",
      ] },
      { type: "text", body: [
        "▸ Goal — Integrate CTFL practice, mock exams, wrong-answer notes, and summaries into one app",
        "▸ Exam Flow — Reflect 40-question mock exams and the 65% passing threshold",
        "▸ Expansion — Keep a repo structure that includes both the web app and a Swift iOS app experiment",
      ] },
      { type: "image", url: "/images/projects/istqb/02-home.png", caption: "ISTQB Quick Study main screen" },
      { type: "section-heading", title: "02 — Key Features" },
      { type: "text", heading: "Practice and Mock Exams", body: [
        "Provided quick 10-question practice, chapter-based practice, full shuffled practice, and Sample Exam A/B/C/D selection. Mock exams use 40 questions and show results against the 65% passing threshold.",
        "Normal quiz mode gives immediate answers and explanations after each question, while exam mode separates navigation, final submission, and post-exam review.",
      ] },
      { type: "image", url: "/images/projects/istqb/03-practice.png", caption: "Practice — Quick 10, mock exams (A/B/C/D), chapter-based questions" },
      { type: "text", heading: "Wrong Notes and Continue Later", body: [
        "Incorrect answers are saved automatically in LocalStorage, tracking wrong counts and reattempt results. Filters and sorting help users identify weak chapters quickly.",
        "Chapter quiz progress is stored so users can leave the page and continue later.",
      ] },
      { type: "image", url: "/images/projects/istqb/05-wrong.png", caption: "Wrong notes — Filter, sort, and track reattempted questions" },
      { type: "text", heading: "Summaries and PDF Viewers", body: [
        "Added CTFL v4.0 chapter summaries with learning objectives, keywords, exam points, and importance levels.",
        "Used react-pdf and pdfjs-dist to view syllabus and sample exam PDFs directly in the app, with source links from question details.",
      ] },
      { type: "image", url: "/images/projects/istqb/04-summary.png", caption: "Chapter summaries — Section-level importance and study points" },
      { type: "section-heading", title: "03 — Data Structure" },
      { type: "text", heading: "Question / WrongNote / Summary Models", body: [
        "Question data includes exam set, question number, chapter, learning objective, K-level, options, correct answers, explanation, option-level explanations, tags, key concepts, and syllabus references.",
        "Wrong-answer records store selected answers, correct answers, wrong counts, dates, chapters, and reattempt results.",
        "Summary data separates chapter, section, learning objective, keywords, summary content, exam points, and importance so list and detail pages can reuse the same source.",
      ] },
      { type: "code", title: "Question Data Shape", language: "typescript", code: "type Question = {\n  id: string;\n  examSet: string;\n  questionNumber: number;\n  chapter: number;\n  learningObjective: string;\n  kLevel: \"K1\" | \"K2\" | \"K3\" | \"K4\";\n  questionText: string;\n  options: string[];\n  correctAnswers: string[];\n  explanation: string;\n  optionExplanations?: string[];\n  syllabusReference?: string;\n};" },
      { type: "section-heading", title: "04 — Implementation Points" },
      { type: "tech-grid", items: [
        { name: "React Router", reason: "Separated practice, quiz, wrong-answer notes, summary, syllabus, and source pages with SPA routing" },
        { name: "LocalStorage", reason: "Stored wrong-answer records, answer history, and chapter progress without a backend" },
        { name: "react-pdf", reason: "Rendered syllabus and sample exam PDFs directly inside the app" },
        { name: "Vercel + PWA", reason: "Used SPA rewrites and manifest settings for mobile-friendly access" },
      ] },
      { type: "text", heading: "Deployment and Access", body: [
        "Deployed the web app on Vercel and configured SPA rewrite behavior. Added manifest and app icons so it can be launched from a mobile home screen like a study app.",
      ] },
      { type: "section-heading", title: "05 — Learning Impact" },
      { type: "text", body: [
        "Instead of only memorizing exam content, I structured testing fundamentals, testing in SDLC, static testing, test techniques, test management, and tool support through app data and solving flows.",
        "The app organizes common terminology and testing standards needed in QA practice, while wrong-answer data creates a repeatable loop for reviewing weak areas.",
      ] },
    ],
  },

  "ReviewForge": {
    titleEn: "ReviewForge",
    summaryEn:
      "An AI creator agent that automates local experience campaign applications, review writing, and mission compliance verification.",
    descriptionEn: [
      "Crawls campaign pages via Bright Data and analyzes requirements with Qwen Cloud to auto-generate 3 personalized application messages",
      "Analyzes uploaded visit photos via Nosana GPU inference and combines campaign requirements, photos, and personal notes to generate a grounded review draft",
      "Implements Mission Compliance QA in a Daytona sandbox, deterministically verifying photo/video counts, post length, keywords, hashtags, links, and conditional missions",
      "Designed a sponsor integration pipeline: Bright Data → Qwen Cloud (Apply), Bright Data → Nosana → Qwen Cloud → Daytona (Write Review)",
      "Provides Demo Mode for exploring both end-to-end flows without API credentials, enabling judges and users to test immediately",
    ],
    teamSizeEn: "Solo / Hackathon",
    roleEn: "Planning, Full-stack Implementation, Sponsor API Integration",
    achievementEn: "AgentForge Seoul hackathon submission, integrated 4 sponsor API pipeline",
    periodEn: "2026.08",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Built It" },
      { type: "text", body: [
        "I am a power blogger who loves discovering great restaurants, cafés, and places through blogger experience campaigns. The experiences are exciting; the repetitive work around them is not.",
        "Every application asks for another carefully tailored message. After getting selected and completing the visit, I still have to organize photos, turn scattered notes into a full blog post, reread the campaign brief, count keywords, and check every mission before publishing. I built ReviewForge to automate that repetitive work without inventing the experience.",
      ] },
      { type: "text", body: [
        "▸ Grounded in Real Visits — AI never fabricates experiences; drafts are based on actual visit photos and personal notes.",
        "▸ Campaign Compliance — Photo/video counts, keywords, hashtags, links, and conditional missions are verified in code.",
        "▸ AgentForge Seoul Hackathon — Built with Bright Data, Qwen Cloud, Nosana, and Daytona sponsor integrations.",
      ] },
      { type: "image", url: "/images/projects/reviewforge/02-hero.png", caption: "ReviewForge landing — Anyone can be an influencer" },
      { type: "section-heading", title: "02 — Key Features" },
      { type: "text", heading: "Apply — Campaign Application", body: [
        "Enter a campaign URL and applicant highlights. Bright Data crawls the campaign page, and Qwen Cloud analyzes the campaign to generate 3 personalized application messages.",
        "Personal details like age, location, interests, or content strengths are only used when the creator provides them.",
      ] },
      { type: "image", url: "/images/projects/reviewforge/03-features.png", caption: "Apply form — Campaign URL input and personal highlights" },
      { type: "image", url: "/images/projects/reviewforge/04-section.png", caption: "Apply pipeline — Bright Data → Qwen Cloud auto-generates application messages" },
      { type: "text", heading: "Write Review — Review Writing & Mission QA", body: [
        "Enter a campaign URL, visit photos, and personal notes. The pipeline runs: media analysis → grounded draft generation → mission compliance QA.",
        "The draft is grounded in the campaign requirements, uploaded visit media, and the creator's firsthand notes. A deterministic verifier checks photo and video counts, length, keywords, hashtags, links, and conditional missions.",
      ] },
      { type: "image", url: "/images/projects/reviewforge/06-review-form.png", caption: "Write Review — Campaign URL, photo upload, and visit memo form" },
      { type: "section-heading", title: "03 — Sponsor Integration Architecture" },
      { type: "tech-grid", items: [
        { name: "Bright Data", reason: "Captures the public campaign page and provides source content for requirement extraction" },
        { name: "Qwen Cloud", reason: "Understands the campaign and generates application messages, titles, photo order, and review drafts" },
        { name: "Nosana", reason: "Runs GPU inference on uploaded visit media" },
        { name: "Daytona", reason: "Executes deterministic compliance checks in an isolated sandbox" },
      ] },
      { type: "text", body: [
        "Apply flow: Bright Data → Qwen Cloud",
        "Write Review flow: Bright Data → Nosana → Qwen Cloud → Daytona",
      ] },
      { type: "image", url: "/images/projects/reviewforge/07-pipeline.png", caption: "Write Review agent pipeline — URL → MEDIA → DRAFT → QA" },
      { type: "section-heading", title: "04 — Technical Implementation" },
      { type: "text", body: [
        "Built with Next.js and TypeScript for the frontend and API routes, integrating each sponsor API.",
        "Demo Mode allows exploring both end-to-end flows without API credentials, so judges and users can test immediately.",
      ] },
    ],
  },
};
