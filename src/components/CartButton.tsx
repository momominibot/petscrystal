"use client";

import { useCart } from "@/lib/cart";

/**
 * Bag control in the header. The count only renders once localStorage has been
 * read — showing 0 on the server and 3 on the client is a hydration mismatch.
 */
export default function CartButton() {
  const { count, setOpen, ready } = useCart();

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={count > 0 ? `Open bag, ${count} items` : "Open bag"}
      className="relative -mr-1 flex items-center gap-1.5 rounded-full px-2 py-1 text-ink-light transition-colors hover:text-ink"
    >
      <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M3.5 6.5h13l-1 11h-11l-1-11ZM7 6.5V5a3 3 0 0 1 6 0v1.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
      {ready && count > 0 && (
        <span className="text-[0.62rem] tabular-nums text-ink">{count}</span>
      )}
    </button>
  );
}
