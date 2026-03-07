const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "s17233.pcdn.co" },
      { protocol: "https", hostname: "cdn.mos.cms.futurecdn.net" },
      { protocol: "https", hostname: "qrcodedynamic.com" },
      { protocol: "https", hostname: "huonw.github.io" },
      { protocol: "https", hostname: "help.scantrust.com" },
      { protocol: "https", hostname: "www.metablocks.com" },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  trailingSlash: true,
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
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(jpg|jpeg|png|webp|avif|svg|ico|css|js|woff|woff2|ttf|otf|pdf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
