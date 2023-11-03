"use client";

import profiles from "@/assets/json/profiles.json";
import { openLink } from "@/utils";
import { FiExternalLink } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white grid place-items-center py-12 rounded-t-3xl mt-20">
      <div className="max-w-screen-lg w-full flex gap-10">
        <aside className="w-full">
          <h1 className="text-lg font-black">Odyssey</h1>
          <h3 className="opacity-60 text-sm mt-2">
            A Voyage into the Heart of Silicon
          </h3>
        </aside>
        <section className="w-full">
          <h3 className="opacity-60 text-sm mb-4">Find me on</h3>
          <ul className="flex gap-10 mb-8">
            {profiles.map(({ name, link }) => (
              <li
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => openLink(link)}
              >
                <a className="text-blue-500">{name}</a>
                <FiExternalLink className="cursor-pointer text-blue-500" />
              </li>
            ))}
          </ul>
          <h3 className="opacity-60 text-sm mb-4">Subscribe to newsletter</h3>
          <div className="flex">
            <input
              placeholder="Enter email id"
              className="border border-gray-300 bg-transparent p-4 rounded-xl w-full"
              type="text"
            />
            <button className="bg-blue-600 p-4 px-10 rounded-xl ml-4">
              Subscribe
            </button>
          </div>
        </section>
      </div>
      <hr className="max-w-screen-lg my-10" />
    </footer>
  );
}
