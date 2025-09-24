// components/mdx-remote.js
import { MDXRemote } from "next-mdx-remote/rsc";
import { Heading } from "./Heading";
import Blockquote from "./Blockquote";
import { Typography } from "./Typography";
import Figcaption from "./BaseElements/Figcaption";
import Block from "./BaseElements/Block";
import AreciboCountingGrid from "../ArticleBased/DecodingArecibo/AreciboCountingGrid";
import AdaptiveBitrateDemo from "../ArticleBased/StreamingTech/AdaptiveBitrateDemo";
import PerTitleEncodingDemo from "../ArticleBased/StreamingTech/PerTitleEncodingDemo";
import NetflixEncodingVersions from "../ArticleBased/StreamingTech/NetflixEncodingVersions";
import NetflixOpenConnectFlow from "../ArticleBased/StreamingTech/NetflixOpenConnectFlow";
import Totoro from "../ArticleBased/StreamingTech/Totoro";
import MCPConfigTable from "./MCPConfigTable";
import PreviewableImage from "../PreviewableImage";
import MDXImageWrapper from "../MDXImageWrapper";

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
  const mdx = (
    <MDXRemote
      options={{
        parseFrontmatter: true,
      }}
      {...props}
      components={{
        ...components,
        ...(props.components || {}),
        Figcaption,
        Block,
        AreciboCountingGrid,
        AdaptiveBitrateDemo,
        PerTitleEncodingDemo,
        NetflixEncodingVersions,
        NetflixOpenConnectFlow,
        Totoro,
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
