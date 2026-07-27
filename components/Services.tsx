import { business } from "@/data/business";

/**
 * Services (CLAUDE.md page structure item 4). A numbered editorial list —
 * not the icon-chip 3-card grid this started as, which read as generic
 * AI-page-builder output. Reuses the `01/02/03` numeral motif already
 * established in HowItWorks so this section ties visually to the rest of
 * the page. One row per `business.services` entry (jetting, camera
 * inspection, diagnosis & reporting), plus a single acknowledging line for
 * commercial work. No pricing anywhere: pricing is a WhatsApp conversation
 * with Mark (booking).
 */
export function Services() {
  return (
    <section id="services" className="bg-foam py-24 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow text-brand">What we do</p>
        <h2 className="mt-3 max-w-2xl font-display text-28 font-bold tracking-h2 text-ink sm:text-40">
          Two ways in, one clear result.
        </h2>

        <div className="mt-12 divide-y divide-hairline-light border-t border-hairline-light">
          {business.services.map((service, i) => (
            <div
              key={service.id}
              className="flex flex-col gap-2 py-8 sm:flex-row sm:items-baseline sm:gap-8 sm:py-10"
            >
              <span
                aria-hidden="true"
                className="font-display text-40 font-bold text-slate/70 sm:w-16 sm:shrink-0 sm:text-right"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-22 font-bold text-ink">
                  {service.name}
                </h3>
                <p className="mt-2 max-w-xl text-16 text-slate">
                  {service.summary}
                </p>
              </div>
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
