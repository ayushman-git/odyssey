'use client';

import { useState, useEffect, useRef } from 'react';

export default function YearSelector({ years, selectedYear, setSelectedYear }) {
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Scroll the selected year into view
  useEffect(() => {
    if (timelineRef.current) {
      const selectedButton = timelineRef.current.querySelector('[data-active="true"]');
      if (selectedButton) {
        const containerRect = timelineRef.current.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();
        
        // Calculate the scroll position to center the selected button
        const scrollPosition = buttonRect.left - containerRect.left - 
          (containerRect.width / 2) + (buttonRect.width / 2) + 
          timelineRef.current.scrollLeft;
        
        timelineRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedYear]);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Drag speed multiplier
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Drag speed multiplier
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="my-8 relative pb-6">
      <div 
        className="flex overflow-x-auto scrollbar-hide cursor-grab px-[10%] relative z-10"
        ref={timelineRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <button
          className={`py-3 px-6 mx-2 border-2 rounded-full transition-all duration-250 whitespace-nowrap text-base z-20
            ${selectedYear === 'all' 
              ? 'font-semibold border-white bg-white bg-opacity-10 -translate-y-1 shadow-lg text-white' 
              : 'border-transparent bg-transparent text-gray-400 hover:text-white hover:-translate-y-0.5'}`}
          onClick={() => setSelectedYear('all')}
          data-active={selectedYear === 'all'}
        >
          All Time
        </button>
        {years.map(year => (
          <button
            key={year}
            className={`py-3 px-6 mx-2 border-2 rounded-full transition-all duration-250 whitespace-nowrap text-base z-20
              ${selectedYear === year 
                ? 'font-semibold border-white bg-white bg-opacity-10 -translate-y-1 shadow-lg text-white' 
                : 'border-transparent bg-transparent text-gray-400 hover:text-white hover:-translate-y-0.5'}`}
            onClick={() => setSelectedYear(year)}
            data-active={selectedYear === year}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-6">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 z-10"></div>
      </div>
    </div>
  );
}
