'use client';

import { useEffect, useRef, useState } from 'react';
import ImagePreviewModal from './ImagePreviewModal';

export default function MDXImageWrapper({ children }) {
  const containerRef = useRef(null);
  const [modalState, setModalState] = useState({ isOpen: false, src: '', alt: '' });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleImageClick = (event) => {
      if (event.target.tagName === 'IMG') {
        setModalState({
          isOpen: true,
          src: event.target.src,
          alt: event.target.alt || 'Image preview'
        });
      }
    };

    const addClickHandlers = () => {
      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        // Add visual feedback
        img.style.cursor = 'pointer';
        img.style.transition = 'transform 0.2s ease';

        // Add hover effects
        const handleMouseEnter = () => {
          img.style.transform = 'scale(1.02)';
        };

        const handleMouseLeave = () => {
          img.style.transform = 'scale(1)';
        };

        img.addEventListener('mouseenter', handleMouseEnter);
        img.addEventListener('mouseleave', handleMouseLeave);

        // Store event listeners for cleanup
        img._hoverHandlers = { handleMouseEnter, handleMouseLeave };
      });
    };

    // Add click handler to container
    container.addEventListener('click', handleImageClick);

    // Add hover effects to existing images
    addClickHandlers();

    // Observe for new images being added (for dynamic content)
    const observer = new MutationObserver(() => {
      addClickHandlers();
    });

    observer.observe(container, {
      childList: true,
      subtree: true
    });

    return () => {
      container.removeEventListener('click', handleImageClick);

      // Clean up hover handlers
      const images = container.querySelectorAll('img');
      images.forEach((img) => {
        if (img._hoverHandlers) {
          img.removeEventListener('mouseenter', img._hoverHandlers.handleMouseEnter);
          img.removeEventListener('mouseleave', img._hoverHandlers.handleMouseLeave);
          delete img._hoverHandlers;
        }
      });

      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={containerRef}>
        {children}
      </div>

      <ImagePreviewModal
        src={modalState.src}
        alt={modalState.alt}
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, src: '', alt: '' })}
      />
    </>
  );
}