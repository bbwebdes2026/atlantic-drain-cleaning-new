"use client";

import { useEffect, useState } from "react";
import { business, telHref, waHref } from "@/data/business";

/**
 * Site header (CLAUDE.md page structure item 1). Logo mark left; Call + WhatsApp
 * right on desktop. Transparent over the hero, gains an `ink` background and a
 * hairline on scroll. On mobile the primary actions move to the sticky bottom
 * bar (MobileActionBar) in the thumb zone, so the top bar carries the logo only.
 *
 * Links are plain anchors, so they work with JavaScript disabled — the scroll
 * state is the only thing that needs JS, and its absence just leaves the header
 * transparent, which is harmless.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "border-b border-hairline-dark bg-ink/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#top"
          className="flex items-center rounded-input"
          aria-label={`${business.nameFull} — top of page`}
        >
          {/* SVG mark; plain <img> is correct for vector art (next/image is for
              the photography). Explicit dimensions prevent layout shift. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark.svg"
            alt="Atlantic Drain Cleaning"
            width={61}
            height={40}
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <nav className="hidden items-center gap-2 sm:flex">
          <a
            href={telHref}
            className="inline-flex min-h-11 items-center rounded-input px-4 font-body font-medium tabular-nums text-foam transition-colors hover:text-surf"
          >
            Call {business.phone.display}
          </a>
          <a
            href={waHref()}
            className="inline-flex min-h-11 items-center rounded-full bg-whatsapp px-5 font-body font-semibold text-ink shadow-fab transition-transform hover:scale-[1.02]"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
