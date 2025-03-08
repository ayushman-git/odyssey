'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { getCategoryIcon } from '@/data/collectionsData';

export default function StatsVisualization({ collections, selectedYear }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Calculate stats
  const stats = {
    totalItems: 0,
    categoryCounts: {},
    maxCount: 0
  };
  
  Object.entries(collections).forEach(([category, items]) => {
    stats.categoryCounts[category] = items.length;
    stats.totalItems += items.length;
    if (items.length > stats.maxCount) {
      stats.maxCount = items.length;
    }
  });
  
  // Use effect for particle animation in the background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Create particles
    const createParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };
    
    // Animate particles
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      
      animationRef.current = requestAnimationFrame(animateParticles);
    };
    
    // Initialize the animation
    resizeCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-black rounded-xl overflow-hidden mb-10 p-6">
      {/* Background canvas for particle animation */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Stats header */}
      <div className="relative z-10 mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          {selectedYear === 'all' ? 'Collection Universe' : `${selectedYear} Collection Universe`}
        </h2>
        <div className="bg-white bg-opacity-10 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-white font-semibold">{stats.totalItems}</span>
          <span className="text-blue-200 ml-1 text-sm">items</span>
        </div>
      </div>
      
      {/* Visualization */}
      <div className="relative z-10 flex justify-center py-8">
        <div className="relative w-full max-w-2xl">
          {/* Sun - representing the total collection */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-yellow-300 to-orange-500"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: '0 0 20px 10px rgba(255, 165, 0, 0.4)'
            }}
            transition={{ 
              type: "spring",
              duration: 1.5
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-white font-bold">
              {stats.totalItems}
            </div>
          </motion.div>
          
          {/* Planets - each category */}
          {Object.entries(stats.categoryCounts).map(([category, count], index) => {
            // Skip if no items
            if (count === 0) return null;
            
            // Calculate orbit position
            const totalCategories = Object.keys(stats.categoryCounts).filter(
              cat => stats.categoryCounts[cat] > 0
            ).length;
            const angle = (index / totalCategories) * Math.PI * 2;
            const orbitRadius = 120;
            const x = Math.cos(angle) * orbitRadius;
            const y = Math.sin(angle) * orbitRadius;
            
            // Size based on count (relative to max)
            const minSize = 30;
            const maxSize = 60;
            const size = minSize + ((count / stats.maxCount) * (maxSize - minSize));
            
            const isActive = hoveredCategory === category;
            
            return (
              <motion.div
                key={category}
                className={`absolute left-1/2 top-1/2 rounded-full flex items-center justify-center cursor-pointer
                  ${isActive ? 'z-20' : 'z-10'}
                `}
                style={{ 
                  marginLeft: x - size/2,
                  marginTop: y - size/2,
                  width: size,
                  height: size
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  boxShadow: isActive 
                    ? '0 0 20px 5px rgba(255, 255, 255, 0.3)' 
                    : '0 0 10px 2px rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 20px 5px rgba(255, 255, 255, 0.3)'
                }}
                transition={{ type: "spring", bounce: 0.4 }}
                onHoverStart={() => setHoveredCategory(category)}
                onHoverEnd={() => setHoveredCategory(null)}
              >
                <div className={`w-full h-full rounded-full flex flex-col items-center justify-center 
                  ${getCategoryColorClass(category)}`
                }>
                  <div className="text-white text-lg">{getCategoryIcon(category)}</div>
                  {isActive && (
                    <motion.div 
                      className="absolute -bottom-16 bg-white bg-opacity-10 backdrop-blur-md px-3 py-2 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-white font-medium">{category}</p>
                      <p className="text-white text-sm">{count} items</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
          
          {/* Orbit rings */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-white border-opacity-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </div>
      </div>
      
      {/* Quick stats at the bottom */}
      <div className="relative z-10 mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Object.entries(stats.categoryCounts)
          .filter(([_, count]) => count > 0)
          .slice(0, 4)
          .map(([category, count]) => (
            <motion.div
              key={category}
              className={`${getCategoryColorClass(category)} bg-opacity-20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <div className={`${getCategoryColorClass(category)} w-10 h-10 rounded-full flex items-center justify-center text-lg`}>
                {getCategoryIcon(category)}
              </div>
              <div>
                <p className="text-white text-xs capitalize">{category}</p>
                <p className="text-white text-lg font-bold">{count}</p>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
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
