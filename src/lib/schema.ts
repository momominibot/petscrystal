import { Product } from "./products";

export function organizationSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pets Crystal",
    url: "https://petscrystals.com",
    description:
      "Matching crystal jewelry for humans and their animal companions. 12 healing stones, one unbreakable bond.",
    sameAs: [],
  };
}

export function websiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://petscrystals.com",
    name: "Pets Crystal",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://petscrystals.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: Product): object {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} — Matching Pet Crystal Set`,
    description: `${product.tagline}. ${product.crystal} crystal set for humans and pets. ${product.chakra} chakra. Pet benefit: ${product.petBenefit}. Human benefit: ${product.humanBenefit}.`,
    image: `https://petscrystals.com/products/${product.id}.jpg`,
    brand: {
      "@type": "Brand",
      name: "Pets Crystal",
    },
    category: "Matching Pet Crystal Jewelry",
    offers: {
      "@type": "Offer",
      price: product.price.toString(),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://petscrystals.com/products/${product.id}`,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: ["SG", "US", "GB", "AU", "CA", "MY", "HK", "JP", "KR"],
        },
      },
    },
  };
}

export function itemListSchema(products: Product[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        url: `https://petscrystals.com/products/${p.id}`,
        image: `https://petscrystals.com/products/${p.id}.jpg`,
      },
    })),
  };
}

export function breadcrumbListSchema(
  items: { name: string; url: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
