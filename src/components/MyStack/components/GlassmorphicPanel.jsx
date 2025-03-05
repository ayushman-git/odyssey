"use client";

import { motion, AnimatePresence } from 'framer-motion';
import SkillCard from './SkillCard';
import TabSelector from './TabSelector';

const GlassmorphicPanel = ({ 
  yBg, 
  activeTab, 
  setActiveTab, 
  items, 
  hoveredItem, 
  setHoveredItem, 
  itemVariants 
}) => {
  return (
    <motion.div 
      className="w-full max-w-5xl px-6 relative"
      style={{ y: yBg }}
    >
      {/* Glassmorphic panel background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-black/90 backdrop-blur-lg rounded-3xl border border-gray-800/50 shadow-2xl shadow-blue-500/5"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.15)" }}
      />
      
      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Grid layout for items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12 px-6 relative"
          style={{ minHeight: '450px' }} // Ensure minimum height for grid container
        >
          {items.map((item, index) => (
            <SkillCard 
              key={item.name}
              item={item} 
              index={index}
              isHovered={hoveredItem === item.name}
              setHoveredItem={setHoveredItem}
              activeTab={activeTab}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default GlassmorphicPanel;
