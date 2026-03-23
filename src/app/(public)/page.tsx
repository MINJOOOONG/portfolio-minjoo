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
import Link from "next/link";

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

  return (
    <>
      <Navbar />

      <main className="pb-8">
        <Hero />
        <About content={settings.about_content || ""} />
        <Experience items={experienceData} />
        <Projects items={projectData} />
        <Skills data={skillsData} />
        <EducationCerts education={educationData} certifications={certificationData} />
        <BlogPreview posts={recentPosts} />
      </main>

      <footer className="py-6">
        <div className="max-w-[880px] mx-auto px-5 sm:px-8">
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground/50">
              <span>&copy; {new Date().getFullYear()} joodev</span>
              <Link href="/admin" className="hover:text-muted-foreground transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
