"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { scrollToSectionWithId } from "@/utils/index.js";

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function HomeContent({ meowScriptClassName }) {
  const handleResumeClick = () => {
    window.open("/ayushman_resume.pdf", "_blank");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col h-[80vh] justify-center">
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gray-400 font-medium mb-4"
          >
            Hello, I'm
          </motion.p>
          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
          >
            Full-Stack Engineer
          </motion.h1>
          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gray-300 text-xl md:text-2xl max-w-2xl mb-10 md:leading-relaxed"
          >
            Crafting elegant frontends, architecting robust backends, and
            building exceptional digital experiences that solve real problems.
          </motion.p>

          <div className="flex flex-wrap gap-6 mb-12">
            <motion.button
              custom={0.3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="group relative bg-white border border-white py-3 px-8 rounded-md hover:bg-transparent transition-all duration-300"
              onClick={() => scrollToSectionWithId("projects")}
            >
              <span className="flex items-center font-medium text-black group-hover:text-white transition-colors duration-300">
                <span>View My Work</span>
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.button>

            <motion.button
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="group relative bg-transparent border border-gray-600 py-3 px-8 rounded-md hover:border-white transition-colors duration-300"
              onClick={handleResumeClick}
            >
              <span className="flex items-center text-white font-medium">
                <span>Resume</span>
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-y-[-1px] group-hover:translate-x-[1px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </>
  );
}
