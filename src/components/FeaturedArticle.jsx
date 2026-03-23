"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils/index.js";
import { formatReadingTime } from "@/utils/readingTime";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  const dayNum = parseInt(day, 10);
  const dayWithSuffix =
    dayNum + (["st", "nd", "rd"][((dayNum % 10) - 1)] || "th");
  const monthShort = date.toLocaleDateString("en-US", { month: "short" });
  const yearShort = year.slice(-2);
  return `${dayWithSuffix} ${monthShort}, ${yearShort}`;
};

export default function FeaturedArticle({ article }) {
  return (
    <motion.section
      className="py-6 md:py-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Link
        href={`/blog/${convertToSlug(article.type)}/${article.slug}`}
        className="block group"
      >
        <motion.article
          className="grid md:grid-cols-2 border border-gray-200 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {/* Left: Content */}
          <div className="relative p-8 md:p-10 lg:p-14 flex flex-col justify-between order-2 md:order-1 min-h-[280px]">
            <div>
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2 mb-6 text-[10px] font-mono tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400">
                <span>{article.type}</span>
                <span className="text-gray-300 dark:text-gray-600">&middot;</span>
                <span>{formatDate(article.date)}</span>
                {article.readingTime && (
                  <>
                    <span className="text-gray-300 dark:text-gray-600">&middot;</span>
                    <span>{formatReadingTime(article.readingTime)}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2
                className={`${cormorant.className} text-3xl md:text-4xl lg:text-5xl font-light leading-[1.08] text-black dark:text-white mb-5 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300`}
              >
                {article.title}
              </h2>

              {/* Introduction */}
              {article.introduction && (
                <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400 font-light line-clamp-3">
                  {article.introduction}
                </p>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3 mt-8 text-[10px] font-mono tracking-[0.18em] uppercase text-black dark:text-white">
              <span>Read article</span>
              <div className="h-px w-8 bg-current group-hover:w-14 transition-all duration-300" />
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative overflow-hidden border-b md:border-b-0 md:border-l border-gray-200 dark:border-gray-700 order-1 md:order-2">
            <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
              <Image
                src={article.cover_img}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                blurDataURL={BLUR_DATA_URLS.COVER_IMG}
                alt={article.title}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.section>
  );
}
