// components/mdx-remote.js
import { MDXRemote } from "next-mdx-remote/rsc";
import { Heading } from "./Heading";
import Blockquote from "./Blockquote";
import { Typography } from "./Typography";

const components = {
  h1: Heading.H1,
  h2: Heading.H2,
  blockquote: Blockquote,
  em: Typography.Em,
};

export default function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
