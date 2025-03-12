import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const SECRET = process.env.TOKEN_SECRET as string;

export function generateToken(userID: string) {
  return jwt.sign({ id: userID }, SECRET, { expiresIn: "60m" });
};

function validate(token: string) {
  try {
    jwt.verify(token, SECRET);
    return true

  } catch (e) {
    return false;

  }
};

export function authenticateToken(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers['authorization'] as string;

  const token = authHeader?.split(' ')[1];

  if (!token) res.status(401).json({ error: "Token Null" });

  const resValidate = validate(token)

  if (!resValidate) {
    res.status(401).json({ error: "Token Não Validado" });
    return;
  }  
  next();

};