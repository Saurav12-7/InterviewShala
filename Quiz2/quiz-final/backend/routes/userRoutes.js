import express from "express";
import {
  createUser,
  createQuiz,
  submitAnswer,
  getQuiz,
  addQuestion
} from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/createQuiz/:id", createQuiz);
router.post("/add-question/:quizId", addQuestion)
router.post("/answers", submitAnswer);

router.get("/getQuiz/:id", getQuiz);

export default router;
