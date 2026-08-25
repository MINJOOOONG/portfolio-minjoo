"""Agent 평가 스크립트: 도구 선택 정확도, 응답 품질, Hallucination 비율 측정.

사용법:
    python -m evaluation.run_agent_eval [--cases N] [--output results/agent_latest.json]

환경변수:
    ANTHROPIC_API_KEY  — Claude API 키 (필수)
    RAG_DATA_DIR       — 포트폴리오 문서 디렉터리 (기본: rag-assistant/data)
"""

from __future__ import annotations

import argparse
import asyncio
import json
import sys
import time
from pathlib import Path

# rag-assistant/ 를 PYTHONPATH 에 추가
_PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_PROJECT_ROOT))

from agent.agent import run_agent  # noqa: E402
from rag.chunker import split_documents  # noqa: E402
from rag.config import get_settings  # noqa: E402
from rag.embedder import build_index  # noqa: E402
from rag.loader import load_documents  # noqa: E402

CASES_PATH = Path(__file__).resolve().parent / "cases.json"


def load_cases(max_cases: int | None = None) -> list[dict]:
    """평가 케이스를 로드합니다."""
    with open(CASES_PATH, encoding="utf-8") as f:
        data = json.load(f)
    cases = data["cases"]
    if max_cases:
        cases = cases[:max_cases]
    return cases


async def evaluate_case(case: dict, index) -> dict:
    """단일 케이스를 Agent로 평가합니다."""
    case_id = case["id"]
    question = case["question"]
    expected_tools = case.get("expected_tools", [])
    expected_keywords = case.get("expected_keywords", [])
    should_refuse = case.get("should_refuse", False)

    started = time.perf_counter()

    try:
        result = await run_agent(question, history=[], index=index)
    except Exception as exc:
        return {
            "case_id": case_id,
            "status": "error",
            "error": str(exc),
            "elapsed_ms": round((time.perf_counter() - started) * 1000, 2),
        }

    elapsed_ms = round((time.perf_counter() - started) * 1000, 2)

    # 도구 선택 정확도
    actual_tools = [t["name"] for t in result.get("tools_used", [])]
    tool_match = _tool_accuracy(expected_tools, actual_tools)

    # 키워드 포함 여부
    answer_lower = result.get("answer", "").lower()
    keyword_hits = [kw for kw in expected_keywords if kw.lower() in answer_lower]
    keyword_score = len(keyword_hits) / len(expected_keywords) if expected_keywords else 1.0

    # 거부 판정 (should_refuse인 케이스에서 실제로 거부했는지)
    refusal_correct = True
    if should_refuse:
        refusal_indicators = [
            "찾을 수 없", "없습니다", "정보가 없", "확인할 수 없",
            "근거를 찾", "문서에 없", "언급되지 않", "not found",
            "no information", "cannot find", "don't have",
        ]
        actually_refused = any(ind in answer_lower for ind in refusal_indicators)
        refusal_correct = actually_refused

    # 검증 결과
    verification = result.get("verification", {})

    return {
        "case_id": case_id,
        "category": case.get("category", ""),
        "status": "ok",
        "question": question,
        "answer_preview": result.get("answer", "")[:200],
        "expected_tools": expected_tools,
        "actual_tools": actual_tools,
        "tool_match": tool_match,
        "expected_keywords": expected_keywords,
        "keyword_hits": keyword_hits,
        "keyword_score": keyword_score,
        "should_refuse": should_refuse,
        "refusal_correct": refusal_correct,
        "verification_accurate": verification.get("is_accurate", None),
        "verification_confidence": verification.get("confidence", None),
        "verification_issues": verification.get("issues", []),
        "agent_turns": result.get("agent_turns", 0),
        "sources": result.get("sources", []),
        "elapsed_ms": elapsed_ms,
    }


def _tool_accuracy(expected: list[str], actual: list[str]) -> float:
    """도구 선택 정확도: expected 중 actual에 포함된 비율."""
    if not expected:
        return 1.0
    hits = sum(1 for t in expected if t in actual)
    return hits / len(expected)


def summarize_results(results: list[dict]) -> dict:
    """전체 평가 결과를 요약합니다."""
    total = len(results)
    ok_results = [r for r in results if r["status"] == "ok"]
    errors = [r for r in results if r["status"] == "error"]

    # 도구 선택 정확도
    tool_scores = [r["tool_match"] for r in ok_results]
    avg_tool_accuracy = sum(tool_scores) / len(tool_scores) if tool_scores else 0.0

    # 키워드 점수
    keyword_scores = [r["keyword_score"] for r in ok_results]
    avg_keyword_score = sum(keyword_scores) / len(keyword_scores) if keyword_scores else 0.0

    # 거부 정확도
    refusal_cases = [r for r in ok_results if r["should_refuse"]]
    refusal_correct = sum(1 for r in refusal_cases if r["refusal_correct"])
    refusal_accuracy = refusal_correct / len(refusal_cases) if refusal_cases else 1.0

    # Hallucination 비율
    verified = [r for r in ok_results if r["verification_accurate"] is not None]
    hallucination_count = sum(1 for r in verified if not r["verification_accurate"])
    hallucination_rate = hallucination_count / len(verified) if verified else 0.0

    # 카테고리별 분석
    categories: dict[str, list[dict]] = {}
    for r in ok_results:
        cat = r.get("category", "unknown")
        categories.setdefault(cat, []).append(r)

    category_summary = {}
    for cat, cat_results in categories.items():
        cat_tool_scores = [r["tool_match"] for r in cat_results]
        cat_kw_scores = [r["keyword_score"] for r in cat_results]
        category_summary[cat] = {
            "count": len(cat_results),
            "avg_tool_accuracy": round(sum(cat_tool_scores) / len(cat_tool_scores), 4),
            "avg_keyword_score": round(sum(cat_kw_scores) / len(cat_kw_scores), 4),
        }

    # 도구 사용 빈도
    tool_usage: dict[str, int] = {}
    for r in ok_results:
        for t in r.get("actual_tools", []):
            tool_usage[t] = tool_usage.get(t, 0) + 1

    # 평균 응답 시간
    latencies = [r["elapsed_ms"] for r in ok_results]
    avg_latency = sum(latencies) / len(latencies) if latencies else 0.0

    return {
        "total_cases": total,
        "ok": len(ok_results),
        "errors": len(errors),
        "avg_tool_accuracy": round(avg_tool_accuracy, 4),
        "avg_keyword_score": round(avg_keyword_score, 4),
        "refusal_accuracy": round(refusal_accuracy, 4),
        "hallucination_rate": round(hallucination_rate, 4),
        "avg_latency_ms": round(avg_latency, 2),
        "tool_usage": tool_usage,
        "by_category": category_summary,
    }


async def main() -> None:
    parser = argparse.ArgumentParser(description="Agent 평가 스크립트")
    parser.add_argument("--cases", type=int, default=None, help="평가할 케이스 수 (기본: 전체)")
    parser.add_argument("--output", type=str, default=None, help="결과 JSON 파일 경로")
    args = parser.parse_args()

    print("=== Agent Evaluation ===")
    print("인덱스 빌드 중...")

    settings = get_settings()
    docs = load_documents(settings.data_dir)
    chunks = split_documents(docs, chunk_size=settings.chunk_size, chunk_overlap=settings.chunk_overlap)
    index = build_index(chunks)

    print(f"인덱스 준비 완료: {len(docs)} 문서, {len(chunks)} 청크")

    cases = load_cases(args.cases)
    print(f"평가 케이스: {len(cases)}건\n")

    results = []
    for i, case in enumerate(cases, 1):
        case_id = case["id"]
        print(f"[{i}/{len(cases)}] {case_id}: {case['question'][:50]}...")

        result = await evaluate_case(case, index)
        results.append(result)

        status_icon = "OK" if result["status"] == "ok" else "ERR"
        tool_info = f"tools={result.get('tool_match', 0):.0%}" if result["status"] == "ok" else ""
        kw_info = f"kw={result.get('keyword_score', 0):.0%}" if result["status"] == "ok" else ""
        ms_info = f"{result['elapsed_ms']:.0f}ms"
        print(f"  [{status_icon}] {tool_info} {kw_info} {ms_info}")

    # 요약
    summary = summarize_results(results)
    print("\n=== 평가 결과 요약 ===")
    print(f"총 케이스: {summary['total_cases']}")
    print(f"성공: {summary['ok']}, 오류: {summary['errors']}")
    print(f"도구 선택 정확도: {summary['avg_tool_accuracy']:.1%}")
    print(f"키워드 포함률: {summary['avg_keyword_score']:.1%}")
    print(f"거부 정확도: {summary['refusal_accuracy']:.1%}")
    print(f"Hallucination 비율: {summary['hallucination_rate']:.1%}")
    print(f"평균 응답 시간: {summary['avg_latency_ms']:.0f}ms")
    print(f"\n도구 사용 빈도: {json.dumps(summary['tool_usage'], ensure_ascii=False)}")

    print("\n카테고리별:")
    for cat, cat_info in summary["by_category"].items():
        print(f"  {cat}: {cat_info['count']}건, "
              f"tool={cat_info['avg_tool_accuracy']:.1%}, "
              f"kw={cat_info['avg_keyword_score']:.1%}")

    # 결과 저장
    output_path = args.output or str(
        Path(__file__).resolve().parent / "results" / "agent_latest.json"
    )
    output_dir = Path(output_path).parent
    output_dir.mkdir(parents=True, exist_ok=True)

    output_data = {
        "summary": summary,
        "results": results,
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print(f"\n결과 저장: {output_path}")


if __name__ == "__main__":
    asyncio.run(main())
