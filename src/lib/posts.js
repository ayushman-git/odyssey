import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "src", "content");

const sortArticles = (articles) => {
  return articles.sort((a, b) => {
    const prevDate = a.date.split("-");
    const nextDate = b.date.split("-");

    const prevDateObj = new Date(prevDate[2], prevDate[1] - 1, prevDate[0]);
    const nextDateObj = new Date(nextDate[2], nextDate[1] - 1, nextDate[0]);
    console.log(prevDateObj, nextDateObj);

    if(prevDateObj > nextDateObj) return -1
    if(prevDateObj < nextDateObj) return 1
    return 0
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
      fileName,
      ...parsedMatter.data,
    };
  });
  return sortArticles(allArticlesData);
}
