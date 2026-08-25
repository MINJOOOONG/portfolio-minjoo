"""구조화 로그 및 최소 관측 지표.

질문 원문은 절대 로그에 남기지 않습니다. 대신 길이 / SHA-256 앞 12자리 해시 /
감지된 언어만 남겨 재현 추적과 개인정보 보호를 동시에 만족시킵니다.

Prometheus 는 사용하지 않습니다. `/metrics` 는 프로세스 메모리 안의 카운터를
JSON 으로 노출하는 최소 구현이며, 프로세스가 재시작되면 초기화됩니다.
"""

from __future__ import annotations

import hashlib
import json
import logging
import threading
from collections import Counter

logger = logging.getLogger("rag.api")


def question_fingerprint(question: str) -> str:
    """질문의 SHA-256 앞 12자리. 원문 복원은 불가능합니다."""
    return hashlib.sha256(question.encode("utf-8")).hexdigest()[:12]


def log_event(event: str, **fields) -> None:
    """JSON 한 줄로 구조화 로그를 남깁니다."""
    payload = {"event": event}
    payload.update(fields)
    logger.info(json.dumps(payload, ensure_ascii=False, sort_keys=True))


class Metrics:
    """스레드 안전한 인메모리 카운터 + 지연시간 집계."""

    def __init__(self) -> None:
        self._lock = threading.Lock()
        self._counters: Counter = Counter()
        self._latencies_ms: list[float] = []

    def reset(self) -> None:
        with self._lock:
            self._counters.clear()
            self._latencies_ms.clear()

    def increment(self, name: str, amount: int = 1) -> None:
        with self._lock:
            self._counters[name] += amount

    def observe_latency(self, latency_ms: float) -> None:
        with self._lock:
            self._latencies_ms.append(latency_ms)

    def snapshot(self) -> dict:
        with self._lock:
            latencies = sorted(self._latencies_ms)
            counters = dict(self._counters)

        return {
            "request_count": counters.get("request_total", 0),
            "no_evidence_count": counters.get("no_evidence_total", 0),
            "llm_error_count": counters.get("llm_error_total", 0),
            "index_not_ready_count": counters.get("index_not_ready_total", 0),
            "request_latency_ms": {
                "count": len(latencies),
                "p50": _percentile(latencies, 50),
                "p95": _percentile(latencies, 95),
                "max": round(latencies[-1], 2) if latencies else None,
            },
            "errors_by_type": {
                key[len("llm_error_type:"):]: value
                for key, value in counters.items()
                if key.startswith("llm_error_type:")
            },
            # Agent 메트릭
            "agent_request_count": counters.get("agent_request_total", 0),
            "agent_error_count": counters.get("agent_error_total", 0),
            "agent_tool_usage": {
                key[len("agent_tool:"):]: value
                for key, value in counters.items()
                if key.startswith("agent_tool:")
            },
            "agent_verification": {
                "total": counters.get("agent_verification_total", 0),
                "accurate": counters.get("agent_verification_accurate", 0),
                "inaccurate": counters.get("agent_verification_inaccurate", 0),
            },
        }


def _percentile(sorted_values: list[float], percentile: float) -> float | None:
    """가장 가까운 순위(nearest-rank) 방식 백분위수."""
    if not sorted_values:
        return None
    rank = max(1, min(len(sorted_values), round(percentile / 100 * len(sorted_values))))
    return round(sorted_values[rank - 1], 2)


metrics = Metrics()
