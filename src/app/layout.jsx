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
  title: "Odyssey",
  description: "A Voyage into the Heart of Silicon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CustomThemeProvider>
          <div className={`grid place-items-center ${inter.className}`}>
            <div
              id="linear-progress"
              className="sticky top-0 w-full z-50"
            ></div>
            <Navbar />
            <main className="max-w-screen-md w-full pb-32 sm:px-0 px-6">
              <section>{children}</section>
            </main>
            <Footer />
          </div>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
