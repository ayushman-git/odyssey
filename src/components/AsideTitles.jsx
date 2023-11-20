"use client";

import { underscoreDelimiter } from "@/utils";

export default function AsideTitles({ headings }) {
  const renderAsideList = (list) => {
    return list.map((item) => {
      return (
        <>
          {item.title && (
            <a
              className="text-gray-500 "
              href={`#${underscoreDelimiter(item.title)}`}
            >
              <li className="my-3">{item.title}</li>
            </a>
          )}
          {item.subheadings &&
            item.subheadings.length > 0 &&
            renderAsideList(item.subheadings)}
        </>
      );
    });
  };

  return (
    <aside className="sticky top-10 w-60 -ml-72 h-0 bottom-24">
        <h3 className="font-black mb-3">Table of Contents</h3>
        <hr className="mb-6" />
      <ul className="text-sm">{renderAsideList(headings)}</ul>
    </aside>
  );
}
