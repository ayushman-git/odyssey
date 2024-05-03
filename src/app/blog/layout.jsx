import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function BlogLayout({ children }) {
  return (
    <div className="grid place-items-center">
      <div id="linear-progress" className="sticky top-0 w-full z-50"></div>
      <main className="max-w-screen-md w-full">
        <Navbar />
        <section>{children}</section>
      </main>
      <Footer />
    </div>
  );
}

export default BlogLayout;
