import Link from "next/link";
import React from "react";
import { Maven_Pro } from "next/font/google";

const maven = Maven_Pro({
  subsets: ["latin"],
  style: ["normal"],
});

function Logo() {
  return (
    <Link href="/">
      <h1 className={`cursor-pointer font-light text-lg ${maven.className}`}>Home</h1>
    </Link>
  );
}

export default Logo;
