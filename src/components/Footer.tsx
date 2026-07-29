import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            {/* The crest lives here rather than in the header: its engraving
                detail collapses below about 72px, and header height is 40. */}
            <Image
              src="/art/crest.png"
              alt="Pets Crystal"
              width={2602}
              height={2672}
              sizes="112px"
              className="w-28"
            />
            <p className="tracked mt-5 font-serif text-lg text-ink">
              Pets Crystal
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-light">
              A quiet tether between two souls — one human, one animal — woven
              through stone and intention.
            </p>
          </div>

          <div>
            <p className="eyebrow text-[0.6rem] text-ink-faint">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-light">
              <li>
                <Link href="/#collection" className="transition-colors hover:text-ink">
                  Crystal sets
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-ink">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/care" className="transition-colors hover:text-ink">
                  Care &amp; safety
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-ink">
                  Questions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[0.6rem] text-ink-faint">Trade</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-light">
              <li>
                <Link href="/wholesale" className="transition-colors hover:text-ink">
                  Partner programmes
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@petscrystals.com"
                  className="transition-colors hover:text-ink"
                >
                  hello@petscrystals.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <p className="text-xs leading-relaxed text-ink-faint">
            Aftercare headquarters in Singapore — hardware changes &amp; crystal
            cleansing for our customers. Shipping not included.
          </p>
          <p className="mt-2 text-xs text-ink-faint">
            Crystal energy is complementary — not a substitute for veterinary
            care.
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            {/* The ranklore.ai link is a deliberate backlink for the agency, so
                it stays dofollow — rel is "noopener" only, never "nofollow" or
                "sponsored", either of which would stop it passing authority.
                Anchor text is the company name rather than the bare domain: a
                branded anchor is worth more than a naked URL. */}
            <p className="text-[10px] leading-relaxed text-ink-faint">
              Website powered by{" "}
              <a
                href="https://ranklore.ai"
                target="_blank"
                rel="noopener"
                className="underline underline-offset-2 hover:text-ink"
              >
                Ranklore Pte Ltd
              </a>
              <br />
              UEN: 202629679H
              <br />
              7 Temasek Blvd, #12-07 Suntec Tower One, Singapore 038987
            </p>
            {/* The © sits with the shop, and the design credit is stated
                separately rather than under the ©. "© Designed by Bella & Lisa"
                assigns copyright to a party outside the shop, which is the
                exact fact pattern Etsy lists as a removal reason for "wasn't
                designed by the seller". Ranklore is credited above as the
                agency, so it does not hold the © here as well. */}
            <p className="text-[10px] text-ink-faint">
              {/* One template literal rather than text-around-an-expression:
                  JSX was dropping the space after the year, so this line has
                  been rendering as "© 2026Pets Crystal" since before the
                  credit changed. */}
              {`© ${new Date().getFullYear()} Pets Crystal · Designs by Bella & Lisa`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
