import { Product } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link
        href={`/products/${product.id}`}
        aria-label={`${product.name} — matching ${product.crystal} crystal bracelet and pet collar charm set`}
        className="tile relative block aspect-[4/5] w-full"
      >
        <Image
          src={`/art/product-${product.id}.png`}
          alt={`The ${product.name} set — a ${product.crystal} bracelet with a matching pet collar charm`}
          width={880}
          height={1100}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </Link>

      <div className="pt-5">
        <p className="eyebrow text-[0.58rem] text-ink-faint">{product.crystal}</p>
        <h3 className="mt-2">
          <Link
            href={`/products/${product.id}`}
            className="eyebrow text-[0.72rem] leading-relaxed text-ink transition-colors hover:text-gold"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-light">
          {product.tagline}
        </p>
        <p className="mt-3 text-[0.7rem] tracking-wide text-ink-faint">
          {product.chakra} chakra
        </p>
        <Link
          href={`/products/${product.id}`}
          className="action mt-4 text-ink transition-colors hover:text-gold"
        >
          Customise this design <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
