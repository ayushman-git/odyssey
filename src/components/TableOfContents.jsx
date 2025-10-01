"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { underscoreDelimiter } from "@/utils/index.js";

export default function TableOfContents({ headings }) {
  const [activeId, setActiveId] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const itemRefs = useRef(new Map());
  const observerRef = useRef(null);

  // Handle intersection for scroll spy
  const handleIntersection = useCallback((entries) => {
    // Find the first visible heading
    const visibleHeadings = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (visibleHeadings.length > 0) {
      setActiveId(visibleHeadings[0].target.id);
    }
  }, []);

  // Handle TOC visibility based on article content
  const handleTOCVisibility = useCallback((entries) => {
    entries.forEach((entry) => {
      setIsVisible(entry.intersectionRatio > 0);
    });
  }, []);

  // Set up intersection observers
  useEffect(() => {
    if (!headings || headings.length === 0) return;

    // Observer for headings (scroll spy)
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-20% 0px -35% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    // Observer for article content visibility
    const articleContent = document.getElementById("article-content");
    if (articleContent) {
      const tocObserver = new IntersectionObserver(handleTOCVisibility, {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -10% 0px",
      });
      tocObserver.observe(articleContent);

      return () => {
        tocObserver.disconnect();
      };
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings, handleIntersection, handleTOCVisibility]);

  // Auto-scroll active item into view (for sidebar)
  useEffect(() => {
    if (activeId && itemRefs.current.has(activeId)) {
      const activeElement = itemRefs.current.get(activeId);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    }
  }, [activeId]);

  // Handle smooth scroll to heading
  const scrollToHeading = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      // Close mobile menu after clicking
      setIsMobileOpen(false);
    }
  };

  // Get indentation and styling based on heading level
  const getIndentClass = (level) => {
    const indents = {
      1: "pl-0",
      2: "pl-4",
      3: "pl-8",
    };
    return indents[level] || "pl-0";
  };

  // Get font size and weight class based on heading level
  const getFontSizeClass = (level) => {
    const sizes = {
      1: "text-sm font-semibold tracking-tight",
      2: "text-[13px] font-medium",
      3: "text-xs font-normal",
    };
    return sizes[level] || "text-sm";
  };

  if (!headings || headings.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`fixed bottom-6 right-6 z-50 lg:hidden p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Toggle table of contents"
        aria-expanded={isMobileOpen}
      >
        <svg
          className="w-5 h-5 text-gray-700 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 rounded-t-2xl shadow-2xl transition-transform duration-300 ${
          isMobileOpen ? "translate-y-0" : "translate-y-full"
        }`}
        aria-label="Table of contents"
        role="navigation"
      >
        <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xs font-medium tracking-[0.15em] text-gray-500 dark:text-gray-400 uppercase">
              Table of Contents
            </h2>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Close table of contents"
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="space-y-1">
              {headings.map(({ level, text, id }) => {
                const isActive = activeId === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => scrollToHeading(e, id)}
                      className={`block py-2.5 px-3 rounded-md transition-all duration-200 ${getIndentClass(
                        level
                      )} ${getFontSizeClass(level)} ${
                        isActive
                          ? "text-black dark:text-white bg-gray-100 dark:bg-gray-800 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900"
                      }`}
                      ref={(el) => {
                        if (el) itemRefs.current.set(id, el);
                      }}
                    >
                      {text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block fixed top-32 right-8 xl:right-12 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
        } z-10`}
        aria-label="Table of contents"
        role="navigation"
      >
        <div className="sticky top-32">
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`absolute ${isCollapsed ? 'top-0 right-0' : 'top-4 right-4'} z-20 p-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-all duration-300 shadow-sm`}
            aria-label={isCollapsed ? "Expand table of contents" : "Collapse table of contents"}
          >
            <svg
              className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* TOC Content */}
          <div className={`transition-all duration-300 ${
            isCollapsed ? "opacity-0 invisible w-0" : "opacity-100 visible w-64"
          }`}>
            <div className="bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-sm p-6 overflow-y-auto max-h-[calc(100vh-180px)] custom-scrollbar">
              {/* Header */}
              <div className="mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xs font-medium tracking-[0.15em] text-gray-500 dark:text-gray-400 uppercase">
                  On this page
                </h2>
              </div>

              {/* Navigation Links */}
              <nav>
                <ul className="space-y-0.5">
                  {headings.map(({ level, text, id }) => {
                    const isActive = activeId === id;
                    return (
                      <li key={id} className={`relative ${level === 1 ? 'mt-3 first:mt-0' : level === 2 ? 'mt-1.5' : 'mt-1'}`}>
                        <a
                          href={`#${id}`}
                          onClick={(e) => scrollToHeading(e, id)}
                          className={`block py-2 pl-4 pr-3 rounded-md transition-all duration-200 ${getIndentClass(
                            level
                          )} ${getFontSizeClass(level)} ${
                            isActive
                              ? "text-black dark:text-white"
                              : level === 1
                                ? "text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                          }`}
                          ref={(el) => {
                            if (el) itemRefs.current.set(id, el);
                          }}
                        >
                          {/* Active indicator - positioned relative to li */}
                          <span
                            className={`absolute left-0 top-0 h-full ${level === 1 ? 'w-1' : 'w-0.5'} rounded-full transition-all duration-200 ${
                              isActive
                                ? "bg-black dark:bg-white opacity-100"
                                : "bg-transparent opacity-0"
                            }`}
                          />
                          <span className="transition-all duration-200 leading-snug block">
                            {text}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
