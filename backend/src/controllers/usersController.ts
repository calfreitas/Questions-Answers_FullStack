import { Request, Response } from "express";
import { selectUserWpp, updateUserWpp, deleteUserWpp, reactivateUserWpp, createUserWpp } from "../models/usersWppModel";
interface Props {
    users: string;
    id: number;
    name: string;
    cellphone: string;
    id_user_creation: number;
};

export class usersController {
    static async getUsersWpp(req: Request, res: Response) {
        const users = await selectUserWpp();
        if (users.success) {
            console.log(users)
            res.json(users.data);

        } else {
            res.status(users.statusCode).json({ message: "Erro ao buscar os usuários", error: users.error });

        };
    };

    static async postCreateUser(req: Request, res: Response) {
        const { name, cellphone, id_user_creation } = req.body as Props;
        if (cellphone.length > 12 || cellphone.length < 12) res.status(400).json({message: "O numero de telefone só pode conter 12 digitos 55(DDD)0000-0000"});

        const createUser = await createUserWpp(name, cellphone, id_user_creation);
        if (createUser.success) {
            res.json({ message: "Usuário criado com sucesso: ", name });

        } else {
            res.status(createUser.statusCode).json({ message: "Erro ao criar usuario", error: createUser.error });

        };
    };

    static async putUsersWpp(req: Request, res: Response) {
        const { id, name, cellphone } = req.body as Props;
        const updateUser = await updateUserWpp(id, name, cellphone);
        if (updateUser.success) {
            res.json({ message: "Usuário atualizado com sucesso: ", id, name, cellphone });

        } else {
            res.status(updateUser.statusCode).json({ message: "Não foi possível atualizar o usuário", error: updateUser.error });

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