/* ── AI Lab Data ── */
/* 카카오뱅크 AI 품질 및 안전성 평가 JD 맞춤 — 6탭 구조 */

/* ── Section Navigation ── */

export type AILabArchiveSectionId =
  | "overview"
  | "standards"
  | "rules-principles"
  | "ai-glossary"
  | "toolkit"
  | "media-note";

export interface AILabArchiveNavItem {
  id: AILabArchiveSectionId;
  label: string;
  eyebrow: string;
  group?: string;
}

export const aiLabArchiveNavItems: AILabArchiveNavItem[] = [
  { id: "overview", label: "Overview", eyebrow: "" },
  { id: "standards", label: "Standards", eyebrow: "" },
  { id: "rules-principles", label: "Rules & Principles", eyebrow: "" },
  { id: "ai-glossary", label: "Glossary", eyebrow: "" },
  { id: "toolkit", label: "Toolkit", eyebrow: "" },
  { id: "media-note", label: "Media Notes", eyebrow: "" },
];

/* ── Section Title Translations ── */

export const aiLabSectionTitles: Record<string, { ko: string; en: string }> = {
  overviewTitle: { ko: "이 랩을 만든 이유", en: "Why I Built This Lab" },
  safetyTitle: { ko: "AI 사용 시 확인해야 하는 위험 요소", en: "Risk Factors to Check When Using AI" },
  nistTitle: { ko: "NIST AI RMF — 4단계 프레임워크", en: "NIST AI RMF — 4-Step Framework" },
  reviewTitle: { ko: "AI 결과물 평가 기준", en: "AI Output Evaluation Criteria" },
  glossaryTitle: { ko: "용어 사전", en: "Glossary" },
  toolkitTitle: { ko: "AI 도구 리뷰", en: "AI Tool Reviews" },
  modelTitle: { ko: "모델 비교", en: "Model Comparison" },
  modelGuideTitle: { ko: "작업별 모델 선택 가이드", en: "Model Selection Guide by Task" },
  rulesTitle: { ko: "공식 문서 아카이브", en: "Official Document Archive" },
  releaseTitle: { ko: "릴리즈 노트", en: "Release Notes" },
  euTableTitle: { ko: "EU AI Act 위험 등급 분류", en: "EU AI Act Risk Classification" },
  mediaTitle: { ko: "미디어 노트", en: "Media Notes" },
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
  whyItMatters: string;
  whyItMattersEn: string;
  myNote: string;
  myNoteEn: string;
  category: Exclude<GlossaryCategory, "All">;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "LLM (Large Language Model)",
    definition: "대규모 텍스트 데이터로 학습된 언어 모델. GPT, Claude, Gemini 등이 대표적입니다.",
    definitionEn: "A language model trained on large-scale text data. GPT, Claude, and Gemini are representative examples.",
    whyItMatters: "AI 서비스의 핵심 엔진이므로, 모델의 특성과 한계를 이해해야 적절한 평가 기준을 세울 수 있습니다.",
    whyItMattersEn: "As the core engine of AI services, understanding a model's characteristics and limitations is essential for setting proper evaluation criteria.",
    myNote: "같은 프롬프트라도 모델마다 결과가 다릅니다. 평가할 때 모델 버전까지 기록해야 재현이 가능합니다.",
    myNoteEn: "Even with the same prompt, results differ by model. Recording model versions during evaluation is necessary for reproducibility.",
    category: "Architecture",
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    definition: "외부 문서를 검색한 뒤 그 내용을 LLM에 전달하여 답변을 생성하는 방식입니다.",
    definitionEn: "A method that retrieves external documents and passes their content to an LLM to generate responses.",
    whyItMatters: "할루시네이션을 줄이는 핵심 기법이지만, 검색 품질이 나쁘면 오히려 잘못된 근거 기반 답변을 만듭니다.",
    whyItMattersEn: "A key technique for reducing hallucinations, but poor retrieval quality can produce responses based on incorrect evidence.",
    myNote: "RAG의 품질은 '검색이 얼마나 정확한가'에 90% 달려 있습니다. 임베딩 모델과 청킹 전략이 핵심입니다.",
    myNoteEn: "RAG quality depends 90% on retrieval accuracy. The embedding model and chunking strategy are critical.",
    category: "Architecture",
  },
  {
    term: "Embedding",
    definition: "텍스트를 수치 벡터로 변환하는 과정. 의미가 비슷한 텍스트는 벡터 공간에서 가까이 위치합니다.",
    definitionEn: "The process of converting text into numerical vectors. Semantically similar texts are positioned closer in vector space.",
    whyItMatters: "RAG 검색, 유사도 측정, 클러스터링의 기반 기술입니다.",
    whyItMattersEn: "The foundational technology for RAG retrieval, similarity measurement, and clustering.",
    myNote: "한국어 임베딩은 영어 대비 성능이 낮을 수 있어, 한국어 특화 모델이나 다국어 모델 선택이 중요합니다.",
    myNoteEn: "Korean embeddings may underperform compared to English, making the choice of Korean-specific or multilingual models important.",
    category: "Architecture",
  },
  {
    term: "Vector DB",
    definition: "임베딩 벡터를 저장하고 유사도 검색을 수행하는 데이터베이스. Pinecone, Weaviate, ChromaDB 등이 있습니다.",
    definitionEn: "A database that stores embedding vectors and performs similarity searches. Examples include Pinecone, Weaviate, and ChromaDB.",
    whyItMatters: "RAG 시스템의 검색 엔진 역할을 합니다. 인덱싱 방식과 검색 속도가 서비스 품질에 직결됩니다.",
    whyItMattersEn: "Serves as the search engine for RAG systems. Indexing method and search speed directly impact service quality.",
    myNote: "포트폴리오 RAG에서는 ChromaDB를 사용했습니다. 소규모 문서에서는 충분하지만, 대규모에서는 성능 테스트가 필요합니다.",
    myNoteEn: "I used ChromaDB for my portfolio RAG. It works well for small document sets, but performance testing is needed at scale.",
    category: "Architecture",
  },
  {
    term: "Prompt Injection",
    definition: "사용자가 프롬프트를 조작하여 AI의 원래 지시를 무시하게 만드는 공격 기법입니다.",
    definitionEn: "An attack technique where users manipulate prompts to make the AI ignore its original instructions.",
    whyItMatters: "시스템 프롬프트를 노출하거나, 의도하지 않은 동작을 유발할 수 있어 보안 테스트 필수 항목입니다.",
    whyItMattersEn: "Can expose system prompts or trigger unintended behavior, making it an essential security testing item.",
    myNote: "QA 관점에서 보면 입력값 검증과 같습니다. AI에게도 '허용된 범위'를 명확히 정의해야 합니다.",
    myNoteEn: "From a QA perspective, this is equivalent to input validation. The 'allowed range' must be clearly defined for AI as well.",
    category: "Safety",
  },
  {
    term: "Guardrail",
    definition: "AI 출력을 사전/사후로 필터링하여 유해하거나 부적절한 답변을 차단하는 장치입니다.",
    definitionEn: "A mechanism that filters AI output before or after generation to block harmful or inappropriate responses.",
    whyItMatters: "모델 자체의 안전장치와 별도로, 서비스 레벨에서 추가 방어층을 구축합니다.",
    whyItMattersEn: "Builds an additional defense layer at the service level, separate from the model's built-in safety mechanisms.",
    myNote: "Guardrail은 '마지막 방어선'입니다. 프롬프트 설계로 1차 방어하고, Guardrail로 2차 필터링하는 구조가 효과적입니다.",
    myNoteEn: "Guardrails are the 'last line of defense.' A structure with prompt design as the first layer and guardrails as the second filter is effective.",
    category: "Safety",
  },
  {
    term: "Hallucination",
    definition: "AI가 그럴듯하지만 사실이 아닌 정보를 자신감 있게 생성하는 현상입니다.",
    definitionEn: "The phenomenon where AI confidently generates plausible but factually incorrect information.",
    whyItMatters: "금융, 의료, 법률 등 정확성이 중요한 도메인에서는 직접적인 피해로 이어질 수 있습니다.",
    whyItMattersEn: "Can lead to direct harm in domains where accuracy is critical, such as finance, healthcare, and law.",
    myNote: "할루시네이션은 '버그'가 아니라 LLM의 구조적 특성입니다. 완전히 없앨 수 없으므로, 감지하고 관리하는 것이 핵심입니다.",
    myNoteEn: "Hallucination is not a 'bug' but a structural characteristic of LLMs. Since it cannot be fully eliminated, detection and management are key.",
    category: "Safety",
  },
  {
    term: "Bias",
    definition: "학습 데이터, 프롬프트, 평가 방식에 의해 AI가 특정 집단에 불공정한 결과를 만드는 현상입니다.",
    definitionEn: "The phenomenon where AI produces unfair results for specific groups due to training data, prompts, or evaluation methods.",
    whyItMatters: "채용, 신용평가, 보험 심사 등에서 차별적 결과를 초래할 수 있어 법적 리스크가 큽니다.",
    whyItMattersEn: "Can cause discriminatory outcomes in hiring, credit scoring, and insurance assessments, creating significant legal risk.",
    myNote: "편향 테스트는 '같은 질문, 다른 조건'으로 비교하는 것이 가장 직관적입니다.",
    myNoteEn: "The most intuitive approach to bias testing is comparing 'same question, different conditions.'",
    category: "Safety",
  },
  {
    term: "Red Teaming",
    definition: "AI 시스템의 취약점을 찾기 위해 의도적으로 공격적이거나 극단적인 입력을 시도하는 평가 방법입니다.",
    definitionEn: "An evaluation method that intentionally uses aggressive or extreme inputs to find vulnerabilities in AI systems.",
    whyItMatters: "일반 사용자 테스트로는 발견하기 어려운 안전성 문제를 사전에 식별합니다.",
    whyItMattersEn: "Identifies safety issues that are difficult to discover through normal user testing.",
    myNote: "QA의 탐색적 테스트(Exploratory Testing)와 비슷합니다. 시나리오를 미리 정하되, 테스트 중 발견한 패턴으로 추가 시나리오를 만듭니다.",
    myNoteEn: "Similar to exploratory testing in QA. Pre-define scenarios, but create additional ones based on patterns discovered during testing.",
    category: "Evaluation",
  },
  {
    term: "Evaluation (AI 평가)",
    definition: "AI 모델이나 서비스의 품질을 정량적/정성적으로 측정하는 과정입니다.",
    definitionEn: "The process of measuring the quality of AI models or services both quantitatively and qualitatively.",
    whyItMatters: "평가 없이는 개선할 수 없습니다. 평가 기준이 서비스 품질의 기준이 됩니다.",
    whyItMattersEn: "Without evaluation, improvement is impossible. Evaluation criteria become the standard for service quality.",
    myNote: "TC 기반 QA처럼, AI 평가도 '기준 → 테스트 → 기록 → 개선' 사이클이 핵심입니다.",
    myNoteEn: "Like TC-based QA, the core of AI evaluation is the 'criteria > test > record > improve' cycle.",
    category: "Evaluation",
  },
  {
    term: "Human-in-the-Loop",
    definition: "AI의 판단이나 출력에 사람의 검토와 승인을 포함하는 설계 방식입니다.",
    definitionEn: "A design approach that includes human review and approval in AI decisions or outputs.",
    whyItMatters: "고위험 의사결정에서 AI 단독 실행을 막고, 최종 책임을 사람에게 둡니다.",
    whyItMattersEn: "Prevents AI from acting autonomously in high-risk decisions and places final responsibility with humans.",
    myNote: "모든 곳에 사람을 넣으면 비효율적입니다. '자동화해도 되는 것'과 '사람이 봐야 하는 것'을 구분하는 것이 설계의 핵심입니다.",
    myNoteEn: "Inserting humans everywhere is inefficient. The key design challenge is distinguishing 'what can be automated' from 'what requires human oversight.'",
    category: "Evaluation",
  },
  {
    term: "Grounding",
    definition: "AI 답변이 실제 데이터나 문서에 기반하도록 하는 기법입니다. RAG가 대표적입니다.",
    definitionEn: "A technique ensuring AI responses are based on actual data or documents. RAG is the most common example.",
    whyItMatters: "근거가 있어야 답변을 검증할 수 있고, 문제 시 추적이 가능합니다.",
    whyItMattersEn: "Evidence-based responses enable verification and traceability when issues arise.",
    myNote: "Grounding은 '답변에 출처를 달자'가 아니라, '출처 기반으로만 답하게 하자'입니다.",
    myNoteEn: "Grounding is not about 'adding sources to responses' but about 'responding only based on sources.'",
    category: "Architecture",
  },
  {
    term: "Context Window",
    definition: "LLM이 한 번에 처리할 수 있는 텍스트의 최대 길이(토큰 수)입니다.",
    definitionEn: "The maximum length of text (number of tokens) an LLM can process at once.",
    whyItMatters: "컨텍스트 윈도우를 초과하면 이전 내용을 잊거나, 입력이 잘립니다. RAG 설계 시 청크 크기와 직결됩니다.",
    whyItMattersEn: "Exceeding the context window causes the model to forget earlier content or truncates input. Directly related to chunk size in RAG design.",
    myNote: "컨텍스트 윈도우가 크다고 좋은 것은 아닙니다. 긴 입력에서 '중간 부분'의 정보를 놓치는 Lost in the Middle 현상이 있습니다.",
    myNoteEn: "A larger context window is not always better. The 'Lost in the Middle' phenomenon causes models to miss information in the middle of long inputs.",
    category: "Architecture",
  },
  {
    term: "Agent",
    definition: "LLM이 도구를 사용하고, 계획을 세우고, 반복적으로 행동하여 목표를 달성하는 시스템입니다.",
    definitionEn: "A system where an LLM uses tools, makes plans, and acts iteratively to achieve goals.",
    whyItMatters: "단순 QA를 넘어, AI가 스스로 검색, 코드 실행, API 호출 등을 수행합니다. 자율성이 높을수록 안전성 평가가 중요합니다.",
    whyItMattersEn: "Beyond simple Q&A, AI autonomously performs searches, code execution, and API calls. Higher autonomy demands more rigorous safety evaluation.",
    myNote: "Agent의 자율성이 높을수록 '무엇을 하면 안 되는지'를 명확히 정의해야 합니다. Guardrail이 더 중요해집니다.",
    myNoteEn: "The higher an agent's autonomy, the more clearly 'what it must not do' needs to be defined. Guardrails become even more important.",
    category: "Technique",
  },
  {
    term: "Tool Calling",
    definition: "LLM이 외부 함수나 API를 호출하여 정보를 가져오거나 작업을 수행하는 기능입니다.",
    definitionEn: "The capability for an LLM to call external functions or APIs to retrieve information or perform tasks.",
    whyItMatters: "Agent의 핵심 능력이지만, 잘못된 도구 호출은 데이터 손실이나 보안 문제로 이어질 수 있습니다.",
    whyItMattersEn: "A core capability of agents, but incorrect tool calls can lead to data loss or security issues.",
    myNote: "Tool Calling은 '무엇을 호출할 수 있는지'뿐만 아니라, '어떤 조건에서 호출을 거부해야 하는지'도 설계해야 합니다.",
    myNoteEn: "Tool calling design must cover not only 'what can be called' but also 'under what conditions calls should be refused.'",
    category: "Technique",
  },
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
    title: "AI Agent Engineering Workflow",
    topic: "AI Agent / Engineering Mindset / Workflow",
    summary: "AI Agent를 효과적으로 활용하기 위한 엔지니어링 마인드셋과 워크플로우에 대한 내용입니다.",
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
