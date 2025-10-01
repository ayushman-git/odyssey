'use client';

import { useEffect, useRef } from 'react';

export default function ReadProgressBar() {
  const progressRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const calculateProgress = () => {
      if (!progressRef.current) return;

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate how much of the page has been scrolled
      const totalScroll = documentHeight - windowHeight;
      const currentProgress = totalScroll > 0 ? (scrollTop / totalScroll) * 100 : 0;
      const clampedProgress = Math.min(Math.max(currentProgress, 0), 100);

      // Use transform instead of width for better performance
      progressRef.current.style.transform = `scaleX(${clampedProgress / 100})`;
    };

    const handleScroll = () => {
      // Cancel previous frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule new frame
      rafRef.current = requestAnimationFrame(calculateProgress);
    };

    // Calculate on mount
    calculateProgress();

    // Add scroll listener with passive flag
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-border/20 pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
    >
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400 origin-left will-change-transform shadow-sm"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
