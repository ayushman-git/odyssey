import Link from "next/link";
import { formatDateString } from "@/utils/index.js";

export default function SeriesBlock({ seriesGroups }) {
  if (!seriesGroups || seriesGroups.length === 0) return null;

  return (
    <section className="mb-14">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-6">
        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 flex-shrink-0">
          Series
        </p>
        <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {seriesGroups.map((group) => (
          <SeriesCard key={group.slug} group={group} />
        ))}
      </div>
    </section>
  );
}

function SeriesCard({ group }) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-colors duration-200 flex flex-col">
      {/* Series header */}
      <div className="px-5 py-4 bg-gray-50 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-1.5">
              {group.type}
            </p>
            <p className="text-[15px] font-medium text-gray-900 dark:text-gray-100 leading-snug">
              {group.name}
            </p>
          </div>
          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 flex-shrink-0 pt-0.5 tabular-nums">
            {group.articles.length}&nbsp;{group.articles.length === 1 ? "ch." : "chs."}
          </span>
        </div>
      </div>

      {/* Chapter list */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800/60 flex-1">
        {group.articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/blog/${encodeURIComponent(article.type)}/${article.slug}`}
            className="flex items-start gap-3.5 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors group"
          >
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-600 pt-0.5 flex-shrink-0 tabular-nums w-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors leading-snug">
                {article.title}
              </p>
              <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-0.5">
                {formatDateString(article.date)}
              </p>
            </div>
            <svg
              className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
