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
            <Image
              src={`/art/birth-${p.id}.jpg`}
              alt={`${p.month} — ${p.stone} locket set, a collar for your pet and a chain for you`}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 38vw, 68vw"
              className="product-shot object-cover"
            />
            <span className="eyebrow pointer-events-none absolute left-3 top-3 rounded-full bg-paper/85 px-2.5 py-1 text-[0.5rem] text-ink-light">
              {p.monthShort}
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
