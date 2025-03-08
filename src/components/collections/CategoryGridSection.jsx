'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import CollectionItem from './CollectionItem';

export default function CategoryGridSection({ category, label, items }) {
  const sectionRef = useRef(null);
  
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={sectionRef}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{label}</h2>
        <span className="text-sm text-gray-400">{items.length} items</span>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3"
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
