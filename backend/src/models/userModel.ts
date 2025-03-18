import prisma from "../functions/prisma";

//Destinado aos usuários da Aplicação

export const findUserByUsername = async (username: string) => {
    try {
        return await prisma.users.findUnique({
            where: { username, is_active: true },
            select: {
                username: true,
                password: true

            }
        });

    } catch (error) {
        console.error("Não foi possível verificar o usuário.");
        
    }
};

export async function selectAttempts(username: string) {
    try {
        const select = await prisma.users.findUnique({
            where: { username },
            select: {
                loggin_attempts: true
            }
        });
        return select;
        
    } catch (error) {
        console.error("Não foi possível consultar a quantidade de tentativas.");

    } finally {
        prisma.$disconnect();
    }
}

export async function putAttempts(username: string, addingAttempts: number) {
    try {
        const select = await prisma.users.update({
            where: { username },
            data: {
                loggin_attempts: addingAttempts
            }
        });
        return select;
        
    } catch (error) {
        console.error("Não foi possível adicionar a quantidade de tentativas.");

    } finally {
        prisma.$disconnect();
    }
}

