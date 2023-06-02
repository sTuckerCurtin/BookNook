import React from "react";



const FavoritesList = ({user, favorites}) => {
    
    
    
    return ( 
        <div>
            <div>{user.username}'s Favorites!</div>
            {favorites &&
            favorites.map((book) => (
            <p key={book.id}>
            <img src={book.thumbnail_url} alt={book.title}></img> {book.title}
            </p>
        ))}
        </div>
     );
}
 
export default FavoritesList;