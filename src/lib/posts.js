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

// Enhanced cache with metadata
let articlesCache = null;
let cacheTimestamp = 0;
let articleTypesCache = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

// Optimized date parsing function
function parseArticleDate(dateString) {
  if (!dateString) return new Date(0);
  
  // Cache parsed dates
  if (!parseArticleDate.cache) {
    parseArticleDate.cache = new Map();
  }
  
  if (parseArticleDate.cache.has(dateString)) {
    return parseArticleDate.cache.get(dateString);
  }
  
  const date = new Date(dateString.split("-").reverse().join("-"));
  parseArticleDate.cache.set(dateString, date);
  return date;
}

// Clear cache function for development
export function clearArticlesCache() {
  articlesCache = null;
  articleTypesCache = null;
  cacheTimestamp = 0;
  if (parseArticleDate.cache) {
    parseArticleDate.cache.clear();
  }
}

export function getArticles() {
  // Check if cache is valid
  const now = Date.now();
  if (articlesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return articlesCache;
  }

  try {
    const files = fs.readdirSync(articlesDir);
    const allArticlesData = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const id = file.replace(/\.mdx$/, "");
        const fullPath = path.join(articlesDir, file);
        
        try {
          const fileContents = fs.readFileSync(fullPath, "utf8");
          const { data } = matter(fileContents);
          
          // Extract metadata with defaults
          return {
            id,
            slug: id,
            title: data.title || 'Untitled',
            type: data.type || 'article',
            date: data.date || '01-01-1970',
            disabled: Boolean(data.disabled),
            hidden: Boolean(data.hidden),
            ...data,
          };
        } catch (error) {
          console.error(`Error processing article ${file}:`, error);
          return null;
        }
      })
      .filter(Boolean) // Remove null entries from failed parsing
      .filter(post => !post.hidden) // Filter out hidden posts
      .sort((a, b) => {
        // Optimized date comparison using cached parsing
        const dateA = parseArticleDate(a.date);
        const dateB = parseArticleDate(b.date);
        return dateB - dateA; // Newest first
      });

    // Update cache
    articlesCache = allArticlesData;
    cacheTimestamp = now;

    return allArticlesData;
  } catch (error) {
    console.error('Error reading articles directory:', error);
    return [];
  }
}

// Get unique article types (cached)
export function getArticleTypes() {
  const articles = getArticles();
  
  if (!articleTypesCache) {
    articleTypesCache = ["All", ...new Set(articles.map(article => article.type))];
  }
  
  return articleTypesCache;
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
