export default function Blockquote({ children }) {
  return (
    <blockquote className="border-l-4 border-black bg-slate-50 dark:border-white dark:bg-transparent italic my-12 p-2 pl-6 leading-7">
      {children}
    </blockquote>
  );
}
