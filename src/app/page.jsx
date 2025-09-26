"use client";

import React, { useRef } from "react";
import { Meow_Script } from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navigation from "../components/Navigation";
import ClientStars from "../components/ClientStars";
import HomeContent from "../components/HomeContent";
import "@/styles/globals.css";
import MyStack from "@/components/MyStack";
import CosmicFooter from "@/components/CosmisFooter";
import Contact from "../components/Contact";

// Import ProjectGallery with dynamic loading to avoid SSR issues
const ProjectGallery = dynamic(() => import("@/components/ProjectGallery"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="text-white opacity-60">Loading projects...</div>
    </div>
  ),
});

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const contactRef = useRef(null);

  const logoElement = (
    <h1
      className={`${meowScript.className} text-white text-3xl leading-[43px] font-normal`}
    >
      Ayushman
    </h1>
  );

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ayushman Gupta | Developer & Designer",
    url: "https://ayushman.dev",
    description:
      "Personal portfolio of Ayushman Gupta, a developer and designer specializing in web development and creative solutions.",
    author: {
      "@type": "Person",
      name: "Ayushman Gupta",
    },
  };

  return (
    <main>
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd),
        }}
      />
      <Script
        id="prerender-blog"
        strategy="afterInteractive"
        type="speculationrules"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            prerender: [{ source: "list", urls: ["/blog"] }],
          }),
        }}
      />
      <div className="bg-black min-h-screen md:p-4 p-0">
        <section
          className="rounded-none md:rounded-t-2xl min-h-screen px-6 md:px-16 lg:px-24 py-10 relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-black"
        >
          {/* Black overlay gradient starting at 70% height */}
          <div
            className="absolute bottom-0 left-0 right-0 z-10 w-full"
            style={{
              height: "70%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,1) 100%)",
              pointerEvents: "none",
            }}
          ></div>
          <Navigation logo={logoElement} contactRef={contactRef} />

          <ClientStars />
          <HomeContent meowScriptClassName={meowScript.className} />
        </section>

        <div id="about" className="relative overflow-hidden">
          <Contact />
        </div>

        {/* Project Gallery Section */}
        <div
          id="projects"
          className="px-6 md:px-16 lg:px-24 py-20 relative z-20 bg-black"
        >
          <ProjectGallery />
        </div>

        <div
          id="my-stack"
          className="py-10 relative z-20 bg-black bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]"
        >
          <MyStack />
        </div>


        <CosmicFooter />
      </div>
    </main>
  );
}
