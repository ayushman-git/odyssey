import React from "react";
import ArticleCardList from "@/components/ArticleCardList";
import HeroBanner from "@/components/HeroBanner";
import CreativeGrid from "@/components/CreativeGrid";

function Home() {
  return (
    <div className="w-full overflow-hidden grid place-items-center">
      <div className="max-w-screen-md sm:px-0 px-6">
        <HeroBanner />
        <CreativeGrid />
        <ArticleCardList />
      </div>
    </div>
  );
}

export default Home;
