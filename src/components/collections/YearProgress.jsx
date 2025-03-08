'use client';

import { useState, useEffect } from 'react';

export default function YearProgress({ selectedYear }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (selectedYear === 'all') {
      setProgress(100);
      return;
    }
    
    // Calculate progress through the selected year
    const calculateYearProgress = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // If we're looking at a past year, progress is 100%
      if (parseInt(selectedYear) < currentYear) {
        return 100;
      }
      
      // If we're looking at a future year, progress is 0%
      if (parseInt(selectedYear) > currentYear) {
        return 0;
      }
      
      // For current year, calculate percentage of year completed
      const startOfYear = new Date(currentYear, 0, 1);
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59);
      
      const totalMs = endOfYear - startOfYear;
      const elapsedMs = now - startOfYear;
      
      return Math.floor((elapsedMs / totalMs) * 100);
    };
    
    setProgress(calculateYearProgress());
  }, [selectedYear]);
  
  // Don't display for "all time"
  if (selectedYear === 'all') return null;
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-1 text-xs text-gray-400">
        <span>Year {selectedYear} Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
