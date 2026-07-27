import { business } from "./business";

/**
 * `LocalBusiness`/`Plumber` JSON-LD (CLAUDE.md SEO section). Built entirely
 * from confirmed `data/business.ts` fields — no invented specifics.
 *
 * Two fields are deliberately absent, not just empty:
 *   - `openingHoursSpecification` — PENDING OWNER CONFIRMATION
 *     (`business.pending.tradingHours`). An invented schedule is worse than
 *     none; search engines treat a missing field as unknown, not closed.
 *   - `sameAs` — there is no Google Business Profile yet (see
 *     PROJECT_STATUS.md blockers). Add it the day one exists.
 *
 * No `streetAddress`: the pamphlet gives a service region, not a storefront
 * address, so `address` only carries the confirmed locality/region/country.
 */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": `${business.url}/#business`,
  name: business.nameFull,
  image: `${business.url}/images/hero.webp`,
  url: business.url,
  telephone: business.phone.tel,
  email: business.email,
  description: business.servicesStrapline,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cape Town",
    addressRegion: "Western Cape",
    addressCountry: "ZA",
  },
  areaServed: business.areasServed.map((suburb) => ({
    "@type": "Place",
    name: suburb.name,
  })),
} as const;
