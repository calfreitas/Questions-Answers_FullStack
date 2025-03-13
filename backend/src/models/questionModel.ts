import prisma from "../functions/prisma";

// SELECT
export async function selectQuestionsWithoutAnswersModel() {
  try {
    const allQuestionsWithoutAnswer = await prisma.questions.findMany({
      where: {
        answer: null,
      },
      select: {
        id: true,
        question: true,
        answer: true,
      }
    });
    //console.log('passei no MODEL');
    return allQuestionsWithoutAnswer;
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function selectQuestionsWithAnswerModel() {
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
    return null;

  } finally {
    await prisma.$disconnect();
  }
}

// UPDATE
export async function updateQuestionsWithAnswerModel(id: number, answer: string) {
  try {
    const allQuestionsWithAnswerUpdate = await prisma.questions.update({
      where: {
        id
      },
      data: {
        answer
      },
    });
    return allQuestionsWithAnswerUpdate;

  } catch (error) {
    console.error("Erro ao atualizar resposta: ", error);
    return null;

  } finally {
    await prisma.$disconnect();
  }
}

// DELETE
export async function deleteQuestion(id: number) {
  try {
    const deleteQuestionId = await prisma.questions.delete({
      where: {
        id
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