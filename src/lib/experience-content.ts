import type { ExperienceItem } from "@/components/sections/experience";

const CURRENT_EXPERIENCE_COPY: Record<string, Partial<Pick<ExperienceItem, "role" | "summary" | "summaryEn" | "achievements" | "achievementsEn" | "techStack" | "companyIconUrl" | "companyIconFallback">>> = {
  "Viva Republica (Toss)": {
    role: "Toss Core Commerce QA Assistant",
    companyIconUrl: "https://favicon.im/toss.im?larger=true",
    companyIconFallback: "T",
    summary:
      "현재 Toss Core의 Commerce 팀에서 QA Assistant로 근무하며, 주 단위 버전 업데이트와 잦은 배포가 이루어지는 애자일한 모바일 커머스 서비스의 품질 검증을 담당하고 있습니다.",
    summaryEn:
      "I currently work as a QA Assistant on Toss Core's Commerce team, responsible for quality verification of an agile mobile commerce service with weekly version updates and frequent releases.",
    achievements: [
      "주요 업무로는 Web, iOS, Android 환경에서 회귀 테스트와 탐색 테스트를 수행하고 있습니다. Toss 내부 Figma 기반 디자인 시스템인 Deus와 Notion에 정리된 기획서 및 디자인 사양을 확인하며, 신규 기능과 UI/UX 변경 사항이 제품 요구사항, 정책 및 컴플라이언스 기준, 기능 품질 기준에 맞게 동작하는지 검증합니다.",
      "또한 웹에서 등록되거나 변경된 상품 정보가 iOS와 Android 앱에서 정상적으로 노출되고 동작하는지 확인하는 등 커머스 서비스의 end-to-end 흐름을 검증합니다. 새로운 프로젝트가 진행될 때마다 테스트 케이스를 작성하고 수정하며, 예외 케이스를 식별하고 사용자 및 품질 관점에서 의견을 제시합니다.",
      "이슈 발생 시 재현 절차, 기대 결과, 실제 결과, 영향 범위, 발생 조건을 명확히 정리하고, Jira와 Slack을 통해 PM, 디자이너, 엔지니어와 협업하며 이슈를 추적합니다.",
      "또한 업무 과정에서 Claude와 Codex 등 AI Agent를 적극적으로 활용하여 생산성과 문제 해결 효율을 높이고 있습니다. 반복적인 QA 업무의 수작업 부담을 줄이기 위해 간단한 자동화 스크립트나 구조화된 업무 흐름을 만들며, 테스트 효율성과 일관성, 프로세스 품질을 개선하고 있습니다.",
    ],
    achievementsEn: [
      "My main work includes regression and exploratory testing across Web, iOS, and Android. I review Deus, Toss's internal Figma-based design system, along with specs and design requirements documented in Notion, verifying that new features and UI/UX changes meet product requirements, policy and compliance standards, and functional quality criteria.",
      "I verify the end-to-end commerce flow, including whether product information registered or changed on the web is displayed and works correctly in the iOS and Android apps. For each new project, I write and update test cases, identify edge cases, and provide feedback from user and quality perspectives.",
      "When issues occur, I clearly document reproduction steps, expected results, actual results, impact scope, and occurrence conditions, then track issues by collaborating with PMs, designers, and engineers through Jira and Slack.",
      "I also actively use AI Agents such as Claude and Codex to improve productivity and problem-solving efficiency. To reduce manual burden in repetitive QA work, I create simple automation scripts and structured workflows, improving test efficiency, consistency, and process quality.",
    ],
    techStack: ["Web", "iOS", "Android", "Deus", "Notion", "Jira", "Slack", "Claude", "Codex"],
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
