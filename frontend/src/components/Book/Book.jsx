import React from 'react';

function Book({ book }) {
  return (
    <div>
      <h2>Title: {book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Description: {book.description}</p>
      <img src={book.coverImageUrl} alt={book.title} />
    </div>
  );
}

export default Book;
