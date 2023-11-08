import { getArticle } from "@/lib/posts";
import Image from "next/image";

export default async function Page({ params }) {
  const { htmlContent, title, cover_img, type } = await getArticle(params.slug);
  return (
    <section className="py-8">
      <Image
        src={cover_img}
        width={800}
        height={300}
        style={{
          aspectRatio: "2/1",
          objectFit: "cover",
        }}
        layout="responsive"
        objectFit="cover"
        className="mr-10 rounded"
        alt="Cover Image"
      />
      <h1 className="text-2xl font-black mt-4">{title}</h1>
      <h2 className="font-black mt-2">{type}</h2>
      <article dangerouslySetInnerHTML={{ __html: htmlContent }}></article>
    </section>
  );
}
