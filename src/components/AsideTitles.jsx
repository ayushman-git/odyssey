"use client";

import { underscoreDelimiter } from "@/utils";
import { Fragment, useEffect, useState, useRef } from "react";

export default function AsideTitles({ headings }) {
  const [currentSectionInView, setCurrentSectionInView] = useState(null);
  const [isTableOfContentVisible, setIsTableOfContentVisible] = useState(true);
  const itemRefs = useRef(new Map());

  const handleIntersection = (entries, observer, id) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setCurrentSectionInView(id);
      }
    });
  };

  const handleTableOfContentVisibility = (entries) => {
    entries.forEach((entry) => {
      // Show if at least 50% is visible (less strict visibility check)
      setIsTableOfContentVisible(entry.intersectionRatio > 0.5);
    });
  };

  useEffect(() => {
    spawnIntersectionObserverForTitles();
    spawnIntersectionObserverForTableOfContent();
  }, [headings]);

  // Auto-scroll to keep the active heading in view
  useEffect(() => {
    if (currentSectionInView && itemRefs.current.has(currentSectionInView)) {
      const activeElement = itemRefs.current.get(currentSectionInView);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [currentSectionInView]);

  const spawnIntersectionObserverForTableOfContent = () => {
    const tableOfContentElement = document.getElementById("table-of-content");

    const observer = new IntersectionObserver(handleTableOfContentVisibility, {
      threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better detection
    });

    observer.observe(tableOfContentElement);
  };

  const spawnIntersectionObserverForTitles = () => {
    headings.forEach(({ title }) => {
      const id = underscoreDelimiter(title);
      const headingElement = document.getElementById(id);
      if (headingElement) {
        const observer = new IntersectionObserver(
          (entries, observer) => handleIntersection(entries, observer, id),
          {
            threshold: 0.5,
          }
        );

        observer.observe(headingElement);
      }
    });
  };

  const renderAsideList = (list) => {
    return list.map((item) => {
      const isActive = currentSectionInView === underscoreDelimiter(item.title);
      const id = underscoreDelimiter(item.title);

      return (
        <Fragment key={item.title}>
          {item.title && (
            <a
              className={`block text-sm font-light transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-black dark:text-white opacity-100"
                  : "text-gray-500 dark:text-gray-400 opacity-70 hover:opacity-100"
              } hover:text-black dark:hover:text-white`}
              href={`#${id}`}
              ref={(el) => {
                if (el) {
                  itemRefs.current.set(id, el);
                }
              }}
            >
              <li className={`relative py-3 pl-4 leading-relaxed`}>
                <span
                  className={`absolute left-0 top-0 h-full w-px transition-all duration-300 ${
                    isActive ? "bg-black dark:bg-white opacity-100" : "bg-transparent opacity-0"
                  }`}
                ></span>
                <span className={`transition-all duration-300 ${
                  isActive ? "font-normal tracking-tight" : "font-light tracking-normal"
                }`}>
                  {item.title}
                </span>
              </li>
            </a>
          )}
        </Fragment>
      );
    });
  };

  return (
    <aside
      className={`fixed top-32 left-8 w-64 max-h-[calc(100vh-200px)] overflow-y-auto p-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg transition-all duration-300 ${
        isTableOfContentVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      } hidden xl:block z-10`}
      id="table-of-content"
    >
      <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xs font-medium tracking-[0.1em] text-gray-500 dark:text-gray-400 uppercase">
          Table of Contents
        </h3>
      </div>
      <nav>
        <ul className="space-y-1">{renderAsideList(headings)}</ul>
      </nav>
    </aside>
  );
}
