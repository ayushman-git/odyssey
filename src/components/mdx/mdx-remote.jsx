// components/mdx-remote.js
import { MDXRemote } from "next-mdx-remote/rsc";
import dynamic from "next/dynamic";
import { Heading } from "./Heading";
import Blockquote from "./Blockquote";
import { Typography } from "./Typography";
import Figcaption from "./BaseElements/Figcaption";
import Block from "./BaseElements/Block";
import MCPConfigTable from "./MCPConfigTable";
import PreviewableImage from "../PreviewableImage";
import MDXImageWrapper from "../MDXImageWrapper";

const AdaptiveBitrateDemo = dynamic(
  () => import("../ArticleBased/StreamingTech/AdaptiveBitrateDemo"),
  { ssr: false }
);
const PerTitleEncodingDemo = dynamic(
  () => import("../ArticleBased/StreamingTech/PerTitleEncodingDemo"),
  { ssr: false }
);
const NetflixEncodingVersions = dynamic(
  () => import("../ArticleBased/StreamingTech/NetflixEncodingVersions"),
  { ssr: false }
);
const NetflixOpenConnectFlow = dynamic(
  () => import("../ArticleBased/StreamingTech/NetflixOpenConnectFlow"),
  { ssr: false }
);
const Totoro = dynamic(
  () => import("../ArticleBased/StreamingTech/Totoro"),
  { ssr: false }
);

const components = {
  h1: Heading.H1,
  h2: Heading.H2,
  h3: Heading.H3,
  blockquote: Blockquote,
  em: Typography.Em,
  p: Typography.P,
  ol: Typography.Ol,
  ul: Typography.Ul,
  b: Typography.B,
  strong: Typography.Strong,
  code: Typography.Code,
  img: PreviewableImage,
};

export default function CustomMDX(props) {
  const {
    usesStreamingDemos = false,
    components: customComponents,
    ...mdxProps
  } = props;

  const streamingComponents = usesStreamingDemos
    ? {
        AdaptiveBitrateDemo,
        PerTitleEncodingDemo,
        NetflixEncodingVersions,
        NetflixOpenConnectFlow,
        Totoro,
      }
    : {};

  const mdx = (
    <MDXRemote
      options={{
        parseFrontmatter: true,
      }}
      {...mdxProps}
      components={{
        ...components,
        ...(customComponents || {}),
        Figcaption,
        Block,
        ...streamingComponents,
        MCPConfigTable,
      }}
    />
  );

  return (
    <MDXImageWrapper>
      {mdx}
    </MDXImageWrapper>
  );
}
