import Image from "next/image";
import { getArticle } from "@/lib/posts";

export async function generateMetadata({ params }) {
  const { title } = await getArticle(params.slug);
  return {
    title: `Odyssey | ${title}`,
  };
}

export default async function Page({ params }) {
  const { htmlContent, title, cover_img, type } = await getArticle(params.slug);
  return (
    <section className="py-8 relative">
      <div className="w-full h-96 relative">
        <Image
          src={cover_img}
          quality={100}
          style={{
            borderRadius: "14px",
          }}
          layout="fill"
          objectFit="cover"
          className="mr-10 rounded"
          alt="Cover Image"
        />
      </div>
      <h1 className="text-2xl font-black mt-4">{title}</h1>
      <h2 className="font-black mt-2">{type}</h2>
      <article dangerouslySetInnerHTML={{ __html: htmlContent }}></article>
    </section>
  );
}
