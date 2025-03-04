import React from "react";
import { Meow_Script } from "next/font/google";
import Navigation from "../components/Navigation";

// Initialize the Meow Script font
const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function Home() {
  // Create logo as JSX element to pass to Navigation
  const logoElement = (
    <h1 className={`${meowScript.className} text-white text-3xl leading-[43px] font-normal`}>
      Ayushman
    </h1>
  );

  return (
    <div className="bg-black min-h-screen">
      <section className="bg-gray-900">
        <Navigation logo={logoElement} />
        <h1 className="text-white text-4xl py-20">
          Full-Stack Engineer— Crafting Frontends,
          <br /> Architecting Backends and Elevating Apps
        </h1>

        <button>Connect</button>
      </section>
    </div>
  );
}

export default Home;
