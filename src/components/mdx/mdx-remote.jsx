// components/mdx-remote.js
import { MDXRemote } from "next-mdx-remote/rsc";
import { Heading } from "./Heading";
import Blockquote from "./Blockquote";
import { Typography } from "./Typography";
import AsideTitles from "../AsideTitles";
import Figcaption from "./BaseElements/Figcaption";
import Block from "./BaseElements/Block";
import AreciboCountingGrid from "../ArticleBased/DecodingArecibo/AreciboCountingGrid";
import AdaptiveBitrateDemo from "../ArticleBased/StreamingTech/AdaptiveBitrateDemo";

const components = {
  h1: Heading.H1,
  h2: Heading.H2,
  blockquote: Blockquote,
  em: Typography.Em,
  p: Typography.P,
  ol: Typography.Ol,
  ul: Typography.Ul,
  b: Typography.B,
  strong: Typography.Strong,
  code: Typography.Code,
};

export default function CustomMDX(props) {
  const mdx = (
    <MDXRemote
      options={{
        parseFrontmatter: true,
      }}
      {...props}
      components={{ ...components, ...(props.components || {}), Figcaption, Block, AreciboCountingGrid, AdaptiveBitrateDemo }}
    />
  );

  const extractHeadings = (content) => {
    if (!props.showAside) return;

    const regex = /^(#+)\s+(.*)$/gm;
    const matches = content.matchAll(regex);
    const headings = [];

    let currentHeading = { subheadings: [] };
    for (const match of matches) {
      const level = match[1].length; // Heading level based on the number of '#' symbols
      const text = match[2].trim();

      if (level === 1) {
        if (currentHeading.title) {
          headings.push({ ...currentHeading });
        }
        currentHeading = { title: text, subheadings: [] };
      } else if (level > 1 && currentHeading.title) {
        currentHeading.subheadings.push({ level, text });
      }
    }

    if (currentHeading.title) {
      headings.push({ ...currentHeading });
    }

    return <AsideTitles headings={headings} />;
  };

  return (
    <section>
      {extractHeadings(mdx.props.source)}
      {mdx}
    </section>
  );
}
