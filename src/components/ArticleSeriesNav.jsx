"use client";

import Link from "next/link";

export default function ArticleSeriesNav({ series, currentSlug }) {
  if (!series || !series.articles || series.articles.length === 0) return null;

  const currentIndex = series.articles.findIndex((a) => a.slug === currentSlug);

  return (
    <div className="mb-12 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-gray-50 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-0.5">
            Series
          </p>
          <p className="text-[13px] font-medium text-gray-800 dark:text-gray-200 leading-none">
            {series.name}
          </p>
        </div>
        <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 tabular-nums">
          Ch.&nbsp;{currentIndex + 1}&nbsp;/&nbsp;{series.articles.length}
        </span>
      </div>

      {/* Chapter list */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800/60 bg-white dark:bg-gray-950">
        {series.articles.map((article, i) => {
          const isCurrent = article.slug === currentSlug;
          const href = `/blog/${encodeURIComponent(article.type)}/${article.slug}`;

          const inner = (
            <div className="flex items-start gap-4">
              {/* Chapter number */}
              <span
                className={`text-[10px] font-mono tabular-nums pt-0.5 w-6 flex-shrink-0 transition-colors ${
                  isCurrent
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[13px] leading-snug transition-colors ${
                    isCurrent
                      ? "font-medium text-gray-900 dark:text-gray-100"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                  }`}
                >
                  {article.title}
                </p>
                {article.chapterTitle && article.chapterTitle !== article.title && (
                  <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 mt-0.5 truncate">
                    {article.chapterTitle}
                  </p>
                )}
              </div>

              {/* Current indicator */}
              {isCurrent && (
                <div className="w-1.5 h-1.5 rounded-full bg-gray-900 dark:bg-gray-100 mt-1 flex-shrink-0" />
              )}
            </div>
          );

          return (
            <div
              key={article.slug}
              className={`px-5 py-3.5 transition-colors ${
                isCurrent
                  ? ""
                  : "hover:bg-gray-50 dark:hover:bg-gray-900/50 group"
              }`}
            >
              {isCurrent ? (
                inner
              ) : (
                <Link href={href} className="block">
                  {inner}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
