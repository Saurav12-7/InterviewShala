import express from "express";
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  takeQuiz,
  getUserResults,
  getQuizResults,
  updateQuiz,
  deleteQuiz,
} from "../controllers/quizController.js";
import { authenticate as protect, authorizeAdmin as admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.route("/").get(getQuizzes);
router.route("/:id").get(getQuizById);

// Protected routes
router.route("/results").get(protect, getUserResults);
router.route("/:id/take").post(protect, takeQuiz);

// Admin routes
router.route("/").post(protect, admin, createQuiz);
router.route("/:id").put(protect, admin, updateQuiz);
router.route("/:id").delete(protect, admin, deleteQuiz);
router.route("/:id/results").get(protect, admin, getQuizResults);

export default router; 