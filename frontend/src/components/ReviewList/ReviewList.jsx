import React from "react";

function ReviewList({ reviews, averageRating }) {
  return (
    <div>
      <p>Average Rating: {averageRating}</p>
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
