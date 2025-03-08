'use client';

import { useState, useMemo } from 'react';
import { collectionsData, categoryLabels } from '@/data/collectionsData';
import CategoryGridSection from '@/components/collections/CategoryGridSection';
import YearSelector from '@/components/collections/YearSelector';
import YearProgress from '@/components/collections/YearProgress';
import StatsVisualization from '@/components/collections/StatsVisualization';
import CollectionInsights from '@/components/collections/CollectionInsights';
import EmptyState from '@/components/collections/EmptyState';

export default function CollectionsPage() {
  const [selectedYear, setSelectedYear] = useState('all');
  
  // Extract all unique years from the collections data
  const years = useMemo(() => {
    const allYears = new Set();
    
    Object.values(collectionsData).forEach(items => {
      items.forEach(item => {
        if (item.year) allYears.add(item.year);
      });
    });
    
    return [...allYears].sort((a, b) => b - a); // Sort years in descending order
  }, []);
  
  // Filter collections by selected year
  const filteredCollections = useMemo(() => {
    if (selectedYear === 'all') {
      return collectionsData;
    }
    
    const filtered = {};
    
    Object.entries(collectionsData).forEach(([category, items]) => {
      filtered[category] = items.filter(item => item.year === selectedYear);
    });
    
    return filtered;
  }, [selectedYear]);

  // Check if there are any items for the selected year
  const hasItems = useMemo(() => {
    return !Object.values(filteredCollections).every(items => items.length === 0);
  }, [filteredCollections]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Collections</h1>
      </div>

      {/* Year selector */}
      <YearSelector 
        years={years}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      
      {/* Only show progress, stats, and insights if there are items */}
      {hasItems ? (
        <>
          {/* Year progress */}
          <YearProgress selectedYear={selectedYear} />
          
          {/* Interactive visualization */}
          <StatsVisualization 
            collections={filteredCollections} 
            selectedYear={selectedYear} 
          />
          
          {/* Collection insights */}
          <CollectionInsights 
            collections={filteredCollections} 
            selectedYear={selectedYear} 
          />
          
          {/* Render collections in grid view */}
          {Object.entries(filteredCollections).map(([category, items]) => {
            // Only render categories that have items after filtering
            if (items.length === 0) return null;
            
            return (
              <CategoryGridSection 
                key={category}
                category={category}
                label={categoryLabels[category]}
                items={items}
              />
            );
          })}
        </>
      ) : (
        <EmptyState selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      )}
    </div>
  );
}
