import prisma from "../functions/prisma";

export async function updateAnswersModel(id: number, answer: string) {
  try {

    const existingAnswer = await prisma.questions.findUnique({
      where: { id, answer: null },
      select: {
        id: true
      }
    });

    if (!existingAnswer) return null;

    const postAnswers = await prisma.questions.update({
      where: { id },
      data: {
        answer
      }
    });

    if (!postAnswers) return null;

    return postAnswers;

  } catch (error) {
    return null;

  } finally {
    await prisma.$disconnect();

  }
}

export async function selectQuestionsWithAnswersModel() {
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

export async function selectForServiceN8N(id: number) {
  try {
    const n8nDataAnswer = await prisma.questions.findUnique({
      where: { id },
      select: {
        id: true,
        question: true,
        answer: true, 
        cellphone: true
      }
    });
    return n8nDataAnswer;

  } catch (error) {
    console.error("Erro ao buscar perguntas com respostas ao N8N:", error);
    return error;

  } finally {
    await prisma.$disconnect();

  }
}

export async function selectForServiceS3AWS() {
  try {
    const allForServiceS3 = await prisma.questions.findMany({
      where: {
        answer: {
          not: null
        },
        is_active: true
      },
      select: {
        id: true,
        question: true,
        answer: true
      }
    });
    return allForServiceS3;

  } catch (error) {
    console.error("Erro ao buscar perguntas com respostas:", error);
    return error;

  } finally {
    await prisma.$disconnect();

  }
}