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
            duration: 0.5,
          }}
          whileHover={{
            scale: details.disabled ? 1.0 : 1.01,
            filter: "brightness(1.05) contrast(1.1)",
          }}
          className={`flex h-full cursor-pointer flex-col rounded-3xl border border-black dark:border-gray-700 overflow-hidden ${
            details.disabled ? "border-dashed cursor-default" : ""
          }`}
        >
          <div className="relative h-[220px]">
            <Image
              src={details.cover_img}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              className="object-cover"
              blurDataURL={BLUR_DATA_URLS.COVER_IMG}
              alt={details.title}
            />
            <div className="absolute top-4 left-4 flex items-center">
              <h3
                className={`rounded-xl backdrop-blur-lg text-sm tracking-wide font-medium text-gray-200 px-4 py-2 ${
                  details.disabled ? "rounded-r-none" : ""
                }`}
                style={{
                  background: "rgba(0, 0, 0, 0.4)",
                }}
              >
                {details.type}
              </h3>
              {details.disabled && (
                <h3
                  style={{
                    background: "linear-gradient(90deg, rgba(255, 255, 255, 0.596) 0%, #ebebeb 40%)",
                  }}
                  className="rounded-r-xl backdrop-blur-lg text-sm tracking-wide font-medium text-gray-900 px-4 py-2"
                >
                  Coming soon
                </h3>
              )}
            </div>
          </div>
          <div className="flex-1 p-6 flex flex-col">
            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-between mb-2">
              <span>{formatDate(details.date)}</span>
              {details.author && <span>By {details.author}</span>}
            </div>
            
            <h2 className="text-xl font-semibold mb-3">{details.title}</h2>
            
            {details.introduction && (
              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                {details.introduction}
              </p>
            )}
            
            <div className="mt-auto pt-4">
              <span className="text-sm font-medium inline-flex items-center">
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
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
