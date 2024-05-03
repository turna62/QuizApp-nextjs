import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://turna62:VSjSBCxNo7QmgwXK@cluster0.tgices1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db('Quiz').collection('Quizzes');
}


export default async function handler(req, res) {
  const collection = await connectToDatabase();

  if (req.method === 'POST') {
    const { newQuiz } = req.body;

    try {
      const result = await collection.insertOne(newQuiz);
      res.status(200).json({ message: 'Quiz added!', id: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while trying to add the quiz.', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}