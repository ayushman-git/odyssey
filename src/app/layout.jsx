import { Merriweather } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BgPattern from "@/assets/images/bg_pattern.png";

const merry = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Odyssey",
  description: "A Voyage into the Heart of Silicon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${merry.className} grid place-items-center`}
        style={{
          backgroundImage: `url(${BgPattern.src})`,
          backgroundRepeat: "repeat",
          backgroundSize: 80,
        }}
      >
        <main className="max-w-screen-md w-full">
          <Navbar />
          <section>{children}</section>
        </main>
        <Footer />
      </body>
    </html>
  );
}
