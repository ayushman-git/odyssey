const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      'images.unsplash.com',
      'm.media-amazon.com',
      // Add other domains as needed
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  poweredByHeader: false, // Remove the X-Powered-By header
  trailingSlash: true, // Consistent URL trailing slashes improves SEO
  
  // Internationalization support - uncomment and configure if needed
  // i18n: {
  //   locales: ['en', 'fr', 'es'],
  //   defaultLocale: 'en',
  // },
  
  swcMinify: true, // More efficient minification
  // Custom headers for better SEO, security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },  
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
