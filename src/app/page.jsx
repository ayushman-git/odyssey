import ArticleCardList from "@/components/ArticleCardList";
import Page from "@/app/articles/page.mdx"

export default function Home() {
  console.log({Page})
  return (
    <div>
      <ArticleCardList />
    </div>
  );
}
