# ADR 0001: Caching, revalidation, and CDN behavior (Odyssey)

- **Status:** Accepted
- **Date:** 2026-04-27
- **Context:** The app mixes static/ISR pages, client-only pages, and dynamic API routes. We need a single place that describes how content stays fresh, what TTLs apply, and where configuration is easy to misread.

## Decision

We document the **intended** model below. HTTP `Cache-Control` (and Vercel-specific CDN headers) are the **authoritative** levers for edge caching of `GET` **Route Handlers**. Next.js **segment config** (`revalidate`, `dynamic`, `fetchCache`) applies to **RSC / pages** and to how the framework schedules work; for Route Handlers, `revalidate` does **not** replace explicit response headers. Where segment options conflict, we treat **response headers and runtime behavior** as the source of truth and align or fix code in follow-up work.

## Caching model (summary)

| Layer | Role |
|--------|------|
| **Vercel Edge / browser** | Honors `Cache-Control`, `CDN-Cache-Control`, `Vercel-CDN-Cache-Control` on API responses. |
| **Next.js static / ISR (pages)** | `export const revalidate = N` (seconds) for pages that are statically generated or ISR. |
| **Client-only pages** | No RSC data cache; assets via Next static pipeline. |
| **Dynamic server routes** | Execute per request (or when the platform allows deduplication); must set headers explicitly to cache. |

**Blog content** (`@/lib/posts` / MDX) is file-backed. The **blog index** uses ISR (1h). Individual article routes rely on the default `dynamicParams` behavior for new slugs; prebuilt paths are static. Staleness of the **list** and **feed** is bounded by the TTLs in the table below unless you add on-demand revalidation.

## Route and API inventory (intended behavior)

| Route | `revalidate` | `dynamic` / `fetchCache` | TTL / cache notes |
|-------|----------------|----------------------------|-------------------|
| `/` (`src/app/page.jsx`) | — | Client component root (no segment exports) | Static shell; client-loaded chunks. No server data cache. |
| `/blog` | `3600` | `force-static`, `fetchCache: 'force-cache'` | ISR **1h**: blog list can lag new posts by up to 1h unless you revalidate or redeploy. |
| `/blog/[article-type]/[slug]` | *(none)* | Default (static params + `generateStaticParams`) | Prebuilt posts are static. New slugs: generated on first request if not in the build. |
| `/blog/[article-type]` (`route.js`) | — | Default dynamic | Search API: `GET` only; no `Cache-Control` (dynamic, typically uncached at CDN). |
| `/collections` | — | Client page | No server cache. |
| `GET /api/articles` | — | Default (dynamic route handler) | **Intended:** `public, s-maxage=3600, stale-while-revalidate=7200` (aligned with blog list / RSS). |
| `GET /api/rss` | `3600` | `force-dynamic` | **Runtime** is dynamic; **edge** caches ~**1h** via response headers; `stale-while-revalidate=7200`. ETag is content-derived (see implementation). `Last-Modified` still reflects “now” on each build of the handler—consider aligning to latest article in a follow-up. |
| `GET /api/spotify` | `1800` | `force-dynamic` | **Runtime** dynamic; **edge** caches **30m** via `Cache-Control`. Segment `revalidate` is redundant with `force-dynamic` for handler scheduling—**CDN TTL is the real control.** |
| `GET/POST /api/views/[slug]` | — | Default | **Should not** be publicly cached: dynamic counts; set explicit `private, no-store` in a follow-up if needed. |
| `GET/POST /api/reactions/[slug]` | — | Default | Same as views. |
| `POST /api/newsletter/subscribe` | — | Default | Mutation; no shared cache. |
| `POST /api/webhook` | — | Default | Mutation; no shared cache. |
| `sitemap.xml` (`src/app/sitemap.js`) | — | Default | Regenerated per request in dev; in production, treated as a dynamic special route (see Next.js docs for caching of `sitemap`). |
| `robots.txt` | — | Default | As above. |

**Global `next.config.js` headers:** Security headers only; **no** global `Cache-Control` for HTML.

## Misalignments and review findings

1. **Blog list vs `force-static` + `revalidate`**  
   `revalidate = 3600` defines ISR; `force-static` emphasizes static output. The effective story for product owners is: **list refreshes at most every hour** (and on deploy, depending on platform behavior).

2. **`force-dynamic` + `revalidate` on `/api/rss` and `/api/spotify`**  
   The handler remains **dynamic**; `revalidate` on the segment does not substitute for **HTTP cache** headers. Rely on documented `s-maxage` / `stale-while-revalidate` for edge behavior.

3. **Hot paths**  
   `/api/spotify` and `/api/rss` are the main intentionally CDN-cached GET APIs. **Views/reactions** should stay uncached for correctness.

4. **RSS `Last-Modified`**  
   Still set to “now” on each successful response; consider a follow-up to set from the latest article date for better semantics.

## Recommended tracking issues (file in your tracker)

| Title | Summary |
|--------|---------|
| **On-demand revalidation for MDX / blog** | Add `revalidatePath` / `revalidateTag` (or build hook) when content is published so the blog list and feed do not wait up to 1h. |
| **Remove or clarify redundant segment config on Spotify/RSS** | Drop redundant `revalidate` where `force-dynamic` + CDN headers fully define behavior, or document why both are kept. |
| **Explicit `Cache-Control: private, no-store` on views and reactions** | Prevents any intermediary from caching per-article JSON. |
| **RSS `Last-Modified` from content** | Derive from max article `date` instead of `new Date()`. |

## References

- [Next.js: Route segment config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config)
- [Next.js: Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
