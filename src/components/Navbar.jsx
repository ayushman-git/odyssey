"use client";

import { useState } from "react";
import SearchBox from "./SearchBox";
import SearchResultList from "./SearchResultList";
import Link from "next/link";

export default function Navbar() {
  const [searchString, setSearchString] = useState("");

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
      {searchString && (
        <div className="absolute bototm-0 max-w-screen-lg  w-full bg-gray-100 p-8 rounded-b-xl">
          <SearchResultList />
        </div>
      )}
    </div>
  );
}
