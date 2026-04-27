import Link from "next/link";
import React from "react";
import { Meow_Script } from "next/font/google";

const meowScript = Meow_Script({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function Logo() {
  return (
    <Link href="/">
      <span className={`block cursor-pointer text-2xl ${meowScript.className} hover:opacity-80 transition-opacity duration-200`}>
        Ayushman
      </span>
    </Link>
  );
}

export default Logo;
