"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type KeyboardEvent,
  type PointerEvent,
  type TouchEvent,
} from "react";

export function EntryPage() {
  const router = useRouter();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    router.prefetch("/portfolio");
  }, [router]);

  const go = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      router.push("/portfolio#about");
    }, 400);
  }, [router, leaving]);

  const onKey = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      go();
    },
    [go]
  );

  const onTouchEnd = useCallback(
    (e: TouchEvent<HTMLElement>) => {
      e.preventDefault();
      go();
    },
    [go]
  );

  const onPointerUp = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "touch") return;
      e.preventDefault();
      go();
    },
    [go]
  );

  return (
    <main
      className={`entry-overlay ${leaving ? "entry-overlay--leaving" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="포트폴리오로 들어가기"
      data-cursor="ENTER"
      onClick={go}
      onKeyDown={onKey}
      onPointerUp={onPointerUp}
      onTouchEnd={onTouchEnd}
    >
      <Image
        src="/entry-page-mobile.png"
        alt="Minjoo portfolio entry badge"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 0px"
        className="entry-image entry-image--mobile"
      />
      <Image
        src="/entry-page.png"
        alt="Minjoo portfolio entry badge"
        fill
        priority
        sizes="(max-width: 768px) 0px, 100vw"
        className="entry-image entry-image--desktop"
      />
    </main>
  );
}
