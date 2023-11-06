import ArticleCardList from "@/components/ArticleCardList";
import { meta } from "@/app/articles/page.mdx";

export default function Home() {
  console.log({meta})
  return (
    <div>
      <ArticleCardList />
    </div>
  );
}
