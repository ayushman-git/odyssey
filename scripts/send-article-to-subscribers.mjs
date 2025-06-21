#!/usr/bin/env node

/**
 * Send a new article email to all newsletter subscribers.
 * Features:
 * - Rate limiting to respect Resend's 2 req/sec limit
 * - Batch processing for better performance
 * - Email validation to filter out test/invalid domains
 * - Dry run mode for testing
 * - Better error handling and progress tracking
 * 
 * Usage: 
 *   node send-article-to-subscribers.js path/to/article.mdx
 *   node send-article-to-subscribers.js path/to/article.mdx --dry-run
 */
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Load environment variables from .env.local file
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { generateArticleAnnouncementTemplate } from '../src/lib/email-templates/article-announcement.mjs';

const EMAIL_CONFIG = {
  from: {
    name: 'Odyssey Newsletter',
    email: 'newsletter@me.ayushman.dev'
  },
  subjects: {
    welcome: 'Welcome to Odyssey Newsletter! 🚀'
  },
  baseUrl: 'https://ayushman.dev'
};
const resend = new Resend(process.env.RESEND_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function parseArticle(filePath) {
  const fullPath = path.resolve(filePath);
  const mdx = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(mdx);
  const slug = path.basename(filePath).replace(/\.mdx$/, '');
  return { slug, ...data };
}

async function getActiveSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('email')
    .eq('unsubscribed', false)
    .eq('bounced', false);

  if (error) {
    throw new Error('Failed to fetch subscribers: ' + error.message);
  }
  
  // Filter out test/invalid emails
  const validEmails = data
    .map((row) => row.email)
    .filter(email => {
      // Basic email validation and filter out common test domains
      const testDomains = ['example.com', 'test.com', 'fef.fe'];
      const domain = email.split('@')[1];
      return email.includes('@') && !testDomains.includes(domain);
    });
  
  return validEmails;
}

async function sendToSubscribers(article, subscribers, dryRun = false) {
  const template = generateArticleAnnouncementTemplate(article);
  const BATCH_SIZE = 10; // Process emails in batches
  const DELAY_BETWEEN_EMAILS = 600; // 600ms delay = ~1.6 emails per second (under 2/sec limit)
  const DELAY_BETWEEN_BATCHES = 2000; // 2 second delay between batches
  
  let successCount = 0;
  let failureCount = 0;
  const failures = [];

  if (dryRun) {
    console.log(`\n🧪 DRY RUN MODE - No emails will be sent`);
    console.log(`Would send to ${subscribers.length} subscribers:`);
    subscribers.forEach((email, index) => {
      console.log(`  ${index + 1}. ${email}`);
    });
    return { successCount: subscribers.length, failureCount: 0, failures: [] };
  }

  console.log(`\nSending emails in batches of ${BATCH_SIZE} with rate limiting...`);
  
  // Process subscribers in batches
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(subscribers.length / BATCH_SIZE);
    
    console.log(`\nProcessing batch ${batchNumber}/${totalBatches} (${batch.length} emails)...`);
    
    // Process each email in the batch with delay
    for (const email of batch) {
      try {
        const { error } = await resend.emails.send({
          from: `${EMAIL_CONFIG.from.name} <${EMAIL_CONFIG.from.email}>`,
          to: [email],
          subject: `📝 New Article: ${article.title}`,
          html: template.html,
          text: template.text,
        });

        if (error) {
          console.error(`✗ Failed to send to ${email}:`, error.message);
          failureCount++;
          failures.push({ email, error: error.message });
        } else {
          console.log(`✓ Email sent to ${email}`);
          successCount++;
        }
      } catch (error) {
        console.error(`✗ Unexpected error sending to ${email}:`, error.message);
        failureCount++;
        failures.push({ email, error: error.message });
      }
      
      // Add delay between emails to respect rate limits
      if (batch.indexOf(email) < batch.length - 1) {
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_EMAILS));
      }
    }
    
    // Add longer delay between batches
    if (i + BATCH_SIZE < subscribers.length) {
      console.log(`Waiting ${DELAY_BETWEEN_BATCHES/1000}s before next batch...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES));
    }
  }
  
  // Summary
  console.log(`\n📊 Email sending summary:`);
  console.log(`✓ Successfully sent: ${successCount}`);
  console.log(`✗ Failed to send: ${failureCount}`);
  
  if (failures.length > 0) {
    console.log(`\n❌ Failed emails:`);
    failures.forEach(({ email, error }) => {
      console.log(`  - ${email}: ${error}`);
    });
  }
  
  return { successCount, failureCount, failures };
}

async function main() {
  const args = process.argv.slice(2);
  const mdxPath = args.find(arg => !arg.startsWith('--'));
  const dryRun = args.includes('--dry-run') || args.includes('--dry');
  
  if (!mdxPath) {
    console.error('Usage: node send-article-to-subscribers.js <path-to-mdx> [--dry-run]');
    console.error('Options:');
    console.error('  --dry-run, --dry    Show what would be sent without actually sending emails');
    process.exit(1);
  }

  if (!process.env.RESEND_KEY || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing environment configuration');
    process.exit(1);
  }

  try {
    console.log('🚀 Starting newsletter sending process...\n');
    
    const article = parseArticle(mdxPath);
    console.log(`📰 Article: "${article.title}"`);
    console.log(`📅 Date: ${article.date || 'No date specified'}`);
    console.log(`📝 Description: ${article.description || 'No description'}\n`);

    const subscribers = await getActiveSubscribers();
    console.log(`👥 Found ${subscribers.length} valid active subscribers`);
    
    if (subscribers.length === 0) {
      console.log('No subscribers to send to. Exiting.');
      return;
    }

    if (!dryRun) {
      // Confirm before sending
      console.log(`\n⚠️  About to send "${article.title}" to ${subscribers.length} subscribers.`);
      console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    const result = await sendToSubscribers(article, subscribers, dryRun);
    
    if (dryRun) {
      console.log('\n✅ Dry run completed! Use the script without --dry-run to actually send emails.');
    } else {
      console.log('\n🎉 Newsletter sending completed!');
      if (result.failureCount > 0) {
        console.log(`\n💡 Tip: Failed emails might be due to rate limits or invalid addresses.`);
        console.log(`Consider adding the failed emails to a retry queue for later processing.`);
      }
    }
  } catch (error) {
    console.error('\n❌ Error sending newsletters:', error.message);
    process.exit(1);
  }
}

main();
