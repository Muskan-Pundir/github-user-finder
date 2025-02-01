import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [username, setUsername] = useState("");

  return (
    <div className="flex space-x-2 p-4">
      <input
        type="text"
        className="border p-2 rounded w-full dark:bg-gray-700"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => onSearch(username)}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
