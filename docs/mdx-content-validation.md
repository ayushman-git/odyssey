# MDX content validation (build-time)

Runs when Next loads `next.config.js` (including `next dev` and `next build`) via `lib/validate-mdx-content.cjs`.

## Required frontmatter

Every `src/content/*.mdx` file must define:

| Field | Rule |
|--------|------|
| `author` | Non-empty string |
| `title` | Non-empty string |
| `type` | Non-empty string (used for `/blog/<type-slug>/...` URLs) |
| `date` | Non-empty string |
| `cover_img` | Non-empty string |
| `introduction` | Non-empty string |
| `showAside` | Boolean (`true` or `false`) |

Optional: `hidden`, `disabled`, etc. (not validated except `slug` below).

## Slug rules

- The article slug is the **filename** without `.mdx`. It must be **unique** (case-insensitive).
- If `slug` appears in frontmatter, it must **match** the filename.

## Internal links

Root-relative URLs in markdown links, `href="..."`, and `src="..."` are checked:

- **Routes**: `/`, `/blog`, `/collections`, robots/sitemap/manifest paths.
- **Articles**: `/blog/<type-slug>/<article-slug>` where `<type-slug>` is the same as `convertToSlug(type)` in `@/utils/index.js` (lowercase, spaces → hyphens, non-word chars removed).
- **Files**: path must resolve to a **file** under `/public`.

External URLs (`https:`, `//`) are ignored.

## Manual check

```bash
node lib/validate-mdx-content.cjs
```
