export default function Blockquote({ children }) {
  return (
    <blockquote className="border-l-2 border-gray-300 dark:border-gray-600 bg-transparent pl-8 pr-4 py-6 my-8 text-gray-600 dark:text-gray-400 font-light italic text-xl leading-relaxed md:ml-8 max-w-prose mx-auto">
      <div className="relative">
        <span className="absolute -left-2 -top-2 text-6xl text-gray-300 dark:text-gray-600 leading-none select-none">"</span>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </blockquote>
  );
}
