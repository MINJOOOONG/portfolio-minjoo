export interface ProjectMedia {
  type: "image" | "video" | "pdf";
  url: string;
  title?: string;
}

export interface ProjectAttachment {
  type: "pdf" | "file";
  title: string;
  url: string;
}

export interface CaseStudyBlock {
  heading: string;
  body: string[];
}

export type ContentBlock =
  | { type: "text"; heading?: string; body: string[] }
  | { type: "image"; url: string; caption?: string }
  | { type: "video"; url: string; caption?: string }
  | { type: "pdf"; url: string; caption?: string }
  | { type: "audio"; url: string; caption?: string }
  | { type: "file"; url: string; title: string }
  | { type: "section-heading"; title: string }
  | { type: "code"; title: string; language: string; code: string }
  | { type: "callout"; variant: "problem" | "solution" | "info"; title: string; body: string[] }
  | { type: "tech-grid"; items: { name: string; reason: string }[] }
  | { type: "point-cards"; items: { title: string; body: string }[] }
  | { type: "design-rules"; image?: string; images?: { url: string; title?: string }[]; placeholder?: string; rules: { title: string; body: string }[] }
  | { type: "feature-block"; title: string; body: string[]; code?: { title: string; code: string } }
  | { type: "rag-pipeline"; diagram: { steps: string[] }; description: string[]; troubleshooting?: string };

export interface ProjectItem {
  title: string;
  teamSize: string;
  period: string;
  summary: string;
  description: string[];
  techStack: string[];
  media?: ProjectMedia;
  gallery?: ProjectMedia[];
  attachments?: ProjectAttachment[];
  githubUrl?: string;
  liveUrl?: string;
  blogUrl?: string;
  caseStudy?: CaseStudyBlock[];
  contentBlocks?: ContentBlock[];
  achievement?: string;
  role?: string;
  category?: "project" | "activity";
  titleEn?: string;
  summaryEn?: string;
  descriptionEn?: string[];
  teamSizeEn?: string;
  roleEn?: string;
  achievementEn?: string;
  periodEn?: string;
  contentBlocksEn?: ContentBlock[];
}

export interface ProjectsProps {
  items: ProjectItem[];
}
