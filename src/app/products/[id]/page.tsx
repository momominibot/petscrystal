import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import { galleryShots } from "@/lib/gallery";
import ProductGallery from "@/components/ProductGallery";
import { productSchema, breadcrumbListSchema } from "@/lib/schema";
import Footer from "@/components/Footer";

const SITE = "https://petscrystals.com";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) return {};

  const title = `${product.name} Matching Pet Crystal Set — ${product.tagline} | Pets Crystal`;
  const description = `${product.name} — a matching ${product.crystal} crystal set. A bracelet for you, a collar charm for them. ${product.petBenefit} for your companion; ${product.humanBenefit} for you. A studio design, customisable and strung to order.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/products/${product.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/products/${product.id}`,
      images: [`/products/${product.id}.jpg`],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Matching Pet Crystal Set`,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.chakra === product.chakra ||
          p.crystal.split(" & ").some((c) => product.crystal.includes(c)))
    )
    .slice(0, 3);

  const fallback = products.filter((p) => p.id !== product.id).slice(0, 3);
  const alsoLove = related.length >= 2 ? related : fallback;

  const breadcrumbs = [
    { name: "Home", url: SITE },
    { name: "Crystal Sets", url: `${SITE}/#collection` },
    { name: product.name, url: `${SITE}/products/${product.id}` },
  ];

  return (
    <div className="min-h-screen pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema(product)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListSchema(breadcrumbs)),
        }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-6xl px-6 py-4 text-xs text-ink-light"
      >
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden className="text-ink/25">
            /
          </li>
          <li>
            <Link href="/#collection" className="hover:text-ink transition-colors">
              Crystal Sets
            </Link>
          </li>
          <li aria-hidden className="text-ink/25">
            /
          </li>
          <li className="text-ink">{product.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <ProductGallery
            name={product.name}
            crystal={product.crystal}
            shots={[
              `/art/listing-${product.id}.jpg`,
              ...(galleryShots[product.id] ?? []),
              ...(product.worn ? [`/art/worn-${product.id}.jpg`] : []),
            ]}
          />

          <div className="flex flex-col justify-center">
            <p className="font-serif text-xs uppercase tracking-[0.2em] text-ink-light">
              Matching Set — Two Pieces, One Stone
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg text-ink-light">{product.tagline}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-lavender/30 px-3 py-1 text-xs text-ink-light">
                {product.crystal}
              </span>
              <span className="rounded-full bg-rose/30 px-3 py-1 text-xs text-ink-light">
                {product.chakra} chakra
              </span>
            </div>

            <p className="mt-6 font-serif text-xl text-ink">
              A starting point, not a finished piece
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink-light">
              This is a studio design. Tell us what to change — the stones, the
              strap colour, the wrist and collar sizes — and we string the pair
              to order. Pricing is shared with approved partners in the
              distributor dashboard.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`mailto:hello@petscrystals.com?subject=${encodeURIComponent(
                  `Customise: ${product.name}`
                )}`}
                className="inline-block rounded-full bg-ink px-6 py-3 text-sm text-cream transition-colors hover:bg-gold"
              >
                Customise this design
              </a>
              <Link
                href="/wholesale"
                className="inline-block rounded-full border border-ink/15 px-6 py-3 text-sm text-ink transition-colors hover:border-ink/35"
              >
                Partner access
              </Link>
            </div>

            {product.neckMin && (
              <div className="mt-7 border-t border-line pt-6">
                <p className="eyebrow text-[0.6rem] text-ink-faint">
                  Collar measurements
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <dt className="text-ink-faint">Fits neck</dt>
                    <dd className="mt-0.5 text-ink tabular-nums">
                      {product.neckMin}–{product.neckMax} cm
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Strap width</dt>
                    <dd className="mt-0.5 text-ink tabular-nums">1.5 cm</dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Weight</dt>
                    <dd className="mt-0.5 text-ink tabular-nums">
                      {product.grams} g
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-faint">Suits</dt>
                    <dd className="mt-0.5 text-ink">{product.suits}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs leading-relaxed text-ink-faint">
                  Four buckle holes; the range above is the first hole to the
                  fourth. Measured by hand, so allow 1–2 cm either way.{" "}
                  <Link
                    href="/faq#measuring"
                    className="underline underline-offset-2 hover:text-ink"
                  >
                    How to measure
                  </Link>
                </p>
              </div>
            )}

            <ul className="mt-7 space-y-2 text-sm text-ink-light">
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Natural gemstone, vegan
                leather, gold-plated hardware
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Breakaway-safe charm clip —
                fits collars up to 1&quot;
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✦</span> Gift-ready packaging, ships
                worldwide
              </li>
              <li className="flex gap-2">
                <span className="text-gold">✦</span> 30-day returns
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* The bond */}
      <section className="border-y border-ink/5 bg-cream-dark/30">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 sm:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-ink">For them</h2>
            <p className="mt-3 leading-relaxed text-ink-light">
              {product.petBenefit}.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-ink">For you</h2>
            <p className="mt-3 leading-relaxed text-ink-light">
              {product.humanBenefit}.
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-serif text-3xl text-ink">What arrives</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Your bracelet",
              d: "Hand-strung on elastic cord. Fits wrists 6–8 inches.",
            },
            {
              t: "Their charm",
              d: "Clips onto any standard collar up to 1 inch wide.",
            },
            {
              t: "A care card",
              d: `The properties and intentions held in ${product.crystal.toLowerCase()}.`,
            },
            {
              t: "Gift packaging",
              d: "Cream paper box, gold ✦, cotton cord. No plastic.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-2xl border border-ink/5 bg-cream-dark/40 p-5"
            >
              <h3 className="font-serif text-lg text-ink">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-light">
                {item.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="border-t border-ink/5 bg-cream-dark/30">
        <div className="mx-auto max-w-3xl px-6 py-14">
          <h2 className="font-serif text-2xl text-ink">Wearing it safely</h2>
          <p className="mt-3 leading-relaxed text-ink-light">
            A collar charm is worn, not left on. Give your companion three
            supervised days to grow used to the weight before it becomes routine.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-ink-light">
            <li>· Up to 8–12 hours a day, supervised — never around the clock.</li>
            <li>
              · Remove when they are crated, alone, sleeping, swimming, or at the
              dog park.
            </li>
            <li>
              · Two fingers should slide comfortably between collar and neck.
            </li>
            <li>· For cats, always pair with a breakaway collar.</li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-ink/50">
            ✦ Crystals are a complement to care, not a substitute for it. Nothing
            here treats, diagnoses, or cures any condition. If your companion is
            unwell or anxious, speak with your veterinarian first.
          </p>
          <Link
            href="/care"
            className="mt-5 inline-block text-sm text-ink underline underline-offset-4 hover:text-ink-light"
          >
            Read the full care & safety guide
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-serif text-3xl text-ink">You may also feel drawn to</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {alsoLove.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="group rounded-2xl border border-ink/5 bg-cream-dark/40 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="aspect-[4/3] w-full rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${p.colors.join(", ")})`,
                }}
              />
              <h3 className="mt-4 font-serif text-lg text-ink">{p.name}</h3>
              <p className="text-sm text-ink-light">{p.tagline}</p>
              <p className="mt-2 text-xs text-ink-light">Partner pricing</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
