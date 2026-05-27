/* ── AI Lab Data ── */

/* ── Section Navigation ── */

export type AILabArchiveSectionId =
  | "overview"
  | "prompt-engineering"
  | "claude-skills"
  | "agent-patterns"
  | "ai-governance"
  | "company-guides"
  | "ai-tool-stack"
  | "media-note";

export interface AILabArchiveNavItem {
  id: AILabArchiveSectionId;
  label: string;
  eyebrow: string;
}

export const aiLabArchiveNavItems: AILabArchiveNavItem[] = [
  { id: "overview", label: "개요", eyebrow: "01" },
  { id: "prompt-engineering", label: "프롬프트 엔지니어링", eyebrow: "02" },
  { id: "claude-skills", label: "Claude Skills", eyebrow: "03" },
  { id: "agent-patterns", label: "에이전트 패턴", eyebrow: "04" },
  { id: "ai-governance", label: "법률 & 거버넌스", eyebrow: "05" },
  { id: "company-guides", label: "회사별 가이드", eyebrow: "06" },
  { id: "ai-tool-stack", label: "AI 도구", eyebrow: "07" },
  { id: "media-note", label: "Media Note", eyebrow: "08" },
];

/* ── Shared Types ── */

export interface AILabSummaryCard {
  title: string;
  description: string;
  tags: string[];
}

export interface AILabTextCard {
  title: string;
  description: string;
  tags?: string[];
}

export interface TableRow {
  cells: string[];
}

export interface DataTableData {
  headers: string[];
  rows: TableRow[];
}

/* ── 01. Overview ── */

export const overviewSummaryCards: AILabSummaryCard[] = [
  {
    title: "프롬프트 엔지니어링",
    description: "AI에게 명확한 지시를 전달하는 구조와 패턴 정리",
    tags: ["프롬프트", "CoT", "Few-shot"],
  },
  {
    title: "Claude Skills",
    description: "반복 업무를 SKILL.md로 자산화하는 방법",
    tags: ["Skills", "재사용", "일관성"],
  },
  {
    title: "에이전트 구현 패턴",
    description: "RAG, 구조화된 출력, 상태 관리, 워크플로우 설계",
    tags: ["RAG", "Agent", "Pydantic"],
  },
  {
    title: "AI 법률 & 거버넌스",
    description: "한국 AI 기본법, EU AI Act, NIST AI RMF 핵심 정리",
    tags: ["법률", "거버넌스", "체크리스트"],
  },
  {
    title: "회사별 사용 가이드",
    description: "OpenAI, Anthropic, Google, Microsoft, GitHub 공식 권장 방식",
    tags: ["ChatGPT", "Claude", "Gemini"],
  },
  {
    title: "AI 도구 & Media Note",
    description: "실제로 사용하고 비교한 도구와 학습 기록",
    tags: ["도구 비교", "학습 기록"],
  },
];

/* ── 02. Prompt Engineering (md Part 1) ── */

export const promptTermsTable: DataTableData = {
  headers: ["용어", "설명"],
  rows: [
    { cells: ["LLM", "대규모 언어 모델. ChatGPT, Claude, Gemini 등이 대표적입니다."] },
    { cells: ["프롬프트", "AI에게 전달하는 지시문. 질문, 요청, 맥락, 조건 등을 포함합니다."] },
    { cells: ["토큰", "LLM이 텍스트를 처리하는 최소 단위. 한국어 한 글자는 보통 2~3토큰입니다."] },
    { cells: ["Chain-of-Thought", "생각의 과정을 단계별로 명시하는 프롬프트 기법. 복잡한 논리적 작업에서 정확도를 높입니다."] },
    { cells: ["Few-shot", "프롬프트에 입출력 예시를 함께 제공하는 기법. 원하는 형식과 톤을 더 정확하게 따릅니다."] },
    { cells: ["Zero-shot", "예시 없이 지시문만으로 작업을 요청하는 기법. 간단한 작업에 적합합니다."] },
    { cells: ["할루시네이션", "AI가 그럴듯하지만 사실이 아닌 정보를 생성하는 현상입니다."] },
    { cells: ["RAG", "외부 데이터를 검색한 뒤 LLM에 전달하여 답변을 생성하는 방식입니다."] },
    { cells: ["Skill", "Claude에게 반복 업무를 일관되게 수행하도록 가르치는 맞춤형 지침 패키지입니다."] },
  ],
};

export const promptCautionCards: AILabTextCard[] = [
  {
    title: '"정리해줘 / 분석해줘"는 거의 실패합니다',
    description: 'AI에게는 행동 + 결과물이 함께 주어져야 합니다. "기획안 분석해줘"가 아니라, "리스크 요소만 5개 뽑아서 각 항목별로 한 줄 코멘트해 주세요"처럼 구체화합니다.',
  },
  {
    title: "모르면 '모른다고 말하게' 시켜야 합니다",
    description: 'AI는 추측해서라도 답하려는 성향이 있습니다. "정보가 부족하면 억지로 결론을 내리지 말고 알려주세요" 한 문장만 추가해도 할루시네이션이 줄어듭니다.',
  },
  {
    title: "금지보다 대안을 주는 것이 효과적입니다",
    description: '"너무 길게 쓰지 마세요" 대신 "각 항목은 최대 2문장으로 작성해 주세요"처럼 어떻게 하면 되는지를 알려줍니다.',
  },
  {
    title: "한 번에 여러 일을 시키지 않습니다",
    description: "복잡한 요청은 1단계: 초안 생성 → 2단계: 누락/문제점 체크 → 3단계: 수정 반영처럼 나누면 정확도가 올라갑니다.",
  },
  {
    title: "모델과 작업에 따라 전략이 달라져야 합니다",
    description: "같은 프롬프트라도 모델 종류, reasoning 모델 여부, API/웹 UI 사용 여부에 따라 결과가 다릅니다. 작업별로 작은 테스트를 만들어 비교합니다.",
  },
];

export const promptComparison = {
  bad: "이거 정리해줘",
  better:
    "아래 문서를 읽고, 채용 담당자가 30초 안에 이해할 수 있도록 핵심 결론 3개와 근거 경험을 불릿으로 정리해줘.",
};

export const promptStructureCards: AILabTextCard[] = [
  { title: "역할", description: "누구의 관점에서 일해야 하는지 지정합니다." },
  { title: "목표", description: "무엇을 해야 하는지 한 문장으로 정의합니다." },
  { title: "맥락", description: "배경, 대상 사용자, 참고 자료를 함께 제공합니다." },
  { title: "출력 조건", description: "형식, 분량, 톤 등 결과 형태를 고정합니다." },
  { title: "생각 순서", description: "복잡한 작업에서 단계별 사고 과정을 지정합니다." },
  { title: "검증", description: "불확실한 내용과 추가 확인 사항을 표시하게 합니다." },
];

export const promptAdvancedCards: AILabTextCard[] = [
  {
    title: "Chain-of-Thought로 생각 순서 지정",
    description: "기획 검토, 문제 분석 같은 논리적 작업에서는 \"1. 문제 정의 → 2. 원인 정리 → 3. 개선 방향 도출\"처럼 단계를 명시합니다.",
    tags: ["CoT", "논리"],
  },
  {
    title: "출력 형식은 '설명'보다 '틀'이 효과적",
    description: "말로 설명하기보다 \"이슈: / 영향: / 대응 방안:\"처럼 출력 구조를 그대로 보여주는 편이 훨씬 효과적입니다.",
    tags: ["출력 형식", "템플릿"],
  },
  {
    title: "마크다운으로 구조화된 지시",
    description: "# 제목, ## 소제목, **볼드**, `인라인 코드`, - 리스트, 1. 번호 리스트를 활용하면 LLM이 구조를 더 잘 파악합니다.",
    tags: ["마크다운", "구조화"],
  },
];

export const promptPatternCards: AILabTextCard[] = [
  {
    title: "초안 → 자기 점검 → 개선",
    description: "초안을 만들고, 부족한 점을 스스로 점검한 뒤 개선 버전을 요청합니다.",
    tags: ["CoT", "반복 개선"],
  },
  {
    title: "Few-shot 예시 제공",
    description: "원하는 톤과 형식을 보여주는 입출력 예시를 함께 제공합니다.",
    tags: ["Few-shot", "예시"],
  },
  {
    title: "검증 가능한 답변만 요구",
    description: '"문서에 없는 내용은 추측하지 말고 확인되지 않음이라고 표시해 주세요"를 함께 지시합니다.',
    tags: ["검증", "출처"],
  },
  {
    title: "복잡한 작업을 단계로 나누기",
    description: "분석, 생성, 검토, 수정처럼 복잡한 작업을 단계로 나눕니다.",
    tags: ["체이닝", "단계"],
  },
];

export const imagePromptCards: AILabTextCard[] = [
  { title: "시각적 대상은 구체적 명사로", description: "크기, 재질, 위치 중 하나만 추가해도 결과가 크게 달라집니다." },
  { title: "배경과 공간을 반드시 지정", description: "배경을 쓰지 않으면 AI가 임의로 채웁니다. \"단순한 배경\"이 더 잘 동작합니다." },
  { title: "스타일은 시각적 결과물 기준", description: "감정 표현보다 \"미니멀 일러스트\", \"수채화 텍스처\" 같은 시각적 설명이 효과적입니다." },
  { title: "구도와 시점 추가", description: "한 줄만 있어도 충분합니다. 쓰지 않으면 불필요한 크롭이 생길 수 있습니다." },
  { title: "색감과 조명은 분위기 결정", description: "마지막에 덧붙이는 요소로 생각하면 됩니다." },
  { title: "제외 조건을 미리 명시", description: "의도하지 않은 소품이나 워터마크 같은 요소를 제거합니다." },
];

/* ── 03. Claude Skills (md Part 2) ── */

export const skillComparisonTable: DataTableData = {
  headers: ["", "프롬프트만 사용", "Skill 사용"],
  rows: [
    { cells: ["설정 방식", "매번 대화마다 반복 입력", "한 번 만들어두면 자동 적용"] },
    { cells: ["일관성", "매번 결과가 조금씩 달라질 수 있음", "항상 같은 기준으로 동일한 품질"] },
    { cells: ["팀 공유", "각자가 따로 관리", "팀 전체에 동일하게 배포 가능"] },
    { cells: ["전문성", "일반적인 수준의 도움", "우리 조직만의 방식을 학습한 전문 도움"] },
    { cells: ["업무 복잡도", "단순 작업에 적합", "복잡한 다단계 워크플로우도 처리 가능"] },
  ],
};

export const skillAdvantageCards: AILabTextCard[] = [
  { title: "반복 업무를 자동화합니다", description: "보고서, 회의록 등을 한 번 Skill로 만들어두면 Claude가 알아서 처리합니다." },
  { title: "조직의 노하우를 저장합니다", description: "업무 방식, 가이드라인, 내부 규정 등을 담아두면 누가 쓰더라도 동일한 퀄리티를 냅니다." },
  { title: "코딩 없이도 만들 수 있습니다", description: "마크다운으로 작성할 수 있어서 개발자가 아니어도 충분히 만들 수 있습니다." },
  { title: "필요할 때만 자동으로 켜집니다", description: "Claude가 현재 요청에 맞는 것만 골라 사용합니다." },
];

export const skillCreationSteps: AILabTextCard[] = [
  { title: "1. 대화로 설명하기", description: "Claude Desktop 또는 CLI에서 새 대화를 시작하고, 만들 Skill에 대해 설명합니다." },
  { title: "2. Q&A 반복", description: "Claude와 질문과 답변을 반복하며 충분히 만족스러운 결과가 나올 때까지 피드백합니다." },
  { title: "3. Skill 파일 생성 및 등록", description: "생성된 Skill 파일을 등록하면, 이후 관련 요청이 있을 때 자동으로 참고합니다." },
];

export const skillChecklist: AILabTextCard[] = [
  { title: "사용 조건이 명확한가", description: "description에 언제 사용하는 Skill인지 명확하게 적었는가." },
  { title: "반복 가능한 절차가 있는가", description: "SKILL.md에 절차, 금지사항, 출력 형식이 들어 있는가." },
  { title: "참고 자료가 안전한가", description: "참고 자료나 스크립트의 안전성과 접근 범위를 확인했는가." },
  { title: "반복 작업을 줄이는가", description: "반복 작업을 실제로 줄이고 결과 품질을 안정화하는가." },
];

export const skillFaqItems: { question: string; answer: string }[] = [
  {
    question: "Skill을 사용하면 Claude의 응답 속도가 느려지지 않나요?",
    answer: "아닙니다. Claude는 현재 질문과 관련 있는 Skill만 선별해서 사용합니다. Skill이 여러 개 등록되어 있어도 응답 속도에 큰 영향을 주지 않습니다.",
  },
  {
    question: "Skill을 사용하면 Claude의 기본 답변 방식이 달라지나요?",
    answer: "Skill은 특정 작업을 수행할 때 참고하는 추가 지침 역할입니다. 일반적인 질문에는 기존과 동일하게 답변합니다.",
  },
  {
    question: "어떤 Skill이 사용됐는지 알 수 있나요?",
    answer: "Claude는 상황에 따라 적절한 Skill을 자동 선택합니다. 특정 Skill을 반드시 사용하고 싶다면 명령어 방식으로 직접 지정할 수도 있습니다.",
  },
];

/* ── 04. Agent Patterns (md Part 3) ── */

export const agentFlowSteps = [
  "사용자 질문",
  "의도 확인",
  "문서 검색",
  "관련 문맥 구성",
  "LLM 답변 생성",
  "출처 기반 답변",
] as const;

export const promptDesignCards: AILabTextCard[] = [
  {
    title: "프롬프트 파일 분리",
    description: "역할, 목표, 입력 조건, 출력 형식을 분리해 관리합니다. 버전 관리와 A/B 테스트가 쉬워집니다.",
    tags: ["파일 분리", "버전 관리"],
  },
  {
    title: "Few-shot 프롬프트",
    description: "과거 결과물, 정답 예시, 실패 예시를 함께 제공하면 출력 품질이 안정됩니다.",
    tags: ["Few-shot", "예시"],
  },
  {
    title: "2단계 체이닝 (step-by-step)",
    description: "Stage 1에서 중간 결과를 만들고, Stage 2에서 최종 응답을 생성합니다. 정확도가 높지만 비용이 늘어납니다.",
    tags: ["체이닝", "정확도"],
  },
  {
    title: "1단계 직접 호출 (direct)",
    description: "중간 분석과 최종 응답을 한 번에 생성합니다. 빠르고 저렴하지만 정확도가 낮을 수 있습니다.",
    tags: ["속도", "비용"],
  },
];

export const structuredOutputCards: AILabTextCard[] = [
  {
    title: "Pydantic으로 타입 검증",
    description: "Input, IntermediateResult, FinalOutput을 명확한 타입으로 정의합니다. 타입 안정성, 자동 문서화, IDE 지원이 장점입니다.",
    tags: ["Pydantic", "타입"],
  },
  {
    title: "Tool Use 방식 (Anthropic)",
    description: "tools 리스트를 만들고, 각 tool에 input_schema를 지정합니다. tool_choice로 어떤 tool을 사용할지 명시합니다.",
    tags: ["Anthropic", "Tool Use"],
  },
  {
    title: "Response Format 방식 (OpenAI)",
    description: "chat.completions.parse를 호출할 때 response_format에 Pydantic 모델을 전달합니다.",
    tags: ["OpenAI", "Response Format"],
  },
];

export const ragSearchTable: DataTableData = {
  headers: ["방식", "장점", "단점", "사용 케이스"],
  rows: [
    { cells: ["BM25", "빠르고 키워드 매칭이 정확", "의미를 이해하지 못함", "로그, 코드 심볼 검색"] },
    { cells: ["Vector", "의미 기반으로 검색", "느리고 임베딩이 필요", "문서 검색, QA"] },
    { cells: ["Hybrid", "두 장점을 결합", "복잡함", "고도화된 RAG"] },
  ],
};

export const ragImplementationCards: AILabTextCard[] = [
  { title: "인덱스 관리", description: "build_index로 구축 → save_index로 저장 → load_index로 빠르게 로드합니다.", tags: ["Build", "Save", "Load"] },
  { title: "Lazy Loading", description: "초기화할 때 검색 엔진만 만들고, 실제 인덱스는 첫 요청 시점에 로드합니다.", tags: ["성능"] },
  { title: "Top-k 조절", description: "속도와 문맥 품질 사이의 균형을 조절합니다. 작은 값은 빠르지만 문맥이 부족합니다.", tags: ["검색", "품질"] },
  { title: "추적 가능성", description: "source, chunk id, score를 남겨 답변 근거를 추적합니다.", tags: ["출처", "점수"] },
  { title: "사람 검토", description: "외부 발송, 삭제, 고위험 판단은 사람이 승인하도록 설계합니다.", tags: ["승인", "안전"] },
];

export const frameworkSelectionTable: DataTableData = {
  headers: ["상황", "추천", "이유"],
  rows: [
    { cells: ["Tool Calling 필요", "Google ADK, CrewAI", "Tool 지원이 강력"] },
    { cells: ["멀티 에이전트 협업", "CrewAI", "에이전트 간 통신이 내장"] },
    { cells: ["복잡한 워크플로우", "LangGraph", "State 관리, 분기 처리"] },
    { cells: ["간단한 작업", "Zero-shot", "토큰 절약"] },
    { cells: ["정확도 중요", "체이닝 (2단계)", "단계별 검증"] },
    { cells: ["문서 QA", "Embedding (Vector)", "의미 기반 검색"] },
    { cells: ["키워드 검색", "BM25", "정확한 매칭"] },
  ],
};

export const agentBestPractices: string[] = [
  "프롬프트는 파일로 분리합니다 — 버전 관리가 쉽고 A/B 테스트가 가능합니다",
  "구조화 출력을 사용합니다 — Pydantic으로 타입 안정성을 보장합니다",
  "파라미터는 필수와 선택을 구분합니다 — 필수는 없으면 동작 불가",
  "응답에 재현 정보를 포함합니다 — result + request + usage로 디버깅 용이",
  "상태와 로그를 남깁니다 — 입력, 문서, 모델, 프롬프트 버전을 기록",
  "사람 검토 지점을 둡니다 — 고위험 결정, 외부 발송은 사람 승인",
  "스키마와 프롬프트를 함께 버전 관리합니다 — 출력 구조 변경 시 후속 단계가 깨질 수 있음",
];

/* ── 05. AI Governance (md Parts 4 + 5) ── */

export const koreaAiLawOverview: AILabTextCard[] = [
  {
    title: "한국 인공지능기본법",
    description: "정식 명칭: 인공지능 발전과 신뢰 기반 조성 등에 관한 기본법. 2024년 12월 26일 국회 통과, 2026년 1월 22일 시행. 규제보다 진흥에 무게를 두고 필요 최소한의 규제 체계를 도입.",
    tags: ["2026년 시행", "진흥 중심"],
  },
  {
    title: "고영향 AI",
    description: "사람의 생명, 신체 안전, 기본권에 중대한 영향을 미치는 AI 시스템. 에너지, 보건의료, 교통, 금융, 교육, 고용, 공공안전 등 11개 분야.",
    tags: ["11개 분야", "기본권"],
  },
  {
    title: "생성형 AI 의무",
    description: "결과물에 워터마크 표시, 딥페이크 등 실제와 구분 어려운 결과물은 명확히 공지, AI 기반 서비스라는 사실을 사전 고지.",
    tags: ["워터마크", "사전 고지"],
  },
  {
    title: "과태료 및 계도 기간",
    description: "최대 3천만원 이하. 법 시행 후 최소 1년 이상 계도 기간(실제 부과는 빨라도 2027년 이후). 해외 기업 국내 대리인 지정 의무.",
    tags: ["3천만원", "계도 1년"],
  },
];

export const euAiActRiskTable: DataTableData = {
  headers: ["단계", "위험 수준", "규제 방식", "예시"],
  rows: [
    { cells: ["금지", "허용 불가", "완전 금지", "사회점수제, 조작적 AI, 실시간 원격 생체인식"] },
    { cells: ["고위험", "높음", "엄격한 규제", "신용평가, 채용 심사, 생체인식, 핵심 인프라"] },
    { cells: ["제한적 위험", "제한적", "투명성 의무", "챗봇, 딥페이크, AI 생성 콘텐츠"] },
    { cells: ["최소 위험", "낮음", "의무 없음", "스팸 필터, AI 게임, 대부분의 상용 AI"] },
  ],
};

export const euAiActFinesTable: DataTableData = {
  headers: ["위반 유형", "벌금"],
  rows: [
    { cells: ["금지 AI 운영", "최대 3,500만 유로 또는 전세계 매출 7%"] },
    { cells: ["고위험 AI 의무 위반", "최대 1,500만 유로 또는 전세계 매출 3%"] },
    { cells: ["잘못된 정보 제공", "최대 750만 유로 또는 전세계 매출 1.5%"] },
  ],
};

export const koreaVsEuTable: DataTableData = {
  headers: ["항목", "한국 인공지능기본법", "EU AI Act"],
  rows: [
    { cells: ["시행일", "2026년 1월 22일", "2025년 2월~2027년 8월 (단계적)"] },
    { cells: ["규제 방향", "진흥 중심, 최소 규제", "포괄적 규제"] },
    { cells: ["위험 분류", "고영향 AI (11개 분야)", "4단계 (금지/고위험/제한적/최소)"] },
    { cells: ["최대 벌금", "3천만원", "3,500만 유로 또는 매출 7%"] },
    { cells: ["계도 기간", "1년 이상", "없음 (단계적 시행으로 대체)"] },
    { cells: ["생성형 AI", "워터마크, 사전 고지", "투명성 의무, GPAI 별도 규제"] },
    { cells: ["적용 범위", "국내 서비스 제공자", "EU 시장 진출 기업 전체"] },
  ],
};

export const nistRmfSteps: AILabTextCard[] = [
  { title: "Govern", description: "AI 사용 정책, 책임자, 승인 기준, 기록 방식을 정합니다." },
  { title: "Map", description: "어떤 사용자, 데이터, 기능, 위험이 있는지 맥락을 파악합니다." },
  { title: "Measure", description: "정확도, 편향, 개인정보 노출, 보안 취약점, 환각을 측정합니다." },
  { title: "Manage", description: "위험을 줄이는 조치, 모니터링, 사고 대응, 재평가 주기를 운영합니다." },
];

export const projectChecklist: string[] = [
  "AI 사용 목적 정의: 이 AI 기능이 사용자에게 어떤 도움을 주는지 한 문장으로 정의",
  "위험 분류: 의료, 금융, 채용 등 사람의 권리에 영향을 주는 영역인지 확인",
  "데이터 점검: 개인정보, 민감정보, 저작권 있는 자료가 들어가는지 확인",
  "사용자 고지: AI가 답변을 생성한다는 사실과 한계를 화면에 명시",
  "근거 연결: 중요한 답변은 출처 문서, 검색 결과를 함께 표시",
  "사람 검토: 외부 발송, 삭제, 결제, 평가, 법률 판단은 자동 실행하지 않음",
  "로그와 재현성: 모델, 프롬프트 버전, 참조 문서, 응답 시간을 기록",
  "보안 테스트: 프롬프트 인젝션, 민감정보 노출, 권한 우회를 테스트",
  "삭제와 수정: 사용자가 입력한 데이터 삭제/수정 요청을 처리 가능하게 설계",
  "정기 재검토: 법, 모델, 회사 정책, 데이터가 바뀌면 체크리스트를 업데이트",
];

export const governanceReferenceChips = [
  "Korea AI Basic Act",
  "EU AI Act",
  "NIST AI RMF",
  "OWASP LLM Top 10",
  "OECD AI Principles",
  "UNESCO AI Ethics",
];

/* ── 06. Company Guides (md Part 6) ── */

export interface CompanyGuide {
  name: string;
  principles: { principle: string; usage: string }[];
  promptTemplate: string;
}

export const companyGuides: CompanyGuide[] = [
  {
    name: "OpenAI / ChatGPT",
    principles: [
      { principle: "명확하고 구체적으로 쓰기", usage: '"분석해줘"보다 "리스크 5개를 표로 정리하고 대응안을 한 줄씩 써줘"' },
      { principle: "참고 자료를 같이 주기", usage: '문서, 표, 코드를 넣고 "이 자료 기준으로만 답하라"고 제한' },
      { principle: "복잡한 작업은 나누기", usage: "초안 작성 → 누락 점검 → 수정 반영 → 최종 요약" },
      { principle: "모델에게 검토 시간 주기", usage: "바로 결론 요구보다 판단 기준과 점검 순서를 먼저 제시" },
      { principle: "평가 세트 만들기", usage: "자주 쓰는 프롬프트는 예시 입력과 기대 출력으로 테스트" },
    ],
    promptTemplate: "역할: 너는 [역할]이다.\n목표: [해야 할 일]을 수행한다.\n맥락: 아래 자료는 [상황]을 위한 것이다.\n제약: 문서에 없는 내용은 추측하지 않는다.\n출력: [표/불릿/JSON] 형식으로 작성한다.\n검증: 불확실한 부분을 마지막에 따로 적는다.",
  },
  {
    name: "Anthropic / Claude",
    principles: [
      { principle: "명확하고 직접적으로 지시", usage: "원하는 결과와 하지 말아야 할 일을 분리해서 작성" },
      { principle: "예시를 제공", usage: "원하는 톤, 형식, 판단 기준이 있다면 입력/출력 예시를 삽입" },
      { principle: "XML 태그 사용", usage: "<context>, <rules>, <examples>처럼 구분" },
      { principle: "역할 지정", usage: '"너는 코드 리뷰어", "너는 QA 엔지니어"처럼 관점 고정' },
      { principle: "복잡한 문제는 thinking 유도", usage: "결론 전에 검토 기준과 단계적 점검을 요청" },
    ],
    promptTemplate: "<role>\n너는 포트폴리오를 검토하는 시니어 프론트엔드 엔지니어다.\n</role>\n\n<task>\n아래 변경사항의 UX 리스크와 구현 리스크를 점검한다.\n</task>\n\n<constraints>\n- 기존 디자인 톤을 유지한다.\n- 추측한 내용은 추측이라고 표시한다.\n</constraints>",
  },
  {
    name: "Google / Gemini",
    principles: [
      { principle: "자연어로 명확히 요청", usage: "짧은 키워드보다 동료에게 설명하듯 문장으로 요청" },
      { principle: "맥락 제공", usage: "누가, 어떤 상황에서, 어떤 목적으로 쓸 결과물인지 설명" },
      { principle: "역할 지정", usage: '"프로젝트 리드", "고객 미팅 준비자" 같은 관점 부여' },
      { principle: "톤과 길이 지정", usage: "formal, brief, friendly처럼 톤을 명확히 지정" },
      { principle: "결과 검토", usage: "Gemini 응답은 공식 견해가 아니며 부정확할 수 있음을 전제로 검토" },
    ],
    promptTemplate: "Imagine you are [역할].\nCreate [결과물] for [사용자/상황].\nInclude [포함할 내용].\nUse a [톤/길이/형식].\nBefore finalizing, check whether any part is uncertain.",
  },
  {
    name: "Microsoft Copilot",
    principles: [
      { principle: "Goal", usage: '"회의록을 요약해줘"처럼 무엇을 해야 하는지 명시' },
      { principle: "Context", usage: '"프로젝트 킥오프 준비용"처럼 왜 필요한지 설명' },
      { principle: "Expectations", usage: '"임원 보고용으로 5개 불릿"처럼 톤·형식·길이 지정' },
      { principle: "Source", usage: '"지난 2주간 Sam이 보낸 이메일 기준"처럼 참고 자료 명시' },
    ],
    promptTemplate: "Goal: [해야 할 일]\nContext: [이 결과물이 필요한 상황]\nSource: [참고할 문서, 이메일, 회의, 파일]\nExpectations: [톤, 형식, 분량, 포함/제외 조건]",
  },
  {
    name: "GitHub Copilot",
    principles: [
      { principle: "복잡한 작업 분해", usage: "큰 리팩토링을 작은 함수·파일 단위로 분리" },
      { principle: "요구사항 구체화", usage: "사용 언어, 라이브러리, 성능 조건, 테스트 기준을 명시" },
      { principle: "관련 코드 지정", usage: "파일, 함수, 심볼, 선택 영역을 명확히 지정" },
      { principle: "결과 검증", usage: "Copilot이 만든 코드를 이해하고 테스트·lint·보안 스캔으로 확인" },
    ],
    promptTemplate: "이 파일의 `createUser` 함수만 대상으로 봐줘.\n목표는 중복 검증 로직을 줄이고 테스트하기 쉬운 구조로 바꾸는 거야.\n기존 API 응답 형식은 바꾸지 마.\n수정 후 필요한 단위 테스트 케이스를 함께 제안해줘.",
  },
  {
    name: "Cursor / v0",
    principles: [
      { principle: "프로젝트 규칙 관리", usage: ".cursor/rules처럼 재사용 가능한 문서로 관리" },
      { principle: "product surface 명시", usage: "components, data, actions를 구체적으로 설명" },
      { principle: "context of use", usage: "누가, 어떤 순간에, 어떤 결과를 위해 사용하는지" },
      { principle: "constraints & taste", usage: "platform, visual tone, states, 피할 디자인 명시" },
    ],
    promptTemplate: "Build [product surface: components, data, actions].\nUsed by [who], in [what moment], to [what outcome].\n\nConstraints:\n- platform / device\n- visual tone\n- states: loading, empty, error, success\n- do not use: [피하고 싶은 디자인]",
  },
];

export const unifiedTemplate = `[Goal]
무엇을 해야 하는지 한 문장으로 적습니다.

[Role]
어떤 관점에서 답해야 하는지 지정합니다.

[Context]
사용자, 상황, 배경, 관련 문서, 코드, 데이터 범위를 제공합니다.

[Source]
답변의 근거로 삼을 자료를 명시합니다.

[Constraints]
하지 말아야 할 것, 유지할 것, 보안·개인정보·저작권 제약을 적습니다.

[Output]
표, JSON, 체크리스트, 보고서 등 원하는 형식을 지정합니다.

[Verification]
불확실한 내용, 추가 확인이 필요한 내용, 테스트 방법을 마지막에 적게 합니다.`;

/* ── 07. AI Tools (unchanged) ── */

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
    useCase: "포트폴리오 사이트의 섹션 구조를 분석하고, UI/UX 개선 사항을 코드에 반영하는 데 사용했습니다.",
    strengths: ["큰 코드베이스 구조를 파악하는 데 강함", "수정 전 계획을 세우게 할 수 있음", "디자인/기능 요구사항을 긴 프롬프트로 전달하기 좋음"],
    limitations: ["프롬프트가 불명확하면 기존 디자인을 과하게 바꾸는 경우가 있음", "실제 브라우저에서의 스크롤, 반응형, 레이아웃 문제는 사람이 직접 확인해야 함"],
    review: 'Claude Code는 단순 코드 생성기보다, 개발 흐름을 함께 설계하는 페어 프로그래밍 도구에 가깝다고 느꼈습니다. 하지만 좋은 결과를 얻으려면 "무엇을 바꾸지 말아야 하는지"까지 명확히 말해야 했습니다.',
    tags: ["Claude Code", "코딩 에이전트", "리팩터링", "포트폴리오"],
    groups: ["Coding", "Automation"],
  },
  { name: "ChatGPT", category: "생각 정리 / 프롬프트 설계", usedFor: "프롬프트 작성, 개념 구체화, 포트폴리오 전략, 기술 설명 정리", useCase: "Claude에게 전달할 개발 프롬프트를 정리하거나, 포트폴리오 섹션의 방향성, 문구, 구조를 구체화하는 데 사용했습니다.", strengths: ["모호한 생각을 구조화하는 데 강함", "한국어로 빠르게 방향성을 정리하기 좋음", "기획, 문장, 기술 설명을 연결해주기 좋음"], limitations: ["실제 코드베이스를 직접 수정하지 않기 때문에 최종 구현은 별도 도구가 필요함", "최신 정보나 실제 사이트 상태는 확인이 필요함"], review: "ChatGPT는 제가 하고 싶은 말을 개발자가 이해할 수 있는 요구사항으로 바꾸는 데 가장 많이 사용한 도구입니다.", tags: ["프롬프트", "기획", "글쓰기", "포트폴리오"], groups: ["Writing", "Research"] },
  { name: "Cursor", category: "AI 코드 에디터", usedFor: "코드 수정, 인라인 제안, 코드베이스 질의응답", useCase: "VS Code 기반의 AI 코드 에디터로, 코드 작성 중 인라인 제안과 코드베이스에 대한 질문을 통해 개발 속도를 높이는 데 활용했습니다.", strengths: ["에디터 내에서 바로 AI와 대화할 수 있어 컨텍스트 전환이 적음", "Tab 자동완성이 코드 흐름에 맞게 잘 동작함"], limitations: ["긴 리팩토링이나 멀티파일 수정은 CLI 기반 도구가 더 효율적", "프로젝트 전체 구조를 파악하는 데는 한계가 있음"], review: "Cursor는 빠른 코드 수정과 탐색에 좋지만, 구조적인 리팩토링에는 Claude Code와 병행하는 것이 효과적이었습니다.", tags: ["코드 에디터", "AI IDE", "자동완성"], groups: ["Coding"] },
  { name: "GitHub Copilot", category: "코드 자동완성", usedFor: "코드 자동완성, 보일러플레이트 생성, 테스트 초안 작성", useCase: "반복적인 코드 패턴이나 보일러플레이트를 빠르게 생성하고, 테스트 코드 초안을 작성하는 데 사용했습니다.", strengths: ["반복 패턴을 빠르게 자동완성해줌", "테스트 코드 초안 작성에 유용"], limitations: ["컨텍스트를 벗어난 제안이 종종 있음", "복잡한 비즈니스 로직에서는 정확도가 떨어짐"], review: "Copilot은 타이핑 속도를 줄이는 데는 좋지만, 코드의 의도를 이해하고 설계하는 것은 여전히 개발자 몫입니다.", tags: ["자동완성", "VS Code", "GitHub"], groups: ["Coding"] },
  { name: "Perplexity", category: "AI 검색 엔진", usedFor: "기술 리서치, 공식 문서 확인, 비교 분석", useCase: "기술 비교, 라이브러리 선택, 에러 해결 시 빠르게 최신 정보를 검색하고 요약된 답변을 얻는 데 활용했습니다.", strengths: ["출처가 명확한 답변을 제공", "기술 문서와 블로그를 빠르게 요약해줌"], limitations: ["깊은 코드 레벨의 디버깅에는 부족함", "한국어 자료 검색 범위가 제한적일 수 있음"], review: "Perplexity는 Google 검색을 대체하기보다, 기술 리서치의 첫 단계를 빠르게 만들어주는 도구입니다.", tags: ["검색", "리서치", "문서 확인"], groups: ["Research"] },
  { name: "Suno", category: "음악 생성", usedFor: "포트폴리오 배경음악과 분위기 탐색", useCase: "포트폴리오에 어울리는 분위기의 BGM을 실험하기 위해 사용했습니다.", strengths: ["짧은 설명만으로 분위기 있는 음악을 빠르게 만들 수 있음", "포트폴리오의 감정적 톤을 실험하기 좋음"], limitations: ["원하는 분위기를 정확히 맞추려면 여러 번 수정해야 함", "실제 웹사이트에 넣을 때는 저작권, 로딩 속도를 고려해야 함"], review: "Suno는 포트폴리오를 하나의 경험으로 만들 수 있는 가능성을 보여준 도구였습니다.", tags: ["음악 AI", "무드", "포트폴리오 경험"], groups: ["Design"] },
  { name: "Midjourney", category: "이미지 생성", usedFor: "컨셉 아트, UI 무드보드, 비주얼 방향 탐색", useCase: "포트폴리오의 비주얼 방향성을 탐색하거나, 섹션별 분위기를 시각적으로 실험하는 데 사용했습니다.", strengths: ["고퀄리티의 이미지를 빠르게 생성", "디자인 레퍼런스와 무드보드 작성에 유용"], limitations: ["정확한 UI 요소나 텍스트 생성에는 한계", "원하는 스타일을 맞추려면 프롬프트 반복 실험이 필요"], review: "Midjourney는 '이런 느낌이었으면 좋겠다'를 시각화하는 데 가장 빠른 도구였습니다.", tags: ["이미지 AI", "디자인", "비주얼"], groups: ["Design"] },
  { name: "v0 by Vercel", category: "UI 생성", usedFor: "React 컴포넌트 프로토타이핑, UI 디자인을 코드로 변환", useCase: "UI 컴포넌트의 초안을 빠르게 생성하고, shadcn/ui 기반의 디자인 패턴을 탐색하는 데 사용했습니다.", strengths: ["shadcn/ui + Tailwind 기반으로 바로 사용 가능한 코드 생성", "디자인 프로토타이핑이 빠름"], limitations: ["실제 프로젝트에 통합할 때 구조 조정이 필요", "복잡한 인터랙션이나 상태 관리는 직접 구현해야 함"], review: "v0는 UI 초안을 만들고 아이디어를 빠르게 검증하는 데 유용하지만, 프로덕션 코드로 바로 쓰기엔 추가 작업이 필요합니다.", tags: ["UI", "Vercel", "프로토타이핑", "React"], groups: ["Design", "Coding"] },
  { name: "Image to Code Tool", category: "이미지 기반 UI 생성", usedFor: "레퍼런스 이미지를 React + Tailwind UI로 변환", useCase: "실사 ID badge 이미지나 포트폴리오 UI 레퍼런스를 코드로 변환하는 실험에 사용했습니다.", strengths: ["이미지 기반 레이아웃을 빠르게 코드로 옮겨볼 수 있음", "React + Tailwind 구조를 빠르게 시작하기 좋음"], limitations: ["실제 이미지의 질감, 그림자 같은 디테일은 완벽히 재현하기 어려움", "결과물이 비슷해 보여도 세부 비율과 반응형은 직접 수정해야 함"], review: 'Image to Code 도구는 "초안 생성"에는 좋지만, 완성도 높은 UI를 만들기 위해서는 사람이 디테일을 계속 조정해야 합니다.', tags: ["이미지 to 코드", "React", "Tailwind", "UI 실험"], groups: ["Design", "Coding"] },
  { name: "Notion AI", category: "생산성 / 글쓰기", usedFor: "문서 정리, 회의록 요약, 작업 관리", useCase: "프로젝트 문서 정리, 회의록 요약, 작업 항목 관리를 Notion AI로 보조하여 효율을 높였습니다.", strengths: ["Notion 워크스페이스 내에서 바로 사용할 수 있어 워크플로우가 끊기지 않음", "문서 요약과 정리에 특히 강함"], limitations: ["코드 생성이나 기술적 분석에는 한계가 있음", "복잡한 프롬프트 기반 작업에는 전용 AI 도구가 더 적합"], review: "Notion AI는 생각을 정리하는 도구로는 훌륭하지만, 기술 작업에는 보조적인 역할에 가깝습니다.", tags: ["Notion", "생산성", "문서화"], groups: ["Writing", "Automation"] },
  { name: "Wrtn / 뤼튼", category: "한국어 AI 글쓰기 도구", usedFor: "한국어 문장 정리, 아이디어 초안, 콘텐츠 다듬기", useCase: "한국어 기반의 문장 정리, 아이디어 초안, 지원서나 포트폴리오 문구를 다듬는 데 사용했습니다.", strengths: ["한국어 문장 생성과 톤 조절에 접근성이 좋음", "빠르게 초안을 만들기 좋음"], limitations: ["깊은 기술적 맥락이나 코드 기반 문제 해결에는 한계가 있음", "결과물이 일반적인 문장처럼 느껴질 때가 있어 직접 수정이 필요함"], review: "뤼튼은 한국어 초안 작성에는 편하지만, 기술 포트폴리오에서는 경험과 생각을 직접 더해야 완성도가 올라갑니다.", tags: ["한국어 글쓰기", "초안", "AI 글쓰기"], groups: ["Writing"] },
  { name: "Claude (Web)", category: "AI 어시스턴트", usedFor: "장문 분석, 코드 리뷰, 아키텍처 논의", useCase: "긴 코드를 분석하거나, 아키텍처 설계에 대한 장문의 토론, 복잡한 기술 개념 설명에 사용했습니다.", strengths: ["긴 컨텍스트를 유지하면서 깊이 있는 분석 가능", "코드 리뷰와 아키텍처 피드백이 체계적"], limitations: ["실시간 코드 실행이나 파일 수정은 불가", "프로젝트 상태를 직접 확인할 수 없어 매번 컨텍스트를 제공해야 함"], review: "Claude Web은 깊이 있는 사고가 필요한 작업에 적합하고, Claude Code와 역할을 분리해서 사용하면 효과적입니다.", tags: ["Claude", "분석", "아키텍처", "코드 리뷰"], groups: ["Writing", "Research"] },
  { name: "Gemini", category: "멀티모달 AI", usedFor: "이미지 분석, 멀티모달 작업, Google 생태계 연동", useCase: "이미지와 텍스트를 함께 분석하거나, Google 생태계와 연동된 작업에 활용했습니다.", strengths: ["이미지, 영상, 텍스트를 동시에 처리 가능", "Google 서비스와의 통합이 자연스러움"], limitations: ["코딩 전용 도구에 비해 코드 생성 품질이 다소 낮음", "한국어 맥락 이해가 다른 도구에 비해 부족한 경우가 있음"], review: "Gemini는 멀티모달 작업에서 가능성을 보여주지만, 코드 중심 작업에서는 Claude나 ChatGPT가 더 효율적이었습니다.", tags: ["멀티모달", "Google", "이미지 분석"], groups: ["Research", "Design"] },
];

/* ── 08. Media Notes (unchanged) ── */

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
    summary: "AI Agent를 효과적으로 활용하기 위한 엔지니어링 마인드셋과 워크플로우에 대한 내용입니다.",
    myTake: "단순히 AI에게 질문하는 것이 아니라, 작업 기준과 검증 절차를 설계하는 것이 중요하다는 점을 체감했습니다.",
    insight: "AI Agent는 단순 답변 도구보다 반복되는 작업 흐름과 의사결정 구조를 정리할 때 더 큰 가치가 있습니다.",
    appliedTo: "Claude Code를 사용할 때 구조 탐색 → Plan Mode → 작은 단위 수정 → 브라우저 검증 순서로 요청하는 규칙에 반영했습니다.",
    keywords: ["AI Agent", "Claude Code", "Workflow", "Evaluation", "Productivity"],
  },
];
