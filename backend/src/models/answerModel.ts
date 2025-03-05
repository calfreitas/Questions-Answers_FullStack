import { isPropertyAccessChain } from "typescript";
import prisma from "../functions/prisma";
import createInstanceAxios from '../functions/reqAxios';

const axios = createInstanceAxios();


// Envia a resposta ao Banco de dados
export async function postAnswersModel(id: number, answer: string) {
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
    console.error("Erro ao responder questão:", error);
    await sendToN8N(id, `Não foi possível processar uma de suas perguntas, favor contatar com o time de engenharia ou tente enviar uma nova mensagem ao Siden ${id}.`);
    return null;

  } finally {
    sendToN8N(id, answer)
    await prisma.$disconnect();

  }
}

// Envia a resposta ao N8N
export async function sendToN8N(id: number, answer: string) {
  try {
    // Busca a questão completa para obter mais informações
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
      // montar o payload com numero de telefone + resposta e usar o id da questão de postAnswersModel
      id: question.id,
      question: question.question,
      answer: answer,
      cellphone: question.cellphone
    };

    console.log('N8N Webhook', process.env.N8N_WEBHOOK)
    console.log("Payload", payload)

    const response = await axios.post("/bc32d959-6d31-48df-8db9-491276a2490d", payload);
    console.log("Enviado para o n8n com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar para o n8n:", error);
    return null;
  }
}