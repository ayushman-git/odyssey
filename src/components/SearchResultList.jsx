import SearchResult from "./SearchResult";

export default function SearchResultList() {
  return (
    <ul className="flex flex-col gap-4">
      <SearchResult />
      <SearchResult />
      <SearchResult />
    </ul>
  );
}
