import React from 'react';

function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
  return (
    <form onSubmit={handleSearch}>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
