// pages/quiz/[id]/result.js

import React from 'react';
import { useRouter } from 'next/router';

const QuizResultPage = () => {
  const router = useRouter();
  const { score } = router.query;

  return (
    <div>
      <h1>Quiz Result</h1>
      <p>Your score: {score}</p>
    </div>
  );
};

export default QuizResultPage;
