import prisma from "../functions/prisma";

export async function getQuestionsWithoutAnswersModel() {
  try {
    const allQuestions = await prisma.questions.findMany({
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
    return allQuestions;
  } catch (error) {
    console.error("Erro ao buscar questões:", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}