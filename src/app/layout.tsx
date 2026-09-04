import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Matching Pet Crystal Jewelry — Crystal Sets for You & Your Dog | Pets Crystal",
  description:
    "Matching pet crystal sets for humans and their animal companions. Healing stones for every spirit — amethyst, rose quartz, tiger's eye and more. Bracelet for you, charm for them. Wholesale pricing available.",
  metadataBase: new URL("https://petscrystals.com"),
  alternates: { canonical: "https://petscrystals.com" },
  openGraph: {
    title:
      "Matching Pet Crystal Jewelry — Crystal Sets for You & Your Companion",
    description:
      "Matching crystal sets for humans and their animal companions. Healing stones, timeless design. Wholesale distributor.",
    url: "https://petscrystals.com",
    siteName: "Pets Crystal",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@petscrystal",
    title: "Matching Pet Crystal Jewelry | Pets Crystal",
    description:
      "Crystal sets for you and your animal. Healing stones for every spirit. One unbreakable bond.",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Font variables must sit on <html>: Tailwind's @theme resolves
    // --font-serif at :root, so a variable scoped to <body> is invisible to it
    // and the font-family declaration silently falls back to system sans.
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <head>
        <meta name="msvalidate.01" content="925B5FF1AB585BD2B2EDF0F560407203" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
        {/* Scroll-reveal starts at opacity 0. Without JS nothing would ever
            un-hide it, so guarantee the content is visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
