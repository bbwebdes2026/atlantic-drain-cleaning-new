import { telHref, waHref } from "@/data/business";

/**
 * Mobile sticky bottom bar (CLAUDE.md page structure item 1). The single most
 * important conversion decision on the page: the two primary actions live in the
 * thumb zone, readable and tappable on first paint. Hidden at sm+ where the
 * header nav carries the same actions.
 *
 * Plain anchors — functional with JavaScript disabled. Both targets are ≥48px
 * tall. The bottom padding honours the iOS home-indicator safe area.
 */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-2 border-t border-hairline-dark bg-ink/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden"
    >
      <a
        href={telHref}
        className="flex min-h-12 items-center justify-center rounded-input border border-hairline-dark font-body font-semibold tabular-nums text-foam"
      >
        Call
      </a>
      <a
        href={waHref()}
        className="flex min-h-12 items-center justify-center rounded-full bg-whatsapp font-body font-semibold text-ink shadow-fab"
      >
        WhatsApp
      </a>
    </div>
  );
}
