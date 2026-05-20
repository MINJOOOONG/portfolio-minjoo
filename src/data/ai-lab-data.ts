/* ── AI Lab Data ── */

export type AILabCategory =
  | "Principles"
  | "Claude.md"
  | "Skills Rules"
  | "Design Rules"
  | "AI Tools"
  | "Learning Notes";

export const AI_LAB_CATEGORIES: AILabCategory[] = [
  "Principles",
  "Claude.md",
  "Skills Rules",
  "Design Rules",
  "AI Tools",
  "Learning Notes",
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
];

export const claudeMdRules: AIRule[] = [
  { text: "작업 전 반드시 현재 프로젝트 구조를 먼저 탐색하게 한다." },
  { text: "바로 수정하지 말고 Plan Mode로 먼저 설계하게 한다." },
  { text: "기존 디자인과 로직을 망가뜨리지 말라는 제한 조건을 명확히 준다." },
  { text: "수정 범위를 작게 나누고, 변경 이유를 설명하게 한다." },
  { text: "UI 수정 시 데스크톱/태블릿/모바일 반응형을 항상 함께 검토하게 한다." },
  { text: "기능 구현 후 regression risk를 점검하게 한다." },
  { text: '"기존 톤 유지", "불필요한 기능 추가 금지", "한 번에 과하게 바꾸지 않기" 같은 작업 제한을 명확히 둔다.' },
];

export const skillsRules: AIRule[] = [
  { text: "기술 이름만 나열하지 않고, 어떤 문제를 해결하기 위해 사용했는지 함께 기록한다." },
  { text: "단순 구현보다 구조, 유지보수성, 확장성을 함께 본다." },
  { text: "새로운 기술을 도입할 때는 장점뿐 아니라 비용과 리스크도 정리한다." },
  { text: "QA 관점에서 테스트 가능성과 디버깅 가능성을 함께 고려한다." },
  { text: "AI가 추천한 기술도 그대로 믿지 않고 공식 문서와 실제 동작으로 검증한다." },
];

export const designRules: AIRule[] = [
  { text: "컬러는 최소화하고 흑백/그레이 기반의 미니멀 톤을 유지한다." },
  { text: "불필요한 장식보다 타이포그래피, 여백, 인터랙션으로 분위기를 만든다." },
  { text: "사용자가 읽는 포트폴리오가 아니라 탐색하는 포트폴리오가 되도록 설계한다." },
  { text: "섹션마다 명확한 역할과 시각적 리듬을 둔다." },
  { text: "디자인 변경 시 기존 톤앤매너를 해치지 않는다." },
  { text: "레퍼런스를 그대로 복사하지 않고, 내 포트폴리오의 맥락에 맞게 재해석한다." },
];

/* ── AI Tools ── */

export interface AITool {
  name: string;
  category: string;
  usedFor: string;
  useCase: string;
  strengths: string[];
  limitations: string[];
  review: string;
  tags: string[];
}

export const aiTools: AITool[] = [
  {
    name: "Claude Code",
    category: "Coding Agent",
    usedFor: "Portfolio development, UI refactoring, component structure analysis",
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
    tags: ["Claude Code", "Coding Agent", "Refactoring", "Portfolio"],
  },
  {
    name: "ChatGPT",
    category: "Thinking Partner / Prompt Design",
    usedFor: "Prompt writing, concept refinement, portfolio strategy, technical explanation",
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
    tags: ["Prompt", "Planning", "Writing", "Portfolio"],
  },
  {
    name: "Suno",
    category: "Music Generation",
    usedFor: "Portfolio background music exploration",
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
    tags: ["Music AI", "Mood", "Portfolio Experience"],
  },
  {
    name: "Image to Code Tool",
    category: "UI Generation / Image to Code",
    usedFor: "Reference image to React + Tailwind UI conversion",
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
    tags: ["Image to Code", "React", "Tailwind", "UI Experiment"],
  },
  {
    name: "Wrtn / 뤼튼",
    category: "Korean AI Writing Tool",
    usedFor: "Korean writing, idea drafting, content refinement",
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
    tags: ["Korean Writing", "Drafting", "AI Writing"],
  },
];

/* ── Learning Notes ── */

export interface LearningNote {
  sourceType: "YouTube" | "Article" | "Reference";
  url: string;
  topic: string;
  summary: string;
  myTake: string;
  appliedTo: string;
  keywords: string[];
}

export const learningNotes: LearningNote[] = [
  {
    sourceType: "YouTube",
    url: "https://www.youtube.com/watch?v=KPovWIJGomc",
    topic: "AI Agent / Engineering Mindset / Workflow",
    summary:
      "AI Agent를 효과적으로 활용하기 위한 엔지니어링 마인드셋과 워크플로우에 대한 영상입니다.",
    myTake:
      "단순히 AI에게 질문하는 것이 아니라, 작업 기준과 검증 절차를 설계하는 것이 중요하다는 점을 체감했습니다.",
    appliedTo:
      "Claude Code 규칙, 프롬프트 작성 방식, 포트폴리오 개선 방식에 적용했습니다.",
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
