"use client";

import { useState } from "react";

export default function CheckoutButton({
  priceId,
  label = "Buy Now — $89",
}: {
  priceId: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      if (!res.ok) throw new Error("checkout failed");
      const data = await res.json();
      if (!data.url) throw new Error("no checkout url");
      window.location.href = data.url;
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <span className="inline-flex flex-col gap-1.5">
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-all hover:bg-ink/85 disabled:opacity-60"
      >
        {loading ? "Redirecting…" : label}
        <span className="text-lg leading-none">→</span>
      </button>
      {error && (
        <span role="alert" className="text-xs text-rose-dark">
          Something went wrong — please try again.
        </span>
      )}
    </span>
  );
}
