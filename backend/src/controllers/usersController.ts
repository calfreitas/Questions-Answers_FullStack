import { Request, Response } from "express";
import { selectUserWpp, updateUserWpp, deleteUserWpp, reactivateUserWpp, createUserWpp } from "../models/usersWppModel";
interface Props {
    users: string;
    id: number;
    name: string;
    cellphone: string;
    id_user_creation: number;
    base: string;
};

export class usersController {
    static async getUsersWpp(req: Request, res: Response) {
        const users = await selectUserWpp();
        if (users.success) {

            { res.json(users.data); return; }

        } else {
            { res.status(users.statusCode).json({ message: "Erro ao buscar os usuários", error: users.error }); return; }

        };
    };

    static async postCreateUser(req: Request, res: Response) {
        const { name, cellphone, id_user_creation, base } = req.body as Props;
        if (!cellphone || cellphone.length !== 12) {
            res.status(400).json({ message: "O número de telefone deve conter exatamente 12 dígitos (55DDD00000000)" });
            return;
        }

        if (!name || name.length === 0 || !base || base.length < 4) {
            res.status(400).json({ message: "Erro ao cadastrar usuário, verifique os dados enviados." });
            return;
        }

        try {
            const createUser = await createUserWpp(name, cellphone, id_user_creation, base);

            if (createUser.success) {
                res.json({ message: "Usuário criado com sucesso", name });
                return;
            } else {
                res.status(createUser.statusCode).json({ message: "Erro ao criar usuário", error: createUser.error });
                return;
            }
        } catch (error) {
            console.error("Erro interno ao criar usuário:", error);
            res.status(500).json({ message: "Erro interno no servidor" });
            return;
        }
    }


    static async putUsersWpp(req: Request, res: Response) {
        const { id, name, cellphone, base } = req.body as Props;
        const updateUser = await updateUserWpp(id, name, cellphone, base);
        if (updateUser.success) {
            { res.json({ message: "Usuário atualizado com sucesso: ", id, name, cellphone }); return; }
            
        } else {
            { res.status(updateUser.statusCode).json({ message: "Não foi possível atualizar o usuário", error: updateUser.error }); return; }

        };
    };

    static async delUsersWpp(req: Request, res: Response) {
        const { id } = req.body as Props;
        const deleteUser = await deleteUserWpp(id);
        if (deleteUser.success) {
            res.json({ message: "Usuario deletado com sucesso: ", id });

        } else {
            res.status(deleteUser.statusCode).json({ message: "Não possível deletar o usuário: ", id, error: deleteUser.error });

        };
    };

    static async putReactivateUsersWpp(req: Request, res: Response) {
        const { id } = req.body as Props;
        const reactivateUser = await reactivateUserWpp(id);
        if (reactivateUser.success) {
            res.json({ message: "Usuário reativado com sucesso: ", id });

        } else {
            res.status(reactivateUser.statusCode).json({ message: "Não foi possível reativar o usuário: ", id, error: reactivateUser.error });

        };
    };
};