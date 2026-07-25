import type { ReactNode } from "react";
import { business } from "@/data/business";

/**
 * Services (CLAUDE.md page structure item 4). Three cards on `foam` — one
 * per `business.services` entry (jetting, camera inspection, diagnosis &
 * reporting) — plus a single acknowledging line for commercial work. No
 * pricing anywhere: pricing is a WhatsApp conversation with Mark (booking).
 */
const ICONS: Record<string, ReactNode> = {
  jetting: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-6 w-6">
      <path
        d="M5 14c1.5-4 3.5-6 7-6s5.5 2 7 6M6 18c1.2-3 2.8-4.5 6-4.5s4.8 1.5 6 4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-6 w-6">
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M8 7l1.6-2.4a1 1 0 0 1 .84-.6h3.12a1 1 0 0 1 .84.6L16 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13.5" r="3.5" stroke="currentColor" />
    </svg>
  ),
  diagnosis: (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.5} className="h-6 w-6">
      <rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="2"
        stroke="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M9 4V3.5A1.5 1.5 0 0 1 10.5 2h3A1.5 1.5 0 0 1 15 3.5V4"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M8.5 13.5l2 2 4-4.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function Services() {
  return (
    <section id="services" className="bg-foam py-24 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow text-brand">What we do</p>
        <h2 className="mt-3 max-w-2xl font-display text-28 font-bold tracking-h2 text-ink sm:text-40">
          Two ways in, one clear result.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {business.services.map((service) => (
            <div
              key={service.id}
              className="rounded-card border border-hairline-light bg-mist p-6 shadow-lift transition-transform hover:scale-[1.02]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-card bg-brand/10 text-brand">
                {ICONS[service.id]}
              </div>
              <h3 className="mt-5 font-display text-18 font-bold text-ink">
                {service.name}
              </h3>
              <p className="mt-2 text-14 text-slate">{service.summary}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-body text-14 text-slate">
          Commercial and body-corporate work is also welcome — get in touch to
          discuss your site.
        </p>
      </div>
    </section>
  );
}
