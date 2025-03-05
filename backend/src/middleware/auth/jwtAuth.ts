import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

const SECRET = process.env.TOKEN_SECRET as string; 

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn: "60m" });
};

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
