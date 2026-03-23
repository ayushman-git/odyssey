// Server Component for optimized article rendering
import ArticleCardOptimized from "./ArticleCardOptimized";

export default function ArticleGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="text-center">
          <div className="w-12 h-px bg-gray-200 dark:bg-gray-700 mx-auto mb-8" />
          <h3 className="text-xl font-light text-black dark:text-white mb-3 tracking-wide">
            No Articles Found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm font-light">
            No articles are currently available in this selection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 pb-16">
      {articles.map((article, i) => (
        <div key={article.slug} className="h-full">
          <ArticleCardOptimized details={article} index={i + 1} />
        </div>
      ))}
    </section>
  );
}
