import type { ResumeData } from "./types";

export async function downloadResumePdf(data: ResumeData) {
  const [{ pdf }, { ResumeDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./resume-document"),
  ]);

  const blob = await pdf(ResumeDocument({ data })).toBlob();
  const url = URL.createObjectURL(blob);

  const today = new Date().toISOString().split("T")[0];
  const a = document.createElement("a");
  a.href = url;
  a.download = `export-${today}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
