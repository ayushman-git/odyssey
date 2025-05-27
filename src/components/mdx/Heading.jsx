import { underscoreDelimiter } from "@/utils";
import { BiLink } from "react-icons/bi";

export const Heading = {
  H1: ({ children }) => {
    return (
      <h1
        className="font-serif text-2xl md:text-3xl text-gray-800 dark:text-gray-200 font-semibold my-6 cursor-pointer group scroll-mt-20 relative"
        id={underscoreDelimiter(children)}
      >
        <a 
          href={`#${underscoreDelimiter(children)}`}
          className="leading-snug block"
        >
          {children}
        </a>
        <BiLink 
          href={`#${underscoreDelimiter(children)}`} 
          className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -right-6 top-1/2 -translate-y-1/2" 
          size={16}
        />
      </h1>
    );
  },
  H2: ({ children }) => <h2 className="dark:text-gray-300 text-xl text-left mt-6 mb-3 font-semibold">{children}</h2>,
};
