// pages/quiz/[id].js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const QuizDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const handleStartQuiz = () => {
    router.push(`/quiz/${id}/participate`);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Quiz Detail</h1>
      <h2>Number of Questions: {quiz.questions.length}</h2>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default QuizDetail;
