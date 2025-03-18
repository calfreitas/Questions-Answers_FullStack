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

        if (!username || !password) return res.status(400).json({ error: "Usuário e senha são obrigatórios" });

        if (validAttempts?.loggin_attempts === 5) return res.status(400).json({ message: "O número de tentativas excedeu o permitido." });

        try {
            const userData = await findUserByUsername(username) as Props;
            if (!userData) return res.status(404).json({ message: "Login ou Senha incorretos" });

            const checkPwd = await compare(password, userData.password);
            if (!checkPwd) {
                if (!validAttempts) return res.status(400).json({ message: "Não foi possível verificar a quantidade de tentativas de acesso." });
                const addingAttempts = (validAttempts?.loggin_attempts + 1);
                await putAttempts(username, addingAttempts);
                return res.status(401).json({ message: "Login ou Senha incorretos", addingAttempts });
            };

            const token = generateToken(userData.username);
            await putAttempts(username, 0)
            return res.status(200).json({ token });

        } catch (error) {
            return res.status(500).json({ message: "Erro ao processar o login", error });
        }
    }
}