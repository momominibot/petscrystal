import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-ink/5 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-serif text-lg text-ink">Pets Crystal</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-light">
              A quiet tether between two souls — one human, one animal — woven
              through stone and intention.
            </p>
          </div>

          <div className="text-sm">
            <p className="font-serif text-ink">Explore</p>
            <ul className="mt-3 space-y-2 text-ink-light">
              <li>
                <Link href="/#collection" className="hover:text-ink transition-colors">
                  Crystal sets
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ink transition-colors">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/care" className="hover:text-ink transition-colors">
                  Care &amp; safety
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-ink transition-colors">
                  Questions
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-serif text-ink">Trade</p>
            <ul className="mt-3 space-y-2 text-ink-light">
              <li>
                <Link href="/wholesale" className="hover:text-ink transition-colors">
                  Wholesale partners
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@petscrystals.com"
                  className="hover:text-ink transition-colors"
                >
                  hello@petscrystals.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ink/5 pt-6 text-center">
          <p className="font-serif text-xl text-ink/20">✦</p>
          <p className="mt-3 text-xs leading-relaxed text-ink/40">
            Crystal energy is complementary — not a substitute for veterinary
            care.
          </p>
          <p className="mt-2 text-xs text-ink/30">
            © {new Date().getFullYear()} Pets Crystal. Singapore.
          </p>
        </div>
      </div>
    </footer>
  );
}
