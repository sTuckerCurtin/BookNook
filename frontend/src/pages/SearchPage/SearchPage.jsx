import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import ResultsList from '../../components/ResultsList/ResultsList';
import "./SearchPage.css"

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error getting search results', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  return (
    <section>
      <div className='searchbox'>
      <h1>Search Page</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
      <div>
        <ResultsList searchResults={searchResults} />
      </div>
    </section>
  );
}

export default SearchPage;
