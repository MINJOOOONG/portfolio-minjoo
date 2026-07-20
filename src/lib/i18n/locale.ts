import type { Lang } from "./language-context";

const locale = {
  // ── hero.tsx ──
  "hero.name": { ko: "서민주", en: "Minjoo Suh" },
  "hero.status": { ko: "구직 중", en: "Open to Work" },
  "hero.summary": {
    ko: "QA 실무와 백엔드 개발 경험을 바탕으로 사용자 불편을 로그, 데이터, 코드, 제품 흐름까지 함께 분석합니다.",
    en: "Combining QA expertise and backend development experience to analyze user pain points through logs, data, code, and product flows.",
  },

  // ── about.tsx ──
  "about.readMore": { ko: "자세히 보기", en: "Read more" },

  // ── projects.tsx ──
  "projects.imageFallback": { ko: "이미지를 불러올 수 없습니다", en: "Unable to load image" },
  "projects.overview": { ko: "프로젝트 개요", en: "Project Overview" },
  "projects.implementation": { ko: "주요 구현", en: "Key Implementation" },
  "projects.technicalChallenges": { ko: "기술적 고민", en: "Technical Challenges" },
  "projects.techStack": { ko: "기술 스택", en: "Tech Stack" },
  "projects.results": { ko: "결과 및 배운 점", en: "Results & Lessons Learned" },
  "projects.defaultResult": {
    ko: "프로젝트를 통해 실무 수준의 설계와 구현 역량을 확보했습니다.",
    en: "Gained practical-level design and implementation skills through this project.",
  },
  "projects.projectImage": { ko: "프로젝트 이미지", en: "Project image" },
  "projects.media": { ko: "프로젝트 미디어", en: "Project Media" },
  "projects.viewNewTab": { ko: "새 창으로 보기", en: "View in new tab" },
  "projects.attachments": { ko: "첨부 문서", en: "Attachments" },
  "projects.open": { ko: "열기", en: "Open" },
  "projects.screenCapture": { ko: "화면 캡처", en: "Screenshot" },
  "projects.designRule": { ko: "디자인 규칙", en: "Design Rule" },
  "projects.designRuleRef": { ko: "참고 화면", en: "reference" },
  "projects.copied": { ko: "복사됨!", en: "Copied!" },
  "projects.copyLink": { ko: "링크 복사", en: "Copy Link" },
  "projects.prev": { ko: "이전", en: "Previous" },
  "projects.next": { ko: "다음", en: "Next" },
  "projects.close": { ko: "닫기", en: "Close" },
  "projects.schedule": { ko: "개발일정", en: "Timeline" },
  "projects.teamSize": { ko: "개발인원", en: "Team" },
  "projects.techStackLabel": { ko: "기술스택", en: "Tech Stack" },
  "projects.backToList": { ko: "프로젝트 목록으로 돌아가기", en: "Back to project list" },
  "projects.detail": { ko: "프로젝트 상세", en: "Project Detail" },

  // ── articles.tsx ──
  "articles.heading": { ko: "논문 / 연구", en: "Papers / Research" },
  "articles.copyPageLink": { ko: "페이지 링크 복사", en: "Copy Page Link" },

  // ── entry-loader.tsx ──
  "entry.ariaLabel": { ko: "포트폴리오로 들어가기", en: "Enter portfolio" },

  // ── portfolio-ask-bar.tsx ──
  "ask.openSearch": { ko: "AI 검색 열기", en: "Open AI Search" },
  "ask.placeholder": { ko: "포트폴리오에 대해 질문하세요…", en: "Ask about my work…" },
  "ask.button": { ko: "AI 질문", en: "Ask AI" },
  "ask.error": { ko: "오류가 발생했습니다.", en: "An error occurred." },
  "ask.connectionError": {
    ko: "AI 어시스턴트에 연결할 수 없습니다.",
    en: "Cannot connect to the AI assistant.",
  },

  // ── portfolio-assistant-page.tsx ──
  "assistant.back": { ko: "포트폴리오로 돌아가기", en: "Back to portfolio" },
  "assistant.title": { ko: "RAG AI와 대화 중", en: "Chatting with RAG AI" },
  "assistant.connected": { ko: "RAG AI와 연결했습니다", en: "Connected to RAG AI" },
  "assistant.greeting": {
    ko: "서민주 포트폴리오에 대해\n궁금한 내용을 물어보세요.",
    en: "Ask me anything about\nMinjoo's portfolio.",
  },
  "assistant.description": {
    ko: "프로젝트, 기술 스택, 경험, AI 활용 방식에 대해 답변합니다.",
    en: "I can answer questions about projects, tech stack, experience, and AI usage.",
  },
  "assistant.preparing": { ko: "답변을 준비하고 있습니다", en: "Preparing an answer" },
  "assistant.privacyWarning": {
    ko: "개인정보나 민감한 정보를 입력하지 말아 주세요.",
    en: "Please do not enter personal or sensitive information.",
  },
  "assistant.placeholder": { ko: "메시지를 입력해 주세요", en: "Type your message" },
  "assistant.send": { ko: "메시지 보내기", en: "Send message" },

  // ── ai-lab.tsx ──
  "aiLab.filterAll": { ko: "전체", en: "All" },
  "aiLab.filterCoding": { ko: "코딩", en: "Coding" },
  "aiLab.filterWriting": { ko: "글쓰기", en: "Writing" },
  "aiLab.filterResearch": { ko: "리서치", en: "Research" },
  "aiLab.filterDesign": { ko: "디자인", en: "Design" },
  "aiLab.filterAutomation": { ko: "자동화", en: "Automation" },
  "aiLab.glossarySearch": { ko: "용어 검색...", en: "Search terms..." },
  "aiLab.glossaryTerm": { ko: "용어", en: "Term" },
  "aiLab.glossaryDescription": { ko: "설명", en: "Description" },
  "aiLab.glossaryCategory": { ko: "분류", en: "Category" },
  "aiLab.glossaryNoResults": { ko: "검색 결과가 없습니다.", en: "No results found." },
  "aiLab.viewOriginal": { ko: "원문 보기", en: "View original" },
  "aiLab.viewDoc": { ko: "공식 문서 보기", en: "View official document" },
  "aiLab.source": { ko: "원문", en: "Source" },
  "aiLab.record": { ko: "기록", en: "Record" },
  "aiLab.noPreview": { ko: "미리보기를 표시할 수 없습니다", en: "Preview not available" },
  "aiLab.summary": { ko: "요약", en: "Summary" },
  "aiLab.myTake": { ko: "내 해석", en: "My Take" },
  "aiLab.insight": { ko: "인사이트", en: "Insight" },
  "aiLab.appliedTo": { ko: "적용한 부분", en: "Applied To" },
  "aiLab.useCase": { ko: "사용 방식", en: "Use Case" },
  "aiLab.strengths": { ko: "강점", en: "Strengths" },
  "aiLab.limitations": { ko: "주의할 점", en: "Limitations" },
  "aiLab.myReview": { ko: "내 평가", en: "My Review" },
  "aiLab.safetySubtitle": { ko: "Safety — 위험 요소", en: "Safety — Risk Factors" },
  "aiLab.reviewSubtitle": { ko: "Review Framework — 평가 기준", en: "Review Framework — Evaluation Criteria" },

  // ── portfolio-page.tsx (resume data) ──
  "resume.name": { ko: "서민주", en: "Minjoo Suh" },
  "resume.location": { ko: "경기도 고양시", en: "Goyang, Gyeonggi-do" },
  "resume.summary": {
    ko: "QA 실무와 백엔드 개발 경험을 바탕으로 사용자 불편을 로그, 데이터, 코드, 제품 흐름까지 함께 분석합니다. AI를 적극적으로 활용해 반복 업무를 줄이고, 더 정확한 검증과 빠른 실행이 가능한 서비스를 만드는 데 집중합니다.",
    en: "Combining QA expertise and backend development, I analyze user issues through logs, data, code, and product flows. I actively leverage AI to reduce repetitive work and focus on building services with more accurate verification and faster execution.",
  },
} as const;

export type LocaleKey = keyof typeof locale;

export function l(key: LocaleKey, lang: Lang): string {
  return locale[key][lang];
}

export default locale;
