import prisma from "../functions/prisma";

//Destinado aos usuários do G-SIDEN

export const findUserByUsername = async (username: string) => {
    return await prisma.users.findUnique({ 
        where: { username },
        select: {
            username: true,
            password: true

        }
    });
};

