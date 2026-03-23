"use client";

import { useState, useRef } from "react";
import Image from "next/image";

/* ── 타입 ── */
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

/* ── 미디어 렌더러 ── */
function MediaPreview({ media }: { media?: ProjectMedia }) {
  if (!media || !media.url) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
        No media
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <video src={media.url} controls className="w-full h-full object-cover" preload="metadata" />
    );
  }

  if (media.type === "pdf") {
    return (
      <a href={media.url} target="_blank" rel="noopener noreferrer" className="w-full h-full bg-muted flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
        <span className="text-2xl">📄</span>
        <span className="text-[11px]">PDF 보기</span>
      </a>
    );
  }

  // image
  return (
    <Image src={media.url} alt="project" fill className="object-cover" sizes="200px" />
  );
}

/* ── 보기 모드 카드 ── */
function ViewCard({ item }: { item: ProjectItem }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* 좌: 미디어 */}
        <div className="sm:w-[200px] h-[160px] sm:h-auto shrink-0 relative bg-muted border-b sm:border-b-0 sm:border-r border-border">
          <MediaPreview media={item.media} />
        </div>

        {/* 우: 정보 */}
        <div className="flex-1 min-w-0 px-5 py-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-bold">{item.title}</h3>
            <div className="flex gap-2 shrink-0 text-[11px]">
              {item.githubUrl && (
                <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-foreground transition-colors">GitHub ↗</a>
              )}
              {item.liveUrl && (
                <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-foreground transition-colors">Live ↗</a>
              )}
            </div>
          </div>

          <div className="flex gap-3 text-[11px] text-muted-foreground mb-2">
            <span className="font-mono">{item.period}</span>
            <span>{item.teamSize}</span>
          </div>

          {item.summary && (
            <p className="text-[13px] text-muted-foreground mb-2">{item.summary}</p>
          )}

          {item.description && item.description.length > 0 && (
            <ul className="space-y-1">
              {item.description.map((d, j) => (
                <li key={j} className="flex gap-2 text-[13px] text-muted-foreground leading-snug">
                  <span className="text-primary shrink-0 mt-px">▸</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}

          {item.techStack && item.techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {item.techStack.map((t) => (
                <span key={t} className="tech-badge">{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── 수정 모드 카드 ── */
function EditCard({
  item,
  onChange,
  onDelete,
}: {
  item: ProjectItem;
  onChange: (updated: ProjectItem) => void;
  onDelete: () => void;
}) {
  const inputClass = "w-full bg-background border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary/50";

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
    <div className="border border-primary/30 rounded-lg bg-card">
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

        {/* Description bullets */}
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5 block">핵심 설명</label>
          <div className="space-y-1.5">
            {item.description.map((d, j) => (
              <div key={j} className="flex gap-1.5">
                <span className="text-primary shrink-0 mt-2 text-sm">▸</span>
                <input className={`${inputClass} flex-1`} value={d} onChange={(e) => updateDescription(j, e.target.value)} />
                <button onClick={() => removeDescription(j)} className="text-muted-foreground hover:text-destructive text-sm px-1.5 shrink-0" type="button">×</button>
              </div>
            ))}
          </div>
          <button onClick={addDescription} className="text-xs text-primary hover:text-primary/80 mt-1.5" type="button">+ 설명 추가</button>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">기술 태그 (콤마 구분)</label>
          <input
            className={inputClass}
            value={item.techStack.join(", ")}
            onChange={(e) => updateField("techStack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          />
        </div>

        {/* Media */}
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
          <button onClick={onDelete} className="text-xs text-destructive hover:text-destructive/80" type="button">이 프로젝트 삭제</button>
        </div>
      </div>
    </div>
  );
}

/* ── 비밀번호 모달 ── */
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
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-xs shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-bold mb-4">관리자 인증</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="비밀번호 입력"
          className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary/50 mb-2"
          autoFocus
        />
        {error && <p className="text-xs text-destructive mb-2">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5" type="button">취소</button>
          <button
            onClick={handleSubmit}
            disabled={loading || !password}
            className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 disabled:opacity-50"
            type="button"
          >
            {loading ? "확인 중..." : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 메인 컴포넌트 ── */
export function Projects({ items }: ProjectsProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editItems, setEditItems] = useState<ProjectItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [displayItems, setDisplayItems] = useState(items);

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

  if (displayItems.length === 0 && !isEditMode) return null;

  return (
    <section id="projects" className="py-6">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div className="border-t border-border pt-6">
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Projects</h2>
            {!isEditMode && (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                type="button"
              >
                ✎ 수정
              </button>
            )}
          </div>

          {isEditMode && (
            <div className="flex gap-2 justify-end mb-3">
              <button onClick={cancelEdit} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 border border-border rounded" type="button">취소</button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded hover:bg-primary/90 disabled:opacity-50"
                type="button"
              >
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          )}

          <div className="space-y-4">
            {isEditMode
              ? editItems.map((item, i) => (
                  <EditCard key={i} item={item} onChange={(u) => updateItem(i, u)} onDelete={() => deleteItem(i)} />
                ))
              : displayItems.map((item, i) => (
                  <ViewCard key={i} item={item} />
                ))}
          </div>

          {isEditMode && (
            <button onClick={addItem} className="mt-3 w-full border border-dashed border-border rounded-lg py-2.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors" type="button">
              + 프로젝트 추가
            </button>
          )}
        </div>
      </div>

      {showPasswordModal && (
        <PasswordModal onSuccess={enterEditMode} onClose={() => setShowPasswordModal(false)} />
      )}
    </section>
  );
}
