/**
 * Calculate reading time for MDX content
 * @param {string} content - The MDX content to analyze
 * @returns {number} - Estimated reading time in minutes
 */
export function calculateReadingTime(content) {
  if (!content) return 0;

  // Remove MDX/JSX components and frontmatter
  const cleanContent = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/<[^>]*>/g, '') // Remove HTML/JSX tags
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links (keep text only)
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/[*_~]/g, '') // Remove markdown formatting
    .trim();

  // Count words (split by whitespace and filter empty strings)
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  // Average reading speed: 200-250 words per minute
  // Using 225 as a middle ground
  const wordsPerMinute = 225;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Return at least 1 minute
  return Math.max(1, readingTime);
}

/**
 * Format reading time for display
 * @param {number} minutes - Reading time in minutes
 * @returns {string} - Formatted reading time string
 */
export function formatReadingTime(minutes) {
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}
