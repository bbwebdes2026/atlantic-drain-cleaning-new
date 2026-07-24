# Step 3 — Header + Hero + WhatsApp deep-link plumbing

**The client-preview milestone.** A deployable, showable page now exists.

## What was done

- **Header** (`components/Header.tsx`, client) — fixed top bar, logo mark left. Transparent
  over the hero; gains an `ink/95` background + a hairline on scroll (`window.scrollY > 8`).
  Desktop shows Call + WhatsApp; on mobile the top bar is logo-only and the actions move to
  the bottom bar. Links are plain anchors, so they work with JS disabled — only the scroll
  tint needs JS, and its absence just leaves the header transparent.
- **Mobile sticky action bar** (`components/MobileActionBar.tsx`, server) — fixed bottom,
  two ≥48px targets (Call / WhatsApp) in the thumb zone, `sm:hidden`. Bottom padding honours
  the iOS home-indicator safe area (`env(safe-area-inset-bottom)`). This is the highest-
  leverage conversion decision in the brief.
- **Hero** (`components/Hero.tsx`, server) — Sea Point rig shot (`/images/hero.webp`) via
  `next/image` `fill priority sizes="100vw"` (LCP, eager, no layout shift), behind a navy
  `mix-blend-multiply` overlay + a bottom-anchored `ink` gradient scrim. Content: eyebrow
  (region), display headline "We clear" + the rotating noun, one-line subline naming both
  services (composed from `data/business.ts`), WhatsApp primary CTA + Call secondary, and a
  three-item pamphlet-sourced trust strip.
- **Rotating noun** (`components/RotatingText.tsx`, client) — Framer Motion, four nouns
  (Blocked drains / Grease traps / Stormwater / Tree roots), 2.5s dwell, 12px travel.
  `initial={false}` so the first noun is present on first paint (not animation-gated); an
  invisible sizer holds the box to the widest word so nothing reflows; `useReducedMotion`
  collapses the travel to an opacity-only fade.
- **WhatsApp deep-link plumbing** — every CTA is a real `href` (`waHref()` →
  `https://wa.me/27823084750`, `telHref` → `tel:+27823084750`) present in the server-rendered
  HTML at click time (no async click handler, so iOS Safari's popup blocker can't eat it).
  The composed booking prefill form is step 7; these are the zero-JS links.
- Replaced the step-1 placeholder homepage with `Header + Hero + MobileActionBar`.

## Files changed

- `app/page.tsx` (replaced placeholder with the real composition)
- `components/Header.tsx` (new)
- `components/Hero.tsx` (new)
- `components/RotatingText.tsx` (new)
- `components/MobileActionBar.tsx` (new)
- `docs/STEP-3-SUMMARY.md` (new)
- `PROJECT_STATUS.md` (updated)

No dependencies added (Framer Motion was already in the sanctioned stack). No data/config/
secret files touched.

## Decisions

- **Headline is "We clear {noun}", not "cleared today".** CLAUDE.md uses "cleared today" to
  describe *tone*, but a literal same-day claim is a response-time promise, and response time
  is a `null` PENDING fact. "We clear blocked drains / grease traps / …" describes the
  service without promising a timeframe. Easy to change if Mark confirms a response promise.
- **Trust strip = three pamphlet positioning claims** ("Over 25 years' experience",
  "Cutting-edge equipment", "Rapid response") — all tier-1 usable per the content rules.
- **Rotating nouns are the four blockage types** already named in the confirmed jetting
  service summary in `data/business.ts` — client-sourced, not invented.
- **Hero content bottom-anchored** (`justify-end`) over the opaque base of the scrim rather
  than vertically centred, so text sits on the darkest part of the image for contrast.
- **Logo mark rendered as a plain `<img>`** (vector art); photography goes through
  `next/image`. Next's optimizer serves AVIF/WebP by `Accept` header from the committed
  `hero.webp`; the committed `hero.avif` remains the source-of-truth output.
- **Phone number readable on first paint via the hero's Call CTA;** the mobile bottom bar
  keeps compact "Call"/"WhatsApp" labels so two buttons never overflow at 360px.
- **Branch, not main.** Per the run instruction ("never push to main"), work is on
  `step-3-header-hero`. This deviates from CLAUDE.md's "push to origin/main after every
  section" — flagged for you to merge (PR or fast-forward) when you review.

## TODO(content) / unclear

- Confirm the "We clear {noun}" headline framing, and whether the three trust-strip claims
  are the ones Mark wants.
- Carryover: paste the live `*.vercel.app` preview URL; owner review of the Archivo wordmark
  (step 2). Full-res photo originals would sharpen the hero LCP (currently Lanczos-graded).

## Quality gate

- Production build: **PASS** (Next 15.5.21, compiled clean, 4/4 static pages).
- Lint + typecheck: **PASS** (`next build` lint step clean; `tsc --noEmit` clean).
- Runtime smoke: served the prod build; SSR HTML contains the headline, first rotating noun,
  phone number, `wa.me`/`tel:` hrefs, hero image and logo; **no errors** in the server log.
- Contrast (hand-checked): `steel` on `ink` 6.46:1, `surf` on `ink` 6.50:1 — both pass AA.
- **Not yet run:** Lighthouse mobile and Playwright 360/768/1440 screenshots (environment +
  time budget). These are the step-3 self-QA pass — recommend running them before merge.

## Build status

**PASS.**

Latest commit hash: `3d4ca4f` (branch `step-3-header-hero`, pushed to origin).
