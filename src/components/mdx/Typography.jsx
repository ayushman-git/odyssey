export const Typography = {
  Em: ({ children }) => <em className="font-bold">{children}</em>,
  P: ({ children }) => <p className="leading-7 my-4">{children}</p>,
  Code: ({ children }) => (
    <section className="p-4 bg-white font-mono border text-gray-600 text-sm">{children}</section>
  ),
};
