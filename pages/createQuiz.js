// pages/createQuiz.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', ''], correctAnswer: '' }]);
  const router = useRouter();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', ''], correctAnswer: '' }]);
  };

  const handleSaveQuiz = async () => {
    try {
      console.log('Saving quiz:', { questions });
      await axios.post('/api/quiz', { questions: questions });
      router.push('/');
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };
  
  return (
    <div>
      <h1>Create Quiz</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
            placeholder="Enter question"
          />
          {question.options.map((option, optionIndex) => (
            <input
              key={optionIndex}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
              placeholder={`Option ${optionIndex + 1}`}
            />
          ))}
          <select
            value={question.correctAnswer}
            onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
          >
            {question.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSaveQuiz}>Save Quiz</button>
    </div>
  );
};

export default CreateQuiz;
