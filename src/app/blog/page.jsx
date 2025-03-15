import { getArticles } from "@/lib/posts";
import BlogLayout from "@/components/BlogLayout";

export const revalidate = 3600; // Revalidate this page every hour

export default async function BlogPage() {
  // Fetch articles with server component
  const articles = getArticles();
  
  // Pass pre-fetched articles to client component
  return <BlogLayout initialArticles={articles} />;
}
