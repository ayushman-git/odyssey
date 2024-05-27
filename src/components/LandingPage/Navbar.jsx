import React from "react";
import ButtonText from "../ButtonText";
import Logo from "../Logo";
import { HiMiniArrowRight } from "react-icons/hi2";

function Navbar() {
  return (
    <nav className="flex justify-between bg-slate-100 py-4 px-8 items-center max-w-screen-lg w-full rounded-3xl">
      <Logo />
      <ul className="flex gap-6">
        <ButtonText href="#">Work</ButtonText>
        <ButtonText href="/blog">Blog</ButtonText>
        <ButtonText href="#">Journey</ButtonText>
      </ul>
      <aside>
        <button className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 group transition duration-200">
          Get in Touch
          {/* <span className="opacity-0 scale-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 group-hover:scale-100 transition duration-200 ease-in-out transform">
            <HiMiniArrowRight size="20px" />
          </span> */}
        </button>
      </aside>
    </nav>
  );
}

export default Navbar;
