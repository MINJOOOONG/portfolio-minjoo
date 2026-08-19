"""LLM 체인: Groq API를 비동기로 호출하여 답변을 생성합니다.

외부 API 오류 원문과 API key 는 사용자 응답에 절대 노출하지 않습니다.
호출부(api.py)가 로그에 남길 수 있도록 오류 원인은 `LLMError.error_type` 과
`LLMError.detail` 로 분리해 전달합니다.
"""

from __future__ import annotations

import os

import httpx

from rag.config import get_settings
from rag.language import detect_language

# 프롬프트를 수정하면 이 버전을 올리고, 평가 결과에 함께 기록합니다.
PROMPT_VERSION = "grounded-v1"

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

SYSTEM_PROMPT = """당신은 서민주(Minjoo Suh)의 포트폴리오 문서를 근거로만 답변하는 어시스턴트입니다.

[근거 사용 규칙]
1. 아래 [검색된 포트폴리오 문서]에 실제로 적혀 있는 사실만 사용해 답변하세요.
2. 문서에 없는 내용은 추론하거나 일반 상식으로 보충하지 마세요. 문서 밖의 정보를 덧붙이지 마세요.
3. 질문에 답하기에 근거가 부족하면, 어떤 부분이 문서에 없는지 명시하고 확인된 범위까지만 답하세요.
4. 질문이 문서와 다른 전제를 담고 있으면, 문서에 그런 내용이 없다는 점을 먼저 지적한 뒤 문서가 실제로 말하는 바를 설명하세요.
5. 서로 다른 프로젝트의 기술 스택이나 성과를 섞지 마세요. 각 사실은 그것이 등장한 문서의 프로젝트에 귀속시키세요.

[표현 규칙]
6. 문서에 적힌 사실과 당신의 해석을 구분하세요. 해석을 덧붙일 때는 그것이 해석임을 드러내세요.
7. 프로젝트명, 기술명, 기간, 역할처럼 문서에 근거가 있는 구체적인 표현을 사용하세요.
8. 각 문서 앞에 표시된 (출처: 파일명)과 어긋나지 않게 답변하세요.
9. 사용자의 질문이 한국어면 한국어로, 영어면 영어로 답변하세요.
10. 친절하고 전문적인 톤으로, 핵심을 담아 간결하게 작성하세요.
11. 읽기 쉽게 짧은 제목과 bullet list를 기본 형식으로 사용하세요. 표는 사용자가 표를 요청하거나 비교 항목이 많을 때만 사용하세요.

---

[검색된 포트폴리오 문서]

{context}
"""

# 검색 결과가 threshold 미만일 때 LLM을 호출하지 않고 그대로 반환하는 문구
NO_EVIDENCE_MESSAGES = {
    "ko": "현재 포트폴리오 문서에서는 이 질문에 답할 근거를 찾지 못했습니다.",
    "en": (
        "I could not find enough evidence in the portfolio documents "
        "to answer this question."
    ),
}

# 사용자에게 보여주는 안정적인 오류 문구 (외부 오류 원문을 포함하지 않음)
ERROR_MESSAGES = {
    "ko": "답변 생성 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    "en": "Something went wrong while generating the answer. Please try again later.",
}

CONFIG_ERROR_MESSAGES = {
    "ko": "AI 답변 기능이 아직 설정되지 않았습니다.",
    "en": "The AI answering feature is not configured yet.",
}


class LLMError(Exception):
    """LLM 호출 실패. detail 은 서버 로그 전용입니다."""

    def __init__(self, error_type: str, detail: str = ""):
        super().__init__(f"{error_type}: {detail}" if detail else error_type)
        self.error_type = error_type
        self.detail = detail


def no_evidence_answer(question: str) -> str:
    """질문 언어에 맞는 no-evidence 안내 문구를 반환합니다."""
    return NO_EVIDENCE_MESSAGES[detect_language(question)]


def user_facing_error(question: str, error_type: str) -> str:
    """LLMError 를 사용자용 문구로 변환합니다. (원문 오류 비노출)"""
    lang = detect_language(question)
    if error_type == "missing_api_key":
        return CONFIG_ERROR_MESSAGES[lang]
    return ERROR_MESSAGES[lang]


def build_system_prompt(context: str) -> str:
    """context 를 주입한 system 프롬프트를 만듭니다."""
    return SYSTEM_PROMPT.replace("{context}", context)


def build_timeout() -> httpx.Timeout:
    """connect/read/write/pool 타임아웃을 명시적으로 구성합니다."""
    settings = get_settings()
    return httpx.Timeout(
        connect=settings.connect_timeout,
        read=settings.read_timeout,
        write=settings.write_timeout,
        pool=settings.pool_timeout,
    )


async def generate_answer(
    context: str,
    question: str,
    client: httpx.AsyncClient | None = None,
) -> str:
    """검색된 context와 질문을 기반으로 Groq LLM 답변을 비동기로 생성합니다.

    Args:
        context: `format_context()` 결과
        question: 사용자 질문
        client: 재사용할 AsyncClient. 없으면 호출마다 새로 만들고 닫습니다.

    Raises:
        LLMError: API key 누락, 타임아웃, 네트워크 오류, HTTP 오류,
            JSON 파싱 실패, 응답 스키마 불일치
    """
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise LLMError("missing_api_key", "GROQ_API_KEY environment variable is unset")

    settings = get_settings()
    payload = {
        "model": settings.model,
        "messages": [
            {"role": "system", "content": build_system_prompt(context)},
            {"role": "user", "content": question},
        ],
        "temperature": 0.2,
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    if client is not None:
        response = await _post(client, payload, headers)
    else:
        async with httpx.AsyncClient(timeout=build_timeout()) as owned_client:
            response = await _post(owned_client, payload, headers)

    return _parse_answer(response)


async def _post(
    client: httpx.AsyncClient,
    payload: dict,
    headers: dict,
) -> httpx.Response:
    """Groq API 호출. 실패 원인을 LLMError 로 정규화합니다."""
    try:
        response = await client.post(
            GROQ_API_URL,
            json=payload,
            headers=headers,
            timeout=build_timeout(),
        )
        response.raise_for_status()
        return response
    except httpx.TimeoutException as exc:
        raise LLMError("timeout", repr(exc)) from exc
    except httpx.HTTPStatusError as exc:
        status = exc.response.status_code
        kind = "http_client_error" if status < 500 else "http_server_error"
        # 응답 본문에는 키 관련 정보가 들어올 수 있으므로 상태 코드만 남깁니다.
        raise LLMError(kind, f"status={status}") from exc
    except httpx.HTTPError as exc:
        raise LLMError("network_error", repr(exc)) from exc


def _parse_answer(response: httpx.Response) -> str:
    """Groq 응답에서 답변 텍스트를 꺼냅니다."""
    try:
        data = response.json()
    except ValueError as exc:
        raise LLMError("invalid_json", repr(exc)) from exc

    try:
        content = data["choices"][0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise LLMError("unexpected_schema", f"missing field: {exc!r}") from exc

    if not isinstance(content, str) or not content.strip():
        raise LLMError("unexpected_schema", "empty content field")

    return content.strip()
