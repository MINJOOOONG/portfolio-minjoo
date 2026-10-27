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
| `model` | `openai/gpt-oss-20b` |
| `claude_model` | `claude-sonnet-4-20250514` |
| `max_agent_turns` | `6` |
| `documents` | `9` |
| `chunks` | `90` |

## Metrics

| metric | value |
| --- | --- |
| total cases | 45 |
| retrieval-asserted cases | 41 |
| passed cases | 38 / 41 |
| answerable source hit rate | 89.3% (28 cases) |
| non-empty retrieval on answerable | 89.3% |
| no-evidence routing accuracy | 100.0% (13 cases) |
| false-premise routing accuracy | 100.0% |
| cross-project cases retrieving evidence | 4 / 4 |

## By category

| category | passed | asserted | total | pass rate |
| --- | --- | --- | --- | --- |
| answerable | 14 | 14 | 14 | 100.0% |
| cross_project_confusion | 0 | 0 | 4 | n/a |
| english | 5 | 5 | 5 | 100.0% |
| false_premise | 4 | 4 | 4 | 100.0% |
| korean_paraphrase | 7 | 7 | 7 | 100.0% |
| partial_evidence | 0 | 3 | 3 | 0.0% |
| unanswerable | 8 | 8 | 8 | 100.0% |

## Failed cases

| id | category | reason |
| --- | --- | --- |
| `ko-partial-001` | partial_evidence | 검색 결과가 비어 있음 (expected: loopers-backend.md, projects.md) |
| `ko-partial-002` | partial_evidence | 검색 결과가 비어 있음 (expected: experience.md, about.md, skills.md) |
| `ko-partial-003` | partial_evidence | 검색 결과가 비어 있음 (expected: portfolio-site.md, projects.md) |

## Thresholds

- answerable source hit rate ≥ 80.0%
- no-evidence routing accuracy ≥ 80.0%

**Result: PASS**
