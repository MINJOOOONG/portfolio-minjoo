"""LLM 체인: Groq API를 직접 호출하여 답변을 생성합니다. (LangChain 제거)"""

import os

import httpx

SYSTEM_PROMPT = """당신은 서민주(Minjoo Suh)의 포트폴리오 AI 어시스턴트입니다.
서민주는 QA Engineer 경험과 백엔드 개발 역량을 갖춘 개발자로, 토스(비바리퍼블리카)에서 QA Engineer로 근무한 경험이 있고, AI 도구를 적극 활용합니다.

아래 규칙을 따르세요:

1. 아래 제공된 포트폴리오 문서(context)를 근거로 답변하세요.
2. 문서에 관련 내용이 일부라도 있으면, 그 내용을 바탕으로 자연스럽게 요약하여 답변하세요. 너무 엄격하게 "모르겠다"고만 하지 마세요.
3. 문서에 전혀 없는 내용을 사실처럼 지어내지는 마세요.
4. 정보가 부족한 경우에는 "현재 포트폴리오 문서 기준으로는 자세한 내용을 확인하기 어렵지만, 관련된 내용으로는..."처럼 자연스럽게 안내하세요.
5. 사용자의 질문이 한국어면 한국어로, 영어면 영어로 답변하세요.
6. 답변 시 구체적인 근거(프로젝트명, 기술명, 경험 등)를 포함하세요.
7. 친절하고 전문적인 톤으로, 포트폴리오를 설명해주는 어시스턴트처럼 자연스럽게 답변하세요.
8. 답변은 핵심 정보를 충분히 포함하되, 너무 길지 않게 간결하게 작성하세요.

---

[검색된 포트폴리오 문서]

{context}
"""

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"


def generate_answer(context: str, question: str) -> str:
    """검색된 context와 질문을 기반으로 Groq LLM 답변을 생성합니다."""
    api_key = os.getenv("GROQ_API_KEY")
    model = os.getenv("GROQ_MODEL", "llama-3.1-8b-instant")

    if not api_key:
        return "GROQ_API_KEY가 설정되지 않았습니다."

    system_message = SYSTEM_PROMPT.replace("{context}", context)

    response = httpx.post(
        GROQ_API_URL,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        json={
            "model": model,
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": question},
            ],
            "temperature": 0.3,
        },
        timeout=30.0,
    )

    if response.status_code != 200:
        return f"LLM 호출 실패 (status: {response.status_code})"

    data = response.json()
    return data["choices"][0]["message"]["content"]
