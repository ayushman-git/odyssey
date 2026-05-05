# Odyssey

Odyssey is the source for [ayushman.dev](https://ayushman.dev), a personal portfolio, writing space, and small publishing system built with Next.js. The site is not just a static portfolio: it includes MDX articles, article search and filtering, RSS generation, newsletter signup and delivery, Resend webhook handling, Supabase-backed article views and reactions, Spotify status, structured SEO metadata, and a collections section.

The project is intentionally content-first. Portfolio pages, articles, projects, collections, and interactive article demos all live in the same codebase so the site can behave like a personal website without needing a separate CMS.

## What Is In Here

- Portfolio homepage with hero, about/contact, projects, stack visualization, and footer sections.
- MDX blog system powered by files in `src/content`.
- Article listing, featured article selection, filtering, search, reading time, table of contents, progress bar, reactions, and view counts.
- Custom MDX components for richer technical writing and article-specific interactive demos.
- Collections page for books, movies, shows, games, or other personal catalog data.
- Newsletter subscription API backed by Supabase and Resend.
- Scripted article announcement emails for newsletter subscribers.
- Resend webhook route for processing bounced emails.
- RSS feed at `/api/rss`.
- SEO metadata, sitemap, robots route, Open Graph data, and schema markup.
- Netlify deployment configuration with the Next.js plugin.

## Tech Stack

- Next.js App Router
- React
- MDX through `@next/mdx` and `next-mdx-remote`
- Tailwind CSS
- Supabase for newsletter subscribers, article views, and reactions
- Resend for transactional and newsletter email
- Fuse.js for client-side article search
- Framer Motion, D3, Three.js, React Three Fiber, and XYFlow for visual and interactive pieces
- Netlify deployment with `@netlify/plugin-nextjs`

## Project Structure

```text
.
|-- src/app                  # App Router pages and API routes
|-- src/components           # Shared UI, page sections, article components, MDX components
|-- src/content              # MDX articles
|-- src/data                 # Projects, collections, site constants, uses data
|-- src/lib                  # Server helpers, email, Supabase, providers, post loading
|-- src/utils                # Metadata, reading time, search, heading extraction helpers
|-- src/assets               # Local images, SVGs, and JSON assets
|-- public                   # Public static assets
|-- scripts                  # Operational scripts
|-- lib/env-core.cjs         # Server environment validation used by app and scripts
|-- netlify.toml             # Netlify build configuration
`-- next.config.js           # Next.js and MDX configuration
```

## Routes

Primary pages:

| Route | Purpose |
| --- | --- |
| `/` | Portfolio homepage |
| `/blog` | Article index with search, filtering, and featured article |
| `/blog/[article-type]/[slug]` | Individual article page |
| `/collections` | Personal collections browser |

API routes:

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/articles` | `GET` | Returns parsed article metadata |
| `/api/rss` | `GET` | Generates the RSS feed |
| `/api/newsletter/subscribe` | `POST` | Subscribes an email and sends the welcome email |
| `/api/webhook` | `POST` | Receives Resend delivery and bounce events |
| `/api/views/[slug]` | `GET`, `POST` | Reads or increments article views |
| `/api/reactions/[slug]` | `GET`, `POST` | Reads or increments article reactions |
| `/api/spotify` | `GET` | Returns Spotify listening data when configured |

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Development builds do not require every production integration to be active, but API routes that touch Supabase or Resend need the relevant environment variables.

## Environment Variables

The documented variables live in `.env.example`.

Required for production:

```text
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_KEY=
```

Optional Spotify integration:

```text
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

Important constraints:

- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Do not expose it through `NEXT_PUBLIC_` variables or client components.
- Production builds validate the required server environment in `next.config.js` through `lib/env-core.cjs`.
- Local scripts load `.env.local` and use the same validation path where needed.

## Content Workflow

Articles are MDX files in `src/content`. The filename becomes the article slug.

Example frontmatter:

```mdx
---
author: Ayushman
title: "Building Authenticated MCP Servers"
type: Technical Guide
date: 24-09-2025
cover_img: https://example.com/cover.jpg
showAside: true
introduction: Short article summary used in listings and metadata.
---
```

Article behavior:

- `date` is parsed as `DD-MM-YYYY`.
- `type` controls the blog category and the generated article URL segment.
- `hidden: true` removes the article from public listings.
- `disabled: true` keeps the article out of active blog views.
- Reading time is calculated from the MDX content.
- Article metadata is cached in memory for one hour by `src/lib/posts.js`.

Custom MDX components are wired through `mdx-components.jsx` and the components under `src/components/mdx`.

## Newsletter

Newsletter signup is handled by `/api/newsletter/subscribe`.

The expected Supabase table is `newsletter_subscribers`. The code expects fields such as:

```text
email
source
user_agent
unsubscribed
bounced
bounced_at
bounce_reason
created_at
```

Welcome emails are generated through `src/lib/email-templates/welcome.js`.

To send an article announcement to active, non-bounced subscribers:

```bash
node scripts/send-article-to-subscribers.mjs src/content/article_slug.mdx --dry-run
node scripts/send-article-to-subscribers.mjs src/content/article_slug.mdx
```

The script reads article frontmatter, fetches active subscribers from Supabase, rate-limits sends through Resend, and supports a dry run before sending real email.

## Resend Webhooks

The webhook endpoint is:

```text
https://your-domain.com/api/webhook
```

Configure it in Resend for bounce events. The handler marks bounced subscribers in Supabase so future newsletter sends can skip them. More detail lives in `WEBHOOK_SETUP.md`.

For production, add signature verification before relying on webhook payloads as trusted input.

## Supabase Functions

Article views and reactions use Supabase RPC calls from the API routes:

```text
increment_view(p_slug)
increment_reaction(p_slug, p_reaction)
```

The routes read from:

```text
article_views
article_reactions
```

`POST` tracking is skipped outside production, so local development will read counts but will not increment them.

## Scripts

```bash
npm run dev       # Start the Next.js development server
npm run build     # Build the production app
npm run start     # Start the production server after a build
npm run lint      # Run the configured Next.js lint command
```

Operational scripts:

```bash
node scripts/send-article-to-subscribers.mjs <path-to-mdx> [--dry-run]
```

## Deployment

The repository is configured for Netlify:

- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs`

Set the production environment variables in the Netlify project settings before building. The app also includes Vercel Analytics and Speed Insights packages, but deployment configuration in this repository is Netlify-oriented.

## Maintenance Notes

- Keep article assets close to the article when they are article-specific; use `public/articles/...` for public static assets.
- Use `src/data/projects.js` for homepage project cards.
- Use `src/data/collectionsData.js` for the collections page.
- Keep server-only helpers under `src/lib` or root `lib`; avoid importing them into client components.
- Update `.env.example` whenever a new environment variable is introduced.
- If newsletter database fields change, update both the API route and `WEBHOOK_SETUP.md`.
