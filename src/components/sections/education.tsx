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
    <section id="education" className="py-6">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div className="border-t border-border pt-6">
          <SectionHeading>Education & Certifications</SectionHeading>

          {education.length > 0 && (
            <div className="border border-border rounded-lg overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[11px] font-semibold text-primary uppercase tracking-wider px-5 py-3">기간</th>
                    <th className="text-left text-[11px] font-semibold text-primary uppercase tracking-wider px-5 py-3">학교</th>
                    <th className="text-left text-[11px] font-semibold text-primary uppercase tracking-wider px-5 py-3">전공</th>
                  </tr>
                </thead>
                <tbody>
                  {education.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">{item.period}</td>
                      <td className="px-5 py-3 font-medium">{item.school}</td>
                      <td className="px-5 py-3 text-muted-foreground">{item.major}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {certifications.length > 0 && (
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[11px] font-semibold text-primary uppercase tracking-wider px-5 py-3">자격증</th>
                    <th className="text-left text-[11px] font-semibold text-primary uppercase tracking-wider px-5 py-3">취득일</th>
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-5 py-3 font-medium">{item.name}</td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{item.date}</td>
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
