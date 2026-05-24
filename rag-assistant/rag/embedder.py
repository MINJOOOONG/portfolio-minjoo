"""임베딩 및 벡터스토어: sentence-transformers 로컬 임베딩 + FAISS 저장/로드."""

import os
from pathlib import Path

from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS


VECTORSTORE_DIR = "vectorstore"


def get_embeddings() -> HuggingFaceEmbeddings:
    """sentence-transformers 로컬 임베딩 모델을 반환합니다."""
    model_name = os.getenv(
        "EMBEDDING_MODEL", "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    )
    return HuggingFaceEmbeddings(model_name=model_name)


def build_vectorstore(chunks: list[Document]) -> FAISS:
    """Document chunk 리스트를 임베딩하여 FAISS 벡터스토어를 생성하고 로컬에 저장합니다."""
    embeddings = get_embeddings()
    vectorstore = FAISS.from_documents(chunks, embeddings)
    vectorstore.save_local(VECTORSTORE_DIR)
    return vectorstore


def load_vectorstore() -> FAISS:
    """로컬에 저장된 FAISS 벡터스토어를 로드합니다."""
    if not Path(VECTORSTORE_DIR).exists():
        raise FileNotFoundError(
            "벡터스토어가 존재하지 않습니다. 먼저 '벡터스토어 빌드'를 실행해주세요."
        )

    embeddings = get_embeddings()
    return FAISS.load_local(
        VECTORSTORE_DIR, embeddings, allow_dangerous_deserialization=True
    )
