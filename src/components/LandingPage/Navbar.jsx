import React from "react";
import Logo from "../Logo";

function Navbar() {
  return (
    <nav className="grid place-items-center border-b-2 py-4 px-8 items-center w-full">
      <div className="max-w-screen-md w-full">
        <Logo />
      </div>
    </nav>
  );
}

export default Navbar;
