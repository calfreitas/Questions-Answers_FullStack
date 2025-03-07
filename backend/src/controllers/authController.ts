import { Request, Response } from "express";
import generateToken from "../middleware/auth/jwtAuth"
import { findUserByUsername } from "../models/userModel";
import { compare } from "bcrypt";

export class AuthService {
    static async postLogin(req: Request, res: Response){         
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Usuário e senha são obrigatórios" });
        }
        try {
            const userID = await findUserByUsername(username);
            if (!userID) return res.status(404).json({ message:"Usuário não encontrado" });

            const checkPwd = await compare(password, userID.password);
            if(!checkPwd) return res.status(401).json({ message: "Senha incorreta" });

            const token = generateToken(userID.username);
            return res.status(200).json({ token });

        } catch (error) { 
            return res.status(500).json({ message: "Erro ao processar o login", error });
        }
    }
}