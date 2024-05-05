// pages/index.js

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`/api/quizzes?page=${currentPage}`);
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [currentPage]);

  const calculateQuizNumber = (index) => {
    return (currentPage - 1) * 7 + index + 1;
  };

  return (
    <div>
      <h1>Welcome to Quiz App</h1>
      <Link href="/createQuiz">Create Quiz</Link>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={quiz._id}>
            <Link href={`/quiz/${quiz._id}`}>Quiz {calculateQuizNumber(index)}</Link>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default Home;
