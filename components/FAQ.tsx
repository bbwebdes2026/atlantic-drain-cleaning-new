import { business, waHref } from "@/data/business";

/**
 * FAQ (CLAUDE.md page structure item 10) — real questions only, on `foam`.
 * Every answer either restates an already-confirmed service summary from
 * `data/business.ts` or states general, non-company-specific plumbing
 * knowledge (why drains recur, how jetting works) — nothing about hours,
 * pricing, guarantees or response time, all of which are still `null` in
 * `business.pending`. Built as native `<details>`/`<summary>` so the
 * disclosure works with zero JS, consistent with the rest of the site's
 * progressive-enhancement stance. Carries `FAQPage` JSON-LD generated from
 * the same array, so the visible copy and the schema can never drift apart.
 */
const FAQS = [
  {
    q: "What is high-pressure drain jetting?",
    a: "A high-pressure water jet breaks up and flushes out what's blocking the pipe — grease, silt, tree roots, general debris — clearing the full width of the drain rather than just punching a hole through the blockage.",
  },
  {
    q: "What does a camera inspection actually show?",
    a: "A CCTV camera goes into the pipe first, so the actual cause is confirmed on screen — a crack, roots growing in through a joint, a collapsed section — before any work starts, instead of guessing.",
  },
  {
    q: "Why do the same drains keep blocking?",
    a: "Recurring blockages are usually grease build-up, tree roots intruding at a pipe joint, or a structural problem like a crack or a low spot that keeps catching debris. A camera inspection is the only way to tell which one you're dealing with.",
  },
  {
    q: "How do I get a quote?",
    a: "Message Mark directly on WhatsApp with a quick description of what's happening and he'll get back to you.",
  },
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className="bg-foam py-24 sm:py-40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="eyebrow text-brand">FAQ</p>
        <h2 className="mt-3 font-display text-28 font-bold tracking-h2 text-ink sm:text-40">
          Questions worth answering upfront.
        </h2>

        <div className="mt-10 divide-y divide-hairline-light border-t border-b border-hairline-light">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-18 font-bold text-ink marker:content-none">
                {f.q}
                <span
                  className="shrink-0 text-22 text-brand transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-xl text-16 text-slate">{f.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-14 text-slate">
          Still not sure?{" "}
          <a
            href={waHref(`Hi Mark, I have a question about ${business.nameFull}.`)}
            className="font-medium text-brand underline underline-offset-2 hover:text-ink"
          >
            Ask Mark on WhatsApp
          </a>
          .
        </p>
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}
