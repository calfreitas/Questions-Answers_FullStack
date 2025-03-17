import { Request, Response } from "express";
import { deleteQuestion, selectQuestionsWithoutAnswersModel, updateQuestion } from "../models/questionModel";

interface Props {
  id: number;
  question: string;
}

export class questionController {
  static async getUnansweredQuestions(req: Request, res: Response) {
    const questions = await selectQuestionsWithoutAnswersModel();
    if (questions) {
      res.status(200).json(questions);

    } else {
      res.status(500).json({ error: "Erro ao buscar perguntas." });

    }
  }

  static async putQuestionByID(req: Request, res: Response) {
    const { id, question } = req.body as Props;
    if (!id || !question) res.status(401).json({ message: "id ou question não preenchido." });

    const uptQuestion = await updateQuestion(id, question);
    if (uptQuestion) {
      res.json({ message: "Pergunta atualizada com sucesso: ", id });

    } else {
      res.status(500).json({ message: "Não foi possível alterar a pergunta com o id: ", id });

    }
  }

  static async deleteQuestionByID(req: Request, res: Response) {
    const { id } = req.body as Props;
    if (!id) res.status(400).json({ message: "id não fornecido" });

    const delQuestionId = await deleteQuestion(id);
    if (delQuestionId) {
      res.json({ message: "Item deletado com sucesso:", id });

    } else {
      res.status(500).json({ message: "Não foi possível deletar o item: ", id });

    }
  }
}