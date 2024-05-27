import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/">
      <h1 className="cursor-pointer text-2xl">a.</h1>
    </Link>
  );
}

export default Logo;
