"use client";

import { useEffect, useRef, useState } from "react";

export default function DeferredClientSection({
  id,
  className = "",
  placeholderClassName = "h-64",
  rootMargin = "300px",
  children,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <section id={id} className={className} ref={sentinelRef}>
      {isVisible ? children : <div className={placeholderClassName} aria-hidden="true" />}
    </section>
  );
}
