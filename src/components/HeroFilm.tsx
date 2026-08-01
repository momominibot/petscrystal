"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The watercolour hero, animated.
 *
 * The still is rendered by the server as a normal <Image> underneath this
 * component, so the painting is on screen and countable as LCP before any
 * video byte arrives. This layer only fades the film in on top once it can
 * actually play. Nothing shifts, and a visitor who never gets the video sees
 * the same picture, not a hole.
 *
 * Three reasons the <video> is mounted from the client rather than rendered
 * flat in the page:
 *
 *  1. prefers-reduced-motion. CSS can hide a video but cannot stop it — a
 *     `display: none` clip may still be fetched and decoded. Deciding here
 *     means a visitor who asked for stillness never downloads it at all.
 *  2. Save-Data / 2g. Same argument, and it is a megabyte of decoration.
 *  3. React drops the `muted` *attribute* even when the prop is set, and iOS
 *     will refuse to autoplay without it. The ref below sets it on the element
 *     directly, before play is attempted.
 *
 * The film has no paper of its own. Every frame was lifted off the painted
 * sheet with the same per-pixel paper model — computed once from frame 0, so
 * the flat ground cannot shimmer between frames — and then composited back
 * onto --color-cream, the exact colour of the section behind it. The still
 * underneath is true RGBA. Alpha video would have been the tidier answer, but
 * VP9-with-alpha is not reliably encodable and HEVC-with-alpha is Safari-only
 * at four times the bytes; matching the ground gets the same pixels in every
 * browser. If --color-cream ever changes, these two files must be re-rendered.
 *
 * It plays once and stops, rather than looping. That is not timidity — WCAG
 * 2.2.2 requires a pause control for anything that moves automatically for
 * more than five seconds, and an infinite loop qualifies. The clip runs 4.84s
 * and holds, so no control is needed and the hero stays clean. The film was
 * generated with the same frame at both ends, so what it settles on is the
 * still that was already underneath it: the picture simply stops breathing.
 */
export default function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  const [wanted, setWanted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    // `saveData` is not in the DOM lib; it is also absent on Safari, where
    // undefined correctly reads as "no preference expressed".
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const thrifty =
      conn?.saveData === true ||
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "2g";

    const decide = () => setWanted(!mq.matches && !thrifty);
    decide();

    mq.addEventListener("change", decide);
    return () => mq.removeEventListener("change", decide);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !wanted) return;

    el.muted = true; // must be the attribute, not just the prop — see above
    // Autoplay can still be refused (low power mode, a strict policy). That is
    // a fine outcome: the poster stays, so we simply never fade the film in.
    void el.play().catch(() => {});
  }, [wanted]);

  if (!wanted) return null;

  return (
    <video
      ref={ref}
      // eslint-disable-next-line jsx-a11y/media-has-caption -- decorative; the
      // still beneath carries the alt text and there is no audio or speech.
      autoPlay
      muted
      playsInline
      preload="auto"
      // No poster. The lifted still is already rendered underneath, and a
      // poster here would be a second copy of it on a baked ground — the
      // exact thing this pass removed.
      aria-hidden
      tabIndex={-1}
      disablePictureInPicture
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Versioned, because /video/* is cached immutable for a year. A recut
          ships as hero-v3.*, it never overwrites these. */}
      <source src="/video/hero-v2.webm" type="video/webm" />
      <source src="/video/hero-v2.mp4" type="video/mp4" />
    </video>
  );
}
