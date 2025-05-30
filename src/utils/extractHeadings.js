export function extractHeadingsFromMDX(content) {
  if (!content) return [];

  const regex = /^(#+)\s+(.*)$/gm;
  const matches = content.matchAll(regex);
  const headings = [];

  let currentHeading = { subheadings: [] };
  for (const match of matches) {
    const level = match[1].length; // Heading level based on the number of '#' symbols
    const text = match[2].trim();

    if (level === 1) {
      if (currentHeading.title) {
        headings.push({ ...currentHeading });
      }
      currentHeading = { title: text, subheadings: [] };
    } else if (level > 1 && currentHeading.title) {
      currentHeading.subheadings.push({ level, text });
    }
  }

  if (currentHeading.title) {
    headings.push({ ...currentHeading });
  }

  return headings;
}
