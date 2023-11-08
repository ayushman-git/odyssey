import { getArticle } from "@/lib/posts";

export default async function Page({ params }) {
  const postData = await getArticle(params.slug);
  return (
    <article dangerouslySetInnerHTML={{__html: postData.htmlContent}}>

    </article>
  );
}
