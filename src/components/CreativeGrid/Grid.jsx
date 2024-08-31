"use client";

import React from "react";
import Image from "next/image";

import { motion, useScroll, useTransform } from "framer-motion";
import { generateFloat, generateInt } from "@/utils";

function Grid({ img, gridArea, onLoadingComplete }) {
  const { scrollYProgress } = useScroll();

  // Use useTransform to map the scrollYProgress to a usable translateX value
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, generateInt(-200, 200)]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  return (
    <motion.div
      className="w-full relative h-full rounded-3xl overflow-hidden "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, translateX: generateInt(-40, 40) }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: generateFloat(0.5, 1.5) }}
      style={{
        gridArea: gridArea,
        translateX,
        opacity,
      }}
    >
      {img && (
        <Image
          onLoadingComplete={onLoadingComplete}
          src={img}
          placeholder="blur"
          alt="Cover Image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
          }}
        />
      )}
    </motion.div>
  );
}

export default Grid;
