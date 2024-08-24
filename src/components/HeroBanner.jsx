import React from "react";

function HeroBanner() {
  return (
    <div className="flex my-24">
      <section className="flex-1 gap-4">
        <h1 className="text-7xl font-bold mb-4">Odyssey.</h1>
        <h2 className="text-2xl font-normal">Created by Ayushman</h2>
      </section>
      <aside className="flex-1">
        <h3 className="font-medium text-lg">
          Odyssey is a blog exploring the cosmos, tech insights, and thoughtful
          book reviews, where curiosity meets creativity. Dive into diverse
          perspectives!
        </h3>
      </aside>
    </div>
  );
}

export default HeroBanner;
