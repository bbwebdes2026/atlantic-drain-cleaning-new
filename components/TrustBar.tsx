import type { ReactNode } from "react";
import { business, telHref, emailHref } from "@/data/business";

/**
 * Trust bar (CLAUDE.md page structure item 3). Thin, quiet, directly under
 * the fold. The three always-on items are pamphlet-sourced positioning
 * claims and confirmed contact details. The PIRB/insured/years-operating
 * items are wired to `business.pending` and stay invisible until Mark
 * confirms them — nothing here is ever guessed.
 */
export function TrustBar() {
  const items: { key: string; content: ReactNode }[] = [
    { key: "region", content: business.region },
    { key: "specialists", content: business.positioning[0] },
    { key: "affordable", content: business.positioning[4] },
  ];

  if (business.pending.pirbRegistration) {
    items.push({
      key: "pirb",
      content: `PIRB registered · ${business.pending.pirbRegistration}`,
    });
  }
  if (business.pending.insured) {
    items.push({ key: "insured", content: "Fully insured" });
  }
  if (business.pending.yearsOperating) {
    items.push({
      key: "years",
      content: `${business.pending.yearsOperating}+ years operating`,
    });
  }

  items.push({
    key: "phone",
    content: (
      <a href={telHref} className="transition-colors hover:text-surf">
        {business.phone.display}
      </a>
    ),
  });
  items.push({
    key: "email",
    content: (
      <a href={emailHref} className="transition-colors hover:text-surf">
        {business.email}
      </a>
    ),
  });

  return (
    <div className="border-y border-hairline-dark bg-ink">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-5 font-body text-14 text-steel sm:px-6">
        {items.map((item, i) => (
          <span key={item.key} className="flex items-center gap-2">
            {i > 0 && (
              <span
                className="h-1 w-1 shrink-0 rounded-full bg-surf"
                aria-hidden="true"
              />
            )}
            {item.content}
          </span>
        ))}
      </div>
    </div>
  );
}
