"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal scrolling rail for a collection.
 *
 * Native scroll does the work — snap points, momentum, trackpad and touch all
 * come free, and it degrades to a plain scrollable row without JavaScript. The
 * arrows are an affordance on top, hidden on touch where the swipe is obvious
 * and a mouse is not present.
 */
export default function Rail({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // 2px of slack: fractional widths never land exactly on the boundary
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    measure();
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  const nudge = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    // one card plus its gap, so a click always lands on a snap point
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={measure}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-8 sm:px-8"
      >
        {children}
      </div>

      {/* Arrows sit outside the scroller so they never scroll away with it. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between lg:flex">
        {(
          [
            ["Scroll left", -1, atStart, "-translate-x-1/2"],
            ["Scroll right", 1, atEnd, "translate-x-1/2"],
          ] as const
        ).map(([text, direction, disabled, shift]) => (
          <button
            key={text}
            type="button"
            onClick={() => nudge(direction)}
            disabled={disabled}
            aria-label={text}
            className={`pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-line bg-paper/90 text-ink shadow-sm backdrop-blur-sm transition-opacity hover:bg-paper ${shift} ${
              disabled ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
          >
            <span aria-hidden>{direction === 1 ? "→" : "←"}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
