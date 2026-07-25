"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * True Focus (CLAUDE.md motion item 4) — the site's signature moment. Pulls
 * a blurred pipe still into sharp focus as it scrolls into view: literally
 * what the camera inspection does, and the strongest visual argument on the
 * page for "we find the actual cause, not a guess". `viewport={{ once: true }}`
 * so it resolves once rather than replaying every time it re-enters view.
 *
 * `prefers-reduced-motion` collapses the blur + scale to a plain opacity
 * fade, per the global motion rule.
 */
export function TrueFocus({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, filter: "blur(24px)", scale: 1.04 }
      }
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, filter: "blur(0px)", scale: 1 }
      }
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
