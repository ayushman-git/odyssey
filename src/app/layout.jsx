import "./globals.css";
import { Inter } from "next/font/google";
import CustomThemeProvider from "@/lib/CustomThemeProvider";
import GoogleAnalytics from "@/lib/GoogleAnalyticsProvider";

const inter = Inter({
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // All font weights
  style: ["normal"], // Optional: include italic if needed
});

export const metadata = {
  title: {
    default: 'Ayushman Gupta | Fullstack Engineer',
    template: '%s | Ayushman Gupta'
  },
  description: 'Personal portfolio and blog of Ayushman Gupta, a developer and designer specializing in web development and creative solutions.',
  keywords: ['Ayushman Gupta', 'developer', 'designer', 'portfolio', 'web development', 'blog', 'software engineer', 'frontend developer', 'UI/UX designer'],
  authors: [{ name: 'Ayushman Gupta', url: 'https://ayushman.dev' }],
  creator: 'Ayushman Gupta',
  publisher: 'Ayushman Gupta',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ayushman.dev/',
    title: 'Ayushman Gupta | Fullstack Engineer',
    description: 'Personal portfolio and blog of Ayushman Gupta, a developer and designer specializing in web development and creative solutions.',
    siteName: 'Ayushman Gupta',
    images: [
      {
        url: '/cover.jpg', // Updated to use your cover.jpgn.dev/cover.jpg', // Use absolute URL in production
        width: 1200,
        height: 630,
        alt: 'Ayushman Gupta Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayushman Gupta | Fullstack Engineer',
    description: 'Personal portfolio and blog of Ayushman Gupta, a developer and designer specializing in web development and creative solutions.',
    images: ['/cover.jpg'], // Updated to use your cover.jpg.dev/cover.jpg'], // Use absolute URL in production
    creator: '@ayushman_gupta',
  },
  verification: {
    google: 'googleVerificationString', // Replace with your verification string
  },
  alternates: {
    canonical: 'https://ayushman.dev',
    languages: {
      'en-US': 'https://ayushman.dev',
    },
  },
};

export default function RootLayout({ children }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ayushman Gupta",
    "url": "https://ayushman.dev",
    "sameAs": [
      "https://github.com/ayushman-git",
      "https://www.linkedin.com/in/ayushman-git/",
      "https://www.behance.net/duoro",
      "https://medium.com/@duoro"
    ],
    "jobTitle": "Fullstack Engineer",
    "alumniOf": "G.D. Goenka University",
    "knowsAbout": ["Frontend Engineer", "Fullstack Engineer", "Web Development", "UI/UX Design", "JavaScript", "React", "Next.js"]
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{
        scrollBehavior: "smooth",
      }}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script 
          id="schema-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd)
          }}
        />
      </head>
      <GoogleAnalytics />
      <body className={`${inter.className} bg-white dark:bg-black min-h-screen`}>
        <div className="relative z-10">
          <CustomThemeProvider>{children}</CustomThemeProvider>
        </div>
      </body>
    </html>
  );
}
