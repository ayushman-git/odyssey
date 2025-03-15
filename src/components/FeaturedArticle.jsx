"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils";

export default function FeaturedArticle({ article }) {
  // Format date from DD-MM-YYYY to Month DD, YYYY
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  return (
    <Link 
      href={`/blog/${convertToSlug(article.type)}/${article.slug}`}
      className="block"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden border border-black dark:border-gray-700 mb-16"
      >
        <div className="relative h-[500px] md:h-[600px] w-full">
          <Image
            src={article.cover_img}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            alt={article.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
          <div className="inline-block bg-white/90 dark:bg-gray-900/90 text-black dark:text-white rounded-full px-4 py-1 text-sm font-medium mb-4">
            Featured {article.type}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {article.title}
          </h1>
          
          {article.introduction && (
            <p className="text-lg md:text-xl text-gray-100 max-w-3xl mb-6 line-clamp-3">
              {article.introduction}
            </p>
          )}
          
          <div className="flex items-center text-sm text-gray-200 mt-4">
            <span>{formatDate(article.date)}</span>
            <span className="mx-2">•</span>
            {article.author && <span>By {article.author}</span>}
            <span className="ml-auto font-medium flex items-center">
              Read article
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
