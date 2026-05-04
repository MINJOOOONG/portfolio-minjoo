import { MarkdownRenderer } from "@/components/shared/markdown-renderer";

interface AboutProps {
  content: string;
}

export function About({ content }: AboutProps) {
  if (!content) return null;

  return (
    <section id="about" className="py-10">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div>
          <SectionHeading>About</SectionHeading>
          <div className="text-sm leading-relaxed">
            <MarkdownRenderer content={content} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-bold tracking-tight text-foreground mb-5">{children}</h2>
  );
}
