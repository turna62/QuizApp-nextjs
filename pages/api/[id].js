// pages/api/quizzes/[id].js

import dbConnect from '../../utils/dbConnect';
import Quiz from '../../models/Quiz';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      await dbConnect();
      const quiz = await Quiz.findById(id);
      res.status(200).json(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
