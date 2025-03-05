import React from "react";
import { Meow_Script } from "next/font/google";
import Navigation from "../components/Navigation";
import ClientStars from "../components/ClientStars";
import HomeContent from "../components/HomeContent";
import "@/styles/globals.css";
import SectionDivider from "@/components/SectionDivider";
import WhatIDo from "@/components/WhatIDo";
import MyStack from "@/components/MyStack";

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const logoElement = (
    <h1
      className={`${meowScript.className} text-white text-3xl leading-[43px] font-normal`}
    >
      Ayushman
    </h1>
  );

  return (
    <div className="bg-black min-h-screen p-4">
      <section
        className="rounded-t-2xl min-h-screen px-6 md:px-16 lg:px-24 py-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom right, #242424, #000000)",
        }}
      >
        {/* Black overlay gradient starting at 70% height */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-10 w-full"
          style={{
            height: '70%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
            pointerEvents: 'none'
          }}
        ></div>
        
        <Navigation logo={logoElement} />
        <ClientStars />
        <HomeContent meowScriptClassName={meowScript.className} />
      </section>
      {/* <SectionDivider /> */}

      <div className="bg-black px-6 md:px-16 lg:px-24 py-10 pt-16 pb-20 relative z-20">
        <WhatIDo />
      </div>
      <div 
        className="py-10 relative z-20 bg-black bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]"
      >
        <MyStack />
      </div>
    </div>
  );
}
