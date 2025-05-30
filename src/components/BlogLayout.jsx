import ArticleCardList from "./ArticleCardList";
import FeaturedArticle from "./FeaturedArticle";
import HeroBanner from "./HeroBanner";
import CreativeGrid from "./CreativeGrid";

export default function BlogLayout({ initialArticles = [], featuredArticle = null }) {
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
        <ArticleCardList initialArticles={initialArticles} />
      </div>
    </div>
  );
}
