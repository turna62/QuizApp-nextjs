import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ParticipateQuiz = () => {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(quiz?.questions.length).fill(''));
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/${id}`);
        setQuiz(response.data);
        setSelectedOptions(Array(response.data.questions.length).fill(''));
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const handleOptionSelect = (e, index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = e.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentPage < quiz.questions.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFinishQuiz = () => {
    let newScore = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === selectedOptions[index]) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const handleGoToHomePage = () => {
    router.push('/');
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const currentQuestion = quiz.questions[currentPage];

  return (
    <div>
      <h1>Participate in Quiz</h1>
      <h2>Question {currentPage + 1}</h2>
      <p>{currentQuestion.question}</p>
      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              id={`option-${index}`}
              name="options"
              value={option}
              checked={selectedOptions[currentPage] === option}
              onChange={(e) => handleOptionSelect(e, currentPage)}
            />
            <label htmlFor={`option-${index}`}>{option}</label>
          </li>
        ))}
      </ul>
      <button onClick={handlePreviousQuestion} disabled={currentPage === 0}>Previous</button>
      <button onClick={handleNextQuestion} disabled={currentPage === quiz.questions.length - 1}>Next</button>
      <button onClick={handleFinishQuiz}>Finish Quiz</button>
      <button onClick={handleGoToHomePage}>Home page</button>
      {score > -1 && <p>Your score: {score}</p>}
    </div>
  );
};

export default ParticipateQuiz;
