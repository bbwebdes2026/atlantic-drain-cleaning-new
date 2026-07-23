# CLAUDE.md — Atlantic Drain Cleaning ("Waves of Change")

## What this project is

A showcase-calibre lead-generation site for Atlantic Drain Cleaning, a high-pressure drain
cleaning and CCTV camera inspection business run by Mark Lipman on the Atlantic Seaboard,
Cape Town. The site is a portfolio piece and the client's first web presence. The bar is
"award-worthy small-studio work", not "solid agency template".

The counter-positioning is the whole point: every competitor in this market
(Combat Plumbing, The Drain Surgeon, Flush & Rush, The Cape Town Plumber) runs the same
cluttered, keyword-stuffed, bright-blue-and-red SEO template. Clean, dark, minimal and
photographic is the differentiator. Do not drift back toward the category norm.

**The audience is a person in distress on a mid-range phone.** Someone with sewage backing
up into their kitchen. Every design decision loses to that fact. The phone number and the
WhatsApp button must be readable and tappable on first paint, always, on a bad connection.

Brand facts (from the client pamphlet in `/assets-raw`):

- Name lockup: `ATLANTIC` / `Drain Cleaning`, blue wave mark, tagline "WAVES OF CHANGE"
- Services strapline: "Drainpipe camera inspection | High pressure drain cleaning"
- Owner: Mark Lipman · 082 308 4750 · mark@atlanticdraincleaning.co.za
- Positioning: specialises in all blocked drains and drain-related issues; cutting-edge
  equipment; plumbers with over 25 years of experience; rapid response; located on the
  Atlantic Seaboard; affordable rates
- Primary customer base: long-standing household clients. Commercial work is welcome but
  is a single line in Services, never its own section.

## Content truth rules (non-negotiable)

There are two tiers of fact and they are treated differently:

1. **Pamphlet-sourced claims are usable.** "Over 25 years of experience", "cutting-edge
   equipment", "rapid response", "affordable rates", "Atlantic Seaboard" are the client's
   own published marketing words. Use them, lightly rewritten for the web.
2. **Everything else must be confirmed before it ships.** Do NOT invent, infer or
   "reasonably assume": trading hours, 24/7 availability, PIRB registration, insurance,
   guarantees, response-time promises, job counts, prices, or testimonials.

All business facts live in one typed module, `data/business.ts`. Anything unconfirmed is
declared there as `null` with a `// PENDING OWNER CONFIRMATION` comment, and the component
that would render it **does not render at all** when the value is null. Never render a
placeholder string, a lorem line, or a plausible-looking guess. A missing trust badge is
invisible; a wrong one is a liability on a family client's business.

No lorem ipsum anywhere, ever. No stock photography — the client's own job photos only.

## Stack (do not substitute)

- Next.js 15+, App Router, TypeScript
- Tailwind CSS v4 (tokens below wired into the theme)
- Framer Motion — all motion, including scroll choreography
- react.bits components (copy-paste in individually, adapt to tokens)
- Sharp (image pipeline, build-time script)
- Deploy target: Vercel

**Deliberately NOT in the stack:** Lenis, GSAP, ScrollTrigger, any WebGL/shader
background. This audience is on a phone in a crisis; smooth-scroll hijacking and a
shader canvas are a tax paid by the person least able to afford it. Framer Motion's
`useScroll` covers everything this site needs. Do not add dependencies without asking.

## Routing

Single static page at `app/page.tsx`, but scaffold the App Router so per-suburb landing
pages can be added later at `app/[suburb]/page.tsx` without restructuring. Do **not**
build suburb pages in phase 1 — just leave the door open. Competitors already run them
and that is the phase-2 SEO move.

## Assets

- Raw assets live in `/assets-raw` (≈48 job photographs + the pamphlet). NEVER use them
  directly in the app.
- The image pipeline writes processed, web-ready images to `/public/images`. All
  components consume only `/public/images` via `next/image` with explicit `sizes`.
- **Every photo is WhatsApp-compressed.** They carry visible artefacts. The image
  pipeline and the art direction both exist to manage this — see below. Originals have
  been requested from the client and are an open blocker.
- **The hero image is `WhatsApp_Image_20260721_at_11_57_14.jpeg`** — the camera rig open
  on a wall above Sea Point with the stadium and the Atlantic behind it. It is the only
  genuinely beautiful frame in the set, it geo-locates the business instantly, and it
  shows the technology. It is the hero; do not audition alternatives.
- The pamphlet (`WhatsApp_Image_20260616_at_10_27_36.jpeg`) is the source of truth for
  brand copy and the logo lockup. It is a transcription source, never UI.

### Imagery treatment — three tiers

The photography is honest proof of work, but most of it is drain contents. Contained
reads as professional evidence; full-bleed reads as repellent. Enforce the tiers:

- **Tier 1 — Hero.** The Sea Point rig shot only. Navy multiply overlay plus a gradient
  scrim for text legibility.
- **Tier 2 — Proof of work.** Blockages, extracted grease, tree roots, jetting in
  progress. Desaturate slightly, unify with a cool navy grade. Presented **small in a
  contained grid, never full-bleed, never as a section background.**
- **Tier 3 — Camera stills.** The CCTV monitor photographs. Crop the monitor bezel out
  entirely and present the frame inside a custom monitor component. This is the site's
  signature (see Motion, item 4).

Ratio discipline: 3:2 landscape or 4:5 portrait. Never mix ratios within a grid. Cap
displayed width of compressed images at 720px until originals arrive.

## Logo

The client has no vector logo. Producing one is part of this build.

Redraw the pamphlet mark faithfully as SVG — wave, `ATLANTIC` / `Drain Cleaning` lockup,
"WAVES OF CHANGE". **Redraw, do not redesign.** The mark is client-owned and fixed.
Output `public/logo-full.svg` (horizontal lockup) and `public/logo-mark.svg` (wave only,
for the header and favicon). Set the wordmark as outlined paths, not live text.

"Waves of Change" belongs in the lockup and the footer. It is never the hero headline —
someone with a blocked drain needs "cleared today", not poetry.

## Design tokens

Colours (Tailwind names → hex):

- `abyss`      #071520 — deepest background, hero scrim base
- `ink`        #0B1E2D — primary page background, body text on light
- `brand`      #0F73B8 — the logo blue. Links, active states, brand moments
- `surf`       #46A9E0 — accents, icon strokes, hairline highlights on dark
- `whatsapp`   #25D366 — **the WhatsApp CTA and nothing else, ever**
- `foam`       #F4F7F9 — light section background
- `mist`       #E2E9EE — light dividers, card fills on light
- `steel`      #8CA3B3 — muted text on dark
- `slate`      #465A6B — muted text on light

Rules: the page is dark by default; `foam` marks the two light zones (Services and FAQ)
and nothing else. WhatsApp green is scarce by design — that scarcity is what makes the
primary action instantly legible, so do not let it leak into borders, icons, or hovers.
**No red anywhere.** Red urgency is the category cliché and it reads cheap.

Typography:

- Display: **Archivo** (Google Fonts, variable) — headings, numerals, eyebrows.
  Weights 600/700 only. Tracking −0.03em at display sizes, −0.02em at H2.
- Body/UI: **IBM Plex Sans** (Google Fonts, variable) — body copy, nav, buttons, forms.
  Weights 400/500/600. Use its tabular figures for the phone number.
- Wire both via `next/font/google` with `display: swap` and subset `latin`.
- Type scale: 12 / 14 / 16 / 18 / 22 / 28 / 40 / 64 / 88. Body 16.
  Hero display `clamp(2.5rem, 8vw, 5.5rem)` at leading 0.95.
  Eyebrow: 12px, weight 600, uppercase, tracking +0.14em.

Spacing: 4px base — 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 160.
Section rhythm 96px mobile, 160px desktop.

Radius: 4 (inputs) / 8 (cards) / 12 (image containers). Full-round is permitted on the
WhatsApp button **only**, so it is the single soft shape on the page.

Elevation: shadows are invisible on dark, so elevation is hairlines —
`1px rgba(255,255,255,0.08)` on dark, `1px rgba(11,30,45,0.08)` on light.
Exactly two real shadows exist:
`--shadow-lift: 0 2px 8px rgba(7,21,32,.08), 0 12px 32px rgba(7,21,32,.10)`
`--shadow-fab: 0 8px 24px rgba(37,211,102,.28)`

## Motion system

Durations: 180–320ms for UI, 600–900ms for scroll reveals.
Easing: `cubic-bezier(0.22, 1, 0.36, 1)` entrances, `cubic-bezier(0.4, 0, 0.2, 1)` UI.
Reveal travel capped at **16px** — further reads as a template.
One motion moment per viewport. Never two competing.
`prefers-reduced-motion` collapses every transform to opacity.

**The hard rule: nothing above the fold is animation-gated.** The headline, the phone
number and the WhatsApp button render statically on first paint. No entrance animation
may delay, fade in, or transform them.

Four react.bits components, each doing real work:

1. **Rotating Text** — hero only, on the service noun: Blocked drains / Grease traps /
   Stormwater / Tree roots. Four items, 2.5s dwell. It communicates breadth without a
   cluttered service list. The surrounding headline words are static.
2. **Scroll Stack** — the three-step process (Call → Camera → Clear). Sequential content
   genuinely suits it. **Must degrade to a plain stacked list below 768px** — scroll
   hijacking on a phone is how this site loses a distressed customer.
3. **Gradual Blur** — the top and bottom edges of the proof-of-work gallery. Not
   decoration: it masks the seam where compressed photography meets the next section.
4. **True Focus** — the camera-inspection section, pulling a blurred pipe still into
   focus. **This is the site's signature.** It is the one place boldness is spent: it is
   literally what the product does, no competitor shows the diagnostic view, and it is
   the strongest argument for "we find the actual cause". Get this section right.

Do NOT add typewriter effects, parallax, animated gradients, shader backgrounds, count-up
numbers, or any effect not listed. Ambient background is a static deep radial gradient
plus a 3% noise overlay — nothing animated.

Hover micro-interactions: Framer Motion, subtle (scale 1.02, 200–300ms, ease-out).

## Page structure (homepage, in order)

1. **Header.** Logo mark left; "Call" and "WhatsApp" right. On mobile this collapses to a
   **sticky bottom bar in the thumb zone** — this single decision will move conversion
   more than anything else on the page. Header is transparent over the hero, gains an
   `ink` background with a hairline on scroll.
2. **Hero.** Eyebrow "Atlantic Seaboard · Cape Town" / display headline with the Rotating
   Text noun / one-line subline naming both services / WhatsApp primary CTA + Call
   secondary / three-item trust strip. Sea Point rig photograph behind a navy scrim.
3. **Trust bar.** Thin, quiet, directly under the fold. Renders only the facts that are
   confirmed in `data/business.ts`; collapses gracefully if some are null.
4. **Services.** Three cards on `foam`: high-pressure jetting, CCTV camera inspection,
   diagnosis and reporting. One line acknowledging commercial work. No pricing — pricing
   is a WhatsApp conversation with Mark (see Booking).
5. **How it works.** Scroll Stack, three steps: Call → Camera → Clear.
6. **Camera inspection — the signature section.** True Focus, monitor-framed Tier 3
   stills, copy about finding the actual cause rather than guessing. Dark, full-width,
   the most confident moment on the page.
7. **Proof of work.** Contained grid of Tier 2 photography with Gradual Blur on the top
   and bottom container edges.
8. **Areas served.** Sea Point, Green Point, Mouille Point, Three Anchor Bay, Fresnaye,
   Bantry Bay, Clifton, Camps Bay, Bakoven, V&A Waterfront, City Bowl. This is the SEO
   surface and the phase-2 route map. Render from `data/business.ts`.
9. **Booking.** The WhatsApp form — see below.
10. **FAQ.** On `foam`. Real questions only (what jetting is, what a camera inspection
    finds, what causes recurring blockages, how to get a quote). No invented pricing or
    response times. Carries `FAQPage` schema.
11. **Footer.** Logo, phone, email, areas served, "Waves of Change". Name/phone/address
    formatting must be **byte-identical** to whatever goes on the Google Business
    Profile — NAP consistency is a real local-SEO ranking factor.

## WhatsApp booking (the conversion core — get this exactly right)

No backend. Three fields — name, mobile number, brief description of the problem — that
compose a URL-encoded `wa.me` deep link.

- Number format: **`wa.me/27823084750`**. Drop the leading zero, prefix 27. A leading
  zero silently fails.
- Prefill pattern: `Hi Mark, it's {name} ({mobile}). {description}` — Mark asked for
  exactly these three things in one message.
- **Build the `href` on input change so the anchor is a real link at click time.** If the
  URL is constructed inside an async click handler, iOS Safari's popup blocker eats it.
  This is the single most likely bug in the build; test it on a real iPhone.
- Client-side validation only, and keep it forgiving — a blocked-drain customer typing
  one-handed must not be blocked by a regex. Never disable the submit control.
- Progressive enhancement: the raw `tel:` and `wa.me` links in the header work with zero
  JS. The form is an enhancement, never the only path.
- The floating WhatsApp button is the only full-round, only-green element on the page.

**Known limitation, documented deliberately:** with no backend there is no lead record.
If Mark loses the chat, the lead is gone, and there is no data on what the site produces.
This is accepted for phase 1 and logged as the phase-2 recommendation.

## SEO

- `LocalBusiness` / `Plumber` JSON-LD in a typed module (`data/schema.ts`), with
  `areaServed` covering the suburb list, `telephone`, `email`, `url`, and `sameAs` once
  the Google Business Profile exists. `openingHoursSpecification` is **omitted entirely**
  until hours are confirmed — an invented one is worse than none.
- `FAQPage` JSON-LD on the FAQ section.
- Full OpenGraph + Twitter tags, canonical, `sitemap.ts`, `robots.ts`, favicon.
- OG image: the Sea Point rig shot with the lockup, not a logo-on-navy card.
- Title/meta target the real query: blocked drains and drain camera inspection on the
  Atlantic Seaboard / Sea Point, Cape Town.

Note for the record: the highest-leverage SEO action on this project is not on this site.
Competitors are winning on Google review volume (Combat Plumbing 426, Drain Surgeon 310);
Atlantic has no Google Business Profile at all. Claiming and populating that profile will
out-earn every technical decision in this file combined. It is an engagement deliverable,
not a code deliverable.

## Domain and deployment (read before touching DNS)

**`atlanticdraincleaning.co.za` is almost certainly already registered** — the client's
email runs on it. This is a registrar-access job, not a purchase.

- Ship to the Vercel preview URL (`*.vercel.app`). Show the client that.
- **Do not touch DNS until the client has approved and registrar access is confirmed.**
- When it is time: keep DNS where the mail lives, add only the A/CNAME records Vercel
  shows in its dashboard, and **leave the MX records untouched**. Verify mail delivers
  before and after the change. Careless DNS work here takes down the client's email.

## Quality floor (non-negotiable)

- Lighthouse mobile ≥ 90 on all four categories, every changed page. Performance target
  is deliberately higher here than a normal brochure site — the audience is on a phone
  on mobile data and Core Web Vitals feed local search ranking.
- Fully responsive to 360px.
- Tap targets ≥ 44×44px. Thumb-zone placement for primary actions on mobile.
- Keyboard focus visible (`surf` focus rings), semantic landmarks, real alt text
  describing the work shown (not "image of a drain").
- WCAG AA: 4.5:1 body, 3:1 large text. Check `steel` on `ink` and all text over the hero
  scrim specifically.
- `prefers-reduced-motion` respected everywhere.
- No layout shift from images — always set dimensions.
- Phone number and WhatsApp link functional with JavaScript disabled.

## Image pipeline (build FIRST, before any UI)

Create `scripts/enhance-images.mjs`, runnable via `npm run images`:

1. **Upscale pass.** Download the `realesrgan-ncnn-vulkan` release binary for the current
   OS into `scripts/bin` (gitignored). Every source image is WhatsApp-compressed, so
   upscale 2× with the general photo model where the long edge is under ~1600px. Track
   processed files by content hash in a manifest so reruns are cheap. CPU fallback fine.
2. **Grade pass (Sharp).** One shared grade across all photography so a set shot by
   different people on different phones reads as one library: gentle S-curve, shadows
   tinted toward `ink`, mild desaturation, cool cast. Tier 2 gets slightly heavier
   desaturation than Tier 1.
3. **Tier 3 crops.** Flagged CCTV monitor shots: crop the bezel out to the screen
   rectangle only, output at 3:2.
4. **Output.** `/public/images`, AVIF/WebP where beneficial, max 2400px long edge,
   quality ~80. `manifest.json` maps raw → processed.

The art direction intentionally covers remaining quality limits: dark scrims, tight crops
instead of full-bleed, Gradual Blur on gallery edges, contained grids.

## Workflow

Work strictly one section at a time. After completing a section: run the build, run the
Self-QA loop, commit and push, update PROJECT_STATUS.md, then STOP and ask for review
before starting the next.

## Git discipline

Commit after every completed section with a descriptive message
(e.g. `feat(booking): compose wa.me deep link from form state`). Push to origin after
every commit. Never end a session with uncommitted or unpushed changes.

## Self-QA loop (run before every review request)

- Playwright screenshots of every changed page at 360px, 768px, 1440px. Review them
  yourself and fix visual issues before asking for review.
- Lighthouse on changed pages, mobile. All four categories ≥ 90.
- WCAG AA contrast check — especially `steel` on `ink` and text over the hero scrim.
- The WhatsApp deep link: verify the composed URL is correct, encoded, and that the
  anchor carries a valid `href` before click. Test on a real iPhone if available.
- Verify no unconfirmed fact has crept into the UI — grep for hours, PIRB, guarantees,
  prices, response times.
- All images WebP/AVIF, compressed, lazy below the fold.
- JSON-LD and OpenGraph present and valid.

## Status tracking

Maintain PROJECT_STATUS.md in the repo root. Update it at the end of every working block:
what was completed, what is in progress, decisions made, current quality-gate scores.
Keep it terse. Keep the decisions log append-only, newest first.

## Build order

The client preview is the near-term deadline, so a deployable, showable thing exists by
step 3. Do not let steps 1–3 sprawl.

1. Scaffold + tokens + fonts + `data/business.ts` + a placeholder homepage that proves
   tokens and fonts render. **Push to Vercel and confirm the preview URL is live.** Commit.
2. Logo vectorisation (`logo-full.svg`, `logo-mark.svg`) + image pipeline script; run it;
   commit the manifest, not the binary. Commit.
3. Header (incl. mobile sticky bottom bar) + Hero + the WhatsApp deep-link plumbing.
   **This is the client preview milestone — stop and get it in front of Mark.** Commit.
4. Trust bar + Services + How it works (Scroll Stack). Commit.
5. Camera inspection signature section (True Focus + monitor frames). Commit.
6. Proof-of-work gallery (Gradual Blur) + Areas served. Commit.
7. Booking form + FAQ + Footer. Commit.
8. SEO/schema/OG + performance and accessibility pass against the quality floor. Commit.
