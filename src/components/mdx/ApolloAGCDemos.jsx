"use client";

import dynamic from "next/dynamic";

export const AGCMemoryMap = dynamic(
  () => import("../ArticleBased/ApolloAGC/AGCMemoryMap"),
  { ssr: false }
);

export const Alarm1202Simulator = dynamic(
  () => import("../ArticleBased/ApolloAGC/Alarm1202Simulator"),
  { ssr: false }
);

export const DSKYPanel = dynamic(
  () => import("../ArticleBased/ApolloAGC/DSKYPanel"),
  { ssr: false }
);

export const AGCClockComparison = dynamic(
  () => import("../ArticleBased/ApolloAGC/AGCClockComparison"),
  { ssr: false }
);
