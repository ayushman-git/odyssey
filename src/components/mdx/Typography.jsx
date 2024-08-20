export const Typography = {
  Em: ({ children }) => <em className="font-bold">{children}</em>,
  P: ({ children }) => <p className="leading-9 my-4 sm:font-light font-normal sm:text-lg text-gray-500 sm:text-black text-2xl">{children}</p>,
  Code: ({ children }) => (
    <section className="p-4 bg-white font-mono border text-gray-600 text-sm">{children}</section>
  ),
};
