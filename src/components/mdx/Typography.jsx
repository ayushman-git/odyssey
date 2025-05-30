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
        className: "my-2 font-light text-lg text-gray-700 dark:text-gray-300 pl-1",
        style: { lineHeight: "32px" }
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
  Em: ({ children }) => <em className="italic font-light">{children}</em>,

  P: ({ children }) => (
    <p
      className="my-6 font-light text-lg text-gray-700 dark:text-gray-300"
      style={{
        lineHeight: "32px",
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
      <code className="px-2 py-1 mx-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono text-sm border border-gray-200 dark:border-gray-700">
        {children}
      </code>
    );
  },

  Ol: ({ children }) => (
    <ol className="list-decimal list-outside mx-6 my-6 text-gray-700 dark:text-gray-300 space-y-2 pl-4">
      {styleListItems(children)}
    </ol>
  ),

  Ul: ({ children }) => (
    <ul className="list-disc list-outside mx-6 my-6 text-gray-700 dark:text-gray-300 space-y-2 pl-4">
      {styleListItems(children)}
    </ul>
  ),

  Li: ({ children }) => (
    <li
      className="my-2 font-light text-lg text-gray-700 dark:text-gray-300 pl-1"
      style={{
        lineHeight: "32px",
      }}
    >
      {children}
    </li>
  ),

  B: ({ children }) => <b className="font-medium text-black dark:text-white">{children}</b>,
  Strong: ({ children }) => <strong className="font-medium text-black dark:text-white">{children}</strong>,
};
