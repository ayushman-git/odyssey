export default function SearchResult({ detail }) {
  return (
    <li className="flex items-center cursor-pointer">
      <span>{detail.title}</span>
      <div className="w-1 h-1 bg-black rounded-full mx-4"></div>
      <span className="uppercase tracking-widest text-xs text-gray-500">
        {detail.type}
      </span>
    </li>
  );
}
