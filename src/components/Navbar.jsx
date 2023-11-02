"use client";

import { useState } from "react";
import SearchBox from "./SearchBox";

export default function Navbar() {
  const [searchString, setSearchString] = useState("");

  return (
    <div>
      <nav className="flex justify-between px-8 items-center py-4">
        <h1 className="font-black text-lg">Odyssey</h1>
        <SearchBox
          searchString={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </nav>
      <hr />
      <div className="absolute top-0 max-w-screen-lg">
        Hello
      </div>
    </div>
  );
}
