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
  const { title, cover_img, type, fileContent, date, showAside } = await getArticle(
    params.slug
  );
  return (
    <>
      <div className="absolute w-full top-0">
        <LinearProgress />
      </div>
      <section className="py-8 relative">
        <div className="w-full h-96 relative">
          <Image
            src={cover_img}
            quality={100}
            style={{
              borderRadius: "14px",
            }}
            layout="fill"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            objectFit="cover"
            className="mr-10 rounded"
            alt="Cover Image"
          />
        </div>
        <h1 className="text-2xl font-black mt-4">{title}</h1>

        <DetailChips type={type} date={date} />
        <section className="py-8">
          <CustomMDX source={fileContent} showAside={showAside} />
        </section>
      </section>
    </>
  );
}
