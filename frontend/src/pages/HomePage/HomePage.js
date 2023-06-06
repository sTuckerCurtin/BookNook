import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  const [classics, setClassics] = useState([]);

  useEffect(() => {
    fetchClassics();
  }, []);

  const fetchClassics = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=subject:classics"
      );
      setClassics(response.data.items);
    } catch (error) {
      console.error('Error getting classics', error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to BookNook!</h1>
      <h3>What is Booknook?</h3>
      <p>
        Introducing Booknook, a revolutionary app designed to enhance your
        reading experience. With Booknook, you have the power to embark on a
        thrilling journey through the vast world of literature. Whether you're
        an avid reader or simply looking for your next captivating read,
        Booknook has you covered. The app offers a comprehensive search feature
        that enables you to explore a vast collection of books, ensuring you
        find the perfect match for your interests. But Booknook doesn't stop
        there; it goes above and beyond by allowing you to track and manage your
        favorite books. With just a few taps, you can mark books as favorites,
        creating a personalized library tailored to your taste. Never lose track
        of your beloved reads again. Booknook is your trusted companion,
        ensuring you always have access to the books that inspire and captivate
        you. Start your reading adventure today with Booknook and unlock a world
        of literary wonders.
      </p>
      <h3>Classics</h3>
      <ul>
        {classics.map((classic) => (
          <li key={classic.id}>
            <img
              src={classic.volumeInfo.imageLinks?.thumbnail}
              alt={classic.volumeInfo.title}
            />
            <p>{classic.volumeInfo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );

};

export default HomePage;
