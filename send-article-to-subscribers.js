#!/usr/bin/env node

/**
 * Send a new article email to all newsletter subscribers.
 * Usage: node send-article-to-subscribers.js path/to/article.mdx
 */
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { EMAIL_CONFIG } from './src/lib/email-service.js';
import { generateArticleAnnouncementTemplate } from './src/lib/email-templates/article-announcement.js';

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
  return data.map((row) => row.email);
}

async function sendToSubscribers(article, subscribers) {
  const template = generateArticleAnnouncementTemplate(article);

  for (const email of subscribers) {
    const { error } = await resend.emails.send({
      from: `${EMAIL_CONFIG.from.name} <${EMAIL_CONFIG.from.email}>`,
      to: [email],
      subject: `📝 New Article: ${article.title}`,
      html: template.html,
      text: template.text,
    });

    if (error) {
      console.error(`Failed to send to ${email}:`, error);
    } else {
      console.log(`Email sent to ${email}`);
    }
  }
}

async function main() {
  const mdxPath = process.argv[2];
  if (!mdxPath) {
    console.error('Usage: node send-article-to-subscribers.js <path-to-mdx>');
    process.exit(1);
  }

  if (!process.env.RESEND_KEY || !process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing environment configuration');
    process.exit(1);
  }

  try {
    const article = parseArticle(mdxPath);
    console.log(`Sending article "${article.title}" to subscribers...`);

    const subscribers = await getActiveSubscribers();
    console.log(`Found ${subscribers.length} active subscribers`);

    await sendToSubscribers(article, subscribers);
    console.log('Finished sending emails');
  } catch (error) {
    console.error('Error sending newsletters:', error);
    process.exit(1);
  }
}

main();
