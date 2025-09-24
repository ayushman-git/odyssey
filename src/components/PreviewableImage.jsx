'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImagePreviewModal from './ImagePreviewModal';

export default function PreviewableImage({ src, alt, style, ...props }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Use regular img tag to maintain compatibility with MDX */}
      <img
        src={src}
        alt={alt}
        style={{
          ...style,
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        {...props}
        className={`hover:scale-[1.02] ${props.className || ''}`}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        aria-label={`Click to preview: ${alt}`}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.02)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      />

      <ImagePreviewModal
        src={src}
        alt={alt}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}