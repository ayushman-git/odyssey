import "./globals.css";
import { Work_Sans } from "next/font/google";
import Navbar from "@/components/LandingPage/Navbar";

const workSans = Work_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Odyssey",
  description: "A Voyage into the Heart of Silicon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${workSans.className}`}>
        <nav className="grid place-items-center pt-4 px-4">
          <Navbar />
        </nav>
        <section>{children}</section>
      </body>
    </html>
  );
}
