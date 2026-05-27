# AI Lab

프롬프트 엔지니어링, Claude Skills, AI 에이전트 구현 패턴, AI 관련 법률, 공공기관 AI 가이드, 주요 AI 회사별 사용 가이드를 정리한 문서입니다. 각 주장과 설명 바로 아래에 근거 레퍼런스를 함께 배치해, 어떤 내용이 어떤 자료에서 나온 것인지 바로 확인할 수 있도록 구성했습니다.

**목차**

- Part 1. 프롬프트 엔지니어링 가이드
- Part 2. Claude Skills 가이드
- Part 3. AI 에이전트 구현 패턴 가이드
- Part 4. AI 관련 법률 가이드
- Part 5. 공공기관·국가 AI 가이드
- Part 6. AI 회사별 사용 가이드

---

## Part 1. 프롬프트 엔지니어링 가이드

AI를 실무에서 사용하면서 반복적으로 느낀 점이 있습니다. 같은 문서를 요약시켜도 결과가 매번 달라지고, "정리해줘"라고 했더니 쓸데없는 말만 길어지고, 그럴듯하지만 틀린 답변 때문에 오히려 검토 시간이 늘어나는 경험입니다. 이 가이드는 그런 문제를 해결하기 위해 정리한 내용입니다.

### 1.1 프롬프트 엔지니어링이란?

이런 문제는 AI가 부족해서가 아니라, **지시가 모호했기 때문에** 발생합니다. AI는 스스로 맥락을 보완하지 않고, **주어진 지시를 그대로 실행**하는 성향이 있기 때문입니다.

프롬프트 엔지니어링은 LLM에게 **무엇을, 왜, 어떻게 할지 명확히 전달하는 방법**입니다. **업무 지시서**에 가깝다고 이해하면 됩니다.

- "이거 정리해줘요" 같은 모호한 지시는 정확한 결과를 얻기 어렵습니다.
- "아래 문서를 읽고, 임원 보고용으로 핵심 결론 3가지를 불릿으로 정리해 주세요" 같은 정확한 지시를 사용하면, AI를 훨씬 똑똑하게 활용할 수 있습니다.

**근거 레퍼런스**

- [OpenAI - Prompt engineering best practices for ChatGPT](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt): 프롬프트 엔지니어링을 모델의 응답을 유도하기 위한 입력 설계·최적화 과정으로 설명합니다.
- [Anthropic - Best practices for prompt engineering](https://claude.com/blog/best-practices-for-prompt-engineering): 모호한 지시와 명확한 지시의 차이가 결과 품질을 크게 바꾼다는 점을 설명합니다.
- [Google Cloud - Prompt engineering best practices](https://cloud.google.com/blog/products/application-development/five-best-practices-for-prompt-engineering): LLM에는 맥락적이고 구체적이며 목적에 맞는 자연어 지시가 필요하다고 정리합니다.

### 1.2 용어 정리

| 용어 | 설명 |
| --- | --- |
| **LLM** (Large Language Model) | 대규모 언어 모델. ChatGPT, Claude, Gemini 등이 대표적입니다. 대량의 텍스트 데이터로 학습하여 사람의 언어를 이해하고 생성합니다. |
| **프롬프트** (Prompt) | AI에게 전달하는 지시문입니다. 질문, 요청, 맥락, 조건 등을 포함합니다. |
| **토큰** (Token) | LLM이 텍스트를 처리하는 최소 단위입니다. 한국어 한 글자는 보통 2~3토큰에 해당합니다. 토큰이 많을수록 비용과 처리 시간이 늘어납니다. |
| **Chain-of-Thought (CoT)** | 생각의 과정을 단계별로 명시하는 프롬프트 기법입니다. 복잡한 논리적 작업에서 정확도를 높여줍니다. |
| **Few-shot** | 프롬프트에 입출력 예시를 함께 제공하는 기법입니다. 예시가 있으면 LLM이 원하는 형식과 톤을 더 정확하게 따릅니다. |
| **Zero-shot** | 예시 없이 지시문만으로 작업을 요청하는 기법입니다. 간단한 작업에 적합하고 토큰을 절약할 수 있습니다. |
| **할루시네이션** (Hallucination) | AI가 그럴듯하지만 사실이 아닌 정보를 생성하는 현상입니다. 검증 없이 결과를 믿으면 안 되는 이유입니다. |
| **RAG** (Retrieval-Augmented Generation) | 외부 데이터를 검색한 뒤 그 결과를 LLM에 전달하여 답변을 생성하는 방식입니다. 할루시네이션을 줄이고 최신 정보를 반영할 수 있습니다. |
| **Pydantic** | Python의 데이터 검증 라이브러리입니다. LLM 출력을 구조화하고 타입을 검증하는 데 사용합니다. |
| **Skill** | Claude에게 특정 업무를 반복적이고 일관되게 수행하는 방법을 가르쳐주는 맞춤형 지침 패키지입니다. |

### 1.3 프롬프트 작성 시 주의사항

직접 사용하면서 가장 효과가 컸던 원칙들을 정리했습니다.

**1) "정리해줘 / 분석해줘"는 거의 실패합니다**

AI에게는 **행동 + 결과물**이 함께 주어져야 합니다. "기획안 분석해줘"가 아니라, "기획안을 읽고, 리스크 요소만 5개 뽑아서 각 항목별로 한 줄 코멘트해 주세요"처럼 결과물을 **눈으로 그릴 수 있을 정도**로 구체화해서 전달해야 합니다.

**2) 모르면 '모른다고 말하게' 시켜야 합니다**

AI는 기본적으로 **추측해서라도 답하려는 성향**이 있습니다. 이것이 할루시네이션의 원인입니다.

```markdown
정보가 부족해 판단이 어려운 경우에는
억지로 결론을 내리지 말고 그렇게 알려주세요.
```

이 문장 하나만 추가해도, 그럴듯하지만 틀린 답변이 크게 줄어듭니다.

**3) 금지보다 대안을 주는 것이 효과적입니다**

- ❌ "너무 길게 쓰지 마세요"
- ✅ "각 항목은 최대 2문장으로 작성해 주세요"

AI는 하지 말라는 지시보다, **어떻게 하면 되는지**를 훨씬 잘 따릅니다.

**4) 한 번에 여러 일을 시키지 않는 것이 좋습니다**

복잡한 요청은 **단계로 나누면 정확도가 올라갑니다**.

- 1단계: 초안 생성
- 2단계: 누락/문제점 체크
- 3단계: 수정 반영

한 번에 시키는 것보다, **나눠 시키는 편이 더 빠른 경우가 많았습니다**.

**5) 모델과 작업 종류에 따라 프롬프트 전략은 달라져야 합니다**

같은 프롬프트라도 모델 종류, reasoning 모델 여부, API/웹 UI 사용 여부에 따라 결과가 달라질 수 있습니다. 따라서 "항상 잘 되는 만능 프롬프트"를 찾기보다, 작업별로 작은 테스트 세트를 만들고 결과를 비교하는 방식이 더 현실적입니다.

**근거 레퍼런스**

- [OpenAI - Best practices for prompt engineering with the API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api): 최신 모델 사용, 지시와 맥락 분리, 구체적인 출력 형식 제시, zero-shot → few-shot → fine-tuning 순서 등을 권장합니다.
- [Microsoft - Prompt engineering techniques](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering?view=foundry-classic): 모델마다 동작이 다르며, 프롬프트는 경험과 반복을 통해 다듬는 성격이 강하다고 설명합니다.
- [Google Cloud - Prompt engineering best practices](https://cloud.google.com/blog/products/application-development/five-best-practices-for-prompt-engineering): 모델의 강점·한계·편향을 이해한 뒤 프롬프트를 설계해야 한다고 설명합니다.

### 1.4 좋은 프롬프트의 기본 구조

대부분의 잘 작동하는 프롬프트는 아래 5가지 요소를 포함하고 있습니다.

```markdown
1. 역할 (누구의 관점에서 일해야 하는지)
2. 목표 (무엇을 해야 하는지)
3. 맥락 (왜 필요한지)
4. 출력 조건 (형식·분량·톤)
5. 생각 순서 (복잡한 경우)
```

모든 요소를 항상 다 쓸 필요는 없지만, **결과가 흔들릴수록 하나씩 추가**하면 안정성이 올라갑니다. LLM의 결과가 만족스럽지 않다면 위의 정보를 하나씩 추가해보는 것을 권장합니다.

**근거 레퍼런스**

- [OpenAI - API prompt engineering best practices](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api): 지시를 앞에 두고 구분자(`"""`, `###`)로 맥락을 분리하며, 원하는 형식과 스타일을 구체화하라고 권장합니다.
- [Microsoft - Prompt components](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering?view=foundry-classic): instructions, primary content, examples, cues, supporting content처럼 프롬프트를 구성 요소로 나누어 설명합니다.

### 1.5 프롬프트 고도화 기법

**1) 생각 순서를 주면 결과가 안정됩니다 (Chain-of-Thought)**

기획 검토, 문제 분석, 개선안 도출 같은 논리적 작업에서는 **생각 순서 지정이 거의 필수**입니다. 사람에게 일을 시킬 때처럼 단계별로 업무 과정을 설명해 주면 논리 오류나 말 바뀜이 눈에 띄게 줄어듭니다.

```markdown
다음 순서로 생각해 주세요.
1. 문제 정의
2. 원인 정리
3. 개선 방향 도출
그 후 최종 결론만 정리해 주세요.
```

**2) 출력 형식은 '설명'보다 '틀'이 효과적입니다**

말로 길게 설명하기보다, **출력 구조를 그대로 보여주는 편이 훨씬 효과적**입니다. 표, 리스트, 보고서 요약처럼 **형식이 중요한 작업일수록 효과가 큽니다**.

```markdown
[출력 형식]
- 이슈:
- 영향:
- 대응 방안:
```

**3) 마크다운을 활용하면 구조화된 지시가 가능합니다**

| 문법 | 의미 |
| --- | --- |
| # 제목 | 큰 챕터 제목 |
| ## 소제목 | 섹션 단위 설명 |
| **볼드체** | 핵심 개념, 반드시 기억해야 할 단어 강조 |
| `인라인 코드` | 용어, 변수명, 버튼명, 짧은 명령어 |
| - 리스트 | 나열, 조건, 체크 포인트 정리 |
| 1. 번호 리스트 | 순서가 중요한 절차 설명 |

**근거 레퍼런스**

- [IBM - Prompt engineering techniques](https://www.ibm.com/think/topics/prompt-engineering-techniques): zero-shot, few-shot, chain-of-thought, prompt chaining, RAG, tool-use 등 주요 기법을 작업 유형별로 설명합니다.
- [Anthropic - Chain of thought prompting](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought): 복잡한 분석·문제 해결에서는 단계적 사고 공간을 주는 방식이 성능을 높일 수 있다고 설명합니다.
- [Microsoft - Prompt engineering techniques](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering?view=foundry-classic): 마크다운, 구분자, 출력 cue를 사용하면 모델이 의도와 형식을 더 쉽게 파악할 수 있다고 설명합니다.

### 1.6 자주 쓰이는 프롬프트 패턴

**1) 초안 → 자기 점검 → 개선 (CoT)**

```markdown
초안을 작성해 주세요.
그 다음, 스스로 부족한 점 3가지를 지적하고
이를 반영해 개선 버전을 다시 작성해 주세요.
```

**2) 입출력 정답 예시 주기 (Few-shot)**

```markdown
[예시]
입력: 기능 출시 안내
출력: 사용자에게 핵심 변화만 전달하는 간결한 문구

위 예시와 동일한 톤으로
아래 내용도 작성해 주세요.
```

**3) 검증 가능한 답변만 요구하기**

사실 확인이 필요한 작업에서는 "근거가 없으면 모른다고 말하기", "근거 문장과 결론을 분리하기", "확실한 내용과 추정한 내용을 구분하기"를 함께 지시하는 것이 좋습니다. 특히 포트폴리오, 이력서, 법률, 기술 스택 설명처럼 신뢰가 중요한 문서에서는 그럴듯한 문장보다 검증 가능한 문장이 더 중요합니다.

```markdown
아래 문서를 기준으로만 답변해 주세요.
문서에 없는 내용은 추측하지 말고 "문서에서 확인되지 않음"이라고 표시해 주세요.

[출력 형식]
- 확인된 내용:
- 근거:
- 확인되지 않은 내용:
```

**근거 레퍼런스**

- [Microsoft - Prompt engineering techniques](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering?view=foundry-classic): 특정 스니펫이 주장을 뒷받침하는지 검증하는 방식의 프롬프트 예시를 제공합니다.
- [IBM - Prompt engineering techniques](https://www.ibm.com/think/topics/prompt-engineering-techniques): RAG는 최신·도메인 지식이 필요한 답변을 외부 정보와 결합해 생성하는 방식이라고 설명합니다.

### 1.7 이미지 생성을 위한 프롬프트

텍스트 프롬프트와 이미지 프롬프트의 가장 큰 차이는 **결과물이 공간과 시각 요소를 가진다**는 점입니다. 이미지 생성에서는 아래 요소들이 특히 중요합니다.

```markdown
- 무엇이 그려지는지 (대상)
- 어디에 있는지 (공간·배경)
- 어떻게 보이는지 (스타일·색감·구도)
- 무엇이 없어야 하는지 (제외 조건)
```

1. **시각적 대상은 구체적인 명사로 작성합니다** — 명사 선택이 품질을 좌우합니다. 크기, 재질, 위치 중 하나만 추가해도 결과가 크게 달라집니다.
2. **배경과 공간을 반드시 지정합니다** — 배경을 쓰지 않으면 AI가 임의로 채웁니다. "배경 없음"보다는 "단순한 배경"이 더 잘 동작합니다.
3. **스타일은 이미지 관점에서 설명합니다** — 감정 표현보다 시각적 결과물 기준이 효과적입니다.
4. **구도와 시점을 간단히 추가합니다** — 구도는 한 줄만 있어도 충분합니다. 쓰지 않으면 불필요한 크롭이나 왜곡이 생길 수 있습니다.
5. **색감과 조명은 분위기를 결정합니다** — 색과 조명은 마지막에 덧붙이는 요소로 생각하면 됩니다.
6. **제외 조건을 미리 명시합니다** — 의도하지 않은 소품이나 워터마크 같은 요소가 함께 나타나서 완성도가 떨어질 수 있습니다.
7. **수정 작업에서는 바꿀 것과 유지할 것을 분리합니다** — 인물, 제품, 레이아웃, 텍스트처럼 유지해야 하는 요소가 있다면 매번 명시해야 결과가 덜 흔들립니다.
8. **실사·제품·UI 작업에서는 텍스트와 레이아웃 제약을 정확히 씁니다** — 이미지 안의 문구, 위치, 비율, 배경, 워터마크 금지 같은 조건은 애매하게 쓰지 않는 것이 좋습니다.

**근거 레퍼런스**

- [Google AI - Gemini image generation](https://ai.google.dev/gemini-api/docs/image-generation): 이미지 생성에서 프롬프트, 참조 이미지, aspect ratio, image size 등을 함께 제어하는 예시를 제공합니다.
- [OpenAI Cookbook - gpt-image-1.5 prompting guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide/): 이미지 생성·편집에서 명확한 제약, 반복 수정, 유지할 요소와 바꿀 요소의 분리가 중요하다고 설명합니다.
- [Google AI - Nano-Banana Pro prompting guide](https://dev.to/googleai/nano-banana-pro-prompting-guide-strategies-1h9n): 태그 나열보다 자연어 브리핑, 구체적 대상·공간·조명·질감 설명, 수정 중심 접근을 권장합니다.

### 1.8 마무리

- AI는 똑똑하지만, **알아서 일하지는 않습니다**
- 잘 쓴 프롬프트 하나가 **회의 한 시간을 줄여줍니다**
- 프롬프트는 개인 요령이 아니라 **팀의 생산성 자산**입니다

프로젝트에서 AI를 사용한다면 프롬프트를 비교·개선하며, 우리만의 표준을 만들어 가는 것을 권장합니다.

---

## Part 2. Claude Skills 가이드

Claude를 실무에서 반복적으로 사용하면서 느낀 점은, 매번 같은 지시를 처음부터 설명하는 것이 비효율적이라는 것이었습니다. Skill은 그 문제를 해결해주는 기능입니다.

### 2.1 Skill이 무엇인가요?

**Skill**은 Claude에게 특정 업무를 반복적이고 일관되게 수행하는 방법을 가르쳐주는 **맞춤형 지침 패키지**입니다. 쉽게 말하면, 신입사원에게 주는 **업무 온보딩 매뉴얼**이라고 생각하면 됩니다.

> 💡 **비유로 이해하면**
> 매번 새로운 직원이 올 때마다 "우리 회사 보고서 양식은 이렇게 써", "이메일 톤은 이렇게 유지해", "데이터는 이 방식으로 정리해"라고 처음부터 설명해야 한다면 비효율적입니다.
> Skill은 그 설명을 한 번만 작성해두면, Claude가 관련 업무를 할 때 자동으로 참고해서 일하는 방식입니다.

Claude는 대화할 때 사용 가능한 Skill 목록을 스캔하고, **현재 요청과 관련이 있는 Skill만 골라서 자동으로 불러옵니다**. 불필요한 Skill은 로드하지 않아서 효율적입니다.

Claude Skills의 핵심은 모든 지침을 항상 컨텍스트에 넣는 것이 아니라, 먼저 Skill 이름과 설명만 가볍게 읽고 필요할 때 `SKILL.md`와 추가 자료를 단계적으로 불러오는 **progressive disclosure** 구조입니다. 그래서 Skill 설명은 짧지만 정확해야 하고, 실제 지침은 `SKILL.md` 안에서 재사용 가능한 절차로 정리하는 것이 좋습니다.

**근거 레퍼런스**

- [Claude Docs - Skills overview](https://claude.com/docs/skills/overview): Skill은 `SKILL.md`를 포함한 디렉터리이며, 이름·설명 메타데이터를 먼저 읽고 필요할 때 전체 지침과 리소스를 로드한다고 설명합니다.
- [Claude Help Center - Use Skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude): Skills는 관련 작업에서 자동으로 사용되며, 사용자 정의 Skill을 추가해 반복 업무 방식을 Claude에게 가르칠 수 있다고 설명합니다.

### 2.2 왜 Skill을 써야 하는가

예를 들어 특정 톤에 맞는 문서를 작성해야 하는 상황을 생각해보면, 톤 가이드에는 지켜야 할 규칙이 많습니다. Claude에게 매번 처음부터 설명하면 이렇게 됩니다:

```markdown
해요체로 써줘. 수동형 표현은 쓰지 말고,
"안 돼요" 대신 "~하면 할 수 있어요"처럼 긍정형으로 써줘.
"~시겠어요?" 같은 과도한 경어도 빼고,
한자어는 동사 형태로 풀어써줘. 그리고...
```

결과물을 받아보면 톤이 조금씩 어긋나 있고, 첨삭을 반복하게 됩니다. Skill을 만들면 이 과정을 없앨 수 있습니다.

|  | 프롬프트만 사용 | Skill 사용 |
| --- | --- | --- |
| **설정 방식** | 매번 대화마다 반복 입력 | 한 번 만들어두면 자동 적용 |
| **일관성** | 매번 결과물이 조금씩 달라질 수 있음 | 항상 같은 기준으로 동일한 품질 |
| **팀 공유** | 각자가 따로 관리 | 팀 전체에 동일하게 배포 가능 |
| **전문성** | 일반적인 수준의 도움 | 우리 조직만의 방식을 학습한 전문 도움 |
| **업무 복잡도** | 단순 작업에 적합 | 복잡한 다단계 워크플로우도 처리 가능 |

### 2.3 Skill의 장점

1. **반복 업무를 자동화합니다** — 보고서, 회의록 등을 한 번 Skill로 만들어두면 Claude가 알아서 처리합니다.
2. **조직의 노하우를 저장합니다** — 업무 방식, 가이드라인, 내부 규정 등을 담아두면 누가 쓰더라도 동일한 퀄리티를 낼 수 있습니다.
3. **코딩 없이도 만들 수 있습니다** — 마크다운으로 작성할 수 있어서 개발자가 아니어도 충분히 만들 수 있습니다.
4. **필요할 때만 자동으로 켜집니다** — Claude가 현재 요청에 맞는 것만 골라 사용합니다.

### 2.4 Skill 만드는 방법

개발 지식이 없어도 **Claude에게 말로 설명하면** 알아서 Skill 파일을 만들어줍니다.

1. Claude Desktop 또는 CLI에서 새 대화를 생성하고, 만들 Skill에 대해 설명합니다.
2. Claude와 질문과 답변을 반복한 뒤, 충분히 만족스러운 결과가 나왔다면 피드백을 끝내고 Skill 파일을 만듭니다.
3. 생성된 Skill 파일을 등록하면, 이후 관련 요청이 있을 때 Claude가 자동으로 참고합니다.

핵심 규칙과 원하는 결과물의 형태만 명확하게 설명해도 충분히 작동합니다. 먼저 간단하게 작성한 뒤 성능 확인을 거쳐서 구체화하는 것을 추천합니다.

**Skill 작성 시 확인할 것**

- `description`에는 언제 이 Skill을 써야 하는지 분명히 적습니다.
- `SKILL.md`에는 반복 가능한 절차, 금지 사항, 출력 형식, 검증 방법을 넣습니다.
- 참고 자료나 스크립트가 있다면 Skill 폴더 안에 함께 두고, 필요한 순간에만 열어보도록 안내합니다.
- 외부에서 받은 Skill은 실행 가능한 스크립트나 민감정보 접근 여부를 먼저 확인한 뒤 사용합니다.

**근거 레퍼런스**

- [Claude Docs - Agent Skills](https://docs.claude.com/en/docs/claude-code/skills): Claude Code에서 Skill을 프로젝트 또는 사용자 단위로 둘 수 있고, `SKILL.md`와 선택적 참고 문서·스크립트 구조를 사용할 수 있다고 설명합니다.
- [Claude Help Center - Create a skill through conversation](https://support.claude.com/en/articles/12599426-how-to-create-a-skill-with-claude-through-conversation): Claude와 대화하며 업무 방식과 자료를 설명하면 `SKILL.md`와 필요한 파일 구조를 만들 수 있다고 설명합니다.

### 2.5 FAQ

**Q. Skill을 사용하면 Claude의 응답 속도가 느려지지 않나요?**

아닙니다. Claude는 현재 질문과 관련 있는 Skill만 선별해서 사용합니다. Skill이 여러 개 등록되어 있어도 응답 속도에 큰 영향을 주지 않습니다.

**Q. Skill을 사용하면 Claude의 기본 답변 방식이 달라지나요?**

Skill은 특정 작업을 수행할 때 참고하는 추가 지침 역할입니다. 일반적인 질문에는 기존과 동일하게 답변하고, Skill과 관련된 요청이 있을 때만 해당 규칙이나 절차를 적용합니다.

**Q. Skill이 자동으로 실행되면 내가 어떤 Skill이 사용됐는지 알 수 있나요?**

Claude는 상황에 따라 적절한 Skill을 자동으로 선택해 사용합니다. 특정 Skill을 반드시 사용하고 싶다면 명령어 방식으로 직접 지정할 수도 있습니다.

---

## Part 3. AI 에이전트 구현 패턴 가이드

이 문서는 AI 에이전트를 구현할 때 참고할 수 있는 기본 패턴을 정리한 것입니다. 프롬프트 설계, 구조화된 출력, RAG 구현, 상태 관리, 워크플로우 선택 기준을 중심으로 설명합니다.

AI 에이전트는 단순히 "LLM에게 긴 프롬프트를 주는 것"이 아니라, **입력 → 판단 → 도구 사용 → 중간 결과 저장 → 검증 → 최종 응답**의 흐름을 설계하는 일에 가깝습니다. 그래서 프롬프트만큼이나 상태 관리, 도구 호출 방식, 출력 스키마, 재시도 전략, 로그가 중요합니다.

**근거 레퍼런스**

- [LangGraph - Overview](https://docs.langchain.com/oss/python/langgraph/overview): 장기 실행·상태 기반 에이전트에는 durable execution, human-in-the-loop, memory, debugging이 중요하다고 설명합니다.
- [Google ADK - Overview](https://adk.dev/): ADK를 엔터프라이즈 규모의 에이전트를 빌드·디버그·배포하기 위한 오픈소스 프레임워크로 설명합니다.
- [CrewAI - Documentation](https://docs.crewai.com/): 다중 에이전트, crew, flow, memory, knowledge, observability 기반의 에이전트 워크플로우를 설명합니다.

### 3.1 프롬프트 설계

**프롬프트 파일 분리**

복잡한 프롬프트는 코드 안에 직접 작성하기보다 별도 파일로 관리하는 것이 좋습니다.

- 역할, 목표, 입력 조건, 출력 형식을 분리해 관리합니다.
- 단계별 프롬프트와 단일 호출 프롬프트를 구분합니다.
- 프롬프트 변경 이력을 남겨 결과 품질을 비교할 수 있게 합니다.

이렇게 분리하면 프롬프트 버전 관리가 쉽고, A/B 테스트가 편해집니다.

**Few-shot 프롬프트**

예시를 보여주면 LLM이 원하는 형식과 판단 기준을 더 잘 이해합니다. 과거 결과물, 정답 예시, 실패 예시를 함께 제공하면 출력 품질이 안정됩니다.

| 방식 | 정확도 | 사용 토큰 | 언제 사용하는가 |
| --- | --- | --- | --- |
| Zero-shot | 낮음 | 적음 | 간단한 작업 |
| Few-shot | 높음 | 많음 | 복잡하거나 특정 포맷이 필요한 작업 |

**프롬프트 체이닝 전략**

*2단계 접근 (step-by-step)* — Stage 1에서 요청을 분석해 중간 결과를 만들고, Stage 2에서 그 결과를 바탕으로 최종 응답을 생성합니다.
- 장점: 정확도가 높고, 중간 결과를 확인할 수 있고, 단계별 최적화가 가능합니다
- 단점: LLM을 2번 호출해서 비용과 시간이 늘어나고, 누적 에러가 발생할 수 있습니다

*1단계 접근 (direct)* — 요청을 받아 중간 분석과 최종 응답을 한 번에 생성합니다.
- 장점: 빠르고 저렴하고, 일관성 있는 출력을 만듭니다
- 단점: 정확도가 낮을 수 있고, 중간 과정을 확인할 수 없습니다

정확도가 중요하면 단계별 체이닝을 사용하고, 속도와 비용이 중요하면 단일 호출 방식을 선택합니다.

**근거 레퍼런스**

- [IBM - Prompt chaining](https://www.ibm.com/think/topics/prompt-engineering-techniques): prompt chaining은 한 프롬프트의 출력을 다음 프롬프트 입력으로 연결하는 다단계 처리 방식이라고 설명합니다.
- [Microsoft - Break the task down](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering?view=foundry-classic): 복잡한 작업을 작은 단계로 나누면 각 단계의 목적과 검증이 명확해진다고 설명합니다.

### 3.2 구조화된 출력

LLM 출력을 Pydantic으로 검증합니다.

**스키마 정의** — 입력과 출력을 명확한 타입으로 정의합니다.
- `Input`: 사용자가 전달하는 요청 데이터
- `IntermediateResult`: 중간 추론이나 분류 결과
- `FinalOutput`: 최종 응답 데이터

**왜 Pydantic인가**
- 타입 안정성을 보장합니다. 런타임에 검증합니다.
- 자동으로 문서화됩니다. API 스키마를 생성합니다.
- IDE 지원이 좋습니다. 자동완성과 타입 체크를 제공합니다.

**Tool Use vs Response Format**

- **Tool Use 방식 (Anthropic)**: tools 리스트를 만들고, 각 tool에 input_schema를 지정합니다. messages.create를 호출할 때 tool_choice로 어떤 tool을 사용할지 명시합니다.
- **Response Format 방식 (OpenAI)**: chat.completions.parse를 호출할 때 response_format에 Pydantic 모델을 전달합니다.

여러 모델을 함께 사용할 경우에는 모델별 구조화 출력 방식을 추상화해 같은 인터페이스로 호출할 수 있게 만드는 것이 좋습니다.

다만 구조화 출력이 있다고 해서 의미적으로 항상 맞는 답이 나오는 것은 아닙니다. 스키마는 형식을 검증해주지만, 값의 타당성·정책 위반 여부·비즈니스 규칙 충족 여부는 별도 검증 로직으로 확인해야 합니다.

**근거 레퍼런스**

- [OpenAI - Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs): OpenAI SDK는 Pydantic/Zod로 정의한 스키마를 구조화 출력에 사용할 수 있으며, user-generated input에서는 안전상 거절이 발생할 수 있다고 설명합니다.
- [OpenAI - Introducing Structured Outputs](https://openai.com/index/introducing-structured-outputs-in-the-api/): tools 또는 response format에 스키마를 제공해 타입화된 구조로 응답을 받을 수 있다고 설명합니다.
- [Claude API Docs - Define tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools?categoryid=2849204): Claude API의 `tools` 파라미터와 `input_schema`를 통해 도구 입력 구조를 정의할 수 있다고 설명합니다.

### 3.3 RAG 구현

**검색 전략 선택**

| 방식 | 장점 | 단점 | 사용 케이스 |
| --- | --- | --- | --- |
| BM25 | 빠르고 키워드 매칭이 정확함 | 의미를 이해하지 못함 | 로그, 코드 심볼 검색 |
| Vector | 의미 기반으로 검색함 | 느리고 임베딩이 필요함 | 문서 검색, QA |
| Hybrid | 두 장점을 결합함 | 복잡함 | 고도화된 RAG |

검색 방식은 데이터의 성격에 맞춰 선택합니다. 정확한 키워드 매칭이 중요하면 BM25를, 의미 기반 검색이 중요하면 임베딩 검색을, 둘 다 필요하면 Hybrid 방식을 고려합니다.

**인덱스 관리** — 인덱스는 한 번만 빌드하고, 이후에는 로드만 합니다. build_index로 구축 → save_index로 pkl 저장 → load_index로 빠르게 로드합니다.

**Lazy Loading 최적화** — 초기화할 때 검색 엔진만 만들고, 실제 인덱스는 첫 요청이 들어올 때 로드합니다. 초기화 시간이 단축되고 메모리를 효율적으로 사용합니다.

**Top-k 선택**
- 작은 값: 빠르지만 참고 문맥이 부족할 수 있음
- 중간 값: 속도와 정확도의 균형이 좋음
- 큰 값: 문맥은 풍부하지만 느리고 토큰을 많이 사용함

**RAG에서 추가로 확인할 것**

- 청크 크기와 overlap은 검색 정확도와 토큰 비용에 직접 영향을 줍니다.
- 검색 결과에는 source, chunk id, score를 함께 남겨야 추후 답변 오류를 추적할 수 있습니다.
- 최신 정보가 필요한 주제는 인덱스 갱신 주기와 문서 버전을 함께 관리해야 합니다.
- LLM 답변에는 검색된 문서를 그대로 붙이는 것보다, 어떤 문서가 어떤 주장을 뒷받침하는지 연결하는 것이 좋습니다.

**근거 레퍼런스**

- [IBM - Retrieval augmented generation](https://www.ibm.com/think/topics/prompt-engineering-techniques): RAG는 외부 정보를 검색해 최신·도메인 지식을 반영한 답변을 생성하는 방식이라고 설명합니다.
- [LangGraph - Durable execution](https://docs.langchain.com/oss/python/langgraph/durable-execution): 장기 실행 워크플로우에서는 상태 저장, 재개, idempotent한 설계가 중요하다고 설명합니다.

### 3.4 선택 가이드

**프레임워크 선택**

| 상황 | 추천 프레임워크 | 이유 |
| --- | --- | --- |
| Tool Calling 필요 | Google ADK, CrewAI | Tool 지원이 강력함 |
| 멀티 에이전트 협업 | CrewAI | 에이전트 간 통신이 내장돼 있음 |
| 복잡한 워크플로우 | LangGraph | State 관리, 분기 처리 |

**프롬프트 전략 선택**

| 상황 | 추천 전략 | 이유 |
| --- | --- | --- |
| 간단한 작업 | Zero-shot | 토큰을 절약함 |
| 복잡한 작업 | Few-shot | 정확도가 향상됨 |
| 정확도 중요 | 체이닝 (2단계) | 단계별로 검증함 |
| 속도 중요 | 단일 호출 | LLM을 1번만 호출함 |

**RAG 방식 선택**

| 상황 | 추천 방식 | 이유 |
| --- | --- | --- |
| 문서 QA | Embedding | 의미 기반으로 검색함 |
| 키워드 검색 | BM25 | 정확하게 매칭함 |
| 고도화된 RAG | LightRAG + 커스텀 | Hybrid로 접근함 |

**프레임워크 선택 시 추가 기준**

| 기준 | 확인 질문 |
| --- | --- |
| 상태 관리 | 중간 결과를 저장하고 실패 후 재개해야 하는가? |
| 사람 검토 | 특정 단계에서 승인·수정·반려가 필요한가? |
| 도구 호출 | 외부 API, DB, 파일, 브라우저, 코드 실행이 필요한가? |
| 관측 가능성 | 어떤 프롬프트, 모델, 문서, 도구가 결과에 영향을 줬는지 추적 가능한가? |
| 유지보수 | 프롬프트, 스키마, RAG 인덱스, 모델 버전을 함께 관리할 수 있는가? |

**근거 레퍼런스**

- [LangGraph - Overview](https://docs.langchain.com/oss/python/langgraph/overview): durable execution, human-in-the-loop, memory, debugging을 장기 실행 에이전트의 핵심 지원 기능으로 설명합니다.
- [CrewAI - Documentation](https://docs.crewai.com/): agents, crews, flows를 조합해 협업형 에이전트 시스템을 만드는 구조를 제공합니다.
- [Google ADK - Tools for Agents](https://google.github.io/adk-docs/tools/): Google Search, 코드 실행, 데이터베이스, RAG Engine, Vertex AI Search 등 다양한 도구 연결 방식을 설명합니다.

### 3.5 핵심 Best Practice

1. **프롬프트는 파일로 분리합니다** — 버전 관리가 쉽고, A/B 테스트가 가능합니다
2. **구조화 출력을 사용합니다** — Pydantic으로 타입 안정성을 보장하고, 런타임에 검증합니다
3. **파라미터는 필수와 선택을 구분합니다** — 필수는 없으면 동작 불가, 선택은 기본값 제공
4. **응답에 재현 정보를 포함합니다** — result + request + usage로 디버깅과 추적이 용이합니다
5. **상태와 로그를 남깁니다** — 어떤 입력, 문서, 모델, 프롬프트 버전으로 답변했는지 남겨야 재현과 개선이 가능합니다
6. **사람 검토 지점을 둡니다** — 고위험 결정, 외부 발송, 파일 삭제, 비용 발생 작업은 사람이 승인하도록 설계합니다
7. **스키마와 프롬프트를 함께 버전 관리합니다** — 출력 구조가 바뀌면 후속 단계가 깨질 수 있으므로 프롬프트만 따로 관리하면 부족합니다

---

## Part 4. AI 관련 법률 가이드

AI를 활용하는 사람이라면 반드시 알아야 할 주요 법률을 정리한 문서입니다. 한국 인공지능기본법과 EU AI Act를 중심으로, 어떤 의무가 있고 무엇을 준비해야 하는지 정리했습니다.

### 4.1 한국 인공지능기본법

**개요**

- **정식 명칭**: 인공지능 발전과 신뢰 기반 조성 등에 관한 기본법
- **국회 통과**: 2024년 12월 26일 (재석 264명 중 찬성 260명)
- **시행일**: 2026년 1월 22일

한국은 국가 단위 AI 기본법을 시행하는 초기 사례 중 하나입니다. 이 법은 "규제보다 진흥에 무게를 두고 필요 최소한의 규제 체계를 도입"하는 방향으로 설계되었습니다.

**근거 레퍼런스**

- [국가법령정보센터 - 인공지능 발전과 신뢰 기반 조성 등에 관한 기본법](https://www.law.go.kr/lsInfoP.do?lsiSeq=268543): 법률 제20676호, 2025년 1월 21일 제정, 2026년 1월 22일 시행으로 공시되어 있습니다.
- [피카부랩스 - AI 기본법 완전 정리](https://peekaboolabs.ai/blog/ai-basic-law-guide): 한국 AI 기본법의 시행 일정, 고영향 AI, 생성형 AI, 투명성·안전성 의무를 실무 관점에서 요약합니다.

**고영향 AI**

고영향 AI는 **사람의 생명, 신체 안전, 기본권에 중대한 영향을 미치거나 위험을 초래할 우려가 있는** AI 시스템입니다.

| 분야 | 예시 |
| --- | --- |
| 에너지·식수 | 전력 공급 관리, 수질 관리 |
| 보건의료 | 진단 보조, 처방 추천 |
| 원자력 안전 | 원전 모니터링 |
| 교통 | 철도·도로·항공·해운 자율주행 |
| 금융 | 신용평가, 대출 심사 |
| 교육 | 입학 평가 |
| 고용 | 채용, 인사평가 |
| 공공 안전 | 범죄 예측, CCTV 분석 |
| 출입국 | 비자 심사 보조 |
| 사회보험·복지 | 수급 자격 판단 |

단순히 분야에 해당한다고 고영향 AI가 되는 것은 아닙니다. **사용 영역, 기본권 위험의 영향·중대성·빈도**를 종합적으로 판단합니다.

**근거 레퍼런스**

- [피카부랩스 - 고영향 AI 적용 분야](https://peekaboolabs.ai/blog/ai-basic-law-guide): 고영향 AI 11개 분야와 판단 기준을 정리합니다.

**생성형 AI 관련 의무**

- 생성 결과물에 **워터마크 표시** (사람 또는 기계 판독 가능)
- 딥페이크 등 실제와 구분 어려운 결과물은 **명확히 인식할 수 있도록** 공지
- AI 기반 제품·서비스라는 사실을 이용자에게 **사전 고지**

**근거 레퍼런스**

- [피카부랩스 - 생성형 AI 및 투명성 의무](https://peekaboolabs.ai/blog/ai-basic-law-guide): 생성형 AI 결과물 표시, 딥페이크 고지, AI 기반 운영 사실 사전 고지 의무를 정리합니다.

**투명성·안전성 의무**

- AI 기반 운영 사실을 이용자에게 사전에 명확히 알려야 합니다 (위반 시 3천만원 이하 과태료)
- 10²⁶ FLOP 이상 학습량의 초거대 AI 시스템은 전 생애주기에 걸친 위험 식별·평가·완화가 필요합니다
- 안전사고 모니터링 및 대응 체계를 구축해야 합니다

**근거 레퍼런스**

- [피카부랩스 - 투명성·안전성 의무](https://peekaboolabs.ai/blog/ai-basic-law-guide): AI 기반 운영 사실 고지, 10²⁶ FLOP 이상 대규모 AI 시스템의 위험 관리와 사고 대응 체계를 설명합니다.

**과태료 및 계도 기간**

- **과태료**: 최대 3천만원 이하
- **계도 기간**: 법 시행 후 최소 1년 이상 과태료 미부과 (실제 부과는 빨라도 2027년 이후)
- **해외 기업 국내 대리인 지정 의무**: 전년도 매출 1조원 이상, 서비스 매출 100억원 이상, 일평균 국내 이용자 100만명 이상 중 하나 해당 시

**근거 레퍼런스**

- [국가법령정보센터 - AI 기본법](https://www.law.go.kr/lsInfoP.do?lsiSeq=268543): 공식 법령 원문과 시행일 확인용 1차 자료입니다.
- [피카부랩스 - 시행 일정과 과태료 계도 기간](https://peekaboolabs.ai/blog/ai-basic-law-guide): 시행일, 계도 기간, 국내 대리인 지정 기준을 실무적으로 정리합니다.

### 4.2 EU AI Act (유럽연합 인공지능법)

**개요**

EU AI Act는 **세계 최초의 포괄적 AI 규제법**입니다. AI 시스템을 위험도에 따라 4단계로 분류하고, 단계별로 의무를 부과하는 체계입니다.

**근거 레퍼런스**

- [European Commission - AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): EU AI Act를 세계 최초의 포괄적 AI 법제이자 위험 기반 규칙으로 설명합니다.
- [EUR-Lex - Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj): EU AI Act 공식 법령 원문입니다.

**위험 분류 체계 (4단계)**

| 단계 | 위험 수준 | 규제 방식 | 예시 |
| --- | --- | --- | --- |
| **금지** | 허용 불가 | 완전 금지 | 사회점수제, 조작적 AI, 실시간 원격 생체인식 |
| **고위험** | 높음 | 엄격한 규제 | 신용평가, 채용 심사, 생체인식, 핵심 인프라 |
| **제한적 위험** | 제한적 | 투명성 의무 | 챗봇, 딥페이크, AI 생성 콘텐츠 |
| **최소 위험** | 낮음 | 의무 없음 | 스팸 필터, AI 게임, 대부분의 상용 AI |

**근거 레퍼런스**

- [European Commission - AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): AI 개발자와 deployer에게 AI 사용 위험도에 따른 규칙이 적용된다고 설명합니다.
- [Artificial Intelligence Act - AI Act overview](https://artificialintelligenceact.eu/): 위험 기반 분류와 주요 의무를 쉽게 탐색할 수 있는 참고 사이트입니다.

**단계별 시행 일정**

- **2025년 2월** (시행됨): 금지 AI 관행 전면 금지, AI 리터러시 확보 의무
- **2025년 8월** (시행됨): 범용 AI(GPAI) 제공자 의무와 EU 거버넌스 규칙 적용, 회원국 벌칙 법령 준비
- **2026년 8월** (예정): Annex III 고위험 AI 시스템 규칙과 투명성 규칙 적용
- **2027년 8월** (예정): 규제 제품 포함 고위험 AI 전환 기간 종료

2026년 5월 기준으로 EU AI Act Service Desk는 Digital Omnibus 패키지와 관련해 일부 고위험 AI 적용 시점을 조화표준·가이드라인 등 지원 도구의 준비 상황과 연결하는 조정안이 제안되었다고 안내합니다. 따라서 실제 서비스 적용 전에는 공식 타임라인과 가이드라인을 다시 확인해야 합니다.

**근거 레퍼런스**

- [AI Act Service Desk - Timeline for the Implementation of the EU AI Act](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act): 2025년 2월, 2025년 8월, 2026년 8월, 2027년 8월의 단계별 적용 일정을 공식 안내합니다.
- [Newitlec - EU AI Act 타임라인 요약](https://newitlec.com/entry/IT-%EC%BB%B4%ED%94%8C%EB%9D%BC%EC%9D%B4%EC%96%B8%EC%8A%A4-EU-AI-Act-%ED%83%80%EC%9E%84%EB%9D%BC%EC%9D%B8-%ED%95%9C-%EC%9E%A5-%EC%9A%94%EC%95%BD-20252027-%EB%AC%B4%EC%97%87%EC%9D%B4-%EC%96%B8%EC%A0%9C-%EC%A0%81%EC%9A%A9%EB%90%98%EB%82%98): 실무 준비 관점에서 인벤토리, 정책, 로그, 회귀 테스트 준비를 강조합니다.

**벌금 체계**

| 위반 유형 | 벌금 |
| --- | --- |
| 금지 AI 운영 | 최대 **3,500만 유로** 또는 전세계 매출의 **7%** |
| 고위험 AI 의무 위반 | 최대 **1,500만 유로** 또는 전세계 매출의 **3%** |
| 잘못된 정보 제공 | 최대 **750만 유로** 또는 전세계 매출의 **1.5%** |

**근거 레퍼런스**

- [EUR-Lex - Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj): EU AI Act 공식 법령 원문에서 위반 유형별 제재 기준을 확인할 수 있습니다.

**GPAI (범용 AI) 규제**

ChatGPT, Claude, Gemini 같은 범용 AI 모델에 대한 별도 규제가 있습니다.

- 모든 GPAI 제공자: 기술 문서 작성, 저작권 준수 정책, 학습 데이터 요약 정보 공개
- 시스템적 위험 GPAI (10²⁵ FLOP 이상): 모델 평가, 위험 평가 및 완화, 사고 보고 체계 구축

**근거 레퍼런스**

- [AI Act Service Desk - Timeline](https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act): 2025년 8월 2일부터 GPAI 제공자 의무와 거버넌스 규칙이 적용된다고 안내합니다.
- [European Commission - AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): EU AI Act가 GPAI 모델과 AI 개발자·배포자 의무를 포함한다고 설명합니다.

### 4.3 한국법 vs EU AI Act 비교

| 항목 | 한국 인공지능기본법 | EU AI Act |
| --- | --- | --- |
| **시행일** | 2026년 1월 22일 | 2025년 2월~2027년 8월 (단계적) |
| **규제 방향** | 진흥 중심, 최소 규제 | 포괄적 규제 |
| **위험 분류** | 고영향 AI (11개 분야) | 4단계 (금지/고위험/제한적/최소) |
| **최대 벌금** | 3천만원 | 3,500만 유로 또는 전세계 매출 7% |
| **계도 기간** | 1년 이상 | 없음 (단계적 시행으로 대체) |
| **생성형 AI** | 워터마크, 사전 고지 | 투명성 의무, GPAI 별도 규제 |
| **적용 범위** | 국내 서비스 제공자 | EU 시장 진출 기업 전체 |

**근거 레퍼런스**

- [국가법령정보센터 - AI 기본법](https://www.law.go.kr/lsInfoP.do?lsiSeq=268543): 한국 AI 기본법 공식 원문입니다.
- [European Commission - AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): EU AI Act의 위험 기반 규제 방향과 적용 일정을 확인할 수 있습니다.
- [피카부랩스 - AI 기본법 정리](https://peekaboolabs.ai/blog/ai-basic-law-guide): 한국법과 EU AI Act의 차이를 실무 관점에서 비교합니다.

### 4.4 AI를 활용하는 사람이 알아두면 좋은 점

1. **AI 사용 사실 고지**: AI가 생성한 콘텐츠나 AI 기반 서비스임을 사용자에게 알려야 합니다
2. **워터마크 의무**: 생성형 AI로 만든 이미지·영상·음성에 워터마크를 넣어야 합니다
3. **고위험 분야 주의**: 채용, 금융, 의료 등에 AI를 활용할 때는 더 엄격한 기준이 적용됩니다
4. **데이터 투명성**: AI 학습에 사용한 데이터에 대한 정보를 공개해야 할 수 있습니다
5. **인간 감독 유지**: 고위험 AI 시스템은 사람의 감독과 개입이 가능해야 합니다

**근거 레퍼런스**

- [피카부랩스 - AI 기본법 실무 의무](https://peekaboolabs.ai/blog/ai-basic-law-guide): 투명성, 워터마크, 고영향 AI, 영향 평가, 국내 대리인 지정 의무를 실무 관점으로 설명합니다.
- [Newitlec - EU AI Act 실무 준비 로드맵](https://newitlec.com/entry/IT-%EC%BB%B4%ED%94%8C%EB%9D%BC%EC%9D%B4%EC%96%B8%EC%8A%A4-EU-AI-Act-%ED%83%80%EC%9E%84%EB%9D%BC%EC%9D%B8-%ED%95%9C-%EC%9E%A5-%EC%9A%94%EC%95%BD-20252027-%EB%AC%B4%EC%97%87%EC%9D%B4-%EC%96%B8%EC%A0%9C-%EC%A0%81%EC%9A%A9%EB%90%98%EB%82%98): AI 인벤토리, 승인 프로세스, 로그, 회귀 테스트, 벤더 증빙을 준비 항목으로 정리합니다.

---

## Part 5. 공공기관·국가 AI 가이드

국가와 공공기관 자료는 "AI를 써도 된다/안 된다"보다, **무엇을 확인하고 어떤 책임 구조를 갖춰야 하는지**를 정리하는 데 유용합니다. 포트폴리오나 개인 프로젝트에서도 이 자료를 참고하면 AI 사용 경험을 단순한 도구 활용이 아니라, 개인정보·저작권·안전성·투명성까지 고려한 실무 역량으로 설명할 수 있습니다.

### 5.1 한국 공공기관 자료

| 자료 | 핵심 내용 | 프로젝트에 적용할 점 |
| --- | --- | --- |
| AI 기본법 | 고영향 AI, 생성형 AI, 투명성·안전성 의무, 국내 대리인 지정 | AI 서비스라면 사용자에게 AI 사용 사실을 고지하고, 고위험 분야인지 먼저 분류 |
| 과기정통부 AI 윤리기준 | 인간 존엄성, 사회의 공공선, 기술의 합목적성 | 기능 구현 전에 "사람에게 해가 없는가", "공정한가", "목적에 맞는가"를 점검 |
| AI 윤리기준 자율점검표 | 인권, 프라이버시, 다양성, 침해금지, 공공성, 연대성, 데이터 관리, 책임성, 안전성, 투명성 | 챗봇·작문·영상·채용·영상합성 분야별 체크리스트로 리스크 점검 |
| 개인정보보호위원회 AI 안내서 | 공개된 개인정보 처리, 생성형 AI 개발·활용, 공공기관 AI 영향평가 | 학습·검색·로그·프롬프트에 개인정보가 들어가는지 확인하고 최소화 |
| 개인정보 보호법 자동화 결정권 | 완전히 자동화된 결정에 대해 설명·검토 요구, 중대한 영향 시 거부권 | 사용자의 권리·의무에 영향을 주는 AI 판단은 사람이 검토할 수 있게 설계 |
| NIA AI 사업추진 윤리원칙 | AI 사업기획·실행·확산 단계의 윤리 원칙 | AI 프로젝트를 기획, 실행, 확산 단계로 나눠 책임과 영향 범위를 정리 |

**한국 AI 윤리기준의 3대 기본원칙**

1. **인간 존엄성**: AI는 인간의 생명, 정신적·신체적 건강, 존엄성을 해치지 않아야 합니다.
2. **사회의 공공선**: AI는 사회적 약자와 취약계층을 배제하지 않고, 가능한 많은 사람의 안녕과 행복에 기여해야 합니다.
3. **기술의 합목적성**: AI는 인간의 삶에 필요한 도구라는 목적에 맞게 개발·활용되어야 하며, 그 과정도 윤리적이어야 합니다.

**한국 AI 윤리기준의 10대 핵심요건**

| 요건 | 확인 질문 |
| --- | --- |
| 인권보장 | AI 결과가 사람의 기본권을 침해하지 않는가? |
| 프라이버시 보호 | 개인정보를 최소 수집하고, 목적 외 사용하지 않는가? |
| 다양성 존중 | 특정 집단을 배제하거나 차별하지 않는가? |
| 침해금지 | 물리적·정신적·경제적 피해를 만들 가능성이 없는가? |
| 공공성 | 사회 전체에 부정적 영향을 주지 않는가? |
| 연대성 | AI 혜택에서 소외되는 사용자를 고려했는가? |
| 데이터 관리 | 데이터 출처, 품질, 편향, 보관·삭제 기준이 있는가? |
| 책임성 | 문제 발생 시 누가 설명하고 수정할지 정해져 있는가? |
| 안전성 | 오류, 악용, 보안 취약점에 대비했는가? |
| 투명성 | 사용자에게 AI 사용 사실과 한계를 알리고 있는가? |

**근거 레퍼런스**

- [대한민국 정책브리핑 - 과기정통부, AI 윤리기준 마련](https://m.korea.kr/briefing/pressReleaseView.do?newsId=156428773): 과기정통부의 「사람이 중심이 되는 인공지능(AI) 윤리기준」 보도자료입니다.
- [KDI 경제정보센터 - 과기정통부 AI 윤리기준](https://eiec.kdi.re.kr/policy/materialView.do?num=208784): 2020년 과기정통부·KISDI가 AI 윤리기준을 마련했다는 정책자료입니다.
- [AI 윤리 소통채널 - 2025 인공지능 윤리기준 실천을 위한 자율점검표](https://ai.kisdi.re.kr/aieth/bbs/B0000085/view.do?menuNo=400&nttId=749&pageIndex=1): 10대 핵심요건과 챗봇·작문·영상·채용·영상합성 분야별 자율점검표를 제공합니다.
- [개인정보보호위원회 - 생성형 AI 개발·활용 개인정보 처리 안내서](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS211&mCode=C040020000&nttId=11414): 생성형 AI 개발·활용 과정의 개인정보 처리 기준을 안내합니다.
- [개인정보보호위원회 - 공개된 개인정보 처리 안내서](https://m.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS210&mCode=C020020000&nttId=10665): AI 개발·서비스 목적의 공개된 개인정보 처리와 안전조치 판단 기준을 설명합니다.
- [개인정보보호위원회 - 개인정보 보호법 자동화된 결정 권리](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=C020010000&nttId=9969): AI 등 완전히 자동화된 결정에 대한 설명·검토 요구권과 거부권을 설명합니다.
- [NIA - 국가 인공지능 사업추진 윤리원칙](https://www.nia.or.kr/site/nia_kor/04/10403080000002021090902.jsp): AI 사업기획, 실행, 확산 단계에서 고려해야 할 공공기관 윤리원칙을 제시합니다.

### 5.2 해외 공공기관·국제기구 자료

| 기관·국가 | 핵심 프레임워크 | 실무적으로 기억할 점 |
| --- | --- | --- |
| 미국 NIST | AI RMF 1.0 | AI 리스크를 `Govern → Map → Measure → Manage` 흐름으로 관리 |
| NIST GenAI Profile | 생성형 AI 리스크 프로파일 | 환각, 개인정보, 데이터 출처, 편향, 정보보안, 지식재산권, 투명성 등을 별도 점검 |
| EU | EU AI Act | 위험도 기반 분류: 금지, 고위험, 제한적 위험, 최소 위험 |
| EU HLEG | Trustworthy AI 7대 요구사항 | 인간 감독, 안전성, 개인정보, 투명성, 공정성, 사회·환경 영향, 책임성 |
| OECD | AI Principles | 인권과 민주적 가치, 투명성, 견고성·보안·안전, 책임성 |
| UNESCO | AI Ethics Recommendation | 194개 회원국에 적용되는 글로벌 AI 윤리 권고, 정책 실행 영역까지 제시 |
| UK NCSC·CISA 등 | Secure AI System Development | AI 시스템도 보안 제품처럼 설계·개발·배포·운영 전 단계에서 보안 내재화 |
| Council of Europe | AI Framework Convention | AI와 인권, 민주주의, 법치주의를 연결한 국제 법적 프레임워크 |
| Singapore IMDA | GenAI·Agentic AI Governance Framework | 생성형 AI와 에이전트형 AI의 책임, 평가, 거버넌스 구조 정리 |

**NIST AI RMF를 프로젝트에 적용하는 방식**

| 단계 | 해야 할 일 |
| --- | --- |
| Govern | AI 사용 정책, 책임자, 승인 기준, 기록 방식을 정합니다. |
| Map | 어떤 사용자, 데이터, 기능, 위험이 있는지 맥락을 파악합니다. |
| Measure | 정확도, 편향, 개인정보 노출, 보안 취약점, 환각을 측정합니다. |
| Manage | 위험을 줄이는 조치, 모니터링, 사고 대응, 재평가 주기를 운영합니다. |

**생성형 AI에서 별도로 점검할 리스크**

- **Confabulation / Hallucination**: 그럴듯하지만 틀린 답변이 나오는지 확인합니다.
- **Data Privacy**: 프롬프트, 파일, 로그, RAG 문서에 개인정보나 민감정보가 들어가는지 점검합니다.
- **Data Provenance**: 데이터 출처와 사용 권한을 추적합니다.
- **Harmful Bias**: 특정 집단에 불리한 결과가 반복되는지 테스트합니다.
- **Information Integrity**: 잘못된 정보, 조작된 문서, 악성 프롬프트가 답변에 영향을 주지 않도록 합니다.
- **Information Security**: 프롬프트 인젝션, 데이터 유출, 과도한 권한, 시스템 프롬프트 노출을 막습니다.
- **Intellectual Property**: 학습·참조·생성 과정에서 저작권과 라이선스를 확인합니다.
- **Transparency & Documentation**: 모델, 프롬프트, 데이터, 제한사항, 변경 이력을 문서화합니다.

**근거 레퍼런스**

- [NIST - AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework): AI가 개인·조직·사회에 미치는 위험을 관리하기 위한 프레임워크입니다.
- [NIST - AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/): AI RMF의 핵심 기능을 Govern, Map, Measure, Manage로 정리합니다.
- [NIST - Generative AI Profile](https://www.nist.gov/itl/ai-risk-management-framework): NIST AI 600-1 생성형 AI 프로파일이 2024년 7월 공개되었음을 안내합니다.
- [European Commission - EU AI Act](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): EU AI Act의 위험 기반 규제 체계를 설명합니다.
- [European Commission - Ethics Guidelines for Trustworthy AI](https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai): 신뢰할 수 있는 AI의 7대 요구사항을 제시합니다.
- [OECD - AI Principles](https://www.oecd.org/en/topics/ai-principles.html): 인권, 민주적 가치, 투명성, 견고성, 보안, 안전, 책임성을 중심으로 AI 원칙을 정리합니다.
- [UNESCO - Recommendation on the Ethics of AI](https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligence?hub=343): 194개 회원국에 적용되는 AI 윤리 권고와 정책 실행 영역을 설명합니다.
- [UK NCSC - Guidelines for secure AI system development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development): AI 시스템을 secure by default 관점에서 설계·개발·배포·운영하라고 안내합니다.
- [CISA - Artificial Intelligence](https://www.cisa.gov/ai): CISA와 NSA, FBI, 국제 파트너의 AI 보안 가이드를 모아 제공합니다.
- [Council of Europe - Framework Convention on AI](https://www.coe.int/en/web/artificial-intelligence/the-framework-convention-on-artificial-intelligence): AI와 인권, 민주주의, 법치주의에 관한 최초의 국제 법적 구속력 있는 조약이라고 설명합니다.
- [Singapore IMDA - Model AI Governance Framework for Agentic AI](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai): 에이전트형 AI 거버넌스 프레임워크를 소개합니다.

### 5.3 개인 프로젝트에 바로 적용할 체크리스트

AI 기능을 포트폴리오나 사이드 프로젝트에 넣을 때는 아래 순서로 정리하면 됩니다.

1. **AI 사용 목적 정의**: 이 AI 기능이 사용자에게 어떤 도움을 주는지 한 문장으로 씁니다.
2. **위험 분류**: 의료, 금융, 채용, 교육, 공공안전처럼 사람의 권리·기회에 영향을 주는 영역인지 확인합니다.
3. **데이터 점검**: 개인정보, 민감정보, 회사 내부자료, 저작권 있는 자료가 들어가는지 확인합니다.
4. **사용자 고지**: AI가 답변을 생성한다는 사실과 한계를 화면에 명시합니다.
5. **근거 연결**: 중요한 답변은 출처 문서, 검색 결과, 참조 파일을 함께 보여줍니다.
6. **사람 검토**: 외부 발송, 삭제, 결제, 평가, 채용, 법률·의료 판단은 자동 실행하지 않습니다.
7. **로그와 재현성**: 모델, 프롬프트 버전, 참조 문서, 응답 시간을 기록합니다.
8. **보안 테스트**: 프롬프트 인젝션, 민감정보 노출, 권한 우회, 과도한 도구 호출을 테스트합니다.
9. **삭제와 수정**: 사용자가 입력한 데이터 삭제·수정 요청을 처리할 수 있게 합니다.
10. **정기 재검토**: 법, 모델, 회사 정책, 데이터가 바뀌면 체크리스트를 업데이트합니다.

**근거 레퍼런스**

- [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework): AI 리스크를 식별, 측정, 관리, 거버넌스화하는 구조를 제공합니다.
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications): 프롬프트 인젝션, 민감정보 노출, 공급망, 데이터·모델 오염, 과도한 권한 같은 LLM 앱 보안 위험을 정리합니다.
- [MITRE ATLAS](https://atlas.mitre.org/): AI 시스템을 대상으로 한 공격 전술과 기법을 정리한 지식 기반입니다.
- [개인정보보호위원회 - 공공기관 AI 활용 개인정보 영향평가 기준](https://www.pipc.go.kr/np/cop/bbs/selectBoardArticle.do?bbsId=BS074&mCode=&nttId=11475): 공공기관 AI 도입·활용 시 개인정보 리스크 식별과 경감 기준을 설명합니다.

---

## Part 6. AI 회사별 사용 가이드

AI 회사들이 공통적으로 말하는 사용법은 비슷합니다. **명확한 목표를 주고, 필요한 맥락을 넣고, 원하는 형식을 지정하고, 결과를 검증하라**는 것입니다. 차이는 도구별로 잘 먹히는 구조가 다르다는 점입니다.

### 6.1 OpenAI / ChatGPT

OpenAI 자료에서 반복되는 핵심은 **명확한 지시, 참고 텍스트 제공, 복잡한 작업 분해, 검증 가능한 출력, 체계적 평가**입니다.

| 원칙 | 사용 방식 |
| --- | --- |
| 명확하고 구체적으로 쓰기 | "분석해줘"보다 "리스크 5개를 표로 정리하고 대응안을 한 줄씩 써줘"처럼 요청합니다. |
| 참고 자료를 같이 주기 | 문서, 표, 코드, 정책을 함께 넣고 "이 자료 기준으로만 답하라"고 제한합니다. |
| 복잡한 작업은 나누기 | 초안 작성 → 누락 점검 → 수정 반영 → 최종 요약처럼 단계화합니다. |
| 모델에게 검토 시간을 주기 | 바로 결론을 요구하기보다 판단 기준과 점검 순서를 먼저 줍니다. |
| 외부 도구와 결합하기 | 계산, 검색, 코드 실행, 파일 분석처럼 모델 혼자 하기 어려운 일은 도구로 분리합니다. |
| 평가 세트 만들기 | 자주 쓰는 프롬프트는 예시 입력과 기대 출력으로 테스트합니다. |

**ChatGPT에 바로 쓰기 좋은 프롬프트 구조**

```markdown
역할: 너는 [역할]이다.
목표: [해야 할 일]을 수행한다.
맥락: 아래 자료는 [상황]을 위한 것이다.
제약: 문서에 없는 내용은 추측하지 않는다.
출력: [표/불릿/JSON/보고서] 형식으로 작성한다.
검증: 마지막에 불확실한 부분과 추가 확인이 필요한 부분을 따로 적는다.
```

**근거 레퍼런스**

- [OpenAI - Prompt engineering best practices for ChatGPT](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices): ChatGPT에 명확하고 구체적인 지시를 제공하고, 반복적으로 다듬는 방식을 권장합니다.
- [OpenAI Platform - Prompt engineering](https://platform.openai.com/docs/guides/prompt-engineering): OpenAI API에서 요구사항을 만족하는 출력을 얻기 위한 명확한 지시 작성 전략을 설명합니다.
- [OpenAI - API data controls](https://platform.openai.com/docs/guides/your-data): API 입력과 출력은 기본적으로 모델 학습에 사용되지 않으며, 명시적으로 opt-in한 경우만 예외라고 설명합니다.
- [OpenAI - Enterprise privacy](https://openai.com/policies/api-data-usage-policies/): ChatGPT Business, Enterprise, Edu, Healthcare, Teachers 및 API의 비즈니스 데이터 통제와 보안 원칙을 설명합니다.
- [OpenAI - Usage policies](https://openai.com/policies/usage-policies/): OpenAI 서비스를 사용할 때 지켜야 할 안전·정책 기준을 정리합니다.

### 6.2 Anthropic / Claude

Anthropic 자료에서 반복되는 핵심은 **명확하고 직접적인 지시, 예시 제공, XML 태그로 구조화, 역할 지정, 사고 공간 제공, 에이전트 사용 시 정책 준수**입니다.

| 원칙 | 사용 방식 |
| --- | --- |
| 명확하고 직접적으로 지시 | 원하는 결과와 하지 말아야 할 일을 분리해서 씁니다. |
| 예시를 제공 | 원하는 톤, 형식, 판단 기준이 있다면 입력/출력 예시를 넣습니다. |
| XML 태그 사용 | 긴 문서, 기준, 예시, 출력 형식을 `<context>`, `<rules>`, `<examples>`처럼 구분합니다. |
| 역할 지정 | "너는 코드 리뷰어", "너는 QA 엔지니어"처럼 관점을 고정합니다. |
| 복잡한 문제는 thinking 유도 | 결론 전에 검토 기준과 단계적 점검을 요청합니다. |
| 에이전트 권한 제한 | 감시, 무단 데이터 수집, 유해 콘텐츠, 대규모 남용, 무단 시스템 접근에 쓰지 않습니다. |

**Claude에 바로 쓰기 좋은 프롬프트 구조**

```xml
<role>
너는 포트폴리오 웹사이트를 검토하는 시니어 프론트엔드 엔지니어다.
</role>

<task>
아래 변경사항의 사용자 경험 리스크와 구현 리스크를 점검한다.
</task>

<context>
프로젝트 구조, 관련 코드, 디자인 규칙을 여기에 넣는다.
</context>

<constraints>
- 기존 디자인 톤을 유지한다.
- 추측한 내용은 추측이라고 표시한다.
- 수정 제안은 파일 단위로 작성한다.
</constraints>

<output_format>
1. 주요 리스크
2. 수정 제안
3. 추가 확인 사항
</output_format>
```

**근거 레퍼런스**

- [Anthropic - Prompt engineering overview](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview): Claude용 프롬프트 엔지니어링의 기본 원칙과 평가 필요성을 설명합니다.
- [Anthropic - Be clear and direct](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/be-clear-and-direct): Claude에게 명확하고 직접적인 지시를 주는 방법을 설명합니다.
- [Anthropic - Use XML tags](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags): 문맥, 지시, 예시를 XML 태그로 구조화하면 Claude가 프롬프트 구성 요소를 더 잘 구분한다고 설명합니다.
- [Anthropic - Chain of thought prompting](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought): 복잡한 문제에서 단계적 사고 공간을 제공하는 방식을 설명합니다.
- [Claude Help Center - Using agents according to usage policy](https://support.claude.com/en/articles/12005017-using-agents-according-to-our-usage-policy): 에이전트를 감시, 무단 데이터 수집, 유해 콘텐츠, 대규모 남용, 무단 접근에 쓰지 말라고 안내합니다.

### 6.3 Google / Gemini

Google 자료에서 반복되는 핵심은 **자연어로 동료에게 요청하듯 쓰되, 역할·맥락·세부조건을 충분히 제공하고, 결과를 검토한 뒤 refine하는 방식**입니다.

| 원칙 | 사용 방식 |
| --- | --- |
| 자연어로 명확히 요청 | 짧은 키워드보다 동료에게 설명하듯 문장으로 요청합니다. |
| 맥락 제공 | 누가, 어떤 상황에서, 어떤 목적으로 쓸 결과물인지 설명합니다. |
| 역할 지정 | "프로젝트 리드", "고객 미팅 준비자", "강사" 같은 관점을 줍니다. |
| 톤과 길이 지정 | formal, brief, friendly처럼 톤을 명확히 지정합니다. |
| 이미지 생성은 시각 요소 구체화 | subject, setting, distance, materials, background를 넣습니다. |
| 결과 검토 | Gemini 응답은 Google의 공식 견해가 아니며, 부정확하거나 부적절할 수 있음을 전제로 검토합니다. |

**Gemini에 바로 쓰기 좋은 프롬프트 구조**

```markdown
Imagine you are [역할].
Create [결과물] for [사용자/상황].
Include [포함할 내용].
Use a [톤/길이/형식].
Before finalizing, check whether any part is uncertain or needs source verification.
```

**근거 레퍼런스**

- [Google Workspace Learning Center - Start with a great prompt](https://support.google.com/a/users/answer/14590328?hl=en): Gemini에 좋은 프롬프트를 쓰려면 자연어 지시, 구체적인 맥락, 역할, 톤, 검토가 필요하다고 안내합니다.
- [Google Workspace - Gemini prompt guide](https://workspace.google.com/learning/content/gemini-prompt-guide): 업무 전반에서 Gemini를 활용하기 위한 프롬프트 가이드를 제공합니다.
- [Google AI - Gemini image generation](https://ai.google.dev/gemini-api/docs/image-generation): 이미지 생성에서 프롬프트, 참조 이미지, 비율, 크기 등을 조합하는 방식을 설명합니다.
- [Google - Generative AI prohibited use policy](https://policies.google.com/terms/generative-ai/use-policy?hl=en-GB): Google 생성형 AI 서비스에서 금지되는 사용 범주를 안내합니다.

### 6.4 Microsoft Copilot

Microsoft 자료에서 반복되는 핵심은 **Goal, Context, Expectations, Source**입니다. 즉, 무엇을 원하는지, 왜 필요한지, 어떤 기준으로 작성해야 하는지, 어떤 자료를 근거로 삼아야 하는지를 함께 주는 방식입니다.

| 구성요소 | 의미 | 예시 |
| --- | --- | --- |
| Goal | 무엇을 해야 하는가 | "회의록을 요약해줘" |
| Context | 왜 필요한가 | "프로젝트 킥오프 준비용" |
| Expectations | 어떤 톤·형식·길이인가 | "임원 보고용으로 5개 불릿" |
| Source | 어떤 자료를 참고할 것인가 | "지난 2주간 Sam이 보낸 이메일 기준" |

**Copilot에 바로 쓰기 좋은 프롬프트 구조**

```markdown
Goal: [해야 할 일]
Context: [이 결과물이 필요한 상황]
Source: [참고할 문서, 이메일, 회의, 파일]
Expectations: [톤, 형식, 분량, 포함/제외 조건]
```

**근거 레퍼런스**

- [Microsoft Support - Get started writing prompts in Microsoft 365 Copilot](https://support.microsoft.com/en-US/Microsoft-365-Copilot/get-started-writing-prompts-in-microsoft-365-copilot): Copilot 프롬프트는 goal, context, expectations, source 네 요소를 포함할 수 있다고 설명합니다.
- [Microsoft - Responsible AI principles and approach](https://www.microsoft.com/en-us/ai/principles-and-approach): Microsoft의 책임 있는 AI 원칙과 제품 개발 기준을 설명합니다.
- [Microsoft Learn - AI service assurance](https://learn.microsoft.com/en-us/compliance/assurance/assurance-artificial-intelligence): Microsoft의 AI 거버넌스, 책임 있는 AI 원칙, shared responsibility 관점을 설명합니다.

### 6.5 GitHub Copilot

GitHub Copilot은 일반 챗봇보다 **코드 컨텍스트 관리**가 중요합니다. 관련 파일을 열고, 무관한 파일은 닫고, 특정 함수·파일·레포지토리·심볼을 명시해야 더 좋은 답변을 얻을 수 있습니다.

| 원칙 | 사용 방식 |
| --- | --- |
| 복잡한 작업 분해 | 큰 리팩토링을 작은 함수·파일 단위로 나눕니다. |
| 요구사항 구체화 | 사용 언어, 라이브러리, 성능 조건, 테스트 기준을 명시합니다. |
| 관련 코드 지정 | 파일, 함수, 심볼, 선택 영역을 명확히 지정합니다. |
| 예시 제공 | 입력/출력 예시, 실패 케이스, 기존 패턴을 보여줍니다. |
| 결과 검증 | Copilot이 만든 코드를 이해하고, 테스트·lint·보안 스캔으로 확인합니다. |
| 대화 히스토리 관리 | 오래된 맥락이 방해되면 새 대화를 시작합니다. |

**GitHub Copilot에 바로 쓰기 좋은 프롬프트 구조**

```markdown
이 파일의 `createUser` 함수만 대상으로 봐줘.
목표는 중복 검증 로직을 줄이고 테스트하기 쉬운 구조로 바꾸는 거야.
기존 API 응답 형식은 바꾸지 마.
수정 후 필요한 단위 테스트 케이스를 함께 제안해줘.
```

**근거 레퍼런스**

- [GitHub Docs - Best practices for using GitHub Copilot](https://docs.github.com/en/copilot/get-started/best-practices): Copilot의 강점과 한계, 맥락 제공, 결과 검증, 테스트·도구 기반 확인을 권장합니다.
- [GitHub Docs - Prompt engineering for GitHub Copilot Chat](https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot): 구체적 지시, 예시 제공, 복잡한 작업 분해, 관련 코드 표시, 대화 히스토리 관리 방법을 설명합니다.

### 6.6 Cursor / v0 / UI 생성 도구

코딩 에이전트와 UI 생성 도구는 "예쁘게 만들어줘"보다 **제품 표면, 사용 맥락, 제약과 취향**을 명시할수록 결과가 좋아집니다. 특히 UI 작업에서는 대상 사용자, 화면 크기, 데이터 상태, 상호작용, 금지할 디자인 톤을 같이 줘야 합니다.

| 도구 | 잘 먹히는 지시 방식 |
| --- | --- |
| Cursor | 프로젝트 규칙을 `.cursor/rules`처럼 재사용 가능한 문서로 관리하고, 기존 코드 패턴을 맥락으로 줍니다. |
| v0 | product surface, context of use, constraints & taste를 함께 적습니다. |
| UI 이미지/디자인 생성 | 대상, 공간, 구도, 스타일, 색감, 제외 조건, 유지할 요소를 분리해 적습니다. |

**v0에 바로 쓰기 좋은 프롬프트 구조**

```markdown
Build [product surface: components, data, actions].
Used by [who], in [what moment], to [what decision or outcome].

Constraints:
- platform / device
- visual tone
- layout assumptions
- states: loading, empty, error, success
- do not use: [피하고 싶은 디자인]
```

**근거 레퍼런스**

- [Vercel - How to prompt v0](https://vercel.com/blog/how-to-prompt-v0): 좋은 v0 프롬프트는 product surface, context of use, constraints & taste 세 가지 입력을 포함한다고 설명합니다.
- [Cursor Docs - Rules](https://docs.cursor.com/context/rules): Rules는 프롬프트 수준에서 재사용 가능한 지속 컨텍스트를 제공한다고 설명합니다.
- [OpenAI Cookbook - Image generation prompting guide](https://developers.openai.com/cookbook/examples/multimodal/image-gen-1.5-prompting_guide/): 이미지 생성·편집에서 명확한 제약, 유지할 요소, 반복 개선의 중요성을 설명합니다.

### 6.7 회사별 가이드를 하나로 합친 실전 템플릿

여러 회사의 가이드를 합치면, 가장 안정적인 프롬프트는 아래 구조에 가깝습니다.

```markdown
[Goal]
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
불확실한 내용, 추가 확인이 필요한 내용, 테스트 방법을 마지막에 적게 합니다.
```

**실무용 예시**

```markdown
[Goal]
이 포트폴리오 AI Lab 문서에서 법률·개인정보·AI 사용 가이드와 관련된 누락을 찾아 보완해줘.

[Role]
너는 AI 거버넌스와 프론트엔드 포트폴리오 문서화를 함께 이해하는 시니어 리뷰어다.

[Context]
이 문서는 개인 포트폴리오의 RAG 검색 데이터로도 사용된다. 너무 학술적으로 쓰기보다, 실무자가 읽고 바로 적용할 수 있는 체크리스트 형태를 선호한다.

[Source]
공식 정부 자료, 공식 회사 문서, 공식 제품 문서를 우선 사용한다.

[Constraints]
- 출처가 불명확한 주장은 넣지 않는다.
- 법률 문구는 단정하지 않고 "확인 필요"를 표시한다.
- 레퍼런스는 문서 맨 아래가 아니라 해당 주장 바로 아래에 둔다.
- 특정 도메인의 내부 사례는 넣지 않는다.

[Output]
1. 추가할 섹션
2. 수정할 문장
3. 근거 레퍼런스
4. 최종 반영 문안

[Verification]
마지막에 아직 확인이 필요한 자료와 날짜 기준을 적어줘.
```

**근거 레퍼런스**

- [OpenAI - Prompt engineering best practices](https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices): 명확한 목표와 구체적 조건을 제공하는 방식을 권장합니다.
- [Anthropic - Use XML tags](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags): 복잡한 프롬프트에서는 역할, 맥락, 예시, 형식을 구조적으로 구분하라고 설명합니다.
- [Microsoft Copilot - Prompt components](https://support.microsoft.com/en-US/Microsoft-365-Copilot/get-started-writing-prompts-in-microsoft-365-copilot): goal, context, expectations, source를 좋은 프롬프트의 핵심 요소로 설명합니다.
- [Google Workspace - Start with a great prompt](https://support.google.com/a/users/answer/14590328?hl=en): 자연어로 맥락과 세부조건을 제공하고 결과를 검토하라고 안내합니다.
