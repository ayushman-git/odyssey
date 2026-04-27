import { describe, it, expect, vi } from "vitest";
import { GET } from "./route.js";

vi.mock("@/lib/posts", () => ({
  getArticles: () => [
    {
      id: "sample",
      slug: "sample",
      title: "Sample article",
      type: "article",
      date: "15-01-2025",
      disabled: false,
      readingTime: 2,
    },
  ],
}));

describe("GET /api/articles", () => {
  it("returns JSON with article metadata", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveLength(1);
    expect(data[0]).toMatchObject({ slug: "sample", title: "Sample article" });
  });
});
