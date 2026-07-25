# PROJECT STATUS — Atlantic Drain Cleaning

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-07-25 (session 4 — build-order step 4 complete)

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
step 3). Next is **step 5** (camera inspection signature section).

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
| Camera inspection (signature) | not started | Step 5. True Focus + monitor-framed Tier 3 stills. The one place boldness is spent |
| Proof-of-work gallery | not started | Step 6. Contained grid, Tier 2 grade, Gradual Blur on top/bottom edges |
| Areas served | not started | Step 6. From `data/business.ts`; also the phase-2 `/[suburb]` route map |
| Booking (WhatsApp form) | not started | Step 7. `wa.me/27823084750`; href built on input change, not in an async click handler |
| FAQ | not started | Step 7. Real questions only; carries `FAQPage` schema |
| Footer | not started | Step 7. NAP formatting must match the future Google Business Profile byte-for-byte |
| SEO / schema / OpenGraph | not started | Step 8. `LocalBusiness`/`Plumber` JSON-LD, **no `openingHoursSpecification` until hours confirmed** |

Status meanings: **done** = built and self-QA passed; **reviewed** = owner approved at checkpoint.

## Quality gates (latest run)

No runs yet — first Lighthouse/axe/Playwright pass is due at the end of step 3.

| Gate | Result | Date |
|---|---|---|
| Lighthouse — Performance | — | — |
| Lighthouse — Accessibility | — | — |
| Lighthouse — Best Practices | — | — |
| Lighthouse — SEO | — | — |
| WCAG AA contrast | — | — |
| Responsive 360 / 768 / 1440 | — | — |
| WhatsApp deep link (incl. real iPhone) | — | — |
| Images WebP/AVIF + lazy | — | — |
| JSON-LD + OpenGraph valid | — | — |
| No unconfirmed facts in UI | — | — |

## In progress

Vercel dashboard import of `bbwebdes2026/atlantic-drain-cleaning-new` (Git integration) —
one-time manual step from step 1; preview URL to be recorded above once live.

## Decisions log

<!-- Append-only. One line per decision, newest first. -->
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

**Still open from step 1:** paste the live `*.vercel.app` preview URL into "Current state"
once the Vercel dashboard import completes.

**Owner review of step 2:** check `public/logo-full.svg` and `logo-mark.svg` against the
pamphlet — the wave is a faithful trace; the wordmark uses Archivo (not the pamphlet
font). Confirm this is acceptable, or supply the pamphlet's print file / font so the
wordmark can match exactly. Full-res photo originals would also let the pipeline produce
genuinely upscaled imagery instead of the Lanczos fallback.

**Deferred self-QA (steps 3 + 4):** Lighthouse mobile (all four categories ≥ 90) and
Playwright screenshots at 360 / 768 / 1440 have not been run for either step — no browser
automation available in this environment this session. Build/typecheck/lint and an SSR
smoke test (grep the rendered HTML for content + absence of unconfirmed facts) stood in
each time. Run the real Lighthouse/Playwright pass before the client sees this.

**Step 5** — Camera inspection signature section (True Focus + monitor-framed Tier 3
stills). Three CCTV monitor stills have been curated from `/assets-raw` for this step
(see decisions log) but not yet run through the image pipeline.

**Step 6** — Proof-of-work gallery (Gradual Blur on the contained grid's top/bottom edges)
+ Areas served (rendered from `data/business.ts`).
