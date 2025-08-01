import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";
import User from "../models/userSchema.js";

const getQuiz = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide user ID" });
    }

    const answers = await Answer.find({ userId });
    const quizzes = await Quiz.find({});

    const completedQuizzes = quizzes.filter((quiz) =>
      answers.some((answer) => answer.quizId.toString() === quiz._id.toString())
    );
    const unattemptedQuizzes = quizzes.filter(
      (quiz) =>
        !answers.some(
          (answer) => answer.quizId.toString() === quiz._id.toString()
        )
    );

    res.status(200).json({
      success: true,
      data: {
        completedQuizzes,
        unattemptedQuizzes,
      },
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide quiz ID" });
    }

    const quiz = await Quiz.findById(quizId);
    console.log("quiz", quiz);

    return res.status(200).json({ success: true, data: quiz });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getQuestionById = async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide quiz ID" });
    }
    const questions = await Question.find({ quiz: quizId });
    return res.status(200).json({ success: true, data: questions });
  } catch (error) {
    errorHandler(res, error);
  }
};

const attendQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userId, marks } = req.body;
    if (!quizId || !userId || !marks) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(400)
        .json({ success: false, message: "Quiz not found" });
    }

    const newAnswer = new Answer({
      userId,
      quizId,
      marks,
    });
    await newAnswer.save();

    return res
      .status(200)
      .json({ success: true, message: "Quiz submitted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getResult = async (req, res) => {
  try {
    const { quizId } = req.params;
    if (!quizId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide quiz ID" });
    }

    const answers = await Answer.find({ quizId });
    console.log("answers", answers);

    const data = await Promise.all(
      answers.map(async (answer) => {
        const user = await User.findById(answer.userId);
        return {
          marks: answer.marks,
          user: user ? user.name : "Unknown User",
        };
      })
    );

    return res.status(200).json({ success: true, data });
  } catch (error) {
    errorHandler(res, error);
  }
};

export { getQuiz, getQuizById, getQuestionById, attendQuizById, getResult };
