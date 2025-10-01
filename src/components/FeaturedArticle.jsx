"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils/index.js";
import { formatReadingTime } from "@/utils/readingTime";

export default function FeaturedArticle({ article }) {
  // Format date from DD-MM-YYYY to compact format (24th Sep, 25)
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    const dayNum = parseInt(day, 10);
    const dayWithSuffix = dayNum + (['st', 'nd', 'rd'][((dayNum % 10) - 1)] || 'th');
    const monthShort = date.toLocaleDateString('en-US', { month: 'short' });
    const yearShort = year.slice(-2);
    return `${dayWithSuffix} ${monthShort}, ${yearShort}`;
  };

  return (
    <motion.section
      className="max-w-6xl mx-auto px-0 md:px-8 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Section Header */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono mb-4">
          <div className="h-px w-8 bg-current" />
          <span>FEATURED ARTICLE</span>
          <div className="h-px w-8 bg-current" />
        </div>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black dark:text-white">
          LATEST EXPLORATION
        </h2>
      </motion.div>

      {/* Featured Article Card */}
      <Link 
        href={`/blog/${convertToSlug(article.type)}/${article.slug}`}
        className="block"
      >
        <motion.article
          className="border border-gray-200 dark:border-gray-700 group cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
        >
          {/* Image Section */}
          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            <Image
              src={article.cover_img}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              blurDataURL={BLUR_DATA_URLS.COVER_IMG}
              alt={article.title}
            />
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <motion.div 
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 px-4 py-2 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-2 h-2 bg-black dark:bg-white" />
                <span className="text-sm font-medium tracking-[0.1em] text-black dark:text-white uppercase">
                  {article.type}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            {/* Date and Meta */}
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-mono">{formatDate(article.date)}</span>
              {article.readingTime && (
                <>
                  <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                  <span className="font-mono">{formatReadingTime(article.readingTime)}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-black dark:text-white mb-6 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
              {article.title}
            </h3>

            {/* Introduction */}
            {article.introduction && (
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl mb-8">
                {article.introduction}
              </p>
            )}

            {/* Read More Link */}
            <div className="flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-3 text-black dark:text-white group-hover:gap-4 transition-all duration-300"
                whileHover={{ x: 4 }}
              >
                <span className="font-medium tracking-[0.1em] uppercase text-sm">
                  Continue Reading
                </span>
                <motion.div
                  className="w-12 h-px bg-current"
                  whileHover={{ width: 20 }}
                  transition={{ duration: 0.3 }}
                />
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.div>

              {/* Corner Decoration */}
              <motion.div 
                className="w-8 h-8 border-r-2 border-b-2 border-gray-200 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 45 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.section>
  );
}
