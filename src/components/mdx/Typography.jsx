export const Typography = {
  Em: ({ children }) => <em className="font-bold">{children}</em>,
  P: ({ children }) => (
    <p
      className="my-4 sm:font-light font-normal sm:text-lg text-gray-500 sm:text-black dark:text-gray-400 text-2xl leading-10"
      style={{
        lineHeight: "42px !important",
      }}
    >
      {children}
    </p>
  ),
  Code: ({ children }) => (
    <section className="p-4 bg-white font-mono border text-gray-600 text-sm">
      {children}
    </section>
  ),
  Ol: ({ children }) => (
    <ol className="list-decimal list-inside">{children}</ol>
  ),
  Ul: ({ children }) => (
    <ul className="list-inside list-disc">{children}</ul>
  ),
  B: ({ children }) => <b className="font-bold">{children}</b>,
};
