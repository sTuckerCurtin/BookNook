import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    <div>
      <h1>Search Page</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <p>{book.volumeInfo.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
