"use client";

import Script from "next/script";

export default function SchemaMarkup({ data, id }) {
  return (
    <Script
      id={id || "schema-markup"}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
      strategy="afterInteractive"
    />
  );
}
