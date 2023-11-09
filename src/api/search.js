export async function fetchSearchedArticles(searchString) {
  const response = await fetch(`/articles?str=${searchString}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
