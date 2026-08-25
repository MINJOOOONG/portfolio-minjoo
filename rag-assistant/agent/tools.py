"""Claude API Tool-use 도구 정의 및 실행.

기존 RAG 인프라(KeywordIndex, retriever)를 Claude 도구로 감싸서 제공합니다.
각 도구는 Claude API tool schema + 실행 함수로 구성됩니다.
"""

from __future__ import annotations

from rag.embedder import KeywordIndex
from rag.retriever import format_context, get_source_list, retrieve_documents

# ── Claude API Tool Schemas ──────────────────────────────────────────────

TOOL_DEFINITIONS = [
    {
        "name": "search_portfolio",
        "description": (
            "서민주의 포트폴리오 문서 전체에서 키워드 기반 검색을 수행합니다. "
            "경력, 프로젝트, 학력, 기술 스택 등 일반적인 질문에 사용하세요."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "검색할 키워드 또는 질문",
                },
            },
            "required": ["query"],
        },
    },
    {
        "name": "get_project_details",
        "description": (
            "특정 프로젝트의 상세 정보를 검색합니다. "
            "프로젝트 이름을 알고 있을 때 해당 프로젝트에 대한 "
            "기술 스택, 구현 내용, 성과 등을 자세히 알고 싶을 때 사용하세요."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "project_name": {
                    "type": "string",
                    "description": "프로젝트 이름 (예: 'QA Minjoo Helper', 'Loopers', 'Portfolio RAG')",
                },
            },
            "required": ["project_name"],
        },
    },
    {
        "name": "compare_skills",
        "description": (
            "서민주의 기술 스택을 검색하고 비교합니다. "
            "어떤 기술을 사용할 수 있는지, 특정 기술의 숙련도, "
            "또는 기술 간 비교 질문에 사용하세요."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "skill_query": {
                    "type": "string",
                    "description": "검색할 기술 관련 키워드 (예: 'Python', 'React', 'QA 도구')",
                },
            },
            "required": ["skill_query"],
        },
    },
    {
        "name": "get_contact_info",
        "description": (
            "서민주의 연락처 정보(이메일, GitHub, LinkedIn 등)를 반환합니다. "
            "연락 방법이나 소셜 링크를 묻는 질문에 사용하세요."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
]


# ── 도구 실행 함수 ──────────────────────────────────────────────────────

def execute_tool(
    tool_name: str,
    tool_input: dict,
    index: KeywordIndex,
) -> dict:
    """도구를 실행하고 결과를 반환합니다.

    Returns:
        {"content": str, "sources": list[str]} 형태의 결과
    """
    if tool_name == "search_portfolio":
        return _search_portfolio(tool_input, index)
    elif tool_name == "get_project_details":
        return _get_project_details(tool_input, index)
    elif tool_name == "compare_skills":
        return _compare_skills(tool_input, index)
    elif tool_name == "get_contact_info":
        return _get_contact_info(index)
    else:
        return {"content": f"알 수 없는 도구: {tool_name}", "sources": []}


def _search_portfolio(tool_input: dict, index: KeywordIndex) -> dict:
    """포트폴리오 전체 검색."""
    query = tool_input.get("query", "")
    docs = retrieve_documents(index, query)

    if not docs:
        return {"content": "검색 결과가 없습니다.", "sources": []}

    return {
        "content": format_context(docs),
        "sources": get_source_list(docs),
    }


def _get_project_details(tool_input: dict, index: KeywordIndex) -> dict:
    """특정 프로젝트 상세 검색."""
    project_name = tool_input.get("project_name", "")
    query = f"{project_name} 프로젝트 구현 기술 성과"
    docs = retrieve_documents(index, query, top_k=8)

    if not docs:
        return {
            "content": f"'{project_name}' 프로젝트에 대한 정보를 찾을 수 없습니다.",
            "sources": [],
        }

    return {
        "content": format_context(docs),
        "sources": get_source_list(docs),
    }


def _compare_skills(tool_input: dict, index: KeywordIndex) -> dict:
    """스킬 비교 검색."""
    skill_query = tool_input.get("skill_query", "")
    query = f"기술 스킬 {skill_query}"
    docs = retrieve_documents(index, query)

    if not docs:
        return {
            "content": f"'{skill_query}' 관련 기술 정보를 찾을 수 없습니다.",
            "sources": [],
        }

    return {
        "content": format_context(docs),
        "sources": get_source_list(docs),
    }


def _get_contact_info(index: KeywordIndex) -> dict:
    """연락처 정보 검색."""
    query = "연락처 이메일 GitHub LinkedIn 링크"
    docs = retrieve_documents(index, query)

    if not docs:
        return {"content": "연락처 정보를 찾을 수 없습니다.", "sources": []}

    return {
        "content": format_context(docs),
        "sources": get_source_list(docs),
    }
