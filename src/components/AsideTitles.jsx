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
              <li className="my-2">{item.title}</li>
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
      <ul className="text-xs">{renderAsideList(headings)}</ul>
    </aside>
  );
}
