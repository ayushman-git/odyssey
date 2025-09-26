export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ayushman.dev/sitemap.xml',
    host: 'https://ayushman.dev',
    // Add RSS feed for better discoverability
    other: {
      'RSS-Feed': 'https://ayushman.dev/api/rss',
    },
  };
}
