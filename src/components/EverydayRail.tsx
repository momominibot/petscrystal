import Image from "next/image";
import Link from "next/link";
import { everydayCollars } from "@/lib/everyday";
import Rail from "@/components/Rail";

export default function EverydayRail() {
  return (
    <Rail label="The Everyday Collection, five collars">
      {everydayCollars.map((c) => (
        <article
          key={c.id}
          className="group w-[68vw] shrink-0 snap-start sm:w-[38vw] lg:w-[23%]"
        >
          <Link
            href={`/everyday/${c.id}`}
            aria-label={`${c.name} — ${c.stone} everyday collar`}
            className="tile relative block aspect-[4/5] w-full"
          >
            {/* Worn first, the collar on its own underneath — same reading
                order as the other two rails. */}
            <Image
              src={`/art/ev-${c.id}-front.jpg`}
              alt={`A cat wearing the ${c.name} ${c.stone} collar`}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 38vw, 68vw"
              className="product-shot object-cover transition-opacity duration-700 group-hover:opacity-0"
            />
            <Image
              src={`/art/ev-${c.id}-hover.jpg`}
              alt={`The ${c.name} collar, ${c.strap.toLowerCase()} leather set with ${c.stone.toLowerCase()}`}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 38vw, 68vw"
              className="-z-10 object-cover"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 rounded-full ring-1 ring-paper/70"
              style={{ background: c.swatch }}
            />
          </Link>

          <p className="eyebrow mt-5 text-[0.58rem] text-ink-faint">{c.stone}</p>
          <h3 className="mt-2">
            <Link
              href={`/everyday/${c.id}`}
              className="eyebrow text-[0.72rem] leading-relaxed text-ink transition-colors hover:text-gold"
            >
              {c.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-light">{c.tagline}</p>
          <p className="mt-3 text-[0.7rem] tracking-wide text-ink-faint">
            {c.meaning} · US${c.price}
          </p>
        </article>
      ))}
    </Rail>
  );
}
