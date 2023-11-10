"use client";

import { formatDateString } from "@/utils";
import { useEffect, useState } from "react";
import BaseChip from "./BaseChip";
import { AiFillClockCircle } from "react-icons/ai";
import { BiSolidCalendarAlt } from "react-icons/bi";

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
    <header className="flex gap-3 my-3">
      <BaseChip
        sx={{ backgroundColor: "black" }}
        label={type}
        color="primary"
      />
      <BaseChip
        icon={<BiSolidCalendarAlt color="#000" size={16} />}
        label={`${formatDateString(date)}`}
        variant="outlined"
      />
      {timeToRead > 0 && (
        <BaseChip
          icon={<AiFillClockCircle color="#000" size={16} />}
          label={`${Math.round(timeToRead)} min read`}
          variant="outlined"
        />
      )}
    </header>
  );
}
