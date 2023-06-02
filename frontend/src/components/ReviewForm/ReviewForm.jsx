import React from 'react';
import useCustomForm from '../../hooks/useCustomForm';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ReviewForm = ({ bookId, fetchBookReviews }) => {
  const [user, token] = useAuth();
  const defaultValues = {
    book_id: bookId,
    text: '',
    rating: '',
  };

  const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues, postNewReview);

  async function postNewReview() {
    try {
        console.log(formData)
      let response = await axios.post('http://127.0.0.1:5000/api/reviews', formData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response.data);
      fetchBookReviews(); 
    } catch (error) {
      console.log(error.response.data);
    }
  }

  function refreshPage(){
    window.location.reload();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Review:{' '}
          <input type="text" name="text" value={formData.text} onChange={handleInputChange} />
        </label>
        <label>
          Rating:{' '}
          <input type="text" name="rating" value={formData.rating} onChange={handleInputChange} />
        </label>
        <button type='button' onClick={refreshPage}>Add Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
