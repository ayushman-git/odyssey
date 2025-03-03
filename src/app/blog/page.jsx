import ArticleCardList from "@/components/ArticleCardList";
import CreativeGrid from "@/components/CreativeGrid";
import HeroBanner from "@/components/HeroBanner";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <Suspense>
      <div className="w-full overflow-hidden grid place-items-center">
        <div className="max-w-screen-md sm:px-0 px-6">
          <HeroBanner />
          <CreativeGrid />
          <ArticleCardList />
        </div>
      </div>
    </Suspense>
  );
}
