// components/mdx-remote.js
import { MDXRemote } from "next-mdx-remote/rsc";
import { Heading } from "./Heading";
import Blockquote from "./Blockquote";
import { Typography } from "./Typography";
import Figcaption from "./BaseElements/Figcaption";
import Block from "./BaseElements/Block";
import MCPConfigTable from "./MCPConfigTable";
import PreviewableImage from "../PreviewableImage";
import MDXImageWrapper from "../MDXImageWrapper";
import {
  AdaptiveBitrateDemo,
  PerTitleEncodingDemo,
  NetflixEncodingVersions,
  NetflixOpenConnectFlow,
  Totoro,
} from "./StreamingDemos";
import { AGCMemoryMap, Alarm1202Simulator, DSKYPanel, AGCClockComparison } from "./ApolloAGCDemos";

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
    usesAGCDemos = false,
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

  const agcComponents = usesAGCDemos
    ? { AGCMemoryMap, Alarm1202Simulator, DSKYPanel, AGCClockComparison }
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
        ...agcComponents,
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
