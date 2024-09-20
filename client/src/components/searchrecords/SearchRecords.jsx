import React, { useState } from "react";
import './SearchRecords.scss';

const SearchRecords = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-records">
      <h2>Search Health Records</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by date..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchRecords;
