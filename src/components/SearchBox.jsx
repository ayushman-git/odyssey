import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBox({ searchString, onChange }) {
  const [showSearchField, setShowSearchField] = useState(false);
  const inputRef = useRef(null);

  const handleSearchTrigger = () => {
    setShowSearchField((prev) => !prev);
  };

  useEffect(() => {
    if (!showSearchField) {
      onChange({
        target: {
          value: "",
        },
      });
    } else {
      inputRef.current.focus();
    }
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
      <BsSearch
        size="1.125rem"
        className="cursor-pointer"
        onClick={handleSearchTrigger}
      />
    </div>
  );
}
