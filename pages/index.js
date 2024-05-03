// pages/index.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Welcome to Quiz App</h1>
      <Link href="/createQuiz">Create Quiz</Link>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={quiz._id}>
            <Link href={`/quiz/${quiz._id}`}>Quiz {index + 1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
