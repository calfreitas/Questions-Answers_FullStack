import { Request, Response } from "express";
import { updateAnswersModel } from "../models/answerModel";

interface Props {
  id: number;
  answer: string;
}

export class answerController {
  static async postAnswerController(req: Request, res: Response) {

    const { id, answer } = req.body as Props;

    if (!id || !answer) {
      res.status(400).json({ error: "id ou resposta vazio" });
      return; 
    }

    const answers = await updateAnswersModel(id, answer);

    if (!answers) {
      res.status(400).json({ error: "Erro ao responder a questão." });
      return;
    }

    res.status(200).json({ answer });
    return;
  }
}

export class answerManagerController {
  static async getAllAnswers(req: Request, res: Response) {
    
  } 
}
