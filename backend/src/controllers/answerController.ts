import { Request, Response } from "express";
import { postAnswersModel } from "../models/answerModel";

interface Props {
  id: number;
  answer: string;
}

export class answerController {
  static async postAnswerController(req: Request, res: Response) {

    const { id, answer } = req.body as Props;

    const answers = await postAnswersModel( id, answer );

    if (!answers) res.status(400).json({ error: "Erro ao responder a questão." });

    res.json(answers);
  }
}
