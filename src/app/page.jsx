"use client";

import dynamic from "next/dynamic";
import Script from "next/script";

const HomeHero = dynamic(() => import("@/components/home/HomeHero"));
const DeferredClientSection = dynamic(
  () => import("@/components/DeferredClientSection"),
  { ssr: false }
);
const Contact = dynamic(() => import("@/components/Contact"), {
  ssr: false,
  loading: () => <div className="h-[680px]" />,
});
const ProjectGallery = dynamic(() => import("@/components/ProjectGallery"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center">
      <div className="text-white opacity-60">Loading projects...</div>
    </div>
  ),
});
const MyStack = dynamic(() => import("@/components/MyStack"), {
  ssr: false,
  loading: () => <div className="h-[600px]" />,
});
const CosmicFooter = dynamic(() => import("@/components/CosmisFooter"), {
  ssr: false,
  loading: () => <div className="h-[420px]" />,
});

export default function Home() {
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
    <main id="main-content" tabIndex={-1}>
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
        <HomeHero />

        <DeferredClientSection
          id="about"
          className="relative overflow-hidden"
          placeholderClassName="h-[640px]"
          rootMargin="400px"
        >
          <Contact />
        </DeferredClientSection>

        <DeferredClientSection
          id="projects"
          className="px-6 md:px-16 lg:px-24 py-20 relative z-20 bg-black"
          placeholderClassName="h-[520px]"
          rootMargin="500px"
        >
          <ProjectGallery />
        </DeferredClientSection>

        <DeferredClientSection
          id="my-stack"
          className="py-10 relative z-20 bg-black bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]"
          placeholderClassName="h-[620px]"
          rootMargin="500px"
        >
          <MyStack />
        </DeferredClientSection>

        <DeferredClientSection
          className="bg-black"
          placeholderClassName="h-[420px]"
          rootMargin="500px"
        >
          <CosmicFooter />
        </DeferredClientSection>
      </div>
    </main>
  );
}
