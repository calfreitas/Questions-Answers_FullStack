import { Request, Response } from "express";
import { generateToken, } from "../middleware/auth/jwtAuth"
import { findUserByUsername, putAttempts, selectAttempts } from "../models/userModel";
import { compare } from "bcrypt";

interface Props {
    username: string
    password: string
}


export class authController {
    static async postLogin(req: Request, res: Response) {
        const { username, password } = req.body as Props;
        const validAttempts = await selectAttempts(username);

        if (!username || !password) {
            res.status(400).json({ error: "Usuário e senha são obrigatórios" }); return;
        }

        if (validAttempts?.loggin_attempts === 5) { res.status(400).json({ message: "O número de tentativas excedeu o permitido." }); return; }

        try {
            const userData = await findUserByUsername(username) as Props;
            if (!userData) { res.status(404).json({ message: "Login ou Senha incorretos" }); return; }

            const checkPwd = await compare(password, userData.password);
            if (!checkPwd) {
                if (!validAttempts) { res.status(400).json({ message: "Não foi possível verificar a quantidade de tentativas de acesso." }); return; }
                const addingAttempts = (validAttempts?.loggin_attempts + 1);
                await putAttempts(username, addingAttempts);
                { res.status(401).json({ message: "Login ou Senha incorretos", addingAttempts }); return; }
            };

            const token = generateToken(userData.username);
            await putAttempts(username, 0)
            { res.status(200).json({ token }); return; }

        } catch (error) {
            { res.status(500).json({ message: "Erro ao processar o login", error }); return; }
        }
    }
}