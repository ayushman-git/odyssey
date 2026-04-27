// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading } from "./Heading.jsx";

/**
 * MDX stack smoke: heading anchors and ids are stable for in-page hash links.
 */
describe("Heading (MDX)", () => {
  it("H1 sets slug id and anchor href from plain text", () => {
    render(
      <Heading.H1>Hello From MDX</Heading.H1>
    );
    const h = screen.getByRole("heading", { level: 1 });
    expect(h).toHaveAttribute("id", "hello_from_mdx");
    const mainLink = h.querySelector("a");
    expect(mainLink).toHaveAttribute("href", "#hello_from_mdx");
  });
});
