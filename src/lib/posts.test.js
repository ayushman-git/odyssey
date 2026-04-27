import { describe, it, expect, afterEach } from "vitest";
import { getArticles, getArticleTypes, clearArticlesCache } from "./posts.js";

afterEach(() => {
  clearArticlesCache();
});

describe("getArticles", () => {
  it("returns a non-empty list from src/content, each with required fields", () => {
    const articles = getArticles();
    expect(articles.length).toBeGreaterThan(0);
    for (const a of articles) {
      expect(a).toMatchObject({
        slug: expect.any(String),
        title: expect.any(String),
        type: expect.any(String),
        date: expect.any(String),
        readingTime: expect.any(Number),
      });
    }
  });

  it("orders newest first by date", () => {
    const articles = getArticles();
    if (articles.length < 2) {
      return;
    }
    const d = (s) => {
      const [day, month, year] = s.split("-");
      return new Date(`${year}-${month}-${day}T00:00:00Z`).getTime();
    };
    for (let i = 0; i < articles.length - 1; i++) {
      expect(d(articles[i].date)).toBeGreaterThanOrEqual(
        d(articles[i + 1].date)
      );
    }
  });
});

describe("getArticleTypes", () => {
  it("returns All and unique type strings", () => {
    const types = getArticleTypes();
    expect(types[0]).toBe("All");
    const rest = types.slice(1);
    expect(new Set(rest).size).toBe(rest.length);
  });
});
