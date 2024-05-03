import dbConnect from '../../utils/dbConnect';
import Quiz from '../../models/Quiz';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.status(405).json({ success: false });
      break;
  }
}

async function handlePost(req, res) {
  
  await dbConnect();

  try {
    const { questions } = req.body;

    const quiz = new Quiz({ questions });

    const savedQuiz = await quiz.save();

    res.status(201).json({ success: true, data: savedQuiz });
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.status(400).json({ success: false });
  }
}
