"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { ResumeData } from "@/lib/pdf/types";

interface PdfExportButtonProps {
  resumeData: ResumeData;
}

export function PdfExportButton({ resumeData }: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const { downloadResumePdf } = await import("@/lib/pdf/generate-pdf");
      await downloadResumePdf(resumeData);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/50 rounded-lg transition-colors duration-200 disabled:opacity-50"
    >
      <Download size={13} />
      {loading ? "생성 중..." : "PDF"}
    </button>
  );
}
