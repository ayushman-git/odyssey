import { Merriweather } from "next/font/google";
import "./globals.css";

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
      <body className={`${merry.className}`}>
        <section>{children}</section>
      </body>
    </html>
  );
}
