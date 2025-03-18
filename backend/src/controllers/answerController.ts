import { Request, response, Response } from "express";
import { updateAnswersModel, selectQuestionsWithAnswersModel, updateQuestionsWithAnswerModel, deleteAnswer, selectForServiceN8N } from "../models/answerModel";
import createInstanceAxios from "../functions/reqAxios";
import sendToS3AWS from "../services/sendToS3AWS";

const axios = createInstanceAxios();

interface Props {
  id: number;
  question: string;
  answer: string;

}

export class answerController {
  static async postAnswerController(req: Request, res: Response) {
    const { id, answer } = req.body as Props;
    if (!id || !answer) {
      res.status(400).json({ error: "id ou resposta vazio" });
      return;
    };

    const answers = await updateAnswersModel(id, answer);
    if (!answers) {
      res.status(400).json({ error: "Erro ao responder a questão." });
      return;
    };

    res.status(200).json({ answer });
    return;

  };

  static async postSendToN8N(req: Request, res: Response) {
    const { id } = req.body as Props;
    if (!id) res.status(400).json({ error: "insira pelo menos um id" });

    const dataAnswer = await selectForServiceN8N(id);
    if (!dataAnswer) res.status(500).json({ error: "Ocorreu um erro inesperado ao extrair informações no banco de dados." });

    const sendN8N = await axios.post("/idWebhookN8N", dataAnswer);
    
    if (!sendN8N) res.status(400).json({error: "Falha ao enviar ao N8N"});

    res.status(200).json({
      message: "Resposta enviada com sucesso.",
      response: sendN8N.data
    });

    sendToS3AWS();
  };

  static async getAllQuestionsWithAnswer(req: Request, res: Response) {
    const allQuestionsWithAnswer = await selectQuestionsWithAnswersModel();
    if (allQuestionsWithAnswer) {
      res.status(200).json(allQuestionsWithAnswer);
      return;

    } else {
      res.status(500).json({ message: "erro ao buscar perguntas e respostas" });
      return;

    };
  };

  static async putQuestionAndAnswer(req: Request, res: Response) {
    const { id, question, answer } = req.body as Props;
    const editQuestionOrAnswer = await updateQuestionsWithAnswerModel(id, answer, question);
    if (editQuestionOrAnswer) {
      res.json({ message: "Registro alterado com sucesso", id, question, answer });

    } else {
      res.status(500).json({ message: "Não foi possível alterar o registro." });

    };

  };

  static async deleteAnswerByID(req: Request, res: Response) {
    const { id } = req.body as Props;
    const delQuestionId = await deleteAnswer(id);

    if (delQuestionId) {
      res.json({ message: "Item deletado com sucesso:", id });

    } else {
      res.status(500).json({ message: "Não foi possível deletar o item: ", id });

    };
  };
};
