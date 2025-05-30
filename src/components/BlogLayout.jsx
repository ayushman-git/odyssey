import ArticleSearchAndFilter from "./ArticleSearchAndFilter";
import FeaturedArticle from "./FeaturedArticle";
import dynamic from "next/dynamic";

// Dynamically import heavy components to improve initial load time
const HeroBanner = dynamic(() => import("./HeroBanner"), {
  loading: () => <div className="h-32 animate-pulse bg-gray-200 rounded mb-8"></div>
});

const CreativeGrid = dynamic(() => import("./CreativeGrid"), {
  loading: () => <div className="h-64 animate-pulse bg-gray-200 rounded mb-8"></div>
});

export default function BlogLayout({ initialArticles = [], featuredArticle = null, articleTypes = [] }) {
  return (
    <div className="flex flex-col items-center">
      {/* Centered content with max width */}
      <div className="w-full max-w-5xl px-4 sm:px-6 mx-auto">
        <HeroBanner />
        <CreativeGrid />
        
        {/* Featured article */}
        {featuredArticle && <FeaturedArticle article={featuredArticle} />}
        
        {/* Article list with search and filter */}
        <ArticleSearchAndFilter 
          initialArticles={initialArticles} 
          articleTypes={articleTypes}
        />
      </div>
    </div>
  );
}
