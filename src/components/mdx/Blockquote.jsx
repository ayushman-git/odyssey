export default function Blockquote({ children }) {
  return (
    <blockquote className="text-lg border-l-4 border-black bg-slate-50 italic p-10 leading-7 text-gray-700">
      {children}
    </blockquote>
  );
}
