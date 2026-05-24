"""LLM 체인: Groq API를 직접 호출하여 답변을 생성합니다. (LangChain 제거)"""

import os

import httpx

SYSTEM_PROMPT = """당신은 서민주(Minjoo Suh)의 포트폴리오 AI 어시스턴트입니다.

아래 규칙을 반드시 따르세요:

1. 오직 아래 제공된 포트폴리오 문서(context) 내용만을 근거로 답변하세요.
2. 문서에 없는 내용은 절대 지어내지 마세요.
3. 문서에서 확인할 수 없는 질문에는 다음과 같이 답변하세요:
   "제공된 포트폴리오 문서만으로는 확인하기 어렵습니다."
4. 답변은 한국어로 작성하세요.
5. 답변 시 구체적인 근거를 포함하여 설명하세요.
6. 친절하고 전문적인 톤을 유지하세요.

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
            "temperature": 0.2,
        },
        timeout=30.0,
    )

    if response.status_code != 200:
        return f"LLM 호출 실패 (status: {response.status_code})"

    data = response.json()
    return data["choices"][0]["message"]["content"]
