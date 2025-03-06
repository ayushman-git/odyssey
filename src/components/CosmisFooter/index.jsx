"use client";

import React, { useState } from "react";
import topographyBg from "@/assets/svgs/topography.svg";
import SocialLinks from "../SocialLinks";

function CosmicFooter() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="h-[60vh] relative z-20">
      <footer
        className="rounded-2xl h-80 bg-blue-700 relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* SVG as image element instead of background */}
        <img
          src={topographyBg.src}
          alt="Topography pattern"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-40" : "opacity-0"
          }`}
          style={{ mixBlendMode: "soft-light" }}
        />
        <div className="relative z-10">
          <h1 className="font-semibold text-white text-3xl text-center pt-20">
            Let's start creating together
          </h1>
        </div>
        <section className="flex justify-center items-center mt-12">
          <SocialLinks />
        </section>
      </footer>
    </div>
  );
}

export default CosmicFooter;
