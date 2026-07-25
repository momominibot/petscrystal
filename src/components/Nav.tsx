import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-ink/5 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl tracking-wide text-ink">
          Pets <span className="text-rose-dark">Crystal</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-ink-light">
          <Link href="/" className="hover:text-ink transition-colors">
            Shop
          </Link>
          <Link
            href="/wholesale"
            className="rounded-full border border-ink/15 px-4 py-1.5 text-xs hover:border-ink/30 transition-colors"
          >
            Wholesale
          </Link>
        </div>
      </div>
    </nav>
  );
}
