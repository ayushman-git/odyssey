"use client";

import { useEffect, useState } from "react";

export default function TimeToRead() {
  const [timeToRead, setTimeToRead] = useState(0);

  useEffect(() => {
    const time = getTimeToRead();
    setTimeToRead(time);
  }, []);
  const wordsPresentInOpenPage = () => {
    return document.body.innerText
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  const getTimeToRead = () => {
    const words = wordsPresentInOpenPage();
    const AVERAGE_WORDS_PER_MIN = 250;
    const TECHNICAL_ARTICLE_MULIPLIER = 0.7;

    return words / (AVERAGE_WORDS_PER_MIN * TECHNICAL_ARTICLE_MULIPLIER);
  };
  return <h3>{Math.round(timeToRead)} min read</h3>;
}
