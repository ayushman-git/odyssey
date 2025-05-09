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

  return `${dayWithOrdinal} ${formattedMonth}, ${year}`;
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

// New function to generate metadata for blog and article pages
export const generatePageMetadata = ({ 
  title, 
  description, 
  image, 
  type = 'website', 
  url, 
  date, 
  authors = ["Ayushman Gupta"]
}) => {
  const baseUrl = 'https://ayushman.dev';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  
  const metadata = {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    alternates: {
      canonical: fullUrl,
    }
  };
  
  // Add article-specific properties
  if (type === 'article') {
    metadata.openGraph.publishedTime = date;
    metadata.openGraph.authors = authors;
    metadata.openGraph.siteName = "Ayushman Gupta | Odyssey";
    metadata.openGraph.locale = "en_US";
    
    // Add Twitter card for articles
    metadata.twitter = {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    };
  }
  
  return metadata;
};

export const convertToSlug = (str) => {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Trim leading/trailing whitespace
    .replace(/[\s_]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-"); // Replace multiple hyphens with a single hyphen
};

export const generateInt = (start, end) => {
  return Math.floor(Math.random() * (end - start) + start);
};

export const generateFloat = (start, end) => {
  return Math.random() * (end - start) + start;
};

export const throttle = (callback, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return callback(...args);
  };
};

export const scrollToSectionWithId = (id) => {
  const idOfSection = document.querySelector(`#${id}`);
  if (idOfSection) {
    idOfSection.scrollIntoView({ behavior: "smooth" });
  }
};
