'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './CategorySection.module.css';
import CollectionItem from './CollectionItem';

export default function CategorySection({ category, label, items }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const sectionRef = useRef(null);
  
  // Only expand if we have more than 4 items
  const shouldBeExpandable = items.length > 4;
  const displayItems = isExpanded ? items : items.slice(0, 4);
  
  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  return (
    <motion.div 
      className={styles.categorySection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={sectionRef}
    >
      <div className={styles.sectionHeader}>
        <h2 className={styles.categoryTitle}>{label}</h2>
        {shouldBeExpandable && (
          <button 
            className={styles.expandButton}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Show Less' : 'View All'}
          </button>
        )}
      </div>
      
      <motion.div 
        className={styles.collectionGrid}
        layout
      >
        {displayItems.map(item => (
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
      
      {shouldBeExpandable && !isExpanded && items.length > 4 && (
        <div className={styles.categoryFooter}>
          <button 
            className={styles.showMoreButton}
            onClick={() => {
              setIsExpanded(true);
              scrollToSection();
            }}
          >
            +{items.length - 4} more {category}
          </button>
        </div>
      )}
    </motion.div>
  );
}
