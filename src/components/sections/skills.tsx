"use client";

import { memo, useCallback, useMemo, useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFigma,
  SiGithub,
  SiGradle,
  SiGraphql,
  SiGreensock,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiRecoil,
  SiRedux,
  SiSass,
  SiStorybook,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
  SiWebpack,
  SiSpringboot,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiPrisma,
  SiFastapi,
  SiPython,
  SiJira,
  SiSlack,
  SiNotion,
  SiLangchain,
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { SlideHeading } from "@/components/sections/about";

/* ── Types ── */
type SkillCategory = "Frontend" | "Backend" | "Library" | "QA" | "Environment & Deploy" | "Design";

interface SkillItem {
  name: string;
  category: SkillCategory;
  icon?: IconType;
  color?: string;
  tileBackground?: string;
  label?: string;
  labelColor?: string;
}

/* ── Categories ── */
const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Library",
  "QA",
  "Environment & Deploy",
  "Design",
];

/* ── Skill data ── */
const SKILLS: SkillItem[] = [
  // Frontend
  { name: "JavaScript", category: "Frontend", icon: SiJavascript, color: "#111111", tileBackground: "#f7df1e" },
  { name: "React", category: "Frontend", icon: SiReact, color: "#00d8ff" },
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript, color: "#3178c6" },
  { name: "Zustand", category: "Frontend", label: "Z", tileBackground: "#211d19", labelColor: "#f5c46b" },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#38bdf8" },
  { name: "Three.js", category: "Frontend", icon: SiThreedotjs, color: "#000000" },

  // Backend
  { name: "Java", category: "Backend", icon: FaJava, color: "#f89820", tileBackground: "#5382a1" },
  { name: "Spring Boot", category: "Backend", icon: SiSpringboot, color: "#6db33f" },
  { name: "Python", category: "Backend", icon: SiPython, color: "#3776ab" },
  { name: "FastAPI", category: "Backend", icon: SiFastapi, color: "#009688" },
  { name: "Prisma", category: "Backend", icon: SiPrisma, color: "#2d3748" },
  { name: "PostgreSQL", category: "Backend", icon: SiPostgresql, color: "#4169e1" },
  { name: "Redis", category: "Backend", icon: SiRedis, color: "#dc382d" },
  { name: "Kafka", category: "Backend", icon: SiApachekafka, color: "#231f20" },
  { name: "REST API", category: "Backend", label: "API", tileBackground: "#2b2d42", labelColor: "#a8dadc" },

  // Library
  { name: "React Query", category: "Library", icon: SiReactquery, color: "#ff4154" },
  { name: "Recoil", category: "Library", icon: SiRecoil, color: "#3578e5" },
  { name: "Redux", category: "Library", icon: SiRedux, color: "#764abc" },
  { name: "LangChain", category: "Library", icon: SiLangchain, color: "#1c3c3c" },
  { name: "FAISS", category: "Library", label: "FA", tileBackground: "#3b5998", labelColor: "#ffffff" },
  { name: "Storybook", category: "Library", icon: SiStorybook, color: "#ff4785" },
  { name: "GraphQL", category: "Library", icon: SiGraphql, color: "#e10098" },
  { name: "GSAP", category: "Library", icon: SiGreensock, color: "#88ce02" },
  { name: "Sass", category: "Library", icon: SiSass, color: "#cc6699" },
  { name: "Webpack", category: "Library", icon: SiWebpack, color: "#8dd6f9" },
  { name: "Vite", category: "Library", icon: SiVite, color: "#646cff" },

  // QA
  { name: "Jira", category: "QA", icon: SiJira, color: "#0052cc" },
  { name: "TestRail", category: "QA", label: "TR", tileBackground: "#65c179", labelColor: "#ffffff" },
  { name: "Redmine", category: "QA", label: "Rm", tileBackground: "#b32024", labelColor: "#ffffff" },
  { name: "Regression Test", category: "QA", label: "RT", tileBackground: "#2b2d42", labelColor: "#ef8354" },
  { name: "TC 설계", category: "QA", label: "TC", tileBackground: "#1b2838", labelColor: "#66c0f4" },

  // Environment & Deploy
  { name: "GitHub", category: "Environment & Deploy", icon: SiGithub, color: "#000000" },
  { name: "Vercel", category: "Environment & Deploy", icon: SiVercel, color: "#000000" },
  { name: "AWS", category: "Environment & Deploy", icon: FaAws, color: "#ff9900", tileBackground: "#232f3e" },
  { name: "Docker", category: "Environment & Deploy", icon: SiDocker, color: "#2496ed" },
  { name: "Gradle", category: "Environment & Deploy", icon: SiGradle, color: "#02303a" },
  { name: "Testcontainers", category: "Environment & Deploy", label: "TC", tileBackground: "#2b2d42", labelColor: "#23d18b" },
  { name: "Slack", category: "Environment & Deploy", icon: SiSlack, color: "#4a154b" },
  { name: "Notion", category: "Environment & Deploy", icon: SiNotion, color: "#000000" },

  // Design
  { name: "Photoshop", category: "Design", label: "Ps", tileBackground: "#001e36", labelColor: "#31a8ff" },
  { name: "Illustrator", category: "Design", label: "Ai", tileBackground: "#330000", labelColor: "#ff9a00" },
  { name: "Premiere Pro", category: "Design", label: "Pr", tileBackground: "#00005b", labelColor: "#9999ff" },
  { name: "Figma", category: "Design", icon: SiFigma, color: "#f24e1e", tileBackground: "#1e1e1e" },
  { name: "Adobe XD", category: "Design", label: "Xd", tileBackground: "#470137", labelColor: "#ff61f6" },
];

/* ── Props ── */
interface SkillsProps {
  data: Record<string, string[]>;
}

/* ── Single tile ── */
function SkillTile({ item }: { item: SkillItem }) {
  const Icon = item.icon;
  const style = {
    "--skill-color": item.color ?? item.labelColor ?? "#111111",
    "--skill-tile-bg": item.tileBackground ?? "#ffffff",
    "--skill-label-color": item.labelColor ?? item.color ?? "#111111",
  } as CSSProperties;

  return (
    <div className="skills-icon-card group" style={style} aria-label={item.name}>
      {Icon ? (
        <Icon className="skills-icon-card__icon" aria-hidden="true" />
      ) : (
        <span className="skills-icon-card__label">{item.label ?? item.name.slice(0, 2)}</span>
      )}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
        {item.name}
      </span>
    </div>
  );
}

/* ── Main component ── */
export const Skills = memo(function Skills({}: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null);

  const visibleSkills = useMemo(
    () => (activeCategory ? SKILLS.filter((s) => s.category === activeCategory) : SKILLS),
    [activeCategory]
  );

  const handleCategory = useCallback((category: SkillCategory) => {
    setActiveCategory((cur) => (cur === category ? null : category));
  }, []);

  return (
    <div
      className="skills-section w-full"
      data-allow-scroll
      style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}
    >
      <div
        data-scroller
        style={{
          height: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          padding: "80px 24px 120px",
          boxSizing: "border-box",
        }}
      >
        {/* Heading — same pattern as About, Experience, AI Lab */}
        <div className="mb-3 sm:mb-8">
          <SlideHeading label="Skills" title="Skills" />
        </div>

        {/* Category tabs — carousel scroll on mobile */}
        <div className="flex flex-nowrap overflow-x-auto scrollbar-hide snap-x snap-mandatory sm:flex-wrap sm:overflow-x-visible gap-2 mb-4 sm:mb-10 border-b border-[var(--notion-hairline)] pb-2 sm:pb-5 -mx-1 px-1" data-no-section-nav>
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategory(category)}
              className={`snap-start shrink-0 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 ${
                activeCategory === category
                  ? "bg-[var(--notion-ink)] text-white"
                  : "text-[var(--notion-stone)] hover:text-[var(--notion-ink)] hover:bg-[var(--notion-surface)]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Icon grid */}
        <div className="skills-icon-grid" key={activeCategory ?? "all"}>
          {visibleSkills.map((item) => (
            <SkillTile key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
});
