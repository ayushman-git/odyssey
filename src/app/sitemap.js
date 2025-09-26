import { getArticles } from "@/lib/posts";
import { convertToSlug } from "@/utils/index.js";

// Helper function to convert DD-MM-YYYY to ISO date
function convertDateToISO(dateString) {
  if (!dateString) return new Date().toISOString().split('.')[0] + 'Z';
  
  try {
    // Convert DD-MM-YYYY to YYYY-MM-DD
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toISOString().split('.')[0] + 'Z';
  } catch (error) {
    console.error('Error parsing date:', dateString, error);
    return new Date().toISOString().split('.')[0] + 'Z';
  }
}

export default async function sitemap() {
  const baseUrl = "https://ayushman.dev";
  
  // Get all blog posts
  const articles = getArticles();
  
  // Generate entries for blog posts
  const blogEntries = articles.map((article) => ({
    url: `${baseUrl}/blog/${convertToSlug(article.type)}/${article.slug}`,
    lastModified: convertDateToISO(article.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));
  
  // Generate entries for standard pages
  const standardPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split('.')[0] + 'Z',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString().split('.')[0] + 'Z',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/api/rss`,
      lastModified: new Date().toISOString().split('.')[0] + 'Z',
      changeFrequency: 'daily',
      priority: 0.7,
    },
    // Add other important pages here
  ];
  
  return [...standardPages, ...blogEntries];
}
