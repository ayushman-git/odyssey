"use client";

import React from "react";
import { motion } from "framer-motion";

const MobileSkillView = ({ data }) => {
  // Process categories
  const categories = data.children.map(category => ({
    name: category.name,
    color: category.color,
    description: category.description,
    skills: category.children || []
  }));
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        duration: 0.6,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-lg mx-auto relative px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 space-y-6">
        {categories.map((category, categoryIndex) => (
          <motion.div 
            key={category.name}
            className="relative"
            variants={itemVariants}
          >
            {/* Compact Category Header */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono mb-2">
                <div className="h-px w-8 bg-current" />
                <span className="tracking-[0.15em] uppercase">{category.name}</span>
                <div className="h-px w-8 bg-current" />
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Skills as Chips */}
            <div className="space-y-4">
              {category.skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="group"
                  variants={itemVariants}
                >
                  {/* Skill Header */}
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-black dark:text-white tracking-wide uppercase">
                      {skill.name}
                    </h3>
                  </div>
                  
                  {/* Sub-skills as Clean Chips */}
                  {skill.children && skill.children.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skill.children.map(subSkill => (
                        <span 
                          key={subSkill.name}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          {subSkill.name}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Compact Section Divider */}
            {categoryIndex < categories.length - 1 && (
              <div className="mt-6 pt-4">
                <div className="w-16 h-px bg-gray-300 dark:bg-gray-600 mx-auto" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Smaller Corner Decorations */}
      <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-gray-200 dark:border-gray-700" />
      <div className="absolute top-4 right-4 w-4 h-4 border-r border-t border-gray-200 dark:border-gray-700" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-l border-b border-gray-200 dark:border-gray-700" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-gray-200 dark:border-gray-700" />
    </motion.div>
  );
};

export default MobileSkillView;
