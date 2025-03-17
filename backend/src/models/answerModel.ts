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

    if (!postAnswers) return null;

    return postAnswers;

  } catch (error) {
    await sendToN8N(id, `Não foi possível processar uma de suas perguntas, favor contatar com o time de engenharia ou tente enviar uma nova mensagem ${id}.`);
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

  } finally {
    await prisma.$disconnect();

  }
}

export async function selectQuestionsWithoutAnswersModel() {
  try {
    const allQuestionsWithAnswer = await prisma.questions.findMany({
      where: {
        answer: {
          not: null
        }
      },
      select: {
        id: true,
        question: true,
        answer: true
      }
    });
    return allQuestionsWithAnswer;

  } catch (error) {
    console.error("Erro ao buscar perguntas com respostas:", error);
    return error;

  } finally {
    await prisma.$disconnect();
    
  }
}

// UPDATE
export async function updateQuestionsWithAnswerModel(id: number, answer: string, question: string) {
  try {
    const dateTimeUpt = new Date();
    const allQuestionsWithAnswerUpdate = await prisma.questions.update({
      where: { id },
      data: {
        answer,
        question,
        answer_updated_at: dateTimeUpt
      }

    });
    return allQuestionsWithAnswerUpdate;

  } catch (error) {
    console.error("Erro ao atualizar resposta: ", error);
    return null;

  } finally {
    await prisma.$disconnect();

  }
}

export async function deleteAnswer(id: number) {
  try {
    const dateTimeDel = new Date();
    const deleteQuestionId = await prisma.questions.update({
      where: { id },
      data: {
        is_active: false,
        answer_deleted_at: dateTimeDel
      }

    });
    return deleteQuestionId;

  } catch (error) {
    console.error("Erro ao deletar id da pergunta/resposta: ", error);
    return null;

  } finally {
    await prisma.$disconnect();

  }
}

