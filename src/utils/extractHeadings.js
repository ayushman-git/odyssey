export function extractHeadingsFromMDX(content) {
  if (!content) return [];

  const regex = /^(#+)\s+(.*)$/gm;
  const matches = content.matchAll(regex);
  const headings = [];

  for (const match of matches) {
    const level = match[1].length; // Heading level based on the number of '#' symbols
    const text = match[2].trim();

    // Only include H1, H2, and H3 headings
    if (level <= 3) {
      // Use the same ID generation logic as underscoreDelimiter in utils/index.js
      const id = text.toLowerCase().replaceAll(" ", "_");

      headings.push({
        level,
        text,
        id
      });
    }
  }

  return headings;
}
