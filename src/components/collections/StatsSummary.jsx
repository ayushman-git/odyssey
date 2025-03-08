'use client';

import { useMemo } from 'react';

export default function StatsSummary({ collections, selectedYear }) {
  const stats = useMemo(() => {
    let totalItems = 0;
    const categoryCounts = {};
    
    Object.entries(collections).forEach(([category, items]) => {
      categoryCounts[category] = items.length;
      totalItems += items.length;
    });
    
    return {
      totalItems,
      categoryCounts
    };
  }, [collections]);
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-8 shadow-lg">
      <h3 className="text-lg font-bold mb-3">
        {selectedYear === 'all' ? 'Collection Stats' : `${selectedYear} Stats`}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div className="bg-gray-700 rounded p-3 text-center">
          <div className="text-2xl font-bold">{stats.totalItems}</div>
          <div className="text-xs text-gray-400">Total Items</div>
        </div>
        
        {Object.entries(stats.categoryCounts).map(([category, count]) => (
          count > 0 ? (
            <div key={category} className="bg-gray-700 rounded p-3 text-center">
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-xs text-gray-400">{category}</div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}
