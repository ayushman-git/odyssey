import Image from "next/image";
import Link from "next/link";
import Illustration from "@/assets/images/illustration.png";

export default function NotFound() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-10 py-20 px-6" aria-labelledby="not-found-heading">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 id="not-found-heading" className="text-7xl md:text-9xl font-black tracking-tight text-black dark:text-white">404</h1>
        <p className="mt-4 text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300">Page not found</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">The page you are looking for doesn\'t exist or was moved.</p>
        <Link
          href="/"
          className="mt-8 inline-block bg-black text-white rounded-md px-6 py-3 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
        >
          Back to homepage
        </Link>
      </div>
      <div className="w-full md:w-1/2 max-w-md">
        <Image
          src={Illustration}
          alt="Astronaut floating in space"
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
}
