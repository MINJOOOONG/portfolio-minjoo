"""설정 로딩과 언어 감지 테스트."""

from __future__ import annotations

import pytest

from rag.config import (
    DEFAULT_CHUNK_OVERLAP,
    DEFAULT_CHUNK_SIZE,
    DEFAULT_SCORE_THRESHOLD,
    DEFAULT_TOP_K,
    get_settings,
)
from rag.language import detect_language
from rag.observability import Metrics, question_fingerprint


def test_defaults():
    settings = get_settings()
    assert settings.chunk_size == DEFAULT_CHUNK_SIZE == 800
    assert settings.chunk_overlap == DEFAULT_CHUNK_OVERLAP == 150
    assert settings.top_k == DEFAULT_TOP_K
    assert settings.score_threshold == DEFAULT_SCORE_THRESHOLD


def test_environment_overrides(monkeypatch):
    monkeypatch.setenv("RAG_CHUNK_SIZE", "500")
    monkeypatch.setenv("RAG_SCORE_THRESHOLD", "0.5")
    monkeypatch.setenv("RAG_TOP_K", "3")
    monkeypatch.setenv("GROQ_MODEL", "custom-model")

    settings = get_settings()
    assert settings.chunk_size == 500
    assert settings.score_threshold == 0.5
    assert settings.top_k == 3
    assert settings.model == "custom-model"


@pytest.mark.parametrize("bad", ["", "abc", "1.2.3"])
def test_invalid_environment_falls_back_to_default(monkeypatch, bad):
    monkeypatch.setenv("RAG_CHUNK_SIZE", bad)
    monkeypatch.setenv("RAG_SCORE_THRESHOLD", bad)

    settings = get_settings()
    assert settings.chunk_size == DEFAULT_CHUNK_SIZE
    assert settings.score_threshold == DEFAULT_SCORE_THRESHOLD


def test_settings_snapshot_shape():
    snapshot = get_settings().as_dict()
    assert set(snapshot) == {
        "chunk_size",
        "chunk_overlap",
        "top_k",
        "score_threshold",
        "model",
    }


@pytest.mark.parametrize(
    "text, expected",
    [
        ("서민주는 누구인가요?", "ko"),
        ("FastAPI는 어떻게 썼나요?", "ko"),
        ("Who is Minjoo Suh?", "en"),
        ("What is RAG?", "en"),
        ("12345", "ko"),
        ("", "ko"),
    ],
)
def test_detect_language(text, expected):
    assert detect_language(text) == expected


def test_question_fingerprint_is_stable_and_opaque():
    question = "서민주의 경력을 알려주세요"
    fingerprint = question_fingerprint(question)

    assert fingerprint == question_fingerprint(question)
    assert len(fingerprint) == 12
    assert question not in fingerprint
    assert fingerprint != question_fingerprint(question + "!")


def test_metrics_percentiles():
    metrics = Metrics()
    for value in (10, 20, 30, 40, 100):
        metrics.observe_latency(value)
    metrics.increment("request_total", 5)
    metrics.increment("llm_error_total")
    metrics.increment("llm_error_type:timeout")

    snapshot = metrics.snapshot()
    assert snapshot["request_count"] == 5
    assert snapshot["llm_error_count"] == 1
    assert snapshot["errors_by_type"] == {"timeout": 1}
    assert snapshot["request_latency_ms"]["count"] == 5
    assert snapshot["request_latency_ms"]["max"] == 100
    assert 10 <= snapshot["request_latency_ms"]["p50"] <= 40


def test_metrics_empty_snapshot():
    snapshot = Metrics().snapshot()
    assert snapshot["request_count"] == 0
    assert snapshot["request_latency_ms"]["p50"] is None


def test_metrics_reset():
    metrics = Metrics()
    metrics.increment("request_total")
    metrics.observe_latency(5)
    metrics.reset()

    assert metrics.snapshot()["request_count"] == 0
