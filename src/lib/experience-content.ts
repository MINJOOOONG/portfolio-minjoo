import type { ExperienceItem } from "@/components/sections/experience";

const CURRENT_EXPERIENCE_COPY: Record<string, Partial<Pick<ExperienceItem, "role" | "summary" | "summaryEn" | "achievements" | "achievementsEn" | "companyIconUrl" | "companyIconFallback">>> = {
  "Viva Republica (Toss)": {
    companyIconUrl: "https://favicon.im/toss.im?larger=true",
    companyIconFallback: "T",
    summary:
      "커머스 운영 시나리오와 사용자 흐름을 분석하며, 기능 검증 범위와 반복 QA 프로세스를 정리하고 있습니다.",
    summaryEn:
      "Analyzed commerce operational scenarios and user flows while organizing functional verification scope and repetitive QA processes.",
    achievements: [
      "Deus·Notion 기반 기획서를 분석해 운영 시나리오, 검증 조건, 예외 흐름을 기능 단위로 정리했습니다.",
      "TestRail·Jira 기반으로 테스트 케이스, 재현 조건, 처리 상태, Regression Test 범위를 관리했습니다.",
      "Slack 이슈 공유 시 발생 조건, 영향 범위, 담당자 확인 상태를 함께 정리했습니다.",
      "반복 QA 과정에서 발견한 비효율 흐름과 운영 리스크를 개선 포인트로 정리했습니다.",
      "요구사항 변경 시 검증 기준과 확인 범위를 다시 정리하며 배포 전 품질 리스크를 확인했습니다.",
    ],
    achievementsEn: [
      "Analyzed Deus/Notion-based specs to organize operational scenarios, verification conditions, and exception flows by feature.",
      "Managed test cases, reproduction conditions, processing status, and Regression Test scope using TestRail and Jira.",
      "When sharing issues on Slack, documented trigger conditions, impact scope, and assignee confirmation status together.",
      "Identified inefficient flows and operational risks during repetitive QA processes and organized them as improvement points.",
      "Re-organized verification criteria and scope when requirements changed, confirming quality risks before deployment.",
    ],
  },
  Riwonsoft: {
    role: "QA Tester",
    companyIconFallback: "R",
    summary:
      "모바일 게임 출시 전 기능 안정성, 사용자 흐름, UI·서버·아이템 연동을 검증했습니다.",
    summaryEn:
      "Verified functional stability, user flows, and UI/server/item integration before mobile game launches.",
    achievements: [
      "사용자 행동 흐름을 기준으로 기능을 검증하고, 문제 발생 지점을 화면·데이터·서버 응답 관점으로 분류했습니다.",
      "50건 이상 이슈 리포트를 작성하며 재현 경로, 기대 결과, 실제 결과, 발생 조건을 구체화했습니다.",
      "UI·서버·아이템 지급 및 사용 흐름을 교차 검증해 실사용자 관점의 동작을 확인했습니다.",
      "수정 완료 이슈를 반복 테스트하며 재발 여부와 사이드 이펙트를 확인했습니다.",
      "테스트 과정에서 발견한 불편 사항을 바탕으로 UX와 기능 개선 방향을 제안했습니다.",
    ],
    achievementsEn: [
      "Verified features based on user behavior flows and classified problem areas from UI, data, and server response perspectives.",
      "Wrote 50+ issue reports, detailing reproduction paths, expected results, actual results, and trigger conditions.",
      "Cross-verified UI, server, and item distribution/usage flows to confirm real-user-perspective behavior.",
      "Repeatedly tested resolved issues to check for recurrence and side effects.",
      "Proposed UX and feature improvement directions based on pain points discovered during testing.",
    ],
  },
};

export function applyCurrentExperienceContent(items: ExperienceItem[]) {
  return items.map((item) => {
    const currentCopy = CURRENT_EXPERIENCE_COPY[item.company];
    if (!currentCopy) return item;

    return {
      ...item,
      ...currentCopy,
    };
  });
}
