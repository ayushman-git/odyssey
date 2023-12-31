import useClickOutside from "@/hooks/useClickOutside";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBox({ searchString, onChange }) {
  const [showSearchField, setShowSearchField] = useState(false);
  const [key, setKey] = useState(null);
  const inputRef = useRef(null);
  useClickOutside(inputRef, handleClickOutside);

  function handleClickOutside() {
    if (showSearchField) setShowSearchField(false);
  }

  const handleSearchTrigger = () => {
    setShowSearchField((prev) => !prev);
  };

  const handleShortcut = (e) => {
    if (e.metaKey && e.key === "k") {
      handleSearchTrigger();
    }
  };

  useEffect(() => {
    const platform = navigator?.userAgentData?.platform.toLowerCase();
    if (platform === "windows") setKey("Ctrl");
    if (platform === "macos") setKey("⌘");
  }, []);

  useEffect(() => {
    addEventListener("keydown", handleShortcut);
    if (!showSearchField) {
      onChange({
        target: {
          value: "",
        },
      });
    } else {
      inputRef.current.focus();
    }
    return () => removeEventListener("keydown", handleShortcut);
  }, [showSearchField]);

  return (
    <div className="flex items-center">
      {showSearchField && (
        <input
          ref={inputRef}
          value={searchString}
          onChange={onChange}
          type="text"
          className="mr-8 border-b-2 bg-transparent border-black focus:outline-none text-gray-600 text-sm"
        />
      )}
      {key && (
        <span className="mr-2 text-sm text-gray-700">
          <kbd>{key}</kbd> + <kbd>k</kbd>
        </span>
      )}
      <BsSearch
        size="1.125rem"
        className="cursor-pointer"
        onClick={handleSearchTrigger}
      />
    </div>
  );
}
