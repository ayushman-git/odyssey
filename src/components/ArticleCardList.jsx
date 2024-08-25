import { getArticles } from "@/lib/posts";
import ArticleCard from "./ArticleCard";

export default function ArticleCardList() {
  const articles = getArticles();

  return (
    <section className={`flex flex-col gap-16 py-12`}>
      {articles.map((article) => (
        <ArticleCard details={article} />
      ))}
    </section>
  );
}
