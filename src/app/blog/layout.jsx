import Footer from "@/components/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import React from "react";

function Layout({ children }) {
  return (
    <div className="grid place-items-center">
      <Navbar />
      <main className="w-full pb-32">
        <section className="w-full grid place-items-center">{children}</section>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
