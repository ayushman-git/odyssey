import SearchResult from "./SearchResult";

export default function SearchResultList({ searchedArticles }) {
  return (
    <ul className="flex flex-col gap-4">
      {searchedArticles.map((item) => (
        <SearchResult detail={item} key={item.slug} />
      ))}
    </ul>
  );
}
