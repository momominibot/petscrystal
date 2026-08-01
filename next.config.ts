import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      // Files under /public are served with max-age=0, so without this the
      // hero film is re-fetched on every visit to the homepage — the page
      // with the most traffic on the site. The name is versioned, so a long
      // immutable cache is safe: a new cut ships as hero-v2.*, not as a
      // replacement for this one.
      {
        source: "/video/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
