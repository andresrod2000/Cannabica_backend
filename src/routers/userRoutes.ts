import { Router, Request, Response } from "express";
import User from "../models/User";
import authMiddleware from "../middleware/authMiddleware";

const router: Router = Router();

// ✅ Obtener perfil de usuario
router.get("/profile/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
});

// ✅ Editar perfil de usuario
router.put("/profile/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { nombre, email }, { new: true });

    if (!user) {
      res.status(404).json({ msg: "Usuario no encontrado" });
      return;
    }
    res.json({ msg: "Perfil actualizado", user });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
});

export default router;
