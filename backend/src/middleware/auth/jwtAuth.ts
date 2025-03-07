import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 

const SECRET = process.env.TOKEN_SECRET as string; 

export default function generateToken( userID: string ){
  return jwt.sign({ id: userID }, SECRET, { expiresIn: "60m" });
};
