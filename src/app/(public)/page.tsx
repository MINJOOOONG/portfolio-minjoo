import { prisma } from "@/lib/prisma";
import { getSettings, parseJsonSetting } from "@/lib/settings";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience, type ExperienceItem } from "@/components/sections/experience";
import { Projects, type ProjectItem } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { EducationCerts, type EducationItem, type CertificationItem } from "@/components/sections/education";
import { BlogPreview } from "@/components/sections/blog-preview";
import { FadeIn } from "@/components/shared/fade-in";
import Link from "next/link";
import type { ResumeData } from "@/lib/pdf/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, recentPosts] = await Promise.all([
    getSettings(),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
  ]);

  const experienceData = parseJsonSetting<ExperienceItem[]>(settings, "experience_data", []);
  const projectData = parseJsonSetting<ProjectItem[]>(settings, "project_data", []);
  const skillsData = parseJsonSetting<Record<string, string[]>>(settings, "skills_data", {});
  const educationData = parseJsonSetting<EducationItem[]>(settings, "education_data", []);
  const certificationData = parseJsonSetting<CertificationItem[]>(settings, "certifications_data", []);

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

  return (
    <>
      <Navbar resumeData={resumeData} />

      <main className="pb-16">
        <FadeIn>
          <Hero />
        </FadeIn>
        <FadeIn>
          <About content={settings.about_content || ""} />
        </FadeIn>
        <FadeIn>
          <Experience items={experienceData} />
        </FadeIn>
        <FadeIn>
          <Projects items={projectData} />
        </FadeIn>
        <FadeIn>
          <Skills data={skillsData} />
        </FadeIn>
        <FadeIn>
          <EducationCerts education={educationData} certifications={certificationData} />
        </FadeIn>
        <FadeIn>
          <BlogPreview posts={recentPosts} />
        </FadeIn>
      </main>

      <footer className="py-10">
        <div className="max-w-[880px] mx-auto px-5 sm:px-8">
          <div className="pt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground/50">
              <span>&copy; {new Date().getFullYear()} joodev</span>
              <Link href="/admin" className="hover:text-muted-foreground transition-colors duration-200">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
