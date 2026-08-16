"""검색 품질 평가기 — Groq API key 없이 실행됩니다.

    cd rag-assistant
    python -m evaluation.run_retrieval_eval

LLM 을 호출하지 않고 검색 단계만 평가하므로 CI 에서 외부 의존성 없이 돌아갑니다.

결과 파일
---------
* `evaluation/results/latest.json` — 커밋 대상. 결정론적인 값만 담습니다.
  (지표, 카테고리별 성공률, 실패 케이스, 설정, 데이터셋 체크섬)
  실행마다 바뀌는 timestamp / latency 를 넣지 않으므로, 검색 동작이 변하지
  않으면 git diff 도 생기지 않습니다.
* `evaluation/results/latest.md` — 위 내용의 사람이 읽는 버전. 역시 커밋 대상.
* `evaluation/results/last_run.json` — timestamp 와 latency p50/p95 를 포함한
  실행별 기록. `.gitignore` 대상이라 커밋되지 않습니다.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

from evaluation.dataset import (
    CASES_PATH,
    EvalCase,
    category_counts,
    dataset_checksum,
    load_cases,
    verify_expected_sources_exist,
)
from rag.chain import PROMPT_VERSION
from rag.chunker import split_documents
from rag.config import get_settings
from rag.embedder import build_index
from rag.loader import load_documents
from rag.retriever import get_source_list, retrieve_documents

RESULTS_DIR = Path(__file__).resolve().parent / "results"

# 통과 기준 (CLI 로 덮어쓸 수 있지만, 기본값을 낮추는 방식으로 통과시키지 마세요)
DEFAULT_MIN_SOURCE_HIT_RATE = 0.80
DEFAULT_MIN_NO_EVIDENCE_ACCURACY = 0.80

# 검색 단계에서 판정하지 않는 케이스(cross_project_confusion)는
# retrieval_expectation="unconstrained" 로 표시되어 not_applicable 이 됩니다.
# 이런 케이스의 방어는 프롬프트 규칙이 담당하고 run_llm_eval 이 확인합니다.


def evaluate_case(index, case: EvalCase) -> dict:
    """케이스 하나를 검색만으로 평가합니다."""
    started = time.perf_counter()
    docs = retrieve_documents(index, case.question)
    latency_ms = (time.perf_counter() - started) * 1000

    sources = get_source_list(docs)
    top_score = max((d["score"] for d in docs), default=0.0)

    if case.expects_empty:
        status = "pass" if len(docs) == 0 else "fail"
        reason = "" if status == "pass" else f"근거 없음이어야 하는데 {sources} 를 반환"
    elif case.expects_evidence:
        hit = any(source in case.expected_sources for source in sources)
        status = "pass" if hit else "fail"
        if not docs:
            reason = "검색 결과가 비어 있음 (expected: " + ", ".join(
                case.expected_sources
            ) + ")"
        elif not hit:
            reason = f"expected {case.expected_sources} 중 아무것도 없음, got {sources}"
        else:
            reason = ""
    else:
        status = "not_applicable"
        reason = ""

    return {
        "id": case.id,
        "category": case.category,
        "expectation": case.retrieval_expectation,
        "status": status,
        "passed": status == "pass",
        "reason": reason,
        "retrieved_sources": sources,
        "retrieved_count": len(docs),
        "top_score": round(top_score, 4),
        "latency_ms": latency_ms,
    }


def aggregate(results: list[dict], cases: list[EvalCase]) -> dict:
    """지표를 계산합니다."""
    evidence_results = [r for r in results if r["expectation"] == "evidence"]
    routing_results = [r for r in results if r["expectation"] == "empty"]
    skipped_results = [r for r in results if r["status"] == "not_applicable"]
    asserted = [r for r in results if r["status"] != "not_applicable"]

    categories: dict[str, dict] = {}
    for result in results:
        bucket = categories.setdefault(
            result["category"], {"total": 0, "passed": 0, "not_asserted": 0}
        )
        bucket["total"] += 1
        bucket["passed"] += int(result["passed"])
        bucket["not_asserted"] += int(result["status"] == "not_applicable")
    for bucket in categories.values():
        bucket["pass_rate"] = _rate(
            bucket["passed"], bucket["total"] - bucket["not_asserted"]
        )

    return {
        "total_cases": len(results),
        "asserted_cases": len(asserted),
        "not_asserted_cases": len(skipped_results),
        "passed_cases": sum(1 for r in asserted if r["passed"]),
        "source_hit_rate": _rate(
            sum(1 for r in evidence_results if r["passed"]), len(evidence_results)
        ),
        "source_hit_cases": len(evidence_results),
        "non_empty_retrieval_rate": _rate(
            sum(1 for r in evidence_results if r["retrieved_count"] > 0),
            len(evidence_results),
        ),
        "cross_project_retrieval_non_empty": sum(
            1 for r in skipped_results if r["retrieved_count"] > 0
        ),
        "no_evidence_routing_accuracy": _rate(
            sum(1 for r in routing_results if r["passed"]), len(routing_results)
        ),
        "no_evidence_routing_cases": len(routing_results),
        "false_premise_routing_accuracy": _rate(
            sum(
                1
                for r in results
                if r["category"] == "false_premise" and r["passed"]
            ),
            sum(1 for r in results if r["category"] == "false_premise"),
        ),
        "by_category": dict(sorted(categories.items())),
    }


def _rate(numerator: int, denominator: int) -> float | None:
    if denominator == 0:
        return None
    return round(numerator / denominator, 4)


def _percentile(values: list[float], percentile: float) -> float | None:
    if not values:
        return None
    ordered = sorted(values)
    rank = max(1, min(len(ordered), round(percentile / 100 * len(ordered))))
    return round(ordered[rank - 1], 2)


def render_markdown(report: dict) -> str:
    """latest.md 를 만듭니다. (실행마다 달라지는 값은 넣지 않습니다)"""
    metrics = report["metrics"]
    config = report["config"]
    lines = [
        "# Retrieval Evaluation — latest",
        "",
        "`python -m evaluation.run_retrieval_eval` 이 생성한 파일입니다. 직접 수정하지 마세요.",
        "지연시간과 실행 시각은 재현 가능한 diff 를 위해 `last_run.json`(gitignored)에만 기록됩니다.",
        "",
        "## Configuration",
        "",
        "| key | value |",
        "| --- | --- |",
    ]
    for key, value in config.items():
        lines.append(f"| `{key}` | `{value}` |")

    lines += [
        "",
        "## Metrics",
        "",
        "| metric | value |",
        "| --- | --- |",
        f"| total cases | {metrics['total_cases']} |",
        f"| retrieval-asserted cases | {metrics['asserted_cases']} |",
        f"| passed cases | {metrics['passed_cases']} / {metrics['asserted_cases']} |",
        f"| answerable source hit rate | {_pct(metrics['source_hit_rate'])} "
        f"({metrics['source_hit_cases']} cases) |",
        f"| non-empty retrieval on answerable | {_pct(metrics['non_empty_retrieval_rate'])} |",
        f"| no-evidence routing accuracy | {_pct(metrics['no_evidence_routing_accuracy'])} "
        f"({metrics['no_evidence_routing_cases']} cases) |",
        f"| false-premise routing accuracy | {_pct(metrics['false_premise_routing_accuracy'])} |",
        f"| cross-project cases retrieving evidence | "
        f"{metrics['cross_project_retrieval_non_empty']} / {metrics['not_asserted_cases']} |",
        "",
        "## By category",
        "",
        "| category | passed | asserted | total | pass rate |",
        "| --- | --- | --- | --- | --- |",
    ]
    for name, bucket in metrics["by_category"].items():
        asserted = bucket["total"] - bucket["not_asserted"]
        lines.append(
            f"| {name} | {bucket['passed']} | {asserted} | {bucket['total']} | "
            f"{_pct(bucket['pass_rate'])} |"
        )

    lines += ["", "## Failed cases", ""]
    if not report["failures"]:
        lines.append("없음.")
    else:
        lines += ["| id | category | reason |", "| --- | --- | --- |"]
        for failure in report["failures"]:
            lines.append(
                f"| `{failure['id']}` | {failure['category']} | {failure['reason']} |"
            )

    lines += [
        "",
        "## Thresholds",
        "",
        f"- answerable source hit rate ≥ {_pct(report['thresholds']['min_source_hit_rate'])}",
        f"- no-evidence routing accuracy ≥ "
        f"{_pct(report['thresholds']['min_no_evidence_accuracy'])}",
        "",
        f"**Result: {'PASS' if report['passed'] else 'FAIL'}**",
        "",
    ]
    return "\n".join(lines)


def _pct(value: float | None) -> str:
    return "n/a" if value is None else f"{value * 100:.1f}%"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="RAG retrieval evaluation")
    parser.add_argument(
        "--min-source-hit-rate", type=float, default=DEFAULT_MIN_SOURCE_HIT_RATE
    )
    parser.add_argument(
        "--min-no-evidence-accuracy",
        type=float,
        default=DEFAULT_MIN_NO_EVIDENCE_ACCURACY,
    )
    parser.add_argument(
        "--no-write", action="store_true", help="결과 파일을 쓰지 않습니다."
    )
    args = parser.parse_args(argv)

    settings = get_settings()
    cases = load_cases()
    verify_expected_sources_exist(cases, settings.data_dir)

    documents = load_documents(settings.data_dir)
    chunks = split_documents(
        documents,
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
    )
    index = build_index(chunks)

    results = [evaluate_case(index, case) for case in cases]
    metrics = aggregate(results, cases)
    latencies = [r["latency_ms"] for r in results]

    failures = [
        {"id": r["id"], "category": r["category"], "reason": r["reason"]}
        for r in results
        if r["status"] == "fail"
    ]

    passed = (
        (metrics["source_hit_rate"] or 0) >= args.min_source_hit_rate
        and (metrics["no_evidence_routing_accuracy"] or 0)
        >= args.min_no_evidence_accuracy
    )

    report = {
        "prompt_version": PROMPT_VERSION,
        "dataset": {
            "checksum": dataset_checksum(),
            "path": str(CASES_PATH.relative_to(CASES_PATH.parents[2])),
            "category_counts": category_counts(cases),
        },
        "config": {
            **settings.as_dict(),
            "documents": len(documents),
            "chunks": len(chunks),
        },
        "thresholds": {
            "min_source_hit_rate": args.min_source_hit_rate,
            "min_no_evidence_accuracy": args.min_no_evidence_accuracy,
        },
        "metrics": metrics,
        "failures": failures,
        "cases": [
            {
                "id": r["id"],
                "category": r["category"],
                "expectation": r["expectation"],
                "status": r["status"],
                "retrieved_sources": r["retrieved_sources"],
                "top_score": r["top_score"],
            }
            for r in results
        ],
        "passed": passed,
    }

    if not args.no_write:
        RESULTS_DIR.mkdir(parents=True, exist_ok=True)
        (RESULTS_DIR / "latest.json").write_text(
            json.dumps(report, ensure_ascii=False, indent=2, sort_keys=True) + "\n",
            encoding="utf-8",
        )
        (RESULTS_DIR / "latest.md").write_text(
            render_markdown(report), encoding="utf-8"
        )
        (RESULTS_DIR / "last_run.json").write_text(
            json.dumps(
                {
                    "run_at": datetime.now(timezone.utc).isoformat(),
                    "retrieval_latency_ms": {
                        "p50": _percentile(latencies, 50),
                        "p95": _percentile(latencies, 95),
                        "max": round(max(latencies), 2) if latencies else None,
                    },
                    "passed": passed,
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )

    _print_summary(report, latencies)
    return 0 if passed else 1


def _print_summary(report: dict, latencies: list[float]) -> None:
    metrics = report["metrics"]
    print("=" * 68)
    print("Retrieval evaluation")
    print("=" * 68)
    print(f"prompt version         : {report['prompt_version']}")
    print(f"dataset checksum       : {report['dataset']['checksum']}")
    print(f"config                 : {report['config']}")
    print(f"total cases            : {metrics['total_cases']}")
    print(
        f"passed cases           : {metrics['passed_cases']}/"
        f"{metrics['asserted_cases']} asserted "
        f"({metrics['not_asserted_cases']} not asserted at retrieval stage)"
    )
    print(f"source hit rate        : {_pct(metrics['source_hit_rate'])}")
    print(
        f"no-evidence routing    : {_pct(metrics['no_evidence_routing_accuracy'])}"
    )
    print(
        f"false-premise routing  : {_pct(metrics['false_premise_routing_accuracy'])}"
    )
    print(
        f"retrieval latency      : p50={_percentile(latencies, 50)}ms "
        f"p95={_percentile(latencies, 95)}ms"
    )
    print("-" * 68)
    for name, bucket in metrics["by_category"].items():
        asserted = bucket["total"] - bucket["not_asserted"]
        suffix = f"  ({bucket['not_asserted']} not asserted)" if bucket["not_asserted"] else ""
        print(
            f"  {name:<26} {bucket['passed']}/{asserted}  "
            f"{_pct(bucket['pass_rate'])}{suffix}"
        )
    if report["failures"]:
        print("-" * 68)
        print("Failures:")
        for failure in report["failures"]:
            print(f"  [{failure['category']}] {failure['id']}: {failure['reason']}")
    print("=" * 68)
    print("RESULT:", "PASS" if report["passed"] else "FAIL")


if __name__ == "__main__":
    sys.exit(main())
