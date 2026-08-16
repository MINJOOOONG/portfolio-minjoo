# MJ.dev — 인터랙티브 포트폴리오 & CMS 플랫폼

> **QA 엔지니어 경험과 백엔드 개발 역량을 갖춘 풀스택 개발자 서민주(Minjoo Suh)의 포트폴리오 웹사이트.**
> 단순 정적 페이지가 아니라, **자체 CMS · 경량 RAG AI 어시스턴트 · 3D 인터랙션 · 보안 인증**을 직접 설계·구현한 풀스택 프로덕트입니다.

🔗 **Live**: [portfolio-minjoo.vercel.app](https://portfolio-minjoo.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/Neon_Postgres-Serverless-336791?logo=postgresql&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=threedotjs&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-RAG_API-009688?logo=fastapi&logoColor=white)

---

## 📌 한눈에 보기 (TL;DR)

| 무엇을 만들었나 | 어떻게 |
| --- | --- |
| **풀스택 포트폴리오 웹앱** | Next.js 16 App Router + React 19 + TypeScript, Vercel 서버리스 배포 |
| **자체 콘텐츠 관리 시스템(CMS)** | 프로젝트·블로그·사이트 설정을 **재배포 없이** 실시간 편집 (DB 기반 CRUD) |
| **문서 근거 기반 RAG 어시스턴트** | **벡터 DB 없이** 순수 Python TF-IDF 검색 + 근거 없으면 LLM 호출 자체를 생략, 45개 평가 케이스로 회귀 검증 |
| **보안 중심 관리자 인증** | DB 세션 토큰 · httpOnly 쿠키 · **timing-safe 비교** · IP Rate Limiting |
| **3D 인터랙티브 경험** | Three.js + React Three Fiber, 프로젝트별 6개 커스텀 3D 씬 |
| **동적 PDF 이력서** | `@react-pdf/renderer`로 클라이언트에서 이력서 생성·다운로드 |

> 단순 토이 프로젝트가 아니라 **프론트엔드·백엔드·DB·LLM 인프라·보안**을 한 사람이 end-to-end로 책임진 프로덕트입니다.

---

## 🏗 아키텍처

이 프로젝트는 **두 개의 독립 배포 단위**로 구성됩니다. 무거운 LLM/검색 로직을 Next.js 서버리스 함수와 분리해, 각자 적합한 인프라에서 독립적으로 스케일·재배포되도록 설계했습니다.

```
┌─────────────────────────────────────┐        ┌──────────────────────────────┐
│   Next.js 16 App (Vercel)           │        │  RAG API (FastAPI / Python)  │
│                                     │        │  Render · Railway · Fly.io   │
│  • 포트폴리오 7개 섹션 (SSR/CSR)     │  POST  │                              │
│  • 관리자 CMS (/admin)              │ /ask   │  • TF-IDF 키워드 인덱스       │
│  • API Routes (admin/contact/rag)   │ ─────▶ │  • 점수 threshold 미만 → 즉시  │
│  • Three.js 3D · GSAP 애니메이션     │        │    no-evidence 응답 (LLM 생략)│
│                                     │ ◀───── │  • 근거 있으면 Groq 비동기 호출│
│         │                           │ answer │    (llama-3.1-8b-instant)     │
│         ▼                           │sources │  data/*.md (포트폴리오 지식)  │
│  Neon Postgres (Prisma 7 ORM)       │        └──────────────────────────────┘
│  Project · BlogPost · Message · …   │
└─────────────────────────────────────┘
```

**설계 의도**
- LLM 추론·검색 인덱스는 콜드스타트가 무겁고 메모리를 많이 쓰므로, Vercel 서버리스가 아닌 **상시 구동 Python 서버**로 분리.
- Next.js 앱은 정적·동적 렌더링과 CMS API에 집중 → 빠른 빌드·배포 사이클 유지.
- 두 서버는 `POST /ask` HTTP 인터페이스로만 통신해 결합도를 낮춤.

---

## 🛠 기술 스택

| 분류 | 기술 | 선택 이유 |
| --- | --- | --- |
| **Framework** | Next.js 16 (App Router, Turbopack) | 서버 컴포넌트 + 서버리스 API를 한 코드베이스에서 |
| **Language** | TypeScript 5 | 도메인 모델·API 타입 안정성 |
| **UI / Styling** | Tailwind CSS v4 + shadcn/ui + Radix(base-ui) | 빠른 디자인 시스템 구축, 접근성 확보 |
| **Database** | Neon Postgres (Serverless) + Prisma 7 ORM | 서버리스 환경에 맞는 커넥션 풀링(`@prisma/adapter-neon`) |
| **3D Graphics** | Three.js + React Three Fiber / Drei | 선언적 3D 씬 관리 |
| **Animation** | Framer Motion + GSAP(ScrollTrigger) | 컴포넌트 전환 + 스크롤 기반 연출 분리 |
| **Smooth Scroll** | Lenis | 관성 스크롤 + 패럴랙스 동기화 |
| **PDF** | `@react-pdf/renderer`, `react-pdf` | 클라이언트 동적 이력서 생성 / 논문 PDF 뷰어 |
| **Markdown** | react-markdown + remark-gfm + rehype-highlight | 블로그·문서 렌더링, 코드 하이라이트 |
| **AI Backend** | FastAPI + httpx(AsyncClient) + Groq API | 경량 RAG 서버, 비동기 LLM 호출 |
| **AI 품질 검증** | pytest + 자체 평가 데이터셋 + GitHub Actions | 검색 품질·no-evidence 동작 회귀 감지 |
| **Auth/Security** | Node `crypto` (timingSafeEqual), httpOnly cookie | 세션 토큰 기반 인증 |
| **Deployment** | Vercel (앱) + Render/Railway (RAG API) | 각 워크로드에 최적화된 분리 배포 |

---

## ✨ 주요 기능 (구현 디테일 포함)

### 1. 자체 콘텐츠 관리 시스템(CMS) — 재배포 없는 콘텐츠 운영
- `/admin` 대시보드에서 **프로젝트 · 블로그 · 연락 메시지 · 사이트 설정**을 CRUD.
- 모든 콘텐츠를 코드가 아닌 **Postgres에 저장** → 글을 고치거나 프로젝트를 추가해도 **빌드/배포가 필요 없음.**
- API Route(`/api/admin/*`)는 모두 서버에서 세션을 검증한 뒤에만 동작.

### 2. 문서 근거 기반 RAG 어시스턴트 (`rag-assistant/`)

포트폴리오 문서를 근거로 질문에 답하는 FastAPI 서비스입니다. 아래 12개 항목은 모두 저장소의 실제 코드·테스트·평가 결과와 대응합니다.

#### 2.1 문제 정의

포트폴리오 챗봇에서 가장 위험한 실패는 "답을 못 하는 것"이 아니라 **문서에 없는 경력을 그럴듯하게 지어내는 것**입니다. 채용 담당자가 보는 서비스이므로, 잘못된 답변 하나가 이력서 전체의 신뢰를 떨어뜨립니다.

초기 구현에는 이 실패를 유발하는 구조가 있었습니다.

- `rag/embedder.py` 의 `search()` 가 검색 점수가 0이어도 `self.chunks[:top_k]`, 즉 **코퍼스 앞부분을 그대로 반환**했습니다. "서민주의 블록체인 경험을 알려줘" 같은 질문에도 무관한 문서가 context 로 들어갔습니다.
- 시스템 프롬프트에 *"문서에 관련 내용이 일부라도 있으면 (…) 너무 엄격하게 모르겠다고 하지 마세요"* 라는 규칙이 있어, 근거가 약할 때 추측을 유도했습니다.

그래서 이번 작업의 목표는 답변 품질을 "좋아 보이게" 만드는 것이 아니라, **근거가 없을 때 없다고 말하는 동작을 코드로 강제하고 평가로 검증하는 것**이었습니다.

#### 2.2 시스템 아키텍처

```
POST /ask  { question }
     │
     ▼
┌──────────────────────────────────────────────────────────────┐
│ FastAPI (api.py)                                             │
│  lifespan: 문서 로드 → 청킹 → TF-IDF 인덱스 + AsyncClient 생성  │
└──────────────────────────────────────────────────────────────┘
     │
     ▼
 rag/retriever.py — 검색 (점수 포함)
     │
     ├── 최고 점수 < threshold  ──▶  LLM 호출 없음
     │                               answer = no-evidence 문구 (질문 언어에 맞춤)
     │                               sources = []
     │
     └── threshold 이상 ──▶ rag/retriever.py: format_context (최대 6,000자)
                             │
                             ▼
                         rag/chain.py — httpx.AsyncClient 로 Groq 호출
                             │  실패 시 LLMError 로 정규화 → 사용자에겐 고정 문구
                             ▼
                         { answer, sources }
     │
     ▼
 rag/observability.py — 구조화 JSON 로그 1줄 + 인메모리 카운터
```

모듈 구성:

| 파일 | 역할 |
| --- | --- |
| `api.py` | `/ask` · `/health` · `/metrics`, lifespan, 구조화 로그 |
| `rag/config.py` | 환경변수 기반 설정 (`RagSettings`) |
| `rag/loader.py` | `data/*.md` 로드 |
| `rag/chunker.py` | 마크다운 인지 청킹 + overlap |
| `rag/embedder.py` | TF-IDF 인덱스, 질의 정규화, 점수 계산 |
| `rag/retriever.py` | threshold 적용 검색, context 구성, source 목록 |
| `rag/chain.py` | 프롬프트, 비동기 Groq 호출, 오류 정규화 |
| `rag/observability.py` | JSON 로그, 카운터/지연시간 집계 |
| `evaluation/` | 평가 데이터셋과 평가기 |

#### 2.3 Retrieval 방식과 선택 이유

벡터 DB 대신 **순수 Python TF-IDF 인덱스**를 직접 구현했습니다. 문서 9개 · 청크 88개 규모에서는 임베딩 모델의 메모리(Render 무료 티어 512MB)가 정확도 이득보다 큰 비용이었고, 외부 임베딩 API 의존성도 없애고 싶었기 때문입니다.

점수는 **IDF² 가중 질의 커버리지**입니다.

```
score = Σ(질의 토큰 weight × 매칭 강도) / Σ(질의 토큰 weight)      → 0.0 ~ 1.0
```

- `weight` = 해당 토큰 IDF의 **제곱**. 코퍼스에 아예 없는 토큰은 IDF 상한값을 받습니다. 제곱을 쓰는 이유는, 선형 IDF에서는 "서민주의 **블록체인** 프로젝트 경험"처럼 흔한 토큰 여러 개가 미등장 핵심 토큰 하나를 덮어 근거 없는 질문이 통과했기 때문입니다.
- `매칭 강도` = 정확 일치 1.0 → 어간 일치 0.7 → 부분 문자열 0.5 / 0.3.
- 점수가 [0, 1]로 정규화되므로 문서 길이·질문 길이와 무관하게 **단일 threshold** 로 근거 유무를 판정할 수 있습니다.

한국어는 형태소 분석기 없이 다룹니다.

- **조사·어미 사전 기반 stemming** (`_KOREAN_SUFFIXES`): "구현했나요" → "구현", "프로젝트에서는" → "프로젝트". 최대 2회 연쇄로 분리합니다.
- **질의 정규화** (`canonical_term`): 활용형과 어간 후보 중 document frequency 가 가장 높은 표면형을 고릅니다. "토스에서"는 한 청크에만 통째로 등장해 IDF가 비정상적으로 높았고 다른 청크의 "토스"와 매칭되지 않았는데, 정규화로 해결했습니다.
- 초기 구현은 "한글 토큰의 모든 2자 이상 접두어"를 어간 후보로 삼았지만, 그러면 코퍼스에 없는 **"블록체인"이 "블록"(코드 블록)에 매칭**되어 오탐이 났습니다. 접미사 사전으로 제한해 이 오탐을 없앴습니다 (`tests/test_retrieval.py::test_unrelated_compound_is_not_stemmed_into_corpus_word`).

#### 2.4 실제 chunking 설정

`chunk_size=800`, `chunk_overlap=150` (`rag/config.py`). 이전 구현은 `chunk_overlap` 인자를 받기만 하고 **분할 로직에서 전혀 쓰지 않았습니다.** 지금은 실제로 적용됩니다.

1. 마크다운 헤더(`#`~`######`) 경계에서 먼저 자릅니다. 구분자를 소비하지 않으므로 헤더 텍스트가 유실되지 않습니다. (이전 `text.split("\n## ")` 구현은 `## ` 접두어를 잘라먹었습니다.)
2. 헤더 블록이 여전히 크면 빈 줄 → 줄바꿈 → 공백 순으로 더 나눕니다.
3. 조각들을 `chunk_size` 한도까지 다시 이어 붙입니다.
4. 인접 청크 앞에 직전 청크의 꼬리 `chunk_overlap` 글자를 단어 경계에 맞춰 붙입니다.

따라서 청크 본문은 800자 이하, overlap 포함 전체 길이는 최대 950자입니다. `chunk_overlap`이 음수이거나 `chunk_size` 이상이면 `ValueError` 로 거부합니다.

#### 2.5 no-evidence 처리 방식

검색 최고 점수가 threshold(`RAG_SCORE_THRESHOLD`, 기본 `0.40`) 미만이면:

- **LLM을 호출하지 않습니다.** (근거 없는 context 로 생성 자체를 시작하지 않음)
- `sources = []` 를 반환합니다.
- 질문 언어에 맞춰 안내합니다.
  - 한국어: `현재 포트폴리오 문서에서는 이 질문에 답할 근거를 찾지 못했습니다.`
  - 영어: `I could not find enough evidence in the portfolio documents to answer this question.`

응답 스키마(`{answer, sources}`)는 그대로라 기존 Next.js 프론트엔드가 그대로 동작합니다.

threshold 는 임의로 정한 값이 아니라 아래 평가 세트 위에서 스윕해 고른 값입니다. 실제 곡선(45개 케이스 기준):

| threshold | answerable source hit | no-evidence routing |
| --- | --- | --- |
| 0.30 | 89.3% | 69.2% |
| 0.35 | 89.3% | 76.9% |
| **0.40** | **82.1%** | **84.6%** |
| 0.43 | 75.0% | 100.0% |
| 0.50 | 67.9% | 100.0% |

두 기준(각 80%)을 동시에 만족하는 구간은 `0.40 ~ 0.41` 뿐이라, 반올림한 값 `0.40` 을 채택했습니다.

#### 2.6 async LLM API 호출 구조

이전에는 `async def` 엔드포인트 안에서 **동기** `httpx.post()` 를 호출해 이벤트 루프를 막았습니다. 지금은:

- `generate_answer()` 가 `async` 이고 `httpx.AsyncClient` 를 사용합니다.
- FastAPI lifespan 에서 `AsyncClient` **하나를 생성해 재사용**하고 종료 시 `aclose()` 합니다.
- connect / read / write / pool 타임아웃을 각각 명시합니다 (기본 5 / 30 / 10 / 5초, 환경변수로 조절).
- 타임아웃, 네트워크 오류, 4xx/5xx, JSON 파싱 실패, 응답 스키마 불일치를 모두 `LLMError(error_type, detail)` 로 정규화합니다.
- **외부 API 오류 원문과 API key 는 사용자 응답에 나가지 않습니다.** HTTP 오류는 `detail="status=401"` 처럼 상태 코드만 기록하고, 사용자에게는 고정 문구를 반환합니다. (`tests/test_chain.py::test_upstream_error_body_is_not_leaked`)

#### 2.7 평가 데이터셋 구성

`evaluation/cases.json` — **45개 케이스**. 모든 답변 가능 케이스는 `rag-assistant/data/*.md` 의 실제 내용에 근거하며, `expected_keywords` 가 해당 문서에 실제로 존재하는지 테스트로 검증합니다 (`test_expected_keywords_appear_in_their_source_documents`).

| 카테고리 | 개수 | 설명 |
| --- | --- | --- |
| `answerable` | 14 | 문서에 답이 명확히 있는 질문 |
| `unanswerable` | 8 | 문서에 전혀 없는 정보 |
| `korean_paraphrase` | 7 | 조사·표현이 달라진 한국어 질문 |
| `english` | 5 | 영어 질문 (답변 가능 4 + 불가능 1) |
| `false_premise` | 4 | 잘못된 전제를 포함한 질문 |
| `cross_project_confusion` | 4 | 서로 다른 프로젝트를 섞은 질문 |
| `partial_evidence` | 3 | 주제는 있으나 물어본 수치가 없는 질문 |

각 케이스에는 `retrieval_expectation` 이 있습니다.

- `evidence` — 검색이 `expected_sources` 중 하나를 반환해야 함
- `empty` — 검색이 빈 결과를 반환해야 함
- `unconstrained` — **검색 단계에서 판정하지 않음**

`cross_project_confusion` 4건이 `unconstrained` 입니다. "QA Minjoo Helper에서 Kafka를 어떻게 활용했나요?" 같은 질문은 어휘 검색이 두 프로젝트의 근거를 각각 정당하게 찾아오므로, **검색 단계에서 막을 수 없습니다.** 이 방어는 프롬프트 규칙(서로 다른 프로젝트의 사실을 섞지 말 것)이 담당하고 LLM 평가기가 확인합니다. 검색 지표를 좋아 보이게 하려고 뺀 것이 아니라 무엇이 무엇을 막는지 구분한 것이며, 이 4건이 검색에서 근거를 반환했다는 사실도 리포트에 그대로 기록됩니다.

#### 2.8 측정 지표

`evaluation/run_retrieval_eval.py` (**Groq API key 불필요**)

- answerable source hit rate — 검색 결과가 기대 문서를 포함한 비율
- no-evidence routing accuracy — 근거 없는 질문에서 빈 결과를 반환한 비율
- false-premise routing accuracy
- 카테고리별 성공률, 전체/판정 대상 케이스 수, 실패 케이스 목록
- 검색 지연시간 p50 / p95

`evaluation/run_llm_eval.py` (`GROQ_API_KEY` 있을 때만, 없으면 **skip + 종료 코드 0**)

- expected keyword 포함 여부, expected source 반환 여부, refusal accuracy
- unsupported claim **후보** 표시, 응답 지연시간, 모델명, prompt version

> LLM 평가기의 모든 지표는 **문자열 휴리스틱**입니다. LLM-as-a-judge 를 쓰지 않으며, `unsupported_claim_candidates` 는 환각 판정이 아니라 사람이 검토할 후보를 좁혀 주는 신호입니다. 회귀 감지용 지표로만 사용하세요.

#### 2.9 실제 실행 결과

아래는 `python -m evaluation.run_retrieval_eval` 을 실제로 실행한 결과입니다 (`prompt_version=grounded-v1`, `score_threshold=0.40`, 문서 9개 → 청크 88개). 전체 리포트는 [`evaluation/results/latest.md`](rag-assistant/evaluation/results/latest.md) 에 커밋되어 있습니다.

| 지표 | 값 | 기준 |
| --- | --- | --- |
| answerable source hit rate | **82.1%** (23/28) | ≥ 80% ✅ |
| no-evidence routing accuracy | **84.6%** (11/13) | ≥ 80% ✅ |
| false-premise routing accuracy | 75.0% (3/4) | — |
| 전체 통과 | 34 / 41 (검색 판정 대상) | — |
| 검색 지연시간 | p50 ≈2.6ms · p95 ≈4.7ms (실행마다 변동) | — |

카테고리별: `answerable` 14/14 (100%), `english` 5/5 (100%), `unanswerable` 7/8 (87.5%), `false_premise` 3/4 (75%), `korean_paraphrase` 5/7 (71.4%), `partial_evidence` 0/3 (0%).

테스트: `pytest` **157개 전부 통과**, 외부 API 호출 0건 (`respx` 로 Groq 호출을 가로챕니다).

#### 2.10 테스트 및 평가 실행 방법

```bash
cd rag-assistant
python -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt

pytest                                    # 157 tests, 외부 API 호출 없음
python -m evaluation.run_retrieval_eval   # 기준 미달 시 종료 코드 1

# 선택: 실제 Groq 호출 (키 없으면 skip)
export GROQ_API_KEY=...
python -m evaluation.run_llm_eval
```

평가 결과 파일은 두 종류로 나뉩니다.

- `evaluation/results/latest.json` · `latest.md` — **커밋 대상.** 결정론적인 값(지표·실패 목록·설정·데이터셋 체크섬)만 담아, 검색 동작이 변하지 않으면 재실행해도 git diff 가 생기지 않습니다.
- `evaluation/results/last_run.json` — 실행 시각과 지연시간. `.gitignore` 대상.

#### 2.11 GitHub Actions

- [`.github/workflows/rag-quality.yml`](.github/workflows/rag-quality.yml) — PR 과 `main` push 에서 `pytest` + 검색 평가를 실행합니다. **Groq API key 없이 동작**하며, 테스트 실패나 평가 기준 미달이면 워크플로가 실패합니다. pip 캐시를 쓰고 `rag-assistant/` 변경 시에만 돌아가며, Node 빌드는 하지 않습니다. 커밋된 평가 결과가 코드와 어긋나면 그것도 실패로 잡습니다.
- [`.github/workflows/rag-llm-eval.yml`](.github/workflows/rag-llm-eval.yml) — 실제 Groq 를 호출하는 end-to-end 평가. `workflow_dispatch` 로만 수동 실행되고, `GROQ_API_KEY` secret 이 없으면 건너뜁니다.

#### 2.12 알려진 한계와 향후 개선점

평가에서 **실제로 실패한 7건**과 그 원인입니다. 숨기지 않고 기록합니다.

| 케이스 | 증상 | 원인 |
| --- | --- | --- |
| `ko-paraphrase-007` | "리원소프트 인턴…" 검색 실패 | 문서에는 `Riwonsoft` 로 적혀 있음. **한글 음차 ↔ 라틴 표기**를 어휘 검색이 잇지 못함 |
| `ko-paraphrase-001` | "민주가 토스에서 맡았던 일…" 검색 실패 | "맡았던" 같은 구어체 활용형이 접미사 사전에 없어 미등장 토큰으로 처리됨 |
| `ko-unanswerable-001` | "블록체인 경험" 에 `about.md` 반환 | 미등장 고유명사 1개 + 매칭되는 일반 토큰 여러 개 → 커버리지가 threshold 를 넘음 |
| `ko-falsepremise-001` | "네이버에서 백엔드 개발자로…" 에 `resume.md` 반환 | 위와 동일한 패턴 (`네이버`만 미등장, 나머지는 매칭) |
| `ko-partial-001/002/003` | 부분 근거 질문 3건 모두 빈 결과 | 질문에 없는 수치 토큰(`초당`, `처리량`, `밀리초`)이 커버리지를 떨어뜨림. 안전한 쪽으로 실패하지만, 이상적으로는 관련 문서를 찾고 LLM이 "수치는 문서에 없다"고 답해야 함 |

구조적 한계:

- **어휘 검색의 한계.** 동의어·음차·교차 언어(영어 질문 ↔ 한국어 문서) 매칭이 안 됩니다. 임베딩 기반 하이브리드 검색이 정공법이지만 메모리 예산과 상충합니다.
- **정밀도와 재현율의 교환.** threshold 를 올리면 근거 없는 질문을 더 잘 막는 대신 답변 가능한 질문을 놓칩니다. 두 기준을 동시에 만족하는 구간이 좁습니다(0.40~0.41).
- **프로젝트 혼동 방어는 검색이 아니라 프롬프트에 의존합니다.** 코드로 강제되지 않으므로 모델 교체 시 재검증이 필요합니다.
- **LLM 평가는 휴리스틱입니다.** 근거 없는 주장을 자동으로 판정하지 못하고 후보만 표시합니다.
- `/metrics` 는 프로세스 인메모리 카운터를 JSON 으로 노출하는 최소 구현이며 **Prometheus 가 아닙니다.** 재시작하면 초기화되고 인스턴스 간 집계도 되지 않습니다.

다음 단계 후보: 음차 사전 추가, 임베딩 기반 재순위(re-ranking) 실험, 부분 근거 질문을 위한 2단계 검색(주제 검색 → 수치 확인), 평가 케이스 확대.

### 3. 보안 중심 관리자 인증
- **DB 세션 토큰**: 로그인 시 `crypto.randomBytes(32)`로 토큰 발급, `AdminSession` 테이블에 저장, **24시간 만료** + 만료 세션 자동 정리.
- **httpOnly 쿠키**로 토큰 관리 → JS 접근 차단으로 XSS 토큰 탈취 방지.
- **Timing-safe 비밀번호 비교**(`crypto.timingSafeEqual`)로 타이밍 공격 차단.
- **미들웨어 레벨 보호**: `middleware.ts`에서 `/admin/*` 경로를 가로채 미인증 시 로그인 페이지로 리다이렉트.
- 비밀번호는 전부 환경변수로만 관리 (하드코딩 0).

### 4. 연락 폼 — In-memory IP Rate Limiting
- `POST /api/contact`에 **IP 기준 분당 3회** 제한을 직접 구현해 스팸/어뷰징 방어.
- 만료 엔트리는 주기적으로 정리해 메모리 누수 방지.

### 5. 3D 인터랙티브 경험
- Three.js + R3F로 와이어프레임 오브젝트·파티클·마우스 인터랙션·스크롤 패럴랙스 배경 구현.
- 프로젝트마다 성격에 맞는 **6개 커스텀 3D 씬**(geometric / console / state-machine / document / flow / track)을 분리 설계.

### 6. 동적 PDF 이력서 & 논문 뷰어
- `@react-pdf/renderer`로 이력서를 **런타임에 생성·다운로드**.
- `react-pdf`로 졸업 논문(FSM vs Behavior Tree) 등 연구 PDF를 사이트 내에서 뷰잉.

### 7. KR/EN 다국어
- React Context 기반 언어 전환, 120+ 번역 문자열 관리.

---

## 🗄 데이터 모델 (Prisma · Postgres)

5개 도메인 모델로 구성:

| 모델 | 역할 |
| --- | --- |
| `Project` | 프로젝트(제목·요약·설명·tech stack 배열·featured·정렬·게시 여부) |
| `BlogPost` | 마크다운 블로그 글(태그 배열·게시 여부) |
| `ContactMessage` | 연락 폼 수신 메시지(읽음 처리) |
| `SiteSetting` | 사이트 전역 설정 key-value |
| `AdminSession` | 관리자 세션 토큰 · 만료 시각 |

> `tech_stack`, `tags`는 Postgres 배열 타입을 활용, 모든 모델은 `@@map`으로 snake_case 테이블명에 매핑.

---

## 📂 프로젝트 구조

```
src/
├── app/
│   ├── (public)/              # 공개 페이지 (포트폴리오 · 블로그 · 어시스턴트)
│   ├── admin/                 # 관리자 대시보드 (프로젝트 · 포스트 · 메시지 · 설정)
│   └── api/                   # API Routes (admin · contact · portfolio-assistant)
├── components/
│   ├── sections/              # 포트폴리오 섹션 (about · experience · projects · ai-lab · …)
│   ├── shared/                # 레이아웃 · 네비 · 3D 배경 · PDF 뷰어 · ID 뱃지
│   ├── three/                 # Three.js 씬 (tech-globe · project-scenes ×6)
│   ├── admin/                 # 관리자 UI (CRUD 매니저)
│   └── ui/                    # shadcn/ui 기본 컴포넌트
├── hooks/                     # scroll-reveal · stagger-reveal · parallax · active-section
├── lib/                       # prisma · auth · i18n · pdf · settings
├── data/                      # 정적 데이터 (about · profile · ai-lab)
├── middleware.ts              # /admin 경로 인증 가드
└── generated/prisma/          # Prisma 생성 클라이언트
prisma/
├── schema.prisma              # DB 스키마 (5 모델)
└── seed.ts                    # 초기 데이터 시드
rag-assistant/                 # FastAPI RAG 서버 (Python)
├── api.py                     # POST /ask · GET /health · GET /metrics
├── rag/                       # config · loader · chunker · embedder(TF-IDF)
│                              # retriever · chain(Groq) · language · observability
├── data/                      # 포트폴리오 지식 문서 (*.md)
├── evaluation/                # 평가 데이터셋(cases.json) · 평가기 · results/
└── tests/                     # pytest (chunking · retrieval · prompt · API)
docs/                          # 디자인 시스템 · 섹션 스펙 · AI 가이드 문서
```

---

## 🚀 로컬 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
```bash
cp .env.example .env
```
```env
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
ADMIN_PASSWORD=<관리자-비밀번호>
RAG_API_URL=https://your-deployed-rag-api.com
```

### 3. DB 마이그레이션 & 시드
```bash
npm run db:push     # 스키마를 Neon Postgres에 반영
npm run db:seed     # 초기 데이터 시드
```

### 4. 개발 서버 실행
```bash
npm run dev         # http://localhost:3000
```

### 5. (선택) RAG 서버 로컬 실행
```bash
cd rag-assistant
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env       # GROQ_API_KEY 입력 (답변 생성에만 필요)
uvicorn api:app --reload   # http://localhost:8000
```

검색·평가는 API key 없이도 실행됩니다.

```bash
pip install -r requirements-dev.txt
pytest
python -m evaluation.run_retrieval_eval
```

---

## ☁️ 배포

### Next.js 앱 (Vercel)
1. GitHub에 push → Vercel에서 프로젝트 import
2. 환경변수(`DATABASE_URL` · `ADMIN_PASSWORD` · `RAG_API_URL`) 설정 후 배포

### RAG API (Render / Railway / Fly.io)
1. `rag-assistant/`를 별도 배포 (Dockerfile · render.yaml 포함)
2. 환경변수 `GROQ_API_KEY`, `GROQ_MODEL=llama-3.1-8b-instant` 설정
3. 배포된 주소를 Vercel의 `RAG_API_URL`에 등록

---

## 🎨 디자인 시스템

- **테마**: Clean Document — 에디토리얼·미니멀·라이트 모드 전용
- **배경**: 노트 느낌의 미세 그리드 패턴 (20px × 28px)
- **폰트**: Pretendard Variable(한국어 최적화) + Geist Mono
- **컬러**: 그레이 베이스(`#37352F` / `#F7F6F3` / `#FFFFFF`) + `#6C5CE7` 퍼플 액센트

---

## 💡 엔지니어링 의사결정 회고

이 프로젝트에서 의식적으로 내린 선택들:

1. **RAG에서 벡터 DB를 쓰지 않았다.** 작은 지식 베이스에는 TF-IDF 키워드 검색으로 충분했고, 무료 티어 운영·낮은 콜드스타트가 더 중요했다. → *문제 규모에 맞는 도구 선택.* 다만 이 선택의 대가(음차·교차 언어 매칭 실패)는 평가로 측정해 README에 기록했다.
2. **LangChain을 걷어냈다.** 추상화가 주는 편의보다 메모리·복잡도 비용이 컸다. 직접 `httpx`로 LLM을 호출해 흐름을 투명하게 만들었다. → *불필요한 의존성 제거.*
3. **LLM 서버를 Vercel에서 분리했다.** 서버리스에 안 맞는 워크로드를 상시 구동 서버로 빼서 배포·스케일을 독립시켰다. → *워크로드 특성에 따른 인프라 분리.*
4. **CMS를 직접 만들었다.** 콘텐츠를 코드에서 빼내 DB로 옮겨, 글 한 줄 고치는 데 재배포가 필요 없게 했다. → *운영 효율을 코드 구조로 해결.*
5. **RAG 신뢰성을 '느낌'이 아니라 숫자로 관리했다.** 근거 없는 질문에 코퍼스 앞부분을 반환하던 fallback 을 제거하고, 45개 평가 케이스로 검색 품질과 no-evidence 라우팅을 측정해 CI에서 회귀를 잡도록 했다. threshold 도 임의로 정하지 않고 스윕해서 골랐고, 통과하지 못한 7건은 원인과 함께 그대로 공개한다. → *QA 관점을 AI 서비스에 적용.*
6. **인증을 처음부터 보안 관점으로 설계했다.** timing-safe 비교·httpOnly 쿠키·DB 세션·미들웨어 가드까지, QA 경험에서 체화한 "공격 표면" 관점을 코드에 반영했다.
