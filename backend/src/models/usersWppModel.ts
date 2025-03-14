import prisma from "../functions/prisma";

// Destinado aos usuários do Siden

export async function selectUserWpp() {
  try {
    const allUsers = await prisma.users_siden.findMany({
      where: { is_active: true },
      select: {
        id: true,
        name: true,
        cellphone: true
      }
    });
    return allUsers;

  } catch (error) {
    console.error("Erro ao recuperar os usuários do Siden");
    return null;

  } finally {
    await prisma.$disconnect();

  };
};

export async function updateUserWpp(id: number, name: string, cellphone: string) {
  try {
    const uptDate = new Date();
    const uptUser = await prisma.users_siden.update({
      where: { id },
      data: {
        name,
        cellphone,
        updated_at: uptDate
      }
    });
    return uptUser;

  } catch (error) {
    console.error("Erro ao atualizar o usuário: ", error)

  } finally {
    await prisma.$disconnect();
  };
};

export async function deleteUserWpp(id: number) {
  try {
    const delDate = new Date();
    const delUser = await prisma.users_siden.update({
      where: { id },
      data: {
        is_active: false,
        deleted_at: delDate
      }
    });
    return delUser;

  } catch (error) {
    console.error("Erro ao deletar usuário", error);

  } finally {
    await prisma.$disconnect();
  };
};

export async function reactivateUserWpp(id: number) {
  try {
    const uptReactivate = new Date();
    const reactivateUser = await prisma.users_siden.update({
      where: { id },
      data: {
        is_active: true,
        updated_at: uptReactivate
      }
    });
    return reactivateUser;

  } catch (error) {
    console.error("Erro ao reativar usuário: ", error);

  } finally {
    await prisma.$disconnect();

  };
};