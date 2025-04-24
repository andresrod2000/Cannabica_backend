import { Request } from "express";

// Definir la estructura de lo que esperamos en `req.user`
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: ObjectId
      };
    }
  }
}
