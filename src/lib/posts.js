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

export function getArticles() {
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
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

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
