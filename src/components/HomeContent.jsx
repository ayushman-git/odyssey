"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SocialLinks from "./SocialLinks";
import WhatIDo from "./WhatIDo";
import SectionDivider from "./SectionDivider";

export default function HomeContent({ meowScriptClassName }) {
  const introRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    // Initial animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate elements in sequence
    tl.fromTo(
      introRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
      .fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4" // Start slightly before previous animation ends
      )
      .fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 },
        "-=0.4"
      )
      .fromTo(
        socialsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.2"
      );

    // Clean up animations on component unmount
    return () => {
      tl.kill();
    };
  }, []);

  // Setup button hover effects
  const handleButtonHover = (e, enter) => {
    gsap.to(e.target, {
      scale: enter ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
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
            className="text-gray-300 text-xl md:text-2xl max-w-2xl mb-10 opacity-0 md:leading-relaxed"
          >
            Crafting elegant frontends, architecting robust backends, and
            building exceptional digital experiences that solve real problems.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
            <button
              className="bg-white hover:bg-gray-800 text-black hover:text-white py-3 px-8 rounded-full transition-all duration-300 opacity-0"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              View My Work
            </button>
            <button
              className="border border-gray-800 text-white py-3 px-8 rounded-full hover:bg-white hover:text-black transition-all duration-300 opacity-0"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              Resume
            </button>
          </div>

          <div ref={socialsRef} className="opacity-0">
            <SocialLinks />
          </div>
        </div>
      </div>
    </>
  );
}
