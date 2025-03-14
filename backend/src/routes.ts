import express from "express";
import { authenticateToken } from "./middleware/auth/jwtAuth";
import { authController } from "./controllers/authController";
import { usersController } from "./controllers/usersController"
import { answerController } from "./controllers/answerController";
import { questionController } from "./controllers/questionController";

const router = express.Router();

//Auth
router.post('/loginAuth', authController.postLogin);

//Users Siden Wpp
router.get("/users/getUsers", authenticateToken, usersController.getUsersSiden);
router.put("/users/putUsers", authenticateToken, usersController.putUsersSiden)
router.post("/users/")
router.delete("/users/")

//Answers
router.get("/answers/getAllQuestionsWithAnswer", authenticateToken, answerController.getAllQuestionsWithAnswer);
router.post("/answers/postAnswer", authenticateToken, answerController.postAnswerController);
router.put("/answers/putQuestionOrAnswer", authenticateToken, answerController.putQuestionAndAnswer);
router.delete("/answers/deleteAnswer", authenticateToken, answerController.deleteAnswerByID);

//Questions - Unico endpoint que o post na verdade é advindo de outra aplicação ( N8N )
router.get("/questions/getUnanswered", authenticateToken, questionController.getUnansweredQuestions);
router.put("/questions/putQuestion", authenticateToken, questionController.putQuestionByID)
router.delete("/questions/deleteQuestion", authenticateToken, questionController.deleteQuestionByID);

export default router;