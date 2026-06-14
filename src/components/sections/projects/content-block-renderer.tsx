"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SafeImage } from "./safe-image";
import { PdfViewer } from "./media-preview";
import { DEFAULT_PDF_RATIO } from "./utils";
import type { ContentBlock } from "./types";

/** Parse markdown-style links [text](url) within a plain string and return React nodes */
function parseInlineLinks(text: string): React.ReactNode {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) {
      return (
        <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-foreground/90 hover:text-foreground transition-colors">
          {m[1]}
        </a>
      );
    }
    return part;
  });
}

function CodeToggle({ title, code }: { title: string; code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="pj-code-toggle">
      <button
        type="button"
        className="pj-code-toggle__btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className={`pj-code-toggle__chevron${open ? " pj-code-toggle__chevron--open" : ""}`}>&#9656;</span>
        {title}
      </button>
      <div className={`pj-code-toggle__body${open ? " pj-code-toggle__body--open" : ""}`}>
        <pre><code>{code}</code></pre>
      </div>
    </div>
  );
}

export function DesignRulesBlock({
  block,
}: {
  block: Extract<ContentBlock, { type: "design-rules" }>;
}) {
  const images = block.images ?? (block.image ? [{ url: block.image }] : []);

  return (
    <div className="pj-design-rules-rows">
      {block.rules.map((rule, j) => (
        <div key={j} className="pj-design-rules-row">
          {images[j] && (
            <div className="pj-design-rules-row__image-col">
              <SafeImage
                src={images[j].url}
                alt={images[j].title ? `${images[j].title} 화면 캡처` : `디자인 규칙 ${j + 1} 참고 화면`}
                width={720}
                height={450}
                className="pj-design-rules__image"
                sizes="240px"
                fallbackText="화면 캡처"
              />
            </div>
          )}
          <div className="pj-design-rules-row__text-col">
            <span className="pj-design-rules__number">{String(j + 1).padStart(2, "0")}.</span>
            <div className="pj-design-rules__item-content">
              <span className="pj-design-rules__item-title">{rule.title}</span>
              <span className="pj-design-rules__item-body">{rule.body}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContentBlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="pj-content-flow">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return (
              <motion.section
                key={`text-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                {block.heading && (
                  <h4 className="pj-content-heading">
                    {block.heading}
                  </h4>
                )}
                {block.heading ? (
                  <ul className="space-y-2">
                    {block.body.map((line, j) => (
                      <li
                        key={j}
                        className="text-[14px] text-foreground/80 leading-[1.75] flex gap-2.5"
                      >
                        {block.body.length > 1 && (
                          <span className="text-foreground/15 shrink-0 mt-0.5">▸</span>
                        )}
                        <span>{parseInlineLinks(line)}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="pj-content-paragraphs">
                    {block.body.map((line, j) => (
                      <p key={j}>{parseInlineLinks(line)}</p>
                    ))}
                  </div>
                )}
              </motion.section>
            );

          case "image": {
            const isDiagram = block.url.endsWith(".svg");
            return (
              <motion.figure
                key={`img-${i}`}
                className="pj-content-block pj-content-image"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <SafeImage
                  src={block.url}
                  alt={block.caption || "프로젝트 이미지"}
                  width={isDiagram ? 760 : 640}
                  height={isDiagram ? 670 : 400}
                  className={`pj-content-image__img${isDiagram ? " pj-content-image__img--diagram" : ""}`}
                  sizes="(max-width: 768px) 90vw, 760px"
                  fallbackText={block.caption}
                />
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );
          }

          case "video":
            return (
              <motion.figure
                key={`vid-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <video
                  src={block.url}
                  controls
                  preload="metadata"
                  className="w-full rounded-lg border border-[var(--notion-hairline)]"
                />
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );

          case "pdf":
            return (
              <motion.figure
                key={`pdf-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <div
                  className="relative w-full rounded-lg overflow-hidden bg-[var(--notion-surface)] border border-[var(--notion-hairline)]"
                  style={{ aspectRatio: DEFAULT_PDF_RATIO }}
                >
                  <PdfViewer url={block.url} />
                </div>
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );

          case "audio":
            return (
              <motion.figure
                key={`audio-${i}`}
                className="pj-content-block pj-content-audio"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <audio src={block.url} controls className="w-full" preload="metadata" />
                {block.caption && (
                  <figcaption className="pj-content-caption">{block.caption}</figcaption>
                )}
              </motion.figure>
            );

          case "file":
            return (
              <motion.div
                key={`file-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <a
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pj-attachment-link"
                >
                  <span className="pj-attachment-link__type">FILE</span>
                  <span className="pj-attachment-link__title">{block.title}</span>
                  <span className="pj-attachment-link__open">열기</span>
                </a>
              </motion.div>
            );

          case "section-heading": {
            const headingMatch = block.title.match(/^(\d+)\s*—\s*(.+)$/);
            return (
              <motion.h3
                key={`sh-${i}`}
                className="pj-section-heading"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                {headingMatch ? (
                  <>
                    <span className="pj-section-heading__number">{headingMatch[1]}</span>
                    <span className="pj-section-heading__dash">—</span>
                    <span className="pj-section-heading__title">{headingMatch[2]}</span>
                  </>
                ) : (
                  <span className="pj-section-heading__title">{block.title}</span>
                )}
              </motion.h3>
            );
          }

          case "code":
            return (
              <motion.div
                key={`code-${i}`}
                className="pj-content-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <CodeToggle title={block.title} code={block.code} />
              </motion.div>
            );

          case "callout": {
            const isInfoCallout = block.variant === "info";
            return (
              <motion.div
                key={`callout-${i}`}
                className={`pj-callout pj-callout--${block.variant}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <span className="pj-callout__label">
                  {block.variant === "problem"
                    ? "PROBLEM"
                    : block.variant === "solution"
                      ? "SOLUTION"
                      : block.title}
                </span>
                {!isInfoCallout && (
                  <strong className="pj-callout__title">{block.title}</strong>
                )}
                <ul className="pj-callout__body">
                  {block.body.map((line, j) => (
                    <li key={j}>{parseInlineLinks(line)}</li>
                  ))}
                </ul>
              </motion.div>
            );
          }

          case "tech-grid":
            return (
              <motion.div
                key={`tg-${i}`}
                className="pj-tech-grid"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                {block.items.map((item, j) => (
                  <div key={j} className="pj-tech-grid__card">
                    <span className="pj-tech-grid__name">{item.name}</span>
                    <span className="pj-tech-grid__reason">{item.reason}</span>
                  </div>
                ))}
              </motion.div>
            );

          case "point-cards":
            return (
              <motion.div
                key={`pc-${i}`}
                className="pj-point-cards"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                {block.items.map((item, j) => (
                  <div key={j} className="pj-point-cards__card">
                    <span className="pj-point-cards__title">{item.title}</span>
                    <span className="pj-point-cards__body">{parseInlineLinks(item.body)}</span>
                  </div>
                ))}
              </motion.div>
            );

          case "design-rules":
            return (
              <motion.div
                key={`dr-${i}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <DesignRulesBlock block={block} />
              </motion.div>
            );

          case "feature-block":
            return (
              <motion.div
                key={`fb-${i}`}
                className="pj-feature-block"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <h4 className="pj-feature-block__title">{block.title}</h4>
                <div className="pj-feature-block__body">
                  {block.body.map((p, j) => (
                    <p key={j}>{parseInlineLinks(p)}</p>
                  ))}
                </div>
                {block.code && (
                  <div style={{ marginTop: 12 }}>
                    <CodeToggle title={block.code.title} code={block.code.code} />
                  </div>
                )}
              </motion.div>
            );

          case "rag-pipeline":
            return (
              <motion.div
                key={`rag-${i}`}
                className="pj-rag-section"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              >
                <div className="pj-rag-grid">
                  <div className="pj-rag-diagram">
                    {block.diagram.steps.map((step, j) => (
                      <div key={j}>
                        <div className="pj-rag-step">{step}</div>
                        {j < block.diagram.steps.length - 1 && (
                          <div className="pj-rag-arrow">↓</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pj-rag-description">
                    {block.description.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>

                {block.troubleshooting && (
                  <div className="pj-rag-troubleshooting">
                    <span className="pj-rag-troubleshooting__label">TROUBLESHOOTING</span>
                    <p>{block.troubleshooting}</p>
                  </div>
                )}
              </motion.div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
