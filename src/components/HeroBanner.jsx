"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Meow_Script } from "next/font/google";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function HeroBanner() {
  return (
    <motion.header
      className="relative pt-14 pb-10 md:pt-20 md:pb-14 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* Top masthead rule */}
      <motion.div
        className="flex items-center gap-0 mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0, 0, 1] }}
        style={{ originX: 0 }}
      >
        <div className="h-[2px] flex-1 bg-black dark:bg-white" />
        <div className="px-5">
          <span className="text-[9px] tracking-[0.35em] font-mono text-gray-500 dark:text-gray-400 uppercase">
            Vol. I &mdash; 2025
          </span>
        </div>
        <div className="h-[2px] flex-1 bg-black dark:bg-white" />
      </motion.div>

      {/* Masthead title */}
      <div className="text-center">
        <motion.h1
          className={`${cormorant.className} font-light leading-none text-black dark:text-white select-none`}
          style={{ fontSize: "clamp(4.5rem, 17vw, 15rem)", letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0, 0, 1] }}
        >
          ODYSSEY
        </motion.h1>

        {/* Italic subtitle */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex-1 max-w-20 h-px bg-gray-300 dark:bg-gray-600" />
          <p
            className={`${cormorant.className} italic text-base md:text-lg text-gray-500 dark:text-gray-400 font-light tracking-wide`}
          >
            A Journal of Explorations
          </p>
          <div className="flex-1 max-w-20 h-px bg-gray-300 dark:bg-gray-600" />
        </motion.div>
      </div>

      {/* Bottom rule with topic tags */}
      <motion.div
        className="flex items-center gap-0 mt-7"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-3 px-5">
          {["Cosmos", "Technology", "Literature"].map((tag, i) => (
            <React.Fragment key={tag}>
              {i > 0 && (
                <span className="text-gray-300 dark:text-gray-600 text-sm">&middot;</span>
              )}
              <span className="text-[9px] tracking-[0.25em] font-mono text-gray-400 dark:text-gray-500 uppercase">
                {tag}
              </span>
            </React.Fragment>
          ))}
        </div>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </motion.div>

      {/* Byline */}
      <motion.div
        className="text-center mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <span className="text-[9px] tracking-[0.25em] font-mono text-gray-400 dark:text-gray-500 uppercase">
          Written by
        </span>{" "}
        <span
          className={`${meowScript.className} text-xl md:text-2xl text-gray-600 dark:text-gray-300`}
        >
          Ayushman
        </span>
      </motion.div>
    </motion.header>
  );
}

export default HeroBanner;
