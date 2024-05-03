"use client"

import React from "react";
import { StyledLink } from "./styles";

function ButtonText({ children, onClick, href }) {
  return (
    <StyledLink href={href} onClick={onClick} className="relative">
      {children}
    </StyledLink>
  );
}

export default ButtonText;
