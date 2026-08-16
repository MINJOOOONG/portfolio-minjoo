# GitHub 프로필 README 개선안 (초안)

`MINJOOOONG/MINJOOOONG` 저장소의 `README.md` 에 붙여 넣을 초안입니다.
이 세션에서는 프로필 저장소에 접근/푸시하지 않았으므로 **직접 적용은 하지 않았습니다.**

적용 방법:

```bash
git clone https://github.com/MINJOOOONG/MINJOOOONG.git
cd MINJOOOONG
# 아래 "본문" 을 README.md 에 반영 (기존 Gitanimals / GitHub Stats 블록은
# 삭제하지 말고 Featured Projects 아래로 옮기세요)
git add README.md && git commit -m "docs: lead with engineering identity and featured projects"
git push
```

bio 는 웹 UI(Settings → Public profile) 또는 API 로 수정합니다.

```bash
gh api -X PATCH /user \
  -f bio='AI Agent & Backend Engineer | Building reliable LLM services with a QA mindset'
```

> 현재 bio 의 `Quality Enginner` 오타(→ `Engineer`)도 위 명령으로 함께 정리됩니다.
> `gh auth login` 이 되어 있어야 하며, 토큰에 `user` 스코프가 필요합니다.

---

## 본문

```markdown
### Minjoo Suh (서민주)

**AI Agent & Backend Engineer**
QA experience at Toss · Python · FastAPI · RAG · Evaluation

LLM 서비스를 "동작하는 것"에서 "검증 가능한 것"으로 만드는 데 관심이 있습니다.
QA 엔지니어로 일하며 배운 관점 — 실패를 먼저 정의하고, 재현 가능한 방식으로 측정한다 —
을 AI 서비스에 적용합니다.

---

## Featured Projects

### 1. Portfolio RAG Assistant
포트폴리오 문서를 근거로만 답하는 FastAPI RAG 서비스.

- **FastAPI** — lifespan 에서 인덱스와 `httpx.AsyncClient` 를 준비하는 비동기 구조
- **Custom TF-IDF retrieval** — 벡터 DB 없이 순수 Python 으로 구현, 한국어 조사/어미 처리 포함
- **Grounded response handling** — 검색 점수가 임계값 미만이면 LLM 을 호출하지 않고 근거 없음을 명시
- **Evaluation suite** — 45개 평가 케이스(answerable / unanswerable / false premise / cross-project / 한국어 paraphrase / 영어)로 검색 품질과 no-evidence 라우팅을 측정
- **GitHub Actions** — API key 없이 pytest 157개 + 검색 평가를 PR 마다 실행, 기준 미달 시 실패

→ https://github.com/MINJOOOONG/portfolio-minjoo

### 2. ISTQB Dataset Pipeline
시험 대비 자료를 구조화된 학습 데이터로 바꾸는 파이프라인.

- PDF 4종 → 구조화 레코드 160건 추출
- 채점(scoring), 통계 산출, 데이터 마이그레이션

### 3. E-Commerce Backend
이커머스 도메인의 주문·결제·이벤트 흐름 설계.

- **Spring Boot** 기반 도메인 설계
- **Kafka** 이벤트 아키텍처, **Redis** 대기열·실시간 랭킹
- **Testcontainers** 기반 통합 테스트
- 동시성 제어와 멱등성(Idempotency Key), Outbox 패턴

→ https://github.com/MINJOOOONG

---

## Tech

`Python` `FastAPI` `pytest` · `Java` `Spring Boot` `Kafka` `Redis`
`TypeScript` `Next.js` `React` · `PostgreSQL` `Prisma`
QA: `Regression Test` `TestRail` `Jira`

---

## Links

- Blog — https://joodev-sandy.vercel.app/
- LinkedIn — https://www.linkedin.com/in/minjooooo

---

<!-- 기존 Gitanimals / GitHub Stats 블록을 여기 아래로 그대로 옮겨 주세요 -->
```

---

## 주의

- 위 초안의 Portfolio RAG Assistant 항목 수치(45개 케이스, pytest 157개)는
  이 저장소에서 실제로 측정된 값입니다. 코드가 바뀌면 함께 갱신하세요.
- ISTQB Dataset Pipeline 의 "PDF 4종 → 160건" 은 프롬프트에서 제공받은 값으로,
  이 저장소에서 검증하지 않았습니다. 해당 저장소 기준으로 다시 확인한 뒤 쓰세요.
