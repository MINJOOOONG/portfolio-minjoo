"use client";

import { useState, memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { SlideHeading } from "./about";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useParallax } from "@/hooks/use-parallax";
import { useStaggerReveal } from "@/hooks/use-stagger-reveal";
import { isArticleProject } from "@/lib/project-groups";

const ProjectMiniScene = dynamic(
  () => import("@/components/three/project-scenes"),
  { ssr: false }
);

const PdfViewer = dynamic(
  () => import("@/components/shared/pdf-viewer"),
  { ssr: false }
);

/* -- 타입 -- */
export interface ProjectMedia {
  type: "image" | "video" | "pdf";
  url: string;
}

export interface ProjectItem {
  title: string;
  teamSize: string;
  period: string;
  summary: string;
  description: string[];
  techStack: string[];
  media?: ProjectMedia;
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectsProps {
  items: ProjectItem[];
}

const NOTION_TINTS = [
  "var(--notion-tint-lavender)",
  "var(--notion-tint-mint)",
  "var(--notion-tint-sky)",
  "var(--notion-tint-peach)",
  "var(--notion-tint-rose)",
  "var(--notion-tint-yellow)",
  "var(--notion-tint-cream)",
];

const DEFAULT_MEDIA_RATIO = 4 / 3;
const DEFAULT_PDF_RATIO = 595.2756 / 841.8898;

/* -- 미디어 렌더러 -- */
function MediaPreview({
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
    <Image
      src={media.url}
      alt="project"
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 460px"
      onLoad={(event) => {
        const image = event.currentTarget;
        if (image.naturalWidth && image.naturalHeight) {
          onMediaRatioChange?.(image.naturalWidth / image.naturalHeight);
        }
      }}
    />
  );
}

/* -- Showcase 보기 모드 카드 -- */
function ProjectShowcase({ item, index }: { item: ProjectItem; index: number }) {
  const isEven = index % 2 === 0;
  const [mediaRatio, setMediaRatio] = useState(
    item.media?.type === "pdf" ? DEFAULT_PDF_RATIO : DEFAULT_MEDIA_RATIO
  );
  const textRef = useScrollReveal<HTMLDivElement>({ y: 50, duration: 1.2 });
  const mediaRef = useParallax<HTMLDivElement>({ speed: 0.2 });
  const techRef = useStaggerReveal<HTMLDivElement>({
    childSelector: "> span",
    stagger: 0.05,
    y: 15,
  });

  return (
    <div className="min-h-[80vh] flex items-center py-16">
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 w-full`}>
        {/* Media — 60% */}
        <div
          ref={mediaRef}
          className="relative w-full max-w-[460px] mx-auto rounded-xl overflow-hidden bg-[var(--notion-surface)] md:max-w-none md:flex-[0_1_460px]"
          style={{ aspectRatio: mediaRatio }}
        >
          <MediaPreview
            media={item.media}
            title={item.title}
            techStack={item.techStack}
            onMediaRatioChange={setMediaRatio}
          />
        </div>

        {/* Text — 40% */}
        <div
          ref={textRef}
          className="flex flex-col justify-center md:flex-1 md:min-w-0"
        >
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-display text-2xl sm:text-3xl font-black tracking-[-0.03em] leading-tight">{item.title}</h3>
          </div>

          <div className="flex gap-3 text-xs text-muted-foreground mb-4">
            <span>{item.period}</span>
            <span>{item.teamSize}</span>
          </div>

          <div className="flex shrink-0 gap-2 mb-4">
            {item.githubUrl && (
              <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 items-center rounded-md border border-border bg-transparent px-3 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45">GitHub ↗</a>
            )}
            {item.liveUrl && (
              <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 items-center rounded-md border border-border bg-transparent px-3 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:border-foreground/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45">Live ↗</a>
            )}
          </div>

          {item.summary && (
            <p className="text-sm text-muted-foreground mb-4">{item.summary}</p>
          )}

          {item.description && item.description.length > 0 && (
            <ul className="space-y-2 mb-4">
              {item.description.map((d, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-muted-foreground/40 shrink-0 mt-0.5">▸</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          {item.techStack && item.techStack.length > 0 && (
            <div ref={techRef} className="flex flex-wrap gap-2">
              {item.techStack.map((t, i) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-medium rounded-md text-foreground"
                  style={{ background: NOTION_TINTS[i % NOTION_TINTS.length] }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -- 수정 모드 카드 -- */
function EditCard({
  item,
  onChange,
  onDelete,
}: {
  item: ProjectItem;
  onChange: (updated: ProjectItem) => void;
  onDelete: () => void;
}) {
  const inputClass = "w-full bg-background border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-foreground/30";

  const updateField = <K extends keyof ProjectItem>(key: K, value: ProjectItem[K]) => {
    onChange({ ...item, [key]: value });
  };

  const updateDescription = (index: number, value: string) => {
    const next = [...item.description];
    next[index] = value;
    onChange({ ...item, description: next });
  };

  const removeDescription = (index: number) => {
    onChange({ ...item, description: item.description.filter((_, i) => i !== index) });
  };

  const addDescription = () => {
    onChange({ ...item, description: [...item.description, ""] });
  };

  return (
    <div className="border border-border rounded-lg bg-background">
      <div className="px-5 py-3 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">프로젝트명</label>
            <input className={inputClass} value={item.title} onChange={(e) => updateField("title", e.target.value)} />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">기간</label>
            <input className={inputClass} value={item.period} onChange={(e) => updateField("period", e.target.value)} />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">인원</label>
            <input className={inputClass} value={item.teamSize} onChange={(e) => updateField("teamSize", e.target.value)} placeholder="예: 개인 / 3인" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">GitHub URL</label>
            <input className={inputClass} value={item.githubUrl || ""} onChange={(e) => updateField("githubUrl", e.target.value || undefined)} />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Live URL</label>
            <input className={inputClass} value={item.liveUrl || ""} onChange={(e) => updateField("liveUrl", e.target.value || undefined)} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-4 border-t border-border pt-3 space-y-3">
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">한 줄 요약</label>
          <input className={inputClass} value={item.summary} onChange={(e) => updateField("summary", e.target.value)} />
        </div>

        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5 block">핵심 설명</label>
          <div className="space-y-1.5">
            {item.description.map((d, j) => (
              <div key={j} className="flex gap-1.5">
                <span className="text-muted-foreground/40 shrink-0 mt-2 text-sm">▸</span>
                <input className={`${inputClass} flex-1`} value={d} onChange={(e) => updateDescription(j, e.target.value)} />
                <button onClick={() => removeDescription(j)} className="h-8 shrink-0 rounded-md px-2 text-base font-bold text-foreground/70 transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/35" type="button">×</button>
              </div>
            ))}
          </div>
          <button onClick={addDescription} className="mt-2 inline-flex h-8 items-center rounded-lg border border-border bg-transparent px-3 text-xs font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45" type="button">+ 설명 추가</button>
        </div>

        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">기술 태그 (콤마 구분)</label>
          <input
            className={inputClass}
            value={item.techStack.join(", ")}
            onChange={(e) => updateField("techStack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">미디어 타입</label>
            <select
              className={inputClass}
              value={item.media?.type || "image"}
              onChange={(e) => updateField("media", { type: e.target.value as "image" | "video" | "pdf", url: item.media?.url || "" })}
            >
              <option value="image">이미지</option>
              <option value="video">영상</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">미디어 URL</label>
            <input
              className={inputClass}
              value={item.media?.url || ""}
              onChange={(e) => updateField("media", { type: item.media?.type || "image", url: e.target.value })}
              placeholder="/projects/example.png"
            />
          </div>
        </div>

        <div className="pt-1">
          <button onClick={onDelete} className="inline-flex h-8 items-center rounded-lg border border-destructive/30 bg-destructive/10 px-3 text-xs font-bold text-destructive transition-colors duration-150 hover:bg-destructive/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/35" type="button">이 프로젝트 삭제</button>
        </div>
      </div>
    </div>
  );
}

/* -- 비밀번호 모달 -- */
function PasswordModal({
  onSuccess,
  onClose,
}: {
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.error || "인증 실패");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-background border border-border rounded-lg p-6 w-full max-w-xs shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-bold mb-4">관리자 인증</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="비밀번호 입력"
          className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-foreground/30 mb-2"
          autoFocus
        />
        {error && <p className="text-xs text-destructive mb-2">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="inline-flex h-9 items-center rounded-lg border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45" type="button">취소</button>
          <button
            onClick={handleSubmit}
            disabled={loading || !password}
            className="inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-sm font-medium text-background transition-colors duration-150 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 disabled:opacity-50"
            type="button"
          >
            {loading ? "확인 중..." : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* -- 메인 컴포넌트 -- */
export const Projects = memo(function Projects({ items }: ProjectsProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editItems, setEditItems] = useState<ProjectItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [displayItems, setDisplayItems] = useState(items);
  const viewItems = displayItems.filter((item) => !isArticleProject(item));
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });

  const enterEditMode = () => {
    setEditItems(JSON.parse(JSON.stringify(displayItems)));
    setIsEditMode(true);
    setShowPasswordModal(false);
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditItems([]);
  };

  const updateItem = (index: number, updated: ProjectItem) => {
    const next = [...editItems];
    next[index] = updated;
    setEditItems(next);
  };

  const deleteItem = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index));
  };

  const addItem = () => {
    setEditItems([
      ...editItems,
      { title: "", teamSize: "", period: "", summary: "", description: [""], techStack: [] },
    ]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const cleaned = editItems.map((item) => ({
        ...item,
        description: item.description.filter((d) => d.trim()),
        techStack: item.techStack.filter((t) => t.trim()),
        githubUrl: item.githubUrl || undefined,
        liveUrl: item.liveUrl || undefined,
        media: item.media?.url ? item.media : undefined,
      }));

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project_data: JSON.stringify(cleaned) }),
      });

      if (res.ok) {
        setDisplayItems(cleaned);
        setIsEditMode(false);
        setEditItems([]);
      } else {
        alert("저장에 실패했습니다. 세션이 만료되었을 수 있습니다.");
      }
    } catch {
      alert("서버 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (viewItems.length === 0 && !isEditMode) return null;

  return (
    <div className="w-full">
      <div className="flex items-end justify-between mb-2">
        <div ref={isEditMode ? undefined : headingRef}>
          <SlideHeading label="Projects" title="Projects" />
        </div>
        {!isEditMode && (
          <button
            onClick={() => setShowPasswordModal(true)}
            className="mb-10 inline-flex h-9 items-center rounded-lg border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
            type="button"
          >
            ✎ 수정
          </button>
        )}
      </div>

      {isEditMode && (
        <div className="flex gap-2 justify-end mb-3">
          <button onClick={cancelEdit} className="inline-flex h-9 items-center rounded-lg border border-border bg-transparent px-3.5 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45" type="button">취소</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex h-9 items-center rounded-lg bg-foreground px-3.5 text-sm font-medium text-background transition-colors duration-150 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 disabled:opacity-50"
            type="button"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      )}

      <div className={isEditMode ? "space-y-5" : ""}>
        {isEditMode
          ? editItems.map((item, i) => (
              <EditCard key={i} item={item} onChange={(u) => updateItem(i, u)} onDelete={() => deleteItem(i)} />
            ))
          : viewItems.map((item, i) => (
              <ProjectShowcase key={i} item={item} index={i} />
            ))}
      </div>

      {isEditMode && (
        <button onClick={addItem} className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-lg border border-dashed border-border bg-transparent text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45" type="button">
          + 프로젝트 추가
        </button>
      )}

      {showPasswordModal && (
        <PasswordModal onSuccess={enterEditMode} onClose={() => setShowPasswordModal(false)} />
      )}
    </div>
  );
});
