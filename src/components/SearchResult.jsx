import Link from "next/link";

export default function SearchResult({ detail }) {
  return (
    <Link
      href={`/articles/${detail.slug}`}
      className="flex items-center cursor-pointer"
    >
      <span>{detail.title}</span>
      <div className="w-1 h-1 bg-black rounded-full mx-4"></div>
      <span className="uppercase tracking-widest text-xs text-gray-500">
        {detail.type}
      </span>
    </Link>
  );
}
