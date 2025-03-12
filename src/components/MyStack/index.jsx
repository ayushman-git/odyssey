"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// Import components
import SkillTree from "./components/SkillTree";

// Import data
import { skillTreeData } from "./data/skillTreeData";

export default function MyStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [consoleText] = useState("> Visualizing skill relationships...");

  // Parallax effect for background
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      className="flex flex-col items-center w-full min-h-screen py-12" // Reduced vertical padding
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Console-style header */}
      <motion.div
        className="mb-6 font-mono text-sm md:text-base text-blue-400" // Reduced bottom margin
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-1 text-center text-white"> {/* Reduced margin */}
          My Toolkit
        </h2>
        <p className="text-center text-gray-400 mb-6 max-w-2xl mx-auto"> {/* Reduced margin */}
          The technologies and frameworks I've mastered throughout my journey as a developer, organized by relationship.
        </p>
      </motion.div>

      {/* Tree View */}
      <motion.div
        className="w-full px-2 md:px-4 relative" // Reduced horizontal padding
        style={{ y: yBg }}
      >
        {/* Glassmorphic panel background for tree view */}
        <motion.div
          className="absolute inset-0 backdrop-blur-lg rounded-2xl shadow-xl shadow-blue-500/5" // Smaller radius
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)",
          }}
        />

        <div className="relative">
          <div>
            <SkillTree data={skillTreeData} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
