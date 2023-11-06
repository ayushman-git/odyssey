import { Heading } from "@/components/Heading";

export function useMDXComponents(components) {
  return {
    ...components,
    h1: Heading.H1,
    h2: Heading.H2,
  };
}
