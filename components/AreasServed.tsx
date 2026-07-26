import { business } from "@/data/business";

/**
 * Areas served (CLAUDE.md page structure item 8) — the SEO surface and the
 * phase-2 `/[suburb]` route map. Rendered entirely from `data/business.ts`
 * so the list never drifts from the suburb slugs those future routes will
 * use. Chips use `rounded-card`, not full-round — CLAUDE.md reserves
 * full-round for the WhatsApp button alone, the page's one soft shape.
 * Not linked yet: the suburb pages themselves are explicitly out of scope
 * for phase 1, and a link to a route that 404s is worse than plain text.
 */
export function AreasServed() {
  return (
    <section id="areas-served" className="bg-ink py-24 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow text-surf">Areas served</p>
        <h2 className="mt-3 max-w-2xl font-display text-28 font-bold tracking-h2 text-foam sm:text-40">
          Across the Atlantic Seaboard.
        </h2>

        <ul className="mt-12 flex flex-wrap gap-3">
          {business.areasServed.map((suburb) => (
            <li
              key={suburb.slug}
              className="rounded-card border border-hairline-dark px-4 py-2 font-body text-14 text-mist"
            >
              {suburb.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
