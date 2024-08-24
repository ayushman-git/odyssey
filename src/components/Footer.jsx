"use client";

import profiles from "@/assets/json/profiles.json";

export default function Footer() {
  return (
    <footer className="max-w-screen-md w-full p-24 pb-8 bg-black text-white grid place-items-center py-24 rounded-[40px] mb-12 relative z-10">
      <h1 className="text-5xl font-bold text-center leading-normal">
        Dream big, stay curious, keep learning
      </h1>
      <div className="max-w-screen-md w-full flex gap-10 mt-12">
        <section className="w-full">
          <ul className="flex items-center justify-center gap-10">
            {profiles.map(({ name, link }) => (
              <li className="flex items-center gap-2 cursor-pointer" key={name}>
                <a className="text-gray-400" target="_blank" href={link}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div>
        <p className="text-gray-700 mt-12">
          &copy; {new Date().getFullYear()} Odyssey | Ayushman
        </p>
      </div>
    </footer>
  );
}
