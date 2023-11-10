// components/mdx-remote.js
import { MDXRemote } from "next-mdx-remote/rsc";
import { Heading } from "./Heading";
import Blockquote from "./Blockquote";

const components = {
  h1: Heading.H1,
  h2: Heading.H2,
  blockquote: Blockquote,
};

export default function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
