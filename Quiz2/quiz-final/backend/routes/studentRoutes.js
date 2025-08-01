import express from "express";
import { getQuiz, getQuizById,getQuestionById, attendQuizById, getResult  } from "../controllers/studentController.js";

const router = express.Router();

router.get("/getQuiz/:userId", getQuiz);
router.get("/getQuizById/:quizId", getQuizById);
router.get("/getQuestionById/:quizId", getQuestionById);
router.get("/getResult/:quizId", getResult);


router.post("/attendQuizById/:quizId", attendQuizById);

export default router;
