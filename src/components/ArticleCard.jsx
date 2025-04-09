"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils";
import { Tooltip } from "@mui/material";

export default function ArticleCard({ details }) {
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
    <Tooltip
      title={
        details.disabled ? (
          <div className="text-center">
            <p>In the Works</p>
          </div>
        ) : (
          ""
        )
      }
      followCursor
    >
      <Link
        href={
          details.disabled
            ? "#"
            : `/blog/${convertToSlug(details.type)}/${details.slug}`
        }
        className={`${
          details.disabled ? "pointer-events-none text-gray-500" : ""
        }`}
        aria-disabled={details.disabled}
        style={details.disabled ? { pointerEvents: "none", color: "gray" } : {}}
      >
        <motion.article
          transition={{
            duration: 0.4,
            ease: "easeOut"
          }}
          whileHover={{
            scale: details.disabled ? 1.0 : 1.03,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          className={`flex h-full cursor-pointer flex-col rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 ${
            details.disabled ? "border-dashed cursor-default opacity-80" : "shadow-sm hover:shadow-lg"
          }`}
        >
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src={details.cover_img}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              className="object-cover transition-all duration-500 hover:scale-105"
              blurDataURL={BLUR_DATA_URLS.COVER_IMG}
              alt={details.title}
            />
            <div className="absolute top-4 left-4 flex items-center">
              <h3
                className={`rounded-lg bg-gradient-to-r from-black/70 to-black/60 text-sm tracking-wide font-medium text-white px-3 py-1.5 ${
                  details.disabled ? "rounded-r-none" : ""
                }`}
              >
                {details.type}
              </h3>
              {details.disabled && (
                <h3
                  className="rounded-r-lg bg-amber-500/90 text-sm tracking-wide font-medium text-white px-3 py-1.5"
                >
                  Coming soon
                </h3>
              )}
            </div>
          </div>
          <div className="flex-1 p-5 flex flex-col">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              <span>{formatDate(details.date)}</span>
            </div>
            
            <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100 line-clamp-2 text-left">{details.title}</h2>
            
            {details.introduction && (
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                {details.introduction}
              </p>
            )}
            
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
              <span className="text-sm font-semibold inline-flex items-center text-blue-600 dark:text-blue-400 transition-transform group">
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </Tooltip>
  );
}
