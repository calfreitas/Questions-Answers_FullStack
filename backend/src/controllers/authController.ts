import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { findUserByUsername } from "../models/userModel"; // Importe a função de consulta do usuário

dotenv.config();

const SECRET = process.env.TOKEN_SECRET as string;

export class AuthService {
    // Método de login
    static async postLogin(req: Request, res: Response): Promise<Response> {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
        }

        try {
            // Buscar usuário no banco
            const user = await findUserByUsername(username);
            if (!user) {
                return res.status(401).json({ message: "Usuário ou senha incorretos" });
            }

            // Comparar a senha
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Usuário ou senha incorretos" });
            }

            // Gerar o token JWT
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: "60m" });

            return res.json({ token });
        } catch (error) {
            return res.status(500).json({ message: "Erro ao processar login" });
        }
    }
}


