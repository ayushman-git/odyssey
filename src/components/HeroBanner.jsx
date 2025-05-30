"use client";

import React from "react";
import { motion } from "framer-motion";
import { Meow_Script } from "next/font/google";

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function HeroBanner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-8 relative z-10">
        {/* Issue Number / Date */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
            <div className="h-px w-12 bg-current" />
            <span>VOL. I — 2025</span>
            <div className="h-px w-12 bg-current" />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-light tracking-[-0.02em] leading-none">
            <span className="block text-black dark:text-white">ODYSSEY</span>
          </h1>
          
          {/* Subtitle Line */}
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="h-px w-16 bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm font-medium tracking-[0.2em] text-gray-600 dark:text-gray-400 uppercase">
              A Journal of Ideas
            </span>
            <div className="h-px w-16 bg-gray-300 dark:bg-gray-600" />
          </div>
        </motion.div>

        {/* Author & Description */}
        <motion.div 
          className="max-w-2xl mx-auto text-center space-y-8"
          variants={itemVariants}
        >
          {/* Author */}
          <div className="space-y-2">
            <p className="text-sm font-medium tracking-[0.1em] text-gray-500 dark:text-gray-400 uppercase">
              Written by
            </p>
            <p className={`${meowScript.className} text-3xl text-black dark:text-white`}>
              Ayushman
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <div className="w-24 h-px bg-gray-300 dark:bg-gray-600 mx-auto" />
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
              Exploring the intersections of <em>cosmos</em>, <em>technology</em>, and <em>literature</em> — 
              where scientific wonder meets human storytelling.
            </p>
          </div>
        </motion.div>

        {/* Bottom Navigation Hint */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          variants={itemVariants}
        >
          <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-gray-500">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-current"
            />
          </div>
        </motion.div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-gray-200 dark:border-gray-700" />
        <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-gray-200 dark:border-gray-700" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-gray-200 dark:border-gray-700" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-gray-200 dark:border-gray-700" />
      </div>
    </motion.div>
  );
}

export default HeroBanner;
