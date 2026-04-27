"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Meow_Script } from "next/font/google";
import Navigation from "@/components/Navigation";
import HomeContent from "@/components/HomeContent";

/** Homepage hero WebGL: not on first paint — see docs/webgl-performance.md */
const ClientStars = dynamic(() => import("@/components/ClientStars"), {
  ssr: false,
  loading: () => null,
});

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function HomeHero() {
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (window.innerWidth < 768) {
      return;
    }

    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 500));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;

    const id = idleCallback(() => setShowStars(true));
    return () => cancelIdle(id);
  }, []);

  const logoElement = (
    <h1 className={`${meowScript.className} text-white text-3xl leading-[43px] font-normal`}>
      Ayushman
    </h1>
  );

  return (
    <section className="rounded-none md:rounded-t-2xl min-h-screen px-6 md:px-16 lg:px-24 py-10 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-black">
      <div
        className="absolute bottom-0 left-0 right-0 z-10 w-full"
        style={{
          height: "70%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 100%)",
          pointerEvents: "none",
        }}
      />

      <Navigation logo={logoElement} />
      {showStars ? (
        <Suspense fallback={null}>
          <ClientStars />
        </Suspense>
      ) : null}
      <HomeContent />
    </section>
  );
}
