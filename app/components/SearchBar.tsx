import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <>
      <div className="relative w-full mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by celebrity name..."
          className="border p-2 pl-10 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => onSearch(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-1.3 text-gray-400 text-xl" />
      </div>
    </>
  );
};

export default SearchBar;
