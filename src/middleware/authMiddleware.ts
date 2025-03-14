import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ msg: "Acceso denegado, token no proporcionado" });
    return;
  }

  try {
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      res.status(401).json({ msg: "Formato de token inválido" });
      return;
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET as string);
    req.user = decoded;
    next(); // ✅ Asegurarse de llamar `next()`
  } catch (error) {
    res.status(401).json({ msg: "Token inválido" });
  }
};

export default authMiddleware;
