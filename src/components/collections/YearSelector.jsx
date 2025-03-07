'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './YearSelector.module.css';

export default function YearSelector({ years, selectedYear, setSelectedYear }) {
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Scroll the selected year into view
  useEffect(() => {
    if (timelineRef.current) {
      const selectedButton = timelineRef.current.querySelector(`.${styles.activeYear}`);
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
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Drag speed multiplier
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={styles.yearSelectorContainer}>
      <div 
        className={styles.yearTimeline}
        ref={timelineRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <button
          className={`${styles.yearButton} ${selectedYear === 'all' ? styles.activeYear : ''}`}
          onClick={() => setSelectedYear('all')}
        >
          All Time
        </button>
        {years.map(year => (
          <button
            key={year}
            className={`${styles.yearButton} ${selectedYear === year ? styles.activeYear : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      <div className={styles.timelineDecoration}>
        <div className={styles.timelineTrack}></div>
        <div className={styles.timelineMarker}></div>
      </div>
    </div>
  );
}
