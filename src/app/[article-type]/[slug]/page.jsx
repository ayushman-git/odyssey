import Image from "next/image";
import { getArticle } from "@/lib/posts";
import { BLUR_DATA_URLS } from "@/data/constants";
import CustomMDX from "@/components/mdx/mdx-remote";
import LinearProgress from "@/components/LinearProgress";
import DetailChips from "@/components/DetailChips";

export async function generateMetadata({ params }) {
  const { title, cover_img } = await getArticle(params.slug);
  return {
    title: `Odyssey | ${title}`,
    openGraph: {
      title: title,
      description: "A Voyage into the Heart of Silicon",
      siteName: "Odyssey",
      images: [
        {
          url: cover_img,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const { title, cover_img, type, fileContent, date, showAside } =
    await getArticle(params.slug);
  return (
    <>
      <section className="py-8 pt-0 relative w-full grid place-items-center">
        <div>
          <LinearProgress />
        </div>
        <div className="w-full h-[76vh] relative">
          <Image
            src={cover_img}
            quality={100}
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            alt="Cover Image"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <article className="max-w-screen-md">
          <h1 className="text-4xl font-black mt-8">{title}</h1>

          <DetailChips type={type} date={date} />
          <section className="py-8">
            <CustomMDX source={fileContent} showAside={showAside} />
          </section>
        </article>
      </section>
    </>
  );
}
