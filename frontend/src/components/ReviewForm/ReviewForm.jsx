import React from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "./ReviewForm.css"

const ReviewForm = ({ bookId, fetchBookReviews }) => {
  const [user, token] = useAuth();
  const defaultValues = {
    book_id: bookId,
    text: '',
    rating: '',
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(defaultValues, postNewReview);

  async function postNewReview() {
    console.log("Happen")
    try {
        console.log(formData)
      let response = await axios.post('http://127.0.0.1:5000/api/reviews', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response.data);
      fetchBookReviews();
      reset()
    } catch (error) {
      console.log(error.response.data);
    }
  }



  return (
    <div className='reviewform'>
      <form onSubmit={handleSubmit}>
        <label>
          Review:{' '}
          <input type="text" name="text" value={formData.text} onChange={handleInputChange} />
        </label>
        <label>
          Rating:{' '}
          <input type="text" name="rating" value={formData.rating} onChange={handleInputChange} />
        </label>
        <button  type='submit' >Add Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
