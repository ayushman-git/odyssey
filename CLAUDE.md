# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run Next.js linting

### Newsletter Management
- `node scripts/send-article-to-subscribers.mjs <path/to/article.mdx>` - Send newsletter to all active subscribers
- `node scripts/send-article-to-subscribers.mjs <path/to/article.mdx> --dry-run` - Preview newsletter sending without actually sending

## Architecture Overview

### Project Structure
This is a Next.js 14 portfolio/blog application with the following key architectural patterns:

**Content Management:**
- MDX-based articles stored in `src/content/` directory
- Article metadata handled via frontmatter (title, date, type, description, etc.)
- Server-side article processing with caching in `src/lib/posts.js`
- Articles support custom React components for interactive content

**Database & Email:**
- Supabase for newsletter subscriber management
- Resend for email delivery with bounce tracking
- Webhook endpoint at `/api/webhook` for handling email bounces
- Newsletter subscription API at `/api/newsletter/subscribe`

**UI Framework:**
- Next.js 14 App Router
- Tailwind CSS for styling
- Emotion/MUI for additional components
- Framer Motion for animations
- Custom theme provider supporting dark/light modes

**Content Features:**
- Search functionality with Fuse.js
- Article filtering by type
- Newsletter subscription with email validation
- Social sharing components
- Article-specific interactive components (3D visualizations, demos)

### Key Directories
- `src/app/` - Next.js app router pages and API routes
- `src/components/` - Reusable React components
- `src/content/` - MDX article files
- `src/lib/` - Utility functions and service configurations
- `src/data/` - Static data files (projects, collections)
- `scripts/` - Newsletter automation scripts

### Environment Setup
Required environment variables:
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service key
- `RESEND_KEY` - Resend API key for email sending

### Article System
Articles are MDX files with frontmatter containing:
- `title` - Article title
- `date` - Publication date (DD-MM-YYYY format)
- `type` - Article category for filtering
- `description` - Article summary
- `disabled` - Hide from public listing
- `hidden` - Exclude from builds entirely

The articles system includes caching, date parsing optimization, and support for custom React components within MDX content.

### Newsletter System
- Database schema includes bounce tracking (`bounced`, `bounced_at`, `bounce_reason`)
- Rate-limited email sending (respects Resend's 2 req/sec limit)
- Batch processing with progress tracking
- Dry-run mode for testing
- Email validation and test domain filtering