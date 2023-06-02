import React from "react";

function ReviewList({ reviews }) {


  
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.user?.username}>
          <h3>User: {review.user?.username}</h3>
          <h3>Book Rating: {review.rating}</h3>
          <p>Review: {review.text}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
