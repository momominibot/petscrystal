import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order confirmed | Pets Crystal",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-24">
      <div className="text-center max-w-md">
        <p className="font-serif text-5xl text-gold">✦</p>
        <h1 className="mt-6 font-serif text-3xl text-ink">Order confirmed</h1>
        <p className="mt-3 text-ink-light leading-relaxed">
          Thank you for choosing Pets Crystal. You&apos;ll receive a
          confirmation email shortly. Your matching crystal set is being
          prepared with care.
        </p>
        <div className="mt-8 space-y-3">
          <p className="text-sm text-ink-light">
            While you wait — each crystal arrives with a care card explaining
            its healing properties for you and your companion.
          </p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm text-ink transition-all hover:border-ink/30"
        >
          ← Back to shop
        </Link>
      </div>
    </div>
  );
}
