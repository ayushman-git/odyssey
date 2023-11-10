import Blockquote from "@/components/mdx/Blockquote";
import { Heading } from "@/components/mdx/Heading";

export function useMDXComponents(components) {
  return {
    ...components,
    h1: Heading.H1,
    h2: Heading.H2,
  };
}
