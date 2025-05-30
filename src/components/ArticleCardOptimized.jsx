import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils";

// Server component version for better performance
export default function ArticleCard({ details }) {
  // Early return for disabled articles
  if (details.disabled) {
    return (
      <div className="group relative border border-gray-200 bg-white hover:border-gray-400 transition-all duration-300 opacity-50 cursor-not-allowed">
        <div className="aspect-[3/2] overflow-hidden border-b border-gray-200">
          {details.cover_img && (
            <Image
              src={details.cover_img}
              alt={details.title}
              width={500}
              height={333}
              className="w-full h-full object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URLS.COVER_IMG}
              loading="lazy"
            />
          )}
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span className="text-xs uppercase tracking-widest text-gray-400 font-mono">
                {details.type}
              </span>
            </div>
            <span className="text-xs text-gray-400 font-mono">In Development</span>
          </div>
          <h3 className="text-xl font-light leading-tight mb-4 text-gray-400 line-clamp-2">
            {details.title}
          </h3>
          {details.introduction && (
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 font-light">
              {details.introduction}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Format date from DD-MM-YYYY to Month DD, YYYY
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric'
    });
  };

  return (
    <Link 
      href={`/blog/${convertToSlug(details.type)}/${details.slug}`}
      className="group relative block border border-gray-200 bg-white hover:border-black transition-all duration-300"
    >
      <div className="aspect-[3/2] overflow-hidden border-b border-gray-200">
        {details.cover_img && (
          <Image
            src={details.cover_img}
            alt={details.title}
            width={500}
            height={333}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            loading="lazy"
          />
        )}
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <span className="text-xs uppercase tracking-widest text-gray-600 font-mono group-hover:text-black transition-colors">
              {details.type}
            </span>
          </div>
          <span className="text-xs text-gray-500 font-mono">{formatDate(details.date)}</span>
        </div>
        <h3 className="text-xl font-light leading-tight mb-4 text-black group-hover:text-gray-700 transition-colors line-clamp-2">
          {details.title}
        </h3>
        {details.introduction && (
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-light">
            {details.introduction}
          </p>
        )}
        
        {/* Corner decoration */}
        <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-gray-300 group-hover:border-black transition-colors duration-300"></div>
      </div>
    </Link>
  );
}
