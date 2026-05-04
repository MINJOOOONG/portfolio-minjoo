import { SectionHeading } from "./about";

interface SkillsProps {
  data: Record<string, string[]>;
}

export function Skills({ data }: SkillsProps) {
  const categories = Object.entries(data);
  if (categories.length === 0) return null;

  return (
    <section id="skills" className="py-10">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div>
          <SectionHeading>Tech Stack</SectionHeading>

          <div className="bg-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {categories.map(([category, skills], i) => (
              <div
                key={category}
                className={`px-6 py-5 ${
                  i < categories.length - (categories.length % 2 === 0 ? 2 : 1) ? "border-b border-border/30" : ""
                } ${i % 2 === 0 && categories.length > 1 ? "sm:border-r sm:border-border/30" : ""}`}
              >
                <h3 className="text-xs font-semibold text-foreground mb-2.5">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span key={skill} className="tech-badge">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
