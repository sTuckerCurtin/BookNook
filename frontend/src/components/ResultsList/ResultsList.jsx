import React from 'react';
import { Link } from 'react-router-dom';

function ResultsList({ searchResults }) {
  return (
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
  );
}

export default ResultsList;
