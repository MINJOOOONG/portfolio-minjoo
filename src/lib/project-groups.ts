export interface GroupableProject {
  title: string;
  techStack?: string[];
  media?: {
    type?: string;
  };
}

export function isArticleProject(project: GroupableProject) {
  const techStack = project.techStack ?? [];

  return (
    project.title.includes("FSM과 BT") ||
    (project.media?.type === "pdf" &&
      techStack.includes("FSM") &&
      techStack.includes("Behavior Tree"))
  );
}
