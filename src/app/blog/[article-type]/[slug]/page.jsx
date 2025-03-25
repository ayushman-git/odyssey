import Image from "next/image";
import Script from "next/script";
import { getArticle } from "@/lib/posts";
import { BLUR_DATA_URLS } from "@/data/constants";
import CustomMDX from "@/components/mdx/mdx-remote";
import LinearProgress from "@/components/LinearProgress";
import DetailChips from "@/components/DetailChips";
import { formatDateString } from "@/utils";

export async function generateMetadata({ params }) {
  const { title, cover_img, introduction, date } = await getArticle(params.slug);
  const formattedDate = formatDateString(date);
  
  return {
    title: title,
    description: introduction || `Read ${title} by Ayushman Gupta on Odyssey blog.`,
    openGraph: {
      title: title,
      description: introduction || "A Voyage into the Heart of Silicon by Ayushman Gupta",
      siteName: "Ayushman Gupta | Odyssey",
      images: [
        {
          url: cover_img,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: date,
      authors: ["Ayushman Gupta"],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: introduction || "A Voyage into the Heart of Silicon by Ayushman Gupta",
      images: [cover_img],
    },
    alternates: {
      canonical: `https://ayushman.dev/blog/${params['article-type']}/${params.slug}`,
    }
  };
}

export default async function Page({ params }) {
  const { title, cover_img, type, fileContent, date, showAside, introduction } =
    await getArticle(params.slug);
  const formattedDate = formatDateString(date);
  
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "image": [cover_img],
    "datePublished": date,
    "dateModified": date,
    "author": {
      "@type": "Person",
      "name": "Ayushman Gupta",
      "url": "https://ayushman.dev"
    },
    "publisher": {
      "@type": "Person",
      "name": "Ayushman Gupta",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ayushman.dev/favicon-32x32.png"
      }
    },
    "description": introduction || `Article about ${title} by Ayushman Gupta`
  };
  
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd)
        }}
      />
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
            alt={`Cover image for article: ${title}`}
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <article className="max-w-screen-md sm:px-0 px-6">
          <div className="mt-12">
            <p className="text-gray-500 text-sm font-normal">
              {formattedDate}
            </p>
          </div>
          <h1 className="text-4xl font-semibold mt-4">{title}</h1>
          <div className="bg-[#b7d9b7] dark:bg-[#516e51] w-max px-4 py-1 rounded-xl my-4">
            <p className="text-sm font-light">{type}</p>
          </div>
          <section className="py-8">
            <CustomMDX source={fileContent} showAside={showAside} />
          </section>
        </article>
      </section>
    </>
  );
}
