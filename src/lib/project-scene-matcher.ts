export type SceneVariant =
  | "document"
  | "flow"
  | "statemachine"
  | "console"
  | "track"
  | "geometric";

const RULES: { keywords: string[]; variant: SceneVariant }[] = [
  {
    keywords: ["blog", "cms", "markdown", "content", "게시판"],
    variant: "document",
  },
  {
    keywords: ["commerce", "order", "payment", "kafka", "주문", "결제"],
    variant: "flow",
  },
  {
    keywords: ["fsm", "state machine", "behavior", "상태"],
    variant: "statemachine",
  },
  {
    keywords: ["vr", "arduino", "iot", "아두이노"],
    variant: "console",
  },
  {
    keywords: ["deepracer", "racing", "autonomous", "레이싱"],
    variant: "track",
  },
];

export function matchProjectScene(
  title: string,
  techStack: string[]
): SceneVariant {
  const haystack = [title, ...techStack].join(" ").toLowerCase();

  for (const rule of RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw))) {
      return rule.variant;
    }
  }

  return "geometric";
}
