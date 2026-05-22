import { getSettings, parseJsonSetting } from "@/lib/settings";
import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/profile";
import { Experience, type ExperienceItem } from "@/components/sections/experience";
import { Projects, type ContentBlock, type ProjectItem } from "@/components/sections/projects";
import { Articles } from "@/components/sections/articles";
import { AILab } from "@/components/sections/ai-lab";
import { Skills } from "@/components/sections/skills";
import { type CertificationItem, type EducationItem } from "@/components/sections/education";
import { SceneLayout } from "@/components/shared/scene-layout";
import { isArticleProject } from "@/lib/project-groups";
import type { ResumeData } from "@/lib/pdf/types";
import { notionProjectAssets } from "../../../prisma/notion-project-assets";

const portfolioDesignRulesBlock = notionProjectAssets.portfolioWebsite.contentBlocks.find(
  (block) => block.type === "design-rules"
) as ContentBlock | undefined;

const portfolioImplementationBlocks = getPortfolioSectionBlocks("04 — 주요 기능");

function getPortfolioSectionBlocks(title: string) {
  const blocks = notionProjectAssets.portfolioWebsite.contentBlocks as unknown as ContentBlock[];
  const start = blocks.findIndex((block) => block.type === "section-heading" && block.title === title);
  if (start < 0) return [];

  const next = blocks.findIndex(
    (block, index) => index > start && block.type === "section-heading"
  );

  return blocks.slice(start, next < 0 ? blocks.length : next);
}

function replacePortfolioImplementationBlocks(blocks: ContentBlock[]) {
  if (portfolioImplementationBlocks.length === 0) return blocks;

  const start = blocks.findIndex(
    (block) =>
      block.type === "section-heading" &&
      (block.title === "04 — 주요 기능 상세" ||
        block.title === "04 — 주요 구현" ||
        block.title === "04 — 주요 기능")
  );
  if (start < 0) return blocks;

  const next = blocks.findIndex(
    (block, index) => index > start && block.type === "section-heading"
  );

  return [
    ...blocks.slice(0, start),
    ...portfolioImplementationBlocks,
    ...blocks.slice(next < 0 ? blocks.length : next),
  ];
}

function removePortfolioLearningImages(blocks: ContentBlock[]) {
  let isLearningSection = false;

  return blocks.filter((block) => {
    if (block.type === "section-heading") {
      isLearningSection = block.title === "07 — 배운 점과 다음 개선 방향";
      return true;
    }

    return !(isLearningSection && block.type === "image");
  });
}

function applyCurrentPortfolioContentBlocks(projects: ProjectItem[]) {
  if (!portfolioDesignRulesBlock) return projects;

  return projects.map((project) => {
    if (project.title !== "포트폴리오 웹사이트" || !project.contentBlocks) {
      return project;
    }

    return {
      ...project,
      contentBlocks: removePortfolioLearningImages(
        replacePortfolioImplementationBlocks(
          project.contentBlocks.map((block) =>
            block.type === "design-rules" ? portfolioDesignRulesBlock : block
          )
        )
      ),
    };
  });
}

export async function PortfolioPage() {
  const settings = await getSettings();

  const experienceData = parseJsonSetting<ExperienceItem[]>(settings, "experience_data", []);
  const projectData = applyCurrentPortfolioContentBlocks(parseJsonSetting<ProjectItem[]>(settings, "project_data", []));
  const skillsData = parseJsonSetting<Record<string, string[]>>(settings, "skills_data", {});
  const educationData = parseJsonSetting<EducationItem[]>(settings, "education_data", []);
  const certificationData = parseJsonSetting<CertificationItem[]>(settings, "certifications_data", []);
  const articleData = projectData.filter(isArticleProject);

  const resumeData: ResumeData = {
    profile: {
      name: "서민주",
      title: "QA Engineer | Backend Developer",
      phone: "+82 10-4948-5089",
      email: "zzz1577@naver.com",
      birthday: "1999.09.21",
      location: "경기도 고양시",
      github: "https://github.com/MINJOOOONG",
      linkedin: "https://www.linkedin.com/in/minjooooo",
      summary:
        "QA 실무와 백엔드 개발 경험을 바탕으로 사용자 불편을 로그, 데이터, 코드, 제품 흐름까지 함께 분석합니다. AI를 적극적으로 활용해 반복 업무를 줄이고, 더 정확한 검증과 빠른 실행이 가능한 서비스를 만드는 데 집중합니다.",
    },
    about: settings.about_content || "",
    experience: experienceData,
    projects: projectData,
    skills: skillsData,
    education: educationData,
    certifications: certificationData,
  };

  const sections = [
    <About key="about" content={settings.about_content || ""} />,
    <Experience key="experience" items={experienceData} />,
    <Projects key="projects" items={projectData} />,
    <AILab key="ai-lab" />,
    <Articles key="articles" items={articleData} />,
    <Skills key="skills" data={skillsData} />,
    <ContactSection key="contact" educationItems={educationData} certificationItems={certificationData} />,
  ];

  return <SceneLayout sections={sections} resumeData={resumeData} />;
}
