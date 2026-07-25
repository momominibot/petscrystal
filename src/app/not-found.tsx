import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-serif text-3xl text-ink/20">✦</p>
      <h1 className="mt-6 font-serif text-4xl text-ink">
        This page has wandered off
      </h1>
      <p className="mt-4 max-w-sm leading-relaxed text-ink-light">
        Nothing lives at this address. It happens — let&apos;s get you back to
        something solid.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition-all hover:bg-ink/85"
      >
        Back to the collection →
      </Link>
    </div>
  );
}
