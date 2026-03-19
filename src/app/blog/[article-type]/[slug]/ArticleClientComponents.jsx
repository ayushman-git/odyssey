"use client";

import dynamic from "next/dynamic";

export const TableOfContents = dynamic(
  () => import("@/components/TableOfContents"),
  { ssr: false }
);
export const SocialShare = dynamic(
  () => import("@/components/SocialShare"),
  { ssr: false }
);
export const ReadProgressBar = dynamic(
  () => import("@/components/ReadProgressBar"),
  { ssr: false }
);
export const ViewCounter = dynamic(
  () => import("@/components/ViewCounter"),
  { ssr: false }
);
