import ArticleCard from "./ArticleCard";
import { getArticles } from "@/lib/posts";

export default function ArticleCardList() {
  const articles = getArticles();

  return (
    <section className="flex flex-col gap-6 py-12">
      {articles.map((article) => (
        <ArticleCard details={article} />
      ))}
    </section>
  );
}
