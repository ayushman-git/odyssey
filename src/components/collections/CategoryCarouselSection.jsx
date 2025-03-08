'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import CollectionItem from './CollectionItem';

export default function CategoryCarouselSection({ category, label, items }) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft < 
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="mb-10 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{label}</h2>
      </div>
      
      <div className="relative group">
        {canScrollLeft && (
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white w-8 h-16 flex items-center justify-center rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}
        
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          onScroll={checkScrollButtons}
        >
          {items.map(item => (
            <div
              key={`${category}-${item.id}`}
              className="flex-none mx-1 first:ml-0"
            >
              <CollectionItem item={item} category={category} />
            </div>
          ))}
        </div>
        
        {canScrollRight && (
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white w-8 h-16 flex items-center justify-center rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
