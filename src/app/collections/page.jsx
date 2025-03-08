'use client';

import { useState, useMemo } from 'react';
import { collectionsData, categoryLabels } from '@/data/collectionsData';
import CategoryGridSection from '@/components/collections/CategoryGridSection';
import YearSelector from '@/components/collections/YearSelector';
import YearProgress from '@/components/collections/YearProgress';
import StatsSummary from '@/components/collections/StatsSummary';

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">My Collections</h1>
      </div>

      {/* Year selector */}
      <YearSelector 
        years={years}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      
      {/* Year progress */}
      <YearProgress selectedYear={selectedYear} />
      
      {/* Stats summary */}
      <StatsSummary 
        collections={filteredCollections} 
        selectedYear={selectedYear} 
      />
      
      {/* Display message if no items for the selected year */}
      {Object.values(filteredCollections).every(items => items.length === 0) && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No items found for {selectedYear}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setSelectedYear('all')}
          >
            Show All Items
          </button>
        </div>
      )}
      
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
    </div>
  );
}
