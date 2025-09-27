"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { scrollToSectionWithId } from "@/utils/index.js";

export default function HomeContent({ meowScriptClassName }) {
  const introRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate elements in sequence - with null checks
    if (introRef.current) {
      tl.fromTo(
        introRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
    }
    
    if (headingRef.current) {
      tl.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4" // Start slightly before previous animation ends
      );
    }
    
    // Subtle animation for description - starting from already visible state
    if (descriptionRef.current) {
      tl.fromTo(
        descriptionRef.current,
        { y: 15, opacity: 0.85 }, // Start slightly offset but mostly visible
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    }
    
    if (ctaRef.current && ctaRef.current.children.length > 0) {
      tl.fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
        "-=0.4"
      );
    }
    
    // Clean up animations on component unmount
    return () => {
      tl.kill();
    };
  }, []);

  // Handler to open resume PDF
  const handleResumeClick = () => {
    window.open("/ayushman_resume.pdf", "_blank");
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col h-[80vh] justify-center">
        <div>
          <p
            ref={introRef}
            className="text-gray-400 font-medium mb-4 opacity-0"
          >
            Hello, I'm
          </p>
          <h1
            ref={headingRef}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 opacity-0"
          >
            Full-Stack Engineer
          </h1>
          <p
            ref={descriptionRef}
            className="text-gray-300 text-xl md:text-2xl max-w-2xl mb-10 md:leading-relaxed opacity-0,"
          >
            Crafting elegant frontends, architecting robust backends, and
            building exceptional digital experiences that solve real problems.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-6 mb-12">
            {/* Primary CTA - View My Work Button */}
            <button
              className="group relative bg-white border border-white py-3 px-8 opacity-0 rounded-md hover:bg-transparent hover:text-white transition-all duration-300 text-black"
              onClick={() => scrollToSectionWithId("projects")}
            >
              <span className="flex items-center font-medium text-black hover:text-white">
                <span>View My Work</span>
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Secondary CTA - Resume Button */}
            <button
              className="group relative bg-transparent border border-gray-700 py-3 px-8 opacity-0 rounded-md hover:border-white transition-colors duration-300"
              onClick={handleResumeClick}
            >
              <span className="flex items-center text-white font-medium">
                <span>Resume</span>
                <svg
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-y-[-1px] group-hover:translate-x-[1px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
