import React from "react";
import { Meow_Script } from "next/font/google";
import Navigation from "../components/Navigation";
import ClientStars from "../components/ClientStars";
import HomeContent from "../components/HomeContent";

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
        className="rounded-2xl min-h-screen px-6 md:px-16 lg:px-24 py-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom right, #242424, #000000)",
        }}
      >
        <Navigation logo={logoElement} />
        <ClientStars />
        <HomeContent meowScriptClassName={meowScript.className} />
      </section>
    </div>
  );
}
