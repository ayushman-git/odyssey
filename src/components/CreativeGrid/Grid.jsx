"use client";

import React from "react";
import Image from "next/image";

import { motion, useScroll, useTransform } from "framer-motion";
import { generateFloat, generateInt } from "@/utils";

function Grid({ img, gridArea, onLoadingComplete }) {
  const { scrollYProgress } = useScroll();

  // Simplified transforms for better performance
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, generateInt(-100, 100)] // Reduced range for smoother performance
  );

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]); // Less dramatic opacity change
  
  return (
    <motion.div
      className="w-full relative h-full rounded-3xl overflow-hidden"
      whileHover={{ scale: 1.02 }} // Reduced scale for better performance
      initial={{ opacity: 0, translateX: generateInt(-20, 20) }} // Reduced initial movement
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: generateFloat(0.3, 0.8) }} // Faster transitions
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
          alt="Cover Image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy" // Add lazy loading for better performance
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            objectFit: "cover",
          }}
        />
      )}
    </motion.div>
  );
}

export default Grid;
