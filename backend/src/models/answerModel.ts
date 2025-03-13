import prisma from "../functions/prisma";
import createInstanceAxios from '../functions/reqAxios';

const axios = createInstanceAxios();

export async function updateAnswersModel(id: number, answer: string) {
  try {

    const existingAnswer = await prisma.questions.findUnique({
      where: {
        id,
        answer: null
      },
      select: {
        id: true
      }
    })

    if (!existingAnswer) return null;

    const postAnswers = await prisma.questions.update({
      where: {
        id
      },
      data: {
        answer
      },
    });

    if(!postAnswers) return null;

    return postAnswers;

  } catch (error) {
    await sendToN8N(id, `Não foi possível processar uma de suas perguntas, favor contatar com o time de engenharia ou tente enviar uma nova mensagem ao Siden ${id}.`);
    return null;

  } finally {
    sendToN8N(id, answer)
    await prisma.$disconnect();

  }
}

export async function sendToN8N(id: number, answer: string) {
  try {
    const question = await prisma.questions.findUnique({
      where: { id },
      select: {
        id: true,
        question: true,
        answer: true,
        cellphone: true
      },
    });
    if (!question) {
      throw new Error("Questão não encontrada no banco.");
    }
    const payload = {
      id: question.id,
      question: question.question,
      answer: answer,
      cellphone: question.cellphone
    };

    const response = await axios.post("/routeN8N", payload);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar para o n8n:", error);
    return null;
  }
}