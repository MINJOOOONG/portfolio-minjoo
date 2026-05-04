import { SectionHeading } from "./about";

export interface EducationItem {
  school: string;
  major: string;
  period: string;
}

export interface CertificationItem {
  name: string;
  date: string;
}

interface EducationCertsProps {
  education: EducationItem[];
  certifications: CertificationItem[];
}

export function EducationCerts({ education, certifications }: EducationCertsProps) {
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section id="education" className="py-10">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div>
          <SectionHeading>Education & Certifications</SectionHeading>

          {education.length > 0 && (
            <div className="bg-card rounded-2xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">기간</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">학교</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">전공</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((item, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground whitespace-nowrap">{item.period}</td>
                      <td className="px-6 py-4 font-medium">{item.school}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.major}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="bg-card rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">자격증</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-6 py-4">취득일</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((item, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
