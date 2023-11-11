import { underscoreDelimiter } from "@/utils";
import { BiLink } from "react-icons/bi";

export const Heading = {
  H1: ({ children }) => {
    return (
      <h1
        className="text-2xl font-bold my-4 cursor-pointer flex items-center gap-2 group"
        id={underscoreDelimiter(children)}
      >
        <a href={`#${underscoreDelimiter(children)}`}>{children}</a>
        <BiLink href={`#${underscoreDelimiter(children)}`} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </h1>
    );
  },
  H2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
};
