"use client";

import { useState } from "react";
import { VARIANTS, DEFAULT_VARIANT, type Collection, type VariantKey } from "@/lib/variants";

/**
 * Variant picker plus the buy button, as one unit.
 *
 * The pair is preselected: it is the offer the pricing is built around, and
 * preselecting it means the common case is one click rather than two.
 */
export default function BuyPanel({
  productId,
  collection,
  available,
}: {
  productId: string;
  collection: Collection;
  /** Variants that actually have a Stripe price. Others render disabled. */
  available: VariantKey[];
}) {
  const [variant, setVariant] = useState<VariantKey>(DEFAULT_VARIANT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chosen = VARIANTS.find((v) => v.key === variant)!;
  const canBuy = available.includes(variant);

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, variant }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "checkout failed");
      window.location.href = data.url;
    } catch {
      setError("Something went wrong — please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <fieldset>
        <legend className="eyebrow text-[0.6rem] text-ink-faint">
          Choose your pieces
        </legend>
        <div className="mt-3 grid gap-2">
          {VARIANTS.map((v) => {
            const active = v.key === variant;
            const sold = !available.includes(v.key);
            return (
              <label
                key={v.key}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-colors ${
                  active
                    ? "border-ink/40 bg-cream-dark/50"
                    : "border-ink/10 hover:border-ink/25"
                } ${sold ? "opacity-50" : ""}`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="variant"
                    value={v.key}
                    checked={active}
                    onChange={() => setVariant(v.key)}
                    className="accent-ink"
                  />
                  <span>
                    <span className="block text-sm text-ink">{v.label}</span>
                    <span className="block text-xs text-ink-light">
                      {v.piece[collection]}
                    </span>
                  </span>
                </span>
                <span className="whitespace-nowrap text-sm tabular-nums text-ink">
                  {v.compareAt && (
                    <s className="mr-2 text-ink-faint">US${v.compareAt}</s>
                  )}
                  US${v.price}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={checkout}
          disabled={loading || !canBuy}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-cream transition-colors hover:bg-gold disabled:opacity-50"
        >
          {loading
            ? "Redirecting…"
            : canBuy
              ? `Add to bag — US$${chosen.price}`
              : "Not available yet"}
          {!loading && canBuy && <span className="text-lg leading-none">→</span>}
        </button>
        {!canBuy && (
          <p className="text-xs text-ink-light">
            This option is not set up for checkout yet —{" "}
            <a
              href={`mailto:hello@petscrystals.com?subject=${encodeURIComponent(
                `Order: ${productId} (${chosen.label})`
              )}`}
              className="underline underline-offset-2"
            >
              message us
            </a>{" "}
            and we will invoice you directly.
          </p>
        )}
        {error && (
          <p role="alert" className="text-xs text-rose-dark">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
