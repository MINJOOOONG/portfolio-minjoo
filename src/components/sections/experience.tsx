"use client";

import { useState, useRef } from "react";

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  summary: string;
  achievements: string[];
  status?: string;
  techStack?: string[];
}

interface ExperienceProps {
  items: ExperienceItem[];
}

/* ── 보기 모드 카드 ── */
function ViewCard({ item }: { item: ExperienceItem }) {
  return (
    <div className="border border-border rounded-lg">
      <div className="px-5 py-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold">{item.company}</h3>
          {item.status && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {item.status}
            </span>
          )}
        </div>
        <span className="text-xs font-mono text-muted-foreground">{item.period}</span>
      </div>
      <div className="px-5 pb-4 border-t border-border">
        <p className="text-sm text-primary font-medium mt-3">{item.role}</p>
        {item.summary && (
          <p className="text-[13px] text-muted-foreground mt-1.5">{item.summary}</p>
        )}
        {item.achievements && item.achievements.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {item.achievements.map((a, j) => (
              <li key={j} className="flex gap-2 text-[13px] text-muted-foreground leading-snug">
                <span className="text-primary shrink-0 mt-px">▸</span>
                <span>{a}</span>
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
  );
}

/* ── 수정 모드 카드 ── */
function EditCard({
  item,
  onChange,
  onDelete,
}: {
  item: ExperienceItem;
  onChange: (updated: ExperienceItem) => void;
  onDelete: () => void;
}) {
  const inputClass = "w-full bg-background border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-primary/50";

  const updateField = <K extends keyof ExperienceItem>(key: K, value: ExperienceItem[K]) => {
    onChange({ ...item, [key]: value });
  };

  const updateAchievement = (index: number, value: string) => {
    const next = [...item.achievements];
    next[index] = value;
    onChange({ ...item, achievements: next });
  };

  const removeAchievement = (index: number) => {
    onChange({ ...item, achievements: item.achievements.filter((_, i) => i !== index) });
  };

  const addAchievement = () => {
    onChange({ ...item, achievements: [...item.achievements, ""] });
  };

  return (
    <div className="border border-primary/30 rounded-lg bg-card">
      {/* Header fields */}
      <div className="px-5 py-3 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">회사명</label>
            <input className={inputClass} value={item.company} onChange={(e) => updateField("company", e.target.value)} />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">기간</label>
            <input className={inputClass} value={item.period} onChange={(e) => updateField("period", e.target.value)} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">직무</label>
            <input className={inputClass} value={item.role} onChange={(e) => updateField("role", e.target.value)} />
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground uppercase tracking-wider">상태 (선택)</label>
            <input className={inputClass} value={item.status || ""} onChange={(e) => updateField("status", e.target.value || undefined)} placeholder="예: 재직 중" />
          </div>
        </div>
      </div>

      {/* Body fields */}
      <div className="px-5 pb-4 border-t border-border pt-3 space-y-3">
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">한 줄 요약</label>
          <input className={inputClass} value={item.summary} onChange={(e) => updateField("summary", e.target.value)} />
        </div>

        {/* Achievements */}
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5 block">핵심 성과</label>
          <div className="space-y-1.5">
            {item.achievements.map((a, j) => (
              <div key={j} className="flex gap-1.5">
                <span className="text-primary shrink-0 mt-2 text-sm">▸</span>
                <input className={`${inputClass} flex-1`} value={a} onChange={(e) => updateAchievement(j, e.target.value)} />
                <button onClick={() => removeAchievement(j)} className="text-muted-foreground hover:text-destructive text-sm px-1.5 shrink-0" type="button">×</button>
              </div>
            ))}
          </div>
          <button onClick={addAchievement} className="text-xs text-primary hover:text-primary/80 mt-1.5" type="button">+ 성과 추가</button>
        </div>

        {/* Tech Stack */}
        <div>
          <label className="text-[11px] text-muted-foreground uppercase tracking-wider">기술 태그 (콤마 구분)</label>
          <input
            className={inputClass}
            value={(item.techStack || []).join(", ")}
            onChange={(e) => updateField("techStack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            placeholder="예: TestRail, Jira, Slack"
          />
        </div>

        {/* Delete button */}
        <div className="pt-1">
          <button onClick={onDelete} className="text-xs text-destructive hover:text-destructive/80" type="button">이 경력 삭제</button>
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
  const inputRef = useRef<HTMLInputElement>(null);

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
          ref={inputRef}
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
export function Experience({ items }: ExperienceProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editItems, setEditItems] = useState<ExperienceItem[]>([]);
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

  const updateItem = (index: number, updated: ExperienceItem) => {
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
      { company: "", role: "", period: "", summary: "", achievements: [""], techStack: [] },
    ]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // 빈 achievements 필터링
      const cleaned = editItems.map((item) => ({
        ...item,
        achievements: item.achievements.filter((a) => a.trim()),
        techStack: (item.techStack || []).filter((t) => t.trim()),
        status: item.status || undefined,
      }));

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ experience_data: JSON.stringify(cleaned) }),
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
    <section id="experience" className="py-6">
      <div className="max-w-[880px] mx-auto px-5 sm:px-8">
        <div className="border-t border-border pt-6">
          {/* Section header */}
          <div className="flex items-baseline justify-between mb-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Work Experience</h2>
            {!isEditMode && (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                type="button"
                aria-label="수정하기"
              >
                ✎ 수정
              </button>
            )}
          </div>

          {/* 수정 모드 상단 버튼 */}
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

          {/* 카드 목록 */}
          <div className="space-y-3">
            {isEditMode
              ? editItems.map((item, i) => (
                  <EditCard key={i} item={item} onChange={(u) => updateItem(i, u)} onDelete={() => deleteItem(i)} />
                ))
              : displayItems.map((item, i) => (
                  <ViewCard key={i} item={item} />
                ))}
          </div>

          {/* 경력 추가 버튼 */}
          {isEditMode && (
            <button onClick={addItem} className="mt-3 w-full border border-dashed border-border rounded-lg py-2.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors" type="button">
              + 경력 추가
            </button>
          )}
        </div>
      </div>

      {/* 비밀번호 모달 */}
      {showPasswordModal && (
        <PasswordModal onSuccess={enterEditMode} onClose={() => setShowPasswordModal(false)} />
      )}
    </section>
  );
}
