"use client";

import { useState, useEffect } from "react";
import ArticleCardList from "./ArticleCardList";
import FeaturedArticle from "./FeaturedArticle";
import HeroBanner from "./HeroBanner"; // Assuming you have this component
import CreativeGrid from "./CreativeGrid";

export default function BlogLayout({ initialArticles = [] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(initialArticles.length === 0);

  useEffect(() => {
    // If articles were passed as props, use them
    if (initialArticles.length > 0) {
      setArticles(initialArticles);
      const activePosts = initialArticles.filter(
        (article) => !article.disabled
      );
      if (activePosts.length > 0) {
        setFeaturedArticle(activePosts[0]);
      }
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();

        setArticles(data);

        // Select most recent non-disabled article as featured
        const activePosts = data.filter((article) => !article.disabled);
        if (activePosts.length > 0) {
          setFeaturedArticle(activePosts[0]);
        }
      } catch (error) {
        console.error("Error loading articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [initialArticles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading blog content...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Centered content with max width */}
      <div className="w-full max-w-5xl px-4 sm:px-6 mx-auto">
        <HeroBanner />
        {/* Creative Grid if needed */}
        <CreativeGrid />
        
        {/* Featured article */}
        {featuredArticle && <FeaturedArticle article={featuredArticle} />}
        
        {/* Article list */}
        <ArticleCardList initialArticles={articles} />
      </div>
    </div>
  );
}
