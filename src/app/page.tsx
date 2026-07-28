import { products } from "@/lib/products";
import { itemListSchema } from "@/lib/schema";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const EDITS = [
  { id: "amethyst-serenity", label: "For anxious hearts", name: "Amethyst" },
  { id: "rose-heart", label: "For the deeply bonded", name: "Rose Quartz" },
  { id: "azure-lagoon", label: "For restless travellers", name: "Aquamarine" },
  { id: "tigers-vigil", label: "For the watchful", name: "Tiger's Eye" },
];

export default function Home() {
  const hero = products[1]; // Amethyst Serenity — the strongest photograph
  const band = products[8]; // Monet's Garden

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema(products)),
        }}
      />

      {/* Hero — full-bleed photography, copy laid over it */}
      <section className="relative isolate flex min-h-[86vh] items-end overflow-hidden">
        <Image
          src={`/art/product-${hero.id}.png`}
          alt="A matching amethyst bracelet and pet collar charm photographed on travertine and linen"
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        {/* Two overlays: one lifts the bottom, one shades the side the copy
            sits on, so the headline stays legible over a busy photograph. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/75 via-ink/30 to-ink/5" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

        <div className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
          <div className="max-w-xl text-paper">
            <p className="eyebrow text-paper/80">Matching crystal sets</p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.06] sm:text-6xl">
              Worn together,
              <br />
              wherever you go
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-paper/85">
              Healing stones hand-strung in pairs — a bracelet for you, a charm
              for their collar. Every set made to order, and yours to design.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="#collection" className="btn-ghost action text-paper">
                <span>Browse the designs</span>
              </Link>
              <Link
                href="/wholesale"
                className="action text-paper/85 transition-colors hover:text-paper"
              >
                Become a partner <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning statement */}
      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="eyebrow text-gold">Pets Crystal</p>
          <h2 className="mt-5 font-serif text-3xl leading-snug text-ink sm:text-4xl">
            A stone for every spirit
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-light">
            Start with the temperament your companion already has — amethyst
            for anxious hearts, aquamarine for restless travellers, garnet for
            the fearless — then make the design your own.
          </p>
          <Link
            href="#collection"
            className="action mt-8 inline-flex text-ink transition-colors hover:text-gold"
          >
            Browse the archive <span aria-hidden>↗</span>
          </Link>
        </div>
      </section>

      {/* The edit — four stones, photographed */}
      <section className="bg-paper pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {EDITS.map((e, i) => (
              <Reveal key={e.id} delay={i * 80}>
                <Link href={`/products/${e.id}`} className="group block">
                  <div className="tile relative aspect-[4/5] w-full">
                    <Image
                      src={`/art/product-${e.id}.png`}
                      alt={`${e.name} matching crystal set`}
                      width={880}
                      height={1100}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <p className="eyebrow mt-5 text-[0.58rem] text-ink-faint">
                    {e.label}
                  </p>
                  <p className="eyebrow mt-2 text-[0.72rem] text-ink transition-colors group-hover:text-gold">
                    {e.name}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial band */}
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden">
        <Image
          src={`/art/product-${band.id}.png`}
          alt="Citrine and green aventurine crystal jewellery in morning light"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-ink/45" />
        <div className="mx-auto w-full max-w-7xl px-5 text-center sm:px-8">
          <p className="eyebrow text-paper/80">The bond</p>
          <h2 className="mt-5 font-serif text-3xl leading-snug text-paper sm:text-5xl">
            Two pieces,
            <br />
            one unbreakable bond
          </h2>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed text-paper/85">
            A bracelet for your wrist, a charm for their collar. Wherever the
            day takes you both, what you share stays whole.
          </p>
          <Link
            href="#collection"
            className="btn-ghost action mt-9 inline-flex text-paper"
          >
            <span>Start your design</span>
          </Link>
        </div>
      </section>

      {/* Full collection */}
      <section id="collection" className="scroll-mt-24 bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">The design archive</p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
              Designs to make your own
            </h2>
            <p className="mt-5 leading-relaxed text-ink-light">
              Every set here is a studio design, not a fixed product. Start from
              one you love, then choose your stones, your strap and the fit for
              both of you — each set is strung to order.
            </p>
            <p className="mt-4 text-sm text-ink-faint">
              {products.length} designs to customise
            </p>
          </div>

          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Partner strip */}
      <section className="border-t border-line bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="eyebrow text-gold">Trade</p>
          <h2 className="mt-5 font-serif text-3xl leading-snug text-ink sm:text-4xl">
            Carry Pets Crystal
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-light">
            Three ways to work with us — wholesale, a one-time-fee dropship
            partnership, or DIY components. Pricing is shared once your
            application is approved.
          </p>
          <Link href="/wholesale" className="btn-solid action mt-9 inline-flex">
            <span>Apply for partnership</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
