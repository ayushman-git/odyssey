import React from "react";
import ArticleCardList from "@/components/ArticleCardList";
import HeroBanner from "@/components/HeroBanner";
import CreativeGrid from "@/components/CreativeGrid";

function Home() {
  return (
    <div>
      <HeroBanner />
      <CreativeGrid />
      <ArticleCardList />
    </div>
  );
}

export default Home;
