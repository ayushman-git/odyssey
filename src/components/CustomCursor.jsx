'use client';
import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [clientSide, setClientSide] = useState(false);
  
  // Only initialize on client side
  useEffect(() => {
    setClientSide(true);
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';
    document.body.appendChild(cursorRing);

    // Updated SVG with explicit white color
    const externalLinkIcon = document.createElement('div');
    externalLinkIcon.className = 'cursor-external-link-icon';
    externalLinkIcon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </svg>
    `;
    cursorRing.appendChild(externalLinkIcon);
    
    const moveCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorRing.style.left = e.clientX + 'px';
      cursorRing.style.top = e.clientY + 'px';
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    // Handle hover states for links and buttons
    const handleMouseOver = (e) => {
      const isProjectLink = e.target.closest('.project-card-link');
      
      if (isProjectLink) {
        cursor.classList.add('hover');
        cursorRing.classList.add('hover');
        cursorRing.classList.add('external-link-hover');
      } else if (
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' || 
        e.target.closest('a') || 
        e.target.closest('button')
      ) {
        cursor.classList.add('hover');
        cursorRing.classList.add('hover');
        cursorRing.classList.remove('external-link-hover');
      }
    };
    
    const handleMouseOut = () => {
      cursor.classList.remove('hover');
      cursorRing.classList.remove('hover');
      cursorRing.classList.remove('external-link-hover');
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (cursorRing.parentNode) cursorRing.parentNode.removeChild(cursorRing);
    };
  }, []);
  
  if (!clientSide) {
    return null;
  }
  
  return (
    <style jsx global>{`
      @media (pointer: fine) {
        body * {
          cursor: none !important;
        }
        
        .custom-cursor {
          position: fixed;
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          mix-blend-mode: difference;
          z-index: 9999;
          transition: width 0.2s, height 0.2s;
        }
        
        .custom-cursor.hover {
          width: 25px;
          height: 25px;
        }
        
        .custom-cursor-ring {
          position: fixed;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 2px solid white;
          transform: translate(-50%, -50%) scale(1);
          pointer-events: none;
          mix-blend-mode: difference;
          z-index: 9998;
          opacity: 0.85;
          transition: transform 0.3s, opacity 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .custom-cursor-ring.hover {
          transform: translate(-50%, -50%) scale(1.1);
          width: 40px;
          height: 40px;
        }
        
        .cursor-external-link-icon {
          opacity: 0;
          color: white; /* Ensuring text color is white */
          line-height: 0;
          transform: scale(0) rotate(-45deg);
          transition: transform 0.3s ease-out, opacity 0.3s ease-out;
          filter: drop-shadow(0 0 2px rgba(0,0,0,0.8));
        }
        
        .cursor-external-link-icon svg {
          color: white;
          stroke: white;
          fill: none;
        }
        
        .external-link-hover .cursor-external-link-icon {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        
        .external-link-hover {
          background-color: rgba(0,0,0,0.3);
        }
      }
    `}</style>
  );
}
