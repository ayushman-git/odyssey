import React from "react";
import Grid from "./Grid";
import Carina from "@/assets/images/grid/carina.jpg";
import Sand from "@/assets/images/grid/sand.jpg";
import Abstract from "@/assets/images/grid/abstract.jpg";
import Astronaut from "@/assets/images/grid/astronaut.jpg";
import Jupiter from "@/assets/images/grid/jupiter.jpg";
import Cute from "@/assets/images/grid/cute.jpg";
import Sky from "@/assets/images/grid/sky.jpg";

function CreativeGrid() {
  return (
    <div
      className="grid grid-cols-6 grid-rows-3 gap-4 mb-12"
      style={{ gridTemplateRows: "repeat(4, 102px)" }}
    >
      <Grid img={Carina} gridArea="1 / 1 / 2 / -1" />
      <Grid img={Abstract} gridArea="2 / 1 / 3 / 2" />
      <Grid img={Sand} gridArea="2 / 2 / 3 / -1" />
      <Grid img={Astronaut} gridArea="3 / 6 / -1 / -1" />
      <Grid img={Jupiter} gridArea="3 / 1 / 4 / -2" />
      <Grid img={Cute} gridArea="4 / 1 / -1 / 2" />
      <Grid img={Sky} gridArea="4 / 2 / -1 / -2" />
    </div>
  );
}

export default CreativeGrid;
