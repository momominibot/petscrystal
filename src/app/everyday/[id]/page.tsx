import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BuyPanel from "@/components/BuyPanel";
import { availableVariants } from "@/lib/prices";
import { everydayCollars } from "@/lib/everyday";
import { everydayGallery } from "@/lib/everydayGallery";
import ProductGallery from "@/components/ProductGallery";
import { breadcrumbListSchema } from "@/lib/schema";
import Footer from "@/components/Footer";
import Aftercare from "@/components/Aftercare";

const SITE = "https://petscrystals.com";

export function generateStaticParams() {
  return everydayCollars.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const c = everydayCollars.find((x) => x.id === id);
  if (!c) return {};
  const title = `${c.name} — ${c.stone} Crystal Pet Collar | Pets Crystal`;
  const description = `${c.tagline}. A ${c.strap.toLowerCase()} leather collar set with natural ${c.stone.toLowerCase()}, US$${c.price}. ${c.petBenefit}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE}/everyday/${c.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/everyday/${c.id}`,
      images: [`/art/ev-${c.id}-front.jpg`],
      type: "website",
    },
  };
}

export default async function EverydayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = everydayCollars.find((x) => x.id === id);
  if (!c) notFound();

  const others = everydayCollars.filter((x) => x.id !== c.id).slice(0, 3);
  const breadcrumbs = [
    { name: "Home", url: SITE },
    { name: "The Everyday Collection", url: `${SITE}/#everyday` },
    { name: c.name, url: `${SITE}/everyday/${c.id}` },
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
            <Link href="/" className="transition-colors hover:text-ink">Home</Link>
          </li>
          <li aria-hidden className="text-ink/25">/</li>
          <li>
            <Link href="/#everyday" className="transition-colors hover:text-ink">
              The Everyday Collection
            </Link>
          </li>
          <li aria-hidden className="text-ink/25">/</li>
          <li className="text-ink">{c.name}</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <ProductGallery
            name={`${c.name} — ${c.stone}`}
            crystal={c.stone}
            shots={[
              `/art/ev-${c.id}-front.jpg`,
              `/art/ev-${c.id}-hover.jpg`,
              ...(everydayGallery[c.id] ?? []),
            ]}
          />

          <div className="flex flex-col justify-center">
            <p className="eyebrow text-[0.62rem] text-ink-light">
              The Everyday Collection
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              {c.name}
            </h1>
            <p className="mt-3 text-lg text-ink-light">{c.tagline}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-lavender/30 px-3 py-1 text-xs text-ink-light">
                {c.stone}
              </span>
              <span className="rounded-full bg-rose/30 px-3 py-1 text-xs text-ink-light">
                {c.strap} strap
              </span>
              <span className="rounded-full bg-cream-dark px-3 py-1 text-xs text-ink-light">
                {c.meaning}
              </span>
            </div>

            <p className="mt-6 font-serif text-xl text-ink">A collar, on its own</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-light">
              The stones are set into the strap rather than hung from it, so
              there is nothing to swing, catch or lose. This one is for them
              alone — there is no matching piece for you.
            </p>

            <div className="mt-7">
              <BuyPanel
                productId={c.id}
                collection="everyday"
                available={availableVariants(c.id)}
                name={`${c.name} — ${c.stone}`}
                image={`/art/ev-${c.id}-front.jpg`}
                href={`/everyday/${c.id}`}
                priceOverride={c.price}
                sells={["pet"]}
              />
            </div>

            <ul className="mt-7 space-y-2 text-sm text-ink-light">
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Natural {c.stone.toLowerCase()}, vegan leather, metal buckle
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Soft lining against the neck
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Multi-hole buckle, adjustable
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
          <p className="eyebrow text-gold">{c.meaning}</p>
          <h2 className="mt-4 font-serif text-2xl leading-snug text-ink">
            Why {c.stone.toLowerCase()}
          </h2>
          <p className="mt-4 leading-relaxed text-ink-light">{c.petBenefit}.</p>
          <p className="mt-4 text-xs leading-relaxed text-ink/50">
            ✦ Crystals are a complement to care, not a substitute for it. If
            your companion is unwell or anxious, speak with your veterinarian.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="eyebrow text-center text-[0.6rem] text-ink-faint">
          Other colours
        </p>
        <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-3">
          {others.map((o) => (
            <Link key={o.id} href={`/everyday/${o.id}`} className="group block">
              <div className="tile relative aspect-[4/5] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/art/ev-${o.id}-front.jpg`}
                  alt={`${o.name} — ${o.stone} collar`}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="eyebrow mt-4 text-[0.58rem] text-ink-faint">{o.stone}</p>
              <h3 className="eyebrow mt-1.5 text-[0.7rem] text-ink transition-colors group-hover:text-gold">
                {o.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <Aftercare />

      <Footer />
    </div>
  );
}
