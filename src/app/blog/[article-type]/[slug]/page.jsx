import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getArticle, getArticles } from "@/lib/posts";
import { BLUR_DATA_URLS } from "@/data/constants";
import CustomMDX from "@/components/mdx/mdx-remote";
import { formatDateString, generatePageMetadata } from "@/utils/index.js";
import { extractHeadingsFromMDX } from "@/utils/extractHeadings";
import { formatReadingTime } from "@/utils/readingTime";
import { Meow_Script } from "next/font/google";
import {
  TableOfContents,
  SocialShare,
  ReadProgressBar,
  ViewCounter,
} from "./ArticleClientComponents";

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  const articles = getArticles();
  return articles
    .filter((a) => !a.disabled)
    .map((a) => ({ 'article-type': a.type, slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug, 'article-type': articleType } = await params;
  const { title, cover_img, introduction, date } = await getArticle(slug);

  return generatePageMetadata({
    title,
    description: introduction || `Read ${title} by Ayushman Gupta on Odyssey blog.`,
    image: cover_img,
    type: 'article',
    url: `/blog/${articleType}/${slug}`,
    date
  });
}

export default async function Page({ params }) {
  const { slug, 'article-type': articleType } = await params;
  const { title, cover_img, type, fileContent, date, showAside, introduction, readingTime } =
    await getArticle(slug);
  const formattedDate = formatDateString(date);
  const shareUrl = `https://ayushman.dev/blog/${articleType}/${slug}`;

  const headings = showAside ? extractHeadingsFromMDX(fileContent) : [];
  const usesStreamingDemos =
    fileContent.includes("<AdaptiveBitrateDemo") ||
    fileContent.includes("<PerTitleEncodingDemo") ||
    fileContent.includes("<NetflixEncodingVersions") ||
    fileContent.includes("<NetflixOpenConnectFlow") ||
    fileContent.includes("<Totoro");

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
      <ReadProgressBar />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd)
        }}
      />

      <div className="w-full">
        {/* Full-bleed Hero */}
        <div className="relative w-full h-[72vh] min-h-[440px] max-h-[740px] overflow-hidden">
          {/* Floating breadcrumb */}
          <div className="absolute top-0 left-0 right-0 z-20 pt-6">
            <div className="max-w-3xl mx-auto px-6 sm:px-8">
              <nav
                className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-white/50"
                aria-label="Breadcrumb"
              >
                <Link href="/blog" className="hover:text-white/90 transition-colors">
                  Odyssey
                </Link>
                <span className="opacity-30">/</span>
                <Link
                  href={`/blog?filter=${encodeURIComponent(type)}`}
                  className="hover:text-white/90 transition-colors capitalize"
                >
                  {type}
                </Link>
              </nav>
            </div>
          </div>

          {/* Cover Image */}
          <Image
            src={cover_img}
            quality={85}
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            alt={`Cover image for article: ${title}`}
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />

          {/* Gradient: subtle dark vignette + strong bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />

          {/* Title block anchored to the bottom of the hero */}
          <div className="absolute bottom-0 left-0 right-0 pb-10 sm:pb-14">
            <div className="max-w-3xl mx-auto px-6 sm:px-8">
              {/* Article type tag */}
              <span className="inline-block mb-5 text-[10px] font-mono tracking-[0.22em] uppercase text-white/50 border border-white/20 px-2.5 py-1 rounded-[2px]">
                {type}
              </span>

              {/* Title */}
              <h1 className="text-white text-[clamp(1.75rem,5vw,3.5rem)] font-light tracking-tight leading-[1.1] mb-6 max-w-3xl">
                {title}
              </h1>

              {/* Author + metadata row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-px bg-white/30" />
                  <p className={`${meowScript.className} text-[1.15rem] text-white/80 leading-none`}>
                    Ayushman
                  </p>
                </div>
                <div className="w-px h-3.5 bg-white/20 hidden sm:block" />
                <span className="text-[11px] font-mono text-white/45 tracking-wide">
                  {formattedDate}
                </span>
                {readingTime && (
                  <>
                    <div className="w-px h-3.5 bg-white/20 hidden sm:block" />
                    <span className="text-[11px] font-mono text-white/45 tracking-wide">
                      {formatReadingTime(readingTime)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="bg-white dark:bg-black">
          <div className="max-w-3xl mx-auto px-6 sm:px-8">

            {/* Slim metadata + share bar */}
            <div className="flex items-center justify-between py-5 border-b border-gray-100 dark:border-gray-800/60 mb-12">
              <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-gray-400 dark:text-gray-500 uppercase select-none">
                <span>Vol. I</span>
                <span className="opacity-30">·</span>
                <ViewCounter slug={slug} />
              </div>
              <SocialShare url={shareUrl} title={title} description={introduction} />
            </div>

            {/* Table of Contents */}
            {showAside && headings.length > 0 && (
              <TableOfContents headings={headings} />
            )}

            {/* Main article */}
            <article className="w-full pb-20">
              <section
                id="article-content"
                className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-light prose-headings:tracking-tight
                prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
                prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
                prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
                prose-p:mb-6 prose-p:font-light prose-p:text-lg
                prose-a:text-black dark:prose-a:text-white prose-a:no-underline
                prose-a:border-b prose-a:border-gray-300 dark:prose-a:border-gray-600
                hover:prose-a:border-black dark:hover:prose-a:border-white
                prose-blockquote:border-l-2 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
                prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:font-light
                prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700"
              >
                <CustomMDX
                  source={fileContent}
                  showAside={showAside}
                  usesStreamingDemos={usesStreamingDemos}
                />
              </section>

              {/* Article footer */}
              <footer className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800/60">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <Link
                    href="/blog"
                    className="group inline-flex items-center gap-2.5 text-[11px] font-mono tracking-widest text-gray-400 hover:text-black dark:hover:text-white transition-colors uppercase"
                  >
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Odyssey
                  </Link>

                  <div className="flex items-center gap-3 text-[11px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                    <span className="capitalize">{type}</span>
                    <span className="opacity-30">·</span>
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
