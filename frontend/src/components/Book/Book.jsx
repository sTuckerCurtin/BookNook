import React from 'react';

function Book({ book }) {
  return (
    <div>
      <img src={book.coverImageUrl} alt={book.title} />
      <h2>Title: {book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      
    </div>
  );
}

export default Book;
