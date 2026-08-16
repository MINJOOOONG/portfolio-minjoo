"""키워드 기반 검색 인덱스: 순수 Python TF-IDF 구현 (메모리 경량화)

점수 설계
---------
검색 점수는 **IDF 가중 질의 커버리지**입니다. 즉 "질문이 담고 있는 정보량 중
몇 퍼센트가 이 청크 안에서 발견되는가"를 0.0 ~ 1.0 범위로 계산합니다.

    score = Σ(질의 토큰 weight × 매칭 강도) / Σ(질의 토큰 weight)

* weight  : 해당 토큰 IDF의 제곱. 코퍼스에 아예 없는 토큰도 IDF 상한값을 받습니다.
            제곱을 쓰는 이유는, "서민주의 **블록체인** 프로젝트 경험"처럼
            흔한 토큰 여러 개 + 코퍼스에 없는 핵심 토큰 하나로 이루어진 질문에서
            선형 IDF 가중치로는 흔한 토큰들이 점수를 끌어올려 근거 없는 질문이
            통과했기 때문입니다. 제곱하면 변별력 있는 토큰이 점수를 지배합니다.
* 매칭 강도: 정확 토큰 일치 1.0 > 어간(접두) 일치 0.7 > 부분 문자열 0.5 / 0.3

점수가 [0, 1] 로 정규화되어 있으므로 문서 길이나 질문 길이와 무관하게
하나의 threshold 로 "근거 없음"을 판정할 수 있습니다. threshold 는
`RAG_SCORE_THRESHOLD` 환경변수로 조절합니다.
"""

from __future__ import annotations

import math
import re
from collections import Counter

from rag.config import DEFAULT_SCORE_THRESHOLD, DEFAULT_TOP_K

# 매칭 강도 계수
_EXACT = 1.0
_STEM = 0.7
_SUBSTRING = 0.5
_STEM_SUBSTRING = 0.3

# 질의에서만 제거하는 불용어. 문서에 등장하지 않는 의문사·종결어미가
# IDF 상한 가중치를 받아 점수를 왜곡하는 것을 막습니다.
_QUERY_STOPWORDS = {
    # 한국어 의문사·지시어·기능어
    "무엇", "무슨", "어떤", "어떻게", "어디", "언제", "누구", "왜", "얼마나",
    "얼마", "있나요", "있는지", "인가요", "입니까", "합니까", "했나요", "하나요",
    "알려줘", "알려주세요", "설명", "설명해줘", "설명해주세요", "말해줘",
    "정리해줘", "요약해줘", "뭐야", "뭔가요", "뭐였어", "뭘로", "관련",
    "대해", "대한", "그리고", "궁금", "궁금해요", "주세요", "해줘", "해주세요",
    "하는", "하고", "해서", "이런", "그런", "저런", "때문", "위해", "통해",
    "때", "것", "거기", "여기", "정말", "진짜", "그냥", "다시", "직접",
    # 2글자 구어체 활용형. _stem_variants 는 3글자 이상만 처리하므로
    # 이 형태들은 어간 분리로 걸러지지 않아 따로 나열합니다.
    "했어", "했지", "했나", "했음", "하지", "있어", "없어", "였어", "됐어",
    "되나", "인가", "일까", "어때", "이야", "이지", "하며", "해야",
    # 내용어처럼 보이지만 변별력이 없는 일반 명사.
    # 이 코퍼스에 없다는 이유만으로 미등장 토큰 취급되어 answerable 질문의
    # 점수를 끌어내리던 단어들입니다. (예: "졸업논문 **주제**는 무엇인가요")
    "주제", "진로", "이유", "내용", "방식", "부분", "경우", "정도", "수준",
    "목적", "결과", "과정", "상황", "방법", "기준", "사례", "특징", "장점",
    "단점", "경험", "활동", "업무", "이름", "종류", "가지", "이야기", "생각",
    "의미", "역할", "기간", "시절", "당시",
    # 영어 기능어
    "what", "which", "who", "whom", "whose", "when", "where", "why", "how",
    "is", "are", "was", "were", "be", "been", "being", "do", "does", "did",
    "the", "a", "an", "of", "in", "on", "at", "to", "for", "with", "about",
    "and", "or", "but", "that", "this", "these", "those", "it", "its",
    "can", "could", "would", "should", "will", "shall", "may", "might",
    "have", "has", "had", "there", "here", "you", "your", "please", "tell",
    "me", "explain", "describe", "any", "some", "does", "did", "into",
    "project", "projects", "experience", "work", "use", "used", "using",
    "make", "made", "thing", "things", "kind", "name", "time", "year", "years",
}


def _tokenize(text: str) -> list[str]:
    """한글, 영문, 숫자를 토큰으로 분리합니다."""
    text = text.lower()
    tokens = re.findall(r"[가-힣]+|[a-z]+|[0-9]+", text)
    # 1글자 한글은 조사일 가능성이 높으므로 제거
    return [t for t in tokens if len(t) > 1 or not re.match(r"[가-힣]", t)]


# 한국어 조사·어미 사전. 형태소 분석기 없이 어간을 뽑기 위한 휴리스틱입니다.
#
# 초기 구현은 "한글 토큰의 모든 2자 이상 접두어"를 어간 후보로 삼았지만,
# 그러면 코퍼스에 없는 "블록체인"이 "블록"(코드 블록/블록 타입)에 매칭되어
# 근거 없는 질문이 높은 점수를 받았습니다. 접미사 사전으로 제한하면
# "블록체인" → 후보 없음, "구현했나요" → "구현" 처럼 의도한 경우만 남습니다.
_KOREAN_SUFFIXES = (
    # 조사 (긴 것부터)
    "이라고는", "에서부터", "에게서", "으로는", "으로도", "에서는", "이라고",
    "에서도", "까지는", "부터는", "라고는", "한테는", "이라는", "에서", "에게",
    "한테", "부터", "까지", "보다", "처럼", "라고", "이나", "이랑", "으로",
    "만을", "만의", "에는", "에도", "과는", "와는", "라는", "다는", "이란",
    "이며", "면서", "지만", "거나", "은", "는", "이", "가", "을", "를", "의",
    "에", "와", "과", "도", "만", "로", "랑", "나", "란", "며",
    # 어미 (평서·의문·관형·연결)
    "했습니까", "했습니다", "됐습니다", "되었나요", "었습니다", "았습니다",
    "였습니다", "았었나요", "었었나요", "하였나요", "했었나요", "하셨나요",
    "합니까", "합니다", "했나요", "했어요", "하나요", "인가요", "입니까",
    "입니다", "였나요", "됐나요", "되나요", "됩니까", "됩니다", "습니까",
    "습니다", "었나요", "았나요", "하는지", "이었던", "이지만", "일까요",
    "인지", "는지", "은지", "인데", "는데", "은데", "을까", "일까",
    "했던", "았던", "었던", "였던", "하는", "하고", "하며", "해서", "하지",
    "했을", "했어", "았어", "었어", "였어", "된", "되는", "이었", "였다",
    "이다", "했다", "한다", "나요", "어요", "아요", "했", "함", "한", "던",
)


def _stem_variants(token: str) -> list[str]:
    """한글 토큰에서 조사·어미를 떼어낸 어간 후보를 만듭니다.

    "검색했나요" → "검색", "프로젝트에서는" → "프로젝트" 처럼 조사/어미가
    붙은 형태를 원형으로 되돌립니다. 최대 두 번까지 연쇄로 떼어 냅니다
    (예: "프로젝트에서는" = 프로젝트 + 에서 + 는).
    """
    if len(token) < 3 or not re.match(r"[가-힣]", token):
        return []

    variants: list[str] = []
    frontier = [token]
    for _ in range(2):
        next_frontier: list[str] = []
        for candidate in frontier:
            for suffix in _KOREAN_SUFFIXES:
                if not candidate.endswith(suffix):
                    continue
                stem = candidate[: -len(suffix)]
                if len(stem) < 2:
                    continue
                if stem not in variants:
                    variants.append(stem)
                    next_frontier.append(stem)
        frontier = next_frontier
        if not frontier:
            break

    return variants


class KeywordIndex:
    """TF-IDF 기반 키워드 검색 인덱스 (순수 Python)"""

    def __init__(self, chunks: list[dict]):
        self.chunks = chunks
        self.doc_tokens: list[list[str]] = []
        self.doc_token_sets: list[set[str]] = []
        self.doc_texts: list[str] = []
        self.df: Counter = Counter()
        self.idf: dict[str, float] = {}
        self.default_idf: float = 1.0
        self._build_index()

    def _build_index(self) -> None:
        """청크들의 토큰화 및 IDF 계산"""
        n = len(self.chunks)

        for chunk in self.chunks:
            content = chunk.get("page_content", "")
            tokens = _tokenize(content)
            self.doc_tokens.append(tokens)
            self.doc_token_sets.append(set(tokens))
            self.doc_texts.append(content.lower())
            for token in set(tokens):
                self.df[token] += 1

        for token, count in self.df.items():
            self.idf[token] = math.log((n + 1) / (count + 1)) + 1

        # 코퍼스에 없는 토큰(df=0)이 받는 가중치 = IDF 상한
        self.default_idf = math.log(n + 1) + 1 if n else 1.0

    # ── 질의 정규화 ────────────────────────────────────────────────────

    def canonical_term(self, token: str) -> str:
        """활용형 토큰을 코퍼스에서 가장 흔한 표면형으로 정규화합니다.

        "토스에서"는 experience.md 한 청크에만 통째로 등장하므로 IDF가 매우
        높지만, 다른 청크의 "토스"와는 매칭되지 않습니다. 그대로 두면
        "희귀한데 어디에도 없는 토큰"이 되어 점수를 왜곡합니다.
        토큰과 어간 후보 중 document frequency 가 가장 높은 표면형을 고르면
        "토스에서" → "토스", "서민주의" → "서민주" 로 정규화됩니다.
        코퍼스에 전혀 없는 토큰(예: "블록체인")은 어간 후보도 df=0 이므로
        원형이 그대로 유지되고, 미등장 토큰으로 남습니다.
        """
        best = token
        best_df = self.df.get(token, 0)
        for variant in _stem_variants(token):
            variant_df = self.df.get(variant, 0)
            # df 가 같으면 더 짧은 어간을 고릅니다. "서민주의"와 "서민주"가
            # 같은 청크에만 등장할 때 활용형이 남으면 다른 청크의 "서민주"와
            # 매칭되지 않기 때문입니다.
            if variant_df > best_df or (
                variant_df == best_df and len(variant) < len(best)
            ):
                best, best_df = variant, variant_df
        return best

    def query_terms(self, query: str) -> list[str]:
        """질의를 정규화된 유효 토큰 리스트로 변환합니다.

        불용어 판정은 활용형과 어간 후보 **모두**에 적용합니다. 그래야
        "무엇인가요", "주제는", "얼마인가요" 처럼 어미가 붙은 기능어도
        걸러집니다.
        """
        terms: list[str] = []
        for token in _tokenize(query):
            forms = [token] + _stem_variants(token)
            if any(form in _QUERY_STOPWORDS for form in forms):
                continue
            term = self.canonical_term(token)
            if term not in terms:
                terms.append(term)
        return terms

    # ── 점수 계산 ──────────────────────────────────────────────────────

    def _weighted_terms(self, query: str) -> list[tuple[str, float]]:
        """질의 토큰과 가중치를 한 번만 계산합니다. (청크마다 재계산 방지)"""
        return [(term, self._term_weight(term)) for term in self.query_terms(query)]

    def _term_weight(self, term: str) -> float:
        """질의 토큰의 희소성 가중치 (IDF의 제곱).

        토큰 자체가 코퍼스에 없더라도 어간이 있으면(예: "서민주는" → "서민주")
        어간의 IDF를 씁니다. 그렇지 않으면 활용형이 전부 미등장 토큰으로
        취급되어 IDF 상한 가중치를 받는 왜곡이 생깁니다.
        """
        if term in self.idf:
            return self.idf[term] ** 2

        # "민주"처럼 어휘 토큰("서민주")의 일부인 경우, 미등장 토큰이 아니라
        # 그 어휘 토큰만큼 흔한 것으로 봅니다. (가장 흔한 = 가장 낮은 IDF)
        if len(term) >= 2:
            containing = [
                self.idf[token] for token in self.idf if term in token
            ]
            if containing:
                return min(containing) ** 2

        for variant in _stem_variants(term):
            if variant in self.idf:
                return self.idf[variant] ** 2

        return self.default_idf ** 2

    def _term_strength(self, term: str, doc_index: int) -> float:
        """질의 토큰 하나가 특정 청크에서 얼마나 강하게 매칭되는지."""
        token_set = self.doc_token_sets[doc_index]
        doc_text = self.doc_texts[doc_index]

        if term in token_set:
            return _EXACT

        variants = _stem_variants(term)
        if any(v in token_set for v in variants):
            return _STEM

        if len(term) >= 2 and term in doc_text:
            return _SUBSTRING

        if any(len(v) >= 2 and v in doc_text for v in variants):
            return _STEM_SUBSTRING

        return 0.0

    def score(self, query: str, doc_index: int) -> float:
        """IDF 가중 질의 커버리지를 0.0 ~ 1.0 으로 반환합니다."""
        return self._score_with_weights(self._weighted_terms(query), doc_index)

    def _score_with_weights(
        self,
        weighted_terms: list[tuple[str, float]],
        doc_index: int,
    ) -> float:
        if not weighted_terms:
            return 0.0

        matched = 0.0
        total = 0.0
        for term, weight in weighted_terms:
            total += weight
            matched += weight * self._term_strength(term, doc_index)

        return matched / total if total else 0.0

    def _tf_bonus(self, terms: list[str], doc_index: int) -> float:
        """동점 청크들의 순위를 가르는 소규모 TF 보너스 (0.0 ~ 0.2)."""
        tokens = self.doc_tokens[doc_index]
        if not tokens:
            return 0.0

        counter = Counter(tokens)
        doc_len = len(tokens)
        density = sum(counter.get(term, 0) / doc_len for term in terms)
        return min(density, 0.2)

    # ── 검색 ──────────────────────────────────────────────────────────

    def search(
        self,
        query: str,
        top_k: int = DEFAULT_TOP_K,
        score_threshold: float = DEFAULT_SCORE_THRESHOLD,
    ) -> list[dict]:
        """질문과 관련 있는 청크를 점수와 함께 반환합니다.

        threshold 미만이면 **빈 리스트**를 반환합니다. 코퍼스 앞부분을
        임의로 돌려주는 fallback 은 존재하지 않습니다.
        """
        if top_k <= 0:
            return []

        weighted_terms = self._weighted_terms(query)
        if not weighted_terms:
            return []
        terms = [term for term, _ in weighted_terms]

        scored: list[tuple[float, float, int]] = []
        for index in range(len(self.chunks)):
            relevance = self._score_with_weights(weighted_terms, index)
            if relevance < score_threshold:
                continue
            rank_key = relevance + self._tf_bonus(terms, index)
            scored.append((rank_key, relevance, index))

        scored.sort(key=lambda item: (-item[0], item[2]))

        results: list[dict] = []
        for _, relevance, index in scored[:top_k]:
            result = dict(self.chunks[index])
            result["score"] = round(relevance, 6)
            results.append(result)

        return results


def build_index(chunks: list[dict]) -> KeywordIndex:
    """청크 리스트로 키워드 검색 인덱스를 빌드합니다."""
    return KeywordIndex(chunks)
