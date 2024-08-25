import React from "react";
import Grid from "./Grid";
import { GRID_IMAGES } from "@/data/constants";


function CreativeGrid() {
  return (
    <div
      className="grid grid-cols-6 grid-rows-3 gap-4 mb-12"
      style={{ gridTemplateRows: "repeat(4, 102px)" }}
    >
      {GRID_IMAGES.map(({ src, gridArea }) => (
        <Grid key={src} img={src} gridArea={gridArea} />
      ))}
    </div>
  );
}

export default CreativeGrid;
