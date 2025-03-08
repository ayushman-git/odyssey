"use client";

import Image from "next/image";
import Link from "next/link";
import Illustration from "@/assets/images/illustration.png";

export default function Error({ error, reset }) {
  console.log({ error });
  return (
    <section className="flex mt-8 h-[420px] items-center my-20">
      <aside className="w-full">
        <h1 className="text-9xl font-sans font-black">404</h1>
        <h2 className="text-xl font-sans font-bold mb-8">Page not found</h2>
        <Link href="/">
          <button className="bg-black p-4 px-8 rounded-xl text-white">
            Homepage
          </button>
        </Link>
      </aside>

      <aside className="w-full">
        <Image
          src={Illustration}
          width={400}
          height={400}
          style={{ width: "100%", height: "auto" }}
        />
      </aside>
    </section>
  );
}
