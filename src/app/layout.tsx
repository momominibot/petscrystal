import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
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
    "Matching pet crystal sets for humans and their animal companions. 12 healing stones — amethyst, rose quartz, tiger's eye and more. Bracelet for you, charm for them. Wholesale pricing available.",
  metadataBase: new URL("https://petscrystals.com"),
  openGraph: {
    title:
      "Matching Pet Crystal Jewelry — Crystal Sets for You & Your Companion",
    description:
      "Matching crystal sets for humans and their animal companions. Healing stones, timeless design. Wholesale distributor.",
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Matching Pet Crystal Jewelry | Pets Crystal",
    description:
      "Crystal sets for you and your animal. 12 healing stones. One unbreakable bond.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body
        className={`${fraunces.variable} ${jakarta.variable} antialiased`}
      >
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
