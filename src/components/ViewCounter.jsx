"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EyeIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function useCountUp(target, duration = 900) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (target === null) return;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
}

export default function ViewCounter({ slug }) {
  const [views, setViews] = useState(null);
  const displayed = useCountUp(views);

  useEffect(() => {
    (async () => {
      try {
        await fetch(`/api/views/${slug}`, { method: "POST" });
        const res = await fetch(`/api/views/${slug}`);
        const { views } = await res.json();
        setViews(views ?? 0);
      } catch {
        // non-critical
      }
    })();
  }, [slug]);

  return (
    <AnimatePresence>
      {views != null && (
        <motion.span
          className="inline-flex items-center gap-1.5 tabular-nums"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          title={`${views.toLocaleString()} views`}
        >
          <EyeIcon />
          {displayed.toLocaleString()}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
