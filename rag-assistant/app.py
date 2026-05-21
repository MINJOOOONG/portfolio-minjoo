"""Minjoo's Portfolio AI Assistant — Streamlit UI"""

import streamlit as st
from dotenv import load_dotenv

from rag.loader import load_documents
from rag.chunker import split_documents
from rag.embedder import build_vectorstore, load_vectorstore
from rag.retriever import retrieve_documents, format_context, get_source_list
from rag.chain import generate_answer

load_dotenv()

# ── 페이지 설정 ──
st.set_page_config(
    page_title="Minjoo's Portfolio AI Assistant",
    page_icon="💼",
    layout="centered",
)

st.title("Minjoo's Portfolio AI Assistant")
st.caption("포트폴리오 문서를 기반으로 답변하는 RAG AI 어시스턴트입니다.")

# ── 사이드바: 벡터스토어 관리 ──
with st.sidebar:
    st.header("벡터스토어 관리")
    st.markdown(
        "처음 사용하거나 문서를 수정한 경우,\n"
        "아래 버튼을 눌러 벡터스토어를 빌드하세요."
    )

    if st.button("🔨 벡터스토어 빌드", use_container_width=True):
        with st.spinner("문서 로드 → 분할 → 임베딩 → 저장 중..."):
            try:
                docs = load_documents("data")
                chunks = split_documents(docs)
                vs = build_vectorstore(chunks)
                st.session_state["vectorstore"] = vs
                st.success(
                    f"빌드 완료! 문서 {len(docs)}개 → 청크 {len(chunks)}개"
                )
            except Exception as e:
                st.error(f"빌드 실패: {e}")

    st.divider()
    st.markdown("**예시 질문:**")
    st.markdown(
        "- 민주는 어떤 프로젝트를 했어?\n"
        "- QA Minjoo Helper는 어떤 문제를 해결한 프로젝트야?\n"
        "- 민주의 강점을 한 문단으로 정리해줘.\n"
        "- AI Agent 직무와 관련 있는 경험을 요약해줘."
    )

# ── 벡터스토어 로드 (세션에 없으면 자동 로드 시도) ──
if "vectorstore" not in st.session_state:
    try:
        st.session_state["vectorstore"] = load_vectorstore()
    except FileNotFoundError:
        pass  # 아직 빌드하지 않은 경우

# ── 채팅 히스토리 초기화 ──
if "messages" not in st.session_state:
    st.session_state["messages"] = []

# ── 기존 메시지 렌더링 ──
for msg in st.session_state["messages"]:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

# ── 사용자 입력 ──
if user_input := st.chat_input("포트폴리오에 대해 궁금한 것을 물어보세요"):
    # 사용자 메시지 표시 및 저장
    st.session_state["messages"].append({"role": "user", "content": user_input})
    with st.chat_message("user"):
        st.markdown(user_input)

    # 벡터스토어 확인
    if "vectorstore" not in st.session_state:
        with st.chat_message("assistant"):
            st.warning(
                "벡터스토어가 아직 빌드되지 않았습니다. "
                "사이드바에서 '벡터스토어 빌드' 버튼을 눌러주세요."
            )
        st.stop()

    # RAG 파이프라인 실행
    with st.chat_message("assistant"):
        with st.spinner("관련 문서 검색 및 답변 생성 중..."):
            try:
                # 1. 질문 → 벡터스토어에서 관련 문서 검색
                retrieved_docs = retrieve_documents(
                    st.session_state["vectorstore"], user_input
                )

                # 2. 검색된 문서 → context 문자열 구성
                context = format_context(retrieved_docs)

                # 3. context + 질문 → LLM 답변 생성
                answer = generate_answer(context, user_input)

                # 4. 답변 표시
                st.markdown(answer)

                # 5. 참고 문서 표시
                sources = get_source_list(retrieved_docs)
                if sources:
                    st.divider()
                    st.markdown(
                        "**📄 참고 문서:** "
                        + ", ".join(f"`{s}`" for s in sources)
                    )

                # 6. 답변 저장
                source_text = ""
                if sources:
                    source_text = (
                        "\n\n---\n**📄 참고 문서:** "
                        + ", ".join(f"`{s}`" for s in sources)
                    )
                st.session_state["messages"].append(
                    {"role": "assistant", "content": answer + source_text}
                )

            except Exception as e:
                st.error(f"답변 생성 중 오류가 발생했습니다: {e}")
