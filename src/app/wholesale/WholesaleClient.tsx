"use client";

import { useState } from "react";

type Program = {
  id: string;
  name: string;
  tagline: string;
  description: string;
};

export default function WholesaleClient({ programs }: { programs: Program[] }) {
  // Application form
  const [form, setForm] = useState({
    business: "",
    name: "",
    email: "",
    country: "",
    program: programs[0]?.id ?? "wholesale",
    message: "",
  });
  const [applied, setApplied] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applying, setApplying] = useState(false);

  // Approved-partner login
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);
    setApplyError("");
    const res = await fetch("/api/partner-apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setApplied(true);
    } else {
      setApplyError("Something went wrong — please try again or email us directly.");
    }
    setApplying(false);
  };

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

  const field =
    "w-full rounded-2xl border border-ink/15 bg-cream px-5 py-3 text-ink placeholder:text-ink/30 focus:border-ink/30 focus:outline-none";

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center">
          <p className="font-serif text-sm tracking-[0.2em] text-ink-light uppercase">
            Partner With Us
          </p>
          <h1 className="mt-3 font-serif text-4xl text-ink">
            Three ways to carry Pets Crystal
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-ink-light">
            Pricing isn&apos;t public — every partnership is approved personally.
            Apply below, and once approved you&apos;ll receive credentials for the
            distributor dashboard.
          </p>
        </div>

        {/* The three models — no numbers on the public page */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {programs.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-ink/5 bg-cream-dark/40 p-6"
            >
              <h3 className="font-serif text-lg text-ink">{p.name}</h3>
              <p className="mt-1 text-sm font-medium text-lavender-dark">
                {p.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-light">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink/40">
          Shipping not included in any program.
        </p>

        {/* Application */}
        <div className="mt-14 rounded-3xl border border-ink/5 bg-cream-dark/30 p-8 sm:p-10">
          {applied ? (
            <div className="py-8 text-center">
              <p className="font-serif text-2xl text-ink">✦</p>
              <h2 className="mt-3 font-serif text-2xl text-ink">
                Application received
              </h2>
              <p className="mx-auto mt-3 max-w-md text-ink-light">
                Every application is reviewed and approved personally by our
                founder. Once approved, your dashboard access will be sent to{" "}
                <span className="text-ink">{form.email}</span>.
              </p>
            </div>
          ) : (
            <>
              <h2 className="font-serif text-2xl text-ink">Apply for partnership</h2>
              <form onSubmit={handleApply} className="mt-6 grid gap-4 sm:grid-cols-2">
                <input
                  required
                  value={form.business}
                  onChange={(e) => setForm({ ...form, business: e.target.value })}
                  placeholder="Business name"
                  className={field}
                />
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contact name"
                  className={field}
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Email"
                  className={field}
                />
                <input
                  required
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="Country / region"
                  className={field}
                />
                <select
                  value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  className={`${field} sm:col-span-2`}
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.tagline}
                    </option>
                  ))}
                </select>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your store or channel (optional)"
                  rows={3}
                  className={`${field} rounded-2xl sm:col-span-2`}
                />
                {applyError && (
                  <p className="text-sm text-rose-dark sm:col-span-2">{applyError}</p>
                )}
                <button
                  type="submit"
                  disabled={applying}
                  className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-all hover:bg-ink/85 disabled:opacity-50 sm:col-span-2"
                >
                  {applying ? "Submitting…" : "Submit application"}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Approved-partner login */}
        <div className="mt-10 text-center">
          <p className="text-sm text-ink-light">Already approved?</p>
          <form
            onSubmit={handleLogin}
            className="mx-auto mt-3 flex max-w-sm gap-2"
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dashboard password"
              className="w-full rounded-full border border-ink/15 bg-cream px-5 py-2.5 text-center text-sm text-ink placeholder:text-ink/30 focus:border-ink/30 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !password}
              className="shrink-0 rounded-full border border-ink/15 px-5 py-2.5 text-sm text-ink transition-all hover:border-ink/30 disabled:opacity-50"
            >
              {loading ? "…" : "Log in"}
            </button>
          </form>
          {error && <p className="mt-2 text-sm text-rose-dark">{error}</p>}
        </div>
      </div>
    </div>
  );
}
