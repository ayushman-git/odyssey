import CosmicFooter from "@/components/CosmisFooter";
import Navbar from "@/components/LandingPage/Navbar";
import ReadProgressBar from "@/components/ReadProgressBar";
import Script from "next/script";
import React from "react";

function Layout({ children }) {
  const blogBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ayushman.dev"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://ayushman.dev/blog"
      }
    ]
  };

  return (
    <div className="grid place-items-center">
      <Script
        id="blog-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogBreadcrumbJsonLd)
        }}
      />
      <ReadProgressBar />
      <Navbar />
      <main className="w-full pb-32">
        <section className="w-full grid place-items-center">{children}</section>
      </main>
      <CosmicFooter variant="editorial" />
    </div>
  );
}

export default Layout;
