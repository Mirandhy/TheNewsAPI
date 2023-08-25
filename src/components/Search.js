import { useState } from "react";

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="search-container">
      <input
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
        className="search"
        type="text"
        placeholder="Search news..."
      />{" "}
      <button onClick={() => onSearch(searchQuery)} className="search-button">
        {" "}
        Search{" "}
      </button>
    </div>
  );
};

export default Search;
