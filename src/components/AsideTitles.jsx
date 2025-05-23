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
      // Set visibility based on whether the table of contents is fully in view
      setIsTableOfContentVisible(entry.intersectionRatio === 1);
    });
  };

  useEffect(() => {
    spawnIntersectionObserverForTitles();
    spawnIntersectionObserverForTableOfContent();
  }, [headings]);

  const spawnIntersectionObserverForTableOfContent = () => {
    const tableOfContentElement = document.getElementById("table-of-content");

    const observer = new IntersectionObserver(handleTableOfContentVisibility, {
      threshold: 1,
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
              className={`block text-xs transition-all duration-300 ease-in-out ${
                isActive 
                  ? "text-blue-500 font-medium opacity-100" 
                  : "text-gray-600 opacity-75 hover:opacity-90"
              } hover:text-blue-600`}
              href={`#${id}`}
              ref={(el) => {
                if (el) {
                  itemRefs.current.set(id, el);
                }
              }}
            >
              <li className={`relative py-2 pl-3`}>
                <span 
                  className={`absolute left-0 top-0 h-full border-l-2 transition-all duration-300 ${
                    isActive ? "border-blue-500 opacity-100" : "border-transparent opacity-0"
                  }`}
                ></span>
                {item.title}
              </li>
            </a>
          )}
        </Fragment>
      );
    });
  };

  return (
    <aside
      className={`sticky top-48 w-60 -ml-72 mt-20 h-0 p-5 transition-opacity duration-300 ${
        isTableOfContentVisible ? "opacity-100" : "opacity-0"
      }`}
      id="table-of-content"
    >
      <h3 className="font-bold mb-4 pb-2">Table of Contents</h3>
      <ul className="text-xs space-y-1">{renderAsideList(headings)}</ul>
    </aside>
  );
}
