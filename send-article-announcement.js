#!/usr/bin/env node

/**
 * Script to send an email announcement for the latest published article
 * Usage: node send-article-announcement.js
 * 
 * This script:
 * 1. Fetches the latest published article
 * 2. Generates an email announcement
 * 3. Sends it to the specified test email
 */

import { Resend } from 'resend';
import { generateArticleAnnouncementTemplate } from './src/lib/email-templates/article-announcement.js';
import { getArticles } from './src/lib/posts.js';
import { EMAIL_CONFIG } from './src/lib/email-service.js';

const resend = new Resend(process.env.RESEND_KEY);

// Test email recipient
const TEST_EMAIL = 'ayushman.gupta308@gmail.com';

/**
 * Get the latest published article
 */
function getLatestArticle() {
  try {
    const articles = getArticles();
    
    // Filter out disabled articles and get the latest one
    const activeArticles = articles.filter(article => !article.disabled && !article.hidden);
    
    if (activeArticles.length === 0) {
      throw new Error('No active articles found');
    }
    
    return activeArticles[0]; // Articles are already sorted by date (newest first)
  } catch (error) {
    console.error('Error fetching latest article:', error);
    throw error;
  }
}

/**
 * Send the article announcement email
 */
async function sendArticleAnnouncement() {
  try {
    console.log('🚀 Starting article announcement email process...\n');
    
    // Get the latest article
    console.log('📖 Fetching latest article...');
    const latestArticle = getLatestArticle();
    
    console.log(`✅ Found latest article: "${latestArticle.title}"`);
    console.log(`   - Date: ${latestArticle.date}`);
    console.log(`   - Type: ${latestArticle.type || 'article'}`);
    console.log(`   - Slug: ${latestArticle.slug}\n`);
    
    // Generate email template
    console.log('🎨 Generating email template...');
    const emailTemplate = generateArticleAnnouncementTemplate(latestArticle);
    console.log('✅ Email template generated\n');
    
    // Send the email
    console.log(`📧 Sending email to: ${TEST_EMAIL}`);
    const { data, error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.from.name} <${EMAIL_CONFIG.from.email}>`,
      to: [TEST_EMAIL],
      subject: `📝 New Article: ${latestArticle.title}`,
      html: emailTemplate.html,
      text: emailTemplate.text
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      throw error;
    }

    console.log('✅ Email sent successfully!');
    console.log(`📬 Email ID: ${data.id}`);
    console.log(`🔗 Article URL: https://ayushman.dev/blog/${latestArticle.slug}`);
    
    return {
      success: true,
      emailId: data.id,
      article: latestArticle
    };
    
  } catch (error) {
    console.error('❌ Failed to send article announcement:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('📧 ODYSSEY ARTICLE ANNOUNCEMENT EMAILER');
  console.log('='.repeat(60));
  
  try {
    // Check if RESEND_KEY is configured
    if (!process.env.RESEND_KEY) {
      throw new Error('RESEND_KEY environment variable is not set');
    }
    
    const result = await sendArticleAnnouncement();
    
    if (result.success) {
      console.log('\n' + '✅'.repeat(20));
      console.log('🎉 ARTICLE ANNOUNCEMENT SENT SUCCESSFULLY!');
      console.log('✅'.repeat(20));
      process.exit(0);
    } else {
      console.log('\n' + '❌'.repeat(20));
      console.log('💥 FAILED TO SEND ANNOUNCEMENT');
      console.log('❌'.repeat(20));
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n💥 Script execution failed:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
