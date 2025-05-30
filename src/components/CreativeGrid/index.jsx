import React from "react";
import dynamic from "next/dynamic";
import { GRID_IMAGES } from "@/data/constants";

// Dynamically import Grid component to reduce bundle size
const Grid = dynamic(() => import("./Grid"), {
  loading: () => <div className="w-full h-full bg-gray-200 animate-pulse rounded-3xl"></div>
});

function CreativeGrid() {
  return (
    <div
      className="grid grid-cols-6 grid-rows-3 gap-4 mb-12"
      style={{ gridTemplateRows: "repeat(4, 102px)" }}
    >
      {GRID_IMAGES.map(({ src, gridArea }, index) => (
        <Grid key={index} img={src} gridArea={gridArea} />
      ))}
    </div>
  );
}

export default CreativeGrid;
