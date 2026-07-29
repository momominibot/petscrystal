import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { birthPieces } from "@/lib/birth";
import { birthGallery } from "@/lib/birthGallery";
import ProductGallery from "@/components/ProductGallery";
import { breadcrumbListSchema } from "@/lib/schema";
import Footer from "@/components/Footer";

const SITE = "https://petscrystals.com";

export function generateStaticParams() {
  return birthPieces.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const piece = birthPieces.find((p) => p.id === id);
  if (!piece) return {};

  const title = `${piece.month} — ${piece.stone} Birth Month Set | Pets Crystal`;
  const description = `The ${piece.month} set from The Birth Collection: ${piece.stone} for ${piece.meaning.toLowerCase()}. A ${piece.strap.toLowerCase()} collar for them, a chain for you, and a locket that opens to hold a photograph.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/birth/${piece.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/birth/${piece.id}`,
      images: [`/art/birth-${piece.id}.jpg`],
      type: "website",
    },
  };
}

export default async function BirthPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const piece = birthPieces.find((p) => p.id === id);
  if (!piece) notFound();

  const others = birthPieces.filter((p) => p.id !== piece.id);
  const index = birthPieces.findIndex((p) => p.id === piece.id);
  // wrap around so December leads back to January
  const nearby = [
    birthPieces[(index + 11) % 12],
    birthPieces[(index + 1) % 12],
    birthPieces[(index + 2) % 12],
  ];

  const breadcrumbs = [
    { name: "Home", url: SITE },
    { name: "The Birth Collection", url: `${SITE}/#birth` },
    { name: piece.month, url: `${SITE}/birth/${piece.id}` },
  ];

  return (
    <div className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListSchema(breadcrumbs)),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-6xl px-6 py-4 text-xs text-ink-light"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-ink/25">
            /
          </li>
          <li>
            <Link href="/#birth" className="transition-colors hover:text-ink">
              The Birth Collection
            </Link>
          </li>
          <li aria-hidden className="text-ink/25">
            /
          </li>
          <li className="text-ink">{piece.month}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <ProductGallery
            name={`${piece.month} — ${piece.stone}`}
            crystal={piece.stone}
            shots={[
              `/art/birth-${piece.id}.jpg`,
              ...(birthGallery[piece.id] ?? []),
            ]}
          />

          <div className="flex flex-col justify-center">
            <p className="eyebrow text-[0.62rem] text-ink-light">
              The Birth Collection — {piece.month}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              {piece.stone}
            </h1>
            <p className="mt-3 text-lg text-ink-light">{piece.tagline}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-lavender/30 px-3 py-1 text-xs text-ink-light">
                {piece.meaning}
              </span>
              <span className="rounded-full bg-rose/30 px-3 py-1 text-xs text-ink-light">
                {piece.strap} strap
              </span>
            </div>

            <p className="mt-6 font-serif text-xl text-ink">
              Three pieces that come apart
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-light">
              A {piece.strap.toLowerCase()} collar for them, a chain for you,
              and a cluster of three pendants — the {piece.stone.toLowerCase()},
              a charm, and a locket that opens to hold a photograph. Wear the
              cluster on either piece, or split it between you.
            </p>

            <p className="mt-6 text-2xl text-ink">US${piece.price}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:hello@petscrystals.com?subject=${encodeURIComponent(
                  `The Birth Collection: ${piece.month} — ${piece.stone}`
                )}`}
                className="inline-block rounded-full bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-gold"
              >
                Enquire about this set
              </a>
              <Link
                href="/wholesale"
                className="inline-block rounded-full border border-ink/15 px-6 py-3 text-sm text-ink transition-colors hover:border-ink/35"
              >
                Partner access
              </Link>
            </div>

            <ul className="mt-7 space-y-2 text-sm text-ink-light">
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Natural {piece.stone.toLowerCase()}, vegan leather, gold-plated hardware
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Locket opens to hold a photograph
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Pendants clip to either the collar or the chain
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✦</span> 30-day returns
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-dark/30">
        <div className="mx-auto max-w-3xl px-6 py-14 text-center">
          <p className="eyebrow text-gold">{piece.meaning}</p>
          <h2 className="mt-4 font-serif text-2xl leading-snug text-ink">
            Why {piece.stone.toLowerCase()} for {piece.month}
          </h2>
          <p className="mt-4 leading-relaxed text-ink-light">
            These follow our studio&rsquo;s own stone-per-month system rather
            than the traditional birthstone list, so the stone is chosen for
            what it means rather than for what a calendar says. If you would
            rather have a different stone on the {piece.month.toLowerCase()}{" "}
            strap, write to us — every set is made to order.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="eyebrow text-center text-[0.6rem] text-ink-faint">
          Other months
        </p>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {nearby.map((p) => (
            <Link key={p.id} href={`/birth/${p.id}`} className="group block">
              <div className="tile relative aspect-[4/5] w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/art/birth-${p.id}.jpg`}
                  alt={`${p.month} — ${p.stone} set`}
                  loading="lazy"
                  className="product-shot absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="eyebrow mt-4 text-[0.58rem] text-ink-faint">
                {p.month}
              </p>
              <p className="eyebrow mt-2 text-[0.72rem] text-ink transition-colors group-hover:text-gold">
                {p.stone}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-ink-faint">
          {others.length + 1} months in the collection
        </p>
      </section>

      <Footer />
    </div>
  );
}
