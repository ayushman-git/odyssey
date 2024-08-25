"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function HeroBanner() {
  const { scrollYProgress } = useScroll();

  // Use useTransform to map the scrollYProgress to a usable translateX value
  const odysseyX = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const createdX = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const descX = useTransform(scrollYProgress, [0, 1], [0, 1000]);

  const opacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <motion.div
      className="flex sm:flex-row flex-col my-24 gap-4"
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="flex-1 gap-4">
        <motion.h1
          className="text-7xl font-bold sm:mb-4 mb-2"
          style={{ translateX: odysseyX, opacity }}
        >
          Odyssey.
        </motion.h1>
        <motion.h2
          className="text-2xl font-normal"
          style={{ translateX: createdX, opacity }}
        >
          Created by Ayushman
        </motion.h2>
      </section>
      <aside className="flex-1">
        <motion.h3
          className="font-medium text-lg dark:text-gray-300"
          style={{ translateX: descX, opacity }}
        >
          Odyssey is a blog exploring the cosmos, tech insights, and thoughtful
          book reviews, where curiosity meets creativity. Dive into diverse
          perspectives!
        </motion.h3>
      </aside>
    </motion.div>
  );
}

export default HeroBanner;
