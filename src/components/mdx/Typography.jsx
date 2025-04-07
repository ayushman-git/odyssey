import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import dynamic from 'next/dynamic';

// Dynamically import the client-side CodeBlock component
const CodeBlock = dynamic(() => import('./CodeBlock'), { ssr: false });

export const Typography = {
  Em: ({ children }) => <em>{children}</em>,

  P: ({ children }) => (
    <p
      className="my-4 sm:font-light font-normal sm:text-lg text-xl text-gray-500 sm:text-black dark:text-gray-400"
      style={{
        lineHeight: "30px",
      }}
    >
      {children}
    </p>
  ),

  Code: ({ children, className }) => {
    const isCodeBlock = className?.includes('language-');
    const language = className?.replace('language-', '') || '';
    
    if (isCodeBlock) {
      const code = String(children).trim();
      return <CodeBlock code={code} language={language} />;
    }

    return (
      <code className="px-1.5 py-0.5 mx-0.5 rounded bg-gray-100 dark:bg-gray-800 text-pink-500 dark:text-pink-300 font-mono text-sm">
        {children}
      </code>
    );
  },

  Ol: ({ children }) => (
    <ol className="list-decimal list-inside dark:text-gray-400">{children}</ol>
  ),

  Ul: ({ children }) => (
    <ul className="list-inside list-disc dark:text-gray-400">{children}</ul>
  ),

  B: ({ children }) => <b className="font-semibold">{children}</b>,
  Strong: ({ children }) => <b className="font-semibold">{children}</b>,
};
