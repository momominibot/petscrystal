"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { variantFor } from "@/lib/variants";

/**
 * The bag, as a slide-over.
 *
 * A drawer rather than a /cart page: every add happens from a product page,
 * and sending someone away from the thing they were looking at to confirm they
 * want it is how you lose the second item.
 */
export default function CartDrawer() {
  const { lines, count, subtotal, setQuantity, remove, open, setOpen } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Escape closes; body scroll locks while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, setOpen]);

  const checkout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({
            productId: l.productId,
            variant: l.variant,
            quantity: l.quantity,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "checkout failed");
      window.location.href = data.url;
    } catch {
      setError("Could not start checkout — please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[60] bg-ink/25 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={`fixed top-0 right-0 z-[61] flex h-dvh w-full max-w-md flex-col bg-paper shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="eyebrow text-[0.62rem] text-ink">
            Your bag{count > 0 && ` · ${count}`}
          </p>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close bag"
            className="rounded-full p-2 text-ink-light transition-colors hover:bg-cream-dark hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
              />
            </svg>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <p className="font-serif text-xl text-ink">Nothing in the bag yet</p>
            <p className="text-sm leading-relaxed text-ink-light">
              Two pieces from the same stone — one for you, one for them.
            </p>
            <Link
              href="/#collection"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm text-ink transition-colors hover:border-ink/35"
            >
              Browse the designs
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={`${l.productId}-${l.variant}`} className="flex gap-4 py-4">
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="tile relative aspect-[4/5] w-20 shrink-0 overflow-hidden"
                  >
                    <Image src={l.image} alt="" fill sizes="80px" className="object-cover" />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-base leading-tight text-ink hover:underline"
                    >
                      {l.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-light">
                      {variantFor(l.variant).label} ·{" "}
                      {variantFor(l.variant).piece[l.collection]}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-ink/12">
                        <button
                          onClick={() => setQuantity(l.productId, l.variant, l.quantity - 1)}
                          aria-label={`Reduce quantity of ${l.name}`}
                          className="px-2.5 py-1 text-ink-light transition-colors hover:text-ink"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm tabular-nums text-ink">
                          {l.quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(l.productId, l.variant, l.quantity + 1)}
                          aria-label={`Increase quantity of ${l.name}`}
                          className="px-2.5 py-1 text-ink-light transition-colors hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm tabular-nums text-ink">
                        US${l.price * l.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => remove(l.productId, l.variant)}
                    aria-label={`Remove ${l.name}`}
                    className="self-start p-1 text-ink-faint transition-colors hover:text-ink"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" aria-hidden>
                      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.6" fill="none" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink-light">Subtotal</span>
                <span className="font-serif text-xl tabular-nums text-ink">
                  US${subtotal}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-faint">
                Shipping calculated at checkout. Every set is made to order.
              </p>

              <button
                onClick={checkout}
                disabled={loading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm text-cream transition-colors hover:bg-gold disabled:opacity-60"
              >
                {loading ? "Redirecting…" : "Checkout"}
                {!loading && <span className="text-lg leading-none">→</span>}
              </button>
              {error && (
                <p role="alert" className="mt-2 text-xs text-rose-dark">
                  {error}
                </p>
              )}
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
