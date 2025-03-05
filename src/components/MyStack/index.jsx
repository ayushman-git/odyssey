"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const tools = [
  {
    name: "React",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    description:
      "Component-based library that's the foundation of my frontend work",
  },
  {
    name: "Next.js",
    logo: "https://seeklogo.com/images/N/next-js-icon-logo-EE302D5DBD-seeklogo.com.png",
    description:
      "React framework for production with server-side rendering and routing",
  },
  {
    name: "TypeScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
    description:
      "Strongly typed programming language that builds on JavaScript",
  },
  {
    name: "Tailwind CSS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/1200px-Tailwind_CSS_Logo.svg.png",
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    name: "Framer Motion",
    logo: "https://camo.githubusercontent.com/179d66ab2b0321726c88a586c4ad38802e7113a3c98c6fd3f0156c01c98cfd14/68747470733a2f2f6672616d657263686972702e636f6d2f696d616765732f6672616d65722d6d6f74696f6e2e706e67",
    description:
      "Production-ready motion library for React that makes animations easy",
  },
  {
    name: "Figma",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    description:
      "Design tool for collaborating on interfaces before implementation",
  },
  {
    name: "VS Code",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/1200px-Visual_Studio_Code_1.35_icon.svg.png",
    description: "My code editor of choice with powerful extensions ecosystem",
  },
  {
    name: "GitHub",
    logo: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    description:
      "Version control and collaboration platform for all my projects",
  },
  {
    name: "Node.js",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png",
    description: "JavaScript runtime for building scalable backend services",
  },
];

export default function MyStack() {
  const containerRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle floating animation for card elements
  const floatingAnimation = {
    hidden: { opacity: 0 },
    visible: index => ({
      opacity: 1,
      transition: { 
        delay: index * 0.1,
        duration: 0.8
      }
    }),
  };
  
  return (
    <div className="flex flex-col items-center py-20 w-full" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <h1 className="text-5xl font-bold mb-3 text-white text-center">My Toolkit</h1>
        <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </motion.div>
      
      <div className="grid grid-cols-3 md:grid-cols-5 gap-10 w-full max-w-5xl">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            variants={floatingAnimation}
            whileHover={{ y: -8 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="flex flex-col items-center justify-start group relative"
          >
            <div className="relative">
              <div className={`absolute inset-0 rounded-full ${hoveredIndex === index ? 'bg-gradient-to-tr from-blue-500/30 to-purple-500/30 blur-xl' : ''} transition-all duration-300`}></div>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black p-3 flex items-center justify-center border border-gray-800 z-10 relative transition-all duration-300">
                <img
                  className="max-w-8 max-h-8 md:max-w-10 md:max-h-10 opacity-70 group-hover:opacity-100 transition-all"
                  src={tool.logo}
                  alt={tool.name}
                />
              </div>
            </div>
            
            <motion.h3 
              className="text-white text-sm mt-3 font-medium text-center"
            >
              {tool.name}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: hoveredIndex === index ? 1 : 0,
                height: hoveredIndex === index ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="absolute top-full pt-3 z-30 w-48"
            >
              <div className="bg-gray-900/80 backdrop-blur-md p-3 rounded-lg border border-gray-700/50 text-xs text-gray-300 shadow-xl">
                {tool.description}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-16 text-xs text-center text-gray-500 max-w-md"
      >
        These are the tools and technologies I use daily to create exceptional digital experiences.
      </motion.div>
    </div>
  );
}
