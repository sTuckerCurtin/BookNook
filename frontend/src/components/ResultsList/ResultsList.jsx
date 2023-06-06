import React from 'react';
import { Link } from 'react-router-dom';
import "./ResultsList.css"




function ResultsList({ searchResults }) {
  return (
    <div className="results-list">
      {searchResults.map((book) => (
        <div key={book.id} className="card mb-3">
          <Link to={`/book/${book.id}`} className="card-link">
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{book.volumeInfo.title}</h5>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ResultsList;

