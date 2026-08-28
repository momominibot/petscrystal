---
name: seo-page-one
description: Evidence-based playbook to get a site fully indexed fast and climb to page 1, for any of Jamie's businesses (wellnessprotocol.co, emis.asia, reinstate.sg, chojuya, ranklore, petsinsurance, etc.). Use when asked to improve SEO/AEO/GEO, fix indexing, plan content, or audit a site's search performance. Grounded in 2026 expert consensus + lessons proven on our own properties.
---

# SEO Page-One Playbook (all businesses)

**Honest premise:** indexing can be made fast (days). Page 1 cannot be forced fast — it is earned
in weeks-to-months by stacking conditions. Anyone promising "page 1 in days" is selling. Never
promise that to Jamie; show the levers and the timeline instead.

## Phase 1 — Get everything indexed (days)
1. **GSC property + sitemap first.** Domain property, auto-verifies via DNS when the domain is on
   Vercel/Cloudflare. Submit a **dynamic** sitemap generated from the site's own data (never a
   static file — it goes stale silently).
2. **Request indexing for money pages** via GSC URL Inspection (priority crawl queue, usually
   crawled within hours-days). The Indexing API is NOT a shortcut: it needs a service-account
   owner and is officially only for job/event pages.
3. **Internal links = discovery.** Googlebot finds new pages through links from already-crawled,
   high-traffic pages. Every new page must be linked from the homepage, a hub page, or a
   top-performing post within a day of publishing. "No referring page detected" in URL Inspection
   means we failed this.
4. **Kill 404s with 301s.** Dead URL structures burn crawl budget and quality signals for months.
   Redirect legacy URLs to the closest live page in next.config/redirect rules.
   (wellnessprotocol had 501 dead URLs from one careless deploy.)
5. **Thin pages stay unindexed even when requested.** In 2026 the bar is proving quality: enrich
   the page, make it unique, strengthen links to it — or noindex/remove it.

## Phase 2 — Rank (weeks to months): stack conditions, no hacks
Priority order for small SG/MY commerce sites:
1. **Pick winnable queries from GSC data, not intuition.** Target queries already showing
   impressions at positions 4–20 (`quick_wins` in the gsc MCP). Long-tail + local intent first
   ("halal health supplement malaysia", "menopause supplement singapore"), head terms later.
2. **Topical authority beats breadth.** Dec-2025 core update evidence: focused specialists gained,
   generalists lost. Build clusters: one hub page + 4–8 supporting articles interlinked, per topic
   the business genuinely owns. Do NOT scatter one-off posts across topics.
3. **Internal linking is the free ranking lever.** Push authority from blog/hub pages into the
   category/product pages that convert. Links must be contextual, descriptive-anchor, and flow
   TOWARD money pages. Category pages are the workhorse for e-commerce.
4. **Schema completeness** so Google sees a buyable entity: Organization, WebSite, Product+Offer
   (real prices only), BreadcrumbList, FAQ where genuine. Never fake (no invented SearchAction —
   we shipped and removed one).
5. **E-E-A-T we actually have:** real author credentials (WOCN nurse), cited primary sources,
   named real founders/scientists with links, "Last reviewed" dates. This is our edge — use it.
6. **AEO/GEO:** robots.txt allowing GPTBot/CCBot/PerplexityBot/anthropic-ai, llms.txt, an
   answer-first entity page ("What is X?"), and freshness (≈50% of AI citations are <13 weeks old;
   quarterly minimum refresh, monthly for product/price pages).

## Hard rules (learned the expensive way)
- **Verify every factual/health claim against the primary source.** A search summary claimed
  "isoflavones cut hot flushes 92%"; the actual meta-analysis found NO significant effect.
- **Never fake freshness.** Update facts or leave the date alone.
- **Never deploy a new URL structure casually.** Google remembers dead ends for months.
- **No invented data**: prices, certifications (esp. Halal), reviews, schema that doesn't match the page.
- Weekly performance readings on low-traffic sites are noise. Health-check weekly; judge
  performance monthly (28-day windows).

## Per-business notes
- **wellnessprotocol.co** — GSC: `sc-domain:wellnessprotocol.co` (hello@emis.asia). Clusters:
  women's midlife health (nurse-led), halal supplements MY. Baseline 2026-08: pos 33.3, 1.4k imp/28d.
- **emis.asia** — Shopify. Strongest asset: WOCN clinical authority in wound/ostomy/continence.
  ⚠ 90 truncated metas; never fabricate HSA/CE/ISO claims. GSC already wired to gsc MCP.
- **reinstate.sg** — blog engine exists; cluster = licence reinstatement topics.
- **chojuya / petsinsurance / ranklore** — same playbook, smaller scale: GSC property, dynamic
  sitemap, one owned topic cluster each, internal links to conversion page.

## Measurement loop
Monthly per site: `site_snapshot` → `quick_wins` (positions 4–15 by impressions) → refresh/build
the ONE page with the biggest opportunity → request indexing → record in that site's wiki/memory.
