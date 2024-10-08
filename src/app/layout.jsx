import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/Footer";
import CustomThemeProvider from "@/lib/CustomThemeProvider";
import GoogleAnalytics from "@/lib/GoogleAnalyticsProvider";

const inter = Inter({
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata = {
  title: "Odyssey | Ayushman",
  description: "A Voyage into the Heart of Silicon",
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
      <body>
        <CustomThemeProvider>
          <div className={`grid place-items-center ${inter.className}`}>
            <Navbar />
            <main className="w-full pb-32">
              <section className="w-full grid place-items-center">
                {children}
              </section>
            </main>
            <Footer />
          </div>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
