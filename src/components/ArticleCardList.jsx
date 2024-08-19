import { Dancing_Script, Sacramento } from "next/font/google";
import ArticleCard from "./ArticleCard";
import { getArticles } from "@/lib/posts";

const dancingScript = Sacramento({
  subsets: ["latin"],
  style: ["normal"],
  weight: "400",
});

export default function ArticleCardList() {
  const articles = getArticles();

  return (
    <section className={`flex flex-col gap-6 py-12`}>
      <div class="grid-background px-4 py-10">
        <h1 className={`font-semibold text-4xl ${dancingScript.className}`}>
          Between the Stars, Pages, and Code
        </h1>
        <h2 className="mt-2">
          Delving into the Cosmos, Unraveling Literary Masterpieces, and
          Exploring the Latest in Technology
        </h2>
      </div>

      {articles.map((article) => (
        <ArticleCard details={article} />
      ))}
    </section>
  );
}
