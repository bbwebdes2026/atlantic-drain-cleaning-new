import { business, telHref, waHref } from "@/data/business";

/**
 * Step-1 placeholder homepage — a proof of wiring, NOT the design.
 * It exists to confirm both fonts render, every colour token resolves, and the
 * tel: / wa.me links compose correctly from data/business.ts. The real hero is
 * build-order step 3; do not grow this page toward it.
 */

const swatches = [
  { name: "abyss", hex: "#071520", className: "bg-abyss", onDark: true },
  { name: "ink", hex: "#0B1E2D", className: "bg-ink", onDark: true },
  { name: "brand", hex: "#0F73B8", className: "bg-brand", onDark: true },
  { name: "surf", hex: "#46A9E0", className: "bg-surf", onDark: false },
  { name: "whatsapp", hex: "#25D366", className: "bg-whatsapp", onDark: false },
  { name: "foam", hex: "#F4F7F9", className: "bg-foam", onDark: false },
  { name: "mist", hex: "#E2E9EE", className: "bg-mist", onDark: false },
  { name: "steel", hex: "#8CA3B3", className: "bg-steel", onDark: false },
  { name: "slate", hex: "#465A6B", className: "bg-slate", onDark: true },
] as const;

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24">
      <p className="eyebrow text-surf">{business.region}</p>

      {/* Wordmark — Archivo (display) */}
      <h1 className="mt-4 font-display font-bold tracking-display text-hero text-foam">
        <span className="block">{business.name.line1}</span>
        <span className="block text-steel">{business.name.line2}</span>
      </h1>

      <p className="mt-2 font-display text-14 uppercase tracking-eyebrow text-brand">
        {business.tagline}
      </p>

      {/* Body — IBM Plex Sans */}
      <p className="mt-8 max-w-prose font-body text-18 text-steel">
        Step-1 wiring check. This paragraph is set in IBM Plex Sans and the
        wordmark above in Archivo. {business.servicesStrapline}. All business
        facts on this page come from a single typed module,{" "}
        <code className="font-body text-surf">data/business.ts</code>.
      </p>

      {/* Working links composed from business.ts */}
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={waHref()}
          className="inline-flex min-h-11 items-center rounded-full bg-whatsapp px-6 font-body font-semibold text-ink shadow-fab"
        >
          WhatsApp {business.phone.display}
        </a>
        <a
          href={telHref}
          className="inline-flex min-h-11 items-center rounded-input border border-hairline-dark px-6 font-body font-medium tabular-nums text-foam"
        >
          Call {business.phone.display}
        </a>
      </div>

      {/* Nine-colour swatch row */}
      <section className="mt-16">
        <h2 className="font-display font-semibold tracking-h2 text-22 text-foam">
          Colour tokens
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {swatches.map((s) => (
            <li
              key={s.name}
              className="overflow-hidden rounded-card border border-hairline-dark"
            >
              <div className={`h-20 ${s.className}`} />
              <div className="bg-abyss px-3 py-2">
                <p className="font-display font-semibold text-14 text-foam">
                  {s.name}
                </p>
                <p className="font-body text-12 tabular-nums text-steel">
                  {s.hex}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-16 border-t border-hairline-dark pt-6 font-body text-14 text-slate">
        {business.nameFull} · {business.owner} · {business.email}
      </footer>
    </main>
  );
}
