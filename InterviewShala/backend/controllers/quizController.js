import asyncHandler from "../middlewares/asyncHandler.js";
import { Quiz, Question, Answer } from "../models/quizModel.js";
import User from "../models/userModel.js";

// @desc    Create a new quiz
// @route   POST /api/quiz
// @access  Private/Admin
const createQuiz = asyncHandler(async (req, res) => {
  const { title, description, category, difficulty, timeLimit, questions } = req.body;

  if (!title || !category || !difficulty || !questions || questions.length === 0) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create the quiz
  const quiz = new Quiz({
    title,
    description,
    category,
    difficulty,
    timeLimit: timeLimit || 300,
    createdBy: req.user._id,
    totalMarks: questions.length,
  });

  const createdQuiz = await quiz.save();

  // Create questions for the quiz
  const questionPromises = questions.map(async (q) => {
    const question = new Question({
      question: q.question,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      correctAnswer: q.correctAnswer,
      quiz: createdQuiz._id,
    });
    return await question.save();
  });

  const createdQuestions = await Promise.all(questionPromises);

  // Update quiz with question IDs
  createdQuiz.questions = createdQuestions.map(q => q._id);
  await createdQuiz.save();

  res.status(201).json({
    success: true,
    data: {
      quiz: createdQuiz,
      questions: createdQuestions,
    },
  });
});

// @desc    Get all quizzes
// @route   GET /api/quiz
// @access  Public
const getQuizzes = asyncHandler(async (req, res) => {
  const { category, difficulty, search } = req.query;
  
  let filter = { isActive: true };
  
  if (category) {
    filter.category = category;
  }
  
  if (difficulty) {
    filter.difficulty = difficulty;
  }
  
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const quizzes = await Quiz.find(filter)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: quizzes.length,
    data: quizzes,
  });
});

// @desc    Get quiz by ID
// @route   GET /api/quiz/:id
// @access  Public
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
    .populate('createdBy', 'name email')
    .populate({
      path: 'questions',
      select: 'question option1 option2 option3 option4',
    });

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  res.json({
    success: true,
    data: quiz,
  });
});

// @desc    Take a quiz
// @route   POST /api/quiz/:id/take
// @access  Private
const takeQuiz = asyncHandler(async (req, res) => {
  const { answers, timeTaken } = req.body;
  const { id } = req.params;

  const quiz = await Quiz.findById(id).populate('questions');
  
  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  if (!quiz.isActive) {
    res.status(400);
    throw new Error("This quiz is not available");
  }

  // Check if user has already taken this quiz
  const existingAnswer = await Answer.findOne({
    userId: req.user._id,
    quizId: id,
  });

  if (existingAnswer) {
    res.status(400);
    throw new Error("You have already taken this quiz");
  }

  // Calculate marks
  let marks = 0;
  const totalQuestions = quiz.questions.length;

  answers.forEach((answer) => {
    const question = quiz.questions.find(q => q._id.toString() === answer.questionId);
    if (question && question.correctAnswer === answer.answer) {
      marks += 1;
    }
  });

  // Create answer record
  const answerRecord = new Answer({
    userId: req.user._id,
    quizId: id,
    answers,
    marks,
    totalQuestions,
    timeTaken,
    completedAt: new Date(),
  });

  await answerRecord.save();

  res.status(201).json({
    success: true,
    data: {
      marks,
      totalQuestions,
      percentage: Math.round((marks / totalQuestions) * 100),
      timeTaken,
    },
  });
});

// @desc    Get user's quiz results
// @route   GET /api/quiz/results
// @access  Private
const getUserResults = asyncHandler(async (req, res) => {
  const answers = await Answer.find({ userId: req.user._id })
    .populate({
      path: 'quizId',
      select: 'title category difficulty',
    })
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: answers.length,
    data: answers,
  });
});

// @desc    Get quiz results (Admin)
// @route   GET /api/quiz/:id/results
// @access  Private/Admin
const getQuizResults = asyncHandler(async (req, res) => {
  const answers = await Answer.find({ quizId: req.params.id })
    .populate('userId', 'name email')
    .sort({ marks: -1 });

  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  res.json({
    success: true,
    data: {
      quiz: {
        title: quiz.title,
        category: quiz.category,
        difficulty: quiz.difficulty,
        totalMarks: quiz.totalMarks,
      },
      results: answers,
      totalParticipants: answers.length,
      averageScore: answers.length > 0 
        ? Math.round(answers.reduce((sum, ans) => sum + ans.marks, 0) / answers.length * 100) / 100
        : 0,
    },
  });
});

// @desc    Update quiz
// @route   PUT /api/quiz/:id
// @access  Private/Admin
const updateQuiz = asyncHandler(async (req, res) => {
  const { title, description, category, difficulty, timeLimit, isActive } = req.body;

  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  // Check if user is admin or quiz creator
  if (!req.user.isAdmin && quiz.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this quiz");
  }

  quiz.title = title || quiz.title;
  quiz.description = description || quiz.description;
  quiz.category = category || quiz.category;
  quiz.difficulty = difficulty || quiz.difficulty;
  quiz.timeLimit = timeLimit || quiz.timeLimit;
  quiz.isActive = isActive !== undefined ? isActive : quiz.isActive;

  const updatedQuiz = await quiz.save();

  res.json({
    success: true,
    data: updatedQuiz,
  });
});

// @desc    Delete quiz
// @route   DELETE /api/quiz/:id
// @access  Private/Admin
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (!quiz) {
    res.status(404);
    throw new Error("Quiz not found");
  }

  // Check if user is admin or quiz creator
  if (!req.user.isAdmin && quiz.createdBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this quiz");
  }

  // Delete related questions and answers
  await Question.deleteMany({ quiz: quiz._id });
  await Answer.deleteMany({ quizId: quiz._id });
  await quiz.deleteOne();

  res.json({
    success: true,
    message: "Quiz deleted successfully",
  });
});

export {
  createQuiz,
  getQuizzes,
  getQuizById,
  takeQuiz,
  getUserResults,
  getQuizResults,
  updateQuiz,
  deleteQuiz,
}; 