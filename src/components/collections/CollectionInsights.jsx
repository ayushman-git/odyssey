'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function CollectionInsights({ collections, selectedYear }) {
  // Calculate insights about the collection
  const insights = useMemo(() => {
    const allItems = [];
    let totalRatings = 0;
    let itemsWithRatings = 0;
    let topRatedItem = null;
    let bestCategory = { name: '', count: 0 };
    
    Object.entries(collections).forEach(([category, items]) => {
      if (items.length > bestCategory.count) {
        bestCategory = { name: category, count: items.length };
      }
      
      items.forEach(item => {
        allItems.push({...item, category});
        
        if (item.rating) {
          totalRatings += item.rating;
          itemsWithRatings++;
          
          if (!topRatedItem || item.rating > topRatedItem.rating) {
            topRatedItem = {...item, category};
          }
        }
      });
    });
    
    const averageRating = itemsWithRatings > 0 ? (totalRatings / itemsWithRatings).toFixed(1) : 0;
    
    return {
      allItems,
      averageRating,
      topRatedItem,
      bestCategory,
      totalItems: allItems.length
    };
  }, [collections]);
  
  if (insights.totalItems === 0) return null;
  
  return (
    <motion.div 
      className="mb-10 bg-gradient-to-r from-indigo-800 to-purple-900 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">
          {selectedYear === 'all' ? 'Collection Insights' : `${selectedYear} Insights`}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Rating Card */}
          {insights.averageRating > 0 && (
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-5 flex items-center">
              <div className="mr-6">
                <div className="w-16 h-16 rounded-full bg-yellow-500 bg-opacity-20 flex items-center justify-center">
                  <span className="text-yellow-400 text-2xl">★</span>
                </div>
              </div>
              <div>
                <p className="text-white text-sm opacity-80">Average Rating</p>
                <div className="flex items-baseline">
                  <p className="text-white text-3xl font-bold">{insights.averageRating}</p>
                  <p className="text-white text-sm ml-1 opacity-80">/ 5</p>
                </div>
                <p className="text-xs text-blue-200 mt-1">Based on {insights.allItems.filter(i => i.rating).length} rated items</p>
              </div>
            </div>
          )}
          
          {/* Top Rated Item Card */}
          {insights.topRatedItem && (
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-5">
              <p className="text-white text-sm opacity-80">Top Rated Item</p>
              <h4 className="text-white text-xl font-semibold truncate">{insights.topRatedItem.title}</h4>
              <div className="flex justify-between mt-2">
                <p className="text-blue-200 text-sm">{insights.topRatedItem.creator}</p>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-sm mr-1">★</span>
                  <span className="text-white">{insights.topRatedItem.rating}</span>
                </div>
              </div>
              <p className="text-white text-xs opacity-70 mt-2">
                {insights.topRatedItem.category.charAt(0).toUpperCase() + insights.topRatedItem.category.slice(1)}
              </p>
            </div>
          )}
          
          {/* Distribution Card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-5 md:col-span-2">
            <p className="text-white text-sm opacity-80 mb-3">Collection Breakdown</p>
            <div className="space-y-3">
              {Object.entries(collections)
                .filter(([_, items]) => items.length > 0)
                .sort(([_, itemsA], [__, itemsB]) => itemsB.length - itemsA.length)
                .map(([category, items]) => {
                  const percentage = Math.round((items.length / insights.totalItems) * 100);
                  return (
                    <div key={category} className="relative">
                      <div className="flex justify-between text-xs text-white mb-1">
                        <span className="capitalize">{category}</span>
                        <span>{percentage}% ({items.length})</span>
                      </div>
                      <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${getCategoryColorClass(category)}`}
                          initial={{ width: '0%' }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Helper function to get appropriate background color based on category
function getCategoryColorClass(category) {
  switch(category) {
    case 'books': return 'bg-blue-600';
    case 'movies': return 'bg-red-600';
    case 'shows': return 'bg-purple-600';
    case 'anime': return 'bg-orange-600';
    case 'experiences': return 'bg-green-600';
    case 'travel': return 'bg-teal-600';
    default: return 'bg-gray-600';
  }
}
