export const openLink = (link) => {
  window.open(link, "_blank");
};

export const formatDateString = (dateString) => {
  const options = { day: "numeric", month: "short" };
  const [day, month, year] = dateString.split("-");
  const date = new Date(`${month}/${day}/${year}`);

  const formattedDay = date.toLocaleDateString("en-GB", { day: "numeric" });
  const formattedMonth = date.toLocaleDateString("en-GB", { month: "short" });

  // Add ordinal suffix to the day
  const dayWithOrdinal = addOrdinalSuffix(formattedDay);

  return `${dayWithOrdinal} ${formattedMonth}`;
};

function addOrdinalSuffix(number) {
  if (number >= 11 && number <= 13) {
    return `${number}th`;
  }

  const lastDigit = number % 10;
  switch (lastDigit) {
    case 1:
      return `${number}st`;
    case 2:
      return `${number}nd`;
    case 3:
      return `${number}rd`;
    default:
      return `${number}th`;
  }
}

export const underscoreDelimiter = (str) => {
  return str.toLowerCase().replaceAll(" ", "_");
};

export const convertToSlug = (str) => {
  return str
    .toLowerCase()               // Convert to lowercase
    .trim()                      // Trim leading/trailing whitespace
    .replace(/[\s_]+/g, '-')     // Replace spaces and underscores with hyphens
    .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
    .replace(/\-\-+/g, '-');     // Replace multiple hyphens with a single hyphen
}