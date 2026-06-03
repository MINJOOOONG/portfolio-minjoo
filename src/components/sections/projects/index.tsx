"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { isArticleProject } from "@/lib/project-groups";
import { projectSlug } from "@/lib/portfolio-project-content";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import type { ProjectsProps } from "./types";

export type { ProjectItem, ContentBlock, ProjectMedia, ProjectAttachment, CaseStudyBlock, ProjectsProps } from "./types";
export { ProjectDetailPageContent } from "./project-detail-page";

export const Projects = memo(function Projects({ items }: ProjectsProps) {
  const router = useRouter();
  const [selectedModal, setSelectedModal] = useState<{
    source: "project" | "activity";
    index: number;
  } | null>(null);
  const [displayItems] = useState(items);
  const viewItems = displayItems.filter((item) => !isArticleProject(item));

  const projectItems = viewItems.filter((item) => item.category !== "activity");
  const activityItems = viewItems.filter((item) => item.category === "activity");

  /* ── URL 해시로 프로젝트 모달 자동 오픈 ── */
  useEffect(() => {
    function openFromHash() {
      const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!hash) return;
      const pi = projectItems.findIndex((item) => projectSlug(item.title) === hash);
      if (pi !== -1) { setSelectedModal({ source: "project", index: pi }); return; }
      const ai = activityItems.findIndex((item) => projectSlug(item.title) === hash);
      if (ai !== -1) { setSelectedModal({ source: "activity", index: ai }); return; }
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [projectItems, activityItems]);

  /* ── 모달 열릴 때 해시 업데이트, 닫힐 때 해시 제거 ── */
  useEffect(() => {
    if (selectedModal) {
      const list = selectedModal.source === "activity" ? activityItems : projectItems;
      const item = list[selectedModal.index];
      if (item) window.history.replaceState(null, "", `#${projectSlug(item.title)}`);
    } else if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [selectedModal, projectItems, activityItems]);

  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });
  const activitiesHeadingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 1.0 });

  const currentList = selectedModal?.source === "activity" ? activityItems : projectItems;
  const selectedProject = selectedModal ? currentList[selectedModal.index] : null;

  const handleSelect = useCallback(
    (source: "project" | "activity", index: number) => {
      const list = source === "activity" ? activityItems : projectItems;
      const item = list[index];
      if (!item) return;

      if (window.matchMedia("(max-width: 767px)").matches) {
        router.push(`/projects/${projectSlug(item.title)}`);
        return;
      }

      setSelectedModal({ source, index });
    },
    [activityItems, projectItems, router]
  );

  if (viewItems.length === 0) return null;

  return (
    <div
      className="pj-section"
      data-allow-scroll
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        className="pj-section__scroll"
        data-scroller
        style={{
          height: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
          padding: "80px 24px 120px",
          boxSizing: "border-box",
        }}
      >
        {/* ── Project 섹션 헤딩 ── */}
        <div ref={headingRef} className="mb-6 sm:mb-12 text-center">
          <h2 className="font-display text-[clamp(1.4rem,5vw,3.2rem)] font-black tracking-[-0.04em] leading-tight mb-2 sm:mb-4">
            PROJECTS
          </h2>
          <div className="mt-2 sm:mt-4 h-px w-16 bg-[var(--notion-hairline)] mx-auto" />
        </div>

        {/* ── Project 카드 그리드 ── */}
        {projectItems.length > 0 && (
          <div className="pj-grid">
            {projectItems.map((item, i) => (
              <ProjectCard
                key={item.title}
                item={item}
                index={i}
                onSelect={() => handleSelect("project", i)}
              />
            ))}
          </div>
        )}

        {/* ── Activities 섹션 ── */}
        {activityItems.length > 0 && (
          <>
            <div
              ref={activitiesHeadingRef}
              className="mb-6 sm:mb-12 text-center mt-10 sm:mt-[100px]"
            >
              <div className="h-px w-24 bg-[var(--notion-hairline)] mx-auto mb-4 sm:mb-10" />
              <h2 className="font-display text-[clamp(1.4rem,5vw,3.2rem)] font-black tracking-[-0.04em] leading-tight mb-2 sm:mb-4">
                ACTIVITIES
              </h2>
              <div className="mt-2 sm:mt-4 h-px w-16 bg-[var(--notion-hairline)] mx-auto" />
            </div>

            <div className="pj-grid">
              {activityItems.map((item, i) => (
                <ProjectCard
                  key={item.title}
                  item={item}
                  index={i}
                  onSelect={() => handleSelect("activity", i)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── 플로팅 상세 모달 ── */}
      <AnimatePresence>
        {selectedProject && selectedModal !== null && (
          <ProjectModal
            key={selectedProject.title}
            project={selectedProject}
            index={selectedModal.index}
            onClose={() => setSelectedModal(null)}
            onPrev={() =>
              setSelectedModal((prev) =>
                prev && prev.index > 0
                  ? { ...prev, index: prev.index - 1 }
                  : prev
              )
            }
            onNext={() =>
              setSelectedModal((prev) =>
                prev && prev.index < currentList.length - 1
                  ? { ...prev, index: prev.index + 1 }
                  : prev
              )
            }
            hasPrev={selectedModal.index > 0}
            hasNext={selectedModal.index < currentList.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
});
