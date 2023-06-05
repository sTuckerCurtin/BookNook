import React from "react";
import "./FavoritesList.css";
import { Link } from 'react-router-dom';

const FavoritesList = ({ user, favorites }) => {
  return (
    <div>
      <h2 className="title">{user.username}'s Favorites!</h2>
      <div className="favorites-list">
        {favorites && favorites.length > 0 ? (
          favorites.map((book) => (
            <Link to={`/book/${book.book_id}`} className="card-link">
              <div className="card mb-3">
                <img src={book.thumbnail_url} alt={book.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No favorites found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
