"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBox from "./SearchBox";
import SearchResultList from "./SearchResultList";
import Link from "next/link";
import { fetchSearchedArticles } from "@/api/search";
import useDebounce from "@/hooks/useDebounce";

export default function Navbar() {
  const [searchString, setSearchString] = useState("");
  const [searchedArticles, setSearchedArticles] = useState([]);

  const fetchSearchResult = async () => {
    const result = await fetchSearchedArticles(searchString);
    setSearchedArticles(result);
  };

  useDebounce(fetchSearchResult, [searchString], 500);

  const showSearchResult = useMemo(() => {
    return searchedArticles.length > 0 && searchString;
  }, [searchString, searchedArticles]);

  return (
    <div>
      <nav className="flex justify-between px-8 items-center py-4">
        <Link href="/" className="font-black text-lg">
          Odyssey
        </Link>
        <SearchBox
          searchString={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </nav>
      <hr />
      {showSearchResult && (
        <div className="absolute max-w-screen-lg w-full bg-gray-100 p-8 rounded-b-xl z-100">
          <SearchResultList searchedArticles={searchedArticles} />
        </div>
      )}
    </div>
  );
}
