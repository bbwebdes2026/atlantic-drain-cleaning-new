import { business, telHref, emailHref } from "@/data/business";

/**
 * Footer (CLAUDE.md page structure item 11) — logo, phone, email, areas
 * served, "Waves of Change". Every contact detail is read straight from
 * `data/business.ts` with no reformatting, because NAP (name/address/phone)
 * consistency with the future Google Business Profile is a real local-SEO
 * ranking factor — this is the one place that byte-identical match matters
 * most, since it's the block most likely to get copied into a directory
 * listing. `logo-full.svg` already carries "Waves of Change" in the lockup;
 * it's repeated as plain text in the credit line per CLAUDE.md, which calls
 * for the tagline in both places.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline-dark bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-full.svg"
              alt={`${business.nameFull} — ${business.tagline}`}
              width={217}
              height={65}
              className="h-14 w-auto"
            />
            <p className="mt-4 max-w-xs font-body text-14 text-steel">
              {business.region}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <p className="eyebrow text-surf">Contact</p>
              <p className="mt-3 font-body text-16 text-foam">
                <a href={telHref} className="tabular-nums hover:text-surf">
                  {business.phone.display}
                </a>
              </p>
              <p className="mt-1 font-body text-16 text-foam">
                <a href={emailHref} className="hover:text-surf">
                  {business.email}
                </a>
              </p>
            </div>

            <div>
              <p className="eyebrow text-surf">Areas served</p>
              <p className="mt-3 max-w-xs font-body text-14 text-steel">
                {business.areasServed.map((s) => s.name).join(" · ")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-hairline-dark pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-14 text-steel">
            {business.nameFull} · {business.tagline}
          </p>
          <p className="font-body text-14 text-steel">
            © {year} {business.nameFull}
          </p>
        </div>
      </div>
    </footer>
  );
}
