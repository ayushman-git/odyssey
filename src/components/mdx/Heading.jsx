import { underscoreDelimiter } from "@/utils";
import { BiLink } from "react-icons/bi";

export const Heading = {
  H1: ({ children }) => {
    return (
      <h1
        className="text-3xl md:text-4xl text-black dark:text-white font-light tracking-tight my-12 cursor-pointer group scroll-mt-20 relative leading-tight"
        id={underscoreDelimiter(children)}
      >
        <a 
          href={`#${underscoreDelimiter(children)}`}
          className="leading-tight block"
        >
          {children}
        </a>
        <BiLink 
          href={`#${underscoreDelimiter(children)}`} 
          className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -right-7 top-1/2 -translate-y-1/2" 
          size={18}
        />
      </h1>
    );
  },
  H2: ({ children }) => (
    <h2 
      className="text-2xl md:text-3xl text-black dark:text-white font-light tracking-tight mt-12 mb-6 leading-tight border-b border-gray-200 dark:border-gray-800 pb-3"
      id={underscoreDelimiter(children)}
    >
      <a 
        href={`#${underscoreDelimiter(children)}`}
        className="group cursor-pointer flex items-center"
      >
        {children}
        <BiLink 
          className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2" 
          size={16}
        />
      </a>
    </h2>
  ),
  H3: ({ children }) => (
    <h3 
      className="text-xl md:text-2xl text-black dark:text-white font-light tracking-tight mt-10 mb-4 leading-tight"
      id={underscoreDelimiter(children)}
    >
      <a 
        href={`#${underscoreDelimiter(children)}`}
        className="group cursor-pointer flex items-center"
      >
        {children}
        <BiLink 
          className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2" 
          size={14}
        />
      </a>
    </h3>
  ),
};
