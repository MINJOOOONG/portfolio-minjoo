# 운영 및 회귀 검증

## 콘텐츠 원천

`SiteSetting.project_data`가 프로젝트 관리 API와 공개 목록·상세 페이지의 공통 원천이다. 프로젝트 CRUD는 트랜잭션과 PostgreSQL advisory lock으로 전체 JSON 배열의 동시 수정을 직렬화한다. 별도 스키마 변경은 필요 없다.

기존 `Project` 테이블은 `project_data` 설정이 아예 없는 설치에서만 읽는 호환용 원천이다. 데이터 삭제나 운영 DB 마이그레이션은 하지 않는다. 기존 JSON 항목은 제목 기반 ID와 slug를 읽을 때 보완하며, 처음 저장할 때 함께 유지한다. 관리 폼의 설명 문자열은 공개 페이지의 문자열 배열로 변환한다. 폼에 없는 상세 블록·PDF·동영상·첨부파일·번역은 유지한다. 공개 여부·정렬·사용자 지정 slug도 공개 화면에 반영한다.

`/admin/settings`는 변경한 필드만 저장한다. JSON 형식과 필수 필드를 저장 전에 검사하고, 복수 설정 변경은 한 트랜잭션에 저장한다. About의 Markdown 소개는 기존 상세 섹션 위에 표시하며, Skills의 항목·카테고리는 DB 값으로 결정한다. 경력의 코드 문구와 프로젝트 번역·상세 블록은 누락된 값의 기본값으로만 사용한다.

## AI 요청 경로

Next.js `/api/portfolio-assistant` → FastAPI `/agent/chat` → Claude 도구 호출 및 별도 검토. Claude 키 미설정, 오류 HTTP 응답, 이전 버전의 `agent_turns=0` 오류, 잘못된 응답 JSON, 네트워크 오류, 타임아웃은 기존 `/ask`로 전환한다. 기존 경로는 TF-IDF 검색 후 근거가 있을 때 Groq를 호출한다.

- Claude 루프는 1~6회, FastAPI 전체 실행은 40초로 제한한다.
- Next.js는 Agent 45초, 기존 RAG 30초를 허용하며 함수 실행 한도는 90초다.
- 질문 2,000자, 기록 12개, 메시지별 4,000자로 제한한다. 브라우저는 최근 기록만 전송한다.
- 실제 문서 출처가 없는 도구 결과는 검증 근거에 포함하지 않는다. 도구 호출 없이 생성한 답변도 근거 없음 안내로 교체한다.
- 검증 상태는 `verified` / `unverified` / `unavailable`이다. 근거 누락, 키 누락, 파싱 실패, 검토 API 오류는 `is_accurate: null`이며 성공 배지를 표시하지 않는다.
- Claude의 검토 점수는 모델의 평가 결과이며 사실 정확도의 보증은 아니다.

## 요청 제한과 환경변수

Next.js의 로그인은 IP 기준 5회/분, AI는 10회/분 및 100회/일이다. 서버 메모리가 아닌 PostgreSQL 원자적 upsert로 여러 Vercel 인스턴스의 카운터를 공유한다. IP는 SHA-256으로 해시한다. 프록시 앞단은 전달 IP 헤더를 실제 접속자 IP로 덮어써야 한다.

카운터는 `SiteSetting`의 예약된 `_rate_limit:` 이름 공간을 사용하고 CMS에서는 조회·변경할 수 없다. 활성 카운터는 IP·정책당 한 행을 사용하며, 오래된 행은 요청 중 확률적으로 정리한다. DB 장애 시 제한을 우회하지 않고 503을 반환한다. 차단 응답은 429와 `Retry-After`를 포함한다.

FastAPI에도 접속 피어당 60회/분의 제한이 있다. 이 보조 제한은 프로세스 단위이며 여러 worker에 공유되지 않는다. 공개 운영에서는 **동일한 `RAG_API_TOKEN`을 Next.js와 FastAPI 양쪽에 설정**해 외부 호출이 Next.js의 공유 제한을 거치게 한다. 토큰 설정 시 `/ask`와 `/agent/chat`은 Bearer 인증이 필요하며 `/health`는 공개 상태를 유지한다.

- Next.js: `DATABASE_URL`, `ADMIN_PASSWORD`, `RAG_API_URL`, `RAG_API_TOKEN`
- FastAPI: `GROQ_API_KEY`, 선택적으로 `GROQ_MODEL`, `ANTHROPIC_API_KEY`, `CLAUDE_MODEL`, `MAX_AGENT_TURNS`, `RAG_API_TOKEN`
- Claude 키가 없으면 Groq 경로를 사용한다. 토큰을 설정할 때에는 양쪽 값을 함께 맞춘다.

## 검증

```sh
npm ci
npm test
npm run lint
npm run build

cd rag-assistant
python -m venv .venv
. .venv/bin/activate
pip install -r requirements-dev.txt
pytest
python -m evaluation.run_retrieval_eval
```

웹 테스트는 격리된 PGlite PostgreSQL에서 요청 제한의 동시성·만료, 프로젝트 생성·수정·비공개·삭제·롤백을 검사한다. 운영 DB나 LLM에 요청을 보내지 않는다. Python 테스트도 SDK를 대체해 외부 호출 없이 실행한다. 실제 모델 평가는 별도의 명시적인 API 실행이 필요하다.

검색 평가는 기존 45개 사례와 80% 통과 기준을 유지한다. 현재 검색 판정 대상은 41개이며 38개가 통과한다. 정답 문서 검색률 89.3%, 근거 없음 판별률 100%다. 나머지 3개는 문서에 없는 처리량·시간 등의 수치를 묻는 부분 근거 질문이며, 현재는 보수적으로 빈 검색 결과를 반환한다. 이 수치는 해당 평가 세트에서의 결과이며 전체 질문 정확도를 뜻하지 않는다.
