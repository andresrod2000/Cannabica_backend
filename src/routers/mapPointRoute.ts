import { Router } from "express";
import {
    createPoint,
    getPoints,         // público (todos los puntos)
    getUserPoints,     // autenticado (puntos del usuario)
    updatePoint,
    deletePoint
  } from "../controllers/mapPointController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/", getPoints); // Público

// Requiere autenticación
router.use(authMiddleware);

router.get("/user", getUserPoints);           // Puntos del usuario
router.post("/", createPoint);                // Crear punto
router.put("/:id", updatePoint);              // Editar punto
router.delete("/:id", deletePoint);           // Borrar punto

export default router;
