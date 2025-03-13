import { Request, Response } from "express";
import { selectQuestionsWithoutAnswersModel } from "../models/questionModel";

export class questionController {
  static async getUnansweredQuestions(req: Request, res: Response) {
    const questions = await selectQuestionsWithoutAnswersModel();
    if (questions) {
      res.json(questions);
    } else {
      res.status(500).json({ error: "Erro ao buscar perguntas." });
    }
  }
}