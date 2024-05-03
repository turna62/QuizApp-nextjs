// pages/quiz/[id].js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const QuizPage = ({ quiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const router = useRouter();

  const handleAnswerSubmit = async () => {
    const answerData = {
      quizId: quiz.id,
      selectedAnswer,
    };

    try {
      await axios.post('/api/quiz', answerData);
      router.push('/');
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div>
      <h1>{quiz.question}</h1>
      {quiz.options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            id={`option${index}`}
            name="options"
            value={option}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            checked={selectedAnswer === option}
          />
          <label htmlFor={`option${index}`}>{option}</label>
        </div>
      ))}
      <button onClick={handleAnswerSubmit}>Submit Answer</button>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  // Replace "http://your-api-url/" with the actual URL of your API
  const res = await fetch(`http://your-api-url/quiz/${id}`);
  const quiz = await res.json();

  return {
    props: {
      quiz,
    },
  };
}

export default QuizPage;
