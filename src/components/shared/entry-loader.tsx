"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState, type KeyboardEvent } from "react";

export function EntryPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const enterPortfolio = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    window.setTimeout(() => router.push("/portfolio"), 400);
  }, [isExiting, router]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      enterPortfolio();
    },
    [enterPortfolio]
  );

  return (
    <main
      className="entry-overlay entry-fadein"
      data-state={isExiting ? "exiting" : "idle"}
      role="button"
      tabIndex={0}
      aria-label="포트폴리오로 들어가기"
      onClick={enterPortfolio}
      onKeyDown={handleKeyDown}
    >
      <div className="entry-overlay__surface" />
      <div className="paper-wrapper">
        <img
          src="/entry-page.png"
          alt=""
          className="paper-image"
          draggable={false}
        />
        <div className="paper-grain" />
        <div className="paper-highlight" />
      </div>
    </main>
  );
}
