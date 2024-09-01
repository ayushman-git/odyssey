import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/Footer";
import CustomThemeProvider from "@/lib/CustomThemeProvider";

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
      <body>
        <CustomThemeProvider>
          <div className={`grid place-items-center ${inter.className}`}>
            <Navbar />
            <main className="w-full pb-32 sm:px-0 px-6">
              <section className="w-full grid place-items-center overflow-hidden">
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
