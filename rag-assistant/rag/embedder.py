"""키워드 기반 검색 인덱스: 순수 Python 구현 (메모리 경량화)"""

import re
import math
from collections import Counter


def _tokenize(text: str) -> list[str]:
    """한글, 영문, 숫자를 토큰으로 분리합니다."""
    text = text.lower()
    # 한글 단어, 영문 단어, 숫자를 추출
    tokens = re.findall(r"[가-힣]+|[a-z]+|[0-9]+", text)
    # 1글자 한글은 조사일 가능성이 높으므로 제거
    return [t for t in tokens if len(t) > 1 or not re.match(r"[가-힣]", t)]


def _extract_keywords(text: str) -> list[str]:
    """질문에서 핵심 키워드를 추출합니다. 한글 2자 이상 서브스트링도 생성."""
    tokens = _tokenize(text)
    keywords = list(tokens)
    for t in tokens:
        # 한글 토큰에서 2자 이상 서브스트링 생성 (조사 제거 효과)
        if re.match(r"[가-힣]", t) and len(t) >= 3:
            for length in range(2, len(t)):
                sub = t[:length]
                if sub not in keywords:
                    keywords.append(sub)
    return keywords


class KeywordIndex:
    """TF-IDF 기반 키워드 검색 인덱스 (순수 Python)"""

    def __init__(self, chunks: list[dict]):
        self.chunks = chunks
        self.doc_tokens: list[list[str]] = []
        self.doc_token_sets: list[set[str]] = []
        self.idf: dict[str, float] = {}
        self._build_index()

    def _build_index(self):
        """청크들의 토큰화 및 IDF 계산"""
        n = len(self.chunks)
        df: Counter = Counter()

        for chunk in self.chunks:
            tokens = _tokenize(chunk["page_content"])
            token_set = set(tokens)
            self.doc_tokens.append(tokens)
            self.doc_token_sets.append(token_set)
            for token in token_set:
                df[token] += 1

        # IDF 계산
        for token, count in df.items():
            self.idf[token] = math.log((n + 1) / (count + 1)) + 1

    def search(self, query: str, top_k: int = 6) -> list[dict]:
        """질문과 가장 관련 있는 청크를 검색합니다."""
        query_tokens = _tokenize(query)
        query_keywords = _extract_keywords(query)
        if not query_tokens:
            return self.chunks[:top_k]

        query_set = set(query_tokens)
        query_keyword_set = set(query_keywords)
        scores: list[tuple[float, int]] = []

        for i, (tokens, token_set) in enumerate(
            zip(self.doc_tokens, self.doc_token_sets)
        ):
            score = 0.0
            token_counter = Counter(tokens)
            doc_len = len(tokens) if tokens else 1
            doc_text = self.chunks[i]["page_content"].lower()

            # 1. 정확 매칭
            overlap = query_set & token_set
            for token in overlap:
                tf = token_counter[token] / doc_len
                idf = self.idf.get(token, 1.0)
                score += tf * idf

            # 2. 부분 매칭: 쿼리 토큰이 문서 토큰의 부분문자열이거나 그 반대
            partial_matches = 0
            for qt in query_tokens:
                if qt in overlap:
                    continue
                for dt in token_set:
                    if qt in dt or dt in qt:
                        idf = self.idf.get(dt, 1.0)
                        score += (token_counter.get(dt, 0) / doc_len) * idf * 0.5
                        partial_matches += 1
                        break

            # 3. 원문 부분문자열 매칭 보너스 (서브스트링 키워드 포함)
            for kw in query_keyword_set:
                if len(kw) >= 2 and kw in doc_text:
                    score += 0.5

            # 커버리지 보너스
            total_matches = len(overlap) + partial_matches
            coverage = total_matches / len(query_set) if query_set else 0
            score *= (1 + coverage)

            scores.append((score, i))

        scores.sort(key=lambda x: x[0], reverse=True)
        results = []
        for score, idx in scores[:top_k]:
            if score > 0:
                results.append(self.chunks[idx])

        return results if results else self.chunks[:top_k]


def build_index(chunks: list[dict]) -> KeywordIndex:
    """청크 리스트로 키워드 검색 인덱스를 빌드합니다."""
    return KeywordIndex(chunks)
