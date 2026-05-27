/* ── AI Lab Data ── */

export type AILabCategory =
  | "Principles"
  | "Claude.md"
  | "Skills Rules"
  | "Design Rules"
  | "AI Tools"
  | "Media Notes";

export const AI_LAB_CATEGORIES: AILabCategory[] = [
  "Principles",
  "Claude.md",
  "Skills Rules",
  "Design Rules",
  "AI Tools",
  "Media Notes",
];

/* ── Rules / Principles ── */

export interface AIRule {
  text: string;
}

export const principles: AIRule[] = [
  { text: "AI 결과물을 그대로 믿지 않고 반드시 검증한다." },
  { text: "프롬프트는 단순 질문이 아니라 작업 기준서처럼 작성한다." },
  { text: "AI가 만든 결과물의 의도, 구조, 리스크를 사람이 설명할 수 있어야 한다." },
  { text: "보안, 데이터 민감도, 저작권, 품질 검증을 항상 고려한다." },
  { text: "AI는 대체 도구가 아니라 사고를 확장하고 반복 업무를 줄이는 협업 도구로 사용한다." },
  { text: "빠르게 시도하되, 최종 판단과 책임은 사람이 가져야 한다." },
  { text: "AI에게 넘기기 전에 내가 먼저 구조를 이해하고 있어야 한다." },
  { text: "같은 질문이라도 컨텍스트를 얼마나 주느냐에 따라 결과가 달라진다." },
];

export const claudeMdRules: AIRule[] = [
  { text: "작업 전 반드시 현재 프로젝트 구조를 먼저 탐색하게 한다." },
  { text: "바로 수정하지 말고 Plan Mode로 먼저 설계하게 한다." },
  { text: "기존 디자인과 로직을 망가뜨리지 말라는 제한 조건을 명확히 준다." },
  { text: "수정 범위를 작게 나누고, 변경 이유를 설명하게 한다." },
  { text: "UI 수정 시 데스크톱/태블릿/모바일 반응형을 항상 함께 검토하게 한다." },
  { text: "기능 구현 후 regression risk를 점검하게 한다." },
  { text: '"기존 톤 유지", "불필요한 기능 추가 금지", "한 번에 과하게 바꾸지 않기" 같은 작업 제한을 명확히 둔다.' },
  { text: "커밋 전에 변경된 파일 목록과 영향 범위를 반드시 확인하게 한다." },
];

export const skillsRules: AIRule[] = [
  { text: "기술 이름만 나열하지 않고, 어떤 문제를 해결하기 위해 사용했는지 함께 기록한다." },
  { text: "단순 구현보다 구조, 유지보수성, 확장성을 함께 본다." },
  { text: "새로운 기술을 도입할 때는 장점뿐 아니라 비용과 리스크도 정리한다." },
  { text: "QA 관점에서 테스트 가능성과 디버깅 가능성을 함께 고려한다." },
  { text: "AI가 추천한 기술도 그대로 믿지 않고 공식 문서와 실제 동작으로 검증한다." },
  { text: "기술 스택 선택의 근거를 문서화하여 팀과 공유할 수 있어야 한다." },
];

export const designRules: AIRule[] = [
  { text: "컬러는 최소화하고 흑백/그레이 기반의 미니멀 톤을 유지한다." },
  { text: "불필요한 장식보다 타이포그래피, 여백, 인터랙션으로 분위기를 만든다." },
  { text: "사용자가 읽는 포트폴리오가 아니라 탐색하는 포트폴리오가 되도록 설계한다." },
  { text: "섹션마다 명확한 역할과 시각적 리듬을 둔다." },
  { text: "디자인 변경 시 기존 톤앤매너를 해치지 않는다." },
  { text: "레퍼런스를 그대로 복사하지 않고, 내 포트폴리오의 맥락에 맞게 재해석한다." },
  { text: "모바일에서도 동일한 정보 계층과 가독성을 유지한다." },
];

/* ── Archive Sections ── */

export type AILabArchiveSectionId =
  | "overview"
  | "operating-principles"
  | "prompt-playbook"
  | "claude-skills"
  | "agent-rag"
  | "responsible-ai"
  | "ai-tool-stack"
  | "media-note";

export interface AILabArchiveNavItem {
  id: AILabArchiveSectionId;
  label: string;
  eyebrow: string;
}

export const aiLabArchiveNavItems: AILabArchiveNavItem[] = [
  { id: "overview", label: "개요", eyebrow: "01" },
  { id: "operating-principles", label: "운영 원칙", eyebrow: "02" },
  { id: "prompt-playbook", label: "프롬프트", eyebrow: "03" },
  { id: "claude-skills", label: "Claude & Skills", eyebrow: "04" },
  { id: "agent-rag", label: "Agent / RAG", eyebrow: "05" },
  { id: "responsible-ai", label: "책임 있는 AI", eyebrow: "06" },
  { id: "ai-tool-stack", label: "AI 도구", eyebrow: "07" },
  { id: "media-note", label: "Media Note", eyebrow: "08" },
];

export interface AILabSummaryCard {
  title: string;
  description: string;
  tags: string[];
}

export const overviewSummaryCards: AILabSummaryCard[] = [
  {
    title: "지식 영역",
    description: "프롬프트 · Skills · Agent · RAG · 거버넌스 · 도구",
    tags: ["프롬프트", "Skills", "RAG"],
  },
  {
    title: "작업 규칙",
    description: "AI를 안전하고 효과적으로 사용하기 위한 개인 운영 원칙",
    tags: ["규칙", "검토", "안전"],
  },
  {
    title: "AI 도구 스택",
    description: "실제로 사용하고 비교해본 AI 도구 기록",
    tags: ["코딩", "글쓰기", "리서치"],
  },
  {
    title: "RAG 지식 베이스",
    description: "AI Assistant가 검색할 수 있도록 정리한 장문 노트",
    tags: ["문서", "출처", "Assistant"],
  },
];

export interface AILabTextCard {
  title: string;
  description: string;
  tags?: string[];
}

export const operatingPrinciples: AILabTextCard[] = [
  {
    title: "구조를 갖춰 질문하기",
    description: "목표, 맥락, 출력 형식을 함께 준다.",
    tags: ["목표", "맥락", "출력"],
  },
  {
    title: "불확실성을 드러내기",
    description: "모르면 추측하지 않고 확인되지 않은 내용을 분리한다.",
    tags: ["불확실성", "검토"],
  },
  {
    title: "AI 결과를 최종본이 아닌 초안으로 보기",
    description: "AI 결과는 초안으로 보고 사람이 검토한다.",
    tags: ["초안", "사람 검토"],
  },
  {
    title: "민감한 데이터는 넣지 않기",
    description: "회사 자료, 개인정보, 민감정보는 외부 AI에 넣지 않는다.",
    tags: ["개인정보", "보안"],
  },
  {
    title: "반복 지시는 자산화하기",
    description: "반복되는 지시는 템플릿, Claude Skill, 문서로 자산화한다.",
    tags: ["템플릿", "Skill"],
  },
  {
    title: "출처 기반 답변을 우선하기",
    description: "중요한 답변은 RAG나 출처 기반으로 검증한다.",
    tags: ["RAG", "출처"],
  },
];

export const promptComparison = {
  bad: "이거 정리해줘",
  better:
    "아래 문서를 읽고, 채용 담당자가 30초 안에 이해할 수 있도록 핵심 결론 3개와 근거 경험을 불릿으로 정리해줘.",
};

export const promptStructureCards: AILabTextCard[] = [
  { title: "목표", description: "무엇을 얻고 싶은지 한 문장으로 정의한다." },
  { title: "역할", description: "어떤 관점에서 판단해야 하는지 지정한다." },
  { title: "맥락", description: "배경, 대상 사용자, 참고 자료를 함께 제공한다." },
  { title: "제약", description: "하지 말아야 할 것과 유지할 기준을 분리한다." },
  { title: "출력 형식", description: "표, 불릿, JSON, 보고서 등 결과 형태를 고정한다." },
  { title: "검증", description: "불확실한 내용과 추가 확인 사항을 표시하게 한다." },
];

export const promptPatternCards: AILabTextCard[] = [
  {
    title: "초안 → 자기 점검 → 개선",
    description: "초안을 만들고, 부족한 점을 스스로 점검한 뒤 개선 버전을 요청한다.",
  },
  {
    title: "Few-shot 예시 제공",
    description: "원하는 톤과 형식을 보여주는 입출력 예시를 함께 제공한다.",
  },
  {
    title: "검증 가능한 답변만 요구",
    description: "문서에 있는 내용만 사용하고, 확인되지 않은 내용은 분리하게 한다.",
  },
  {
    title: "복잡한 작업을 단계로 나누기",
    description: "분석, 생성, 검토, 수정처럼 복잡한 작업을 단계로 나눈다.",
  },
];

export const claudeWorkflowCards: AILabTextCard[] = [
  {
    title: "프롬프트만 사용하는 방식",
    description: "매번 같은 규칙과 톤을 다시 설명한다. 빠르지만 결과가 흔들릴 수 있다.",
    tags: ["일회성", "수동"],
  },
  {
    title: "Skill 기반 작업 방식",
    description: "반복 업무의 절차, 금지사항, 출력 형식을 SKILL.md로 고정한다.",
    tags: ["재사용", "일관성"],
  },
];

export const skillChecklist: AILabTextCard[] = [
  {
    title: "사용 조건이 명확한가",
    description: "description에 언제 사용하는 Skill인지 명확하게 적었는가.",
  },
  {
    title: "반복 가능한 절차가 있는가",
    description: "SKILL.md에 절차, 금지사항, 출력 형식이 들어 있는가.",
  },
  {
    title: "참고 자료가 안전한가",
    description: "참고 자료나 스크립트의 안전성과 접근 범위를 확인했는가.",
  },
  {
    title: "반복 작업을 줄이는가",
    description: "반복 작업을 실제로 줄이고 결과 품질을 안정화하는가.",
  },
];

export const agentFlowSteps = [
  "사용자 질문",
  "의도 확인",
  "문서 검색",
  "관련 문맥 구성",
  "LLM 답변 생성",
  "출처 기반 답변",
] as const;

export const agentImplementationCards: AILabTextCard[] = [
  {
    title: "검색 전략",
    description: "BM25, Vector, Hybrid 중 데이터 성격에 맞는 검색 방식을 선택한다.",
    tags: ["BM25", "Vector", "Hybrid"],
  },
  {
    title: "인덱스 관리",
    description: "문서 인덱스를 build → save → load 흐름으로 관리한다.",
    tags: ["Build", "Save", "Load"],
  },
  {
    title: "Lazy Loading",
    description: "초기 로딩을 줄이기 위해 첫 요청 시점에 인덱스를 로드한다.",
    tags: ["성능"],
  },
  {
    title: "Top-k 조절",
    description: "속도와 문맥 품질 사이의 균형을 조절한다.",
    tags: ["검색", "품질"],
  },
  {
    title: "추적 가능성",
    description: "source, chunk id, score를 남겨 답변 근거를 추적한다.",
    tags: ["출처", "점수"],
  },
  {
    title: "사람 검토",
    description: "외부 발송, 삭제, 고위험 판단은 사람이 승인하도록 설계한다.",
    tags: ["승인", "안전"],
  },
];

export const responsibleAiChecks: string[] = [
  "AI 사용 사실을 사용자에게 알렸는가?",
  "의료, 금융, 채용, 교육처럼 고위험 영역인지 확인했는가?",
  "개인정보나 회사 내부자료가 입력되지 않는가?",
  "답변의 출처나 근거를 보여줄 수 있는가?",
  "사용자가 AI 답변을 최종 판단으로 오해하지 않게 했는가?",
  "외부 발송, 삭제, 결제, 평가 작업은 사람 승인 후 실행되는가?",
  "프롬프트 인젝션과 민감정보 노출 가능성을 점검했는가?",
  "모델, 프롬프트 버전, 참조 문서, 응답 로그를 기록할 수 있는가?",
];

export const responsibleAiReferenceChips = [
  "Korea AI Basic Act",
  "EU AI Act",
  "NIST AI RMF",
  "OWASP LLM Top 10",
  "Public AI Ethics Guidelines",
];

/* ── AI Tools ── */

export type AIToolFilter =
  | "All"
  | "Coding"
  | "Writing"
  | "Research"
  | "Design"
  | "Automation";

export const AI_TOOL_FILTERS: AIToolFilter[] = [
  "All",
  "Coding",
  "Writing",
  "Research",
  "Design",
  "Automation",
];

export interface AITool {
  name: string;
  category: string;
  usedFor: string;
  useCase: string;
  strengths: string[];
  limitations: string[];
  review: string;
  tags: string[];
  groups: Exclude<AIToolFilter, "All">[];
}

export const aiTools: AITool[] = [
  {
    name: "Claude Code",
    category: "코딩 에이전트",
    usedFor: "포트폴리오 개발, UI 리팩터링, 컴포넌트 구조 분석",
    useCase:
      "포트폴리오 사이트의 섹션 구조를 분석하고, UI/UX 개선 사항을 코드에 반영하는 데 사용했습니다. 특히 기존 구조를 먼저 탐색하게 하고, Plan Mode로 설계한 뒤 수정하도록 사용하는 방식이 효과적이었습니다.",
    strengths: [
      "큰 코드베이스 구조를 파악하는 데 강함",
      "수정 전 계획을 세우게 할 수 있음",
      "디자인/기능 요구사항을 긴 프롬프트로 전달하기 좋음",
    ],
    limitations: [
      "프롬프트가 불명확하면 기존 디자인을 과하게 바꾸는 경우가 있음",
      "실제 브라우저에서의 스크롤, 반응형, 레이아웃 문제는 사람이 직접 확인해야 함",
    ],
    review:
      "Claude Code는 단순 코드 생성기보다, 개발 흐름을 함께 설계하는 페어 프로그래밍 도구에 가깝다고 느꼈습니다. 하지만 좋은 결과를 얻으려면 \"무엇을 바꾸지 말아야 하는지\"까지 명확히 말해야 했습니다.",
    tags: ["Claude Code", "코딩 에이전트", "리팩터링", "포트폴리오"],
    groups: ["Coding", "Automation"],
  },
  {
    name: "ChatGPT",
    category: "생각 정리 / 프롬프트 설계",
    usedFor: "프롬프트 작성, 개념 구체화, 포트폴리오 전략, 기술 설명 정리",
    useCase:
      "Claude에게 전달할 개발 프롬프트를 정리하거나, 포트폴리오 섹션의 방향성, 문구, 구조를 구체화하는 데 사용했습니다.",
    strengths: [
      "모호한 생각을 구조화하는 데 강함",
      "한국어로 빠르게 방향성을 정리하기 좋음",
      "기획, 문장, 기술 설명을 연결해주기 좋음",
    ],
    limitations: [
      "실제 코드베이스를 직접 수정하지 않기 때문에 최종 구현은 별도 도구가 필요함",
      "최신 정보나 실제 사이트 상태는 확인이 필요함",
    ],
    review:
      "ChatGPT는 제가 하고 싶은 말을 개발자가 이해할 수 있는 요구사항으로 바꾸는 데 가장 많이 사용한 도구입니다.",
    tags: ["프롬프트", "기획", "글쓰기", "포트폴리오"],
    groups: ["Writing", "Research"],
  },
  {
    name: "Cursor",
    category: "AI 코드 에디터",
    usedFor: "코드 수정, 인라인 제안, 코드베이스 질의응답",
    useCase:
      "VS Code 기반의 AI 코드 에디터로, 코드 작성 중 인라인 제안과 코드베이스에 대한 질문을 통해 개발 속도를 높이는 데 활용했습니다.",
    strengths: [
      "에디터 내에서 바로 AI와 대화할 수 있어 컨텍스트 전환이 적음",
      "Tab 자동완성이 코드 흐름에 맞게 잘 동작함",
    ],
    limitations: [
      "긴 리팩토링이나 멀티파일 수정은 CLI 기반 도구가 더 효율적",
      "프로젝트 전체 구조를 파악하는 데는 한계가 있음",
    ],
    review:
      "Cursor는 빠른 코드 수정과 탐색에 좋지만, 구조적인 리팩토링에는 Claude Code와 병행하는 것이 효과적이었습니다.",
    tags: ["코드 에디터", "AI IDE", "자동완성"],
    groups: ["Coding"],
  },
  {
    name: "GitHub Copilot",
    category: "코드 자동완성",
    usedFor: "코드 자동완성, 보일러플레이트 생성, 테스트 초안 작성",
    useCase:
      "반복적인 코드 패턴이나 보일러플레이트를 빠르게 생성하고, 테스트 코드 초안을 작성하는 데 사용했습니다.",
    strengths: [
      "반복 패턴을 빠르게 자동완성해줌",
      "테스트 코드 초안 작성에 유용",
    ],
    limitations: [
      "컨텍스트를 벗어난 제안이 종종 있음",
      "복잡한 비즈니스 로직에서는 정확도가 떨어짐",
    ],
    review:
      "Copilot은 타이핑 속도를 줄이는 데는 좋지만, 코드의 의도를 이해하고 설계하는 것은 여전히 개발자 몫입니다.",
    tags: ["자동완성", "VS Code", "GitHub"],
    groups: ["Coding"],
  },
  {
    name: "Perplexity",
    category: "AI 검색 엔진",
    usedFor: "기술 리서치, 공식 문서 확인, 비교 분석",
    useCase:
      "기술 비교, 라이브러리 선택, 에러 해결 시 빠르게 최신 정보를 검색하고 요약된 답변을 얻는 데 활용했습니다.",
    strengths: [
      "출처가 명확한 답변을 제공",
      "기술 문서와 블로그를 빠르게 요약해줌",
    ],
    limitations: [
      "깊은 코드 레벨의 디버깅에는 부족함",
      "한국어 자료 검색 범위가 제한적일 수 있음",
    ],
    review:
      "Perplexity는 Google 검색을 대체하기보다, 기술 리서치의 첫 단계를 빠르게 만들어주는 도구입니다.",
    tags: ["검색", "리서치", "문서 확인"],
    groups: ["Research"],
  },
  {
    name: "Suno",
    category: "음악 생성",
    usedFor: "포트폴리오 배경음악과 분위기 탐색",
    useCase:
      "포트폴리오에 어울리는 동물의 숲 같은 분위기의 BGM이나 감성적인 배경음악을 실험하기 위해 사용했습니다.",
    strengths: [
      "짧은 설명만으로 분위기 있는 음악을 빠르게 만들 수 있음",
      "포트폴리오의 감정적 톤을 실험하기 좋음",
    ],
    limitations: [
      "원하는 분위기를 정확히 맞추려면 여러 번 수정해야 함",
      "실제 웹사이트에 넣을 때는 저작권, 로딩 속도, 사용자 경험을 고려해야 함",
    ],
    review:
      "Suno는 포트폴리오를 단순한 웹페이지가 아니라 하나의 경험으로 만들 수 있는 가능성을 보여준 도구였습니다.",
    tags: ["음악 AI", "무드", "포트폴리오 경험"],
    groups: ["Design"],
  },
  {
    name: "Midjourney",
    category: "이미지 생성",
    usedFor: "컨셉 아트, UI 무드보드, 비주얼 방향 탐색",
    useCase:
      "포트폴리오의 비주얼 방향성을 탐색하거나, 섹션별 분위기를 시각적으로 실험하는 데 사용했습니다.",
    strengths: [
      "고퀄리티의 이미지를 빠르게 생성",
      "디자인 레퍼런스와 무드보드 작성에 유용",
    ],
    limitations: [
      "정확한 UI 요소나 텍스트 생성에는 한계",
      "원하는 스타일을 맞추려면 프롬프트 반복 실험이 필요",
    ],
    review:
      "Midjourney는 '이런 느낌이었으면 좋겠다'를 시각화하는 데 가장 빠른 도구였습니다.",
    tags: ["이미지 AI", "디자인", "비주얼"],
    groups: ["Design"],
  },
  {
    name: "v0 by Vercel",
    category: "UI 생성",
    usedFor: "React 컴포넌트 프로토타이핑, UI 디자인을 코드로 변환",
    useCase:
      "UI 컴포넌트의 초안을 빠르게 생성하고, shadcn/ui 기반의 디자인 패턴을 탐색하는 데 사용했습니다.",
    strengths: [
      "shadcn/ui + Tailwind 기반으로 바로 사용 가능한 코드 생성",
      "디자인 프로토타이핑이 빠름",
    ],
    limitations: [
      "실제 프로젝트에 통합할 때 구조 조정이 필요",
      "복잡한 인터랙션이나 상태 관리는 직접 구현해야 함",
    ],
    review:
      "v0는 UI 초안을 만들고 아이디어를 빠르게 검증하는 데 유용하지만, 프로덕션 코드로 바로 쓰기엔 추가 작업이 필요합니다.",
    tags: ["UI", "Vercel", "프로토타이핑", "React"],
    groups: ["Design", "Coding"],
  },
  {
    name: "Image to Code Tool",
    category: "이미지 기반 UI 생성",
    usedFor: "레퍼런스 이미지를 React + Tailwind UI로 변환",
    useCase:
      "실사 ID badge 이미지나 포트폴리오 UI 레퍼런스를 코드로 변환하는 실험에 사용했습니다.",
    strengths: [
      "이미지 기반 레이아웃을 빠르게 코드로 옮겨볼 수 있음",
      "React + Tailwind 구조를 빠르게 시작하기 좋음",
    ],
    limitations: [
      "실제 이미지의 질감, 그림자, 플라스틱 느낌 같은 디테일은 완벽히 재현하기 어려움",
      "결과물이 비슷해 보여도 세부 비율과 반응형은 직접 수정해야 함",
    ],
    review:
      'Image to Code 도구는 "초안 생성"에는 좋지만, 완성도 높은 UI를 만들기 위해서는 사람이 디자인 감각과 디테일을 계속 조정해야 한다고 느꼈습니다.',
    tags: ["이미지 to 코드", "React", "Tailwind", "UI 실험"],
    groups: ["Design", "Coding"],
  },
  {
    name: "Notion AI",
    category: "생산성 / 글쓰기",
    usedFor: "문서 정리, 회의록 요약, 작업 관리",
    useCase:
      "프로젝트 문서 정리, 회의록 요약, 작업 항목 관리를 Notion AI로 보조하여 효율을 높였습니다.",
    strengths: [
      "Notion 워크스페이스 내에서 바로 사용할 수 있어 워크플로우가 끊기지 않음",
      "문서 요약과 정리에 특히 강함",
    ],
    limitations: [
      "코드 생성이나 기술적 분석에는 한계가 있음",
      "복잡한 프롬프트 기반 작업에는 전용 AI 도구가 더 적합",
    ],
    review:
      "Notion AI는 생각을 정리하는 도구로는 훌륭하지만, 기술 작업에는 보조적인 역할에 가깝습니다.",
    tags: ["Notion", "생산성", "문서화"],
    groups: ["Writing", "Automation"],
  },
  {
    name: "Wrtn / 뤼튼",
    category: "한국어 AI 글쓰기 도구",
    usedFor: "한국어 문장 정리, 아이디어 초안, 콘텐츠 다듬기",
    useCase:
      "한국어 기반의 문장 정리, 아이디어 초안, 지원서나 포트폴리오 문구를 다듬는 데 사용했습니다.",
    strengths: [
      "한국어 문장 생성과 톤 조절에 접근성이 좋음",
      "빠르게 초안을 만들기 좋음",
    ],
    limitations: [
      "깊은 기술적 맥락이나 코드 기반 문제 해결에는 한계가 있음",
      "결과물이 일반적인 문장처럼 느껴질 때가 있어 직접 수정이 필요함",
    ],
    review:
      "뤼튼은 한국어 초안 작성에는 편하지만, 기술 포트폴리오나 개발 맥락에서는 제 경험과 생각을 직접 더해야 완성도가 올라간다고 느꼈습니다.",
    tags: ["한국어 글쓰기", "초안", "AI 글쓰기"],
    groups: ["Writing"],
  },
  {
    name: "Claude (Web)",
    category: "AI 어시스턴트",
    usedFor: "장문 분석, 코드 리뷰, 아키텍처 논의",
    useCase:
      "긴 코드를 분석하거나, 아키텍처 설계에 대한 장문의 토론, 복잡한 기술 개념 설명에 사용했습니다.",
    strengths: [
      "긴 컨텍스트를 유지하면서 깊이 있는 분석 가능",
      "코드 리뷰와 아키텍처 피드백이 체계적",
    ],
    limitations: [
      "실시간 코드 실행이나 파일 수정은 불가",
      "프로젝트 상태를 직접 확인할 수 없어 매번 컨텍스트를 제공해야 함",
    ],
    review:
      "Claude Web은 깊이 있는 사고가 필요한 작업에 적합하고, Claude Code와 역할을 분리해서 사용하면 효과적입니다.",
    tags: ["Claude", "분석", "아키텍처", "코드 리뷰"],
    groups: ["Writing", "Research"],
  },
  {
    name: "Gemini",
    category: "멀티모달 AI",
    usedFor: "이미지 분석, 멀티모달 작업, Google 생태계 연동",
    useCase:
      "이미지와 텍스트를 함께 분석하거나, Google 생태계와 연동된 작업에 활용했습니다.",
    strengths: [
      "이미지, 영상, 텍스트를 동시에 처리 가능",
      "Google 서비스와의 통합이 자연스러움",
    ],
    limitations: [
      "코딩 전용 도구에 비해 코드 생성 품질이 다소 낮음",
      "한국어 맥락 이해가 다른 도구에 비해 부족한 경우가 있음",
    ],
    review:
      "Gemini는 멀티모달 작업에서 가능성을 보여주지만, 코드 중심 작업에서는 Claude나 ChatGPT가 더 효율적이었습니다.",
    tags: ["멀티모달", "Google", "이미지 분석"],
    groups: ["Research", "Design"],
  },
];

/* ── Media Notes ── */

export interface MediaNote {
  id: string;
  sourceType: "YouTube" | "Article" | "Reference";
  url: string;
  title: string;
  topic: string;
  summary: string;
  myTake: string;
  insight: string;
  appliedTo: string;
  keywords: string[];
}

/** Extract YouTube video ID from URL */
export function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?#]+)/
  );
  return match?.[1] ?? null;
}

export const mediaNotes: MediaNote[] = [
  {
    id: "ai-agent-engineering-workflow",
    sourceType: "YouTube",
    url: "https://www.youtube.com/watch?v=KPovWIJGomc",
    title: "AI Agent Engineering Workflow",
    topic: "AI Agent / Engineering Mindset / Workflow",
    summary:
      "AI Agent를 효과적으로 활용하기 위한 엔지니어링 마인드셋과 워크플로우에 대한 내용입니다. 단순 사용이 아니라 시스템적으로 AI를 활용하는 방법을 다룹니다.",
    myTake:
      "단순히 AI에게 질문하는 것이 아니라, 작업 기준과 검증 절차를 설계하는 것이 중요하다는 점을 체감했습니다.",
    insight:
      "AI Agent는 단순 답변 도구보다 반복되는 작업 흐름과 의사결정 구조를 정리할 때 더 큰 가치가 있습니다.",
    appliedTo:
      "Claude Code를 사용할 때 구조 탐색 → Plan Mode → 작은 단위 수정 → 브라우저 검증 순서로 요청하는 규칙에 반영했습니다.",
    keywords: ["AI Agent", "Claude Code", "Workflow", "Evaluation", "Productivity"],
  },
];

/* ── Category → Data Mapping ── */

export const rulesMap: Record<string, AIRule[]> = {
  Principles: principles,
  "Claude.md": claudeMdRules,
  "Skills Rules": skillsRules,
  "Design Rules": designRules,
};
