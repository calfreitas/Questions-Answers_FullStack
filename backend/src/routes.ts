import express from "express";
import { questionController } from "./controllers/questionController";
import { answerController } from "./controllers/answerController";
import { authController } from "./controllers/authController";
import { authenticateToken } from "./middleware/auth/jwtAuth";

const router = express.Router();

//Auth
router.post('/loginAuth', authController.postLogin);

//Answers
router.post("/answers/postAnswer", authenticateToken, answerController.postAnswerController);

//Questions
router.get("/questions/getUnanswered", authenticateToken, questionController.getUnansweredQuestions);

export default router;