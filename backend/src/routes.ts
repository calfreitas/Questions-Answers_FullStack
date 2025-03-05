import express from "express";
import { questionController } from "./controllers/questionController";
import { answerController } from "./controllers/answerController";
import { AuthService } from "./controllers/authController";

const router = express.Router();

//Questions
router.get("/questions/getUnanswered", questionController.getUnansweredQuestions);

//Answers
router.post("/answers/postAnswer", answerController.postAnswerController);

//Auth
router.post('/loginAuth', async (req,res) => {await AuthService.postLogin(req,res)});

export default router;