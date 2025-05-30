// This file is meant to be imported only in Server Components or API routes

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Add this check to prevent client-side execution
if (typeof window !== 'undefined') {
  throw new Error(
    'posts.js should only be imported in Server Components or API routes'
  );
}

const articlesDir = path.join(process.cwd(), "src", "content");

// Cache for articles to avoid repeated file system operations
let articlesCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// Clear cache function for development
export function clearArticlesCache() {
  articlesCache = null;
  cacheTimestamp = 0;
}

export function getArticles() {
  // Check if cache is valid
  const now = Date.now();
  if (articlesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return articlesCache;
  }

  const files = fs.readdirSync(articlesDir);
  const allArticlesData = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const id = file.replace(/\.mdx$/, "");
      const fullPath = path.join(articlesDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data } = matter(fileContents);
      
      // Extract metadata
      return {
        id,
        slug: id,
        ...data,
      };
    })
    // Filter out posts with hidden: true
    .filter(post => !post.hidden)
    .sort((a, b) => {
      // Optimize date comparison
      if (!a.date || !b.date) return 0;
      
      // Convert date strings to comparable format for faster sorting
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      
      return dateB - dateA; // Newest first
    });

  // Update cache
  articlesCache = allArticlesData;
  cacheTimestamp = now;

  return allArticlesData;
}

export async function getArticle(slug) {
  const file = path.join(articlesDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(file, "utf-8");
  const parsedMatter = matter(fileContent);

  return {
    slug,
    ...parsedMatter.data,
    fileContent,
  };
}
