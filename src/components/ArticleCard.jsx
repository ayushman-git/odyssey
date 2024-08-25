"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils";

export default function ArticleCard({ details }) {
  return (
    <Link href={`/${convertToSlug(details.type)}/${details.slug}`}>
      <motion.article
        transition={{
          duration: 0.2,
        }}
        whileHover={{
          scale: 1.01,
          filter: "brightness(1.05) contrast(1.1)",
        }}
        className="flex cursor-pointer flex-col rounded-3xl border border-black dark:border-gray-700 overflow-hidden"
      >
        <div className="relative h-[600px]">
          <Image
            src={details.cover_img}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            className="group-hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            alt="Cover Image"
          />
          <div
            className="absolute top-4 left-4 rounded-xl backdrop-blur-lg"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <h3 className="sm:text-sm text-xl tracking-wide font-medium text-gray-200 px-4 py-2">
              {details.type}
            </h3>
          </div>
        </div>
        <div className="flex-1 p-6">
          <h2 className="sm:text-2xl text-3xl font-semibold">
            {details.title}
          </h2>
          {/* <footer className="flex justify-end items-center mt-2 cursor-pointer">
            <p className="text-sm">Read More</p>
            <BsArrowRight size="1.125rem" className="ml-2" />
          </footer> */}
        </div>
      </motion.article>
    </Link>
  );
}
