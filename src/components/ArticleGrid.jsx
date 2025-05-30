// Server Component for optimized article rendering
import ArticleCardOptimized from "./ArticleCardOptimized";

export default function ArticleGrid({ articles }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="text-center">
          <h3 className="text-2xl font-light text-black mb-4 tracking-wide">No Articles Found</h3>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-md font-light">
            No articles are currently available in this selection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 pb-16">
      {articles.map((article) => (
        <div key={article.slug} className="h-full">
          <ArticleCardOptimized details={article} />
        </div>
      ))}
    </section>
  );
}
