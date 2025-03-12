import { Request, Response } from "express";
import { generateToken, } from "../middleware/auth/jwtAuth"
import { findUserByUsername } from "../models/userModel";
import { compare } from "bcrypt";

interface Props {
    username: string
    password: string
}


export class authController {
    static async postLogin(req: Request, res: Response) {
        const { username, password } = req.body as Props;

        if (!username || !password) res.status(400).json({ error: "Usuário e senha são obrigatórios" });

        try {
            const userData = await findUserByUsername(username) as Props;
            if (!userData) res.status(404).json({ message: "Login ou Senha incorretos" });

            const checkPwd = await compare(password, userData.password);
            if (!checkPwd) res.status(401).json({ message: "Login ou Senha incorretos" });

            const token = generateToken(userData.username);
            res.status(200).json({ token });

        } catch (error) {
            res.status(500).json({ message: "Erro ao processar o login", error });
        }
    }
}