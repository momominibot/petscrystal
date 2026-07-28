import Link from "next/link";

const LINKS = [
  { href: "/#collection", label: "Collection" },
  { href: "/about", label: "Story" },
  { href: "/care", label: "Care" },
  { href: "/faq", label: "FAQ" },
];

const TICKER = [
  "Healing stones, hand-strung in pairs",
  "Aftercare headquarters in Singapore",
  "Partner pricing for stockists & dropshippers",
  "Healing stones, hand-strung in pairs",
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50">
      {/* Announcement ticker */}
      <div className="h-9 overflow-hidden bg-ink text-paper">
        <div className="ticker">
          {TICKER.map((line, i) => (
            <p
              key={i}
              className="eyebrow flex h-9 items-center justify-center px-4 text-center text-[0.6rem] text-paper/90"
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <nav className="border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:gap-4 sm:px-8 sm:py-5">
          {/* Left — section links (full set only where they fit) */}
          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="eyebrow text-[0.62rem] whitespace-nowrap text-ink-light transition-colors hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            href="/#collection"
            className="eyebrow hidden text-[0.58rem] whitespace-nowrap text-ink-light transition-colors hover:text-ink sm:block lg:hidden"
          >
            Collection
          </Link>
          <span className="sm:hidden" />

          {/* Centre — wordmark. Tracking tightens on narrow screens so it
              never wraps. */}
          <Link
            href="/"
            className="justify-self-center font-serif text-base whitespace-nowrap text-ink uppercase tracking-[0.16em] sm:text-xl sm:tracking-[0.26em] lg:text-2xl lg:tracking-[0.32em]"
          >
            Pets Crystal
          </Link>

          {/* Right — partner access */}
          <div className="flex items-center justify-end">
            <Link
              href="/wholesale"
              className="eyebrow text-[0.58rem] whitespace-nowrap text-ink-light transition-colors hover:text-ink sm:text-[0.62rem]"
            >
              Partners
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
