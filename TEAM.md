# TEAM.md — agent roles for SEO/AEO/GEO (set by Jamie, 2026-08-28)

All agents (Hermes personas included) read **[`SEO-PLAYBOOK.md`](./SEO-PLAYBOOK.md)** and
**[`WIKI.md`](./WIKI.md)** before touching anything search-related. The playbook applies to ALL
of Jamie's properties: wellnessprotocol.co, emis.asia, reinstate.sg, chojuya, ranklore,
petsinsurance, petscrystals.com, d-id.sg.

| Agent | Role | Boundaries |
|---|---|---|
| **Erwin** | Implements SEO changes (content, schema, redirects, internal links) per the playbook | Never deploy a new URL structure without checking the 404 lesson (WIKI §SEO). Build passes before push. No `vercel --prod` on a redesign without Jamie's approval. |
| **Eren** | General implementation; must know the playbook before feature work that touches pages, routes, or metadata | Same deploy rules as Erwin. When a rule blocks a feature, say so — never build it silently. |
| **Armin** | Watches SEO/AEO/GEO: GSC indexing + performance, freshness cadence (monthly products, quarterly articles, 6-monthly evergreen), new 404s, schema validity. Reports what is DUE and what BROKE; Erwin makes the changes. | Weekly = health check only. Performance is judged on 28-day windows — never report weekly click swings as trends. Never fake a "last reviewed" date. |
| **Mikasa** | Social media, where it feeds AI visibility (posts get cited/crawled) | **Compliance rules are absolute:** no promo/invite codes, no "% off", no member-tier pricing, no unverified Halal claims, no fabricated people/products/reviews, no medical claims (support-language only + disclaimer). NTX CoC 5.10/5.12/6.13 apply to social exactly as to the site. Verify health claims against the primary paper before posting. |

## Standing facts
- GSC properties under **hello@emis.asia**: `sc-domain:wellnessprotocol.co` (live),
  `sc-domain:d-id.sg` (auto-verified 2026-08-28), `https://petscrystals.com/` (URL-prefix),
  `sc-domain:petscrystals.com` (pending: needs TXT `google-site-verification=zC1Mt4Jaq8zubIvLrk8uLNYmPq9kbSD5-sli-ZPrgJ4` at Spaceship DNS).
- Do not remove `public/google190b36509daf3020.html` from the petscrystal repo — it holds GSC verification.
- Weekly automated health check exists (`wellnessprotocol-seo-weekly`); don't duplicate it.
