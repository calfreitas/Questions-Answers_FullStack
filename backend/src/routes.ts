import express from "express";
import { questionController } from "./controllers/questionController";
import { answerController } from "./controllers/answerController";

const router = express.Router();

//Questions
router.get("/questions/getUnanswered", questionController.getUnansweredQuestions);

//Answers
router.post("/answers/postAnswer", answerController.postAnswerController);

export default router;