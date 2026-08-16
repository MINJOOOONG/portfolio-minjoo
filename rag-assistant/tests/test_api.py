"""API 통합 테스트 — 외부 API 호출 없이 /ask 의 모든 경로를 검증합니다."""

from __future__ import annotations

import json

import httpx
import pytest
import respx
from fastapi.testclient import TestClient

import api as api_module
from rag.chain import ERROR_MESSAGES, GROQ_API_URL, NO_EVIDENCE_MESSAGES, PROMPT_VERSION


def _ok_payload(content: str = "문서에 따르면 Kafka를 사용했습니다."):
    return {"choices": [{"message": {"content": content}}]}


@pytest.fixture
def client(monkeypatch):
    """lifespan 을 실제로 실행해 인덱스와 AsyncClient 를 준비합니다."""
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    api_module.metrics.reset()
    with TestClient(api_module.app) as test_client:
        yield test_client


@pytest.fixture
def client_without_key(monkeypatch):
    monkeypatch.delenv("GROQ_API_KEY", raising=False)
    api_module.metrics.reset()
    with TestClient(api_module.app) as test_client:
        yield test_client


# ── 정상 경로 ──────────────────────────────────────────────────────────


@respx.mock
def test_ask_returns_answer_and_sources(client):
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload())
    )

    response = client.post(
        "/ask", json={"question": "Loopers 백엔드에서 쓴 메시지 큐는?"}
    )

    assert response.status_code == 200
    body = response.json()
    assert set(body) == {"answer", "sources"}
    assert body["answer"] == "문서에 따르면 Kafka를 사용했습니다."
    assert "loopers-backend.md" in body["sources"]


@respx.mock
def test_ask_sends_retrieved_context_to_llm(client):
    route = respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload())
    )

    client.post("/ask", json={"question": "Loopers 백엔드에서 쓴 메시지 큐는?"})

    system_message = json.loads(route.calls[0].request.content)["messages"][0]
    assert "출처: loopers-backend.md" in system_message["content"]


# ── no-evidence 경로 ───────────────────────────────────────────────────


@respx.mock
def test_no_evidence_question_returns_empty_sources(client):
    route = respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload())
    )

    response = client.post("/ask", json={"question": "서민주의 토익 점수는 몇 점인가요?"})

    body = response.json()
    assert response.status_code == 200
    assert body["sources"] == []
    assert body["answer"] == NO_EVIDENCE_MESSAGES["ko"]
    assert not route.called, "근거가 없으면 LLM을 호출하면 안 됩니다."


@respx.mock
def test_no_evidence_english_question_answers_in_english(client):
    route = respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload())
    )

    response = client.post(
        "/ask", json={"question": "Does Minjoo hold a professional chef license?"}
    )

    assert response.json()["answer"] == NO_EVIDENCE_MESSAGES["en"]
    assert response.json()["sources"] == []
    assert not route.called


# ── 인덱스 미준비 ──────────────────────────────────────────────────────


def test_request_before_index_is_ready():
    """lifespan 을 실행하지 않은 상태(=인덱스 None)에서도 200 계약을 지킨다."""
    api_module.search_index = None
    api_module.metrics.reset()

    raw_client = TestClient(api_module.app)  # with 없이 → startup 미실행
    response = raw_client.post("/ask", json={"question": "안녕하세요"})

    assert response.status_code == 200
    body = response.json()
    assert body["sources"] == []
    assert "준비되지" in body["answer"]


# ── 잘못된 요청 ────────────────────────────────────────────────────────


@pytest.mark.parametrize(
    "payload",
    [
        {},
        {"질문": "안녕"},
        {"question": None},
        {"question": 123},
        {"question": ""},
        {"question": "x" * 2_001},
        [],
    ],
)
def test_invalid_request_body_returns_422(client, payload):
    assert client.post("/ask", json=payload).status_code == 422


def test_malformed_json_returns_422(client):
    response = client.post(
        "/ask", content="{not json", headers={"Content-Type": "application/json"}
    )
    assert response.status_code == 422


# ── LLM 실패 처리 ──────────────────────────────────────────────────────


@respx.mock
@pytest.mark.parametrize(
    "mock_kwargs",
    [
        {"return_value": httpx.Response(500, json={"error": "upstream exploded"})},
        {"return_value": httpx.Response(429, json={"error": "rate limited"})},
        {"return_value": httpx.Response(200, text="<html>not json</html>")},
        {"return_value": httpx.Response(200, json={"unexpected": "shape"})},
        {"side_effect": httpx.ReadTimeout("slow")},
        {"side_effect": httpx.ConnectError("dns")},
    ],
)
def test_llm_failure_returns_stable_message(client, mock_kwargs):
    respx.post(GROQ_API_URL).mock(**mock_kwargs)

    response = client.post(
        "/ask", json={"question": "Loopers 백엔드에서 쓴 메시지 큐는?"}
    )

    assert response.status_code == 200
    body = response.json()
    assert body["answer"] == ERROR_MESSAGES["ko"]
    assert body["sources"] == []


@respx.mock
def test_llm_failure_does_not_leak_upstream_detail(client):
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(
            401, json={"error": {"message": "Invalid API key: test-key"}}
        )
    )

    answer = client.post(
        "/ask", json={"question": "Loopers 백엔드에서 쓴 메시지 큐는?"}
    ).json()["answer"]

    assert "test-key" not in answer
    assert "401" not in answer
    assert "Invalid API key" not in answer


def test_missing_api_key_returns_config_message(client_without_key):
    response = client_without_key.post(
        "/ask", json={"question": "Loopers 백엔드에서 쓴 메시지 큐는?"}
    )

    body = response.json()
    assert response.status_code == 200
    assert body["sources"] == []
    assert "설정되지" in body["answer"]
    assert "GROQ_API_KEY" not in body["answer"]


# ── 구조화 로그 / 관측 ─────────────────────────────────────────────────


@respx.mock
def test_structured_log_omits_question_text(client, caplog):
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload())
    )
    question = "Loopers 백엔드에서 쓴 메시지 큐는?"

    with caplog.at_level("INFO", logger="rag.api"):
        client.post("/ask", json={"question": question})

    completed = [
        json.loads(record.message)
        for record in caplog.records
        if record.name == "rag.api" and '"ask_completed"' in record.message
    ]
    assert completed, "ask_completed 로그가 없습니다."

    event = completed[-1]
    assert question not in json.dumps(event, ensure_ascii=False)
    assert event["question_length"] == len(question)
    assert len(event["question_hash"]) == 12
    assert event["language"] == "ko"
    assert event["prompt_version"] == PROMPT_VERSION
    assert event["no_evidence"] is False
    assert event["source_count"] > 0
    assert event["retrieval_ms"] >= 0
    assert event["llm_ms"] >= 0
    assert event["total_ms"] >= 0
    assert event["score_summary"]["count"] > 0
    assert "request_id" in event


@respx.mock
def test_no_evidence_is_logged(client, caplog):
    with caplog.at_level("INFO", logger="rag.api"):
        client.post("/ask", json={"question": "서민주의 토익 점수는?"})

    events = [
        json.loads(r.message) for r in caplog.records if '"ask_completed"' in r.message
    ]
    assert events[-1]["no_evidence"] is True
    assert events[-1]["status"] == "no_evidence"
    assert events[-1]["llm_ms"] is None


@respx.mock
def test_llm_error_type_is_logged(client, caplog):
    respx.post(GROQ_API_URL).mock(side_effect=httpx.ReadTimeout("slow"))

    with caplog.at_level("INFO", logger="rag.api"):
        client.post("/ask", json={"question": "Loopers 백엔드에서 쓴 메시지 큐는?"})

    events = [
        json.loads(r.message) for r in caplog.records if '"ask_failed"' in r.message
    ]
    assert events[-1]["error_type"] == "timeout"


@respx.mock
def test_metrics_endpoint_counts_requests(client):
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload())
    )

    client.post("/ask", json={"question": "Loopers 백엔드에서 쓴 메시지 큐는?"})
    client.post("/ask", json={"question": "서민주의 토익 점수는?"})
    respx.post(GROQ_API_URL).mock(side_effect=httpx.ReadTimeout("slow"))
    client.post("/ask", json={"question": "Loopers 백엔드에서 쓴 메시지 큐는?"})

    metrics = client.get("/metrics").json()

    assert metrics["request_count"] == 3
    assert metrics["no_evidence_count"] == 1
    assert metrics["llm_error_count"] == 1
    assert metrics["errors_by_type"] == {"timeout": 1}
    assert metrics["request_latency_ms"]["count"] == 3
    assert metrics["request_latency_ms"]["p50"] >= 0


def test_health_endpoint_reports_index(client):
    body = client.get("/health").json()

    assert body["status"] == "ok"
    assert body["index_ready"] is True
    assert body["chunk_count"] > 0
    assert body["prompt_version"] == PROMPT_VERSION
    assert body["chunk_size"] == 800
    assert body["chunk_overlap"] == 150


# ── 프론트엔드 호환 계약 ───────────────────────────────────────────────


@respx.mock
@pytest.mark.parametrize(
    "question",
    [
        "Loopers 백엔드에서 쓴 메시지 큐는?",  # 정상
        "서민주의 토익 점수는?",  # no-evidence
    ],
)
def test_response_shape_is_stable(client, question):
    """Next.js 의 AskResponse{answer, sources} 계약을 항상 지켜야 한다."""
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload())
    )

    body = client.post("/ask", json={"question": question}).json()

    assert isinstance(body["answer"], str) and body["answer"]
    assert isinstance(body["sources"], list)
    assert all(isinstance(s, str) for s in body["sources"])


def test_lifespan_closes_http_client(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")

    with TestClient(api_module.app):
        assert api_module.http_client is not None
        client_ref = api_module.http_client

    assert client_ref.is_closed
    assert api_module.http_client is None
