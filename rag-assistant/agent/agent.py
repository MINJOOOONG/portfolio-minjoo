"""Claude Tool-use Agent 루프.

Claude API에 도구 정의를 전달하고, tool_use ↔ end_turn 반복으로
최종 답변을 생성합니다.

흐름:
1. 시스템 프롬프트 + 대화 히스토리 + 질문 → Claude API 호출 (with tools)
2. Claude가 tool_use 반환 → 도구 실행 → 결과를 messages에 추가 → 다시 호출
3. Claude가 end_turn 반환 → 최종 답변 추출
4. check_answer_accuracy로 Hallucination 검증
5. 응답 반환
"""

from __future__ import annotations

import logging
import os
import time
from typing import Any

import anthropic

from agent.prompts import AGENT_SYSTEM_PROMPT
from agent.tools import TOOL_DEFINITIONS, execute_tool
from agent.verification import check_answer_accuracy
from rag.config import get_settings
from rag.embedder import KeywordIndex
from rag.language import detect_language

logger = logging.getLogger("agent")


async def run_agent(
    question: str,
    history: list[dict],
    index: KeywordIndex,
) -> dict:
    """Agent 루프를 실행하고 최종 결과를 반환합니다.

    Args:
        question: 사용자 질문
        history: 이전 대화 히스토리 [{"role": "user"|"assistant", "content": str}, ...]
        index: 검색 인덱스

    Returns:
        {
            "answer": str,
            "sources": list[str],
            "tools_used": list[dict],  # [{"name": str, "input": dict}, ...]
            "verification": dict,
            "language": str,
            "agent_turns": int,
        }
    """
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        return _error_response("ANTHROPIC_API_KEY 환경변수가 설정되지 않았습니다.")

    settings = get_settings()
    language = detect_language(question)
    client = anthropic.AsyncAnthropic(api_key=api_key)

    # 대화 히스토리 구성
    messages = _build_messages(history, question)

    tools_used: list[dict] = []
    all_sources: list[str] = []
    all_evidence: list[str] = []
    turns = 0

    started = time.perf_counter()

    try:
        while turns < settings.max_agent_turns:
            turns += 1

            response = await client.messages.create(
                model=settings.claude_model,
                max_tokens=2048,
                system=AGENT_SYSTEM_PROMPT,
                tools=TOOL_DEFINITIONS,
                messages=messages,
            )

            # 응답에서 tool_use와 text 블록 분리
            tool_blocks = [b for b in response.content if b.type == "tool_use"]
            text_blocks = [b for b in response.content if b.type == "text"]

            # end_turn: 도구 호출 없이 텍스트만 반환
            if response.stop_reason == "end_turn" or not tool_blocks:
                answer = "\n".join(b.text for b in text_blocks).strip()
                if not answer:
                    answer = "답변을 생성하지 못했습니다."
                break

            # tool_use: 도구 실행 후 결과 추가
            # assistant 메시지에 전체 content 블록 추가
            messages.append({"role": "assistant", "content": _serialize_content(response.content)})

            tool_results = []
            for tool_block in tool_blocks:
                tool_name = tool_block.name
                tool_input = tool_block.input

                tools_used.append({"name": tool_name, "input": tool_input})

                result = execute_tool(tool_name, tool_input, index)
                all_sources.extend(result.get("sources", []))
                if result.get("content"):
                    all_evidence.append(result["content"])

                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": tool_block.id,
                    "content": result["content"],
                })

            messages.append({"role": "user", "content": tool_results})
        else:
            # max_agent_turns에 도달
            answer = "\n".join(b.text for b in text_blocks).strip() if text_blocks else ""
            if not answer:
                answer = "최대 처리 횟수에 도달했습니다. 질문을 더 구체적으로 해주세요."

    except anthropic.AuthenticationError:
        return _error_response("API 인증에 실패했습니다.")
    except anthropic.RateLimitError:
        return _error_response("API 호출 한도에 도달했습니다. 잠시 후 다시 시도해주세요.")
    except anthropic.APIError as exc:
        logger.error("claude_api_error: %s", str(exc))
        return _error_response("AI 서비스에 일시적인 문제가 발생했습니다.")

    elapsed_ms = round((time.perf_counter() - started) * 1000, 2)

    # 중복 제거된 소스 목록
    unique_sources = _deduplicate(all_sources)

    # Hallucination 검증
    evidence_text = "\n\n---\n\n".join(all_evidence) if all_evidence else ""
    verification = await check_answer_accuracy(question, answer, evidence_text)

    logger.info(
        "agent_completed turns=%d tools=%d sources=%d elapsed_ms=%.2f accurate=%s",
        turns,
        len(tools_used),
        len(unique_sources),
        elapsed_ms,
        verification.get("is_accurate"),
    )

    return {
        "answer": answer,
        "sources": unique_sources,
        "tools_used": tools_used,
        "verification": verification,
        "language": language,
        "agent_turns": turns,
    }


def _build_messages(
    history: list[dict],
    question: str,
) -> list[dict[str, Any]]:
    """대화 히스토리와 현재 질문을 Claude messages 형식으로 변환합니다."""
    messages: list[dict[str, Any]] = []

    for msg in history:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content})

    messages.append({"role": "user", "content": question})
    return messages


def _serialize_content(content_blocks: list) -> list[dict]:
    """Claude 응답의 content 블록을 직렬화합니다."""
    serialized = []
    for block in content_blocks:
        if block.type == "text":
            serialized.append({"type": "text", "text": block.text})
        elif block.type == "tool_use":
            serialized.append({
                "type": "tool_use",
                "id": block.id,
                "name": block.name,
                "input": block.input,
            })
    return serialized


def _deduplicate(items: list[str]) -> list[str]:
    """순서를 유지하면서 중복을 제거합니다."""
    seen: set[str] = set()
    result: list[str] = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result


def _error_response(message: str) -> dict:
    """오류 발생 시 기본 응답."""
    return {
        "answer": message,
        "sources": [],
        "tools_used": [],
        "verification": {
            "is_accurate": True,
            "confidence": 0.0,
            "issues": ["오류로 인해 검증 불가"],
            "summary": message,
        },
        "language": "ko",
        "agent_turns": 0,
    }
