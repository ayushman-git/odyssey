"use client";

import { motion } from 'framer-motion';

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
      transition: { staggerChildren: 0.05 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="w-full max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 gap-6">
        {categories.map((category) => (
          <motion.div 
            key={category.name}
            className="bg-gray-900/20 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-lg"
            variants={itemVariants}
          >
            {/* Card Header - More subtle background */}
            <div 
              className="px-5 py-4 flex items-center" 
              style={{ backgroundColor: `${category.color}10` }} // Reduced opacity to 10%
            >
              <div 
                className="w-1.5 h-12 rounded-full mr-4" 
                style={{ backgroundColor: `${category.color}90` }} // More translucent color bar
              />
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {category.name}
                  <span 
                    className="ml-2 inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></span>
                </h3>
                <p className="text-xs text-gray-400">
                  {category.description}
                </p>
              </div>
            </div>
            
            {/* Main Skills - More subtle styling and increased spacing */}
            <div className="p-4 grid grid-cols-2 gap-3">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-gray-800/20 px-4 py-3 rounded border-l border-gray-700" // Thinner border
                  style={{ borderLeftColor: `${skill.color || category.color}60` }} // More subtle border color
                >
                  <p className="text-sm font-medium text-white mb-1.5">
                    {skill.name}
                  </p>
                  
                  {/* Sub-skills with more subtle styling and better spacing */}
                  {skill.children && skill.children.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {skill.children.map(subSkill => (
                        <span 
                          key={subSkill.name}
                          className="text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap bg-gray-800/40"
                          style={{ 
                            color: `${subSkill.labelColor || skill.color || category.color}CC` // More subtle text color
                          }}
                        >
                          {subSkill.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileSkillView;
