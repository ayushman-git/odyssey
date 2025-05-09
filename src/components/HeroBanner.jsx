"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Meow_Script } from "next/font/google";

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function HeroBanner() {
  const { scrollYProgress } = useScroll();

  // Use useTransform to map the scrollYProgress to a usable translateX value
  const odysseyX = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const createdX = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const descX = useTransform(scrollYProgress, [0, 1], [0, 300]);

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
          className="text-2xl font-light decoration-black decoration-wavy"
          style={{ translateX: createdX, opacity }}
        >
          Crafted by <span className={`${meowScript.className} text-4xl`}>Ayushman</span>
        </motion.h2>
      </section>
      <aside className="flex-1">
        <motion.h3
          className="font-medium text-lg dark:text-gray-300"
          style={{ translateX: descX, opacity }}
        >
          I write about the crossroads of comos, technology and literature, sharing
          insights that provoke thought and inspire innovation.
        </motion.h3>
      </aside>
    </motion.div>
  );
}

export default HeroBanner;
