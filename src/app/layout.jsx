import "./globals.css";
import { Work_Sans, Dancing_Script } from "next/font/google";
import Navbar from "@/components/LandingPage/Navbar";
import Footer from "@/components/Footer";

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
      <div className={`grid place-items-center ${workSans.className}`}>
        <div id="linear-progress" className="sticky top-0 w-full z-50"></div>
        <main className="max-w-screen-md w-full pb-44">
          <Navbar />
          <section>{children}</section>
        </main>
        <Footer />
      </div>
    </html>
  );
}
