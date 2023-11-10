import { useEffect, useState } from "react";

export default function useScrollPosition() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    addEventListener("scroll", getReadPercentage);
    return () => removeEventListener("scroll", getReadPercentage);
  }, []);

  const getReadPercentage = () => {
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = window.innerHeight;
    const currentScrollPosition = window.scrollY;

    const availableHeight = scrollHeight - clientHeight;
    const percentage = (currentScrollPosition / availableHeight) * 100;
    setScrollPercentage(percentage);
  };
  return scrollPercentage;
}
