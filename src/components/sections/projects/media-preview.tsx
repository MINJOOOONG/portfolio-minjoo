"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/i18n/language-context";
import locale from "@/lib/i18n/locale";
import { SafeImage } from "./safe-image";
import { isSameMediaUrl } from "./utils";
import type { ProjectMedia } from "./types";

const ProjectMiniScene = dynamic(
  () => import("@/components/three/project-scenes"),
  { ssr: false }
);

const PdfViewer = dynamic(
  () => import("@/components/shared/pdf-viewer"),
  { ssr: false }
);

export { PdfViewer };

export function MediaPreview({
  media,
  title,
  techStack,
  onMediaRatioChange,
}: {
  media?: ProjectMedia;
  title?: string;
  techStack?: string[];
  onMediaRatioChange?: (ratio: number) => void;
}) {
  const { lang } = useLanguage();
  if (!media || !media.url) {
    if (title && techStack) {
      return <ProjectMiniScene title={title} techStack={techStack} />;
    }
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
        No media
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <video
        src={media.url}
        controls
        className="w-full h-full object-contain"
        preload="metadata"
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          if (video.videoWidth && video.videoHeight) {
            onMediaRatioChange?.(video.videoWidth / video.videoHeight);
          }
        }}
      />
    );
  }

  if (media.type === "pdf") {
    return <PdfViewer url={media.url} onPageRatioChange={onMediaRatioChange} />;
  }

  return (
    <SafeImage
      src={media.url}
      alt={media.title || title || "project"}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 460px"
      fallbackText={media.title || title || locale["projects.projectImage"][lang]}
      onLoad={(event) => {
        const image = event.currentTarget as HTMLImageElement;
        if (image.naturalWidth && image.naturalHeight) {
          onMediaRatioChange?.(image.naturalWidth / image.naturalHeight);
        }
      }}
    />
  );
}

export function ProjectMediaGallery({
  items,
  mainUrl,
}: {
  items?: ProjectMedia[];
  mainUrl?: string;
}) {
  const { lang } = useLanguage();
  const galleryItems = (items ?? []).filter((item) => !isSameMediaUrl(item.url, mainUrl));
  if (galleryItems.length === 0) return null;

  return (
    <section className="pj-media-section">
      <h4 className="pj-modal__section-title">{locale["projects.media"][lang]}</h4>
      <div className="pj-media-grid">
        {galleryItems.map((item, index) => (
          <figure key={`${item.url}-${index}`} className="pj-media-item">
            {item.type === "video" ? (
              <video
                src={item.url}
                controls
                preload="metadata"
                className="pj-media-item__asset"
              />
            ) : (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pj-media-item__asset"
                aria-label={`${item.title ?? "프로젝트 이미지"} 새 창으로 보기`}
              >
                <SafeImage
                  src={item.url}
                  alt={item.title ?? "프로젝트 이미지"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 180px"
                  fallbackText={item.title}
                />
              </a>
            )}
            {item.title && <figcaption>{item.title}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

export function ProjectAttachmentList({ items }: { items?: import("./types").ProjectAttachment[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="pj-media-section">
      <h4 className="pj-modal__section-title">첨부 문서</h4>
      <div className="pj-attachment-list">
        {items.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pj-attachment-link"
          >
            <span className="pj-attachment-link__type">
              {item.type === "pdf" ? "PDF" : "FILE"}
            </span>
            <span className="pj-attachment-link__title">{item.title}</span>
            <span className="pj-attachment-link__open">열기</span>
          </a>
        ))}
      </div>
    </section>
  );
}
