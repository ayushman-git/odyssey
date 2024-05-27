import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Merriweather } from "next/font/google";

const merry = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
    style: ["normal", "italic"],
  });

function BlogLayout({ children }) {
  return (
    <div className={`grid place-items-center ${merry.className}`}>
      <div id="linear-progress" className="sticky top-0 w-full z-50"></div>
      <main className="max-w-screen-md w-full pb-44">
        <Navbar />
        <section>{children}</section>
      </main>
      <Footer />
    </div>
  );
}

export default BlogLayout;
