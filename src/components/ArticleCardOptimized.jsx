import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URLS } from "@/data/constants";
import { convertToSlug } from "@/utils";

// Server component version for better performance
export default function ArticleCard({ details }) {
  // Early return for disabled articles
  if (details.disabled) {
    return (
      <div className="w-full h-full border rounded-3xl overflow-hidden opacity-50 cursor-not-allowed">      <div className="relative overflow-hidden w-full">
        {details.cover_img && (
          <Image
            src={details.cover_img}
            alt={details.title}
            width={400}
            height={200}
            className="object-cover aspect-video w-full"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            loading="lazy"
          />
        )}
      </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {details.type}
            </span>
            <span className="text-xs text-gray-500">In the Works</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-600">{details.title}</h3>
          {details.introduction && (
            <p className="text-gray-500 text-sm line-clamp-3">{details.introduction}</p>
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
      href={`/blog/${convertToSlug(details.title)}`}
      className="block w-full h-full border rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden w-full">
        {details.cover_img && (
          <Image
            src={details.cover_img}
            alt={details.title}
            width={400}
            height={200}
            className="object-cover aspect-video w-full group-hover:scale-105 transition-transform duration-300"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URLS.COVER_IMG}
            loading="lazy"
          />
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {details.type}
          </span>
          <span className="text-xs text-gray-500">{formatDate(details.date)}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
          {details.title}
        </h3>
        {details.introduction && (
          <p className="text-gray-600 text-sm line-clamp-3">{details.introduction}</p>
        )}
      </div>
    </Link>
  );
}
