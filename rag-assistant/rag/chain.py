"""LLM 체인: Groq를 사용하여 검색된 context 기반으로 답변을 생성합니다."""

import os

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

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

USER_PROMPT = "{question}"


def create_chain() -> ChatPromptTemplate:
    """RAG 체인에 사용할 프롬프트 템플릿을 생성합니다."""
    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        ("human", USER_PROMPT),
    ])
    return prompt


def generate_answer(context: str, question: str) -> str:
    """검색된 context와 질문을 기반으로 Groq LLM 답변을 생성합니다.

    Args:
        context: 검색된 문서를 조합한 텍스트
        question: 사용자 질문

    Returns:
        LLM이 생성한 답변 문자열
    """
    llm = ChatGroq(
        model=os.getenv("GROQ_MODEL", "llama-3.1-8b-instant"),
        api_key=os.getenv("GROQ_API_KEY"),
        temperature=0.2,
    )
    prompt = create_chain()
    output_parser = StrOutputParser()

    chain = prompt | llm | output_parser

    answer = chain.invoke({
        "context": context,
        "question": question,
    })

    return answer
