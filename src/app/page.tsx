import { products } from "@/lib/products";
import { birthPieces } from "@/lib/birth";
import { itemListSchema } from "@/lib/schema";
import ProductCard from "@/components/ProductCard";
import Rail from "@/components/Rail";
import BirthRail from "@/components/BirthRail";
import EverydayRail from "@/components/EverydayRail";
import { everydayCollars } from "@/lib/everyday";
import { brandStory, designInspirations } from "@/lib/birthStory";
import Watercolour from "@/components/Watercolour";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

/** Four things we can actually stand behind, above the partner strip. */
const PROMISES = [
  {
    title: "Seventy countries",
    body: "We post from Singapore to seventy countries across Asia, Europe, the Middle East, Africa, the Americas and Oceania.",
  },
  {
    title: "Strung by hand",
    body: "Every set is knotted by hand, one at a time — natural stone, gold-plated hardware, and nothing rushed.",
  },
  {
    title: "Made nowhere else",
    body: "Each design is drawn in our own studio, then altered to suit you: the stones, the strap, the fit for both of you.",
  },
  {
    title: "Little to throw away",
    body: "Minimal packaging by choice — enough to protect the piece and keep it giftable, and not a gram more.",
  },
];

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
            <p className="eyebrow text-gold">The Tether Collection</p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
              Designs to make your own
            </h2>
            <p className="mt-5 leading-relaxed text-ink-light">
              Gemstone and vegan leather, strung in pairs. Every set here is a
              studio design, not a fixed product — start from one you love, then
              choose your stones, your strap and the fit for both of you.
            </p>
            <p className="mt-4 text-sm text-ink-faint">
              {products.length} designs to customise
            </p>
          </div>

          <div className="mt-14">
            <Rail label="The Tether Collection">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="w-[68vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23%]"
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </Rail>
          </div>
        </div>
      </section>

      {/* The Birth Collection */}
      <section
        id="birth"
        className="scroll-mt-24 border-t border-line bg-cream py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">The Birth Collection</p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
              A stone for the month they arrived
            </h2>
            <p className="mt-5 leading-relaxed text-ink-light">
              Twelve stones, one for every birth month — theirs or yours. Each
              set is three pieces that come apart: a collar for them, a chain
              for you, and a locket that opens to hold a photograph.
            </p>
            <p className="mt-4 text-sm text-ink-faint">
              {birthPieces.length} months · US$89 each
            </p>
          </div>

          <div className="mt-14">
            <BirthRail />
          </div>
        </div>
      </section>

      {/* The studio's own story, translated. Every claim here was audited:
          the stones are given as tradition and intention, never as effect. */}
      <section className="border-t border-line bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">Our story</p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
              {brandStory.heading}
            </h2>
            <p className="mt-5 leading-relaxed text-ink-light">
              {brandStory.intro}
            </p>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {brandStory.pillars.map((p) => (
              <div key={p.title}>
                <span aria-hidden className="block h-px w-10 bg-gold" />
                <h3 className="mt-5 font-serif text-xl leading-snug text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-light">
                  {p.body}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Watercolour width={900} />
          </div>

          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="eyebrow text-[0.6rem] text-ink-faint">
              Four things we designed for
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-5xl gap-8 sm:grid-cols-2">
            {designInspirations.map((d, i) => (
              <div
                key={d.title}
                className="rounded-2xl border border-ink/8 bg-cream-dark/30 p-6"
              >
                <p className="eyebrow text-[0.55rem] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-serif text-lg leading-snug text-ink">
                  {d.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-light">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Everyday Collection */}
      <section
        id="everyday"
        className="scroll-mt-24 border-t border-line bg-paper py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold">The Everyday Collection</p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
              For the days in between
            </h2>
            <p className="mt-5 leading-relaxed text-ink-light">
              A collar on its own, with the stones set into the strap rather
              than hung from it — nothing to swing, catch or lose. Five
              colours, made for wearing every day rather than for occasions.
            </p>
            <p className="mt-4 text-sm text-ink-faint">
              {everydayCollars.length} colours · US${everydayCollars[0].price} each
            </p>
          </div>

          <div className="mt-14">
            <EverydayRail />
          </div>
        </div>
      </section>

      {/* What you can count on */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p, i) => (
              <div key={p.title} className="text-center">
                <Image
                  src={`/art/promise-${i + 1}.png`}
                  alt=""
                  aria-hidden
                  width={1024}
                  height={1024}
                  sizes="(min-width: 1024px) 14vw, (min-width: 640px) 28vw, 55vw"
                  className="mx-auto w-32 sm:w-36"
                />
                <h3 className="eyebrow mt-4 text-[0.66rem] text-ink">
                  {p.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[26ch] text-sm leading-relaxed text-ink-light">
                  {p.body}
                </p>
              </div>
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
