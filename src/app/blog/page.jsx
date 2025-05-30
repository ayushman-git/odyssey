import { getArticles } from "@/lib/posts";
import BlogLayout from "@/components/BlogLayout";
import Script from "next/script";
import { generatePageMetadata } from "@/utils";

export const revalidate = 3600; // Revalidate this page every hour
export const dynamic = 'force-static'; // Force static generation
export const fetchCache = 'force-cache'; // Cache all fetch requests

// Use the utility function to generate metadata
export async function generateMetadata() {
  // Use a cache key to avoid re-fetching articles
  const articles = getArticles();
  const activePosts = articles.filter((article) => !article.disabled);
  const firstArticleImage = activePosts.length > 0 && activePosts[0].cover_img 
    ? activePosts[0].cover_img 
    : '/cover.jpg'; // Fallback to a default image

  return generatePageMetadata({
    title: "Blog | Ayushman Gupta",
    description: "Read articles and insights by Ayushman Gupta on web development, design, and technology.",
    image: firstArticleImage,
    url: "/blog"
  });
}

export default async function BlogPage() {
  // Fetch articles with server component - only once
  const articles = getArticles();
  
  // Use pre-sorted articles from getArticles (already sorted by date)
  const activePosts = articles.filter((article) => !article.disabled);
  const featuredArticle = activePosts.length > 0 ? activePosts[0] : null;
  
  // Pre-compute article types on server for better performance
  const articleTypes = ["All", ...new Set(activePosts.map(article => article.type))];
  
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Ayushman Gupta's Blog",
    "description": "Articles and insights on web development, design, and technology by Ayushman Gupta",
    "url": "https://ayushman.dev/blog",
    "author": {
      "@type": "Person",
      "name": "Ayushman Gupta",
      "url": "https://ayushman.dev"
    }
  };
  
  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd)
        }}
      />
      <BlogLayout 
        initialArticles={activePosts}
        featuredArticle={featuredArticle}
        articleTypes={articleTypes}
      />
    </>
  );
}
