"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";

export function EntryPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const scaleWrapRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const idleTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(scaleWrapRef.current, { scale: 1.15 });
    gsap.set(vignetteRef.current, { opacity: 0 });

    tl.to(scaleWrapRef.current, {
      scale: 1.0,
      duration: 2,
      ease: "power2.out",
    });

    tl.to(vignetteRef.current, { opacity: 1, duration: 1.5 }, 0.3);

    tl.call(() => {
      idleTween.current = gsap.to(scaleWrapRef.current, {
        scale: 1.05,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      tl.kill();
      idleTween.current?.kill();
    };
  }, []);

  const enterPortfolio = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    idleTween.current?.kill();

    const exitTl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => router.push("/portfolio#about"),
    });

    // Zoom into the card
    exitTl.to(scaleWrapRef.current, {
      scale: 3,
      duration: 1.2,
      ease: "power3.in",
    });

    // Fade to white while zooming
    exitTl.to(mainRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    }, 0.5);
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
      ref={mainRef}
      className="entry-overlay"
      role="button"
      tabIndex={0}
      aria-label="포트폴리오로 들어가기"
      data-cursor="ENTER"
      onClick={enterPortfolio}
      onKeyDown={handleKeyDown}
    >
      <div className="entry-cinematic">
        <div ref={scaleWrapRef} className="entry-scale-wrap">
          <img
            src="/entry-page.png"
            alt=""
            draggable={false}
            className="entry-image"
          />
        </div>
        <div ref={vignetteRef} className="entry-vignette" />
        <div className="entry-grain" />
      </div>
    </main>
  );
}
