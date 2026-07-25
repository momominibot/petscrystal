import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-ink/5 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/mark.png"
            alt=""
            width={36}
            height={36}
            priority
            className="h-9 w-9"
          />
          <span className="font-serif text-xl tracking-wide text-ink">
            Pets <span className="text-rose-dark">Crystal</span>
          </span>
        </Link>
        <div className="flex items-center gap-5 text-sm text-ink-light sm:gap-6">
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
            className="rounded-full border border-ink/15 px-4 py-1.5 text-xs hover:border-ink/30 transition-colors"
          >
            Wholesale
          </Link>
        </div>
      </div>
    </nav>
  );
}
