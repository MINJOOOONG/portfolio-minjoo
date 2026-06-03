/* ── AI Lab Data ── */
/* 카카오뱅크 AI 품질 및 안전성 평가 JD 맞춤 — 6탭 구조 */

/* ── Section Navigation ── */

export type AILabArchiveSectionId =
  | "overview"
  | "standards-rules"
  | "ai-glossary"
  | "toolkit"
  | "history"
  | "media-note";

export interface AILabArchiveNavItem {
  id: AILabArchiveSectionId;
  label: string;
  eyebrow: string;
  group?: string;
}

export const aiLabArchiveNavItems: AILabArchiveNavItem[] = [
  { id: "overview", label: "Overview", eyebrow: "" },
  { id: "standards-rules", label: "Standards", eyebrow: "" },
  { id: "ai-glossary", label: "Glossary", eyebrow: "" },
  { id: "toolkit", label: "Toolkit", eyebrow: "" },
  { id: "history", label: "History", eyebrow: "" },
  { id: "media-note", label: "Media Notes", eyebrow: "" },
];

/* ── Section Title Translations ── */

export const aiLabSectionTitles: Record<string, { ko: string; en: string }> = {
  overviewTitle: { ko: "Overview", en: "Overview" },
  safetyTitle: { ko: "AI 사용 시 확인해야 하는 위험 요소", en: "Risk Factors to Check When Using AI" },
  nistTitle: { ko: "NIST AI RMF — 4단계 프레임워크", en: "NIST AI RMF — 4-Step Framework" },
  reviewTitle: { ko: "AI 결과물 평가 기준", en: "AI Output Evaluation Criteria" },
  glossaryTitle: { ko: "용어 사전", en: "Glossary" },
  toolkitTitle: { ko: "AI 도구 리뷰", en: "AI Tool Reviews" },
  standardsRulesTitle: { ko: "Standards", en: "Standards" },
  historyTitle: { ko: "History", en: "History" },
  modelTitle: { ko: "모델 비교", en: "Model Comparison" },
  modelGuideTitle: { ko: "작업별 모델 선택 가이드", en: "Model Selection Guide by Task" },
  rulesTitle: { ko: "공식 문서 아카이브", en: "Official Document Archive" },
  releaseTitle: { ko: "릴리즈 노트", en: "Release Notes" },
  euTableTitle: { ko: "EU AI Act 위험 등급 분류", en: "EU AI Act Risk Classification" },
  mediaTitle: { ko: "미디어 노트", en: "Media Notes" },
};

export const aiLabSectionIntros: Record<AILabArchiveSectionId, Record<"ko" | "en", string[]>> = {
  overview: {
    ko: [
      "AI Lab은 AI를 단순히 사용하는 공간이 아니라, 변화하는 AI 산업을 제 언어로 공부하고 정리하는 공간입니다.",
      "트렌드, 기준, 도구, 기록을 함께 묶어 AI를 어떻게 이해하고 활용할지 계속 업데이트합니다.",
    ],
    en: [
      "AI Lab is not just a space for using AI, but a place where I study and organize the changing AI industry in my own language.",
      "I keep updating how I understand and use AI by connecting trends, standards, tools, and records.",
    ],
  },
  "standards-rules": {
    ko: [
      "AI를 신뢰할 수 있게 쓰기 위한 기준을 정리합니다.",
      "공식 문서와 규제 가이드라인을 공부하면서, 제가 AI 결과물을 사용할 때 반드시 확인해야 한다고 정리한 기준입니다.",
    ],
    en: [
      "Before focusing on how to use AI well, I believe the first step is defining how to use it reliably.",
      "These are the standards I use when reviewing AI outputs, based on official documents and regulatory guidance.",
    ],
  },
  "ai-glossary": {
    ko: [
      "AI 문서와 도구를 공부할 때 반복해서 등장하는 개념을 제 기준으로 정리한 용어 사전입니다.",
      "실제 사용과 평가 맥락에서 어떤 의미인지 이해하기 위해 모았습니다.",
    ],
    en: [
      "This glossary organizes the concepts that repeatedly appear while studying AI documents and tools.",
      "It is built to understand what each term means in practical use and evaluation contexts, not just to memorize definitions.",
    ],
  },
  toolkit: {
    ko: [
      "직접 사용해 본 AI 도구를 작업 목적과 한계 기준으로 정리한 공간입니다.",
      "어떤 상황에서 어떤 도구를 선택해야 하는지 판단하기 위해 기록합니다.",
    ],
    en: [
      "This section organizes AI tools I have used by work purpose and practical limitations.",
      "I record them to judge which tool fits which situation, rather than simply deciding which tool is best.",
    ],
  },
  history: {
    ko: [
      "2000년대 이후 AI 산업의 주요 변화를 시간 순서로 정리한 타임라인입니다.",
      "모델과 제품, 규제의 흐름을 함께 보면서 지금의 AI 생태계가 어떻게 만들어졌는지 이해하기 위해 정리합니다.",
    ],
    en: [
      "This timeline organizes major changes in the AI industry since the 2000s.",
      "It connects model, product, and regulation shifts to understand how today's AI ecosystem was formed.",
    ],
  },
  "media-note": {
    ko: [
      "AI 관련 영상과 글을 보고 핵심 내용만 정리한 개인 학습 기록입니다.",
      "제 작업 기준과 AI를 바라보는 관점에 남길 만한 메시지를 중심으로 요약합니다.",
    ],
    en: [
      "This is a personal learning record that summarizes the core points from AI-related videos and articles.",
      "Instead of general impressions, I focus on messages worth keeping in my work standards and view of AI.",
    ],
  },
};

/* ── Shared Types ── */

export interface AILabSummaryCard {
  title: string;
  description: string;
  tags: string[];
}

export interface AILabTextCard {
  title: string;
  description: string;
  descriptionEn?: string;
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

export const overviewPurpose = {
  why: "AI Lab은 AI를 잘 사용하는 방법이 아니라, AI를 신뢰할 수 있게 사용하는 방법을 정리하기 위해 만들었습니다.",
  forWhom: "AI를 실무에 도입하려는 사람, AI 결과물의 품질을 판단해야 하는 사람, AI 시대의 기준을 스스로 세우고 싶은 사람을 위한 공간입니다.",
};

export interface OverviewNote {
  heading: string;
  body: string;
}

export const overviewNotes: OverviewNote[] = [
  {
    heading: "AI는 답변 도구에서 실행 도구로 바뀌고 있다",
    body: "초기 생성형 AI는 질문에 답해주는 도구였다. 하지만 지금 AI는 스스로 단계를 나누고, 정보를 찾고, 실제 행동까지 수행하는 방향으로 발전하고 있다. \"알려주는 존재\"에서 \"대신 해주는 존재\"로 이동하고 있는 것이다. AI가 실행까지 할 수 있다면, 그 실행을 평가하고 기준을 세우는 사람이 중요해진다. 이 랩을 만든 출발점이 여기에 있다.",
  },
  {
    heading: "지식 노동도 자동화의 대상이 되었다",
    body: "자동화는 단순 반복 노동을 먼저 대체할 거라고 생각했다. 하지만 AI는 리서치, 분석, 문서 작성, 의사결정 보조 같은 화이트칼라 업무를 흔들고 있다. 직업 자체가 사라지는 게 아니라, 사람이 하던 일의 일부가 AI에게 분해되어 넘어간다. AI가 잘하는 것과 못하는 것을 이해하는 게 경쟁력의 출발점이라고 생각해서 이 공부를 시작했다.",
  },
  {
    heading: "생산성이 올라도 그 결과가 공평하게 돌아오진 않는다",
    body: "AI가 생산성을 높이지만, 그 결과가 모두에게 돌아가는 건 별개의 문제다. 기업은 더 적은 인력으로 같은 결과를 낼 수 있게 된다. 중요한 건 AI가 일을 할 수 있느냐가 아니라, 그 가치를 이해하는 쪽에 있느냐다. 이 랩은 결과를 소비하는 게 아니라 가치를 이해하는 사람이 되기 위해 만들었다.",
  },
  {
    heading: "정답을 아는 능력의 희소성이 낮아지고 있다",
    body: "검색, 계산, 요약, 코드 작성 — AI가 이미 잘하는 일들이다. 정답을 빨리 찾는 능력 자체의 가치가 떨어지고 있다. 중요한 건 그 답을 가지고 무엇을 하느냐다. 이 랩은 사실을 외우는 게 아니라 판단 기준과 프레임워크를 만드는 연습이다.",
  },
  {
    heading: "프롬프트 능력은 첫 번째 파도였고, 이미 지나가고 있다",
    body: "ChatGPT가 나왔을 때 프롬프트를 잘 쓰는 게 능력처럼 느껴졌다. 하지만 모델이 똑똑해질수록 경쟁력은 \"어떻게 질문할까\"에서 \"무엇을 시킬지, 왜 시키는지, 결과를 어떻게 판단할지\"로 이동한다. 이 랩이 프롬프트 템플릿이 아니라 평가 기준과 안전성 기준에 집중하는 이유다.",
  },
  {
    heading: "문제를 정의하는 능력이 핵심이 된다",
    body: "AI는 답을 만들 수 있지만, 어떤 문제가 중요한지, 어떤 방향으로 접근해야 하는지, 결과가 의미 있는지를 판단하지는 못한다. 문제 정의, 질문 설계, 판단은 여전히 사람의 몫이다. 이 랩의 모든 섹션 — 안전성, 평가, 정책 — 은 AI에게 결과를 요구하기 전에 \"좋은 것\"이 무엇인지 먼저 정의하는 연습이다.",
  },
  {
    heading: "사람의 역할이 실행자에서 디렉터로 바뀐다",
    body: "AI가 실행을 대신하면, 사람은 무엇을 만들지, 왜 만들어야 하는지, 어떤 기준으로 판단할지를 결정하는 역할로 이동한다. 경쟁력은 AI보다 빨리 일하는 게 아니라, AI를 제대로 방향 잡아주는 데 있다. QA에서 배운 건 품질은 속도가 아니라 명확한 기준에서 나온다는 것이다. 이 랩은 그 원칙을 AI에 적용한 것이다.",
  },
  {
    heading: "직접 경험과 맥락의 가치가 커진다",
    body: "AI는 텍스트에서 배울 수 있지만, 실제 실패와 대화와 복잡한 상황에서 얻은 판단력은 대체하기 어렵다. 깊은 직접 경험은 문서만으로는 가르칠 수 없는 이해를 만든다. 이 랩의 노트들은 교과서 요약이 아니라 내 실무 경험을 통해 걸러낸 내용이다.",
  },
  {
    heading: "미래 직업을 맞히는 것보다 적응력이 중요하다",
    body: "변화 속도가 너무 빠르기 때문에 커리어 예측은 의미가 없다. 호기심, 회복탄력성, 환경이 바뀌었을 때 방향을 바꿀 수 있는 힘이 특정 스킬이나 직함보다 오래간다. 이 랩 자체가 그 접근의 증거다 — 누군가 AI 안전성을 가르쳐줄 때까지 기다리지 않고, 직접 공부하고 정리하기 시작했다.",
  },
  {
    heading: "AI가 강해질수록 인간적인 능력도 중요해진다",
    body: "신뢰 형성, 공감, 설득, 관계 관리 — AI가 하기 어려운 것들이다. 기술적 실행이 자동화될수록 기술 이해와 진짜 인간적 연결을 함께 다루는 사람이 더 가치 있어진다. 내가 목표하는 균형이 바로 이것이다: AI에 대한 깊은 기술적 이해 + 실제 인간 맥락에 기반한 판단.",
  },
  {
    heading: "익숙한 방식만 반복하면 위험하다",
    body: "빠르게 변하는 환경에서 익숙한 패턴에 머무르는 건 오히려 위험하다. 새로운 자극을 찾고, 자기 방식으로 해석하고, 남의 결론을 재활용하지 않고 직접 생각하는 사람이 강해진다. 이 랩은 바로 그 연습장이다 — 배운 것을 처리해서 내 언어와 프레임워크로 바꾸는 공간.",
  },
];

export const overviewIntroEn = [
  "AI has already become deeply embedded in our daily lives. The question is no longer whether to use AI, but how to use it.",
  "AI trends shift every day, and model capabilities evolve at a staggering pace. Yesterday's standards don't hold today, and today's tools may be replaced tomorrow. Writing good prompts was the first wave — now the core questions are what to delegate, how to judge results, and how far to trust them.",
  "In an era where AI can generate answers, the value of simply knowing the right answer is declining. Instead, the role of people who define problems, set direction, and establish criteria is growing. Even when AI handles execution, judgment and context can only come from firsthand experience.",
  "AI Lab is a space I created to keep pace with that change. I track and organize safety, evaluation criteria, official policies, and tool evolution — constantly updating my practice of translating what I learn into my own language and standards.",
];

/* ── 02. Safety Framework ── */

export const safetyIntro = "AI는 생산성을 높여주지만 항상 정답을 제공하지는 않습니다. 이 섹션은 AI를 사용할 때 반드시 확인해야 하는 위험 요소와 검증 기준을 정리한 공간입니다.";

export const safetyIntroEn = "AI boosts productivity but doesn't always provide correct answers. This section organizes the risk factors and verification criteria to check when using AI.";

export interface SafetyRiskCard {
  risk: string;
  shortDesc: string;
  shortDescEn: string;
  whyItMatters: string;
  whyItMattersEn: string;
  myEvaluationRule: string;
  myEvaluationRuleEn: string;
  source?: string;
}

export const safetyRiskCards: SafetyRiskCard[] = [
  {
    risk: "Hallucination",
    shortDesc: "AI가 사실이 아닌 내용을 그럴듯하게 생성하는 현상",
    shortDescEn: "AI generating plausible but factually incorrect content",
    whyItMatters: "금융 서비스에서 사실이 아닌 정보를 전달하면 고객 손실과 신뢰 하락으로 이어집니다. 특히 수치, 정책, 상품 조건에서 치명적입니다.",
    whyItMattersEn: "In financial services, delivering false information can lead to customer losses and trust erosion. Especially critical for numbers, policies, and product conditions.",
    myEvaluationRule: "답변에 포함된 사실 정보를 원본 문서와 대조합니다. 출처가 없는 수치나 조건은 할루시네이션 가능성으로 태깅합니다.",
    myEvaluationRuleEn: "Cross-reference factual information in responses against source documents. Flag unsourced numbers or conditions as potential hallucinations.",
    source: "NIST AI RMF — Measure",
  },
  {
    risk: "Bias & Fairness",
    shortDesc: "학습 데이터의 편향이 결과에 반영되는 현상",
    shortDescEn: "Training data biases being reflected in outputs",
    whyItMatters: "신용평가, 대출 심사 등에서 특정 집단에 불리한 결과가 나오면 차별 이슈가 됩니다. 편향은 학습 데이터, 프롬프트, 평가 기준 어디서든 발생할 수 있습니다.",
    whyItMattersEn: "Unfavorable outcomes for specific groups in credit scoring or loan approvals become discrimination issues. Bias can arise from training data, prompts, or evaluation criteria.",
    myEvaluationRule: "동일한 질문을 성별, 연령, 지역만 바꿔서 테스트합니다. 답변 톤이나 추천 결과가 달라지면 편향으로 기록합니다.",
    myEvaluationRuleEn: "Test the same question with only gender, age, or region changed. If response tone or recommendations differ, record it as bias.",
    source: "NIST AI RMF — Map",
  },
  {
    risk: "Privacy & Data Leakage",
    shortDesc: "개인정보 및 민감정보 노출 위험",
    shortDescEn: "Risk of exposing personal and sensitive information",
    whyItMatters: "개인정보, 민감정보가 AI 답변에 노출되면 개인정보보호법 위반이며, 금융권에서는 즉각적인 규제 조치 대상입니다.",
    whyItMattersEn: "Exposing personal or sensitive data in AI responses violates privacy laws, and in the financial sector, triggers immediate regulatory action.",
    myEvaluationRule: "프롬프트에 개인정보를 포함시켜 답변에 그대로 노출되는지 테스트합니다. 마스킹, 거부, 일반화 중 어떤 방식으로 처리하는지 확인합니다.",
    myEvaluationRuleEn: "Test whether personal information included in prompts is exposed verbatim in responses. Verify whether the system applies masking, refusal, or generalization.",
    source: "개인정보보호법, EU AI Act Art. 10",
  },
  {
    risk: "Harmful Output",
    shortDesc: "유해하거나 위험한 콘텐츠를 생성하는 문제",
    shortDescEn: "Generating harmful or dangerous content",
    whyItMatters: "폭력, 자해, 불법 행위를 조장하는 답변은 서비스 전체의 신뢰를 파괴합니다. 간접적 표현이나 우회 요청에도 대응해야 합니다.",
    whyItMattersEn: "Responses promoting violence, self-harm, or illegal activities destroy overall service trust. The system must also handle indirect expressions and bypass attempts.",
    myEvaluationRule: "직접적 요청뿐 아니라 '역할 부여', '가상 시나리오' 등 우회 프롬프트로도 테스트합니다. Refusal이 적절한지, 과도한 거부는 아닌지 함께 봅니다.",
    myEvaluationRuleEn: "Test with not only direct requests but also bypass prompts like 'role assignment' and 'hypothetical scenarios.' Evaluate whether refusals are appropriate without being excessive.",
    source: "Anthropic Usage Policy",
  },
  {
    risk: "Overconfidence",
    shortDesc: "불확실한 정보를 확신하는 톤으로 전달하는 문제",
    shortDescEn: "Delivering uncertain information with a confident tone",
    whyItMatters: "AI가 불확실한 정보를 확신하는 톤으로 전달하면, 사용자가 검증 없이 의사결정에 활용할 위험이 있습니다.",
    whyItMattersEn: "When AI delivers uncertain information confidently, users may rely on it for decision-making without verification.",
    myEvaluationRule: "'정확히', '반드시', '100%' 같은 확신 표현이 답변에 포함되면 주의 대상으로 표시합니다. 불확실한 내용에는 '~로 보입니다', '확인이 필요합니다'가 있어야 합니다.",
    myEvaluationRuleEn: "Flag responses containing certainty expressions like 'exactly,' 'always,' or '100%.' Uncertain content should include hedging language such as 'it appears' or 'verification is needed.'",
    source: "NIST AI RMF — Measure",
  },
  {
    risk: "Lack of Grounding",
    shortDesc: "출처나 근거 없이 답변을 생성하는 문제",
    shortDescEn: "Generating responses without sources or evidence",
    whyItMatters: "근거 없는 답변은 검증이 불가능합니다. 출처가 명시되어야 사용자가 판단하고, 문제 발생 시 추적할 수 있습니다.",
    whyItMattersEn: "Responses without evidence cannot be verified. Sources must be cited so users can judge and trace issues when problems arise.",
    myEvaluationRule: "답변이 어떤 문서/데이터를 기반으로 생성되었는지 확인합니다. 출처가 없으면 '근거 부재'로 분류하고, RAG 파이프라인 점검을 요청합니다.",
    myEvaluationRuleEn: "Verify which documents or data the response is based on. Classify responses without sources as 'ungrounded' and request RAG pipeline inspection.",
    source: "NIST AI RMF — Measure",
  },
  {
    risk: "Human Review Required",
    shortDesc: "사람의 최종 확인 없이 AI가 단독 실행하는 위험",
    shortDescEn: "Risk of AI executing autonomously without final human review",
    whyItMatters: "고위험 판단(금융 상품 추천, 개인정보 처리, 외부 발송)은 AI 단독으로 실행하면 안 됩니다. 사람의 최종 승인이 필수입니다.",
    whyItMattersEn: "High-risk decisions (financial product recommendations, personal data processing, external communications) must not be executed by AI alone. Final human approval is essential.",
    myEvaluationRule: "자동 실행되는 기능 목록을 확인하고, '승인 없이 실행되면 안 되는 것' 리스트를 만듭니다. Human-in-the-loop 지점이 빠져 있으면 리스크로 기록합니다.",
    myEvaluationRuleEn: "Review the list of auto-executed features and create a 'must not execute without approval' list. Record missing human-in-the-loop checkpoints as risks.",
    source: "EU AI Act Art. 14, NIST AI RMF — Govern",
  },
];

export const nistRmfSteps: AILabTextCard[] = [
  { title: "Govern", description: "AI 사용 정책, 책임자, 승인 기준, 기록 방식을 정합니다. 조직 차원의 거버넌스가 모든 단계의 토대입니다.", descriptionEn: "Establish AI usage policies, responsible parties, approval criteria, and documentation methods. Organization-level governance is the foundation for all stages." },
  { title: "Map", description: "어떤 사용자, 데이터, 기능, 위험이 있는지 맥락을 파악합니다. 리스크를 식별하고 우선순위를 정합니다.", descriptionEn: "Identify the context of users, data, features, and risks. Identify risks and prioritize them." },
  { title: "Measure", description: "정확도, 편향, 개인정보 노출, 보안 취약점, 환각을 측정합니다. 정량/정성 평가를 함께 수행합니다.", descriptionEn: "Measure accuracy, bias, privacy exposure, security vulnerabilities, and hallucinations. Conduct both quantitative and qualitative evaluations." },
  { title: "Manage", description: "위험을 줄이는 조치, 모니터링, 사고 대응, 재평가 주기를 운영합니다. 지속적으로 개선합니다.", descriptionEn: "Implement risk mitigation measures, monitoring, incident response, and reassessment cycles. Continuously improve." },
];

/* ── 03. AI Review Framework ── */

export const reviewFrameworkIntro = "Safety 섹션이 'AI 사용 시 무엇이 위험한가'를 다룬다면, 이 섹션은 'AI 결과물을 어떻게 평가하는가'를 다룹니다. AI가 생성한 답변을 그대로 사용할 수 있는지 판단하기 위한 5가지 평가 기준입니다.";

export const reviewFrameworkIntroEn = "While the Safety section covers 'what risks exist when using AI,' this section covers 'how to evaluate AI outputs.' Five evaluation criteria for determining whether AI-generated responses can be used as-is.";

export interface ReviewFrameworkItem {
  criterion: string;
  question: string;
  questionEn: string;
  description: string;
  descriptionEn: string;
  checkpoints: string[];
  checkpointsEn: string[];
}

export const reviewFrameworkItems: ReviewFrameworkItem[] = [
  {
    criterion: "Accuracy",
    question: "정확한가?",
    questionEn: "Is it accurate?",
    description: "AI 답변에 포함된 사실, 수치, 조건이 원본 데이터와 일치하는지 확인합니다.",
    descriptionEn: "Verify that facts, figures, and conditions in AI responses match the original data.",
    checkpoints: [
      "답변의 핵심 사실(수치, 날짜, 조건)을 원본 문서와 1:1 대조",
      "그럴듯하지만 원문에 없는 수치나 날짜가 섞여 있지 않은지 확인",
      "특정 도메인(금융, 의료, 법률)에서는 전문가 교차 검증 필수",
    ],
    checkpointsEn: [
      "Cross-reference key facts (numbers, dates, conditions) 1:1 against source documents",
      "Check for plausible-sounding numbers or dates not found in the original",
      "Expert cross-verification required in specialized domains (finance, healthcare, legal)",
    ],
  },
  {
    criterion: "Groundedness",
    question: "근거가 존재하는가?",
    questionEn: "Is it grounded in evidence?",
    description: "답변이 어떤 데이터나 문서에 기반하고 있는지, 출처가 명시되어 있는지 확인합니다.",
    descriptionEn: "Verify whether the response is based on specific data or documents, and whether sources are cited.",
    checkpoints: [
      "출처 표시 유무 확인 — '일반적으로', '보통' 같은 일반화 표현 주의",
      "표시된 출처가 실제로 해당 내용을 포함하는지 검증",
      "RAG 기반 시스템이라면 검색된 문서와 답변의 일치도 확인",
    ],
    checkpointsEn: [
      "Check for source citations — watch for generalizations like 'generally' or 'usually'",
      "Verify that cited sources actually contain the referenced content",
      "For RAG-based systems, confirm alignment between retrieved documents and the response",
    ],
  },
  {
    criterion: "Completeness",
    question: "필요한 내용을 충분히 포함하는가?",
    questionEn: "Does it include all necessary information?",
    description: "사용자의 질문에 대해 필요한 정보가 빠짐없이 포함되어 있는지 확인합니다.",
    descriptionEn: "Verify that all information needed to answer the user's question is included without gaps.",
    checkpoints: [
      "질문의 핵심 요소가 모두 답변에 반영되었는지 확인",
      "중요한 조건, 예외, 주의사항이 누락되지 않았는지 확인",
      "추가 맥락이 필요한 경우 AI가 그 사실을 밝히고 있는지 확인",
    ],
    checkpointsEn: [
      "Confirm that all core elements of the question are addressed in the response",
      "Check that important conditions, exceptions, and caveats are not omitted",
      "Verify that the AI discloses when additional context is needed",
    ],
  },
  {
    criterion: "Consistency",
    question: "일관된 결과를 제공하는가?",
    questionEn: "Does it provide consistent results?",
    description: "같은 질문에 대해 반복 테스트했을 때 핵심 내용이 일관되게 유지되는지 확인합니다.",
    descriptionEn: "Verify that core content remains consistent when the same question is tested repeatedly.",
    checkpoints: [
      "동일 질문을 3회 이상 반복하여 핵심 내용의 일관성 확인",
      "표현이 달라도 사실과 결론이 동일한지 비교",
      "일관성이 낮은 영역은 모델 한계로 기록하고 사람 검증 대상으로 분류",
    ],
    checkpointsEn: [
      "Repeat the same question 3+ times and check consistency of core content",
      "Compare whether facts and conclusions remain the same even if wording differs",
      "Record areas with low consistency as model limitations and classify for human verification",
    ],
  },
  {
    criterion: "Usefulness",
    question: "실제 업무에 도움이 되는가?",
    questionEn: "Is it useful for actual work?",
    description: "정확하고 근거가 있더라도, 실제 업무 맥락에서 활용할 수 있는 형태인지 확인합니다.",
    descriptionEn: "Even if accurate and grounded, verify whether the response is in a form that can be applied in real work contexts.",
    checkpoints: [
      "답변이 구체적인 행동으로 연결될 수 있는지 확인",
      "너무 일반적이거나 추상적인 답변이 아닌지 확인",
      "대상 사용자의 수준과 맥락에 맞는 표현인지 확인",
    ],
    checkpointsEn: [
      "Check whether the response can be translated into specific actions",
      "Verify the response is not overly general or abstract",
      "Confirm the language matches the target user's level and context",
    ],
  },
];

export const evaluationQaConnection = "QA에서 TC(Test Case)를 먼저 정의하고 반복 검증하듯, AI 답변도 평가 기준을 먼저 정의하고 반복 검증합니다. 차이점은 AI 답변은 같은 입력에도 결과가 달라질 수 있어, 평가 기준이 더 명확해야 한다는 것입니다.";

export const aiUsageStandardsIntro = aiLabSectionIntros["standards-rules"];

export interface AIUsageStandard {
  title: string;
  titleEn: string;
  rule: string;
  ruleEn: string;
  reason: string;
  reasonEn: string;
  evidence: string[];
  evidenceEn: string[];
}

export const aiUsageStandards: AIUsageStandard[] = [
  {
    title: "근거 없는 답변은 사용하지 않는다",
    titleEn: "Do not use answers without evidence",
    rule: "AI가 만든 답변은 원본 문서, 데이터, 정책과 대조할 수 있을 때만 사용합니다.",
    ruleEn: "Use AI-generated answers only when they can be checked against source documents, data, or policies.",
    reason: "LLM은 그럴듯한 문장을 만들 수 있지만, 그 자체가 사실이라는 보장은 없습니다. 출처가 없으면 검증도 재현도 어렵습니다.",
    reasonEn: "LLMs can produce plausible text, but that does not guarantee factual correctness. Without sources, verification and reproduction are difficult.",
    evidence: ["NIST AI RMF — Measure", "OpenAI Model Spec", "RAG / Grounding 기준"],
    evidenceEn: ["NIST AI RMF — Measure", "OpenAI Model Spec", "RAG / Grounding practice"],
  },
  {
    title: "고위험 판단은 사람이 최종 승인한다",
    titleEn: "Keep final human approval for high-risk decisions",
    rule: "금융, 개인정보, 법률, 안전처럼 피해가 커질 수 있는 영역에서는 AI가 단독으로 결론을 내리거나 실행하지 않게 합니다.",
    ruleEn: "In domains like finance, privacy, law, and safety, AI should not make or execute final decisions alone.",
    reason: "AI의 자동화가 편리하더라도 책임은 사람과 조직에 남습니다. 위험도가 높을수록 승인 지점과 기록이 필요합니다.",
    reasonEn: "Even when automation is convenient, accountability remains with people and organizations. Higher risk requires approval checkpoints and records.",
    evidence: ["EU AI Act — Human Oversight", "NIST AI RMF — Govern", "OpenAI Usage Policies"],
    evidenceEn: ["EU AI Act — Human Oversight", "NIST AI RMF — Govern", "OpenAI Usage Policies"],
  },
  {
    title: "개인정보와 민감정보는 입력하지 않는다",
    titleEn: "Do not put personal or sensitive data into AI tools",
    rule: "프롬프트와 첨부 파일에 개인정보, 인증 정보, 내부 기밀이 포함되지 않았는지 먼저 확인합니다.",
    ruleEn: "Check prompts and attachments first to ensure they do not include personal data, credentials, or confidential internal information.",
    reason: "AI 도구 사용에서 가장 즉각적인 리스크는 데이터 유출입니다. 편의보다 데이터 최소화가 우선입니다.",
    reasonEn: "The most immediate risk in AI tool usage is data leakage. Data minimization comes before convenience.",
    evidence: ["Google Gemini API Policy", "Microsoft Responsible AI Standard", "개인정보보호법 / EU AI Act"],
    evidenceEn: ["Google Gemini API Policy", "Microsoft Responsible AI Standard", "Privacy laws / EU AI Act"],
  },
  {
    title: "평가 기준을 먼저 정하고 반복 검증한다",
    titleEn: "Define evaluation criteria first, then test repeatedly",
    rule: "정확성, 근거, 완전성, 일관성, 업무 활용성 기준을 먼저 정한 뒤 AI 결과를 반복 확인합니다.",
    ruleEn: "Define criteria such as accuracy, groundedness, completeness, consistency, and usefulness before repeatedly checking AI outputs.",
    reason: "같은 질문에도 AI 답변은 달라질 수 있습니다. 기준이 없으면 좋은 답변과 위험한 답변을 구분하기 어렵습니다.",
    reasonEn: "AI responses can vary even for the same question. Without criteria, it is hard to distinguish useful answers from risky ones.",
    evidence: ["NIST AI RMF — Measure", "QA Test Case 방식", "AI Evaluation Framework"],
    evidenceEn: ["NIST AI RMF — Measure", "QA test case practice", "AI evaluation framework"],
  },
  {
    title: "편향 가능성은 조건을 바꿔 테스트한다",
    titleEn: "Test possible bias by changing conditions",
    rule: "성별, 연령, 지역, 직업 등 조건만 바꿨을 때 답변의 톤이나 결론이 달라지는지 확인합니다.",
    ruleEn: "Check whether tone or conclusions change when only conditions such as gender, age, region, or occupation are changed.",
    reason: "편향은 모델만의 문제가 아니라 데이터, 프롬프트, 평가 방식에서 모두 발생할 수 있습니다.",
    reasonEn: "Bias can come not only from the model, but also from data, prompts, and evaluation methods.",
    evidence: ["Google Responsible AI Practices", "Microsoft Responsible AI Standard", "NIST AI RMF — Map / Measure"],
    evidenceEn: ["Google Responsible AI Practices", "Microsoft Responsible AI Standard", "NIST AI RMF — Map / Measure"],
  },
  {
    title: "자동화는 되돌릴 수 있는 일부터 적용한다",
    titleEn: "Apply automation first to reversible work",
    rule: "AI Agent나 자동 실행 기능은 초안 작성, 분류, 요약처럼 되돌릴 수 있는 작업부터 적용합니다.",
    ruleEn: "Apply AI agents or automated execution first to reversible tasks such as drafting, classification, and summarization.",
    reason: "AI가 도구를 호출하고 행동하는 범위가 넓어질수록 실수의 영향도 커집니다. 자동화 범위는 위험도에 맞게 제한해야 합니다.",
    reasonEn: "As AI gains more ability to call tools and take actions, the impact of mistakes grows. Automation scope should match the risk level.",
    evidence: ["NIST AI RMF — Manage", "EU AI Act — Risk-based approach", "Agent / Tool Calling 안전 기준"],
    evidenceEn: ["NIST AI RMF — Manage", "EU AI Act — Risk-based approach", "Agent / Tool Calling safety practice"],
  },
];

export interface AutomationIdea {
  title: string;
  description: string;
}

export const automationIdeas: AutomationIdea[] = [
  { title: "Evaluation Checklist Generator", description: "서비스 특성에 맞는 평가 기준을 자동 생성합니다. 금융/의료/교육 등 도메인별 필수 항목을 포함합니다." },
  { title: "Red-Team Prompt Set", description: "일반 요청, 우회 요청, 엣지 케이스를 포함한 테스트 프롬프트 세트를 자동 생성합니다." },
  { title: "Response Scoring Sheet", description: "평가 기준별 점수와 코멘트를 기록하는 시트. 여러 모델/버전을 비교할 때 사용합니다." },
  { title: "Issue Tagging System", description: "발견된 문제를 리스크 유형(할루시네이션, 편향, 개인정보 등)별로 태깅하고 추적합니다." },
];

/* ── 04. AI Glossary ── */

export type GlossaryCategory = "All" | "Safety" | "Evaluation" | "Architecture" | "Technique";

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  "All",
  "Safety",
  "Evaluation",
  "Architecture",
  "Technique",
];

export interface GlossaryTerm {
  term: string;
  definition: string;
  definitionEn: string;
  category: Exclude<GlossaryCategory, "All">;
}

export const glossaryTerms: GlossaryTerm[] = [
  // ── Architecture ──
  { term: "LLM (Large Language Model)", definition: "대규모 텍스트 데이터로 학습된 언어 모델. GPT, Claude, Gemini 등이 대표적입니다.", definitionEn: "A language model trained on large-scale text data. GPT, Claude, and Gemini are representative examples.", category: "Architecture" },
  { term: "SLM (Small Language Model)", definition: "경량화된 언어 모델. Phi, Gemma 등 온디바이스 실행이나 특정 도메인에 최적화된 모델입니다.", definitionEn: "A lightweight language model optimized for on-device execution or specific domains, such as Phi and Gemma.", category: "Architecture" },
  { term: "RAG (Retrieval-Augmented Generation)", definition: "외부 문서를 검색한 뒤 그 내용을 LLM에 전달하여 답변을 생성하는 방식입니다.", definitionEn: "A method that retrieves external documents and passes their content to an LLM to generate responses.", category: "Architecture" },
  { term: "Embedding", definition: "텍스트를 수치 벡터로 변환하는 과정. 의미가 비슷한 텍스트는 벡터 공간에서 가까이 위치합니다.", definitionEn: "The process of converting text into numerical vectors. Semantically similar texts are positioned closer in vector space.", category: "Architecture" },
  { term: "Vector DB", definition: "임베딩 벡터를 저장하고 유사도 검색을 수행하는 데이터베이스. Pinecone, FAISS, ChromaDB 등이 있습니다.", definitionEn: "A database that stores embedding vectors and performs similarity searches. Examples include Pinecone, FAISS, and ChromaDB.", category: "Architecture" },
  { term: "Context Window", definition: "LLM이 한 번에 처리할 수 있는 텍스트의 최대 길이(토큰 수)입니다.", definitionEn: "The maximum length of text (number of tokens) an LLM can process at once.", category: "Architecture" },
  { term: "Token", definition: "LLM이 텍스트를 처리하는 최소 단위. 단어, 서브워드, 또는 문자 단위로 분할됩니다.", definitionEn: "The smallest unit an LLM uses to process text. Can be split at word, subword, or character level.", category: "Architecture" },
  { term: "Grounding", definition: "AI 답변이 실제 데이터나 문서에 기반하도록 하는 기법입니다. RAG가 대표적입니다.", definitionEn: "A technique ensuring AI responses are based on actual data or documents. RAG is the most common example.", category: "Architecture" },
  { term: "Transformer", definition: "Self-Attention 메커니즘을 사용하는 딥러닝 아키텍처. 현대 LLM의 기반 구조입니다.", definitionEn: "A deep learning architecture using self-attention mechanisms. The foundation of modern LLMs.", category: "Architecture" },
  { term: "Attention", definition: "입력 시퀀스에서 어떤 부분에 집중할지 결정하는 메커니즘. Transformer의 핵심 구성요소입니다.", definitionEn: "A mechanism that determines which parts of the input sequence to focus on. The core component of Transformers.", category: "Architecture" },
  { term: "Diffusion Model", definition: "노이즈를 점진적으로 제거하며 이미지를 생성하는 모델. Stable Diffusion, DALL·E 3 등에 사용됩니다.", definitionEn: "A model that generates images by progressively removing noise. Used in Stable Diffusion, DALL·E 3, etc.", category: "Architecture" },
  { term: "Multimodal", definition: "텍스트, 이미지, 오디오, 비디오 등 여러 형태의 데이터를 동시에 처리할 수 있는 AI 모델입니다.", definitionEn: "An AI model capable of processing multiple data types simultaneously, including text, images, audio, and video.", category: "Architecture" },
  { term: "Latent Space", definition: "고차원 데이터를 압축한 저차원 표현 공간. 생성 모델이 이 공간에서 새로운 데이터를 생성합니다.", definitionEn: "A lower-dimensional representation space created by compressing high-dimensional data. Generative models create new data in this space.", category: "Architecture" },

  // ── Technique ──
  { term: "Prompt Engineering", definition: "AI에게 원하는 결과를 얻기 위해 입력(프롬프트)을 설계하고 최적화하는 기법입니다.", definitionEn: "The technique of designing and optimizing inputs (prompts) to get desired results from AI.", category: "Technique" },
  { term: "Few-shot Learning", definition: "프롬프트에 몇 개의 예시를 포함하여 모델이 패턴을 학습하고 유사한 응답을 생성하게 하는 기법입니다.", definitionEn: "A technique where a few examples are included in the prompt so the model learns patterns and generates similar responses.", category: "Technique" },
  { term: "Zero-shot Learning", definition: "예시 없이 지시만으로 모델이 작업을 수행하게 하는 기법입니다.", definitionEn: "A technique where the model performs tasks with only instructions and no examples.", category: "Technique" },
  { term: "Chain-of-Thought (CoT)", definition: "모델이 단계별로 추론 과정을 출력하도록 유도하여 복잡한 문제 해결 능력을 높이는 기법입니다.", definitionEn: "A technique that improves complex problem-solving by prompting the model to output reasoning steps.", category: "Technique" },
  { term: "Agent", definition: "LLM이 도구를 사용하고, 계획을 세우고, 반복적으로 행동하여 목표를 달성하는 시스템입니다.", definitionEn: "A system where an LLM uses tools, makes plans, and acts iteratively to achieve goals.", category: "Technique" },
  { term: "Tool Calling (Function Calling)", definition: "LLM이 외부 함수나 API를 호출하여 정보를 가져오거나 작업을 수행하는 기능입니다.", definitionEn: "The capability for an LLM to call external functions or APIs to retrieve information or perform tasks.", category: "Technique" },
  { term: "MCP (Model Context Protocol)", definition: "AI 모델이 외부 도구 및 데이터 소스와 상호작용하기 위한 표준 프로토콜입니다.", definitionEn: "A standard protocol for AI models to interact with external tools and data sources.", category: "Technique" },
  { term: "Fine-tuning", definition: "사전 학습된 모델을 특정 도메인이나 작업에 맞게 추가 학습시키는 과정입니다.", definitionEn: "The process of additionally training a pre-trained model for a specific domain or task.", category: "Technique" },
  { term: "LoRA (Low-Rank Adaptation)", definition: "전체 모델 가중치를 수정하지 않고 소수의 파라미터만 학습하여 효율적으로 파인튜닝하는 기법입니다.", definitionEn: "A technique for efficient fine-tuning by training only a small number of parameters without modifying the entire model weights.", category: "Technique" },
  { term: "RLHF (Reinforcement Learning from Human Feedback)", definition: "사람의 피드백을 보상 신호로 사용하여 모델을 학습시키는 강화학습 기법입니다.", definitionEn: "A reinforcement learning technique that uses human feedback as reward signals to train models.", category: "Technique" },
  { term: "Temperature", definition: "모델 출력의 무작위성을 조절하는 파라미터. 낮으면 결정적, 높으면 창의적 응답을 생성합니다.", definitionEn: "A parameter controlling output randomness. Lower values produce deterministic responses, higher values produce creative ones.", category: "Technique" },
  { term: "Top-p (Nucleus Sampling)", definition: "누적 확률이 p 이하인 토큰들 중에서만 다음 토큰을 선택하는 샘플링 방식입니다.", definitionEn: "A sampling method that selects the next token only from tokens whose cumulative probability is at most p.", category: "Technique" },
  { term: "Chunking", definition: "긴 문서를 일정 크기의 조각으로 분할하는 과정. RAG에서 검색 품질에 직접 영향을 줍니다.", definitionEn: "The process of splitting long documents into fixed-size segments. Directly impacts retrieval quality in RAG.", category: "Technique" },
  { term: "Semantic Search", definition: "키워드 매칭이 아닌 의미 기반으로 검색하는 방식. 임베딩 벡터 유사도를 활용합니다.", definitionEn: "A search method based on meaning rather than keyword matching. Uses embedding vector similarity.", category: "Technique" },
  { term: "Agentic Coding", definition: "AI Agent가 코드 작성, 실행, 디버깅까지 자율적으로 수행하는 개발 방식입니다.", definitionEn: "A development approach where AI agents autonomously write, execute, and debug code.", category: "Technique" },

  // ── Safety ──
  { term: "Hallucination", definition: "AI가 그럴듯하지만 사실이 아닌 정보를 자신감 있게 생성하는 현상입니다.", definitionEn: "The phenomenon where AI confidently generates plausible but factually incorrect information.", category: "Safety" },
  { term: "Prompt Injection", definition: "사용자가 프롬프트를 조작하여 AI의 원래 지시를 무시하게 만드는 공격 기법입니다.", definitionEn: "An attack technique where users manipulate prompts to make the AI ignore its original instructions.", category: "Safety" },
  { term: "Jailbreaking", definition: "모델의 안전 제한을 우회하여 금지된 응답을 유도하는 기법입니다.", definitionEn: "A technique to bypass model safety restrictions and induce prohibited responses.", category: "Safety" },
  { term: "Guardrail", definition: "AI 출력을 사전/사후로 필터링하여 유해하거나 부적절한 답변을 차단하는 장치입니다.", definitionEn: "A mechanism that filters AI output before or after generation to block harmful or inappropriate responses.", category: "Safety" },
  { term: "Bias", definition: "학습 데이터, 프롬프트, 평가 방식에 의해 AI가 특정 집단에 불공정한 결과를 만드는 현상입니다.", definitionEn: "The phenomenon where AI produces unfair results for specific groups due to training data, prompts, or evaluation methods.", category: "Safety" },
  { term: "Alignment", definition: "AI 모델의 행동을 인간의 의도, 가치, 윤리에 맞추는 과정입니다.", definitionEn: "The process of aligning AI model behavior with human intentions, values, and ethics.", category: "Safety" },
  { term: "Data Poisoning", definition: "학습 데이터에 악의적인 데이터를 주입하여 모델의 동작을 조작하는 공격입니다.", definitionEn: "An attack that manipulates model behavior by injecting malicious data into training data.", category: "Safety" },
  { term: "Adversarial Attack", definition: "모델을 속이기 위해 의도적으로 조작된 입력을 사용하는 공격 기법입니다.", definitionEn: "An attack technique using intentionally crafted inputs designed to deceive the model.", category: "Safety" },

  // ── Evaluation ──
  { term: "Red Teaming", definition: "AI 시스템의 취약점을 찾기 위해 의도적으로 공격적이거나 극단적인 입력을 시도하는 평가 방법입니다.", definitionEn: "An evaluation method that intentionally uses aggressive or extreme inputs to find vulnerabilities in AI systems.", category: "Evaluation" },
  { term: "Benchmark", definition: "모델 성능을 정량적으로 비교하기 위한 표준 테스트 세트. MMLU, HumanEval, MT-Bench 등이 있습니다.", definitionEn: "Standard test sets for quantitatively comparing model performance. Examples include MMLU, HumanEval, and MT-Bench.", category: "Evaluation" },
  { term: "Human-in-the-Loop", definition: "AI의 판단이나 출력에 사람의 검토와 승인을 포함하는 설계 방식입니다.", definitionEn: "A design approach that includes human review and approval in AI decisions or outputs.", category: "Evaluation" },
  { term: "Evaluation (AI 평가)", definition: "AI 모델이나 서비스의 품질을 정량적/정성적으로 측정하는 과정입니다.", definitionEn: "The process of measuring the quality of AI models or services both quantitatively and qualitatively.", category: "Evaluation" },
  { term: "A/B Testing (AI)", definition: "두 가지 AI 모델이나 프롬프트 변형의 성능을 실제 사용자 데이터로 비교하는 실험 방법입니다.", definitionEn: "An experimental method comparing the performance of two AI models or prompt variations using real user data.", category: "Evaluation" },
  { term: "Perplexity", definition: "언어 모델이 텍스트를 얼마나 잘 예측하는지 측정하는 지표. 낮을수록 좋은 성능을 의미합니다.", definitionEn: "A metric measuring how well a language model predicts text. Lower values indicate better performance.", category: "Evaluation" },
  { term: "BLEU / ROUGE", definition: "생성된 텍스트와 참조 텍스트 간의 유사도를 측정하는 자동 평가 지표입니다.", definitionEn: "Automated evaluation metrics that measure similarity between generated text and reference text.", category: "Evaluation" },
  { term: "Latency", definition: "AI 모델이 요청을 받고 응답을 생성하기까지 걸리는 시간입니다.", definitionEn: "The time it takes for an AI model to receive a request and generate a response.", category: "Evaluation" },
];

/* ── 05. Media Notes (LOCKED — DO NOT MODIFY) ── */

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
    title: "AI 시대 절대 해고되지 않을 사람은 '이런 특징'이 있다",
    topic: "AI Agent / Engineering Mindset / Workflow",
    summary: "AI 혁명은 기존 조직과 커리어의 안전망을 빠르게 가볍게 만들고, 대기업·직함·반복 업무에 기대는 방식만으로는 오래 버티기 어렵다는 내용입니다. 앞으로 끝까지 필요한 사람은 AI보다 빠르게 답을 내는 사람이 아니라, 변화의 맥락을 읽고 문제를 다시 정의하며 자신이 만든 결과의 의미와 책임을 설명할 수 있는 사람입니다. 결국 해고되지 않는 사람은 AI와 경쟁하기보다 AI를 도구로 삼아 더 나은 질문, 판단, 실행 구조를 만들어내는 사람이라고 정리할 수 있습니다.",
    myTake: "단순히 AI에게 질문하는 것이 아니라, 작업 기준과 검증 절차를 설계하는 것이 중요하다는 점을 체감했습니다.",
    insight: "AI Agent는 단순 답변 도구보다 반복되는 작업 흐름과 의사결정 구조를 정리할 때 더 큰 가치가 있습니다.",
    appliedTo: "Claude Code를 사용할 때 구조 탐색 → Plan Mode → 작은 단위 수정 → 브라우저 검증 순서로 요청하는 규칙에 반영했습니다.",
    keywords: ["AI Agent", "Claude Code", "Workflow", "Evaluation", "Productivity"],
  },
];

/* ── 06. AI Tools (unchanged) ── */

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
  categoryEn: string;
  usedFor: string;
  usedForEn: string;
  useCase: string;
  useCaseEn: string;
  strengths: string[];
  strengthsEn: string[];
  limitations: string[];
  limitationsEn: string[];
  review: string;
  reviewEn: string;
  tags: string[];
  groups: Exclude<AIToolFilter, "All">[];
}

export const aiTools: AITool[] = [
  {
    name: "Claude Code",
    category: "코딩 에이전트",
    categoryEn: "Coding Agent",
    usedFor: "포트폴리오 개발, UI 리팩터링, 컴포넌트 구조 분석",
    usedForEn: "Portfolio development, UI refactoring, component structure analysis",
    useCase: "포트폴리오 사이트의 섹션 구조를 분석하고, UI/UX 개선 사항을 코드에 반영하는 데 사용했습니다.",
    useCaseEn: "Used to analyze the section structure of my portfolio site and apply UI/UX improvements directly in code.",
    strengths: ["큰 코드베이스 구조를 파악하는 데 강함", "수정 전 계획을 세우게 할 수 있음", "디자인/기능 요구사항을 긴 프롬프트로 전달하기 좋음"],
    strengthsEn: ["Strong at understanding large codebase structures", "Can be guided to plan before making changes", "Well-suited for conveying design/feature requirements in long prompts"],
    limitations: ["프롬프트가 불명확하면 기존 디자인을 과하게 바꾸는 경우가 있음", "실제 브라우저에서의 스크롤, 반응형, 레이아웃 문제는 사람이 직접 확인해야 함"],
    limitationsEn: ["May overhaul existing designs when prompts are unclear", "Scroll behavior, responsive layout, and visual issues must be verified manually in the browser"],
    review: 'Claude Code는 단순 코드 생성기보다, 개발 흐름을 함께 설계하는 페어 프로그래밍 도구에 가깝다고 느꼈습니다. 하지만 좋은 결과를 얻으려면 "무엇을 바꾸지 말아야 하는지"까지 명확히 말해야 했습니다.',
    reviewEn: 'Claude Code felt more like a pair programming tool that co-designs the development flow than a simple code generator. However, getting good results required clearly stating "what not to change" as well.',
    tags: ["Claude Code", "코딩 에이전트", "리팩터링", "포트폴리오"],
    groups: ["Coding", "Automation"],
  },
  {
    name: "ChatGPT",
    category: "생각 정리 / 프롬프트 설계",
    categoryEn: "Thought Organization / Prompt Design",
    usedFor: "프롬프트 작성, 개념 구체화, 포트폴리오 전략, 기술 설명 정리",
    usedForEn: "Prompt writing, concept development, portfolio strategy, technical documentation",
    useCase: "Claude에게 전달할 개발 프롬프트를 정리하거나, 포트폴리오 섹션의 방향성, 문구, 구조를 구체화하는 데 사용했습니다.",
    useCaseEn: "Used to refine development prompts for Claude and to develop direction, wording, and structure for portfolio sections.",
    strengths: ["모호한 생각을 구조화하는 데 강함", "한국어로 빠르게 방향성을 정리하기 좋음", "기획, 문장, 기술 설명을 연결해주기 좋음"],
    strengthsEn: ["Strong at structuring vague ideas", "Great for quickly organizing direction in Korean", "Good at connecting planning, writing, and technical explanations"],
    limitations: ["실제 코드베이스를 직접 수정하지 않기 때문에 최종 구현은 별도 도구가 필요함", "최신 정보나 실제 사이트 상태는 확인이 필요함"],
    limitationsEn: ["Cannot directly modify actual codebases, so separate tools are needed for implementation", "Latest information and actual site status need to be verified separately"],
    review: "ChatGPT는 제가 하고 싶은 말을 개발자가 이해할 수 있는 요구사항으로 바꾸는 데 가장 많이 사용한 도구입니다.",
    reviewEn: "ChatGPT is the tool I used most to translate what I wanted to say into requirements that developers can understand.",
    tags: ["프롬프트", "기획", "글쓰기", "포트폴리오"],
    groups: ["Writing", "Research"],
  },
  {
    name: "Cursor",
    category: "AI 코드 에디터",
    categoryEn: "AI Code Editor",
    usedFor: "코드 수정, 인라인 제안, 코드베이스 질의응답",
    usedForEn: "Code editing, inline suggestions, codebase Q&A",
    useCase: "VS Code 기반의 AI 코드 에디터로, 코드 작성 중 인라인 제안과 코드베이스에 대한 질문을 통해 개발 속도를 높이는 데 활용했습니다.",
    useCaseEn: "A VS Code-based AI code editor used to speed up development through inline suggestions and codebase-level Q&A during coding.",
    strengths: ["에디터 내에서 바로 AI와 대화할 수 있어 컨텍스트 전환이 적음", "Tab 자동완성이 코드 흐름에 맞게 잘 동작함"],
    strengthsEn: ["Minimal context switching since you can interact with AI directly in the editor", "Tab autocomplete works well with the code flow"],
    limitations: ["긴 리팩토링이나 멀티파일 수정은 CLI 기반 도구가 더 효율적", "프로젝트 전체 구조를 파악하는 데는 한계가 있음"],
    limitationsEn: ["CLI-based tools are more efficient for long refactoring or multi-file edits", "Limited in understanding the overall project structure"],
    review: "Cursor는 빠른 코드 수정과 탐색에 좋지만, 구조적인 리팩토링에는 Claude Code와 병행하는 것이 효과적이었습니다.",
    reviewEn: "Cursor is great for quick code edits and exploration, but for structural refactoring, it was most effective when used alongside Claude Code.",
    tags: ["코드 에디터", "AI IDE", "자동완성"],
    groups: ["Coding"],
  },
  {
    name: "GitHub Copilot",
    category: "코드 자동완성",
    categoryEn: "Code Autocomplete",
    usedFor: "코드 자동완성, 보일러플레이트 생성, 테스트 초안 작성",
    usedForEn: "Code autocomplete, boilerplate generation, test draft writing",
    useCase: "반복적인 코드 패턴이나 보일러플레이트를 빠르게 생성하고, 테스트 코드 초안을 작성하는 데 사용했습니다.",
    useCaseEn: "Used to quickly generate repetitive code patterns and boilerplate, and to draft test code.",
    strengths: ["반복 패턴을 빠르게 자동완성해줌", "테스트 코드 초안 작성에 유용"],
    strengthsEn: ["Quickly autocompletes repetitive patterns", "Useful for drafting test code"],
    limitations: ["컨텍스트를 벗어난 제안이 종종 있음", "복잡한 비즈니스 로직에서는 정확도가 떨어짐"],
    limitationsEn: ["Often provides suggestions that are out of context", "Accuracy drops with complex business logic"],
    review: "Copilot은 타이핑 속도를 줄이는 데는 좋지만, 코드의 의도를 이해하고 설계하는 것은 여전히 개발자 몫입니다.",
    reviewEn: "Copilot is great for reducing typing time, but understanding code intent and design remains the developer's responsibility.",
    tags: ["자동완성", "VS Code", "GitHub"],
    groups: ["Coding"],
  },
  {
    name: "Perplexity",
    category: "AI 검색 엔진",
    categoryEn: "AI Search Engine",
    usedFor: "기술 리서치, 공식 문서 확인, 비교 분석",
    usedForEn: "Technical research, official documentation verification, comparative analysis",
    useCase: "기술 비교, 라이브러리 선택, 에러 해결 시 빠르게 최신 정보를 검색하고 요약된 답변을 얻는 데 활용했습니다.",
    useCaseEn: "Used to quickly search for the latest information and get summarized answers when comparing technologies, choosing libraries, and resolving errors.",
    strengths: ["출처가 명확한 답변을 제공", "기술 문서와 블로그를 빠르게 요약해줌"],
    strengthsEn: ["Provides answers with clear source citations", "Quickly summarizes technical docs and blog posts"],
    limitations: ["깊은 코드 레벨의 디버깅에는 부족함", "한국어 자료 검색 범위가 제한적일 수 있음"],
    limitationsEn: ["Insufficient for deep code-level debugging", "Korean-language resource coverage can be limited"],
    review: "Perplexity는 Google 검색을 대체하기보다, 기술 리서치의 첫 단계를 빠르게 만들어주는 도구입니다.",
    reviewEn: "Perplexity is less a replacement for Google search and more a tool that accelerates the first step of technical research.",
    tags: ["검색", "리서치", "문서 확인"],
    groups: ["Research"],
  },
  {
    name: "Suno",
    category: "음악 생성",
    categoryEn: "Music Generation",
    usedFor: "포트폴리오 배경음악과 분위기 탐색",
    usedForEn: "Exploring background music and mood for the portfolio",
    useCase: "포트폴리오에 어울리는 분위기의 BGM을 실험하기 위해 사용했습니다.",
    useCaseEn: "Used to experiment with BGM that fits the mood of my portfolio.",
    strengths: ["짧은 설명만으로 분위기 있는 음악을 빠르게 만들 수 있음", "포트폴리오의 감정적 톤을 실험하기 좋음"],
    strengthsEn: ["Can quickly create atmospheric music from a short description", "Great for experimenting with the emotional tone of a portfolio"],
    limitations: ["원하는 분위기를 정확히 맞추려면 여러 번 수정해야 함", "실제 웹사이트에 넣을 때는 저작권, 로딩 속도를 고려해야 함"],
    limitationsEn: ["Requires multiple iterations to achieve the exact desired mood", "Copyright and loading speed must be considered when embedding in a website"],
    review: "Suno는 포트폴리오를 하나의 경험으로 만들 수 있는 가능성을 보여준 도구였습니다.",
    reviewEn: "Suno was a tool that showed the possibility of turning a portfolio into a complete experience.",
    tags: ["음악 AI", "무드", "포트폴리오 경험"],
    groups: ["Design"],
  },
  {
    name: "Midjourney",
    category: "이미지 생성",
    categoryEn: "Image Generation",
    usedFor: "컨셉 아트, UI 무드보드, 비주얼 방향 탐색",
    usedForEn: "Concept art, UI mood boards, visual direction exploration",
    useCase: "포트폴리오의 비주얼 방향성을 탐색하거나, 섹션별 분위기를 시각적으로 실험하는 데 사용했습니다.",
    useCaseEn: "Used to explore the visual direction of my portfolio and visually experiment with section-specific moods.",
    strengths: ["고퀄리티의 이미지를 빠르게 생성", "디자인 레퍼런스와 무드보드 작성에 유용"],
    strengthsEn: ["Quickly generates high-quality images", "Useful for design references and mood boards"],
    limitations: ["정확한 UI 요소나 텍스트 생성에는 한계", "원하는 스타일을 맞추려면 프롬프트 반복 실험이 필요"],
    limitationsEn: ["Limited in generating precise UI elements or text", "Requires repeated prompt experimentation to match the desired style"],
    review: "Midjourney는 '이런 느낌이었으면 좋겠다'를 시각화하는 데 가장 빠른 도구였습니다.",
    reviewEn: "Midjourney was the fastest tool for visualizing 'I wish it felt like this.'",
    tags: ["이미지 AI", "디자인", "비주얼"],
    groups: ["Design"],
  },
  {
    name: "v0 by Vercel",
    category: "UI 생성",
    categoryEn: "UI Generation",
    usedFor: "React 컴포넌트 프로토타이핑, UI 디자인을 코드로 변환",
    usedForEn: "React component prototyping, converting UI designs to code",
    useCase: "UI 컴포넌트의 초안을 빠르게 생성하고, shadcn/ui 기반의 디자인 패턴을 탐색하는 데 사용했습니다.",
    useCaseEn: "Used to quickly generate UI component drafts and explore design patterns based on shadcn/ui.",
    strengths: ["shadcn/ui + Tailwind 기반으로 바로 사용 가능한 코드 생성", "디자인 프로토타이핑이 빠름"],
    strengthsEn: ["Generates ready-to-use code based on shadcn/ui + Tailwind", "Fast design prototyping"],
    limitations: ["실제 프로젝트에 통합할 때 구조 조정이 필요", "복잡한 인터랙션이나 상태 관리는 직접 구현해야 함"],
    limitationsEn: ["Structural adjustments needed when integrating into real projects", "Complex interactions and state management must be implemented manually"],
    review: "v0는 UI 초안을 만들고 아이디어를 빠르게 검증하는 데 유용하지만, 프로덕션 코드로 바로 쓰기엔 추가 작업이 필요합니다.",
    reviewEn: "v0 is useful for creating UI drafts and quickly validating ideas, but additional work is needed before using it as production code.",
    tags: ["UI", "Vercel", "프로토타이핑", "React"],
    groups: ["Design", "Coding"],
  },
  {
    name: "Image to Code Tool",
    category: "이미지 기반 UI 생성",
    categoryEn: "Image-Based UI Generation",
    usedFor: "레퍼런스 이미지를 React + Tailwind UI로 변환",
    usedForEn: "Converting reference images to React + Tailwind UI",
    useCase: "실사 ID badge 이미지나 포트폴리오 UI 레퍼런스를 코드로 변환하는 실험에 사용했습니다.",
    useCaseEn: "Used for experiments converting realistic ID badge images and portfolio UI references into code.",
    strengths: ["이미지 기반 레이아웃을 빠르게 코드로 옮겨볼 수 있음", "React + Tailwind 구조를 빠르게 시작하기 좋음"],
    strengthsEn: ["Can quickly convert image-based layouts to code", "Great for quickly bootstrapping React + Tailwind structures"],
    limitations: ["실제 이미지의 질감, 그림자 같은 디테일은 완벽히 재현하기 어려움", "결과물이 비슷해 보여도 세부 비율과 반응형은 직접 수정해야 함"],
    limitationsEn: ["Difficult to perfectly reproduce details like texture and shadows from real images", "Even if results look similar, fine-tuning proportions and responsiveness requires manual work"],
    review: 'Image to Code 도구는 "초안 생성"에는 좋지만, 완성도 높은 UI를 만들기 위해서는 사람이 디테일을 계속 조정해야 합니다.',
    reviewEn: 'Image to Code tools are good for "draft generation," but creating polished UI requires continuous human fine-tuning of details.',
    tags: ["이미지 to 코드", "React", "Tailwind", "UI 실험"],
    groups: ["Design", "Coding"],
  },
  {
    name: "Notion AI",
    category: "생산성 / 글쓰기",
    categoryEn: "Productivity / Writing",
    usedFor: "문서 정리, 회의록 요약, 작업 관리",
    usedForEn: "Document organization, meeting notes summarization, task management",
    useCase: "프로젝트 문서 정리, 회의록 요약, 작업 항목 관리를 Notion AI로 보조하여 효율을 높였습니다.",
    useCaseEn: "Used Notion AI to assist with project documentation, meeting note summaries, and task management for improved efficiency.",
    strengths: ["Notion 워크스페이스 내에서 바로 사용할 수 있어 워크플로우가 끊기지 않음", "문서 요약과 정리에 특히 강함"],
    strengthsEn: ["Can be used directly within the Notion workspace without breaking workflow", "Particularly strong at document summarization and organization"],
    limitations: ["코드 생성이나 기술적 분석에는 한계가 있음", "복잡한 프롬프트 기반 작업에는 전용 AI 도구가 더 적합"],
    limitationsEn: ["Limited in code generation and technical analysis", "Dedicated AI tools are more suitable for complex prompt-based tasks"],
    review: "Notion AI는 생각을 정리하는 도구로는 훌륭하지만, 기술 작업에는 보조적인 역할에 가깝습니다.",
    reviewEn: "Notion AI is excellent as a tool for organizing thoughts, but plays a supplementary role for technical work.",
    tags: ["Notion", "생산성", "문서화"],
    groups: ["Writing", "Automation"],
  },
  {
    name: "Wrtn / 뤼튼",
    category: "한국어 AI 글쓰기 도구",
    categoryEn: "Korean AI Writing Tool",
    usedFor: "한국어 문장 정리, 아이디어 초안, 콘텐츠 다듬기",
    usedForEn: "Korean sentence refinement, idea drafting, content polishing",
    useCase: "한국어 기반의 문장 정리, 아이디어 초안, 지원서나 포트폴리오 문구를 다듬는 데 사용했습니다.",
    useCaseEn: "Used for Korean-based sentence refinement, idea drafting, and polishing application and portfolio copy.",
    strengths: ["한국어 문장 생성과 톤 조절에 접근성이 좋음", "빠르게 초안을 만들기 좋음"],
    strengthsEn: ["Accessible for Korean sentence generation and tone adjustment", "Great for quickly creating drafts"],
    limitations: ["깊은 기술적 맥락이나 코드 기반 문제 해결에는 한계가 있음", "결과물이 일반적인 문장처럼 느껴질 때가 있어 직접 수정이 필요함"],
    limitationsEn: ["Limited in deep technical context or code-based problem solving", "Output can sometimes feel generic, requiring manual editing"],
    review: "뤼튼은 한국어 초안 작성에는 편하지만, 기술 포트폴리오에서는 경험과 생각을 직접 더해야 완성도가 올라갑니다.",
    reviewEn: "Wrtn is convenient for Korean drafts, but for technical portfolios, adding personal experience and perspective is necessary to elevate quality.",
    tags: ["한국어 글쓰기", "초안", "AI 글쓰기"],
    groups: ["Writing"],
  },
  {
    name: "Claude (Web)",
    category: "AI 어시스턴트",
    categoryEn: "AI Assistant",
    usedFor: "장문 분석, 코드 리뷰, 아키텍처 논의",
    usedForEn: "Long-form analysis, code review, architecture discussion",
    useCase: "긴 코드를 분석하거나, 아키텍처 설계에 대한 장문의 토론, 복잡한 기술 개념 설명에 사용했습니다.",
    useCaseEn: "Used for analyzing long code, in-depth discussions on architecture design, and explaining complex technical concepts.",
    strengths: ["긴 컨텍스트를 유지하면서 깊이 있는 분석 가능", "코드 리뷰와 아키텍처 피드백이 체계적"],
    strengthsEn: ["Capable of deep analysis while maintaining long context", "Systematic code review and architecture feedback"],
    limitations: ["실시간 코드 실행이나 파일 수정은 불가", "프로젝트 상태를 직접 확인할 수 없어 매번 컨텍스트를 제공해야 함"],
    limitationsEn: ["Cannot execute code in real-time or modify files", "Must provide context each time since it cannot directly check project state"],
    review: "Claude Web은 깊이 있는 사고가 필요한 작업에 적합하고, Claude Code와 역할을 분리해서 사용하면 효과적입니다.",
    reviewEn: "Claude Web is suited for tasks requiring deep thinking, and is most effective when used with a clear role separation from Claude Code.",
    tags: ["Claude", "분석", "아키텍처", "코드 리뷰"],
    groups: ["Writing", "Research"],
  },
  {
    name: "Gemini",
    category: "멀티모달 AI",
    categoryEn: "Multimodal AI",
    usedFor: "이미지 분석, 멀티모달 작업, Google 생태계 연동",
    usedForEn: "Image analysis, multimodal tasks, Google ecosystem integration",
    useCase: "이미지와 텍스트를 함께 분석하거나, Google 생태계와 연동된 작업에 활용했습니다.",
    useCaseEn: "Used for analyzing images and text together, and for tasks integrated with the Google ecosystem.",
    strengths: ["이미지, 영상, 텍스트를 동시에 처리 가능", "Google 서비스와의 통합이 자연스러움"],
    strengthsEn: ["Can process images, video, and text simultaneously", "Natural integration with Google services"],
    limitations: ["코딩 전용 도구에 비해 코드 생성 품질이 다소 낮음", "한국어 맥락 이해가 다른 도구에 비해 부족한 경우가 있음"],
    limitationsEn: ["Code generation quality is somewhat lower compared to dedicated coding tools", "Korean context understanding can be weaker compared to other tools"],
    review: "Gemini는 멀티모달 작업에서 가능성을 보여주지만, 코드 중심 작업에서는 Claude나 ChatGPT가 더 효율적이었습니다.",
    reviewEn: "Gemini shows promise in multimodal tasks, but Claude and ChatGPT were more efficient for code-centric work.",
    tags: ["멀티모달", "Google", "이미지 분석"],
    groups: ["Research", "Design"],
  },
];

/* ── 07. Rules & Principles — 공식 문서 아카이브 ── */

export const rulesPrinciplesIntro = "주요 AI 기업과 규제 기관이 발행한 공식 문서, 정책, 가이드라인을 정리한 공간입니다. 개인 의견 없이 원문의 핵심 내용만 요약합니다.";

export const rulesPrinciplesIntroEn = "A curated archive of official documents, policies, and guidelines published by major AI companies and regulatory bodies. Only core content from the original documents is summarized, without personal opinions.";

export interface OfficialDocument {
  organization: string;
  title: string;
  summary: string;
  summaryEn: string;
  keyPoints: string[];
  keyPointsEn: string[];
  url: string;
  category: "policy" | "principle" | "regulation" | "standard";
}

export const officialDocuments: OfficialDocument[] = [
  {
    organization: "OpenAI",
    title: "Model Spec",
    summary: "OpenAI 모델의 동작 원칙을 정의한 문서. 모델이 따라야 할 우선순위(developer > user > operator), 거부 기준, 응답 스타일을 명시합니다.",
    summaryEn: "Document defining OpenAI model behavior principles. Specifies priorities (developer > user > operator), refusal criteria, and response styles.",
    keyPoints: [
      "안전 정책 > 개발자 지시 > 사용자 요청 순으로 우선순위 적용",
      "불확실한 정보는 솔직하게 밝히도록 설계",
      "유해한 요청은 이유를 설명하고 거부",
    ],
    keyPointsEn: [
      "Priority order: safety policy > developer instructions > user requests",
      "Designed to honestly disclose uncertain information",
      "Refuse harmful requests with explanation",
    ],
    url: "https://model-spec.openai.com/",
    category: "principle",
  },
  {
    organization: "OpenAI",
    title: "Usage Policies",
    summary: "OpenAI API 및 제품 사용 시 준수해야 할 정책. 허용/금지 사용 사례, 콘텐츠 정책, 데이터 처리 기준을 다룹니다.",
    summaryEn: "Policies to follow when using OpenAI API and products. Covers allowed/prohibited use cases, content policies, and data handling standards.",
    keyPoints: [
      "불법 활동, 악성 코드 생성, 허위 정보 유포 등 금지",
      "고위험 분야(의료, 법률, 금융) 사용 시 추가 제한 적용",
      "자동화된 의사결정에서 인간 감독 요구",
    ],
    keyPointsEn: [
      "Prohibits illegal activities, malware generation, and disinformation",
      "Additional restrictions apply for high-risk domains (healthcare, legal, finance)",
      "Requires human oversight in automated decision-making",
    ],
    url: "https://openai.com/policies/usage-policies/",
    category: "policy",
  },
  {
    organization: "Anthropic",
    title: "Acceptable Use Policy",
    summary: "Claude 사용 시 금지되는 행위와 허용 기준을 명시한 정책 문서. 안전성과 윤리적 사용을 위한 가이드라인을 제공합니다.",
    summaryEn: "Policy document specifying prohibited actions and acceptable use criteria for Claude. Provides guidelines for safe and ethical use.",
    keyPoints: [
      "무기 개발, 감시 시스템, 사기 등 금지 사용 사례 명시",
      "미성년자 보호 관련 엄격한 기준 적용",
      "허위 정보 생성 및 유포 금지",
    ],
    keyPointsEn: [
      "Specifies prohibited use cases including weapons development, surveillance systems, and fraud",
      "Strict standards applied for minor protection",
      "Prohibits generation and distribution of disinformation",
    ],
    url: "https://www.anthropic.com/policies/aup",
    category: "policy",
  },
  {
    organization: "Anthropic",
    title: "Constitutional AI (Research Paper)",
    summary: "인간 피드백 대신 AI가 원칙(헌법)에 따라 스스로 답변을 평가하고 개선하는 학습 방식을 설명한 연구 논문.",
    summaryEn: "Research paper describing a training method where AI evaluates and improves its own responses based on principles (a constitution) instead of human feedback.",
    keyPoints: [
      "Helpful, Harmless, Honest (HHH) 원칙 기반",
      "세 가치가 충돌할 때 Harmless를 우선",
      "원칙을 명문화하면 AI 자체의 자기 검증이 가능",
    ],
    keyPointsEn: [
      "Based on Helpful, Harmless, Honest (HHH) principles",
      "Prioritizes Harmless when the three values conflict",
      "Codifying principles enables AI self-verification",
    ],
    url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback",
    category: "principle",
  },
  {
    organization: "Google",
    title: "Responsible AI Practices",
    summary: "Google의 AI 개발 및 배포 원칙. 공정성, 안전성, 프라이버시, 책임성에 대한 가이드라인을 제시합니다.",
    summaryEn: "Google's principles for AI development and deployment. Provides guidelines on fairness, safety, privacy, and accountability.",
    keyPoints: [
      "AI는 사회적으로 유익해야 하며, 불공정한 편향을 만들지 않도록 노력",
      "사람에게 해를 끼칠 수 있는 영역에서는 배포 제한 또는 추가 검증 요구",
      "AI 기술의 오용을 방지하기 위한 테스트 및 모니터링 절차 수립",
    ],
    keyPointsEn: [
      "AI should be socially beneficial and strive not to create unfair bias",
      "Deployment restrictions or additional verification required in areas that could harm people",
      "Establish testing and monitoring procedures to prevent misuse of AI technology",
    ],
    url: "https://ai.google/responsibility/responsible-ai-practices/",
    category: "principle",
  },
  {
    organization: "Google",
    title: "Gemini API Policy",
    summary: "Gemini API 사용 시 적용되는 정책. 허용/금지 사용 사례, 콘텐츠 제한, 데이터 처리 기준을 명시합니다.",
    summaryEn: "Policies applicable when using the Gemini API. Specifies allowed/prohibited use cases, content restrictions, and data processing standards.",
    keyPoints: [
      "생성된 콘텐츠의 허위 정보 및 기만적 사용 금지",
      "개인정보 수집 및 처리에 대한 사전 동의 필요",
      "자동화된 의사결정 시 투명성 및 설명 가능성 요구",
    ],
    keyPointsEn: [
      "Prohibits disinformation and deceptive use of generated content",
      "Requires prior consent for personal data collection and processing",
      "Demands transparency and explainability in automated decision-making",
    ],
    url: "https://ai.google.dev/gemini-api/terms",
    category: "policy",
  },
  {
    organization: "Microsoft",
    title: "Responsible AI Standard v2",
    summary: "Microsoft의 AI 책임 원칙을 구체적인 실행 기준으로 문서화한 표준. 6가지 원칙(공정성, 신뢰성, 안전성, 프라이버시, 포용성, 투명성)에 대한 실행 가이드를 포함합니다.",
    summaryEn: "A standard documenting Microsoft's responsible AI principles as concrete implementation criteria. Includes execution guides for six principles: fairness, reliability, safety, privacy, inclusiveness, and transparency.",
    keyPoints: [
      "원칙뿐 아니라 구체적인 실행 체크리스트 제공",
      "AI 시스템 배포 전 영향 평가(Impact Assessment) 필수",
      "지속적인 모니터링 및 사고 대응 절차 포함",
    ],
    keyPointsEn: [
      "Provides concrete implementation checklists beyond just principles",
      "Impact Assessment required before deploying AI systems",
      "Includes continuous monitoring and incident response procedures",
    ],
    url: "https://www.microsoft.com/en-us/ai/principles-and-approach",
    category: "standard",
  },
  {
    organization: "EU",
    title: "EU AI Act",
    summary: "AI 시스템을 위험 수준에 따라 4단계(금지/고위험/제한적/최소)로 분류하고, 단계별 의무를 부과하는 세계 최초의 포괄적 AI 규제법.",
    summaryEn: "The world's first comprehensive AI regulation that classifies AI systems into four risk levels (prohibited/high/limited/minimal) and imposes obligations at each level.",
    keyPoints: [
      "금지: 사회점수제, 조작적 AI, 실시간 원격 생체인식",
      "고위험: 신용평가, 채용 심사, 핵심 인프라 — 적합성 평가 및 로깅 의무",
      "제한적: 챗봇, 딥페이크 — AI 사용 사실 고지 의무",
      "최소: 스팸 필터, AI 게임 — 별도 의무 없음",
    ],
    keyPointsEn: [
      "Prohibited: social scoring, manipulative AI, real-time remote biometric identification",
      "High-risk: credit scoring, recruitment, critical infrastructure — conformity assessment and logging obligations",
      "Limited: chatbots, deepfakes — obligation to disclose AI use",
      "Minimal: spam filters, AI games — no specific obligations",
    ],
    url: "https://artificialintelligenceact.eu/",
    category: "regulation",
  },
  {
    organization: "NIST",
    title: "AI Risk Management Framework (AI RMF 1.0)",
    summary: "미국 국립표준기술연구소(NIST)의 AI 위험 관리 프레임워크. Govern, Map, Measure, Manage 4단계로 AI 리스크를 체계적으로 관리하는 방법을 제시합니다.",
    summaryEn: "NIST's AI risk management framework. Presents a systematic approach to managing AI risks through four stages: Govern, Map, Measure, and Manage.",
    keyPoints: [
      "Govern — AI 사용 정책, 책임자, 승인 기준, 기록 방식 수립",
      "Map — 사용자, 데이터, 기능, 위험 식별 및 우선순위 결정",
      "Measure — 정확도, 편향, 개인정보 노출, 환각 등 정량/정성 측정",
      "Manage — 위험 완화 조치, 모니터링, 사고 대응, 재평가",
    ],
    keyPointsEn: [
      "Govern — establish AI usage policies, responsible parties, approval criteria, and documentation",
      "Map — identify users, data, features, risks, and set priorities",
      "Measure — quantitative and qualitative measurement of accuracy, bias, privacy exposure, and hallucination",
      "Manage — risk mitigation, monitoring, incident response, and reassessment",
    ],
    url: "https://www.nist.gov/artificial-intelligence/executive-order-safe-secure-and-trustworthy-artificial-intelligence",
    category: "standard",
  },
  {
    organization: "한국 정부",
    title: "AI 기본법 (인공지능 발전과 신뢰 기반 조성 등에 관한 법률)",
    summary: "2025년 1월 제정된 한국의 AI 기본법. AI 산업 진흥과 동시에 고위험 AI에 대한 안전성 확보 의무를 규정합니다.",
    summaryEn: "South Korea's AI Basic Act enacted in January 2025. Stipulates obligations for ensuring safety of high-risk AI alongside AI industry promotion.",
    keyPoints: [
      "고영향 AI — 생명, 신체, 안전에 영향을 미치는 AI에 대한 사전 평가 의무",
      "AI 생성 콘텐츠에 대한 표시 의무",
      "AI 윤리 원칙 수립 및 준수 권고",
    ],
    keyPointsEn: [
      "High-impact AI — mandatory pre-assessment for AI affecting life, body, and safety",
      "Mandatory disclosure for AI-generated content",
      "Establishment and adherence to AI ethics principles recommended",
    ],
    url: "https://www.law.go.kr/법령/인공지능발전과신뢰기반조성등에관한법률",
    category: "regulation",
  },
];

export interface ReleaseNote {
  date: string;
  organization: string;
  title: string;
  summary: string;
  summaryEn: string;
  url: string;
}

export const releaseNotes: ReleaseNote[] = [
  {
    date: "2025-06",
    organization: "Anthropic",
    title: "Claude 4 (Opus / Sonnet) 출시",
    summary: "코딩, 장문 분석, 에이전트 작업에서 성능이 크게 향상된 Claude 4 시리즈 공개. 확장된 컨텍스트 윈도우와 도구 사용 능력 강화.",
    summaryEn: "Release of the Claude 4 series with significantly improved performance in coding, long-form analysis, and agentic tasks. Enhanced context window and tool-use capabilities.",
    url: "https://www.anthropic.com/news",
  },
  {
    date: "2025-05",
    organization: "OpenAI",
    title: "Model Spec 공개",
    summary: "OpenAI 모델의 동작 원칙, 우선순위, 거부 기준을 명시한 공식 문서. 개발자-사용자-운영자 간 우선순위 체계를 정의.",
    summaryEn: "Official document specifying OpenAI model behavior principles, priorities, and refusal criteria. Defines the priority hierarchy between developers, users, and operators.",
    url: "https://model-spec.openai.com/",
  },
  {
    date: "2025-02",
    organization: "EU",
    title: "EU AI Act 시행 시작",
    summary: "금지 AI 관행에 대한 규정이 2025년 2월부터 시행. 고위험 AI 의무는 2026년부터 단계적 적용 예정.",
    summaryEn: "Regulations on prohibited AI practices took effect from February 2025. High-risk AI obligations to be phased in starting 2026.",
    url: "https://artificialintelligenceact.eu/",
  },
  {
    date: "2025-01",
    organization: "한국 정부",
    title: "AI 기본법 제정",
    summary: "인공지능 발전과 신뢰 기반 조성을 위한 법률 제정. 고영향 AI 사전 평가, AI 생성 콘텐츠 표시 의무 등 포함.",
    summaryEn: "Enactment of legislation for AI development and trust building. Includes mandatory pre-assessment of high-impact AI and AI-generated content disclosure requirements.",
    url: "https://www.law.go.kr/법령/인공지능발전과신뢰기반조성등에관한법률",
  },
  {
    date: "2024-10",
    organization: "NIST",
    title: "AI RMF Generative AI Profile 발행",
    summary: "생성형 AI에 특화된 리스크 관리 가이드라인. 기존 AI RMF 1.0을 생성형 AI 맥락으로 확장한 보충 문서.",
    summaryEn: "Risk management guidelines specialized for generative AI. A supplementary document extending the existing AI RMF 1.0 to the generative AI context.",
    url: "https://airc.nist.gov/Docs/1",
  },
  {
    date: "2024-07",
    organization: "Google",
    title: "Secure AI Framework (SAIF) 업데이트",
    summary: "AI 시스템의 보안 위험을 관리하기 위한 프레임워크. 모델 도난, 프롬프트 인젝션, 데이터 오염 등 AI 특화 보안 위협 대응.",
    summaryEn: "Framework for managing security risks in AI systems. Addresses AI-specific security threats including model theft, prompt injection, and data poisoning.",
    url: "https://safety.google/cybersecurity-advancements/saif/",
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

export const euAiActRiskTableEn: DataTableData = {
  headers: ["Level", "Risk Level", "Regulation Type", "Examples"],
  rows: [
    { cells: ["Prohibited", "Unacceptable", "Complete ban", "Social scoring, manipulative AI, real-time remote biometric identification"] },
    { cells: ["High Risk", "High", "Strict regulation", "Credit scoring, recruitment, biometric identification, critical infrastructure"] },
    { cells: ["Limited Risk", "Limited", "Transparency obligations", "Chatbots, deepfakes, AI-generated content"] },
    { cells: ["Minimal Risk", "Low", "No obligations", "Spam filters, AI games, most commercial AI"] },
  ],
};

/* ── 09. AI Industry History ── */

export interface AIHistoryEvent {
  year: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: "research" | "product" | "regulation" | "milestone";
}

export const aiHistoryTimeline: AIHistoryEvent[] = [
  {
    year: "2006",
    title: "딥러닝 연구의 재부상",
    titleEn: "Deep Learning Research Reemerges",
    description: "Geoffrey Hinton의 Deep Belief Networks 연구를 계기로 신경망 기반 학습이 다시 주목받기 시작했습니다.",
    descriptionEn: "Geoffrey Hinton's work on Deep Belief Networks helped bring neural network-based learning back into focus.",
    category: "research",
  },
  {
    year: "2011",
    title: "IBM Watson, Jeopardy! 우승",
    titleEn: "IBM Watson Wins Jeopardy!",
    description: "IBM Watson이 자연어 질문 이해와 대규모 지식 검색 능력을 보여주며 AI의 실용 가능성을 대중에게 각인시켰습니다.",
    descriptionEn: "IBM Watson demonstrated natural language question answering and large-scale knowledge retrieval, making AI's practical potential visible to the public.",
    category: "milestone",
  },
  {
    year: "2012",
    title: "AlexNet, ImageNet 우승",
    titleEn: "AlexNet Wins ImageNet",
    description: "AlexNet이 ImageNet 대회에서 압도적인 성능을 보이며 CNN 기반 딥러닝 시대를 열었습니다.",
    descriptionEn: "AlexNet delivered a major performance leap in the ImageNet challenge and opened the CNN-driven deep learning era.",
    category: "research",
  },
  {
    year: "2014",
    title: "GAN 발표",
    titleEn: "GANs Introduced",
    description: "Generative Adversarial Networks가 발표되며 생성 모델 연구가 이미지 생성과 합성 영역으로 빠르게 확장되었습니다.",
    descriptionEn: "Generative Adversarial Networks were introduced, accelerating generative model research for image generation and synthesis.",
    category: "research",
  },
  {
    year: "2016",
    title: "AlphaGo vs 이세돌",
    titleEn: "AlphaGo vs. Lee Sedol",
    description: "AlphaGo가 이세돌 9단과의 대국에서 승리하며 강화학습과 딥러닝의 가능성을 전 세계에 보여주었습니다.",
    descriptionEn: "AlphaGo's victory over Lee Sedol showed the world the potential of reinforcement learning and deep learning.",
    category: "milestone",
  },
  {
    year: "2017",
    title: "Transformer 아키텍처 탄생",
    titleEn: "Transformer Architecture Emerges",
    description: "\"Attention Is All You Need\" 논문이 발표되며 현대 LLM의 기반이 되는 Transformer 구조가 등장했습니다.",
    descriptionEn: "The paper \"Attention Is All You Need\" introduced the Transformer architecture, which became the foundation of modern LLMs.",
    category: "research",
  },
  {
    year: "2018",
    title: "BERT와 GPT-1 공개",
    titleEn: "BERT and GPT-1 Released",
    description: "BERT와 GPT-1이 공개되며 사전학습 언어 모델이 자연어 처리의 중심 접근 방식으로 자리 잡기 시작했습니다.",
    descriptionEn: "BERT and GPT-1 helped establish pretrained language models as the central approach in natural language processing.",
    category: "research",
  },
  {
    year: "2020",
    title: "GPT-3 공개",
    titleEn: "GPT-3 Released",
    description: "GPT-3가 Few-shot learning 성능을 보여주며 대규모 언어 모델의 범용 AI 가능성을 크게 부각했습니다.",
    descriptionEn: "GPT-3 demonstrated few-shot learning and made the general-purpose potential of large language models much more visible.",
    category: "product",
  },
  {
    year: "2021",
    title: "AI 코딩과 이미지 생성 도구 확산",
    titleEn: "AI Coding and Image Generation Tools Spread",
    description: "GitHub Copilot과 DALL·E가 공개되며 AI가 코드 작성과 창작 도구로 실무에 들어오기 시작했습니다.",
    descriptionEn: "GitHub Copilot and DALL·E showed AI entering practical workflows as a coding and creative tool.",
    category: "product",
  },
  {
    year: "2022",
    title: "ChatGPT와 Stable Diffusion",
    titleEn: "ChatGPT and Stable Diffusion",
    description: "ChatGPT 출시와 Stable Diffusion 공개로 생성형 AI가 개발자와 일반 사용자 모두에게 빠르게 대중화되었습니다.",
    descriptionEn: "The launch of ChatGPT and release of Stable Diffusion rapidly popularized generative AI for both developers and everyday users.",
    category: "milestone",
  },
  {
    year: "2023",
    title: "멀티모달 모델과 AI 규제 논의 확대",
    titleEn: "Multimodal Models and AI Regulation Expand",
    description: "GPT-4, Claude 2, Llama 2가 등장하고 EU AI Act 합의가 진행되며 성능 경쟁과 규제 논의가 함께 본격화되었습니다.",
    descriptionEn: "GPT-4, Claude 2, and Llama 2 arrived while EU AI Act negotiations advanced, intensifying both model competition and regulation discussions.",
    category: "regulation",
  },
  {
    year: "2024",
    title: "실시간 멀티모달과 AI Agent 시대",
    titleEn: "Real-Time Multimodal AI and Agent Workflows",
    description: "Claude 3.5 Sonnet, GPT-4o, Gemini 1.5, Sora 등으로 멀티모달 처리와 에이전트형 워크플로가 실무 화두가 되었습니다.",
    descriptionEn: "Claude 3.5 Sonnet, GPT-4o, Gemini 1.5, Sora, and similar releases made multimodal processing and agent workflows central practical topics.",
    category: "product",
  },
  {
    year: "2025",
    title: "Agentic Coding과 AI 규제 실행",
    titleEn: "Agentic Coding and AI Regulation Execution",
    description: "Claude Code, Opus 4, OpenAI o3, MCP 표준화 흐름과 함께 에이전트형 코딩이 확산되고 AI 규제가 단계적으로 시행되기 시작했습니다.",
    descriptionEn: "Claude Code, Opus 4, OpenAI o3, and MCP standardization pushed agentic coding forward while AI regulation began phased enforcement.",
    category: "regulation",
  },
];

/* ── 09. Model Comparison ── */

export interface ModelFamily {
  provider: string;
  models: ModelCard[];
}

export interface ModelCard {
  model: string;
  strength: string;
  strengthEn: string;
  bestUseCase: string;
  bestUseCaseEn: string;
  limitation: string;
  limitationEn: string;
  myUsageRule: string;
  myUsageRuleEn: string;
}

export const modelFamilies: ModelFamily[] = [
  {
    provider: "Anthropic (Claude)",
    models: [
      {
        model: "Opus (최상위)",
        strength: "복잡한 추론, 장문 분석, 코드 아키텍처 설계에서 가장 높은 품질",
        strengthEn: "Highest quality in complex reasoning, long-form analysis, and code architecture design",
        bestUseCase: "아키텍처 리뷰, 복잡한 코드 리팩토링, 깊이 있는 기술 분석",
        bestUseCaseEn: "Architecture review, complex code refactoring, in-depth technical analysis",
        limitation: "속도가 느리고 비용이 높음. 단순 작업에는 비효율적",
        limitationEn: "Slow speed and high cost. Inefficient for simple tasks",
        myUsageRule: "복잡한 판단이 필요한 작업에만 사용합니다. 단순 질문에는 Sonnet이나 Haiku를 사용합니다.",
        myUsageRuleEn: "Used only for tasks requiring complex judgment. Sonnet or Haiku for simple questions.",
      },
      {
        model: "Sonnet (균형형)",
        strength: "속도와 품질의 균형이 좋음. 대부분의 코딩, 글쓰기 작업에 적합",
        strengthEn: "Good balance of speed and quality. Suitable for most coding and writing tasks",
        bestUseCase: "일반 코딩, 문서 작성, 요약, 번역, 프롬프트 설계",
        bestUseCaseEn: "General coding, document writing, summarization, translation, prompt design",
        limitation: "Opus 대비 복잡한 추론에서 품질이 떨어질 수 있음",
        limitationEn: "Quality may drop in complex reasoning compared to Opus",
        myUsageRule: "기본 작업 모델로 사용합니다. 결과가 부족하면 Opus로 전환합니다.",
        myUsageRuleEn: "Used as the default working model. Switch to Opus when results are insufficient.",
      },
      {
        model: "Haiku (경량형)",
        strength: "빠른 응답 속도와 낮은 비용. 간단한 분류, 추출, 변환 작업에 최적",
        strengthEn: "Fast response speed and low cost. Optimal for simple classification, extraction, and transformation tasks",
        bestUseCase: "데이터 분류, 간단한 텍스트 변환, 빠른 필터링",
        bestUseCaseEn: "Data classification, simple text transformation, quick filtering",
        limitation: "복잡한 맥락 이해나 창의적 작업에는 부적합",
        limitationEn: "Unsuitable for complex context understanding or creative tasks",
        myUsageRule: "대량 처리, 분류, 간단한 변환에 사용합니다. 품질이 중요한 작업에는 사용하지 않습니다.",
        myUsageRuleEn: "Used for batch processing, classification, and simple transformations. Not used for quality-critical tasks.",
      },
    ],
  },
  {
    provider: "OpenAI (GPT)",
    models: [
      {
        model: "최신 플래그십 모델",
        strength: "광범위한 지식, 강력한 코딩 능력, 멀티모달 지원",
        strengthEn: "Broad knowledge, strong coding capabilities, multimodal support",
        bestUseCase: "복잡한 코딩, 데이터 분석, 멀티모달 작업, 생각 정리",
        bestUseCaseEn: "Complex coding, data analysis, multimodal tasks, thought organization",
        limitation: "API 비용이 높고, 최신 정보 반영에 시간차가 있을 수 있음",
        limitationEn: "High API cost, and there may be delays in reflecting the latest information",
        myUsageRule: "ChatGPT로 아이디어 정리와 프롬프트 설계에 주로 사용합니다. 코딩 실행은 Claude Code에 맡깁니다.",
        myUsageRuleEn: "Primarily used for idea organization and prompt design via ChatGPT. Code execution is delegated to Claude Code.",
      },
      {
        model: "경량 모델 (mini)",
        strength: "빠르고 저렴. 간단한 작업에서 충분한 품질",
        strengthEn: "Fast and affordable. Sufficient quality for simple tasks",
        bestUseCase: "간단한 질문, 텍스트 분류, 빠른 초안 작성",
        bestUseCaseEn: "Simple questions, text classification, quick draft writing",
        limitation: "복잡한 추론이나 긴 문맥에서 품질 저하",
        limitationEn: "Quality degrades with complex reasoning or long context",
        myUsageRule: "비용이 중요한 대량 처리나 간단한 작업에 사용합니다.",
        myUsageRuleEn: "Used for cost-sensitive batch processing or simple tasks.",
      },
    ],
  },
  {
    provider: "Google (Gemini)",
    models: [
      {
        model: "Pro (고성능)",
        strength: "멀티모달 처리(이미지, 영상, 텍스트)가 강력. 긴 컨텍스트 지원",
        strengthEn: "Powerful multimodal processing (image, video, text). Long context support",
        bestUseCase: "이미지 분석, 멀티모달 작업, Google 생태계 연동",
        bestUseCaseEn: "Image analysis, multimodal tasks, Google ecosystem integration",
        limitation: "한국어 맥락 이해가 Claude/GPT 대비 부족할 수 있음",
        limitationEn: "Korean context understanding may be weaker compared to Claude/GPT",
        myUsageRule: "멀티모달 작업이 필요할 때 사용합니다. 텍스트 전용 작업에서는 Claude를 우선합니다.",
        myUsageRuleEn: "Used when multimodal tasks are needed. Claude is preferred for text-only tasks.",
      },
      {
        model: "Flash (경량형)",
        strength: "빠른 속도와 낮은 비용. 간단한 멀티모달 작업에 적합",
        strengthEn: "Fast speed and low cost. Suitable for simple multimodal tasks",
        bestUseCase: "빠른 이미지 분류, 간단한 요약, 대량 처리",
        bestUseCaseEn: "Quick image classification, simple summarization, batch processing",
        limitation: "복잡한 추론이나 깊은 분석에는 부적합",
        limitationEn: "Unsuitable for complex reasoning or deep analysis",
        myUsageRule: "속도가 중요한 멀티모달 처리에 사용합니다.",
        myUsageRuleEn: "Used for multimodal processing where speed is critical.",
      },
    ],
  },
];

export const modelSelectionGuide: DataTableData = {
  headers: ["작업 유형", "추천 모델 계열", "이유"],
  rows: [
    { cells: ["복잡한 코드 리팩토링", "Claude Opus / GPT 플래그십", "긴 맥락 이해와 정확한 코드 수정"] },
    { cells: ["일반 코딩/글쓰기", "Claude Sonnet / GPT 플래그십", "속도와 품질 균형"] },
    { cells: ["대량 데이터 분류", "Claude Haiku / GPT mini", "빠른 속도와 낮은 비용"] },
    { cells: ["멀티모달 분석", "Gemini Pro", "이미지/영상 처리에 강점"] },
    { cells: ["아이디어 정리/기획", "ChatGPT (GPT)", "대화형 브레인스토밍에 적합"] },
    { cells: ["포트폴리오 개발", "Claude Code (Sonnet/Opus)", "코드베이스 이해와 수정에 최적화"] },
  ],
};

export const modelSelectionGuideEn: DataTableData = {
  headers: ["Task Type", "Recommended Model Family", "Reason"],
  rows: [
    { cells: ["Complex code refactoring", "Claude Opus / GPT Flagship", "Long context understanding and accurate code modification"] },
    { cells: ["General coding/writing", "Claude Sonnet / GPT Flagship", "Balance of speed and quality"] },
    { cells: ["Batch data classification", "Claude Haiku / GPT mini", "Fast speed and low cost"] },
    { cells: ["Multimodal analysis", "Gemini Pro", "Strong in image/video processing"] },
    { cells: ["Idea organization/planning", "ChatGPT (GPT)", "Well-suited for conversational brainstorming"] },
    { cells: ["Portfolio development", "Claude Code (Sonnet/Opus)", "Optimized for codebase understanding and modification"] },
  ],
};
