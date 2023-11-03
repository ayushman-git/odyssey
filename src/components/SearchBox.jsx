import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchBox({ searchString, onChange }) {
  const [showSearchField, setShowSearchField] = useState(false);

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
    }
  }, [showSearchField]);

  return (
    <div className="flex items-center">
      {showSearchField && (
        <input
          value={searchString}
          onChange={onChange}
          type="text"
          className="mr-8 border-b-2 bg-transparent border-black"
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
