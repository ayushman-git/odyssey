"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Import components
import SkillTree from "./components/SkillTree";
import MobileSkillView from "./components/MobileSkillView";

// Import data
import { skillTreeData } from "./data/skillTreeData";

export default function MyStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Parallax effect for background
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.div
      className="flex flex-col items-center w-full min-h-screen py-12 md:py-20"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Custom style for hiding scrollbars but keeping functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
      
      {/* Console-style header */}
      <motion.div
        className="mb-8 md:mb-10 font-mono text-sm md:text-base text-blue-400 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-3 text-center text-white">
          My Toolkit
        </h2>
        <p className="text-center text-gray-400 mb-6 md:mb-10 max-w-2xl mx-auto">
          The technologies and frameworks I've mastered throughout my journey as a developer.
        </p>
      </motion.div>

      {/* Conditionally render based on screen size */}
      {isMobile ? (
        <div className="w-full px-6">
          <MobileSkillView data={skillTreeData} />
        </div>
      ) : (
        <motion.div
          className="w-full px-4 md:px-6 relative"
          style={{ y: yBg }}
        >
          {/* Glassmorphic panel background for tree view */}
          <motion.div
            className="absolute inset-0 backdrop-blur-lg rounded-3xl shadow-2xl shadow-blue-500/5"
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
      )}
    </motion.div>
  );
}
