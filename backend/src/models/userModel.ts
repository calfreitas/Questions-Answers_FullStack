import prisma from "../functions/prisma";


export const findUserByUsername = async (username: string) => {
    return await prisma.users.findUnique({ 
        where: { username },
        select: {
            username: true,
            password: true

        }
    });
};

