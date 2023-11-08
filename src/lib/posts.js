import fs from "fs";
import path, { parse } from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "src", "content");

export function getArticles() {
  const fileNames = fs.readdirSync(articlesDir);
  const allArticlesData = fileNames.map((file) => {
    console.log({ file });
    const fileName = file.replace(/\.mdx$/, "");
    const fullPath = path.join(articlesDir, file);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const parsedMatter = matter(fileContent);
    console.log({ parsedMatter });
    return {
      fileName,
      ...parsedMatter.data,
    };
  });
  return allArticlesData;
}
