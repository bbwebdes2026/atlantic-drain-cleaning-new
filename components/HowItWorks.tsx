"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * How it works (CLAUDE.md page structure item 5; motion item 2, Scroll
 * Stack). Three sequential steps genuinely suit a scroll-driven stack, but
 * scroll hijacking on a phone is how this site loses a distressed customer,
 * so the pinned effect is desktop-only (md+) and reduced-motion users get
 * the plain list unconditionally. Below 768px there is always a plain
 * stacked list — no JS branching, just two DOM trees gated by Tailwind
 * responsive display classes, so there is never a hydration mismatch.
 */
const STEPS = [
  {
    n: "01",
    title: "Call or WhatsApp",
    body: "Tell Mark what's happening — a quick description is enough to get the right kit on the way.",
  },
  {
    n: "02",
    title: "Camera inspection",
    body: "The CCTV camera goes in first, so the actual cause is confirmed before anything is cleared.",
  },
  {
    n: "03",
    title: "High-pressure clear",
    body: "Jetting clears the blockage completely — not just a temporary push-through.",
  },
] as const;

function PlainList() {
  return (
    <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6 px-4 sm:px-6">
      {STEPS.map((s) => (
        <div
          key={s.n}
          className="rounded-card border border-hairline-dark bg-ink/60 p-8 sm:p-10"
        >
          <span className="eyebrow text-surf">{s.n}</span>
          <h3 className="mt-3 font-display text-28 font-bold text-foam">
            {s.title}
          </h3>
          <p className="mt-3 text-18 text-mist">{s.body}</p>
        </div>
      ))}
    </div>
  );
}

function StackCard({
  index,
  total,
  progress,
  n,
  title,
  body,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  n: string;
  title: string;
  body: string;
}) {
  const isLast = index === total - 1;

  // Overlapping windows, not a fixed non-overlapping 1/N slice: each card's
  // own enter->hold->exit cycle spans half of total scroll progress, staggered
  // so the next card is already entering while the previous one is still
  // settling. That overlap is what makes this read as an actual stack rather
  // than one card at a time with dead scroll in between.
  const WINDOW = 0.5;
  const step = total > 1 ? (1 - WINDOW) / (total - 1) : 1;
  const start = index * step;
  const end = start + WINDOW;
  const enterEnd = start + WINDOW * 0.35;
  const exitStart = start + WINDOW * 0.75;

  const y = useTransform(
    progress,
    [start, enterEnd, exitStart, end],
    [80, 0, 0, -24],
  );
  const opacity = useTransform(
    progress,
    [start, enterEnd, exitStart, end],
    [0, 1, 1, isLast ? 1 : 0.4],
  );
  const scale = useTransform(
    progress,
    [start, enterEnd, end],
    [0.96, 1, isLast ? 1 : 0.92],
  );

  return (
    <motion.div
      style={{ y, opacity, scale, zIndex: index }}
      className="absolute inset-0 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-2xl rounded-card border border-hairline-dark bg-ink/90 p-10 shadow-lift backdrop-blur sm:p-14">
        <span className="eyebrow text-surf">{n}</span>
        <h3 className="mt-4 font-display text-40 font-bold tracking-h2 text-foam sm:text-64">
          {title}
        </h3>
        <p className="mt-4 text-18 text-mist">{body}</p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="how-it-works" className="bg-ink py-24 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow text-surf">How it works</p>
        <h2 className="mt-3 font-display text-28 font-bold tracking-h2 text-foam sm:text-40">
          Call. Camera. Clear.
        </h2>
      </div>

      {reduce ? (
        <PlainList />
      ) : (
        <>
          <div ref={ref} className="relative mt-12 hidden h-[360vh] md:block">
            <div className="sticky top-0 h-screen overflow-hidden">
              {STEPS.map((s, i) => (
                <StackCard
                  key={s.n}
                  index={i}
                  total={STEPS.length}
                  progress={scrollYProgress}
                  n={s.n}
                  title={s.title}
                  body={s.body}
                />
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <PlainList />
          </div>
        </>
      )}
    </section>
  );
}
