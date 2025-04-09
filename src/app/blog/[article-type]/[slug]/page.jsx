import Image from "next/image";
import Script from "next/script";
import { getArticle } from "@/lib/posts";
import { BLUR_DATA_URLS } from "@/data/constants";
import CustomMDX from "@/components/mdx/mdx-remote";
import LinearProgress from "@/components/LinearProgress";
import { formatDateString, generatePageMetadata } from "@/utils";

export async function generateMetadata({ params }) {
  const { title, cover_img, introduction, date } = await getArticle(params.slug);
  
  return generatePageMetadata({
    title,
    description: introduction || `Read ${title} by Ayushman Gupta on Odyssey blog.`,
    image: cover_img,
    type: 'article',
    url: `/blog/${params['article-type']}/${params.slug}`,
    date
  });
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
      <div className="fixed top-0 left-0 right-0 z-50">
        <LinearProgress />
      </div>
      <section className="pt-0 relative w-full flex flex-col items-center">
        <div className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70 z-10" />
          <Image
            src={cover_img}
            quality={100}
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            alt={`Cover image for article: ${title}`}
            style={{
              objectFit: "cover",
            }}
            className="transition-all duration-1000 ease-out hover:scale-105"
          />
          
          <div className="absolute bottom-0 left-0 right-0 md:p-10 z-20 mb-12">
            <div className="max-w-screen-md lg:max-w-[900px] px-8 mx-auto">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-px w-10 bg-[#b7d9b7] dark:bg-[#4a7a4a]"></div>
                <p className="text-gray-200 text-sm uppercase tracking-wider font-light">{formattedDate}</p>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6">{title}</h1>
              <div className="relative z-30">
                <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-[#b7d9b7] dark:border-[#4a7a4a] text-white text-sm font-medium shadow-sm">
                  {type}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <article className="max-w-screen-md lg:max-w-[900px] w-full px-0 lg:px-8 -mt-10 md:-mt-16 relative z-30">
          <div className="bg-white/95 dark:bg-[#1c1c1c] backdrop-blur-sm border border-gray-100 dark:border-gray-800 rounded-lg p-6 md:p-12 shadow-sm">
            <section className="prose dark:prose-invert prose-headings:font-medium prose-h2:text-2xl prose-h3:text-xl prose-headings:tracking-tight prose-a:text-[#4a7a4a] dark:prose-a:text-[#b7d9b7] prose-a:no-underline prose-a:border-b prose-a:border-[#b7d9b7]/30 dark:prose-a:border-[#4a7a4a]/30 hover:prose-a:border-[#b7d9b7] dark:hover:prose-a:border-[#4a7a4a] prose-img:rounded-md prose-img:shadow-sm max-w-none prose-p:leading-relaxed">
              <CustomMDX source={fileContent} showAside={showAside} />
            </section>
            
            <div className="mt-16 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-wrap justify-between items-center gap-3">
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-[#b7d9b7] dark:bg-[#4a7a4a] rounded-full mr-2"></span>
                {type}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {formattedDate}
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
