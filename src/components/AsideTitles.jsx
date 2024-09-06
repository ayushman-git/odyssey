"use client";

import { underscoreDelimiter } from "@/utils";
import { Fragment, useEffect, useState } from "react";

export default function AsideTitles({ headings }) {
  const [currentSectionInView, setCurrentSectionInView] = useState(null);

  const handleIntersection = (entries, observer, id) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setCurrentSectionInView(id);
      }
    });
  };

  useEffect(() => {
    headings.forEach(({ title }) => {
      const id = underscoreDelimiter(title);
      const headingElement = document.getElementById(id);
      const headingWrapperElement = headingElement.parentElement;

      const observer = new IntersectionObserver(
        (entries, observer) => handleIntersection(entries, observer, id),
        {
          threshold: 0.5,
        }
      );

      observer.observe(headingWrapperElement);
    });
  }, []);

  const renderAsideList = (list) => {
    return list.map((item) => {
      return (
        <Fragment key={item.title}>
          {item.title && (
            <a
              className={currentSectionInView === underscoreDelimiter(item.title) ? `text-blue-500 font-bold` : `text-gray-500`}
              href={`#${underscoreDelimiter(item.title)}`}
            >
              <li className="my-3">{item.title}</li>
            </a>
          )}
        </Fragment>
      );
    });
  };

  return (
    <aside className="sticky top-32 w-60 -ml-72 h-0">
      <h3 className="font-black mb-3">Table of Contents</h3>
      <hr className="mb-6" />
      <ul className="text-sm">{renderAsideList(headings)}</ul>
    </aside>
  );
}
