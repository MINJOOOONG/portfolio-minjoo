"""Hallucination 검증: 별도 Claude 호출로 답변 정확성을 평가합니다.

같은 턴에서 자기 검증을 하면 정확도가 낮으므로,
별도의 Claude 호출로 독립적인 검증을 수행합니다.
"""

from __future__ import annotations

import json
import logging
import os

import anthropic

from agent.prompts import VERIFICATION_PROMPT
from rag.config import get_settings

logger = logging.getLogger("agent.verification")


async def check_answer_accuracy(
    question: str,
    answer: str,
    evidence: str,
) -> dict:
    """답변의 정확성을 별도 Claude 호출로 검증합니다.

    Returns:
        {
            "is_accurate": bool,
            "confidence": float (0.0~1.0),
            "issues": list[str],
            "summary": str,
        }
    """
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return _fallback_result("ANTHROPIC_API_KEY not configured")

    if not evidence.strip():
        return {
            "is_accurate": True,
            "confidence": 1.0,
            "issues": [],
            "summary": "근거 없음 응답 — 검증 불필요",
        }

    settings = get_settings()
    client = anthropic.AsyncAnthropic(api_key=api_key)

    prompt = VERIFICATION_PROMPT.format(
        question=question,
        evidence=evidence,
        answer=answer,
    )

    try:
        response = await client.messages.create(
            model=settings.claude_model,
            max_tokens=512,
            messages=[{"role": "user", "content": prompt}],
        )

        text = response.content[0].text.strip()
        # JSON 블록 안에 있을 수 있는 경우 추출
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()

        result = json.loads(text)
        return {
            "is_accurate": result.get("is_accurate", True),
            "confidence": float(result.get("confidence", 0.5)),
            "issues": result.get("issues", []),
            "summary": result.get("summary", ""),
        }

    except json.JSONDecodeError:
        logger.warning("verification_json_parse_error")
        return _fallback_result("검증 응답 파싱 실패")
    except anthropic.APIError as exc:
        logger.warning("verification_api_error: %s", str(exc))
        return _fallback_result(f"API 오류: {exc.status_code}")
    except Exception as exc:
        logger.warning("verification_unexpected_error: %s", str(exc))
        return _fallback_result("예기치 않은 오류")


def _fallback_result(reason: str) -> dict:
    """검증 실패 시 기본 결과."""
    return {
        "is_accurate": True,
        "confidence": 0.0,
        "issues": [reason],
        "summary": f"검증 불가 — {reason}",
    }
