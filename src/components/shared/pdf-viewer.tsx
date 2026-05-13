"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  url: string;
  onPageRatioChange?: (ratio: number) => void;
}

const DEFAULT_PAGE_RATIO = 595.2756 / 841.8898;

export default function PdfViewer({ url, onPageRatioChange }: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [pageRatio, setPageRatio] = useState(DEFAULT_PAGE_RATIO);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setContainerSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setLoading(false);
  }, []);

  const pageWidth = useMemo(() => {
    const maxWidth = Math.max(0, containerSize.width);
    const maxHeight = Math.max(0, containerSize.height);
    if (!maxWidth || !maxHeight) return undefined;

    return Math.floor(Math.min(maxWidth, maxHeight * pageRatio));
  }, [containerSize, pageRatio]);

  const prev = () => setPage((p) => Math.max(1, p - 1));
  const next = () => setPage((p) => Math.min(numPages, p + 1));

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center bg-[var(--notion-surface)] overflow-hidden"
    >
      {/* PDF document */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center pdf-page-fit">
        <Document
          file={url}
          onLoadSuccess={onLoadSuccess}
          loading={
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              PDF 로딩 중...
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
              <span className="text-sm">PDF를 불러올 수 없습니다</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline hover:text-foreground"
              >
                직접 열기
              </a>
            </div>
          }
        >
          {pageWidth ? (
            <Page
              pageNumber={page}
              width={pageWidth}
              className="pdf-page-fit"
              onLoadSuccess={(pdfPage) => {
                const nextRatio = pdfPage.originalWidth / pdfPage.originalHeight;
                setPageRatio(nextRatio);
                onPageRatioChange?.(nextRatio);
              }}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              PDF 크기 계산 중...
            </div>
          )}
        </Document>
      </div>

      {/* Navigation controls */}
      {!loading && numPages > 0 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 shadow-sm z-10">
          <button
            onClick={prev}
            disabled={page <= 1}
            className="flex items-center justify-center w-7 h-7 rounded-md text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            type="button"
            aria-label="이전 페이지"
          >
            ‹
          </button>
          <span className="text-xs text-muted-foreground tabular-nums min-w-[4rem] text-center">
            {page} / {numPages}
          </span>
          <button
            onClick={next}
            disabled={page >= numPages}
            className="flex items-center justify-center w-7 h-7 rounded-md text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
            type="button"
            aria-label="다음 페이지"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
