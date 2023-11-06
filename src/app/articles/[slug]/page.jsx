import { getArticleData } from "@/lib/articles";

export default async function Page({ params }) {
  const postData = await getArticleData(params.slug);
  return (
    <>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  );
}
