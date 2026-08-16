"""질문 언어 감지: 한국어/영어 응답 분기와 로그 라벨링에 사용합니다."""

from __future__ import annotations

import re

_HANGUL = re.compile(r"[가-힣]")
_LATIN = re.compile(r"[A-Za-z]")


def detect_language(text: str) -> str:
    """질문 언어를 'ko' 또는 'en' 으로 판별합니다.

    한글이 하나라도 있으면 한국어로 봅니다. 한국어 질문에 영어 기술명이
    섞이는 경우(예: "FastAPI 어떻게 썼나요?")가 흔하기 때문입니다.
    한글이 전혀 없고 라틴 문자가 있으면 영어로 봅니다.
    그 외(숫자·기호만 있는 경우)는 기본값 'ko' 입니다.
    """
    if _HANGUL.search(text):
        return "ko"
    if _LATIN.search(text):
        return "en"
    return "ko"
