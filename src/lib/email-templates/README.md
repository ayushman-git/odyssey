# Email System Documentation

## Overview

The Odyssey newsletter email system is designed to be modular, dynamic, and consistent with the website's design aesthetic. It automatically includes the latest 3 articles in welcome emails and matches the visual style of the HeroBanner and FeaturedArticle components.

## Architecture

### Core Files

- **`/src/lib/email.js`** - Main email service for sending emails via Resend
- **`/src/lib/email-service.js`** - Dynamic email generation service
- **`/src/lib/email-templates/`** - Modular email templates directory
  - **`welcome.js`** - Welcome email template
  - **`utils.js`** - Shared utilities and design system

### Design System

The email templates use a consistent design system that matches the website:

#### Colors
- Primary: `#000000` (Black)
- Secondary: `#64748b` (Slate-500)
- Accent: `#3b82f6` (Blue-500)
- Text: `#334155` (Slate-700)
- Borders: `#e2e8f0` (Slate-200)

#### Typography
- Font Family: Inter (with fallbacks)
- Monospace: Courier New
- Letter Spacing: Tight (-0.025em), Wide (0.1em), Wider (0.2em)

#### Layout
- Grid background pattern (matching HeroBanner)
- Corner decorations
- Centered layout with max-width constraints
- Responsive design with mobile breakpoints

## Features

### Dynamic Content
- **Latest Articles**: Automatically fetches and includes the latest 3 published articles
- **Responsive Design**: Mobile-optimized layouts
- **Fallback Handling**: Gracefully handles cases where articles can't be fetched

### Article Display
Each article in the email includes:
- Cover image with category badge
- Publication date (formatted to match FeaturedArticle component)
- Title with proper typography hierarchy
- Introduction excerpt (truncated to 120 characters)
- "Continue Reading" link with visual indicators

### Modular Components
- **Shared Utilities**: Reusable functions for date formatting, text truncation
- **Design Tokens**: Centralized color and spacing system
- **Template Components**: Header, footer, and decoration generators

## Usage

### Sending Welcome Emails

```javascript
import { sendWelcomeEmail } from '@/lib/email';

const result = await sendWelcomeEmail('user@example.com');

if (result.success) {
  console.log(`Email sent! Articles included: ${result.articlesIncluded}`);
} else {
  console.error('Email failed:', result.error);
}
```

### Creating New Email Templates

1. Create a new template file in `/src/lib/email-templates/`
2. Import shared utilities and design system
3. Use the established pattern for HTML and text content
4. Add template to email service configuration

Example:
```javascript
// /src/lib/email-templates/newsletter.js
import { generateEmailHeader, generateEmailFooter, EMAIL_STYLES } from './utils';

export const generateNewsletterTemplate = (articles) => {
  return {
    html: `...`,
    text: `...`
  };
};
```

### Extending the Email Service

Add new email types to `/src/lib/email-service.js`:

```javascript
export const generateNewsletterEmail = (articles) => {
  // Implementation
};

export const EMAIL_CONFIG = {
  // Add new email configurations
  subjects: {
    welcome: 'Welcome to Odyssey Newsletter! 🚀',
    newsletter: 'New Articles from Odyssey'
  }
};
```

## Development

### Testing
The system includes comprehensive error handling and fallbacks:
- Article fetching failures fall back to template without articles
- Email generation issues are logged but don't fail the subscription
- Template rendering errors use fallback content

### Debugging
Email generation results include metadata:
```javascript
{
  success: true,
  articlesIncluded: 3,
  emailGenerated: true,
  recipientEmail: 'user@example.com'
}
```

### Performance
- Articles are cached via the existing `getArticles()` system
- Email templates are generated on-demand
- No unnecessary API calls for email generation

## Future Enhancements

### Potential Features
1. **Email Personalization**: Add user preferences and content customization
2. **A/B Testing**: Multiple template variants for testing
3. **Analytics**: Email open/click tracking
4. **Unsubscribe Flow**: Automated unsubscribe handling
5. **Email Scheduling**: Delayed sending and scheduling
6. **Template Editor**: Admin interface for email template management

### Template Ideas
- Monthly newsletter with article roundup
- New article notification emails
- Special announcement templates
- Birthday/anniversary emails

## Configuration

### Environment Variables
- `RESEND_KEY` - Resend API key for sending emails

### Email Settings
- From Address: `newsletter@me.ayushman.dev`
- From Name: `Odyssey Newsletter`
- Base URL: `https://ayushman.dev`

## Troubleshooting

### Common Issues
1. **Articles not loading**: Check `getArticles()` function and content directory
2. **Template errors**: Verify import paths for utilities
3. **Email delivery**: Confirm Resend API key and domain configuration
4. **Styling issues**: Test email rendering in different clients

### Logs
The system provides detailed logging:
- Email generation success/failure
- Number of articles included
- Resend API responses
- Template rendering issues
