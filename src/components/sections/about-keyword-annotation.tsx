"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AboutKeywordAnnotationProps {
  keyword: string;
  description: string;
}

export function AboutKeywordAnnotation({
  keyword,
  description,
}: AboutKeywordAnnotationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const triggerRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition(rect.top < 160 ? "bottom" : "top");
  }, []);

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePosition();
    setIsOpen(true);
  }, [updatePosition]);

  const scheduleClose = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || cardRef.current?.contains(t)) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span className="relative inline">
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        data-no-section-nav
        className={`
          inline cursor-pointer
          underline underline-offset-[4px] decoration-dotted decoration-[1px]
          transition-colors duration-200
          ${isOpen
            ? "text-foreground decoration-foreground/50"
            : "decoration-foreground/20 hover:text-foreground hover:decoration-foreground/40"
          }
        `}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
        onClick={() => setIsOpen((v) => !v)}
        onFocus={open}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((v) => !v);
          }
        }}
        aria-expanded={isOpen}
      >
        {keyword}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={cardRef}
            role="tooltip"
            data-no-section-nav
            className={`absolute left-0 z-[200] w-[300px] sm:w-[340px] ${
              position === "top" ? "bottom-full mb-3" : "top-full mt-3"
            }`}
            initial={{ opacity: 0, y: position === "top" ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === "top" ? 4 : -4 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="bg-white border border-foreground/[0.08] rounded-sm shadow-[0_4px_24px_rgba(0,0,0,0.06)] px-5 py-4">
              <p className="font-sans text-[13px] sm:text-[14px] leading-[1.75] tracking-[0.005em] text-foreground/60">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
