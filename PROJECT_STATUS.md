# PROJECT STATUS — Atlantic Drain Cleaning

> Maintained by Claude Code. Updated at the end of every working block.
> Last updated: 2026-07-23 (session 1 — build-order step 1 complete)

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

## Section tracker

| Section | Status | Notes |
|---|---|---|
| Scaffold / tokens / fonts | done | Step 1. Next.js 15.5.21 App Router + TS + Tailwind v4; all nine colour tokens, 4/8/12 radius, both shadows, dark/light hairlines; Archivo + IBM Plex Sans via `next/font`; type scale + hero clamp + eyebrow; `data/business.ts` with PENDING fields `null`; reduced-motion + surf focus rings in base layer. Build compiles clean |
| Vercel preview deploy | in progress | Step 1. **Dashboard Git integration** (client's choice) — repo pushed; awaiting one-time import at vercel.com/new + preview URL. Preview URL only — **do not touch DNS** (client email runs on the domain) |
| Logo vectorisation | not started | Step 2. Redraw pamphlet mark faithfully → `logo-full.svg` + `logo-mark.svg`. Redraw, do not redesign |
| Image pipeline | not started | Step 2. `scripts/enhance-images.mjs` — Real-ESRGAN upscale (all sources are WhatsApp-compressed) → Sharp grade → Tier 3 bezel crops → `/public/images` + manifest |
| Header + mobile sticky bar | not started | Step 3. Mobile collapses to sticky bottom bar in the thumb zone |
| Hero | not started | Step 3. Sea Point rig shot (`WhatsApp_Image_20260721_at_11_57_14.jpeg`) + Rotating Text noun. **Client preview milestone** |
| Trust bar | not started | Step 4. Renders only confirmed facts; collapses if null |
| Services | not started | Step 4. Three cards on `foam`, one commercial line, no pricing |
| How it works | not started | Step 4. Scroll Stack; must degrade to a plain list below 768px |
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
one-time manual step; preview URL to be recorded above once live.

## Decisions log

<!-- Append-only. One line per decision, newest first. -->
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

**Finish step 1:** paste the live `*.vercel.app` preview URL into "Current state" above
once the dashboard import completes, then confirm the preview renders.

**Step 2** — logo vectorisation (`public/logo-full.svg` + `public/logo-mark.svg`, redraw
the pamphlet mark faithfully, wordmark as outlined paths) and the image pipeline
(`scripts/enhance-images.mjs`, `npm run images`): Real-ESRGAN upscale → Sharp grade →
Tier 3 bezel crops → `/public/images` + manifest. Commit the manifest, not the binary.
Then step 3 (Header + Hero + WhatsApp deep-link) to reach the client preview milestone.

_Awaiting owner review of step 1 before starting step 2._
