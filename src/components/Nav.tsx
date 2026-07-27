import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed top-4 z-50 w-full px-4">
      <div className="mx-auto flex max-w-4xl items-center justify-between rounded-full border border-ink/10 bg-cream/75 py-2 pr-2 pl-5 shadow-[0_12px_40px_-18px_rgba(46,42,71,0.35)] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/mark.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-8 w-8"
          />
          <span className="font-serif text-lg tracking-wide text-ink">
            Pets <span className="text-rose-dark">Crystal</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-ink-light sm:gap-6">
          <Link href="/#collection" className="hover:text-ink transition-colors">
            Shop
          </Link>
          <Link href="/about" className="hidden hover:text-ink transition-colors sm:inline">
            Story
          </Link>
          <Link href="/care" className="hover:text-ink transition-colors">
            Care
          </Link>
          <Link href="/faq" className="hidden hover:text-ink transition-colors sm:inline">
            FAQ
          </Link>
          <Link
            href="/wholesale"
            className="rounded-full bg-indigo px-5 py-2.5 text-xs text-cream transition-colors hover:bg-ink"
          >
            Wholesale
          </Link>
        </div>
      </div>
    </nav>
  );
}
