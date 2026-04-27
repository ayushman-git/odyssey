"use strict";

/**
 * Build-time validation for src/content/*.mdx
 * Required fields and link rules: docs/mdx-content-validation.md
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const CONTENT_DIR = path.join(process.cwd(), "src", "content");
const PUBLIC_DIR = path.join(process.cwd(), "public");

/** Must be present and non-empty. */
const REQUIRED_STRING_FIELDS = [
  "author",
  "title",
  "type",
  "date",
  "cover_img",
  "introduction",
];

function convertToSlug(str) {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function fmKeyLine(fileContent, key) {
  const lines = fileContent.split(/\r?\n/);
  let inFm = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "---") {
      if (!inFm) inFm = true;
      else break;
      continue;
    }
    if (inFm && new RegExp(`^${key}\\s*:`).test(line)) return i + 1;
  }
  return null;
}

function frontmatterStartLine(fileContent) {
  const lines = fileContent.split(/\r?\n/);
  const idx = lines.findIndex((l) => l.trim() === "---");
  return idx >= 0 ? idx + 1 : 1;
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function stripQueryHash(href) {
  const noHash = href.split("#")[0];
  return noHash.split("?")[0];
}

function internalPathsFromLine(line) {
  const out = [];
  const patterns = [
    /\]\((\/[^)\s]+)\)/g,
    /href="(\/[^"]+)"/g,
    /href='(\/[^']+)'/g,
    /src="(\/[^"]+)"/g,
    /src='(\/[^']+)'/g,
  ];
  for (const re of patterns) {
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(line))) out.push(stripQueryHash(m[1]));
  }
  return out;
}

function validateMdxContent() {
  const errors = [];
  let files;
  try {
    files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  } catch (e) {
    throw new Error(`MDX validation: cannot read ${CONTENT_DIR}: ${e.message}`);
  }

  const slugToFile = new Map();
  const articles = [];

  for (const file of files) {
    const errCountAtStart = errors.length;
    const fullPath = path.join(CONTENT_DIR, file);
    const rel = path.relative(process.cwd(), fullPath);
    const canonicalSlug = file.replace(/\.mdx$/i, "");
    const lower = canonicalSlug.toLowerCase();
    if (slugToFile.has(lower)) {
      errors.push(
        `${rel}:1: duplicate article slug (filename) "${canonicalSlug}" also used by ${slugToFile.get(lower)}`
      );
      continue;
    }
    slugToFile.set(lower, rel);

    let raw;
    try {
      raw = fs.readFileSync(fullPath, "utf8");
    } catch (e) {
      errors.push(`${rel}:1: ${e.message}`);
      continue;
    }

    let data;
    let content;
    try {
      const parsed = matter(raw);
      data = parsed.data;
      content = parsed.content;
    } catch (e) {
      errors.push(`${rel}:1: invalid frontmatter / MDX parse: ${e.message}`);
      continue;
    }

    const lineFor = (key) => fmKeyLine(raw, key) ?? frontmatterStartLine(raw);

    if (data.slug != null && String(data.slug) !== canonicalSlug) {
      errors.push(
        `${rel}:${lineFor("slug")}: frontmatter "slug" (${JSON.stringify(
          data.slug
        )}) must match filename "${canonicalSlug}"`
      );
    }

    for (const key of REQUIRED_STRING_FIELDS) {
      if (!isNonEmptyString(data[key])) {
        errors.push(
          `${rel}:${lineFor(key)}: frontmatter: missing or empty required field "${key}"`
        );
      }
    }

    if (typeof data.showAside !== "boolean") {
      errors.push(
        `${rel}:${lineFor("showAside")}: frontmatter: "showAside" must be a boolean (true or false)`
      );
    }

    if (errors.length > errCountAtStart) continue;

    articles.push({
      rel,
      raw,
      content,
      type: data.type,
      slug: canonicalSlug,
    });
  }

  const articleKeys = new Set();
  for (const a of articles) {
    articleKeys.add(`${convertToSlug(a.type)}/${a.slug}`);
  }

  const staticPaths = new Set([
    "/",
    "/blog",
    "/blog/",
    "/collections",
    "/collections/",
    "/robots.txt",
    "/robots.txt/",
    "/sitemap.xml",
    "/sitemap.xml/",
    "/site.webmanifest",
    "/site.webmanifest/",
  ]);

  function resolvePublicFile(strippedPath) {
    const decoded = decodeURIComponent(strippedPath.replace(/^\//, ""));
    if (!decoded || decoded.endsWith("/")) return null;
    const candidate = path.join(PUBLIC_DIR, ...decoded.split("/"));
    if (!candidate.startsWith(PUBLIC_DIR)) return null;
    return candidate;
  }

  for (const a of articles) {
    const lines = a.raw.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const paths = internalPathsFromLine(line);
      for (const p of paths) {
        if (!p.startsWith("/") || p.startsWith("//")) continue;

        const stripped = stripQueryHash(p);
        if (stripped === "" || stripped === "/") continue;

        const withSlash = stripped.endsWith("/") ? stripped : `${stripped}/`;
        const noSlash = stripped.endsWith("/") ? stripped.slice(0, -1) : stripped;

        if (staticPaths.has(stripped) || staticPaths.has(withSlash) || staticPaths.has(noSlash)) {
          continue;
        }

        const blog = /^\/blog\/([^/]+)\/([^/]+)\/?$/.exec(noSlash);
        if (blog) {
          const key = `${blog[1]}/${blog[2]}`;
          if (articleKeys.has(key)) continue;
          errors.push(
            `${a.rel}:${i + 1}: broken internal link "${p}" (no article with type slug + file slug "${key}")`
          );
          continue;
        }

        if (noSlash === "/blog" || noSlash === "/collections") continue;

        const onDisk = resolvePublicFile(noSlash);
        if (onDisk) {
          try {
            if (fs.existsSync(onDisk) && fs.statSync(onDisk).isFile()) continue;
          } catch {
            // fall through
          }
        }

        errors.push(
          `${a.rel}:${i + 1}: broken internal link "${p}" (not a known route or file under /public)`
        );
      }
    }
  }

  if (errors.length) {
    throw new Error("MDX content validation failed:\n\n" + errors.join("\n"));
  }
}

module.exports = { validateMdxContent };

if (require.main === module) {
  validateMdxContent();
  console.log("MDX content OK:", CONTENT_DIR);
}
