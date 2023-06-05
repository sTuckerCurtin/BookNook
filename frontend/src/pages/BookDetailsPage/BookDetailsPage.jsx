import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Book from '../../components/Book/Book';
import ReviewList from '../../components/ReviewList/ReviewList';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import SearchPage from '../SearchPage/SearchPage';
import { Routes, Route } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import "./BookDetailsPage.css"

function BookDetailsPage() {
  const { book_id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newFavorite, setNewFavorite] = useState(null);
  const [user, token] = useAuth();
  const [averageRating, setAverageRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);


  useEffect(() => {
    fetchBookDetails();
    fetchReviews();
  }, [book_id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${book_id}`
      );
      const bookData = response.data;
      const bookInfo = {
        id: book_id,
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
      const config = {headers: {Authorization: `Bearer ${token}`}}

      const response = await axios.get(`http://127.0.0.1:5000/api/bookinfo/${book_id}`, config);
      const reviewData = response.data;
      
      console.log(reviewData.average_rating)
      setAverageRating(reviewData.average_rating)
      setReviews(reviewData.reviews);
    } catch (error) {
      console.error('Error getting reviews', error);
    }
  };

 

 const postNewFavorite = async (book) => {
    try {
      const defaultValues = {
        book_id: book_id,
        title: bookDetails.title,
        thumbnail_url: bookDetails.coverImageUrl,
      };
  
      const response = await axios.post(
        "http://127.0.0.1:5000/api/favorites",
        defaultValues,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
  
      console.log(response.data);
      setNewFavorite(response.data);
      setIsFavorite((prevState) => !prevState);;
    } catch (error) {
      console.error('Error posting new favorite', error);
    }
  };

  if (!bookDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className='pagelayout'>
      <h1>Book Details Page</h1>
      <Book book={bookDetails} />
      <button
        className={`favorite-button ${isFavorite ? 'favorite-button-yellow' : 'favorite-button-black'}`}
        onClick={postNewFavorite}
      >
        {isFavorite ? 'Favorited' : 'Favorite'}
      </button>
      <ReviewForm bookId={book_id} fetchBookReviews={fetchReviews} newFavorite={newFavorite} />
      <ReviewList reviews={reviews} averageRating={averageRating} />
    </div>
  );
  }  
export default BookDetailsPage;