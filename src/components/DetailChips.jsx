"use client";

import { formatDateString } from "@/utils";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";
import BaseChip from "./BaseChip";

export default function DetailChips({ type, date }) {
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
  return (
    <header className="flex gap-2 my-3">
      <BaseChip label={type} color="primary" />
      <BaseChip label={`${formatDateString(date)}`} variant="outlined" />
      {timeToRead > 0 && (
        <BaseChip
          label={`${Math.round(timeToRead)} min read`}
          variant="outlined"
        />
      )}
    </header>
  );
}
