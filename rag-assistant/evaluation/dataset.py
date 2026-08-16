"""평가 데이터셋 로더 및 스키마 검증."""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass, field
from pathlib import Path

CASES_PATH = Path(__file__).resolve().parent / "cases.json"

# 데이터셋이 반드시 포함해야 하는 카테고리
REQUIRED_CATEGORIES = {
    "answerable",
    "unanswerable",
    "false_premise",
    "korean_paraphrase",
    "cross_project_confusion",
    "english",
    "partial_evidence",
}


# retrieval_expectation 이 가질 수 있는 값
RETRIEVAL_EXPECTATIONS = {"evidence", "empty", "unconstrained"}


@dataclass(frozen=True)
class EvalCase:
    id: str
    category: str
    question: str
    retrieval_expectation: str = "evidence"
    expected_sources: list[str] = field(default_factory=list)
    expected_keywords: list[str] = field(default_factory=list)
    should_refuse: bool = False
    note: str = ""

    @property
    def expects_evidence(self) -> bool:
        """검색이 expected_sources 를 찾아와야 하는 케이스인지."""
        return self.retrieval_expectation == "evidence"

    @property
    def expects_empty(self) -> bool:
        """검색이 빈 결과를 반환해야 하는 케이스인지."""
        return self.retrieval_expectation == "empty"


def load_cases(path: Path | str = CASES_PATH) -> list[EvalCase]:
    """cases.json 을 읽어 EvalCase 리스트로 반환합니다."""
    raw = json.loads(Path(path).read_text(encoding="utf-8"))
    cases = [
        EvalCase(
            id=item["id"],
            category=item["category"],
            question=item["question"],
            retrieval_expectation=item.get("retrieval_expectation", "evidence"),
            expected_sources=list(item.get("expected_sources", [])),
            expected_keywords=list(item.get("expected_keywords", [])),
            should_refuse=bool(item.get("should_refuse", False)),
            note=item.get("note", ""),
        )
        for item in raw["cases"]
    ]
    validate_cases(cases)
    return cases


def validate_cases(cases: list[EvalCase]) -> None:
    """데이터셋 자체의 일관성을 검사합니다."""
    if not cases:
        raise ValueError("평가 케이스가 비어 있습니다.")

    ids = [case.id for case in cases]
    duplicates = {i for i in ids if ids.count(i) > 1}
    if duplicates:
        raise ValueError(f"중복된 case id: {sorted(duplicates)}")

    categories = {case.category for case in cases}
    missing = REQUIRED_CATEGORIES - categories
    if missing:
        raise ValueError(f"누락된 카테고리: {sorted(missing)}")

    for case in cases:
        if case.retrieval_expectation not in RETRIEVAL_EXPECTATIONS:
            raise ValueError(
                f"{case.id}: 알 수 없는 retrieval_expectation "
                f"{case.retrieval_expectation!r}"
            )
        if case.expects_evidence and not case.expected_sources:
            raise ValueError(
                f"{case.id}: retrieval_expectation=evidence 인데 "
                "expected_sources 가 없습니다."
            )
        if not case.expects_evidence and case.expected_sources:
            raise ValueError(
                f"{case.id}: retrieval_expectation={case.retrieval_expectation} "
                "인데 expected_sources 가 있습니다."
            )
        if case.expects_evidence and case.should_refuse:
            raise ValueError(
                f"{case.id}: 검색이 근거를 찾아야 하는데 should_refuse=true 입니다."
            )
        if case.retrieval_expectation == "unconstrained" and not case.note:
            raise ValueError(
                f"{case.id}: unconstrained 케이스는 이유를 note 에 적어야 합니다."
            )
        if not case.question.strip():
            raise ValueError(f"{case.id}: question 이 비어 있습니다.")


def dataset_checksum(path: Path | str = CASES_PATH) -> str:
    """데이터셋 파일 내용의 SHA-256 앞 12자리."""
    data = Path(path).read_bytes()
    return hashlib.sha256(data).hexdigest()[:12]


def category_counts(cases: list[EvalCase]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for case in cases:
        counts[case.category] = counts.get(case.category, 0) + 1
    return dict(sorted(counts.items()))


def verify_expected_sources_exist(cases: list[EvalCase], data_dir: Path | str) -> None:
    """expected_sources 가 실제 data/ 파일을 가리키는지 확인합니다."""
    available = {p.name for p in Path(data_dir).glob("*.md")}
    for case in cases:
        unknown = [s for s in case.expected_sources if s not in available]
        if unknown:
            raise ValueError(f"{case.id}: 존재하지 않는 source {unknown}")
