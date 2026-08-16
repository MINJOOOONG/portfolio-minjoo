"""LLM end-to-end 평가기 — `GROQ_API_KEY` 가 있을 때만 실행됩니다.

    cd rag-assistant
    python -m evaluation.run_llm_eval

키가 없으면 **실패가 아니라 skip** 하고 종료 코드 0 을 반환합니다.
CI 기본 파이프라인은 이 스크립트를 실행하지 않습니다.

측정 방식에 대한 주의
--------------------
여기서 계산하는 값은 전부 **문자열 휴리스틱**입니다. LLM-as-a-judge 도
쓰지 않고, 자연어 정답 판정도 하지 않습니다. 구체적으로:

* keyword coverage — expected_keywords 문자열이 답변에 등장하는지만 봅니다.
  동의어나 바꿔 쓴 표현은 놓칩니다.
* refusal detection — 근거 부족을 나타내는 정해진 표현이 답변에 있는지 봅니다.
* unsupported claim flag — 답변에 등장하는 고유명사 중 검색된 context 에
  없는 것이 있으면 **검토 대상으로 표시**합니다. 환각 판정이 아니라,
  사람이 확인할 후보를 좁혀 주는 신호입니다.

따라서 이 숫자는 회귀 감지용 지표이지 정확도의 절대값이 아닙니다.
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import httpx

from evaluation.dataset import EvalCase, dataset_checksum, load_cases
from rag.chain import (
    PROMPT_VERSION,
    LLMError,
    build_timeout,
    generate_answer,
    no_evidence_answer,
)
from rag.chunker import split_documents
from rag.config import get_settings
from rag.embedder import build_index
from rag.loader import load_documents
from rag.retriever import format_context, get_source_list, retrieve_documents

RESULTS_DIR = Path(__file__).resolve().parent / "results"

# 근거 부족을 나타내는 표현들 (답변이 거절/보류인지 판정하는 휴리스틱)
_REFUSAL_MARKERS = (
    "근거를 찾지 못",
    "근거가 없",
    "근거가 부족",
    "확인할 수 없",
    "찾을 수 없",
    "나와 있지 않",
    "언급되어 있지 않",
    "포함되어 있지 않",
    "정보가 없",
    "could not find",
    "not enough evidence",
    "does not contain",
    "no information",
    "not mentioned",
    "not documented",
)

# 고유명사 후보: 대문자로 시작하는 라틴 토큰 (기술명·회사명 탐지용)
_PROPER_NOUN = re.compile(r"\b[A-Z][A-Za-z0-9.+#-]{2,}\b")

# 답변에 자주 등장하지만 근거 대조 대상이 아닌 일반 단어
_PROPER_NOUN_ALLOWLIST = {
    "The", "This", "That", "There", "These", "Those", "However", "Based",
    "According", "Minjoo", "Suh", "QA", "AI", "LLM", "RAG",
}


def looks_like_refusal(answer: str) -> bool:
    """답변이 근거 부족을 밝히고 있는지 (휴리스틱)."""
    return any(marker in answer for marker in _REFUSAL_MARKERS)


def unsupported_proper_nouns(answer: str, context: str) -> list[str]:
    """context 에 없는 고유명사 후보를 뽑습니다. (환각 판정이 아니라 검토 신호)"""
    lowered_context = context.lower()
    flagged: list[str] = []
    for token in _PROPER_NOUN.findall(answer):
        if token in _PROPER_NOUN_ALLOWLIST:
            continue
        if token.lower() in lowered_context:
            continue
        if token not in flagged:
            flagged.append(token)
    return flagged


def matched_keywords(answer: str, keywords: list[str]) -> list[str]:
    lowered = answer.lower()
    return [kw for kw in keywords if kw.lower() in lowered]


async def evaluate_case(index, case: EvalCase, client: httpx.AsyncClient) -> dict:
    """검색 → (근거가 있으면) LLM 호출 까지 실제로 수행합니다."""
    started = time.perf_counter()
    docs = retrieve_documents(index, case.question)
    sources = get_source_list(docs)
    context = format_context(docs)

    error_type = ""
    if not docs:
        answer = no_evidence_answer(case.question)
        no_evidence = True
    else:
        no_evidence = False
        try:
            answer = await generate_answer(context, case.question, client=client)
        except LLMError as exc:
            answer = ""
            error_type = exc.error_type

    latency_ms = round((time.perf_counter() - started) * 1000, 2)

    refused = no_evidence or looks_like_refusal(answer)
    hits = matched_keywords(answer, case.expected_keywords)
    expected_source_returned = (
        None
        if not case.expected_sources
        else any(source in case.expected_sources for source in sources)
    )

    return {
        "id": case.id,
        "category": case.category,
        "should_refuse": case.should_refuse,
        "refused": refused,
        "refusal_correct": refused == case.should_refuse,
        "no_evidence_route": no_evidence,
        "sources": sources,
        "expected_source_returned": expected_source_returned,
        "keyword_hits": hits,
        "keyword_coverage": (
            round(len(hits) / len(case.expected_keywords), 4)
            if case.expected_keywords
            else None
        ),
        "unsupported_claim_candidates": unsupported_proper_nouns(answer, context),
        "latency_ms": latency_ms,
        "error_type": error_type,
        "answer_preview": answer[:200],
    }


async def run(cases: list[EvalCase]) -> list[dict]:
    settings = get_settings()
    documents = load_documents(settings.data_dir)
    chunks = split_documents(
        documents,
        chunk_size=settings.chunk_size,
        chunk_overlap=settings.chunk_overlap,
    )
    index = build_index(chunks)

    results: list[dict] = []
    async with httpx.AsyncClient(timeout=build_timeout()) as client:
        for case in cases:
            results.append(await evaluate_case(index, case, client))
    return results


def summarize(results: list[dict]) -> dict:
    keyword_scored = [
        r for r in results if r["keyword_coverage"] is not None and not r["should_refuse"]
    ]
    source_scored = [
        r for r in results if r["expected_source_returned"] is not None
    ]
    latencies = sorted(r["latency_ms"] for r in results)

    return {
        "total_cases": len(results),
        "llm_errors": sum(1 for r in results if r["error_type"]),
        "refusal_accuracy": _rate(
            sum(1 for r in results if r["refusal_correct"]), len(results)
        ),
        "keyword_coverage_mean": (
            round(
                sum(r["keyword_coverage"] for r in keyword_scored)
                / len(keyword_scored),
                4,
            )
            if keyword_scored
            else None
        ),
        "expected_source_return_rate": _rate(
            sum(1 for r in source_scored if r["expected_source_returned"]),
            len(source_scored),
        ),
        "cases_with_unsupported_claim_candidates": sum(
            1 for r in results if r["unsupported_claim_candidates"]
        ),
        "latency_ms": {
            "p50": _percentile(latencies, 50),
            "p95": _percentile(latencies, 95),
        },
    }


def _rate(numerator: int, denominator: int) -> float | None:
    return None if denominator == 0 else round(numerator / denominator, 4)


def _percentile(ordered: list[float], percentile: float) -> float | None:
    if not ordered:
        return None
    rank = max(1, min(len(ordered), round(percentile / 100 * len(ordered))))
    return round(ordered[rank - 1], 2)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="RAG LLM end-to-end evaluation")
    parser.add_argument("--limit", type=int, default=0, help="앞에서 N개만 실행")
    parser.add_argument("--category", default="", help="특정 카테고리만 실행")
    args = parser.parse_args(argv)

    if not os.getenv("GROQ_API_KEY"):
        print(
            "SKIPPED: GROQ_API_KEY 가 설정되지 않아 LLM 평가를 건너뜁니다.\n"
            "         (검색 평가는 python -m evaluation.run_retrieval_eval 로 "
            "키 없이 실행할 수 있습니다.)"
        )
        return 0

    cases = load_cases()
    if args.category:
        cases = [c for c in cases if c.category == args.category]
    if args.limit:
        cases = cases[: args.limit]

    results = asyncio.run(run(cases))
    metrics = summarize(results)
    settings = get_settings()

    report = {
        "run_at": datetime.now(timezone.utc).isoformat(),
        "prompt_version": PROMPT_VERSION,
        "model": settings.model,
        "dataset_checksum": dataset_checksum(),
        "config": settings.as_dict(),
        "metrics": metrics,
        "cases": results,
        "measurement_note": (
            "모든 지표는 문자열 휴리스틱입니다. LLM-as-a-judge 를 쓰지 않으며 "
            "unsupported_claim_candidates 는 환각 판정이 아니라 사람이 검토할 "
            "후보 목록입니다."
        ),
    }

    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    output = RESULTS_DIR / "llm_eval_last_run.json"
    output.write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )

    print("=" * 68)
    print("LLM end-to-end evaluation (heuristic metrics)")
    print("=" * 68)
    print(f"model            : {settings.model}")
    print(f"prompt version   : {PROMPT_VERSION}")
    print(f"dataset checksum : {report['dataset_checksum']}")
    for key, value in metrics.items():
        print(f"{key:<38}: {value}")
    flagged = [r for r in results if r["unsupported_claim_candidates"]]
    if flagged:
        print("-" * 68)
        print("검토 필요 (context 밖 고유명사가 등장한 답변):")
        for r in flagged:
            print(f"  {r['id']}: {r['unsupported_claim_candidates']}")
    wrong = [r for r in results if not r["refusal_correct"]]
    if wrong:
        print("-" * 68)
        print("거절 판정이 기대와 다른 케이스:")
        for r in wrong:
            print(
                f"  {r['id']} ({r['category']}): expected refuse="
                f"{r['should_refuse']}, got {r['refused']}"
            )
    print("=" * 68)
    print(f"결과 저장: {output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
