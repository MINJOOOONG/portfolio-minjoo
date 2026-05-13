import type { ResumeData } from "./types";

async function imageToDataUrl(src: string) {
  const response = await fetch(src);
  if (!response.ok) return undefined;

  const blob = await response.blob();

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function downloadResumePdf(data: ResumeData) {
  const [{ pdf }, { ResumeDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("./resume-document"),
  ]);

  const profileImageSrc = await imageToDataUrl("/profile.jpeg");
  const blob = await pdf(ResumeDocument({ data, profileImageSrc })).toBlob();
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
