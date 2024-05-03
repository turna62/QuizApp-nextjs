import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: String,
});

const QuizSchema = new mongoose.Schema({
  questions: [QuestionSchema], 
});

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
