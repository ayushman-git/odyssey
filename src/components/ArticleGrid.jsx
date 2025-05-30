// Server Component for optimized article rendering
import ArticleCardOptimized from "./ArticleCardOptimized";

export default function ArticleGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <h3 className="text-3xl font-medium text-center">No articles found</h3>
        <p className="mt-3 text-gray-600 dark:text-gray-400 text-center max-w-md">
          No articles are currently available.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-10">
      {articles.map((article) => (
        <div key={article.slug} className="h-full">
          <ArticleCardOptimized details={article} />
        </div>
      ))}
    </section>
  );
}
