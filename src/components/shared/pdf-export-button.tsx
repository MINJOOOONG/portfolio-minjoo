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
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 disabled:opacity-50"
    >
      <Download size={13} />
      {loading ? "생성 중..." : "PDF"}
    </button>
  );
}
