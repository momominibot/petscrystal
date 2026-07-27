import { Product } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-cream transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.5)]">
      {/* Watercolour wash standing in for the stone */}
      <Link
        href={`/products/${product.id}`}
        aria-label={`${product.name} — matching ${product.crystal} crystal bracelet and pet collar charm set for human and dog`}
        className="relative block aspect-[4/5] w-full overflow-hidden"
      >
        {/* soft colour bloom behind the painting */}
        <span
          aria-hidden
          className="absolute inset-0 block opacity-60"
          style={{
            background: `radial-gradient(ellipse 62% 52% at 48% 46%, ${product.colors[0]} 0%, transparent 68%)`,
          }}
        />
        <Image
          src={`/art/product-${product.id}.png`}
          alt={`Watercolour illustration of the ${product.name} set — a ${product.crystal} bracelet and a matching pet collar charm`}
          width={880}
          height={1100}
          className="bleed absolute inset-0 h-full w-full object-contain p-3"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl leading-snug text-indigo">
              <Link href={`/products/${product.id}`} className="brushed">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-ink-light">{product.tagline}</p>
          </div>
          <span className="shrink-0 rounded-full bg-periwinkle/50 px-3 py-1 text-[11px] text-indigo-soft">
            Partner pricing
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-periwinkle/60 px-2.5 py-0.5 text-[11px] text-indigo-soft">
            {product.crystal}
          </span>
          <span className="rounded-full bg-blush/70 px-2.5 py-0.5 text-[11px] text-indigo-soft">
            {product.chakra}
          </span>
        </div>

        <dl className="mt-1 space-y-1.5 text-xs leading-relaxed text-ink-light">
          <div className="flex gap-2">
            <dt className="shrink-0 text-gold">For them</dt>
            <dd>{product.petBenefit}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="shrink-0 text-gold">For you</dt>
            <dd>{product.humanBenefit}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-3">
          <Link
            href="/wholesale"
            className="inline-flex items-center gap-2 rounded-full bg-indigo px-5 py-2.5 text-sm text-cream transition-colors hover:bg-ink"
          >
            Partner access <span aria-hidden>→</span>
          </Link>
          <Link
            href={`/products/${product.id}`}
            className="brushed text-sm text-ink-light"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
