import { getSettings, parseJsonSetting } from "@/lib/settings";
import { About } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/profile";
import { Experience, type ExperienceItem } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Articles } from "@/components/sections/articles";
import { Skills } from "@/components/sections/skills";

import { type CertificationItem, type EducationItem } from "@/components/sections/education";
import { SceneLayout } from "@/components/shared/scene-layout";
import { isArticleProject } from "@/lib/project-groups";
import { applyCurrentExperienceContent } from "@/lib/experience-content";
import { getPublishedProjects } from "@/lib/project-catalog";

export async function PortfolioPage() {
  const settings = await getSettings();

  const experienceData = applyCurrentExperienceContent(parseJsonSetting<ExperienceItem[]>(settings, "experience_data", []));
  const projectData = await getPublishedProjects(settings.project_data);
  const skillsData = parseJsonSetting<Record<string, string[]>>(settings, "skills_data", {});
  const educationData = parseJsonSetting<EducationItem[]>(settings, "education_data", []);
  const certificationData = parseJsonSetting<CertificationItem[]>(settings, "certifications_data", []);
  const articleData = projectData.filter(isArticleProject);

  const sections = [
    <About key="about" content={settings.about_content || ""} />,
    <Experience key="experience" items={experienceData} />,
    <Projects key="projects" items={projectData} />,
    <Articles key="articles" items={articleData} />,
    <Skills key="skills" data={skillsData} />,
    <ContactSection key="contact" educationItems={educationData} certificationItems={certificationData} />,
  ];

  return <SceneLayout sections={sections} />;
}
