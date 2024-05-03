// pages/api/quizzes.js

import dbConnect from '../../utils/dbConnect';
import Quiz from '../../models/Quiz';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const quizzes = await Quiz.find({}, 'question');
      // console.log('Quizzes:', quizzes);
      res.status(200).json(quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
