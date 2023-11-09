import { getArticles } from "@/lib/posts";

const Fuse = require("fuse.js");

export function searchArticles(searchString) {
  const fuseOptions = {
    keys: ["title", "type"],
  };
  const articles = getArticles();
  const fuse = new Fuse(articles, fuseOptions);

  return fuse.search(searchString);
}
