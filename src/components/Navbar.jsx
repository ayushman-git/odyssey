"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBox from "./SearchBox";
import SearchResultList from "./SearchResultList";
import Link from "next/link";
import { fetchSearchedArticles } from "@/api/search";
import useDebounce from "@/hooks/useDebounce";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const [searchString, setSearchString] = useState("");
  const [searchedArticles, setSearchedArticles] = useState([]);

  const fetchSearchResult = async () => {
    const result = await fetchSearchedArticles(searchString);
    setSearchedArticles(result);
  };

  useDebounce(fetchSearchResult, [searchString], 500);

  useEffect(() => {
    resetState();
  }, [path]);

  const resetState = () => {
    setSearchString("");
    setSearchedArticles([]);
  };

  const showSearchResult = useMemo(() => {
    return searchedArticles.length > 0 && searchString;
  }, [searchString, searchedArticles]);

  return (
    <div className="relative z-50">
      <div className="flex justify-between px-8 items-center py-4">
        <Link href="/" className="font-black text-lg" onClick={resetState}>
          Odyssey
        </Link>
        <SearchBox
          searchString={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </div>
      <hr className="border-t-[1px] border-gray-700" />
      {showSearchResult && (
        <div className="absolute max-w-screen-lg w-full bg-gray-100 p-8 rounded-b-xl z-100">
          <SearchResultList searchedArticles={searchedArticles} />
        </div>
      )}
    </div>
  );
}
