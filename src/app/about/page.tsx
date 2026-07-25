import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbListSchema } from "@/lib/schema";
import Footer from "@/components/Footer";

const SITE = "https://petscrystals.com";

export const metadata: Metadata = {
  title: "Our Story — Why We Make Matching Pet Crystal Sets | Pets Crystal",
  description:
    "Pets Crystal makes matching crystal jewelry for people and their animals. What we believe, what we source, and what we will never claim about crystals and pet health.",
  alternates: { canonical: `${SITE}/about` },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE },
    { name: "Our Story", url: `${SITE}/about` },
  ];

  return (
    <div className="min-h-screen pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListSchema(breadcrumbs)),
        }}
      />

      <section className="mx-auto max-w-3xl px-6 pb-14 text-center">
        <p className="font-serif text-xs uppercase tracking-[0.2em] text-ink-light">
          Our Story
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          We are not a pet accessory brand
        </h1>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-light">
          We are a connection brand. The jewelry is simply how the idea travels.
        </p>
        <p className="mt-6 font-serif text-2xl text-ink/20">✦</p>
      </section>

      <section className="mx-auto max-w-2xl space-y-6 px-6 pb-16 leading-relaxed text-ink-light">
        <p>
          There is a particular kind of quiet that arrives when an animal settles
          against you. No conversation, no explaining yourself. Just a warm weight
          and the sense of being thoroughly known by something that has never
          heard you speak.
        </p>
        <p>
          Pets Crystal began with wanting to hold onto that — to carry a small
          reminder of it through the ordinary parts of a day. So we made pairs. One
          stone, cut into two pieces: a bracelet for the person, a charm for the
          collar. Not a matching outfit. A shared object, which is a different and
          older thing.
        </p>

        <h2 className="pt-6 font-serif text-2xl text-ink">
          What we believe, and what we won&apos;t say
        </h2>
        <p>
          We should be plain about this, because much of our industry is not.
          There is no scientific evidence that crystals heal animals. We do not
          claim they do, and we would ask you to be careful with anyone who does.
        </p>
        <p>
          What the research does support is the bond itself. Time spent in
          deliberate, attentive contact with an animal measurably lowers cortisol,
          blood pressure, and heart rate in people — Beetz and colleagues reviewed
          sixty-nine studies to that effect. Nagasawa&apos;s work in{" "}
          <span className="italic">Science</span> traced the oxytocin loop that runs
          between a dog and their person through something as simple as a held gaze.
          And a well-documented pattern in veterinary medicine shows that when an
          owner believes their animal is improving, the animal&apos;s behaviour often
          does improve.
        </p>
        <p>
          A shared object is a prompt to be present. That is the honest mechanism,
          and it is enough. Anything that reminds you to sit down and pay attention
          to your companion is doing real work — no mysticism required.
        </p>

        <h2 className="pt-6 font-serif text-2xl text-ink">How we make things</h2>
        <p>
          Natural gemstone, gold-plated hardware, hand-strung. We never use
          malachite, stibnite, or cinnabar — stones that are lovely and genuinely
          unsafe near an animal that might mouth them. Every charm is
          smooth-polished, and every clip is designed to give way under pressure
          rather than hold fast, because a collar that will not release is a hazard
          no matter how beautiful it looks.
        </p>
        <p>
          Every set ships with a three-day introduction guide, because a new object
          around the neck should be introduced gradually. Packaging is unbleached
          paper, cotton cord, and no plastic.
        </p>

        <h2 className="pt-6 font-serif text-2xl text-ink">Where we are</h2>
        <p>
          Pets Crystal is a small operation based in Singapore, shipping to nine
          countries. Our stones are sourced through established gemstone workshops
          in Donghai and Guangzhou, the two centres of the trade, and every batch is
          checked by hand before it is strung.
        </p>
        <p>
          If you want to reach us, you will get a person, not a queue —{" "}
          <a
            href="mailto:hello@petscrystals.com"
            className="text-ink underline underline-offset-4"
          >
            hello@petscrystals.com
          </a>
          .
        </p>

        <div className="!mt-12 rounded-2xl border border-ink/5 bg-cream-dark/40 p-7 text-center">
          <p className="font-serif text-xl text-ink">Twelve stones, twelve pairs</p>
          <p className="mt-2 text-sm text-ink-light">
            Find the one that sounds like the two of you.
          </p>
          <Link
            href="/#collection"
            className="mt-5 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-all hover:bg-ink/85"
          >
            See the collection →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
