import ArticleCard from "./ArticleCard";

export default function ArticleCardList() {
    return (
        <section className="flex flex-col gap-6 my-8">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
        </section>
    )
}