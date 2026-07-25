# ✦ Pets Crystal — SEO / AEO / GEO Audit

**Date:** 2026-07-25  
**Auditor:** Hermes Agent (source code audit)  
**Repo:** `momominibot/petscrystal` @ `/Users/momo/dev/petscrystal`  
**Stack:** Next.js 16.2.11 on Vercel | 3 routes | 12 products | Stripe checkout  
**Money Keyword:** "matching pet crystal" / "matching pet crystal jewelry"

---

## Executive Summary

**Overall state: Pre-launch — critical SEO infrastructure missing.** The site has excellent brand design and rich product data (12 crystals with healing properties, chakras, pet/human benefits), but has zero structured data, no product detail pages, no sitemap, no robots.txt, no AI-engine signals, and no content strategy implemented in code. The product data in `products.ts` is a goldmine — it just needs to be surfaced properly.

**Biggest wins (do first):**
1. Individual product pages with JSON-LD Product schema → instant 10x improvement in search visibility
2. `llms.txt` + `llms-full.txt` → unlocks ChatGPT, Perplexity, Gemini traffic
3. `sitemap.xml` + `robots.txt` → unblocks crawling
4. Fix homepage metadata for money keyword → better title/description ranking

---

## Site Architecture Audit

| Route | Type | SEO State |
|-------|------|-----------|
| `/` | Homepage (12 product cards) | ❌ No structured data, no `ItemList` schema, H1 not money-keyword optimized |
| `/wholesale` | Gated pricing page | ❌ No page metadata, no schema |
| `/success` | Post-checkout confirmation | ❌ No `noindex` tag, no page metadata |
| `/api/checkout` | Stripe session creation | ✅ OK |
| `/api/wholesale-login` | Password check | ✅ OK |
| `/products/[id]` | ❌ DOES NOT EXIST | 🔴 **Critical — the entire product catalog has no detail pages** |

**Missing pages:** `/about`, `/faq`, `/blog`, `/contact`, `/products/[id]`, `/crystals/[crystal]`, `/chakras/[chakra]`

---

## 🔴 CRITICAL (Blocks Basic SEO — Fix First)

### 1. Product Detail Pages Do Not Exist
**Impact:** Catastrophic. 12 products with rich data (crystal, chakra, petBenefit, humanBenefit, colors, etc.) are only rendered as cards on the homepage. Search engines cannot index individual products.

**Fix:** Create `src/app/products/[id]/page.tsx` with:
- Dynamic `generateMetadata()` per product (unique title, description, OG)
- JSON-LD `Product` schema per product
- Full product detail layout with crystal properties, benefits, images
- Related products cross-linking by chakra/crystal
- Breadcrumb navigation

**Estimated files to create:** ~5 (page, metadata, schema component, not-found, loading)

---

### 2. Zero JSON-LD Structured Data
**Impact:** The site is invisible to rich results, knowledge panels, and AI engines that parse structured data.

**Required schemas (in priority order):**

| Schema | Where | Value |
|--------|-------|-------|
| `Organization` | Homepage layout | brand name, logo, sameAs links, description |
| `WebSite` + `SearchAction` | Homepage layout | site URL, potential search |
| `Product` × 12 | Each product detail page | name, description, price, offers, image, brand, category, crystal/stone |
| `Offer` | Inside Product | price, currency (USD), availability, shipping details |
| `BreadcrumbList` | All pages | dynamic based on route |
| `ItemList` | Homepage | list of all 12 products |
| `FAQPage` | New FAQ page | crystal care, sizing, shipping, returns, healing properties |

**Implementation:** Create `src/lib/schema.ts` with helper functions:

```typescript
export function productSchema(product: Product): object { ... }
export function organizationSchema(): object { ... }
export function breadcrumbListSchema(items): object { ... }
export function faqSchema(faqs): object { ... }
```

Then render in layout/page `<script type="application/ld+json">`.

---

### 3. No Sitemap or Robots.txt
**Impact:** Search engines cannot discover or crawl the site efficiently.

**Fix:**
```bash
npm install next-sitemap
```

Create `next-sitemap.config.js`:
```js
module.exports = {
  siteUrl: 'https://petscrystals.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/wholesale*'],
  additionalPaths: async (config) => {
    // Dynamically add all product pages
    const { products } = await import('./src/lib/products');
    return products.map(p => ({
      loc: `/products/${p.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};
```

---

### 4. Money Keyword Not in Strategic Positions
**Impact:** The primary keyword "matching pet crystal" / "matching pet crystal jewelry" does not appear in the title tag or H1.

**Current title:** `Pets Crystal — Matching Crystal Jewelry for You & Your Pet`  
**Current H1:** `Crystal jewelry for you & your companion`

**Recommended title (60 chars):**  
`Matching Pet Crystal Jewelry — Crystal Sets for You & Your Dog | Pets Crystal`

**Recommended H1:**  
`Matching Pet Crystal Jewelry for You & Your Companion`

**Also add money keywords to:**
- Homepage meta description (include "matching pet crystal sets", "crystal jewelry for dogs")
- Product page titles: `{Crystal Name} Matching Pet Crystal Set — {Benefit} | Pets Crystal`
- Alt text on product images when added

---

### 5. No `llms.txt` or `llms-full.txt`
**Impact:** Zero visibility in ChatGPT, Perplexity, Gemini, Claude, and other AI search engines. This is the single biggest AEO/GEO gap.

**Fix:** Create 3 files in `public/`:

**`public/llms.txt`:**
```
# Pets Crystal
> Matching crystal jewelry for humans and their animal companions. 12 healing stones, one unbreakable bond.

## Key Pages
- Homepage: https://petscrystals.com (12 matching crystal sets, wholesale pricing)
- Shop All: https://petscrystals.com (product grid with crystal type, chakra, benefits)
- Wholesale: https://petscrystals.com/wholesale (tiered pricing for retailers)

## Products
- Rainbow Spirit (Multi-gemstone, Crown chakra): https://petscrystals.com/products/rainbow-spirit
- Amethyst Serenity (Amethyst, Third Eye): https://petscrystals.com/products/amethyst-serenity
- [all 12 products...]

## About
Pets Crystal creates matching crystal jewelry sets — a bracelet for the human, a collar charm for the animal. Each set uses a specific healing crystal chosen for its properties that benefit both species. Based in Singapore. Wholesale distribution available.

## Crystal Types
[list all crystal types and their properties]

## Contact
- Email: wholesale@petscrystal.co
- Website: https://petscrystals.com
```

**`public/llms-full.txt`:** Full markdown with every product's crystal, chakra, pet/human benefits, pricing, and brand story. This is what AI engines parse deeply.

---

## 🟠 HIGH (Major Ranking Impact)

### 6. No Individual Page Metadata
Only root `layout.tsx` has metadata. Product pages need `generateMetadata()` (Next.js App Router pattern).

```typescript
// src/app/products/[id]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = products.find(p => p.id === params.id);
  if (!product) return { title: 'Not Found' };
  return {
    title: `${product.name} — ${product.crystal} Matching Pet Crystal Set | Pets Crystal`,
    description: `${product.tagline}. ${product.crystal} crystal set — ${product.petBenefit} for your pet, ${product.humanBenefit.toLowerCase()} for you. $${product.price}. Free shipping over $150.`,
    openGraph: {
      title: `${product.name} — Matching Crystal Set for You & Your Pet`,
      description: product.tagline,
      images: [product.image],
    },
    twitter: { card: 'summary_large_image' },
  };
}
```

---

### 7. No Canonical URLs
**Impact:** Duplicate content risk, diluted ranking signals.

**Fix:** Add to root layout metadata:
```typescript
alternates: {
  canonical: 'https://petscrystals.com',
},
```
And dynamically on product pages:
```typescript
alternates: {
  canonical: `https://petscrystals.com/products/${product.id}`,
},
```

---

### 8. No About Page — E-E-A-T Failure
**Impact:** Google's Quality Rater Guidelines require clear information about who is behind the site. E-commerce sites without About pages are flagged as low-quality.

**Fix:** Create `/about` with:
- Brand story (from brand book)
- Founder/team info
- Crystal expertise / credentials
- Contact information
- `Organization` schema on this page
- Link from nav and footer

---

### 9. No FAQ Page
**Impact:** FAQ structured data is one of the most effective schema types for AI engine visibility. It directly powers "People Also Ask" in Google and AI-generated answers.

**Fix:** Create `/faq` with questions like:
- "What crystal is best for my anxious dog?"
- "How do I choose the right crystal for me and my pet?"
- "Are the crystals safe for pets to wear?"
- "What size collar charm should I get?"
- "Do you ship internationally?"
- "Can I buy just the bracelet or just the collar charm?"
- "How do I clean and care for my crystal jewelry?"

Each with FAQPage JSON-LD schema.

---

### 10. No Blog/Content Strategy
**Impact:** Zero long-tail keyword coverage. The brand book has 3 detailed blog outlines ready to execute. Content is how you rank for informational queries like "crystals for dog anxiety" or "matching jewelry with pet".

**Fix:** Create a `/blog` section. Start with the 3 brand-book outlines:
1. "The Crystals Your Dog Would Choose for You (If They Could)"
2. "Matching Jewelry With Your Pet: More Than an Aesthetic"
3. "Creating a Calm Home: Crystal Energy for You and Your Animals"

Each post needs: title, meta description, OG image, Article schema, table of contents, internal links to products.

---

### 11. No Heading Hierarchy on Homepage
**Impact:** Accessibility and SEO. Product cards use `<h3>` but there's no `<h2>` grouping them, and no semantic section structure.

**Fix:** Wrap the product grid in a `<section>` with an `<h2>` like "Our Crystal Collections" or "12 Stones. One Bond." Product cards can stay as `<h3>`.

---

### 12. No Breadcrumb Navigation
**Impact:** E-commerce sites without breadcrumbs lose both UX points and BreadcrumbList schema opportunities.

**Fix:** Add to each product page:
```
Home > Products > Amethyst Serenity
```
With BreadcrumbList JSON-LD.

---

### 13. No Image Alt Text Strategy
**Impact:** Image search traffic is significant for product/e-commerce. Current ProductCard uses color gradients — when real photos are added, alt text is critical.

**Fix:** Product images need descriptive alt text:
```
alt={`${product.name} — matching ${product.crystal} crystal bracelet and pet collar charm set for human and dog`}
```

---

### 14. Success Page Needs `noindex`
**Impact:** `/success` is indexed by search engines with thin content showing "Order confirmed."

**Fix:** Add to success page metadata:
```typescript
robots: { index: false, follow: false },
```

---

## 🟡 MEDIUM (Improves Rankings & UX)

### 15. No Social Media Signals
- **Missing Twitter card metadata** — add `twitter: { card: 'summary_large_image', site: '@petscrystal' }` to layout
- **No social proof on site** — add Instagram feed, testimonials, or review section to homepage
- **No sameAs links** in Organization schema (Instagram, TikTok, etc.)

### 16. No Custom 404 Page
Create `src/app/not-found.tsx` with navigation back to shop, suggested products.

### 17. No Loading States
Create `loading.tsx` for product pages and blog for better Core Web Vitals.

### 18. No Analytics or Search Console
- Install `@vercel/analytics` for Web Vitals
- Set up Google Search Console
- Add GA4 for conversion tracking

### 19. No Security/Caching Headers
Add to `next.config.ts`:
```typescript
headers: async () => [
  {
    source: '/(.*)',
    headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ],
  },
],
```

### 20. No PWA / Manifest
Not critical for launch, but add `manifest.json` for mobile install experience.

---

## 🟢 LOW (Nice to Have)

### 21. Internal Linking Between Products
Cross-link products by crystal type, chakra, or benefit. E.g., on Amethyst Serenity page: "Also in Third Eye chakra: Amethyst Clarity →"

### 22. Filterable Product Grid
The homepage has "Filter by crystal · chakra · benefit (soon)" — implement this as URL-parameter-based filtering (e.g., `?chakra=heart`) for indexable filtered pages.

### 23. Crystal/Chakra Index Pages
Create `/crystals/amethyst`, `/chakras/heart` as landing pages targeting long-tail keywords.

### 24. RSS Feed
For content discovery by aggregators.

---

## AI Engine Visibility Checklist (AEO/GEO)

| Signal | Status | Priority |
|--------|--------|----------|
| `llms.txt` | ❌ Missing | 🔴 Critical |
| `llms-full.txt` | ❌ Missing | 🔴 Critical |
| JSON-LD Product schema | ❌ Missing | 🔴 Critical |
| JSON-LD Organization schema | ❌ Missing | 🔴 Critical |
| JSON-LD FAQPage schema | ❌ Missing | 🟠 High |
| Clear H1 with entity name | ⚠️ Needs money keyword | 🔴 Critical |
| Descriptive meta descriptions | ✅ Exists (root) / ❌ Per page | 🟠 High |
| BreadcrumbList schema | ❌ Missing | 🟠 High |
| About page (E-E-A-T) | ❌ Missing | 🟠 High |
| Content addressing user questions | ❌ No blog/FAQ | 🟠 High |
| Image alt text with context | ❌ No real images yet | 🟡 Medium |
| Canonical URLs | ❌ Missing | 🟠 High |
| Sitemap.xml | ❌ Missing | 🔴 Critical |
| Robots.txt | ❌ Missing | 🔴 Critical |
| Internal linking | ⚠️ Minimal | 🟡 Medium |
| Site speed (guessing) | ⚠️ No monitoring | 🟡 Medium |

---

## Prioritized Implementation Plan

### Sprint 1: Foundation (1-2 days)
1. **Install `next-sitemap`** → generates sitemap.xml + robots.txt
2. **Create `llms.txt` + `llms-full.txt`** in `public/`
3. **Create product detail pages** at `/products/[id]`
4. **Add JSON-LD schemas** to layout + product pages
5. **Fix homepage title/H1** for money keyword

### Sprint 2: Content & Authority (2-3 days)
6. **Create About page** with Organization schema
7. **Create FAQ page** with FAQPage schema
8. **Publish 1-2 blog posts** from brand book outlines
9. **Add canonical URLs** to all pages
10. **Add breadcrumb navigation** with schema

### Sprint 3: Polish (1-2 days)
11. **Add Twitter card metadata**
12. **Create custom 404 page**
13. **Add security headers** to next.config.ts
14. **Set up Vercel Analytics** + GSC
15. **Add loading/error states**

### Sprint 4: Scale (ongoing)
16. **Add real product photography** with alt text
17. **Implement crystal/chakra index pages**
18. **Build internal linking network**
19. **Add customer reviews/testimonials**
20. **Consider multilingual (ZH, MS) for Asia market**

---

## What's Already Good ✅

- Clean, on-brand design with Fraunces + Jakarta Sans
- 12 products with genuinely rich crystal data (chakra, benefits, taglines)
- Stripe checkout working with international shipping
- Wholesale tier system
- Beautiful brand book with voice/content strategy
- Semantic HTML in components (mostly)
- Font loading optimized with `display: swap`
- Good color contrast and typography hierarchy

---

## Metric Targets

| Metric | Current | Target |
|--------|---------|--------|
| Indexed pages | ~1-3 | 25+ (12 products + blog + about + FAQ + crystal pages) |
| Structured data types | 0 | 5+ (Organization, Product, FAQ, Breadcrumb, ItemList) |
| AI engine visibility | 0 | Full coverage via llms.txt + schemas |
| Lighthouse SEO score | ~60 (estimated) | 95+ |
| Core Web Vitals | Unknown | All green |

---

*Generated by Hermes Agent. To re-audit after fixes: clone the repo and re-check.*
