"use client";

import React from "react";
import NavButton from "./NavButton";

const Navigation = ({ logo }) => {
  return (
    <nav className="flex items-center justify-between">
      {logo}
      <ul className="flex space-x-4">
        <li>
          <NavButton onClick={() => console.log('Projects clicked')}>
            Projects
          </NavButton>
        </li>
        <li>
          <NavButton onClick={() => console.log('Blog clicked')}>
            Blog
          </NavButton>
        </li>
        <li>
          <NavButton onClick={() => console.log('Contact clicked')}>
            Contact
          </NavButton>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
