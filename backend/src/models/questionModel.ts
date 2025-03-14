import prisma from "../functions/prisma";

// SELECT
export async function selectQuestionsWithoutAnswersModel() {
  try {
    const allQuestionsWithoutAnswer = await prisma.questions.findMany({
      where: { answer: null },
      select: {
        id: true,
        question: true,
        answer: true,
      }
    });
    return allQuestionsWithoutAnswer;

  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    return null;

  } finally {
    await prisma.$disconnect();

  } 
}

// UPDATE
export async function updateQuestion( id: number, question: string ) {
  try {
    const questionUpdate = await prisma.questions.update({
      where:{ id },
      data: {
        question
      }
    });
    return questionUpdate

  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error)
    return null;

  } finally {
    await prisma.$disconnect();

  }
}

// DELETE
export async function deleteQuestion(id: number) {
  try {
    const dateTimeDel = new Date();
    const deleteQuestionId = await prisma.questions.update({
      where: { id },
      data: {
        is_active: false,
        question_deleted_at: dateTimeDel
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