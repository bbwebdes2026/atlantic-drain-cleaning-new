"use client";

import { useState } from "react";
import { waHref } from "@/data/business";

/**
 * Booking (CLAUDE.md page structure item 9) — the conversion core. No
 * backend: three fields (name, mobile, description) compose a `wa.me` deep
 * link exactly as Mark asked — "Hi Mark, it's {name} ({mobile}). {description}".
 * The href is recomputed on every render from controlled input state, so the
 * anchor already carries a real, fully-encoded URL at click time — building
 * it inside an async click handler is what gets eaten by iOS Safari's popup
 * blocker. Validation is a single inline hint, never a blocker: the anchor is
 * always live, because a blocked-drain customer typing one-handed must never
 * be stopped by a regex. The header and mobile action bar already ship the
 * raw `tel:`/`wa.me` links with zero JS — this form is an enhancement on top
 * of that path, never the only way through.
 */
function buildMessage(name: string, mobile: string, description: string) {
  const n = name.trim();
  const m = mobile.trim();
  const d = description.trim();

  let greeting = "Hi Mark";
  if (n) greeting += `, it's ${n}`;
  if (m) greeting += ` (${m})`;
  greeting += ".";

  return d ? `${greeting} ${d}` : greeting;
}

const fieldClasses =
  "mt-2 block w-full rounded-input border border-hairline-dark bg-ink/60 px-4 py-3 font-body text-16 text-foam placeholder:text-steel/70 focus:border-surf focus:outline-none";

export function Booking() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [description, setDescription] = useState("");

  const href = waHref(buildMessage(name, mobile, description));
  const hasBasics = name.trim().length > 0 && description.trim().length > 0;

  return (
    <section id="booking" className="bg-ink py-24 sm:py-40">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <p className="eyebrow text-surf">Get in touch</p>
        <h2 className="mt-3 font-display text-28 font-bold tracking-h2 text-foam sm:text-40">
          Tell Mark what's going on.
        </h2>
        <p className="mt-4 max-w-lg text-16 text-mist">
          Fill in a few details and it opens straight into WhatsApp, prefilled
          and ready to send.
        </p>

        <form
          className="mt-10 flex flex-col gap-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="booking-name"
              className="font-body text-14 font-medium text-steel"
            >
              Name
            </label>
            <input
              id="booking-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={fieldClasses}
            />
          </div>

          <div>
            <label
              htmlFor="booking-mobile"
              className="font-body text-14 font-medium text-steel"
            >
              Mobile number
            </label>
            <input
              id="booking-mobile"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="082 000 0000"
              className={`${fieldClasses} tabular-nums`}
            />
          </div>

          <div>
            <label
              htmlFor="booking-description"
              className="font-body text-14 font-medium text-steel"
            >
              What's happening?
            </label>
            <textarea
              id="booking-description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Kitchen drain is blocked and backing up"
              className={`${fieldClasses} resize-none`}
            />
          </div>

          <a
            href={href}
            className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-whatsapp px-7 font-body font-semibold text-ink shadow-fab transition-transform hover:scale-[1.02]"
          >
            Send to WhatsApp
          </a>

          {!hasBasics && (
            <p className="text-14 text-steel">
              A name and a quick description help Mark most — but the button
              above works right now, whatever you've filled in.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
