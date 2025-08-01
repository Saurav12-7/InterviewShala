import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";
import User from "../models/userSchema.js";
import errorHandler from "../utils/errorHandler.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(200).json({ success: true, data: userExist });
    }

    const user = await User.create({
      email,
      password,
      name,
      role,
    });
    if (user) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const createQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const quiz = await Quiz.create({
      title,
      description,
      user: id,
    });
    return res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: quiz,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const submitAnswer = async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;

    // Fetch the quiz to compare answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    // Calculate marks
    let marks = 0;
    answers.forEach((answer) => {
      const question = quiz.questions.id(answer.questionId);
      if (question && question.correctAnswer === answer.answer) {
        marks += 1; // Increment marks for each correct answer
      }
    });

    const answerDoc = new Answer({ userId, quizId, answers, marks });
    await answerDoc.save();
    res.status(201).json({
      success: true,
      message: "Answers submitted successfully",
      data: answerDoc,
    });
  } catch (err) {
    errorHandler(res, err);
  }
};

const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const quiz = await Quiz.find({ user: id });
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    errorHandler(res, error);
  }
};
const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { question, option1, option2, option3, option4, correctAnswer } =
      req.body;
    if (
      !quizId ||
      !question ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correctAnswer
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    const questionDoc = new Question({
      question,
      option1,
      option2,
      option3,
      option4,
      correctAnswer,
      quiz: quizId,
    });

    await questionDoc.save();
    quiz.questions.push(questionDoc._id);
    await quiz.save();
    res.status(201).json({
      success: true,
      message: "Question added successfully",
      data: questionDoc,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};
export { createUser, createQuiz, submitAnswer, getQuiz, addQuestion };
