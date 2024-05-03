import React from "react";
import ButtonText from "../ButtonText";

function Navbar() {
  return (
    <nav className="flex justify-between">
      <div>ayushman</div>
      <ul className="flex gap-4">
        <ButtonText href="#">Work</ButtonText>
        <ButtonText href="#">Blog</ButtonText>
      </ul>
      <aside>
        <button>Get in Touch</button>
      </aside>
    </nav>
  );
}

export default Navbar;
