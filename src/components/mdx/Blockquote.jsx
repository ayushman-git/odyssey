export default function Blockquote({ children }) {
  return (
    <blockquote className="border-l-4 border-black bg-slate-50 italic p-2 pl-6 leading-7 text-gray-700">
      {children}
    </blockquote>
  );
}
