import Image from "next/image";
import { business, telHref, waHref } from "@/data/business";
import { RotatingText } from "./RotatingText";

/**
 * Hero (CLAUDE.md page structure item 2) — the client-preview milestone.
 *
 * Tier-1 imagery: the Sea Point rig shot behind a navy multiply overlay plus a
 * gradient scrim anchored at the bottom, where the text sits, for legibility.
 *
 * Everything critical renders statically on first paint — headline, phone
 * number, WhatsApp button. The only motion is the RotatingText noun, which is
 * present (not faded in) on first paint. `priority` loads the hero image eagerly
 * (it is the LCP element); `fill` + explicit `sizes` avoid layout shift.
 *
 * The rotating nouns are the four blockage types named in the confirmed jetting
 * service summary (data/business.ts) — client-sourced, not invented.
 */
const HERO_NOUNS = [
  "Blocked drains",
  "Grease traps",
  "Stormwater",
  "Tree roots",
] as const;

// Trust strip: three pamphlet-sourced positioning claims (data/business.ts).
const TRUST = [
  "Over 25 years' experience",
  "Cutting-edge equipment",
  "Rapid response",
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* Tier 1 photograph */}
      <Image
        src="/images/hero.webp"
        alt="An Atlantic Drain Cleaning camera rig set up on a wall above Sea Point, the stadium and the Atlantic Ocean behind it"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      {/* Navy multiply overlay unifies the frame; bottom-anchored ink scrim
          carries the text region. */}
      <div
        className="absolute inset-0 -z-10 bg-abyss/45 mix-blend-multiply"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-28 sm:px-6 sm:pb-20">
        <p className="eyebrow text-surf">
          {business.region.replace(", ", " · ")}
        </p>

        <h1 className="mt-4 font-display font-bold leading-[0.95] tracking-display text-hero text-foam">
          <span className="block">We clear</span>
          <RotatingText items={HERO_NOUNS} className="text-surf" />
        </h1>

        <p className="mt-6 max-w-xl font-body text-18 text-mist">
          {business.services[0].name} and{" "}
          {business.services[1].name.toLowerCase()} across the {business.region}.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={waHref()}
            className="inline-flex min-h-12 items-center rounded-full bg-whatsapp px-7 font-body font-semibold text-ink shadow-fab transition-transform hover:scale-[1.02]"
          >
            WhatsApp Mark
          </a>
          <a
            href={telHref}
            className="inline-flex min-h-12 items-center rounded-input border border-hairline-dark bg-ink/40 px-7 font-body font-medium tabular-nums text-foam backdrop-blur transition-colors hover:border-surf"
          >
            Call {business.phone.display}
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-body text-14 text-steel">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full bg-surf"
                aria-hidden="true"
              />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
