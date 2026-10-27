"""Evaluate grounded answers; unavailable verification is never a success."""
from __future__ import annotations

import json
import logging
import os

import anthropic
from pydantic import BaseModel, ConfigDict, Field, StrictBool

from agent.prompts import VERIFICATION_PROMPT
from rag.config import get_settings

logger = logging.getLogger("agent.verification")


class AccuracyAssessment(BaseModel):
    model_config = ConfigDict(extra="forbid")
    is_accurate: StrictBool
    confidence: float = Field(ge=0.0, le=1.0)
    issues: list[str]
    summary: str


def unavailable_verification(reason: str) -> dict:
    return {
        "status": "unavailable",
        "is_accurate": None,
        "confidence": 0.0,
        "issues": [reason],
        "summary": reason,
    }


async def check_answer_accuracy(question: str, answer: str, evidence: str) -> dict:
    if not evidence.strip():
        return unavailable_verification("검증할 근거가 없습니다.")
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return unavailable_verification("답변 검증을 사용할 수 없습니다.")

    prompt = VERIFICATION_PROMPT.format(question=question, evidence=evidence, answer=answer)
    try:
        async with anthropic.AsyncAnthropic(
            api_key=api_key, timeout=get_settings().read_timeout, max_retries=0,
        ) as client:
            response = await client.messages.create(
                model=get_settings().claude_model, max_tokens=512,
                messages=[{"role": "user", "content": prompt}],
            )
        text = "\n".join(b.text for b in response.content if b.type == "text").strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1].rsplit("```", 1)[0].strip()
        assessment = AccuracyAssessment.model_validate(json.loads(text))
        return {
            **assessment.model_dump(),
            "status": "verified" if assessment.is_accurate else "unverified",
        }
    except Exception as exc:
        # Never send SDK response bodies or credentials to the caller.
        logger.warning("verification_failed type=%s", type(exc).__name__)
        return unavailable_verification("답변 검증을 완료하지 못했습니다.")
