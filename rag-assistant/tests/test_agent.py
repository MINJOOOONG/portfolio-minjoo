"""Agent and verification regressions. SDK calls are replaced, never sent."""
from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest
from fastapi.testclient import TestClient

import api
import agent.agent as agent_module
import agent.verification as verification_module
from rag.access import PeerLimiter
from rag.chain import no_evidence_answer
from rag.config import get_settings


class FakeClient:
    def __init__(self, responses):
        self.messages = SimpleNamespace(create=AsyncMock(side_effect=responses))
        self.close = AsyncMock()

    async def __aenter__(self):
        return self

    async def __aexit__(self, *args):
        await self.close()


def response(text):
    return SimpleNamespace(stop_reason="end_turn", content=[SimpleNamespace(type="text", text=text)])


def tool_response(query):
    return SimpleNamespace(stop_reason="tool_use", content=[SimpleNamespace(
        type="tool_use", id="tool-1", name="search_portfolio", input={"query": query},
    )])


async def test_missing_key_is_an_error_not_an_answer(portfolio_index):
    with pytest.raises(agent_module.AgentError, match="not_configured"):
        await agent_module.run_agent("경력은?", [], portfolio_index)


async def test_unsupported_answer_without_tools_is_replaced(monkeypatch, portfolio_index):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "fake-key")
    client = FakeClient([response("서민주는 문서에 없는 회사에서 일했습니다.")])
    monkeypatch.setattr(agent_module.anthropic, "AsyncAnthropic", lambda **_: client)
    result = await agent_module.run_agent("경력은?", [], portfolio_index)
    assert result["answer"] == no_evidence_answer("경력은?")
    assert result["sources"] == []
    assert result["verification"]["status"] == "unavailable"
    assert result["verification"]["is_accurate"] is None
    assert client.messages.create.call_args.kwargs["tool_choice"] == {"type": "any"}
    client.close.assert_awaited_once()


async def test_empty_search_is_not_verification_evidence(monkeypatch, portfolio_index):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "fake-key")
    client = FakeClient([tool_response("양자컴퓨터 큐비트"), response("임의의 답변")])
    monkeypatch.setattr(agent_module.anthropic, "AsyncAnthropic", lambda **_: client)
    verify = AsyncMock()
    monkeypatch.setattr(agent_module, "check_answer_accuracy", verify)
    result = await agent_module.run_agent("양자컴퓨터 큐비트", [], portfolio_index)
    assert result["sources"] == []
    assert result["answer"] == no_evidence_answer("양자컴퓨터 큐비트")
    verify.assert_not_awaited()


async def test_grounded_answer_preserves_sources_and_verification(monkeypatch, portfolio_index):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "fake-key")
    client = FakeClient([tool_response("Loopers Kafka"), response("Kafka를 사용합니다.")])
    monkeypatch.setattr(agent_module.anthropic, "AsyncAnthropic", lambda **_: client)
    verified = {"status": "verified", "is_accurate": True, "confidence": 0.9, "issues": [], "summary": "근거 있음"}
    verify = AsyncMock(return_value=verified)
    monkeypatch.setattr(agent_module, "check_answer_accuracy", verify)
    result = await agent_module.run_agent("Loopers Kafka", [], portfolio_index)
    assert "loopers-backend.md" in result["sources"]
    assert result["verification"] == verified
    assert "Kafka" in verify.call_args.args[2]
    client.close.assert_awaited_once()


async def test_missing_evidence_cannot_be_verified(monkeypatch):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "fake-key")
    result = await verification_module.check_answer_accuracy("질문", "임의의 주장", "")
    assert result["status"] == "unavailable"
    assert result["is_accurate"] is None
    assert result["confidence"] == 0


@pytest.mark.parametrize("text", [
    'not json', '{}', '{"is_accurate":"true","confidence":1,"issues":[],"summary":"ok"}',
    '{"is_accurate":true,"confidence":1.1,"issues":[],"summary":"ok"}',
])
async def test_invalid_verifier_output_is_unavailable(monkeypatch, text):
    monkeypatch.setenv("ANTHROPIC_API_KEY", "fake-key")
    client = FakeClient([response(text)])
    monkeypatch.setattr(verification_module.anthropic, "AsyncAnthropic", lambda **_: client)
    result = await verification_module.check_answer_accuracy("질문", "답변", "문서 근거")
    assert result["status"] == "unavailable"
    assert result["is_accurate"] is None
    client.close.assert_awaited_once()


@pytest.mark.parametrize("accurate,status", [(True, "verified"), (False, "unverified")])
async def test_verifier_distinguishes_pass_and_failure(monkeypatch, accurate, status):
    import json
    monkeypatch.setenv("ANTHROPIC_API_KEY", "fake-key")
    payload = json.dumps({"is_accurate": accurate, "confidence": 0.8, "issues": [], "summary": "검토 결과"})
    client = FakeClient([response(payload)])
    monkeypatch.setattr(verification_module.anthropic, "AsyncAnthropic", lambda **_: client)
    result = await verification_module.check_answer_accuracy("질문", "답변", "문서 근거")
    assert result["status"] == status
    assert result["is_accurate"] is accurate


def test_agent_configuration_failure_returns_503():
    with TestClient(api.app) as client:
        response = client.post("/agent/chat", json={"question": "경력은?"})
    assert response.status_code == 503
    assert "ANTHROPIC" not in response.text


def test_agent_unexpected_error_does_not_leak_details(monkeypatch):
    monkeypatch.setattr(api, "run_agent", AsyncMock(side_effect=RuntimeError("secret-private-detail")))
    with TestClient(api.app) as client:
        response = client.post("/agent/chat", json={"question": "경력은?"})
    assert response.status_code == 503
    assert "secret-private-detail" not in response.text


@pytest.mark.parametrize("body", [
    {"question": "   "},
    {"question": "질문", "history": [{"role": "user", "content": "x"}] * 13},
    {"question": "질문", "history": [{"role": "system", "content": "x"}]},
    {"question": "질문", "history": [{"role": "user", "content": "x" * 4001}]},
])
def test_agent_rejects_unbounded_or_invalid_history(body):
    with TestClient(api.app) as client:
        assert client.post("/agent/chat", json=body).status_code == 422


def test_ai_routes_require_shared_token_when_configured(monkeypatch):
    monkeypatch.setenv("RAG_API_TOKEN", "private-token")
    with TestClient(api.app) as client:
        for path in ("/ask", "/agent/chat"):
            assert client.post(path, json={"question": "hello"}).status_code == 401
        assert client.post("/ask", json={"question": "양자 큐비트"}, headers={"Authorization": "Bearer private-token"}).status_code == 200
        assert client.get("/health").status_code == 200


def test_peer_limit_expires_and_has_bounded_capacity():
    limiter = PeerLimiter(limit=2, window=60, capacity=1)
    assert limiter.consume("first", now=0) == 0
    assert limiter.consume("first", now=1) == 0
    assert limiter.consume("first", now=2) == 58
    assert limiter.consume("second", now=3) > 0
    assert limiter.consume("second", now=60) == 0


@pytest.mark.parametrize("value,expected", [("0", 1), ("-1", 1), ("100", 6)])
def test_agent_turn_budget_is_bounded(monkeypatch, value, expected):
    monkeypatch.setenv("MAX_AGENT_TURNS", value)
    assert get_settings().max_agent_turns == expected
