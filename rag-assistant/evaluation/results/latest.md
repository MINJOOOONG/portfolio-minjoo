# Retrieval Evaluation — latest

`python -m evaluation.run_retrieval_eval` 이 생성한 파일입니다. 직접 수정하지 마세요.
지연시간과 실행 시각은 재현 가능한 diff 를 위해 `last_run.json`(gitignored)에만 기록됩니다.

## Configuration

| key | value |
| --- | --- |
| `chunk_size` | `800` |
| `chunk_overlap` | `150` |
| `top_k` | `6` |
| `score_threshold` | `0.4` |
| `model` | `llama-3.1-8b-instant` |
| `documents` | `9` |
| `chunks` | `88` |

## Metrics

| metric | value |
| --- | --- |
| total cases | 45 |
| retrieval-asserted cases | 41 |
| passed cases | 34 / 41 |
| answerable source hit rate | 82.1% (28 cases) |
| non-empty retrieval on answerable | 82.1% |
| no-evidence routing accuracy | 84.6% (13 cases) |
| false-premise routing accuracy | 75.0% |
| cross-project cases retrieving evidence | 4 / 4 |

## By category

| category | passed | asserted | total | pass rate |
| --- | --- | --- | --- | --- |
| answerable | 14 | 14 | 14 | 100.0% |
| cross_project_confusion | 0 | 0 | 4 | n/a |
| english | 5 | 5 | 5 | 100.0% |
| false_premise | 3 | 4 | 4 | 75.0% |
| korean_paraphrase | 5 | 7 | 7 | 71.4% |
| partial_evidence | 0 | 3 | 3 | 0.0% |
| unanswerable | 7 | 8 | 8 | 87.5% |

## Failed cases

| id | category | reason |
| --- | --- | --- |
| `ko-paraphrase-001` | korean_paraphrase | 검색 결과가 비어 있음 (expected: experience.md, resume.md, about.md) |
| `ko-paraphrase-007` | korean_paraphrase | 검색 결과가 비어 있음 (expected: experience.md) |
| `ko-unanswerable-001` | unanswerable | 근거 없음이어야 하는데 ['about.md'] 를 반환 |
| `ko-falsepremise-001` | false_premise | 근거 없음이어야 하는데 ['resume.md'] 를 반환 |
| `ko-partial-001` | partial_evidence | 검색 결과가 비어 있음 (expected: loopers-backend.md, projects.md) |
| `ko-partial-002` | partial_evidence | 검색 결과가 비어 있음 (expected: experience.md, about.md, skills.md) |
| `ko-partial-003` | partial_evidence | 검색 결과가 비어 있음 (expected: portfolio-site.md, projects.md) |

## Thresholds

- answerable source hit rate ≥ 80.0%
- no-evidence routing accuracy ≥ 80.0%

**Result: PASS**
