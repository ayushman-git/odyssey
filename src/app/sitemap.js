import { getArticles } from "@/lib/posts";
import { convertToSlug } from "@/utils/index.js";

export default async function sitemap() {
  const baseUrl = "https://ayushman.dev";
  
  // Get all blog posts
  const articles = getArticles();
  
  // Generate entries for blog posts
  const blogEntries = articles.map((article) => ({
    url: `${baseUrl}/blog/${convertToSlug(article.type)}/${article.slug}`,
    lastModified: article.date || new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  
  // Generate entries for standard pages
  const standardPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/api/rss`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    // Add other important pages here
  ];
  
  return [...standardPages, ...blogEntries];
}
