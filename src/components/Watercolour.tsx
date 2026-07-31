/**
 * A watercolour rule between sections.
 *
 * Ships as a transparent PNG so it sits on whichever ground the section
 * behind it uses — the paper and cream backgrounds alternate down the page,
 * and a baked-in white rectangle showed as an obvious box against cream.
 */
import Image from "next/image";

export default function Watercolour({
  className = "",
  width = 1200,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <div
      className={`pointer-events-none mx-auto select-none ${className}`}
      style={{ maxWidth: width }}
      aria-hidden
    >
      <Image
        src="/art/wc-garland.png"
        alt=""
        width={1376}
        height={768}
        sizes="(min-width: 1024px) 1200px, 90vw"
        className="h-auto w-full opacity-90"
      />
    </div>
  );
}
