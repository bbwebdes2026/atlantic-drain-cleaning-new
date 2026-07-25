import Image from "next/image";

/**
 * Monitor-framed CCTV still (CLAUDE.md's Tier-3 imagery treatment). The
 * camera-section signature: crop the monitor bezel out at build time (see
 * scripts/enhance-images.mjs), then present the screen inside this custom
 * frame component instead. Elevation on a dark background is a hairline
 * border, not a shadow — CLAUDE.md's shadow tokens are tuned for `foam`
 * and are invisible against `ink`/`abyss`.
 */
export function MonitorFrame({
  src,
  alt,
  sizes,
  priority,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-image border border-hairline-dark bg-abyss p-2 sm:p-3 ${className ?? ""}`}
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-card border border-hairline-dark bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
        {/* Subtle screen glare — decorative only. */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
      {/* Decorative button row suggesting the monitor housing. */}
      <div
        className="mt-2 flex items-center justify-center gap-1.5 sm:mt-3"
        aria-hidden="true"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-surf/50" />
        <span className="h-1 w-10 rounded-full bg-hairline-dark" />
        <span className="h-1 w-10 rounded-full bg-hairline-dark" />
      </div>
    </div>
  );
}
