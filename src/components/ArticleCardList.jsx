import ArticleCard from "./ArticleCard";
import { getArticles } from "@/lib/posts";

export default function ArticleCardList() {
    const articles = getArticles();
    console.log({articles})
    return (
        <section className="flex flex-col gap-6 my-8">
            {
                articles.map((article) => (
                    <ArticleCard details={article} />
                ))
            }
        </section>
    )
}