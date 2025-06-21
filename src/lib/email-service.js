// Dynamic email service that fetches latest articles and generates emails
import { getArticles } from '@/lib/posts';
import { generateWelcomeEmailTemplate } from './email-templates/welcome';

/**
 * Get the latest articles for email inclusion
 * @param {number} limit - Number of articles to fetch (default: 3)
 * @returns {Array} Array of article objects
 */
export const getLatestArticlesForEmail = (limit = 3) => {
  try {
    const allArticles = getArticles();
    
    // Filter out disabled articles and get the latest ones
    const activeArticles = allArticles
      .filter(article => !article.disabled && !article.hidden)
      .slice(0, limit);
    
    return activeArticles;
  } catch (error) {
    console.error('Error fetching articles for email:', error);
    return [];
  }
};

/**
 * Generate welcome email with dynamic content
 * @param {string} recipientEmail - The recipient's email address
 * @returns {Object} Email template object with html and text content
 */
export const generateDynamicWelcomeEmail = (recipientEmail) => {
  try {
    // Fetch latest articles
    const latestArticles = getLatestArticlesForEmail(3);
    
    // Generate email template with articles
    const emailTemplate = generateWelcomeEmailTemplate(latestArticles);
    
    return {
      success: true,
      template: emailTemplate,
      articlesIncluded: latestArticles.length,
      recipientEmail
    };
  } catch (error) {
    console.error('Error generating dynamic welcome email:', error);
    
    // Fallback to template without articles
    const fallbackTemplate = generateWelcomeEmailTemplate([]);
    
    return {
      success: false,
      error: error.message,
      template: fallbackTemplate,
      articlesIncluded: 0,
      recipientEmail
    };
  }
};

/**
 * Email template configurations
 */
export const EMAIL_CONFIG = {
  from: {
    name: 'Odyssey Newsletter',
    email: 'newsletter@me.ayushman.dev'
  },
  subjects: {
    welcome: 'Welcome to Odyssey Newsletter! 🚀'
  },
  baseUrl: 'https://ayushman.dev'
};
