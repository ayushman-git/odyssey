import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import CustomMDX from "@/components/mdx/mdx-remote";

const articlesDir = path.join(process.cwd(), "src", "content");

const sortArticles = (articles) => {
  return articles.sort((a, b) => {
    const prevDate = a.date.split("-");
    const nextDate = b.date.split("-");

    const prevDateObj = new Date(prevDate[2], prevDate[1] - 1, prevDate[0]);
    const nextDateObj = new Date(nextDate[2], nextDate[1] - 1, nextDate[0]);

    if (prevDateObj > nextDateObj) return -1;
    if (prevDateObj < nextDateObj) return 1;
    return 0;
  });
};

export function getArticles() {
  const fileNames = fs.readdirSync(articlesDir);
  const allArticlesData = fileNames.map((file) => {
    const fileName = file.replace(/\.mdx$/, "");
    const fullPath = path.join(articlesDir, file);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const parsedMatter = matter(fileContent);
    return {
      slug: fileName,
      ...parsedMatter.data,
    };
  });
  return sortArticles(allArticlesData);
}

export async function getArticle(slug) {
  const file = path.join(articlesDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(file, "utf-8");
  const parsedMatter = matter(fileContent);

  return {
    slug,
    ...parsedMatter.data,
    fileContent,
  };
}
