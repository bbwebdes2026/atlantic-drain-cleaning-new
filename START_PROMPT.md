# Startup prompt for Claude Code

Paste this as the first message in a Claude Code session opened in the repo root.
Prerequisite: `/assets-raw`, `CLAUDE.md` and `PROJECT_STATUS.md` are already in place,
the repo has a GitHub origin, and the Vercel project is linked (or you will link it).

---

Read CLAUDE.md fully before doing anything, then read PROJECT_STATUS.md.

Execute build-order step 1 only.

Scaffold Next.js 15 with the App Router, TypeScript and Tailwind CSS v4 in this repo,
keeping `/assets-raw`, `CLAUDE.md` and `PROJECT_STATUS.md` intact. Then:

1. Wire the full design token set from CLAUDE.md into the Tailwind v4 theme — all nine
   colours, the 4px spacing scale, the 4/8/12 radius scale, the two shadow tokens, and
   the hairline border values for dark and light surfaces.
2. Load Archivo and IBM Plex Sans via `next/font/google` with `display: swap` and the
   latin subset, exposed as CSS variables and mapped to Tailwind font families. Set up
   the type scale, including the hero `clamp(2.5rem, 8vw, 5.5rem)` at leading 0.95 and
   the eyebrow style (12px / 600 / uppercase / +0.14em).
3. Create `data/business.ts` as the single typed source of truth for business facts.
   Confirmed values from the pamphlet: name, tagline, both services, owner name, phone
   `0823084750` (plus a derived `+27823084750` for `tel:` and `27823084750` for `wa.me`),
   email, the Atlantic Seaboard suburb list from CLAUDE.md, and the pamphlet-sourced
   positioning claims. Unconfirmed values — trading hours, PIRB registration, insurance,
   guarantees, prices, response times, testimonials — are typed and set to `null` with a
   `// PENDING OWNER CONFIRMATION` comment. Nothing may render a placeholder string.
4. Set up route scaffolding so `app/[suburb]/page.tsx` can be added later without
   restructuring. Do not build any suburb page now.
5. Build a minimal placeholder homepage on the `ink` background that proves the tokens
   and both fonts render: the wordmark set in Archivo, a paragraph in IBM Plex Sans, a
   swatch row of all nine colours with their names, and working `tel:` and `wa.me` links
   built from `data/business.ts`. This is a proof of wiring, not a design — do not start
   the hero.
6. Add a global `prefers-reduced-motion` guard and visible `surf` focus rings in the base
   layer now, so no later section has to retrofit them.

Then: run the build, verify it compiles clean, commit, push to origin, and deploy to
Vercel. Confirm the preview URL is live and record it in PROJECT_STATUS.md.

Do not touch DNS. Do not add the domain to the Vercel project. The client's email runs on
`atlanticdraincleaning.co.za` and pointing DNS carelessly would take it down — the
preview stays on the `*.vercel.app` URL until registrar access is confirmed.

Do not install Lenis, GSAP or any WebGL library. Do not add dependencies beyond the
scaffold, Tailwind and Framer Motion without asking first.

When step 1 is complete: update PROJECT_STATUS.md (section tracker, decisions log, the
preview URL, and what is next), commit and push that too, then STOP and ask me for review
before starting step 2.
