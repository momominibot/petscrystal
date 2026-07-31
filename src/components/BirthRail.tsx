import Image from "next/image";
import Link from "next/link";
import { birthPieces } from "@/lib/birth";
import Rail from "@/components/Rail";

export default function BirthRail() {
  return (
    <Rail label="The Birth Collection, twelve stones">
      {birthPieces.map((p) => (
        <article
          key={p.id}
          className="group w-[68vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23%]"
        >
          <Link
            href={`/birth/${p.id}`}
            aria-label={`${p.month} — ${p.stone} birth month set`}
            className="tile relative block aspect-[4/5] w-full"
          >
            {/* The animal wearing the collar leads; hover cross-fades to the
                owner wearing the matching necklace. The curated Birth set is
                ordered the same way for every month — -1 is the pet shot, -2
                the model — so no per-month mapping is needed here. */}
            <Image
              src={`/art/blbirth-${p.id}-1.jpg`}
              alt={`A pet wearing the ${p.month} ${p.stone} collar`}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 38vw, 68vw"
              className="product-shot object-cover transition-opacity duration-700 group-hover:opacity-0"
            />
            <Image
              src={`/art/blbirth-${p.id}-2.jpg`}
              alt={`The ${p.month} ${p.stone} necklace and locket worn by its owner`}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 38vw, 68vw"
              className="-z-10 object-cover"
            />
            <span className="eyebrow pointer-events-none absolute left-3 top-3 rounded-full bg-paper/85 px-2.5 py-1 text-[0.5rem] text-ink-light">
              {p.monthShort}
            </span>
            <span className="eyebrow pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-paper/85 px-3 py-1 text-[0.5rem] text-ink-light opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              For you
            </span>
          </Link>

          <p className="eyebrow mt-5 text-[0.58rem] text-ink-faint">
            {p.stone}
          </p>
          <h3 className="mt-2">
            <Link
              href={`/birth/${p.id}`}
              className="eyebrow text-[0.72rem] leading-relaxed text-ink transition-colors hover:text-gold"
            >
              {p.month}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-light">
            {p.tagline}
          </p>
          <p className="mt-3 text-[0.7rem] tracking-wide text-ink-faint">
            {p.meaning} · {p.strap} strap
          </p>
        </article>
      ))}
    </Rail>
  );
}
