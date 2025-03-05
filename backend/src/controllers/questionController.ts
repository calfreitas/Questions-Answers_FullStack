import { Request, Response } from "express";
import { getQuestionsWithoutAnswersModel } from "../models/questionModel";

export class questionController {
  static async getUnansweredQuestions(req: Request, res: Response) {
    const questions = await getQuestionsWithoutAnswersModel();
    if (questions) {
      res.json(questions);
    } else {
      res.status(500).json({ error: "Erro ao buscar perguntas." });
    }
  }
}