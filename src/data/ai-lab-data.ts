/* ── AI Lab Data ── */
/* 카카오뱅크 AI 품질 및 안전성 평가 JD 맞춤 — 9탭 구조 */

/* ── Section Navigation ── */

export type AILabArchiveSectionId =
  | "overview"
  | "safety-framework"
  | "evaluation-playbook"
  | "ai-glossary"
  | "media-note"
  | "ai-tool-stack"
  | "ai-policy"
  | "company-principles"
  | "model-comparison";

export interface AILabArchiveNavItem {
  id: AILabArchiveSectionId;
  label: string;
  eyebrow: string;
  group?: string;
}

export const aiLabArchiveNavItems: AILabArchiveNavItem[] = [
  { id: "overview", label: "Overview", eyebrow: "" },
  { id: "safety-framework", label: "Safety", eyebrow: "" },
  { id: "evaluation-playbook", label: "Evaluation", eyebrow: "" },
  { id: "ai-glossary", label: "Glossary", eyebrow: "" },
  { id: "ai-policy", label: "Policy", eyebrow: "" },
  { id: "company-principles", label: "Principles", eyebrow: "" },
  { id: "model-comparison", label: "Models", eyebrow: "" },
  { id: "ai-tool-stack", label: "AI Tools", eyebrow: "" },
  { id: "media-note", label: "Media Notes", eyebrow: "" },
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

/* ── 02. Safety Framework ── */

export interface SafetyRiskCard {
  risk: string;
  whyItMatters: string;
  myEvaluationRule: string;
  source?: string;
}

export const safetyRiskCards: SafetyRiskCard[] = [
  {
    risk: "Hallucination",
    whyItMatters: "금융 서비스에서 사실이 아닌 정보를 전달하면 고객 손실과 신뢰 하락으로 이어집니다. 특히 수치, 정책, 상품 조건에서 치명적입니다.",
    myEvaluationRule: "답변에 포함된 사실 정보를 원본 문서와 대조합니다. 출처가 없는 수치나 조건은 할루시네이션 가능성으로 태깅합니다.",
    source: "NIST AI RMF — Measure",
  },
  {
    risk: "Bias & Fairness",
    whyItMatters: "신용평가, 대출 심사 등에서 특정 집단에 불리한 결과가 나오면 차별 이슈가 됩니다. 편향은 학습 데이터, 프롬프트, 평가 기준 어디서든 발생할 수 있습니다.",
    myEvaluationRule: "동일한 질문을 성별, 연령, 지역만 바꿔서 테스트합니다. 답변 톤이나 추천 결과가 달라지면 편향으로 기록합니다.",
    source: "NIST AI RMF — Map",
  },
  {
    risk: "Privacy & Data Leakage",
    whyItMatters: "개인정보, 민감정보가 AI 답변에 노출되면 개인정보보호법 위반이며, 금융권에서는 즉각적인 규제 조치 대상입니다.",
    myEvaluationRule: "프롬프트에 개인정보를 포함시켜 답변에 그대로 노출되는지 테스트합니다. 마스킹, 거부, 일반화 중 어떤 방식으로 처리하는지 확인합니다.",
    source: "개인정보보호법, EU AI Act Art. 10",
  },
  {
    risk: "Harmful Output",
    whyItMatters: "폭력, 자해, 불법 행위를 조장하는 답변은 서비스 전체의 신뢰를 파괴합니다. 간접적 표현이나 우회 요청에도 대응해야 합니다.",
    myEvaluationRule: "직접적 요청뿐 아니라 '역할 부여', '가상 시나리오' 등 우회 프롬프트로도 테스트합니다. Refusal이 적절한지, 과도한 거부는 아닌지 함께 봅니다.",
    source: "Anthropic Usage Policy",
  },
  {
    risk: "Overconfidence",
    whyItMatters: "AI가 불확실한 정보를 확신하는 톤으로 전달하면, 사용자가 검증 없이 의사결정에 활용할 위험이 있습니다.",
    myEvaluationRule: "'정확히', '반드시', '100%' 같은 확신 표현이 답변에 포함되면 주의 대상으로 표시합니다. 불확실한 내용에는 '~로 보입니다', '확인이 필요합니다'가 있어야 합니다.",
    source: "NIST AI RMF — Measure",
  },
  {
    risk: "Lack of Grounding",
    whyItMatters: "근거 없는 답변은 검증이 불가능합니다. 출처가 명시되어야 사용자가 판단하고, 문제 발생 시 추적할 수 있습니다.",
    myEvaluationRule: "답변이 어떤 문서/데이터를 기반으로 생성되었는지 확인합니다. 출처가 없으면 '근거 부재'로 분류하고, RAG 파이프라인 점검을 요청합니다.",
    source: "NIST AI RMF — Measure",
  },
  {
    risk: "Human Review Required",
    whyItMatters: "고위험 판단(금융 상품 추천, 개인정보 처리, 외부 발송)은 AI 단독으로 실행하면 안 됩니다. 사람의 최종 승인이 필수입니다.",
    myEvaluationRule: "자동 실행되는 기능 목록을 확인하고, '승인 없이 실행되면 안 되는 것' 리스트를 만듭니다. Human-in-the-loop 지점이 빠져 있으면 리스크로 기록합니다.",
    source: "EU AI Act Art. 14, NIST AI RMF — Govern",
  },
];

export const nistRmfSteps: AILabTextCard[] = [
  { title: "Govern", description: "AI 사용 정책, 책임자, 승인 기준, 기록 방식을 정합니다. 조직 차원의 거버넌스가 모든 단계의 토대입니다." },
  { title: "Map", description: "어떤 사용자, 데이터, 기능, 위험이 있는지 맥락을 파악합니다. 리스크를 식별하고 우선순위를 정합니다." },
  { title: "Measure", description: "정확도, 편향, 개인정보 노출, 보안 취약점, 환각을 측정합니다. 정량/정성 평가를 함께 수행합니다." },
  { title: "Manage", description: "위험을 줄이는 조치, 모니터링, 사고 대응, 재평가 주기를 운영합니다. 지속적으로 개선합니다." },
];

/* ── 03. Evaluation Playbook ── */

export interface EvaluationCriterion {
  criterion: string;
  goodResponse: string;
  riskyResponse: string;
  howToVerify: string;
}

export const evaluationCriteria: EvaluationCriterion[] = [
  {
    criterion: "정확성 (Accuracy)",
    goodResponse: "문서에 있는 사실만 포함하고, 수치와 조건이 원문과 일치합니다.",
    riskyResponse: "그럴듯하지만 원문에 없는 수치, 날짜, 조건이 섞여 있습니다.",
    howToVerify: "답변의 핵심 사실(수치, 날짜, 조건)을 원본 문서와 1:1 대조합니다.",
  },
  {
    criterion: "근거성 (Grounding)",
    goodResponse: "답변이 어떤 문서/데이터를 참고했는지 출처가 명시됩니다.",
    riskyResponse: "출처 없이 '일반적으로', '보통' 같은 표현으로 일반화합니다.",
    howToVerify: "출처 표시 유무를 확인하고, 표시된 출처가 실제로 해당 내용을 포함하는지 검증합니다.",
  },
  {
    criterion: "안전성 (Safety)",
    goodResponse: "유해하거나 위험한 요청에 대해 적절히 거부하고, 대안을 안내합니다.",
    riskyResponse: "우회 프롬프트(역할극, 가상 시나리오)에 유해한 내용을 생성합니다.",
    howToVerify: "직접 요청 + 우회 요청(역할 부여, 번역 요청 등) 양쪽으로 테스트합니다.",
  },
  {
    criterion: "편향 (Bias)",
    goodResponse: "성별, 연령, 지역 등에 관계없이 동일한 기준으로 답변합니다.",
    riskyResponse: "특정 집단에 대해 다른 톤, 다른 추천, 다른 판단 기준을 적용합니다.",
    howToVerify: "동일 질문에서 인구통계 변수만 바꿔 답변을 비교합니다.",
  },
  {
    criterion: "개인정보 (Privacy)",
    goodResponse: "개인정보가 포함된 입력에 대해 마스킹하거나 거부합니다.",
    riskyResponse: "입력된 개인정보를 답변에 그대로 포함하거나 유추합니다.",
    howToVerify: "가상의 개인정보를 프롬프트에 넣고 답변에서 노출 여부를 확인합니다.",
  },
  {
    criterion: "의도 오해 (Misinterpretation)",
    goodResponse: "모호한 질문에 대해 의도를 확인하거나, 가능한 해석을 구분해서 답합니다.",
    riskyResponse: "모호한 질문을 하나의 해석으로 단정하고 답변합니다.",
    howToVerify: "의도적으로 모호한 질문을 던져 AI가 어떻게 해석하는지 관찰합니다.",
  },
  {
    criterion: "과도한 확신 (Overconfidence)",
    goodResponse: "불확실한 부분에 대해 '확인이 필요합니다', '~로 보입니다'로 표현합니다.",
    riskyResponse: "확실하지 않은 정보를 '정확히', '반드시', '100%' 같은 표현으로 전달합니다.",
    howToVerify: "답변에서 확신 표현을 추출하고, 해당 정보의 실제 확실성과 비교합니다.",
  },
  {
    criterion: "Fallback / Refusal",
    goodResponse: "답변할 수 없는 요청에 대해 이유를 설명하고, 대안 경로를 안내합니다.",
    riskyResponse: "무조건 거부하거나, 반대로 답변 불가 상황에서도 억지로 답합니다.",
    howToVerify: "답변 범위 밖의 질문을 던져 거부 방식과 대안 안내 품질을 확인합니다.",
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
  whyItMatters: string;
  myNote: string;
  category: Exclude<GlossaryCategory, "All">;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "LLM (Large Language Model)",
    definition: "대규모 텍스트 데이터로 학습된 언어 모델. GPT, Claude, Gemini 등이 대표적입니다.",
    whyItMatters: "AI 서비스의 핵심 엔진이므로, 모델의 특성과 한계를 이해해야 적절한 평가 기준을 세울 수 있습니다.",
    myNote: "같은 프롬프트라도 모델마다 결과가 다릅니다. 평가할 때 모델 버전까지 기록해야 재현이 가능합니다.",
    category: "Architecture",
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    definition: "외부 문서를 검색한 뒤 그 내용을 LLM에 전달하여 답변을 생성하는 방식입니다.",
    whyItMatters: "할루시네이션을 줄이는 핵심 기법이지만, 검색 품질이 나쁘면 오히려 잘못된 근거 기반 답변을 만듭니다.",
    myNote: "RAG의 품질은 '검색이 얼마나 정확한가'에 90% 달려 있습니다. 임베딩 모델과 청킹 전략이 핵심입니다.",
    category: "Architecture",
  },
  {
    term: "Embedding",
    definition: "텍스트를 수치 벡터로 변환하는 과정. 의미가 비슷한 텍스트는 벡터 공간에서 가까이 위치합니다.",
    whyItMatters: "RAG 검색, 유사도 측정, 클러스터링의 기반 기술입니다.",
    myNote: "한국어 임베딩은 영어 대비 성능이 낮을 수 있어, 한국어 특화 모델이나 다국어 모델 선택이 중요합니다.",
    category: "Architecture",
  },
  {
    term: "Vector DB",
    definition: "임베딩 벡터를 저장하고 유사도 검색을 수행하는 데이터베이스. Pinecone, Weaviate, ChromaDB 등이 있습니다.",
    whyItMatters: "RAG 시스템의 검색 엔진 역할을 합니다. 인덱싱 방식과 검색 속도가 서비스 품질에 직결됩니다.",
    myNote: "포트폴리오 RAG에서는 ChromaDB를 사용했습니다. 소규모 문서에서는 충분하지만, 대규모에서는 성능 테스트가 필요합니다.",
    category: "Architecture",
  },
  {
    term: "Prompt Injection",
    definition: "사용자가 프롬프트를 조작하여 AI의 원래 지시를 무시하게 만드는 공격 기법입니다.",
    whyItMatters: "시스템 프롬프트를 노출하거나, 의도하지 않은 동작을 유발할 수 있어 보안 테스트 필수 항목입니다.",
    myNote: "QA 관점에서 보면 입력값 검증과 같습니다. AI에게도 '허용된 범위'를 명확히 정의해야 합니다.",
    category: "Safety",
  },
  {
    term: "Guardrail",
    definition: "AI 출력을 사전/사후로 필터링하여 유해하거나 부적절한 답변을 차단하는 장치입니다.",
    whyItMatters: "모델 자체의 안전장치와 별도로, 서비스 레벨에서 추가 방어층을 구축합니다.",
    myNote: "Guardrail은 '마지막 방어선'입니다. 프롬프트 설계로 1차 방어하고, Guardrail로 2차 필터링하는 구조가 효과적입니다.",
    category: "Safety",
  },
  {
    term: "Hallucination",
    definition: "AI가 그럴듯하지만 사실이 아닌 정보를 자신감 있게 생성하는 현상입니다.",
    whyItMatters: "금융, 의료, 법률 등 정확성이 중요한 도메인에서는 직접적인 피해로 이어질 수 있습니다.",
    myNote: "할루시네이션은 '버그'가 아니라 LLM의 구조적 특성입니다. 완전히 없앨 수 없으므로, 감지하고 관리하는 것이 핵심입니다.",
    category: "Safety",
  },
  {
    term: "Bias",
    definition: "학습 데이터, 프롬프트, 평가 방식에 의해 AI가 특정 집단에 불공정한 결과를 만드는 현상입니다.",
    whyItMatters: "채용, 신용평가, 보험 심사 등에서 차별적 결과를 초래할 수 있어 법적 리스크가 큽니다.",
    myNote: "편향 테스트는 '같은 질문, 다른 조건'으로 비교하는 것이 가장 직관적입니다.",
    category: "Safety",
  },
  {
    term: "Red Teaming",
    definition: "AI 시스템의 취약점을 찾기 위해 의도적으로 공격적이거나 극단적인 입력을 시도하는 평가 방법입니다.",
    whyItMatters: "일반 사용자 테스트로는 발견하기 어려운 안전성 문제를 사전에 식별합니다.",
    myNote: "QA의 탐색적 테스트(Exploratory Testing)와 비슷합니다. 시나리오를 미리 정하되, 테스트 중 발견한 패턴으로 추가 시나리오를 만듭니다.",
    category: "Evaluation",
  },
  {
    term: "Evaluation (AI 평가)",
    definition: "AI 모델이나 서비스의 품질을 정량적/정성적으로 측정하는 과정입니다.",
    whyItMatters: "평가 없이는 개선할 수 없습니다. 평가 기준이 서비스 품질의 기준이 됩니다.",
    myNote: "TC 기반 QA처럼, AI 평가도 '기준 → 테스트 → 기록 → 개선' 사이클이 핵심입니다.",
    category: "Evaluation",
  },
  {
    term: "Human-in-the-Loop",
    definition: "AI의 판단이나 출력에 사람의 검토와 승인을 포함하는 설계 방식입니다.",
    whyItMatters: "고위험 의사결정에서 AI 단독 실행을 막고, 최종 책임을 사람에게 둡니다.",
    myNote: "모든 곳에 사람을 넣으면 비효율적입니다. '자동화해도 되는 것'과 '사람이 봐야 하는 것'을 구분하는 것이 설계의 핵심입니다.",
    category: "Evaluation",
  },
  {
    term: "Grounding",
    definition: "AI 답변이 실제 데이터나 문서에 기반하도록 하는 기법입니다. RAG가 대표적입니다.",
    whyItMatters: "근거가 있어야 답변을 검증할 수 있고, 문제 시 추적이 가능합니다.",
    myNote: "Grounding은 '답변에 출처를 달자'가 아니라, '출처 기반으로만 답하게 하자'입니다.",
    category: "Architecture",
  },
  {
    term: "Context Window",
    definition: "LLM이 한 번에 처리할 수 있는 텍스트의 최대 길이(토큰 수)입니다.",
    whyItMatters: "컨텍스트 윈도우를 초과하면 이전 내용을 잊거나, 입력이 잘립니다. RAG 설계 시 청크 크기와 직결됩니다.",
    myNote: "컨텍스트 윈도우가 크다고 좋은 것은 아닙니다. 긴 입력에서 '중간 부분'의 정보를 놓치는 Lost in the Middle 현상이 있습니다.",
    category: "Architecture",
  },
  {
    term: "Agent",
    definition: "LLM이 도구를 사용하고, 계획을 세우고, 반복적으로 행동하여 목표를 달성하는 시스템입니다.",
    whyItMatters: "단순 QA를 넘어, AI가 스스로 검색, 코드 실행, API 호출 등을 수행합니다. 자율성이 높을수록 안전성 평가가 중요합니다.",
    myNote: "Agent의 자율성이 높을수록 '무엇을 하면 안 되는지'를 명확히 정의해야 합니다. Guardrail이 더 중요해집니다.",
    category: "Technique",
  },
  {
    term: "Tool Calling",
    definition: "LLM이 외부 함수나 API를 호출하여 정보를 가져오거나 작업을 수행하는 기능입니다.",
    whyItMatters: "Agent의 핵심 능력이지만, 잘못된 도구 호출은 데이터 손실이나 보안 문제로 이어질 수 있습니다.",
    myNote: "Tool Calling은 '무엇을 호출할 수 있는지'뿐만 아니라, '어떤 조건에서 호출을 거부해야 하는지'도 설계해야 합니다.",
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

/* ── 07. Policy & Regulation ── */

export interface PolicyItem {
  title: string;
  whatItSays: string;
  whyItMatters: string;
  myTakeaway: string;
  source: string;
}

export const policyItems: PolicyItem[] = [
  {
    title: "EU AI Act — 위험 기반 접근",
    whatItSays: "AI 시스템을 위험 수준에 따라 4단계(금지/고위험/제한적/최소)로 분류하고, 높은 위험일수록 엄격한 의무를 부과합니다.",
    whyItMatters: "금융 AI(신용평가, 대출 심사 등)는 '고위험'으로 분류될 가능성이 높아, 적합성 평가, 품질 관리 시스템, 로깅 의무가 적용됩니다.",
    myTakeaway: "'우리 서비스가 어떤 위험 등급인가'를 먼저 판단하는 것이 모든 준비의 시작점입니다. 금융 서비스라면 고위험을 전제로 설계하는 것이 안전합니다.",
    source: "EU AI Act Art. 6, Art. 9",
  },
  {
    title: "개인정보 및 민감정보 처리",
    whatItSays: "AI 학습과 추론 과정에서 개인정보 수집, 활용, 제3자 제공에 대한 사전 동의와 고지가 필요합니다. 민감정보(건강, 금융, 신용 등)는 더 엄격한 기준이 적용됩니다.",
    whyItMatters: "금융 서비스에서 AI가 고객 데이터를 처리할 경우, 데이터 최소화, 목적 제한, 파기 정책이 명확해야 합니다.",
    myTakeaway: "AI 시스템 설계 시 '이 데이터가 꼭 필요한가', '답변에 개인정보가 노출되지 않는가'를 체크리스트로 만들어야 합니다.",
    source: "개인정보보호법, EU AI Act Art. 10",
  },
  {
    title: "AI 고지 및 투명성 의무",
    whatItSays: "사용자에게 AI가 답변을 생성한다는 사실과, AI의 한계(오류 가능성)를 사전에 알려야 합니다. 생성형 AI 결과물에는 워터마크 등의 식별 표시가 필요합니다.",
    whyItMatters: "고객이 AI 답변을 전문가 의견으로 오해하면 잘못된 의사결정으로 이어집니다. 특히 금융 상품 추천, 투자 조언 영역에서 중요합니다.",
    myTakeaway: "UI에 'AI가 생성한 답변입니다' 문구를 넣는 것은 기본이고, '이 답변은 참고용이며 전문가 확인을 권장합니다'까지 안내해야 합니다.",
    source: "한국 AI 기본법, EU AI Act Art. 52",
  },
  {
    title: "금융 AI 답변 오류 리스크",
    whatItSays: "금융 상품 설명, 이자율, 수수료 등 정확한 수치가 필요한 정보를 AI가 잘못 전달할 경우, 금융소비자보호법 위반과 고객 손실로 이어질 수 있습니다.",
    whyItMatters: "금융 AI는 '대략 맞는 답변'이 아니라 '정확한 답변'이 필요합니다. 할루시네이션이 곧 법적 리스크입니다.",
    myTakeaway: "금융 수치(이자율, 한도, 수수료)는 AI 생성이 아니라 DB에서 직접 가져와야 합니다. AI는 설명과 맥락 제공 역할로 제한하는 것이 안전합니다.",
    source: "금융소비자보호법, 전자금융거래법",
  },
  {
    title: "내부 AI 운영 정책",
    whatItSays: "AI 시스템의 개발, 배포, 모니터링, 사고 대응에 대한 내부 정책과 절차를 수립하고 문서화해야 합니다.",
    whyItMatters: "정책이 없으면 문제 발생 시 대응이 늦어지고, 책임 소재가 불분명해집니다. 규제 감사에서도 정책 문서를 요구합니다.",
    myTakeaway: "작은 팀이라도 'AI 답변에 문제가 생기면 누가, 어떻게 대응하는가'를 정해두면 실제 사고 시 대응 속도가 완전히 다릅니다.",
    source: "NIST AI RMF — Govern, ISO 42001",
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

/* ── 08. Company AI Principles ── */

export interface CompanyPrinciple {
  company: string;
  principles: {
    principle: string;
    keyIdea: string;
    whatILearned: string;
  }[];
  source: string;
}

export const companyPrinciples: CompanyPrinciple[] = [
  {
    company: "OpenAI",
    principles: [
      {
        principle: "인간의 지시를 따르되, 안전한 범위 내에서",
        keyIdea: "Model Spec에서 'developer > user > operator' 우선순위를 명시. 사용자 요청이 있어도 안전 정책을 위반하면 거부합니다.",
        whatILearned: "AI에게 '무조건 사용자 말을 들어라'가 아니라, '어디까지 들어도 되는지' 경계를 정하는 것이 설계의 핵심이라는 걸 배웠습니다.",
      },
      {
        principle: "답변의 신뢰성과 솔직함",
        keyIdea: "모르는 것은 모른다고 말하고, 불확실한 정보는 그 사실을 밝히도록 설계합니다.",
        whatILearned: "QA에서 '재현 불가'를 정직하게 보고하는 것처럼, AI도 '모른다'를 말할 수 있어야 신뢰할 수 있습니다.",
      },
    ],
    source: "OpenAI Model Spec",
  },
  {
    company: "Anthropic",
    principles: [
      {
        principle: "Constitutional AI — 원칙 기반 자기 교정",
        keyIdea: "사람의 피드백 대신, AI가 스스로 원칙에 따라 답변을 평가하고 개선하는 학습 방식입니다.",
        whatILearned: "평가 기준을 명문화하면 AI도 자기 검증이 가능하다는 점이 인상적이었습니다. QA에서 TC를 명확히 쓰는 것과 같은 원리입니다.",
      },
      {
        principle: "Helpful, Harmless, Honest (HHH)",
        keyIdea: "유용하되 해롭지 않고, 정직한 답변을 추구합니다. 세 가치가 충돌할 때는 Harmless가 우선합니다.",
        whatILearned: "'도움이 되려다 위험한 답변'을 하는 것보다, '거부하되 대안을 안내하는 것'이 더 나은 UX라는 점을 배웠습니다.",
      },
    ],
    source: "Anthropic Constitutional AI Paper",
  },
  {
    company: "Google",
    principles: [
      {
        principle: "사회적으로 유익한 AI",
        keyIdea: "AI 기술이 사회 전체에 이익이 되어야 하며, 불공정한 편향을 만들지 않도록 노력합니다.",
        whatILearned: "'편향이 없다'를 증명하기는 어렵지만, '편향을 측정하고 줄이려는 노력'은 할 수 있습니다. 그 노력의 과정을 문서화하는 것이 중요합니다.",
      },
      {
        principle: "책임성과 안전성 우선",
        keyIdea: "AI가 사람에게 해를 끼칠 수 있는 영역에서는 배포를 제한하거나 추가 검증을 요구합니다.",
        whatILearned: "'출시 전 안전성 평가'를 프로세스로 정착시키는 것이 핵심입니다. 체크리스트가 있어야 일관된 판단이 가능합니다.",
      },
    ],
    source: "Google Responsible AI Practices",
  },
  {
    company: "Microsoft",
    principles: [
      {
        principle: "6가지 원칙: 공정성, 신뢰성, 안전성, 프라이버시, 포용성, 투명성, 책임성",
        keyIdea: "Responsible AI Standard로 구체적인 실행 기준을 제시합니다. 원칙만이 아니라 '어떻게 실행할 것인가'를 문서화합니다.",
        whatILearned: "원칙은 모든 회사가 비슷하지만, Microsoft는 '실행 가이드'까지 공개한 점이 달랐습니다. 원칙을 체크리스트로 바꾸는 것이 실무에서 가장 중요합니다.",
      },
      {
        principle: "AI 영향 평가 (Impact Assessment)",
        keyIdea: "AI 시스템 배포 전, 잠재적 영향과 리스크를 체계적으로 평가하는 프로세스를 운영합니다.",
        whatILearned: "QA에서 릴리즈 전 체크리스트를 사용하듯, AI 서비스에도 '배포 전 영향 평가' 단계가 필요합니다.",
      },
    ],
    source: "Microsoft Responsible AI Standard v2",
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
  bestUseCase: string;
  limitation: string;
  myUsageRule: string;
}

export const modelFamilies: ModelFamily[] = [
  {
    provider: "Anthropic (Claude)",
    models: [
      {
        model: "Opus (최상위)",
        strength: "복잡한 추론, 장문 분석, 코드 아키텍처 설계에서 가장 높은 품질",
        bestUseCase: "아키텍처 리뷰, 복잡한 코드 리팩토링, 깊이 있는 기술 분석",
        limitation: "속도가 느리고 비용이 높음. 단순 작업에는 비효율적",
        myUsageRule: "복잡한 판단이 필요한 작업에만 사용합니다. 단순 질문에는 Sonnet이나 Haiku를 사용합니다.",
      },
      {
        model: "Sonnet (균형형)",
        strength: "속도와 품질의 균형이 좋음. 대부분의 코딩, 글쓰기 작업에 적합",
        bestUseCase: "일반 코딩, 문서 작성, 요약, 번역, 프롬프트 설계",
        limitation: "Opus 대비 복잡한 추론에서 품질이 떨어질 수 있음",
        myUsageRule: "기본 작업 모델로 사용합니다. 결과가 부족하면 Opus로 전환합니다.",
      },
      {
        model: "Haiku (경량형)",
        strength: "빠른 응답 속도와 낮은 비용. 간단한 분류, 추출, 변환 작업에 최적",
        bestUseCase: "데이터 분류, 간단한 텍스트 변환, 빠른 필터링",
        limitation: "복잡한 맥락 이해나 창의적 작업에는 부적합",
        myUsageRule: "대량 처리, 분류, 간단한 변환에 사용합니다. 품질이 중요한 작업에는 사용하지 않습니다.",
      },
    ],
  },
  {
    provider: "OpenAI (GPT)",
    models: [
      {
        model: "최신 플래그십 모델",
        strength: "광범위한 지식, 강력한 코딩 능력, 멀티모달 지원",
        bestUseCase: "복잡한 코딩, 데이터 분석, 멀티모달 작업, 생각 정리",
        limitation: "API 비용이 높고, 최신 정보 반영에 시간차가 있을 수 있음",
        myUsageRule: "ChatGPT로 아이디어 정리와 프롬프트 설계에 주로 사용합니다. 코딩 실행은 Claude Code에 맡깁니다.",
      },
      {
        model: "경량 모델 (mini)",
        strength: "빠르고 저렴. 간단한 작업에서 충분한 품질",
        bestUseCase: "간단한 질문, 텍스트 분류, 빠른 초안 작성",
        limitation: "복잡한 추론이나 긴 문맥에서 품질 저하",
        myUsageRule: "비용이 중요한 대량 처리나 간단한 작업에 사용합니다.",
      },
    ],
  },
  {
    provider: "Google (Gemini)",
    models: [
      {
        model: "Pro (고성능)",
        strength: "멀티모달 처리(이미지, 영상, 텍스트)가 강력. 긴 컨텍스트 지원",
        bestUseCase: "이미지 분석, 멀티모달 작업, Google 생태계 연동",
        limitation: "한국어 맥락 이해가 Claude/GPT 대비 부족할 수 있음",
        myUsageRule: "멀티모달 작업이 필요할 때 사용합니다. 텍스트 전용 작업에서는 Claude를 우선합니다.",
      },
      {
        model: "Flash (경량형)",
        strength: "빠른 속도와 낮은 비용. 간단한 멀티모달 작업에 적합",
        bestUseCase: "빠른 이미지 분류, 간단한 요약, 대량 처리",
        limitation: "복잡한 추론이나 깊은 분석에는 부적합",
        myUsageRule: "속도가 중요한 멀티모달 처리에 사용합니다.",
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
