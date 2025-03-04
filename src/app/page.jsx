"use client"

import React from "react";
import { Meow_Script } from "next/font/google";
import Navigation from "../components/Navigation";
import { Canvas } from '@react-three/fiber'
import Stars from "../components/Stars";

const meowScript = Meow_Script({
  weight: "400", // Meow Script only has weight 400 available
  subsets: ["latin"],
  display: "swap",
});

function Home() {
  const logoElement = (
    <h1
      className={`${meowScript.className} text-white text-3xl leading-[43px] font-normal`}
    >
      Ayushman
    </h1>
  );

  return (
    <div className="bg-black min-h-screen p-4">
      <section className="rounded-2xl min-h-screen px-24 py-10 relative" style={{background: 'linear-gradient(to bottom right, #242424, #000000)'}}>
        <Navigation logo={logoElement} />
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <Stars count={1300} />
          </Canvas>
        </div>
        <div className="relative z-10">
          <h1 className="text-white text-4xl py-20 leading-relaxed">
            Full-Stack Engineer— Crafting Frontends,
            <br /> Architecting Backends and <br /> Elevating Apps
          </h1>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full">
            Connect
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
