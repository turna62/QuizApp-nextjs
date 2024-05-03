import { useState } from 'react';

export default function CreateQuiz({ onQuizCreate }) {
  const [quiz, setQuiz] = useState({
    questions: [
      {
        questionText: '',
        answerOptions: [
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false },
          { answerText: '', isCorrect: false },
        ],
      },
    ],
  });


  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          questionText: '',
          answerOptions: [
            { answerText: '', isCorrect: false },
            { answerText: '', isCorrect: false },
            { answerText: '', isCorrect: false },
            { answerText: '', isCorrect: false },
          ],
        },
      ], 
    });
  };

  const addAnswerOption = (questionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].answerOptions.push({ answerText: '', isCorrect: false });
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const questions = quiz.questions.map(question => ({
      question: question.questionText,
      options: question.answerOptions.map(answerOption => answerOption.answerText),
      correctAnswer: question.answerOptions.find(answerOption => answerOption.isCorrect)?.answerText || '' // Get correct answer text
    }));
    
    console.log('Questions:', questions); 

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ questions }), 
      });
  
      if (response.ok) {
        const data = await response.json();
        onQuizCreate(data.data); 
      } else {
        throw new Error('Failed to save quiz');
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };
  
  const handleQuestionChange = (e, questionIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].questionText = e.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].answerOptions[answerIndex].answerText = e.target.value;
    setQuiz({ ...quiz, questions: newQuestions });
  };
  
  const handleCorrectChange = (questionIndex, answerIndex) => {
    const newQuestions = [...quiz.questions];
    newQuestions[questionIndex].answerOptions.forEach((option, index) => {
      option.isCorrect = index === answerIndex;
    });
  
    const correctAnswerIndex = newQuestions[questionIndex].answerOptions.findIndex(option => option.isCorrect);
    if (correctAnswerIndex !== -1) {
      newQuestions[questionIndex].correctAnswer = newQuestions[questionIndex].answerOptions[correctAnswerIndex].answerText;
    }
  
    setQuiz({ ...quiz, questions: newQuestions });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      {quiz.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <input
            type="text"
            placeholder="Question"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(e, questionIndex)}
          />
          {question.answerOptions.map((answerOption, answerIndex) => (
            <div style={{marginTop:'10px'}} key={answerIndex}>
              <input
                type="text"
                placeholder="Answer"
                value={answerOption.answerText}
                onChange={(e) => handleAnswerChange(e, questionIndex, answerIndex)}
              />
              <input
                type="radio"
                checked={answerOption.isCorrect}
                onChange={() => handleCorrectChange(questionIndex, answerIndex)}
              />
            </div>
          ))}
          <button style={{marginTop:'15px'}} type="button" onClick={() => addAnswerOption(questionIndex)}>
            Add Answer Option
          </button>
        </div>
      ))}
      <div style={{position: 'relative', top: '40px'}}>
      <button style={{marginRight:'30px'}} type="button" onClick={addQuestion}>
  Add Question
    </button>
      <button type="submit">Create Quiz</button>
      </div>
      
    </form>
  );
}