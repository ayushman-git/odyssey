"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils";
import { Tooltip } from "@mui/material";

export default function ArticleCard({ details }) {
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
        } // Use a "#" if disabled to prevent navigation
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
          initial={{
            translateY: 80,
            opacity: 0,
          }}
          whileInView={{
            translateY: 0,
            opacity: details.disabled ? 0.7 : 1,
          }}
          viewport={{
            once: true,
            margin: "-10%",
          }}
          className={`flex cursor-pointer flex-col rounded-3xl border border-black dark:border-gray-700 overflow-hidden ${
            details.disabled ? "border-dashed cursor-default" : ""
          }`}
        >
          <div className="relative sm:h-[600px] h-[400px]">
            <Image
              src={details.cover_img}
              fill
              sizes="1200px"
              placeholder="blur"
              className="group-hover:scale-[1.02] transition-transform duration-300 ease-in-out object-cover"
              blurDataURL={BLUR_DATA_URLS.COVER_IMG}
              alt="Cover Image"
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
          <div className="flex-1 p-6">
            <h2 className="sm:text-2xl text-3xl font-semibold">
              {details.title}
            </h2>
          </div>
        </motion.article>
      </Link>
    </Tooltip>
  );
}
