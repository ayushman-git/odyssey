import { underscoreDelimiter } from "@/utils";

export const Heading = {
  H1: ({ children }) => {
    return (
      <h1
        className="text-2xl font-bold my-4 cursor-pointer"
        id={underscoreDelimiter(children)}
      >
        <a href={`#${underscoreDelimiter(children)}`}>{children}</a>
      </h1>
    );
  },
  H2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
};
