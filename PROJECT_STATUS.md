# PROJECT STATUS — Atlantic Drain Cleaning

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-07-27 (session 6 — steps 7-8 + full self-QA pass, build complete)

## Current state (one paragraph)

**Step 1 done.** Next.js 15 (App Router, TypeScript) is scaffolded with the full CLAUDE.md
design system wired into the Tailwind v4 theme — nine colour tokens, the 4px spacing scale
(Tailwind default), the 4/8/12 radius scale, both shadow tokens, and dark/light hairline
border colours. Archivo + IBM Plex Sans load via `next/font/google` (display: swap, latin)
as CSS variables mapped to `font-display` / `font-body`, with the full type scale, the hero
clamp at leading 0.95, and the eyebrow utility. `data/business.ts` is the single typed
source of truth: pamphlet-confirmed facts populated, every unconfirmed fact `null` with a
`// PENDING OWNER CONFIRMATION` comment. The App Router is scaffolded so `app/[suburb]`
can be added later without restructuring (no suburb page built). The placeholder homepage
proves the wiring only (wordmark in Archivo, body in Plex, nine-colour swatch row, working
`tel:` and `wa.me` links from the data module) — it is not the hero. A global
`prefers-reduced-motion` guard and visible `surf` focus rings sit in the base layer.
`npm run build` compiles clean (Next 15.5.21). Committed and pushed to `origin/main`. The
Vercel deploy uses the **dashboard Git integration** (client's choice) — repo import is a
one-time manual step; **preview URL to be pasted in below once live**. Next is step 2
(logo vectorisation + image pipeline). The near-term deadline is the Hero client preview
(step 3), so steps 2–3 stay tight.

**Preview URL:** _pending — awaiting Vercel dashboard import of `bbwebdes2026/atlantic-drain-cleaning-new`._

**Step 2 done.** The logo is vectorised: `public/logo-mark.svg` (wave) and
`public/logo-full.svg` (horizontal lockup). The wave was produced by potrace-tracing the
pamphlet mark from a colour-separated blue/surf mask (faithful to the original curl, foam
and barrel), recoloured to `brand`/`surf` with thin white inner separation lines; the
`ATLANTIC / Drain / Cleaning / WAVES OF CHANGE` wordmark is set as **Archivo glyph
outlines** (not live text) — the pamphlet's exact typeface can't be identified from the
WhatsApp-compressed raster, so the site's own display face was used and flagged for owner
review. The image pipeline `scripts/enhance-images.mjs` (`npm run images`) upscales,
applies one shared cool-navy grade (Tier 2 desaturated a little more), supports Tier-3
CCTV bezel crops, and emits AVIF + WebP into `/public/images` with a content-hash
`manifest.json` for cheap reruns; it ran over all 48 job photos plus the Tier-1 hero.
Real-ESRGAN is wired in but opt-in (`REALESRGAN=1`) — this environment has no Vulkan, so
the run used the Lanczos fallback, which is honest given the sources are only ≤1280px.

**Step 3 done — the client-preview milestone.** The homepage now renders Header + Hero +
the mobile sticky action bar (`components/Header.tsx`, `Hero.tsx`, `MobileActionBar.tsx`,
`RotatingText.tsx`; `app/page.tsx` rewired). The header is transparent over the hero and
tints to `ink` + a hairline on scroll; on mobile it collapses to a two-button thumb-zone
bottom bar (Call / WhatsApp, safe-area padded). The Hero is the Sea Point rig shot via
`next/image` (`fill priority`, no layout shift) behind a navy multiply + bottom `ink`
scrim, with an eyebrow, the "We clear {rotating noun}" headline (Framer Motion, 4 nouns,
2.5s, present on first paint, reduced-motion → opacity), a both-services subline, WhatsApp
+ Call CTAs, and a three-claim pamphlet trust strip. All CTAs are real `wa.me`/`tel:`
hrefs in the SSR HTML (no async click handler — iOS-safe) and work with JS disabled. Build
+ lint + typecheck clean; SSR smoke test passed with no errors. Work landed on branch
`step-3-header-hero` and is **now merged to `main`** (confirmed step 4 branched from a
`main` that already has these commits). Not yet run: Lighthouse mobile + Playwright
360/768/1440 screenshots (the step-3 self-QA pass, still deferred). See
`docs/STEP-3-SUMMARY.md`.

**Step 4 done.** Trust bar + Services + How it works now sit below the Hero
(`components/TrustBar.tsx`, `Services.tsx`, `HowItWorks.tsx`; `app/page.tsx` rewired).
Trust bar renders two unused pamphlet positioning claims ("Specialists in all blocked
drains…", "Affordable rates") plus phone/email, and is wired with three additional
guarded items (PIRB registration, insured, years-operating) sourced from
`business.pending` — those stay invisible today because the fields are `null`, and will
render automatically the moment Mark confirms them, with no further code changes. A
third service, "Diagnosis & reporting", was added to `data/business.ts` per CLAUDE.md's
three-card Services spec (jetting / camera / diagnosis exist as an implication of the
confirmed camera summary — "locates the actual cause", not a new invented fact); Services
renders all three from the data module on `foam`, plus one static line acknowledging
commercial work, no pricing. How it works implements CLAUDE.md's Scroll Stack (Call →
Camera → Clear) as a hand-rolled Framer Motion `useScroll`/`useTransform` pinned stack —
react.bits' actual source wasn't fetched (no web access this session), so the effect was
built to spec instead of copy-pasted; noted as a deviation below. It is gated to `md:`
and up only, with a completely separate plain-stacked-list DOM tree for mobile and for
`prefers-reduced-motion` (no JS `matchMedia`, so no hydration mismatch — Tailwind
responsive display classes decide which tree is visible). Build + `tsc --noEmit` clean;
SSR smoke test on a production server passed (headline, trust bar, all three service
cards, both how-it-works DOM trees, phone/email/wa.me links all present; grep for
`24/7|PIRB|guarantee|warranty|hours:` etc. in the rendered HTML found nothing — no
unconfirmed fact leaked). Lighthouse/Playwright screenshots remain deferred (same gap as
step 3).

**Step 5 done — the signature section.** `components/CameraInspection.tsx` (+
`MonitorFrame.tsx`, `TrueFocus.tsx`) implements CLAUDE.md's "one place boldness is
spent". Three CCTV monitor stills were curated from the `/assets-raw` 11.56.35–11.56.47
burst by visually reviewing every frame — the rest are pipe/drain contents (Tier 2); only
these three show the monitor screen. Crop rects were hand-verified (extract → view →
adjust) before being locked into `scripts/enhance-images.mjs`'s `TIER3` map, twice: an
initial pass, then a second tightening pass on two of the three after the graded output
still showed a thin strip of the monitor's plastic case in-frame. **Found and fixed a
real bug while doing this**, not just curation: the existing Tier-3 code chained
`.extract(rect).resize({...})` and then a second unconditional `.resize()` later in the
pipeline — Sharp only honours the *last* `.resize()` queued on a pipeline, so the
"normalise to 3:2" step was silently a no-op and had been since it was written in step 2
(untested until now, because no Tier-3 entry existed to exercise it). Replaced with a
`to3x2()` helper that trims the curated rect to exact 3:2 via `.extract()` alone before
the pipeline's one real resize runs; outputs are now genuinely 1280×853 (exactly 3:2),
verified via `sharp().metadata()`. `MonitorFrame` frames each still in a custom bezel
component (hairline border + `abyss` fill, not `shadow-lift` — shadows are invisible on
dark backgrounds per the token rules, a design-system detail the initial draft got wrong
and this session corrected before shipping). `TrueFocus` pulls the most dramatic still
(roots intruding through a pipe joint) from `blur(24px)` to sharp on scroll-into-view via
Framer Motion `whileInView`, `viewport={{ once: true }}`, `prefers-reduced-motion` →
opacity-only; the two supporting stills render already-sharp so the section has exactly
one motion moment. Copy reuses the confirmed camera-service summary and the
"cutting-edge equipment" positioning claim — nothing invented. Build + `tsc --noEmit`
clean; SSR smoke test passed (heading, section id, all three image slugs, real alt text,
no unconfirmed facts).

**Step 6 done.** `components/ProofOfWork.tsx` + `AreasServed.tsx`. Rather than dump all
~44 remaining Tier-2 photos into the grid, every frame in the burst was reviewed via a
generated, filename-labelled contact sheet (2 composite images built with `sharp`, read
directly) so each candidate could be identified with certainty before writing alt text —
memory-based filename↔content recall across dozens of near-identical burst shots was
judged too error-prone for something that ships as accessibility text. 12 photos were
curated for variety (setup, diagnosis, two different extractions, jetting-in-action, two
macro pipe shots, two debris close-ups, tool-in-use) with real per-image alt text, no
near-duplicates, and no monitor-screen shots (those belong to the Tier-3 signature
section, not this grid). Every cell renders at the same 4:5 ratio via `object-cover`
regardless of the source's native aspect, per CLAUDE.md's "never mix ratios within a
grid" rule. Gradual Blur is a masked `backdrop-blur` strip (`[mask-image:linear-
gradient(...)]`, Tailwind v4 arbitrary-property syntax — no new dependency) on the grid's
top and bottom edges, softening the seam into the section background. Areas Served
renders straight from `business.areasServed` — all 11 confirmed suburbs — as
`rounded-card` chips (not full-round: CLAUDE.md reserves that shape for the WhatsApp
button alone) and is not yet linked to `/[suburb]` routes, since those don't exist in
phase 1 and a route that 404s is worse than plain text. Build + `tsc --noEmit` clean; SSR
smoke test passed (heading + section ids present, all 12 curated slugs present, all 11
suburb names present, no unconfirmed facts). **Steps 4–6 of the build order are now
complete; the homepage runs Header → Hero → Trust bar → Services → How it works → Camera
inspection → Proof of work → Areas served.**

**Post-step-6 polish pass (owner review).** After reviewing steps 4–6 locally, the owner
flagged three concerns: How It Works' Scroll Stack had too much dead scroll and moved too
fast; Services read as generic AI-page-builder output; and the page overall didn't feel
deliberately put together. All three traced to specific, fixable code, not vibes. **How
it works** (`components/HowItWorks.tsx`): the root cause was that each card owned a fixed
non-overlapping 1/3 slice of scroll progress, and the enter/exit transforms completed
within the first 30–45% of that slice, leaving the rest static. Rebuilt with overlapping
per-card windows (`WINDOW = 0.5`, staggered so each card starts entering before the
previous one finishes exiting) — a Plan-agent review caught that my first-draft fix
(widening the transform offsets inside the existing fixed slice) produced non-monotonic
`useTransform` breakpoints, which would have broken the animation outright; the
overlapping-window redesign avoids that class of bug entirely and is a more faithful
"stack" besides. Container height also cut 300vh → 240vh. **Services**
(`components/Services.tsx`): rebuilt from the icon-chip 3-card grid — recognised as the
single most common AI-page-builder pattern — into a numbered editorial list reusing the
01/02/03 numeral motif already established in How It Works, removing the icon SVGs
entirely. **Section polish**: a Plan-agent review of my proposed "abyss for two premium
moments" background rule caught that promoting Camera Inspection to `bg-abyss` would make
its own `MonitorFrame` bezel (also `bg-abyss`) disappear into the section background —
simplified instead to "`abyss` is Hero-only; every other dark section is `ink`," which
also removed the arbitrary abyss/ink alternation across HowItWorks/CameraInspection/
ProofOfWork entirely. Camera Inspection's heading was bumped to `text-40 sm:text-64`
(every other section is `text-28 sm:text-40`) so it still reads as the signature moment
now that background colour no longer distinguishes it. Fixed one real spacing bug
(`AreasServed` was `mt-10` between heading and content where every sibling section uses
`mt-12`) and softened the density jump from Hero into TrustBar (`py-4` → `py-5`). Build +
`tsc --noEmit` clean; SSR smoke test passed; visually confirmed on the dev server before
push.

**Step 7 done.** `components/Booking.tsx`, `FAQ.tsx`, `Footer.tsx`; `app/page.tsx` rewired
to the full 11-section CLAUDE.md page structure. **Booking** is a client component with
three controlled fields (name, mobile, description) composing the exact prefill pattern
Mark asked for — `Hi Mark, it's {name} ({mobile}). {description}` — via `waHref()`
recomputed on every render, so the anchor's `href` is a real, fully-encoded URL at click
time rather than something built inside an async handler (the iOS Safari popup-blocker
trap CLAUDE.md calls out by name). Empty fields degrade gracefully (the greeting and
description clauses are only added when non-empty) instead of shipping a prefill with
blank parens. Validation is a single inline hint, never a disabled control — the WhatsApp
anchor is always live. **FAQ** answers restate already-confirmed service summaries
(jetting, camera inspection) or general non-company-specific plumbing knowledge (why
blockages recur); nothing about hours, pricing, guarantees or response time. Built as
native `<details>/<summary>` so the disclosure works with zero JS. `FAQPage` JSON-LD is
generated from the same question array inline in the component (not deferred to step 8's
schema module) so visible copy and schema can never drift apart. **Footer** renders
phone/email/areas served straight from `business.ts` with zero reformatting — deliberate,
since NAP consistency with the eventual Google Business Profile is a real local-SEO
factor and this is the block most likely to get copied into a directory listing.
`logo-full.svg` already carries "Waves of Change" in the lockup; it's repeated as plain
text in the credit line per CLAUDE.md's explicit "belongs in the lockup and the footer."
Build + `tsc --noEmit` clean; SSR smoke test on a production server passed (booking form
fields, all four FAQ questions, `FAQPage` schema, footer NAP fields, all 11 suburbs, both
`wa.me`/`tel:` links present; grep for `24/7|PIRB|guarantee|warranty|hours:|pricing`
patterns found nothing). Committed and pushed (`895361f`). **All 11 CLAUDE.md page
structure sections are now built.**

**Step 8 done.** `data/schema.ts` (`LocalBusiness`/`Plumber` JSON-LD, wired into
`app/layout.tsx`), full OpenGraph + Twitter card metadata, canonical URL, `app/sitemap.ts`,
`app/robots.ts`, `app/icon.svg` favicon. The schema deliberately omits two fields rather
than filling them with placeholders: `openingHoursSpecification` (still `null` in
`business.pending`) and `sameAs` (no Google Business Profile exists yet — see Blockers).
Added `business.url` (`https://atlanticdraincleaning.co.za`) as the canonical/OG domain —
this is project infrastructure already named throughout CLAUDE.md, not a client fact
requiring confirmation, so it doesn't get the PENDING treatment. New
`scripts/generate-og-image.mjs` (`npm run og`) composites the graded Sea Point hero shot
with the lockup into `public/og-image.jpg` (1200×630), per CLAUDE.md's explicit "the Sea
Point rig shot with the lockup, not a logo-on-navy card." **Found and fixed a real bug
while building the OG image**: `logo-full.svg`'s wordmark paths (`ATLANTIC`/`Drain`/
`Cleaning`) were filled `#0B1E2D` (ink) from step 2, when the full lockup had never
actually been rendered anywhere in the UI yet — the moment it landed in the Footer (also
`bg-ink`, step 7) and the OG card (dark scrim), the wordmark would have been invisible,
ink-on-ink. Recoloured the three wordmark path groups to `foam`; the wave itself was
already correctly coloured. Build + `tsc --noEmit` clean; SSR-verified canonical, OG
tags (including the fully-resolved absolute OG image URL via `metadataBase`), Twitter
card, `Plumber` schema, and `/robots.txt` + `/sitemap.xml` + `/icon.svg` all serving
correctly. Committed and pushed (`ecdc94f`).

**Full self-QA pass — done, and the most substantial finding of the session.**
Every prior session recorded "Lighthouse/Playwright deferred, no browser automation
available." This session had both CLIs working (Playwright's Chromium was already cached
from a prior attempt), so `playwright` was added as a real devDependency and the deferred
QA from steps 3–8 finally ran in full:

- **Lighthouse mobile, final scores: Performance 93, Accessibility 100, Best Practices
  100, SEO 100** — all four clear the ≥90 floor. LCP 3.1s / CLS 0 / TBT 20-30ms.
- **A real WCAG AA failure was caught and fixed**: Services' decorative `01/02/03`
  numerals used `text-brand/20`, measuring 1.3:1 against `foam` (need 3:1 for large bold
  text). Recoloured to `text-slate/70` (~3.3:1) — `slate` is literally the token CLAUDE.md
  designates for "muted text on light," so this is a correction toward the existing
  system, not a new pattern. `aria-hidden="true"` added too (the numeral is decorative;
  the service name already carries the content) — note for the record that `aria-hidden`
  does **not** exempt an element from the contrast check, since low-vision sighted users
  without a screen reader still see the pixels; only an actual colour fix satisfies it.
- **A significant false alarm, run down rather than assumed**: full-page Playwright
  screenshots initially showed How It Works as a large blank gap, the camera-inspection
  monitor stills as solid black, and the proof-of-work gallery as empty. Investigated
  rather than "fixed" blind — `fullPage: true` screenshots resize the viewport to the
  full document height without ever actually scrolling, so lazy-loaded images never
  trigger and scroll-linked motion (How It Works' `useScroll`) is frozen at its
  pre-scroll state. Verified this directly: sampling `getComputedStyle` opacity on the
  How It Works cards through a real, fine-grained incremental scroll (40 steps, real
  `mouse.wheel` events) showed the overlapping enter/hold/exit transitions working
  exactly as designed, ending with the last card correctly held at full opacity once the
  pinned container's own scroll range is exhausted. No code change was needed for this
  one — `scripts/qa-screenshot.mjs` now does a real pre-scroll pass before capturing so
  future full-page screenshots don't reproduce the same false alarm.
- SSR-grepped the production build for unconfirmed-fact patterns (`24/7`, `PIRB`,
  `guarantee`, `warranty`, `hours:`, `price`, response-time phrasing, `testimonial`) —
  zero matches across the whole page.
- Manually reviewed close-up screenshots of Services, Camera Inspection, Areas Served,
  Booking, FAQ and Footer at 1440px, plus full-page captures at 360/768/1440 — all read
  cleanly; the Footer wordmark fix and Services numeral fix are both visually confirmed.

Committed and pushed (`c0e9681`). **The build-order's 8 steps are now all complete.**
Outstanding QA-grade items are external to code (see Blockers) and the Vercel preview
URL / DNS steps, neither of which this session touched.

## Section tracker

| Section | Status | Notes |
|---|---|---|
| Scaffold / tokens / fonts | done | Step 1. Next.js 15.5.21 App Router + TS + Tailwind v4; all nine colour tokens, 4/8/12 radius, both shadows, dark/light hairlines; Archivo + IBM Plex Sans via `next/font`; type scale + hero clamp + eyebrow; `data/business.ts` with PENDING fields `null`; reduced-motion + surf focus rings in base layer. Build compiles clean |
| Vercel preview deploy | in progress | Step 1. **Dashboard Git integration** (client's choice) — repo pushed; awaiting one-time import at vercel.com/new + preview URL. Preview URL only — **do not touch DNS** (client email runs on the domain) |
| Logo vectorisation | done | Step 2. Wave = potrace trace of the pamphlet mark (faithful) in the two brand blues + white inner lines; wordmark = Archivo glyph outlines (site display face; pamphlet font unidentifiable from the compressed raster). `public/logo-full.svg` (lockup) + `public/logo-mark.svg` (wave). Awaiting owner review against the pamphlet |
| Image pipeline | done | Step 2. `scripts/enhance-images.mjs` (`npm run images`): upscale (Real-ESRGAN opt-in via `REALESRGAN=1`, else Lanczos) → shared cool-navy Sharp grade (Tier 2 desaturated more) → Tier-3 bezel crop hook → AVIF/WebP in `/public/images` + content-hash `manifest.json`. Ran over all 48 job photos; hero graded (Tier 1) |
| Header + mobile sticky bar | done | Step 3. `components/Header.tsx` transparent→`ink`+hairline on scroll; `MobileActionBar.tsx` two-button thumb-zone bar (safe-area padded), `sm:hidden`. Plain anchors, JS-optional |
| Hero | done | Step 3. Sea Point rig shot via `next/image` (`fill priority`) + navy multiply + bottom `ink` scrim; "We clear {rotating noun}" (`RotatingText.tsx`, 4 nouns/2.5s, first-paint static, reduced-motion→opacity); both-services subline; WhatsApp+Call CTAs; 3-claim trust strip. **Client preview milestone.** On branch `step-3-header-hero` |
| Trust bar | done | Step 4. Region + 2 unused positioning claims + phone/email always render; PIRB/insured/years-operating guarded on `business.pending`, invisible until confirmed |
| Services | done | Step 4. Three cards on `foam` from `data/business.ts` (jetting, camera, diagnosis & reporting) + one commercial-work line, no pricing |
| How it works | done | Step 4. Hand-rolled Scroll Stack (Framer Motion `useScroll`/`useTransform`, not the literal react.bits source — no web access this session); `md:`-gated, separate plain-list DOM tree for mobile + reduced-motion |
| Camera inspection (signature) | done | Step 5. 3 Tier-3 monitor stills curated + hand-verified from `/assets-raw`; True Focus blur-to-sharp on the hero still (reduced-motion → opacity); `MonitorFrame` custom bezel (hairline, not shadow — invisible on dark) |
| Proof-of-work gallery | done | Step 6. 12 curated Tier-2 photos (of ~44 remaining), uniform 4:5 grid, masked `backdrop-blur` Gradual Blur on top/bottom edges |
| Areas served | done | Step 6. All 11 suburbs from `data/business.ts` as `rounded-card` chips; not yet linked (no `/[suburb]` routes in phase 1) |
| Booking (WhatsApp form) | done | Step 7. Three controlled fields compose `waHref()` on every render; href always real at click time; validation is a hint, never a blocker |
| FAQ | done | Step 7. 4 real questions (jetting, camera inspection, recurring blockages, quote); `<details>`, zero-JS; inline `FAQPage` JSON-LD |
| Footer | done | Step 7. Phone/email/areas served straight from `business.ts`, no reformatting; "Waves of Change" repeated as text next to the lockup SVG |
| SEO / schema / OpenGraph | done | Step 8. `Plumber` JSON-LD, OG/Twitter tags, canonical, sitemap.ts, robots.ts, icon.svg; `openingHoursSpecification` + `sameAs` deliberately omitted, not empty |

Status meanings: **done** = built and self-QA passed; **reviewed** = owner approved at checkpoint.

## Quality gates (latest run)

First real run — session 6, 2026-07-27, against a local production build
(`npm run build && npm run start`) via Playwright + Lighthouse CLIs.

| Gate | Result | Date |
|---|---|---|
| Lighthouse — Performance | 93 | 2026-07-27 |
| Lighthouse — Accessibility | 100 | 2026-07-27 |
| Lighthouse — Best Practices | 100 | 2026-07-27 |
| Lighthouse — SEO | 100 | 2026-07-27 |
| WCAG AA contrast | Pass (Services numeral fixed; see decisions log) | 2026-07-27 |
| Responsive 360 / 768 / 1440 | Pass — Playwright full-page + section screenshots reviewed | 2026-07-27 |
| WhatsApp deep link (incl. real iPhone) | Pass in code review + SSR (href built on input change); **real-iPhone tap test still not done — no device in this environment** | 2026-07-27 |
| Images WebP/AVIF + lazy | Pass — verified via `<img>` `naturalWidth`/`complete` after a real scroll pass | 2026-07-27 |
| JSON-LD + OpenGraph valid | Pass — `Plumber` + `FAQPage` schema, OG/Twitter tags, canonical all present and correctly resolved in SSR HTML | 2026-07-27 |
| No unconfirmed facts in UI | Pass — grepped production HTML for hours/PIRB/guarantee/warranty/price/response-time/testimonial patterns, zero matches | 2026-07-27 |

## In progress

Vercel dashboard import of `bbwebdes2026/atlantic-drain-cleaning-new` (Git integration) —
one-time manual step from step 1; preview URL to be recorded above once live.

## Decisions log

<!-- Append-only. One line per decision, newest first. -->
2026-07-27 — Added `playwright` as a real devDependency (matching the Chromium build
already cached in this environment from an earlier attempt) instead of relying on `npx`
per-run, which fails to resolve the package for `import` inside a plain script. This
finally makes CLAUDE.md's Self-QA loop ("Playwright screenshots... Lighthouse...")
actually runnable in-session rather than perpetually deferred, as every prior session's
status notes record. `scripts/qa-screenshot.mjs` is the reusable entry point.
2026-07-27 — Fixed a real WCAG AA contrast failure caught by Lighthouse: Services'
decorative `01/02/03` numerals (`text-brand/20`) measured 1.3:1 against `foam`, below the
3:1 large-text minimum. Recoloured to `text-slate/70` (~3.3:1) rather than inventing a new
faint-numeral treatment — `slate` is already CLAUDE.md's designated "muted text on light"
token, so this is a correction toward the existing system. Also learned and recorded here
for future reference: `aria-hidden="true"` does NOT exempt an element from Lighthouse/
axe's colour-contrast check, because low-vision sighted users without a screen reader
still see the rendered pixels — aria-hidden only affects the accessibility tree, not
visual contrast obligations.
2026-07-27 — Diagnosed, rather than blindly "fixed," an apparent bug where full-page
Playwright screenshots showed How It Works as a blank gap and the camera-inspection/
proof-of-work images as black/empty. Root cause: `page.screenshot({fullPage:true})`
resizes the viewport to the full document height without performing a real scroll, so
lazy-loaded images never trigger and `useScroll`-driven motion is frozen at its
pre-scroll (progress=0) state — a capture-technique artifact, not a site defect.
Confirmed by sampling `getComputedStyle` through 40 real incremental `mouse.wheel` steps,
which showed the How It Works overlapping enter/hold/exit transitions working exactly as
designed. No code changes were made to HowItWorks.tsx; `qa-screenshot.mjs` instead does a
real pre-scroll pass before capturing so this doesn't reproduce as a false alarm again.
2026-07-27 — Added `business.url` (`https://atlanticdraincleaning.co.za`) to
`data/business.ts` as the canonical/OG/schema domain, ahead of DNS cutover. Treated as
project infrastructure rather than a PENDING client fact — CLAUDE.md already names this
exact domain throughout as the deployment target and states the client's own email
already runs on it — not a marketing claim requiring Mark's confirmation the way hours or
pricing would be.
2026-07-27 — `openingHoursSpecification` and `sameAs` are omitted entirely from the
`LocalBusiness`/`Plumber` JSON-LD (`data/schema.ts`), not present-but-empty. Trading hours
are still `null` in `business.pending`; no Google Business Profile exists yet for
`sameAs` to point to. Matches CLAUDE.md's stated rule verbatim.
2026-07-27 — Fixed a real, previously-undetected bug in `public/logo-full.svg`: the
wordmark path groups (`ATLANTIC`/`Drain`/`Cleaning`) were filled `#0B1E2D` (ink) since
step 2, because the full lockup had never actually been rendered anywhere in the built UI
until this session's Footer (step 7) and OG image (step 8) — both dark (`bg-ink` /
navy-scrimmed), which would have made the wordmark invisible, ink-on-ink. Recoloured the
three wordmark groups to `foam`; the wave paths were already correctly brand/surf. A
concrete example of why "no component had rendered this asset yet" is exactly the kind of
gap a deferred visual QA pass exists to catch.
2026-07-27 — FAQ's `FAQPage` JSON-LD is generated inline in `components/FAQ.tsx` from the
same `FAQS` array that renders the visible copy, rather than deferred to step 8's
`data/schema.ts` module. CLAUDE.md lists "carries FAQPage schema" as part of the FAQ
section itself (page structure item 10), and keeping the question array as the single
source for both the copy and the schema means they can never drift apart.
2026-07-27 — Booking form built as a client component with three controlled fields
feeding `waHref()` on every render, rather than composing the URL inside the anchor's
click handler — CLAUDE.md flags exactly this as "the single most likely bug in the
build" because iOS Safari's popup blocker eats `window.open`/navigation calls made
inside an async click handler. Empty-field prefill degrades gracefully (greeting/mobile/
description clauses are only appended when non-empty) instead of shipping literal blank
parentheses. No field can disable the WhatsApp anchor.
2026-07-26 — Established a real rule for dark-section backgrounds instead of decorative alternation: `abyss` is reserved for the Hero only (its existing scrim usage); every other dark section (TrustBar, HowItWorks, CameraInspection, ProofOfWork, AreasServed) uses `ink` uniformly. A Plan-agent review caught that my first idea — reserving `abyss` for Hero *and* Camera Inspection as "the two premium moments" — would have broken Camera Inspection's own `MonitorFrame` component, which is itself `bg-abyss`; the section's "signature" status is now carried by an elevated heading size (`text-40 sm:text-64` vs every other section's `text-28 sm:text-40`) instead of background colour.
2026-07-26 — Rebuilt HowItWorks' Scroll Stack timing around overlapping per-card scroll windows (`WINDOW = 0.5`, staggered starts) rather than three fixed non-overlapping 1/3 slices, after owner feedback that it had dead scroll space and moved too fast. A Plan-agent review caught that my first-draft fix — widening the transform offsets inside the existing fixed slices — produced non-monotonic `useTransform` breakpoints (would have broken the animation outright, not just looked wrong); the overlapping-window redesign sidesteps that failure mode by construction and is a more faithful "stack" effect besides.
2026-07-26 — Rebuilt Services from an icon-chip 3-card grid into a numbered editorial list (reusing HowItWorks' 01/02/03 numeral motif) after owner feedback that the icon-chip-grid pattern read as generic AI-page-builder output. Confirmed the direction with the owner via a side-by-side preview before implementing, rather than picking unilaterally — it's a visual-identity call, not a technical one.
2026-07-25 — Curated 12 of the ~44 remaining Tier-2 photos for the proof-of-work gallery rather than rendering all of them. Reviewed the full burst via a generated, filename-labelled contact sheet (built with `sharp`, read directly) instead of relying on memory across dozens of near-identical shots — the risk of mismatching a filename to the wrong photo's alt text was judged worse than the extra step. Excluded near-duplicate frames and every monitor-screen shot that isn't one of the three Tier-3 stills (screen captures aren't proof-of-work photography).
2026-07-25 — Gradual Blur (proof-of-work gallery edges) implemented as a masked `backdrop-blur` strip via Tailwind v4's `[mask-image:...]` arbitrary-property syntax — no new dependency, consistent with "Framer Motion covers everything this site needs" (this effect isn't scroll-linked, so it doesn't need Framer Motion at all).
2026-07-25 — Fixed a latent bug in `scripts/enhance-images.mjs`'s Tier-3 path found while curating step 5's monitor stills: chaining `.extract(rect).resize({...})` then a second `.resize()` later in the same pipeline is a no-op on the first call — Sharp only keeps the last `.resize()` queued — so the "normalise Tier-3 crops to 3:2" step had silently never worked since it was written in step 2 (untested until a real Tier-3 entry existed). Replaced with a `to3x2()` helper that trims the rect to exact 3:2 via `.extract()` alone; verified 1280×853 output via `sharp().metadata()`.
2026-07-25 — Curated step 5's three Tier-3 CCTV monitor stills by visually reviewing every frame in the `/assets-raw` 11.56.35–11.56.47 job-photo burst (the rest are pipe/drain contents, already Tier 2). Crop rects were verified by extracting and viewing each candidate before locking into `TIER3`, including a second tightening pass on two of the three after the first pass left a thin sliver of the monitor's plastic case visible in the graded output.
2026-07-25 — Added a build-gate hook (`.claude/hooks/build-gate.sh`, registered in `.claude/settings.json`) that runs build/typecheck/lint before `git push` and blocks the push on failure. Two bugs found and fixed during live testing (not just wiring): (1) spawning the `.sh` directly caused Windows EFTYPE — fixed by invoking through `bash "..."`; (2) `next lint` with no ESLint config launches an interactive setup wizard that hangs a non-interactive hook, which would have blocked every push forever — fixed by treating an unconfigured linter as absent (skipped, same spirit as `--if-present`) and redirecting stdin from `/dev/null` on every step so nothing can hang on a prompt again. Verified live: a deliberate syntax error caused `git push` to be blocked with the build's real error output; reverting let the same push command through.
2026-07-25 — Scroll Stack (How it works) and, later, True Focus / Gradual Blur (steps 5–6) are hand-rolled with Framer Motion rather than copy-pasted from react.bits: this session has no web access to fetch the actual react.bits source, so CLAUDE.md's "copy-paste in individually, adapt to tokens" instruction couldn't be followed literally. Built each effect to the documented behaviour instead (scroll-linked pinned stack; blur-to-sharp reveal; edge-masking blur) using only the sanctioned Framer Motion dependency — no new libraries added. Flagged here as a deviation worth swapping for the genuine component if/when it can be fetched.
2026-07-25 — Step 4 added a third service, "Diagnosis & reporting", to `data/business.ts`. CLAUDE.md's Services spec explicitly names three cards (jetting / camera / diagnosis and reporting) but the data module only had two. Treated as implied by the already-confirmed camera summary ("locates the actual cause inside the pipe, not a guess") rather than a new unconfirmed fact — no specifics (turnaround, report format) were invented.
2026-07-24 — Step 3 delivered on branch `step-3-header-hero` (not `origin/main`) because the session run instruction forbids pushing to main. This deviates from CLAUDE.md's "push to origin/main after every section"; the branch is pushed and merged to `main` since (confirmed present in `main`'s history at the start of the step-4 session).
2026-07-24 — Hero headline set to "We clear {rotating noun}" rather than the "cleared today" phrasing CLAUDE.md uses to describe tone: a literal same-day claim is a response-time promise, and response time is a `null` PENDING fact. "We clear …" states the service without a timeframe. Rotating nouns are the four blockage types already in the confirmed jetting summary; trust strip is three tier-1 pamphlet claims. No invented facts.
2026-07-24 — Step-3 self-QA: production build + lint + `tsc` clean and a served-prod SSR smoke test (headline, first noun, phone, `wa.me`/`tel:` hrefs, hero image all present; no server errors); AA contrast hand-checked (`steel`/`ink` 6.46:1, `surf`/`ink` 6.50:1). Lighthouse-mobile and Playwright 360/768/1440 screenshots deferred (environment + time budget) and flagged as the outstanding step-3 QA before merge.
2026-07-23 — Processed `/public/images` committed to the repo (≈17 MB) rather than regenerated at build time: a client-preview deploy must be bulletproof, and committing photography in a site repo is normal. Images will be replaced when full-res originals arrive. Output capped at 1280px long edge (sources are ≤1280 and display is capped at 720) so the Lanczos fallback does not fabricate resolution; AVIF+WebP at q80/q58.
2026-07-23 — Image pipeline built as `scripts/enhance-images.mjs` with Real-ESRGAN opt-in (`REALESRGAN=1`, downloaded into gitignored `scripts/bin`) and a Lanczos fallback so the pipeline always produces output. This environment has no Vulkan, so the run used Lanczos. One shared cool-navy grade unifies a set shot on different phones; Tier 2 is desaturated more than Tier 1; a Tier-3 CCTV bezel-crop hook exists but its file list is curated later (step 5). Content-hash manifest makes reruns cheap.
2026-07-23 — Logo wave vectorised by potrace-tracing the pamphlet (colour-separated brand/surf masks, connected-component + hole-fill cleanup) rather than hand-drawing — hand attempts read as a blob; the trace is faithful to the actual curl. Generation tooling (potrace `--no-save`, fonttools, Archivo TTF) lives outside the repo; only the two SVGs ship. Method recorded here for reproducibility.
2026-07-23 — Wordmark set as Archivo glyph outlines (site display face), not the pamphlet's own typeface, which is unidentifiable from the WhatsApp-compressed raster. Owner-confirmed choice; flagged for review against the pamphlet. Outlined (not live text) per CLAUDE.md so the lockup is font-independent.
2026-07-23 — Vercel deploy set up via the dashboard Git integration rather than CLI/token: every push to `origin/main` auto-deploys and PRs get preview URLs, which suits the "push after every section" workflow. One-time repo import done in the Vercel dashboard; no custom domain added (DNS stays untouched — client email runs on the domain).
2026-07-23 — Build-order step 1 completed: Next.js 15 (App Router, TS) + Tailwind v4 with the full token set, both Google Fonts via `next/font`, `data/business.ts` as the single typed source of truth (unconfirmed facts `null`, PENDING-commented), placeholder wiring-proof homepage, reduced-motion guard + surf focus rings. Spacing left on Tailwind v4's default 0.25rem (4px) base, which already emits the CLAUDE.md 4→160 steps — no override needed. `framer-motion` added now (sanctioned stack; first used at step 3); no Lenis/GSAP/WebGL.
2026-07-23 — Deferred lead capture to phase 2 and documented the limitation: with no backend there is no lead record, so if Mark loses the WhatsApp chat the lead is gone and there is no data on what the site produces. Accepted for phase 1 to keep the build static and hit the preview deadline.
2026-07-23 — Routing scaffolded for `app/[suburb]/page.tsx` but suburb pages explicitly out of scope for phase 1. Competitors (Combat Plumbing) already run per-suburb landing pages; this is the phase-2 SEO move and costs nothing to leave open now.
2026-07-23 — Dropped Lenis, GSAP and ScrollTrigger from the stack (all present on the Coachman build). Framer Motion `useScroll` covers everything needed here; smooth-scroll hijacking and a shader canvas are a tax paid by exactly the user who can least afford it — someone on mobile data with a drain emergency. No WebGL background at all; ambient is a static radial gradient + 3% noise.
2026-07-23 — Two-tier content truth rule adopted. Pamphlet-sourced claims ("over 25 years of experience", "rapid response", "affordable rates") are the client's own published words and are usable. Everything else — hours, 24/7, PIRB, insurance, guarantees, prices, testimonials — is `null` in `data/business.ts` until confirmed, and null-valued components do not render. No placeholder strings in a client-facing preview.
2026-07-23 — Design system fixed: dark `ink`/`abyss` base against a market where every competitor runs bright blue + red urgency; Archivo + IBM Plex Sans over the Inter/Poppins default; WhatsApp green reserved exclusively for the WhatsApp CTA so scarcity carries the primary action; no red anywhere.
2026-07-23 — Signature element chosen: the camera-inspection section (True Focus + monitor-framed CCTV stills). No competitor shows the diagnostic view, and it is the strongest argument for "we find the actual cause". Boldness is spent here and nowhere else.
2026-07-23 — Hero image locked to `WhatsApp_Image_20260721_at_11_57_14.jpeg` (camera rig above Sea Point, stadium and Atlantic behind). Only genuinely strong frame in the set; geo-locates the business and shows the technology.
2026-07-23 — Three-tier imagery treatment adopted to manage a photo library that is mostly drain contents: Tier 1 hero (scrimmed), Tier 2 proof-of-work (contained grid only, never full-bleed, never a section background), Tier 3 CCTV stills (bezel cropped, monitor-framed).
2026-07-23 — CLAUDE.md and PROJECT_STATUS.md authored; competitor research completed (Combat Plumbing, The Drain Surgeon, Drain Blasters, Flush & Rush, The Cape Town Plumber).

## Blockers / needs owner input

**Blocking (needed before the relevant section can ship):**
- **Domain / registrar access.** `atlanticdraincleaning.co.za` is almost certainly already registered — the client's email (`mark@atlanticdraincleaning.co.za`) runs on it. Confirm the registrar and get access. This is not a purchase. When DNS is eventually pointed at Vercel, **leave MX records untouched** or the client's email goes down. Preview stays on `*.vercel.app` until then.
- **Logo copyright.** The pamphlet was designed by someone. Confirm Mark commissioned and owns it before the mark is redrawn as vector.
- **Trading hours.** Required for `openingHoursSpecification`. Omitted from JSON-LD entirely until confirmed — do not publish 24/7 unless Mark will genuinely answer at 2am.
- **Years operating.** Pamphlet says "plumbers with over 25 years of experience". Confirm the exact claim Mark wants on the site, in writing.
- **PIRB registration / insurance.** A licensed-and-insured badge is a real conversion lever in this market and competitors advertise it. Trust bar renders without it if unconfirmed.

**Non-blocking (improves the build when they arrive):**
- **Photo originals** at full resolution (Drive or Dropbox). Everything in `/assets-raw` is WhatsApp-compressed; the upscale pass is a mitigation, not a fix.
- **Pamphlet print file** from its original designer — the likeliest source of a usable vector logo, which would remove the redraw work entirely.
- **Video.** Even ten seconds of jetting or a live camera feed would be the strongest asset on the site and nothing in this market uses it.
- **Testimonials.** None exist yet. Agree a post-job WhatsApp template asking for a Google review — this is the ongoing pipeline for both testimonials and review volume.

**Engagement deliverable, not a code deliverable:**
- **Google Business Profile.** Does not exist. Competitors are winning on review volume (Combat Plumbing 426 reviews, The Drain Surgeon 310). Claiming and populating this profile will out-earn every technical SEO decision in CLAUDE.md combined.

## Next up

**All 8 build-order steps are complete.** The homepage runs the full CLAUDE.md page
structure (Header through Footer), and the previously-deferred self-QA pass (Lighthouse +
Playwright, see Quality gates above) has now actually run and passed. What's left is
owner input and the two things this session deliberately didn't touch:

**Still open from step 1:** paste the live `*.vercel.app` preview URL into "Current state"
once the Vercel dashboard import completes.

**Owner review of step 2:** check `public/logo-full.svg` and `logo-mark.svg` against the
pamphlet — the wave is a faithful trace; the wordmark uses Archivo (not the pamphlet
font). Confirm this is acceptable, or supply the pamphlet's print file / font so the
wordmark can match exactly. Full-res photo originals would also let the pipeline produce
genuinely upscaled imagery instead of the Lanczos fallback.

**Not done this session, flagged for a follow-up pass:**
- Real-iPhone tap test of the WhatsApp deep link (both the header/mobile-bar zero-JS
  links and the new booking form) — no physical device in this environment. Everything
  checkable in code and via SSR (href built on input change, correct `wa.me` encoding,
  no leading zero) has been verified; the one thing that can't be verified here is
  Safari's actual popup-blocker behaviour on a real device.
- The Vercel dashboard import (step 1) and any DNS work remain untouched, per
  instruction — DNS specifically must wait for registrar access confirmation (see
  Blockers) since the client's email runs on the domain.

**Everything else is now owner input, not code:** trading hours, PIRB/insurance, exact
years-operating figure, and the Google Business Profile (see Blockers below) are the
remaining gates before this can go from "technically complete" to "ready to launch."
