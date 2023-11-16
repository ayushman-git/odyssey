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
  p: Typography.P,
  code: Typography.Code,
};

export default function CustomMDX(props) {
  const mdx = (
    <MDXRemote
      options={{
        parseFrontmatter: true,
      }}
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );

  const renderAsideList = (list) => {
    return list.map((item) => (
      <>
        <li className="my-2">{item.title}</li>
        {item.subheadings &&
          item.subheadings.length > 0 &&
          renderAsideList(item.subheadings)}
      </>
    ));
  };

  const extractHeadings = (content) => {
    console.log({ content });
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

    return (
      <aside className="sticky top-10 w-60 -ml-72">
        <ul className="text-xs">{renderAsideList(headings)}</ul>
      </aside>
    );
  };

  return (
    <section>
      {extractHeadings(mdx.props.source)}
      {mdx}
    </section>
  );
}
