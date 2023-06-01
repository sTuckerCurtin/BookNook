import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Book from '../../components/Book/Book';
import ReviewList from '../../components/ReviewList/ReviewList';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import SearchPage from '../SearchPage/SearchPage';

function BookDetailsPage() {
  const { book_id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [book_id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${book_id}`);
      const bookData = response.data;
      const bookInfo = {
        title: bookData.volumeInfo.title,
        author: bookData.volumeInfo.authors?.join(', '),
        description: bookData.volumeInfo.description,
        coverImageUrl: bookData.volumeInfo.imageLinks?.thumbnail,
      };
      setBookDetails(bookInfo);
    } catch (error) {
      console.error('Error getting book details', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/bookinfo/${book_id}`);
      const reviewData = response.data;
      setReviews(reviewData.reviews);
    } catch (error) {
      console.error('Error getting reviews', error);
    }
  };
  

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Book Details Page</h1>
      <Book book={bookDetails} />
      {reviews.length > 0 && <ReviewList reviews={reviews} />}
    </div>
  );
}

export default BookDetailsPage;