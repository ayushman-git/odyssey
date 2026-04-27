import { describe, it, expect } from "vitest";
import { calculateReadingTime, formatReadingTime } from "./readingTime.js";

describe("calculateReadingTime", () => {
  it("returns 0 for empty content", () => {
    expect(calculateReadingTime("")).toBe(0);
    expect(calculateReadingTime(null)).toBe(0);
  });

  it("returns at least 1 minute for any non-trivial text after stripping MDX noise", () => {
    const mdx = `---
title: X
---
# Title

Some [link](https://a.b) and \`code\` and a ![img](i.jpg).

${"word ".repeat(400)}`;
    const minutes = calculateReadingTime(mdx);
    expect(minutes).toBeGreaterThanOrEqual(1);
  });
});

describe("formatReadingTime", () => {
  it("uses singular for one minute", () => {
    expect(formatReadingTime(1)).toBe("1 min read");
  });

  it("pluralizes minutes", () => {
    expect(formatReadingTime(3)).toBe("3 min read");
  });
});
