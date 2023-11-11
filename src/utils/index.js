export const openLink = (link) => {
  window.open(link, "_blank");
};

export const formatDateString = (dateString) => {
  const options = { day: "numeric", month: "short" };
  const date = new Date(dateString);

  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "short" });

  // Add ordinal suffix to the day
  const dayWithOrdinal = addOrdinalSuffix(day);

  return `${dayWithOrdinal} ${month}`;
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
