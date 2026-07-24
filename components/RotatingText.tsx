"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Hero-only rotating noun (CLAUDE.md motion item 1). Cycles a short list of
 * service nouns to communicate breadth without a cluttered service list; the
 * surrounding headline words are static.
 *
 * Two invariants from the brief:
 *  - Nothing above the fold is animation-gated. `initial={false}` means the
 *    first noun is present on first paint with no entrance animation.
 *  - prefers-reduced-motion collapses the 12px travel to an opacity-only fade.
 *
 * An invisible sizer holds the box to the widest noun so the surrounding
 * layout never reflows as the word changes.
 */
export function RotatingText({
  items,
  intervalMs = 2500,
  className,
}: {
  items: readonly string[];
  intervalMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (items.length <= 1) return;
    const id = setInterval(
      () => setI((p) => (p + 1) % items.length),
      intervalMs,
    );
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  const longest = items.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {/* Sizer: reserves the width of the widest noun so nothing reflows. */}
      <span className="invisible" aria-hidden="true">
        {longest}
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[i]}
          className="absolute inset-0 whitespace-nowrap"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
