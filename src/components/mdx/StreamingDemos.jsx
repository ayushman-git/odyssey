"use client";

import dynamic from "next/dynamic";

export const AdaptiveBitrateDemo = dynamic(
  () => import("../ArticleBased/StreamingTech/AdaptiveBitrateDemo"),
  { ssr: false }
);
export const PerTitleEncodingDemo = dynamic(
  () => import("../ArticleBased/StreamingTech/PerTitleEncodingDemo"),
  { ssr: false }
);
export const NetflixEncodingVersions = dynamic(
  () => import("../ArticleBased/StreamingTech/NetflixEncodingVersions"),
  { ssr: false }
);
export const NetflixOpenConnectFlow = dynamic(
  () => import("../ArticleBased/StreamingTech/NetflixOpenConnectFlow"),
  { ssr: false }
);
export const Totoro = dynamic(
  () => import("../ArticleBased/StreamingTech/Totoro"),
  { ssr: false }
);
