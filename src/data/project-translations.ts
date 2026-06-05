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
      "An e-commerce backend project implementing order, payment, and event flows.",
    descriptionEn: [
      "Decomposed requirements into feature units, iterating weekly through implementation, testing, and retrospectives to verify API behavior and edge cases",
      "Incorporated mentor feedback from PR and code reviews to improve code quality focusing on pass/fail criteria, exception handling, and testability",
      "Created sequence diagrams, ERDs, and class designs to define responsibility boundaries for order, payment, inventory, and event publishing flows",
      "Introduced Kafka-based event architecture to separate post-payment processing asynchronously and reduce inter-service coupling",
      "Applied Outbox pattern and Idempotency Key to prevent data consistency issues at the design stage for duplicate requests and event reprocessing in payment/order flows",
      "Used AI Agents like Claude and Codex to speed up design review, test case derivation, and refactoring candidate discovery",
    ],
    teamSizeEn: "Bootcamp Project",
    achievementEn: "Redis queue, Kafka events, real-time ranking, Spring Batch",
    roleEn: "Backend Architecture Design & Implementation",
    periodEn: "2025.01 - 2025.03",
    contentBlocksEn: [
      { type: "section-heading", title: "01 — Why I Started This Project" },
      { type: "text", heading: "Backend Transactions and Data Consistency", body: [
        "A bootcamp project where I designed order, payment, and event flows in the e-commerce domain while learning backend transactions and data consistency. I decomposed requirements into feature units and iterated weekly through implementation, testing, and retrospectives to verify API behavior and edge cases.",
      ] },
      { type: "section-heading", title: "02 — Design Goals & Technical Architecture" },
      { type: "text", heading: "Domain Design and Event Architecture", body: [
        "Created sequence diagrams, ERDs, and class designs to define responsibility boundaries for order, payment, inventory, and event publishing flows. Introduced Kafka-based event architecture to separate post-payment processing asynchronously and reduce inter-service coupling.",
      ] },
      { type: "code", title: "Kafka Event Publishing Structure", language: "java", code: "@Transactional\npublic OrderResult createOrder(OrderCommand cmd) {\n    Order order = orderService.create(cmd);\n    paymentService.process(order);\n    // Event published after payment → async post-processing\n    eventPublisher.publish(\n        new OrderCompletedEvent(order.getId())\n    );\n    return OrderResult.from(order);\n}" },
      { type: "section-heading", title: "03 — Key Feature Implementation" },
      { type: "text", heading: "Redis Queue and Real-time Ranking", body: [
        "Implemented first-come-first-served event processing with Redis-based queues, and designed a real-time ranking system using Sorted Sets. Built a batch processing structure for daily snapshots using Spring Batch.",
      ] },
      { type: "text", heading: "Data Consistency Guarantee", body: [
        "Applied Outbox pattern and Idempotency Key to prevent data consistency issues at the design stage for duplicate requests and event reprocessing in payment/order flows.",
      ] },
      { type: "code", title: "Outbox Pattern Implementation", language: "java", code: "// Save event to Outbox table → separate polling for publishing\n@Transactional\npublic void processPayment(Payment payment) {\n    paymentRepository.save(payment);\n    outboxRepository.save(\n        OutboxEvent.of(\"payment.completed\", payment.getId())\n    );\n    // Kafka publishing handled by separate scheduler polling Outbox\n}" },
      { type: "section-heading", title: "04 — Problem Solving / Troubleshooting" },
      { type: "text", heading: "Code Review and AI Agent Utilization", body: [
        "Incorporated mentor feedback from PR and code reviews to improve code quality focusing on pass/fail criteria, exception handling, and testability. Used AI Agents like Claude and Codex to speed up design review, test case derivation, and refactoring candidate discovery.",
      ] },
      { type: "section-heading", title: "05 — Key Achievements" },
      { type: "text", heading: "Backend Design Competency", body: [
        "Learned core e-commerce backend patterns through hands-on implementation of Redis-based queues, Kafka event flows, real-time ranking, and Spring Batch daily snapshots. Gained experience ensuring data consistency at the design stage through Outbox pattern and Idempotency Key application.",
      ] },
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
};
