"""프롬프트 및 LLM 클라이언트 테스트 — 실제 Groq API 를 호출하지 않습니다."""

from __future__ import annotations

import httpx
import pytest
import respx

from rag.chain import (
    ERROR_MESSAGES,
    GROQ_API_URL,
    NO_EVIDENCE_MESSAGES,
    PROMPT_VERSION,
    SYSTEM_PROMPT,
    LLMError,
    build_system_prompt,
    build_timeout,
    generate_answer,
    no_evidence_answer,
    user_facing_error,
)


def _ok_payload(content: str = "테스트 답변입니다."):
    return {"choices": [{"message": {"role": "assistant", "content": content}}]}


# ── 프롬프트 정책 ──────────────────────────────────────────────────────


def test_prompt_version_is_a_tracked_constant():
    assert isinstance(PROMPT_VERSION, str)
    assert PROMPT_VERSION == "grounded-v1"


def test_prompt_forbids_going_beyond_context():
    """context 밖의 내용을 추가하지 말라는 규칙이 프롬프트에 있어야 한다."""
    assert "추론하거나" in SYSTEM_PROMPT
    assert "문서 밖의 정보를 덧붙이지 마세요" in SYSTEM_PROMPT


def test_prompt_requires_declaring_missing_evidence():
    assert "근거가 부족하면" in SYSTEM_PROMPT


def test_prompt_separates_fact_from_interpretation():
    assert "해석을 구분" in SYSTEM_PROMPT


def test_prompt_forbids_mixing_projects():
    assert "섞지 마세요" in SYSTEM_PROMPT


def test_prompt_requires_language_matching():
    assert "한국어면 한국어로, 영어면 영어로" in SYSTEM_PROMPT


def test_prompt_does_not_encourage_loose_grounding():
    """'너무 엄격하게 모르겠다고 하지 말라' 류의 문장이 남아 있으면 안 된다."""
    assert "너무 엄격하게" not in SYSTEM_PROMPT
    assert "일부라도 있으면" not in SYSTEM_PROMPT


def test_prompt_makes_no_absolute_claims():
    for phrase in ("환각이 완전히", "절대 틀리지", "100% 정확"):
        assert phrase not in SYSTEM_PROMPT


def test_build_system_prompt_injects_context():
    prompt = build_system_prompt("[문서 1] (출처: a.md)\n내용")
    assert "[문서 1] (출처: a.md)" in prompt
    assert "{context}" not in prompt


# ── no-evidence / 오류 문구 ─────────────────────────────────────────────


def test_no_evidence_message_matches_question_language():
    assert no_evidence_answer("서민주의 취미는?") == NO_EVIDENCE_MESSAGES["ko"]
    assert no_evidence_answer("What is her hobby?") == NO_EVIDENCE_MESSAGES["en"]


def test_no_evidence_message_wording():
    assert NO_EVIDENCE_MESSAGES["ko"] == (
        "현재 포트폴리오 문서에서는 이 질문에 답할 근거를 찾지 못했습니다."
    )
    assert NO_EVIDENCE_MESSAGES["en"] == (
        "I could not find enough evidence in the portfolio documents "
        "to answer this question."
    )


def test_korean_question_with_english_tech_terms_is_korean():
    assert no_evidence_answer("FastAPI는 어떻게 썼나요?") == NO_EVIDENCE_MESSAGES["ko"]


def test_user_facing_error_hides_details():
    message = user_facing_error("질문", "http_server_error")
    assert message == ERROR_MESSAGES["ko"]
    assert "500" not in message
    assert "groq" not in message.lower()


# ── 타임아웃 구성 ──────────────────────────────────────────────────────


def test_timeout_sets_all_four_phases():
    timeout = build_timeout()
    assert timeout.connect is not None
    assert timeout.read is not None
    assert timeout.write is not None
    assert timeout.pool is not None


def test_timeouts_are_configurable(monkeypatch):
    monkeypatch.setenv("RAG_LLM_CONNECT_TIMEOUT", "1.5")
    monkeypatch.setenv("RAG_LLM_READ_TIMEOUT", "2.5")
    timeout = build_timeout()
    assert timeout.connect == 1.5
    assert timeout.read == 2.5


# ── LLM 호출 (respx 로 가로챔) ──────────────────────────────────────────


@respx.mock
async def test_successful_call_returns_answer(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    route = respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload("Kafka를 사용했습니다."))
    )

    answer = await generate_answer("[문서 1] Kafka", "무엇을 썼나요?")

    assert answer == "Kafka를 사용했습니다."
    assert route.called


@respx.mock
async def test_request_carries_prompt_and_model(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    monkeypatch.setenv("GROQ_MODEL", "test-model")
    route = respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload())
    )

    await generate_answer("[문서 1] (출처: a.md)\n근거", "질문입니다")

    request = route.calls[0].request
    import json

    body = json.loads(request.content)
    assert body["model"] == "test-model"
    assert body["messages"][0]["role"] == "system"
    assert "[문서 1] (출처: a.md)" in body["messages"][0]["content"]
    assert "문서 밖의 정보를 덧붙이지 마세요" in body["messages"][0]["content"]
    assert body["messages"][1] == {"role": "user", "content": "질문입니다"}
    assert request.headers["Authorization"] == "Bearer test-key"


@respx.mock
async def test_reuses_injected_client(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload("ok"))
    )

    async with httpx.AsyncClient(timeout=build_timeout()) as client:
        answer = await generate_answer("context", "질문", client=client)
        assert answer == "ok"
        assert not client.is_closed  # 주입한 클라이언트를 닫지 않는다


async def test_missing_api_key_raises(monkeypatch):
    monkeypatch.delenv("GROQ_API_KEY", raising=False)

    with pytest.raises(LLMError) as excinfo:
        await generate_answer("context", "질문")

    assert excinfo.value.error_type == "missing_api_key"


@respx.mock
async def test_timeout_is_normalized(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    respx.post(GROQ_API_URL).mock(side_effect=httpx.ReadTimeout("timed out"))

    with pytest.raises(LLMError) as excinfo:
        await generate_answer("context", "질문")

    assert excinfo.value.error_type == "timeout"


@respx.mock
async def test_connect_timeout_is_normalized(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    respx.post(GROQ_API_URL).mock(side_effect=httpx.ConnectTimeout("no connect"))

    with pytest.raises(LLMError) as excinfo:
        await generate_answer("context", "질문")

    assert excinfo.value.error_type == "timeout"


@respx.mock
async def test_network_error_is_normalized(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    respx.post(GROQ_API_URL).mock(side_effect=httpx.ConnectError("dns failure"))

    with pytest.raises(LLMError) as excinfo:
        await generate_answer("context", "질문")

    assert excinfo.value.error_type == "network_error"


@respx.mock
@pytest.mark.parametrize(
    "status, expected",
    [
        (400, "http_client_error"),
        (401, "http_client_error"),
        (429, "http_client_error"),
        (500, "http_server_error"),
        (503, "http_server_error"),
    ],
)
async def test_http_errors_are_classified(monkeypatch, status, expected):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(status, json={"error": {"message": "boom"}})
    )

    with pytest.raises(LLMError) as excinfo:
        await generate_answer("context", "질문")

    assert excinfo.value.error_type == expected


@respx.mock
async def test_upstream_error_body_is_not_leaked(monkeypatch):
    """외부 API 오류 원문과 key 가 예외 detail 에 실려 나가면 안 된다."""
    monkeypatch.setenv("GROQ_API_KEY", "super-secret-key")
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(
            401, json={"error": {"message": "Invalid API key: super-secret-key"}}
        )
    )

    with pytest.raises(LLMError) as excinfo:
        await generate_answer("context", "질문")

    assert "super-secret-key" not in excinfo.value.detail
    assert "Invalid API key" not in excinfo.value.detail
    assert excinfo.value.detail == "status=401"


@respx.mock
async def test_invalid_json_is_normalized(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, text="not json at all")
    )

    with pytest.raises(LLMError) as excinfo:
        await generate_answer("context", "질문")

    assert excinfo.value.error_type == "invalid_json"


@respx.mock
@pytest.mark.parametrize(
    "payload",
    [
        {},
        {"choices": []},
        {"choices": [{}]},
        {"choices": [{"message": {}}]},
        {"choices": [{"message": {"content": None}}]},
        {"choices": [{"message": {"content": "   "}}]},
        {"choices": "not-a-list"},
    ],
)
async def test_unexpected_schema_is_normalized(monkeypatch, payload):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    respx.post(GROQ_API_URL).mock(return_value=httpx.Response(200, json=payload))

    with pytest.raises(LLMError) as excinfo:
        await generate_answer("context", "질문")

    assert excinfo.value.error_type in {"unexpected_schema", "invalid_json"}


@respx.mock
async def test_answer_is_stripped(monkeypatch):
    monkeypatch.setenv("GROQ_API_KEY", "test-key")
    respx.post(GROQ_API_URL).mock(
        return_value=httpx.Response(200, json=_ok_payload("  답변  \n"))
    )

    assert await generate_answer("context", "질문") == "답변"
