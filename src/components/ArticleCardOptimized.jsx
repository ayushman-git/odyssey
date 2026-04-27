import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils/index.js";
import { formatReadingTime } from "@/utils/readingTime";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split("-");
  const date = new Date(year, month - 1, day);
  const dayNum = parseInt(day, 10);
  const dayWithSuffix =
    dayNum + (["st", "nd", "rd"][((dayNum % 10) - 1)] || "th");
  const monthShort = date.toLocaleDateString("en-US", { month: "short" });
  const yearShort = year.slice(-2);
  return `${dayWithSuffix} ${monthShort}, ${yearShort}`;
};

// Server component version for better performance
export default function ArticleCard({ details, index }) {
  const indexStr = String(index ?? 1).padStart(2, "0");

  if (details.disabled) {
    return (
      <div className="group relative border border-gray-100 dark:border-gray-800 opacity-40 cursor-not-allowed h-full">
        <div className="aspect-[3/2] overflow-hidden border-b border-gray-100 dark:border-gray-800">
          {details.cover_img && (
            <Image
              src={details.cover_img}
              alt={`Cover image for article: ${details.title}`}
              width={500}
              height={333}
              className="w-full h-full object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URLS.COVER_IMG}
              loading="lazy"
            />
          )}
        </div>
        <div className="p-6 md:p-8">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
            In Development
          </span>
          <h3
            className={`${cormorant.className} mt-2 text-xl font-light leading-tight text-gray-400 dark:text-gray-600 line-clamp-2`}
          >
            {details.title}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/blog/${convertToSlug(details.type)}/${details.slug}`}
      className="group relative block border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-300 h-full"
    >
      {/* Article index badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 dark:text-gray-400 bg-white/85 dark:bg-black/80 backdrop-blur-sm px-2 py-0.5">
          {indexStr}
        </span>
      </div>

      <div className="aspect-[3/2] overflow-hidden border-b border-gray-200 dark:border-gray-700">
        {details.cover_img && (
          <Image
            src={details.cover_img}
            alt={`Cover image for article: ${details.title}`}
            width={500}
            height={333}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            loading="lazy"
          />
        )}
      </div>

      <div className="p-6 md:p-8">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200">
            {details.type}
          </span>
          <div className="flex items-center gap-2 text-[9px] font-mono text-gray-400 dark:text-gray-500">
            {details.readingTime && (
              <>
                <span>{formatReadingTime(details.readingTime)}</span>
                <span className="text-gray-300 dark:text-gray-600">&middot;</span>
              </>
            )}
            <span>{formatDate(details.date)}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`${cormorant.className} text-xl md:text-2xl font-light leading-[1.2] mb-3 text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200 line-clamp-2`}
        >
          {details.title}
        </h3>

        {details.introduction && (
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
            {details.introduction}
          </p>
        )}
      </div>
    </Link>
  );
}
