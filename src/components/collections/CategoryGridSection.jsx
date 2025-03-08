'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import CollectionItem from './CollectionItem';

export default function CategoryGridSection({ category, label, items }) {
  const sectionRef = useRef(null);
  
  return (
    <motion.div 
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={sectionRef}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{label}</h2>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 md:gap-4"
        layout
      >
        {items.map(item => (
          <motion.div
            key={`${category}-${item.id}`}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CollectionItem item={item} category={category} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
