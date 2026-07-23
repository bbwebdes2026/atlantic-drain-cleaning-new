/**
 * business.ts — the single typed source of truth for Atlantic Drain Cleaning.
 *
 * Two tiers of fact (see CLAUDE.md "Content truth rules"):
 *
 *   1. CONFIRMED — pamphlet-sourced. The client's own published marketing words,
 *      lightly rewritten for the web. Safe to render.
 *   2. UNCONFIRMED — typed but set to `null` with a `// PENDING OWNER CONFIRMATION`
 *      comment. Any component that would render one of these MUST NOT render at all
 *      when the value is null. Never substitute a placeholder string, a lorem line,
 *      or a plausible-looking guess.
 *
 * A missing trust badge is invisible; a wrong one is a liability on a family
 * client's business.
 */

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface Phone {
  /** As printed on the pamphlet, for display. */
  readonly display: string;
  /** Local dialling string with no spaces. */
  readonly local: string;
  /** E.164 for `tel:` links. Leading zero dropped, +27 prefix. */
  readonly tel: string;
  /** wa.me path segment. Leading zero dropped, 27 prefix, no `+`. */
  readonly wa: string;
}

export interface Service {
  readonly id: string;
  readonly name: string;
  /** One-line description drawn from pamphlet positioning. */
  readonly summary: string;
}

export interface Suburb {
  readonly name: string;
  /** URL slug for the phase-2 `app/[suburb]/page.tsx` route. Not built yet. */
  readonly slug: string;
}

/**
 * Facts the client has not yet confirmed. Every field is `null` until Mark
 * confirms it in writing. Rendering code must guard on null and omit the UI.
 */
export interface PendingFacts {
  /** Trading hours. Drives `openingHoursSpecification` — omitted from JSON-LD while null. */
  readonly tradingHours: null;
  /** Genuine 24/7 availability. Do not publish unless Mark will answer at 2am. */
  readonly availability24_7: null;
  /** PIRB (Plumbing Industry Registration Board) registration number. */
  readonly pirbRegistration: null;
  /** Public-liability / workmanship insurance. */
  readonly insured: null;
  /** Any workmanship or satisfaction guarantee. */
  readonly guarantee: null;
  /** Pricing. Pricing is a WhatsApp conversation with Mark, never on the page. */
  readonly pricing: null;
  /** A concrete response-time promise (e.g. "within the hour"). */
  readonly responseTime: null;
  /** Exact years in operation, as a number. The pamphlet's "over 25 years"
   *  experience claim is a usable positioning string (see `positioning`); a
   *  precise operating figure is a separate, unconfirmed fact. */
  readonly yearsOperating: null;
  /** Customer testimonials. None exist yet; none may be invented. */
  readonly testimonials: null;
}

export interface Business {
  /** Name lockup, rendered as two lines in the wordmark. */
  readonly name: { readonly line1: string; readonly line2: string };
  /** Full name as a single string for prose, alt text, schema. */
  readonly nameFull: string;
  readonly tagline: string;
  readonly servicesStrapline: string;
  readonly owner: string;
  readonly phone: Phone;
  readonly email: string;
  /** Broad region the business serves, as printed on the pamphlet. */
  readonly region: string;
  readonly services: readonly Service[];
  readonly areasServed: readonly Suburb[];
  /** Pamphlet-sourced positioning claims — the client's own published words. */
  readonly positioning: readonly string[];
  readonly pending: PendingFacts;
}

/* -------------------------------------------------------------------------- */
/*  Confirmed data (pamphlet-sourced)                                         */
/* -------------------------------------------------------------------------- */

export const business: Business = {
  name: { line1: "Atlantic", line2: "Drain Cleaning" },
  nameFull: "Atlantic Drain Cleaning",
  tagline: "Waves of Change",
  servicesStrapline:
    "Drainpipe camera inspection · High-pressure drain cleaning",
  owner: "Mark Lipman",

  phone: {
    display: "082 308 4750",
    local: "0823084750",
    tel: "+27823084750",
    wa: "27823084750",
  },

  email: "mark@atlanticdraincleaning.co.za",
  region: "Atlantic Seaboard, Cape Town",

  services: [
    {
      id: "jetting",
      name: "High-pressure drain cleaning",
      summary:
        "High-pressure jetting clears blocked drains, grease, stormwater lines and tree roots.",
    },
    {
      id: "camera",
      name: "Drainpipe camera inspection",
      summary:
        "CCTV camera inspection locates the actual cause inside the pipe, not a guess.",
    },
  ],

  // Atlantic Seaboard suburb list (CLAUDE.md, Areas served). Also the phase-2
  // `/[suburb]` route map — the slugs exist now so nothing restructures later.
  areasServed: [
    { name: "Sea Point", slug: "sea-point" },
    { name: "Green Point", slug: "green-point" },
    { name: "Mouille Point", slug: "mouille-point" },
    { name: "Three Anchor Bay", slug: "three-anchor-bay" },
    { name: "Fresnaye", slug: "fresnaye" },
    { name: "Bantry Bay", slug: "bantry-bay" },
    { name: "Clifton", slug: "clifton" },
    { name: "Camps Bay", slug: "camps-bay" },
    { name: "Bakoven", slug: "bakoven" },
    { name: "V&A Waterfront", slug: "va-waterfront" },
    { name: "City Bowl", slug: "city-bowl" },
  ],

  positioning: [
    "Specialists in all blocked drains and drain-related issues",
    "Plumbers with over 25 years of experience",
    "Cutting-edge equipment",
    "Rapid response",
    "Affordable rates",
    "Based on the Atlantic Seaboard",
  ],

  pending: {
    tradingHours: null, // PENDING OWNER CONFIRMATION
    availability24_7: null, // PENDING OWNER CONFIRMATION
    pirbRegistration: null, // PENDING OWNER CONFIRMATION
    insured: null, // PENDING OWNER CONFIRMATION
    guarantee: null, // PENDING OWNER CONFIRMATION
    pricing: null, // PENDING OWNER CONFIRMATION
    responseTime: null, // PENDING OWNER CONFIRMATION
    yearsOperating: null, // PENDING OWNER CONFIRMATION
    testimonials: null, // PENDING OWNER CONFIRMATION
  },
};

/* -------------------------------------------------------------------------- */
/*  Derived link helpers                                                      */
/* -------------------------------------------------------------------------- */

/** `tel:` href built from the confirmed E.164 number. */
export const telHref = `tel:${business.phone.tel}`;

/**
 * Build a wa.me deep link. The prefill pattern Mark asked for is composed at
 * the booking form (step 7); this bare link is the zero-JS fallback path.
 * Uses `27823084750` — a leading zero silently fails.
 */
export function waHref(prefill?: string): string {
  const base = `https://wa.me/${business.phone.wa}`;
  return prefill ? `${base}?text=${encodeURIComponent(prefill)}` : base;
}

/** `mailto:` href for the confirmed address. */
export const emailHref = `mailto:${business.email}`;
