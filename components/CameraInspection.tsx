import { business } from "@/data/business";
import { MonitorFrame } from "./MonitorFrame";
import { TrueFocus } from "./TrueFocus";

/**
 * Camera inspection — the signature section (CLAUDE.md page structure item
 * 6; the one place boldness is spent). True Focus pulls the single most
 * dramatic Tier-3 still (root intrusion through a pipe joint) into sharp
 * focus as the section is scrolled into view; two supporting stills sit
 * below it, already sharp, so the section has exactly one motion moment.
 *
 * Copy reuses the confirmed camera-service summary and the "cutting-edge
 * equipment" positioning claim from data/business.ts — nothing invented.
 *
 * Stays on `bg-ink`, not `bg-abyss`: `MonitorFrame` is itself `bg-abyss`, so
 * an `abyss` section here would make the bezel disappear into its own
 * background. `abyss` is reserved for the Hero alone; this section reads as
 * the signature moment through its elevated heading size (text-40/64,
 * above every other section's text-28/40) instead.
 */
export function CameraInspection() {
  return (
    <section id="camera-inspection" className="bg-ink py-24 sm:py-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow text-surf">Camera inspection</p>
        <h2 className="mt-3 max-w-2xl font-display text-40 font-bold tracking-h2 text-foam sm:text-64">
          We see the actual cause — not a guess.
        </h2>
        <p className="mt-4 max-w-xl text-16 text-mist">
          {business.services[1].summary} Cutting-edge equipment goes in
          first, so every job starts with a clear diagnosis.
        </p>

        <div className="mt-12">
          <TrueFocus>
            <MonitorFrame
              src="/images/whatsapp-image-2026-07-21-at-11-56-45.webp"
              alt="CCTV drain camera monitor showing tree roots intruding through a pipe joint"
              sizes="(min-width: 1024px) 768px, 100vw"
              className="mx-auto max-w-3xl"
            />
          </TrueFocus>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          <MonitorFrame
            src="/images/whatsapp-image-2026-07-21-at-11-56-41.webp"
            alt="CCTV drain camera monitor showing the inside of a clear pipe run"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
          <MonitorFrame
            src="/images/whatsapp-image-2026-07-21-at-11-56-41-1.webp"
            alt="CCTV drain camera monitor showing a crack running along the pipe wall"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
