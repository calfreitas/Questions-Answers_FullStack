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
        console.error("Não foi possível verificar o usuário.")
        
    }
};

