import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the client-side CodeBlock component
const CodeBlock = dynamic(() => import('./CodeBlock'), { ssr: false });

// Helper function to style list items
const styleListItems = (children) => {
  return React.Children.map(children, child => {
    if (child.type === 'li') {
      return React.cloneElement(child, {
        className: "my-1.5 sm:font-light font-normal text-lg text-gray-700 dark:text-gray-400 pl-1",
        style: { lineHeight: "28px" }
      });
    } else if (child.props && child.props.children) {
      // Handle nested elements by recursively styling their children
      return React.cloneElement(child, {
        children: styleListItems(child.props.children)
      });
    }
    return child;
  });
};

export const Typography = {
  Em: ({ children }) => <em>{children}</em>,

  P: ({ children }) => (
    <p
      className="my-4 sm:font-light font-normal text-lg text-gray-700 dark:text-gray-400"
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
    <ol className="list-decimal list-outside mx-6 my-5 dark:text-gray-400 space-y-1 pl-4">
      {styleListItems(children)}
    </ol>
  ),

  Ul: ({ children }) => (
    <ul className="list-disc list-outside mx-6 my-5 dark:text-gray-400 space-y-1 pl-4">
      {styleListItems(children)}
    </ul>
  ),

  Li: ({ children }) => (
    <li
      className="my-1.5 sm:font-light font-normal text-lg text-gray-700 dark:text-gray-400 pl-1"
      style={{
        lineHeight: "28px",
      }}
    >
      {children}
    </li>
  ),

  B: ({ children }) => <b className="font-semibold">{children}</b>,
  Strong: ({ children }) => <b className="font-semibold">{children}</b>,
};
