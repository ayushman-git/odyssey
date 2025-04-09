export default function Blockquote({ children }) {
  return (
    <blockquote className="border-l-2 border-gray-400 dark:border-gray-600 bg-transparent px-4 py-2 my-6 text-gray-700 dark:text-gray-300 font-normal not-italic md:ml-4 max-w-prose mx-auto">
      {children}
    </blockquote>
  );
}
