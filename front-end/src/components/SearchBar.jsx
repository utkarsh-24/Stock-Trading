import React from "react";

const SearchBar = ({ searchKeyword, handleSearch }) => {
  return (
    <div className="search-bar">
      <h2>Search Stocks</h2>
      <input
        type="text"
        value={searchKeyword}
        onChange={handleSearch}
        placeholder="Enter a stock symbol"
      />
    </div>
  );
};

export default SearchBar;
