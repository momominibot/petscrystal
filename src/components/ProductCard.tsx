import { Product } from "@/lib/products";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-ink/5 bg-cream-dark/50 transition-all hover:shadow-lg hover:-translate-y-0.5">
      {/* Crystal color gradient placeholder */}
      <Link
        href={`/products/${product.id}`}
        aria-label={`${product.name} — matching ${product.crystal} crystal bracelet and pet collar charm set for human and dog`}
        className="block aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
        style={{
          background: `linear-gradient(135deg, ${product.colors.join(", ")})`,
        }}
      >
        <div className="flex h-full items-center justify-center">
          <span className="font-serif text-5xl text-white/40">✦</span>
        </div>
      </Link>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-serif text-lg text-ink">
              <Link
                href={`/products/${product.id}`}
                className="transition-colors hover:text-ink-light"
              >
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-ink-light">{product.tagline}</p>
          </div>
          <span className="shrink-0 font-serif text-lg text-ink">
            ${product.price}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-lavender/30 px-2.5 py-0.5 text-xs text-ink-light">
            {product.crystal}
          </span>
          <span className="rounded-full bg-rose/30 px-2.5 py-0.5 text-xs text-ink-light">
            {product.chakra}
          </span>
        </div>

        <div className="space-y-1 pt-1 text-xs text-ink-light">
          <p>
            <span className="font-medium text-ink">🐾 Pet:</span>{" "}
            {product.petBenefit}
          </p>
          <p>
            <span className="font-medium text-ink">✨ You:</span>{" "}
            {product.humanBenefit}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <CheckoutButton
            priceId={product.stripePriceId}
            label={`Buy — $${product.price}`}
          />
          <Link
            href={`/products/${product.id}`}
            className="text-sm text-ink-light underline underline-offset-4 transition-colors hover:text-ink"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
