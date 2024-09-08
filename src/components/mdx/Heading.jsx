import { underscoreDelimiter } from "@/utils";
import { BiLink } from "react-icons/bi";

export const Heading = {
  H1: ({ children }) => {
    return (
      <h1
        className="text-3xl dark:text-gray-300 font-semibold my-4 mb-4 cursor-pointer flex items-center gap-2 group scroll-mt-20"
        id={underscoreDelimiter(children)}
      >
        <a href={`#${underscoreDelimiter(children)}`}>{children}</a>
        <BiLink href={`#${underscoreDelimiter(children)}`} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </h1>
    );
  },
  H2: ({ children }) => <h2 className="dark:text-gray-300 text-2xl mt-8 mb-4 font-semibold">{children}</h2>,
};
