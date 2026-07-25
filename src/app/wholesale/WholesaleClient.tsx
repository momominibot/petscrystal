"use client";

import { useState } from "react";

export default function WholesaleClient({
  tiers,
}: {
  tiers: { name: string; discount: string; minOrder: string; price: string; margin: string }[];
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/wholesale-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.reload();
    } else {
      setError("Incorrect password");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-lg px-6 py-20 text-center">
        <p className="font-serif text-sm tracking-[0.2em] text-ink-light uppercase">
          Wholesale Access
        </p>
        <h1 className="mt-3 font-serif text-4xl text-ink">
          Pets Crystal
        </h1>
        <p className="mt-3 text-ink-light">
          Wholesale distributor — login to view tier pricing and
          place wholesale orders.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter wholesale password"
            className="w-full rounded-full border border-ink/15 bg-cream px-5 py-3 text-center text-ink placeholder:text-ink/30 focus:border-ink/30 focus:outline-none"
          />
          {error && <p className="text-sm text-rose-dark">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-all hover:bg-ink/85 disabled:opacity-50"
          >
            {loading ? "Verifying…" : "View Wholesale Pricing"}
          </button>
        </form>

        {/* Preview tiers (generic, no prices) */}
        <div className="mt-12 grid gap-3 text-left">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex items-center justify-between rounded-xl border border-ink/5 bg-cream-dark/30 px-5 py-3"
            >
              <span className="font-medium text-ink">{tier.name}</span>
              <span className="text-sm text-ink-light">
                {tier.discount} · Min {tier.minOrder}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
