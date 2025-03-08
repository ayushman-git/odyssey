"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Import components
import TypedConsole from './components/TypedConsole';
import GlassmorphicPanel from './components/GlassmorphicPanel';
import StatusIndicator from './components/StatusIndicator';

// Import data
import { techTools, skills } from './data/toolsData';

export default function MyStack() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeTab, setActiveTab] = useState('tools');
  const [consoleText, setConsoleText] = useState('> Loading tech stack...');

  // Update the console text when tab changes
  useEffect(() => {
    setConsoleText(`> Displaying ${activeTab === 'tools' ? 'tools & technologies' : 'skills & strengths'}...`);
  }, [activeTab]);

  // Parallax effect for background and items
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const items = activeTab === 'tools' ? techTools : skills;
  
  // Animation variants for the grid items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <motion.div 
      className="flex flex-col items-center w-full min-h-screen py-20"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Console-style header */}
      <motion.div 
        className="mb-12 font-mono text-sm md:text-base text-blue-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <TypedConsole text={consoleText} />
      </motion.div>
      
      <GlassmorphicPanel
        yBg={yBg}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        items={items}
        hoveredItem={hoveredItem}
        setHoveredItem={setHoveredItem}
        itemVariants={itemVariants}
      />
      
      {/* Status line */}
      <StatusIndicator />
    </motion.div>
  );
}
