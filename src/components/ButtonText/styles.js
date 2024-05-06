import Link from "next/link";

const { default: styled } = require("styled-components");

export const StyledLink = styled(Link)`
  position: relative;
  padding: 0.2rem;
  display: block;
  overflow: hidden; // Ensures no overflow if transformations exceed boundaries

  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    transform-origin: top left;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #000; // Can use a theme variable or props if needed
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;