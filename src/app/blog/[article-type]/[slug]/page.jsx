import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { getArticle } from "@/lib/posts";
import { BLUR_DATA_URLS } from "@/data/constants";
import CustomMDX from "@/components/mdx/mdx-remote";
import AsideTitles from "@/components/AsideTitles";
import SocialShare from "@/components/SocialShare";
import { formatDateString, generatePageMetadata } from "@/utils/index.js";
import { extractHeadingsFromMDX } from "@/utils/extractHeadings";
import { Meow_Script } from "next/font/google";

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
  const shareUrl = `https://ayushman.dev/blog/${params['article-type']}/${params.slug}`;
  
  // Extract headings for table of contents
  const headings = showAside ? extractHeadingsFromMDX(fileContent) : [];
  
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
      
      {/* Editorial Header */}
      <section className="pt-0 relative w-full bg-white dark:bg-black">
        {/* Breadcrumb Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-6 pb-2">
          <nav className="flex items-center text-sm text-gray-500 dark:text-gray-400 min-w-0" aria-label="Breadcrumb">
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Link 
                href="/blog" 
                className="hover:text-black dark:hover:text-white transition-colors font-medium whitespace-nowrap"
              >
                Odyssey
              </Link>
              <svg className="w-3 h-3 opacity-40 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link 
                href={`/blog?filter=${encodeURIComponent(type)}`}
                className="hover:text-black dark:hover:text-white transition-colors font-medium capitalize flex-shrink-0 whitespace-nowrap"
              >
                {type}
              </Link>
              <svg className="w-3 h-3 opacity-40 flex-shrink-0 hidden sm:block" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-600 dark:text-gray-400 font-light truncate min-w-0 ml-1 sm:ml-2 hidden sm:inline">
              {title}
            </span>
          </nav>
        </div>

        {/* Magazine-style Header */}
        <div className="max-w-4xl mx-auto px-8 pt-12 pb-8">
          {/* Issue/Date Line */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-mono tracking-wider uppercase">
              <div className="h-px w-8 bg-current opacity-50" />
              <span>VOL. I — {new Date(date).getFullYear()}</span>
              <div className="h-px w-8 bg-current opacity-50" />
            </div>
          </div>

          {/* Article Type */}
          <div className="text-center mb-6">
            <span className="text-sm font-medium tracking-[0.2em] text-gray-600 dark:text-gray-400 uppercase">
              {type}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight mb-8 text-black dark:text-white">
            {title}
          </h1>

          {/* Author & Date */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-12 bg-gray-300 dark:bg-gray-600" />
              <div className="space-y-1">
                <p className="text-xs font-medium tracking-[0.1em] text-gray-500 dark:text-gray-400 uppercase">
                  Written by
                </p>
                <p className={`${meowScript.className} text-2xl text-black dark:text-white`}>
                  Ayushman
                </p>
              </div>
              <div className="h-px w-12 bg-gray-300 dark:bg-gray-600" />
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {formattedDate}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto px-8 mb-16">
          <div className="relative h-[50vh] md:h-[60vh] rounded-lg overflow-hidden shadow-2xl">
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
              className="transition-all duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-7xl mx-auto px-8 pb-20">
          <div className="flex gap-12 relative">
            {/* Left sidebar for table of contents */}
            <div className="hidden xl:block w-64 flex-shrink-0">
              {showAside && headings.length > 0 && <AsideTitles headings={headings} />}
            </div>
            
            {/* Main article content */}
            <article className="flex-1 max-w-4xl">
              {/* Main Content */}
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
                prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700">
                
                <CustomMDX source={fileContent} showAside={showAside} />
              </section>

              {/* Article Footer */}
              <footer className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
                {/* Social Share Section */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono mb-4">
                    <div className="h-px w-8 bg-current opacity-50" />
                    <span className="tracking-wider uppercase">Share this article</span>
                    <div className="h-px w-8 bg-current opacity-50" />
                  </div>
                  <SocialShare url={shareUrl} title={title} description={introduction} />
                </div>

                {/* Footer Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 pt-8 border-t border-gray-100 dark:border-gray-800/50">
                  {/* Article Metadata */}
                  <div className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                      <span className="font-mono uppercase tracking-wider">{type}</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
                    <span className="font-mono">{formattedDate}</span>
                  </div>

                  {/* Navigation */}
                  <Link 
                    href="/blog" 
                    className="group inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-mono tracking-wider uppercase">Back to Journal</span>
                  </Link>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
