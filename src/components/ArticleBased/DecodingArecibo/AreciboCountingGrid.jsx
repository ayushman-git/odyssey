"use client"

import React, { useState, useEffect } from 'react';

const binaryGrid = [
  // Rows for the binary numbers from 1 to 10
  '00001001011011100000', // Row 1 (MSB)
  '00011100100101001000', // Row 2
  '00100010101010110101', // Row 3
  'XXXXXXXXXXXXXXXXXXXX', // Row 4 (Least-significant-digit marker)
  // Repeat the above rows to complete the 23 rows grid. This example has fewer for brevity.
  // Make sure you create 23 rows as per your requirement.
];

const AreciboGrid = () => {
    return "Image placeholder"
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNumber(prev => (prev + 1) % 10); // Cycle through numbers 1-10
    }, 1000); // Change every second
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="grid grid-cols-10 gap-1">
        {binaryGrid.map((row, rowIndex) =>
          row.split('').map((bit, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-5 h-5 border border-gray-400 dark:border-gray-600 ${
                colIndex === currentNumber ? 'bg-purple-500' : bit === '1' ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {bit === 'X' ? 'X' : ''}
            </div>
          ))
        )}
      </div>
      <div className="mt-4 text-lg font-semibold text-center text-gray-900 dark:text-gray-100">
        Counting: {currentNumber + 1}
      </div>
    </div>
  );
};

export default AreciboGrid;
