"use client";

import React from "react";
import { motion } from "framer-motion";

function HeroBanner() {
  return (
    <motion.div
      className="flex sm:flex-row flex-col my-24 gap-4"
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="flex-1 gap-4">
        <h1 className="text-7xl font-bold sm:mb-4 mb-2">Odyssey.</h1>
        <h2 className="text-2xl font-normal">Created by Ayushman</h2>
      </section>
      <aside className="flex-1">
        <h3 className="font-medium text-lg dark:text-gray-300">
          Odyssey is a blog exploring the cosmos, tech insights, and thoughtful
          book reviews, where curiosity meets creativity. Dive into diverse
          perspectives!
        </h3>
      </aside>
    </motion.div>
  );
}

export default HeroBanner;
