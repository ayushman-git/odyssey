"use client";

import { motion } from 'framer-motion';

const SkillCard = ({ item, index, isHovered, setHoveredItem, activeTab, itemVariants }) => {
  return (
    <motion.div
      key={item.name}
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.05, 
        zIndex: 5,
        backgroundColor: 'rgba(59, 130, 246, 0.1)'
      }}
      onHoverStart={() => setHoveredItem(item.name)}
      onHoverEnd={() => setHoveredItem(null)}
      className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-800/30 bg-gray-900/20 backdrop-blur-md transition-all duration-300"
      style={{ height: '140px' }} // Fixed height to prevent layout shift
    >
      <div className="relative w-12 h-12 mb-3 flex items-center justify-center">
        <motion.div 
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${
            activeTab === 'tools' ? 'from-blue-500/30 to-cyan-500/30' : 'from-purple-500/30 to-pink-500/30'
          }`}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
          style={{ filter: 'blur(8px)' }}
        />
        <img
          src={item.logo}
          alt={item.name}
          className="w-8 h-8 object-contain relative z-10"
        />
      </div>
      
      <div className="text-center flex flex-col items-center h-16"> {/* Fixed height container */}
        <motion.p 
          className="text-xs font-mono text-white opacity-80 mb-1"
          animate={{ 
            y: isHovered ? -5 : 0,
            opacity: isHovered ? 1 : 0.8
          }}
        >
          {item.name}
        </motion.p>
        
        <motion.p 
          className="text-[10px] font-sans text-gray-400 min-h-[2rem]" // Minimum height
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
        >
          {item.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SkillCard;
