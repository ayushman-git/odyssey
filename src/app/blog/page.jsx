import { getArticles } from "@/lib/posts";
import BlogLayout from "@/components/BlogLayout";
import Script from "next/script";
import { generatePageMetadata } from "@/utils";

export const revalidate = 3600; // Revalidate this page every hour

// Use the utility function to generate metadata
export async function generateMetadata() {
  const articles = getArticles();
  const firstArticleImage = articles.length > 0 && articles[0].cover_img 
    ? articles[0].cover_img 
    : '/cover.jpg'; // Fallback to a default image

  return generatePageMetadata({
    title: "Blog | Ayushman Gupta",
    description: "Read articles and insights by Ayushman Gupta on web development, design, and technology.",
    image: firstArticleImage,
    url: "/blog"
  });
}

export default async function BlogPage() {
  // Fetch articles with server component
  const articles = getArticles();
  
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
      <BlogLayout initialArticles={articles} />
    </>
  );
}
