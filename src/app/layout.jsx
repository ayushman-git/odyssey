import "./globals.css";
import { Inter } from "next/font/google";
import CustomThemeProvider from "@/lib/CustomThemeProvider";
import GoogleAnalytics from "@/lib/GoogleAnalyticsProvider";
import dynamic from 'next/dynamic';

// Import the CustomCursor component with no SSR
const CustomCursor = dynamic(
  () => import('../components/CustomCursor'),
  { ssr: false }
);

const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata = {
  title: "Ayushman | Developer Portfolio",
  description: "Personal portfolio showcasing my projects and skills",
};

export default function RootLayout({ children }) {
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
      </head>
      <GoogleAnalytics />
      <body className={inter.className}>
        <CustomThemeProvider>{children}</CustomThemeProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
