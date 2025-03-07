'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { collectionsData, categoryLabels } from '@/data/collectionsData';
import YearSelector from '@/components/collections/YearSelector';
import CategorySection from '@/components/collections/CategorySection';
import styles from './collections.module.css';

export default function Collections() {
  // Get the current year
  const currentYear = new Date().getFullYear().toString();
  
  // Get all unique years from the collection items, sorted in descending order
  const years = useMemo(() => {
    const allYears = new Set();
    
    Object.values(collectionsData).forEach(categoryItems => {
      categoryItems.forEach(item => {
        allYears.add(item.year);
      });
    });
    
    return [...allYears].sort((a, b) => b.localeCompare(a));
  }, []);
  
  // State for the selected year filter
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  // Filter and flatten all collections based on the selected year
  const filteredCollections = useMemo(() => {
    const flattened = [];
    
    Object.entries(collectionsData).forEach(([category, items]) => {
      const filteredItems = selectedYear === 'all' 
        ? items
        : items.filter(item => item.year === selectedYear);
      
      if (filteredItems.length > 0) {
        flattened.push({
          category,
          label: categoryLabels[category],
          items: filteredItems
        });
      }
    });
    
    return flattened;
  }, [selectedYear]);
  
  // Get total count of items for the selected year
  const totalItems = useMemo(() => {
    return filteredCollections.reduce((acc, { items }) => acc + items.length, 0);
  }, [filteredCollections]);
  
  return (
    <div className={styles.pageContainer}>
      <motion.div 
        className={styles.collectionsContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className={styles.pageTitle}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Life Collections
        </motion.h1>
        
        <motion.p 
          className={styles.pageSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          A curated archive of books, films, experiences, and memories
        </motion.p>
        
        <YearSelector 
          years={years} 
          selectedYear={selectedYear} 
          setSelectedYear={setSelectedYear} 
        />
        
        {selectedYear !== 'all' && (
          <div className={styles.yearSummary}>
            <h2 className={styles.yearHeading}>{selectedYear}</h2>
            <p className={styles.itemCount}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
          </div>
        )}
        
        {filteredCollections.length > 0 ? (
          <div className={styles.collectionsWrapper}>
            {filteredCollections.map(({ category, label, items }) => (
              <CategorySection 
                key={category}
                category={category}
                label={label}
                items={items}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            className={styles.noContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.emptyStateIcon}>📭</div>
            <p>No collections found for {selectedYear}</p>
            <button 
              className={styles.resetButton}
              onClick={() => setSelectedYear('all')}
            >
              View all collections
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
