"use client";

import { memo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

const wordVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASE as unknown as [number, number, number, number],
      delay: i * 0.04,
    },
  }),
};

export const TextReveal = memo(function TextReveal({
  text,
  className = "",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-15%" });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={i + delay / 0.04}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
});
