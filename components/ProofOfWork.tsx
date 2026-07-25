import Image from "next/image";

/**
 * Proof of work (CLAUDE.md page structure item 7). Tier-2 photography,
 * presented small in a contained grid — never full-bleed, never a section
 * background (CLAUDE.md's imagery-treatment rule for this tier). A curated
 * set of 12 (not all ~44 remaining Tier-2 photos): a small, well-composed
 * set with real per-image alt text reads as evidence; a wall of near-
 * duplicate burst shots reads as a dump. Every entry keeps the same 4:5
 * ratio via `object-cover`, regardless of source aspect, per CLAUDE.md's
 * "never mix ratios within a grid" rule.
 *
 * Gradual Blur (motion item 3) sits on the grid's top and bottom edges: a
 * masked `backdrop-blur` strip that softens the seam where the photography
 * meets the section background, rather than a hard crop line.
 */
const GALLERY = [
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-35",
    alt: "CCTV camera rig and cable ready beside an open inspection hatch",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-36-1",
    alt: "Two pipe channels inside a brick inspection chamber, one partially blocked",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-38-2",
    alt: "A hardened blockage being freed from a pipe joint in a brick chamber",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-39",
    alt: "Close-up of a terracotta Y-junction pipe",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-39-3",
    alt: "A tree root pulled from a drain with pliers",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-40",
    alt: "A long tree root extracted from a blocked drain",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-40-1",
    alt: "High-pressure jetting hose and machine set up on a driveway",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-42-1",
    alt: "High-pressure jetting in progress through an open manhole",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-43-1",
    alt: "Close-up view inside a cleared drainpipe",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-44-1",
    alt: "Bagged debris extracted from a blocked drain",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-44-2",
    alt: "Grease and root matter cleared from a drain, still on the jetting hose",
  },
  {
    slug: "whatsapp-image-2026-07-21-at-11-56-45-3",
    alt: "Cleaning a drain inspection point by hand",
  },
] as const;

export function ProofOfWork() {
  return (
    <section id="proof-of-work" className="bg-abyss py-24 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow text-surf">Proof of work</p>
        <h2 className="mt-3 max-w-2xl font-display text-28 font-bold tracking-h2 text-foam sm:text-40">
          Real jobs, real drains.
        </h2>

        <div className="relative mt-12">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black,transparent)] sm:h-24"
            aria-hidden="true"
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
            {GALLERY.map((item) => (
              <div
                key={item.slug}
                className="relative aspect-[4/5] overflow-hidden rounded-image border border-hairline-dark transition-transform hover:scale-[1.02]"
              >
                <Image
                  src={`/images/${item.slug}.webp`}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 backdrop-blur-md [mask-image:linear-gradient(to_top,black,transparent)] sm:h-24"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
