import { Prisma } from "@prisma/client";
import prisma from "../functions/prisma";

// Destinado aos Usuário do Whatsapp

type Result<T> = { success: true; data: T } | { success: false; error: string; statusCode: number };

export async function selectUserWpp(): Promise<Result<object>> {
  try {
    const allUsers = await prisma.users_siden.findMany({
      where: { is_active: true },
      select: {
        id: true,
        name: true,
        cellphone: true, 
        base: true
      }
    });
    return { success: true, data: allUsers };

  } catch (error) {
    console.error("Erro ao recuperar os usuários do Siden");

    if (error instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: "Erro de validação: dados inválidos", statusCode: 400 };
    };

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: "Erro no banco de dados: " + error.message, statusCode: 500 };
    };

    return { success: false, error: "Erro desconhecido", statusCode: 500 };

  } finally {
    await prisma.$disconnect();

  };
};

export async function createUserWpp(name: string, cellphone: string, id_user_creation: number, base: string): Promise<Result<object>> {
  try {

    const createUser = await prisma.users_siden.create({
      data: {
        name,
        cellphone,
        id_user_creation,
        base,
      }
    });
    return { success: true, data: createUser };

  } catch (error) {
    console.error("Não foi possível criar o usuario.");

    if (error instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: "Erro de validação: dados inválidos", statusCode: 400 };
    };

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: "Erro no banco de dados: " + error.message, statusCode: 500 };
    };

    return { success: false, error: "Erro desconhecido", statusCode: 500 };

  } finally {
    await prisma.$disconnect();

  };
};

export async function updateUserWpp(id: number, name: string, cellphone: string, base:string): Promise<Result<object>> {
  try {
    const uptUser = await prisma.users_siden.update({
      where: { id },
      data: {
        name,
        cellphone,
        base,
        updated_at: new Date()
      }
    });
    return { success: true, data: uptUser };

  } catch (error) {
    console.error("Erro ao atualizar o usuário: ", error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: "Erro de validação: dados inválidos", statusCode: 400 };
    };

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: "Erro no banco de dados: " + error.message, statusCode: 500 };
    };

    return { success: false, error: "Erro desconhecido", statusCode: 500 };

  } finally {
    await prisma.$disconnect();

  };
};

export async function deleteUserWpp(id: number): Promise<Result<object>> {
  try {
    const delUser = await prisma.users_siden.update({
      where: { id },
      data: {
        is_active: false,
        deleted_at: new Date()
      }
    });
    return { success: true, data: delUser };

  } catch (error) {
    console.error("Erro ao deletar usuário", error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: "Erro de validação: dados inválidos", statusCode: 400 };
    };

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: "Erro no banco de dados: " + error.message, statusCode: 500 };
    };

    return { success: false, error: "Erro desconhecido", statusCode: 500 };

  } finally {
    await prisma.$disconnect();

  };
};

export async function reactivateUserWpp(id: number): Promise<Result<object>> {
  try {
    const reactivateUser = await prisma.users_siden.update({
      where: { id },
      data: {
        is_active: true,
        updated_at: new Date()
      }
    });
    return { success: true, data: reactivateUser };

  } catch (error) {
    console.error("Erro ao reativar usuário: ", error);

    if (error instanceof Prisma.PrismaClientValidationError) {
      return { success: false, error: "Erro de validação: dados inválidos", statusCode: 400 };
    };

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { success: false, error: "Erro no banco de dados: " + error.message, statusCode: 500 };
    };

    return { success: false, error: "Erro desconhecido", statusCode: 500 };

  } finally {
    await prisma.$disconnect();

  };
};