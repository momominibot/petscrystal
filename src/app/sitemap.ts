import type { MetadataRoute } from "next";
import { birthPieces } from "@/lib/birth";
import { everydayCollars } from "@/lib/everyday";
import { products } from "@/lib/products";

const siteUrl = "https://petscrystals.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/care`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/wholesale`, changeFrequency: "monthly", priority: 0.8 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.id}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const everydayPages: MetadataRoute.Sitemap = everydayCollars.map((collar) => ({
    url: `${siteUrl}/everyday/${collar.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const birthPages: MetadataRoute.Sitemap = birthPieces.map((piece) => ({
    url: `${siteUrl}/birth/${piece.id}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...everydayPages, ...birthPages];
}
