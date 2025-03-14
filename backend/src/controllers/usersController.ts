import { Request, Response } from "express";
import { selectUserWpp, updateUserWpp, deleteUserWpp, reactivateUserWpp } from "../models/usersWppModel"
import { idText } from "typescript";

interface Props {
    users: string;
    id: number;
    name: string;
    cellphone: string;
}

export class usersController {
    static async getUsersSiden(req: Request, res: Response) {
        const users = await selectUserWpp();
        if (users) {
            res.json({ users })
        } else {
            res.status(500).json({ message: "Erro ao buscar os usuários" })

        };
    };

    static async putUsersSiden(req: Request, res: Response) {
        const { id, name, cellphone } = req.body as Props;
        const updateUser = await updateUserWpp(id, name, cellphone);
        if(updateUser) {
            res.json({message: "Usuário atualizado com sucesso: ", id, name, cellphone});
        } else { 
            res.status(500).json({message: "Não foi possível atualizar o usuário"});
        }
    };

    static async delUsersSiden(req: Request, res: Response) {

    };

    static async putReactivateUsersSiden(req: Request, res: Response) {

    };
}