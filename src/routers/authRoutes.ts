import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const router: Router = express.Router(); // <-- Asegúrate de definir `Router`

// Registro de usuario
router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;
    const usuarioExiste = await User.findOne({ email });

    if (usuarioExiste) {
      res.status(400).json({ msg: "El email ya está registrado" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ nombre, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
});

// Inicio de sesión
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ msg: "Credenciales incorrectas" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Credenciales incorrectas" });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.json({
      msg: "Inicio de sesión exitoso",
      token,
      user: { _id: user._id, nombre: user.nombre, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor", error });
  }
});

// Cierre de sesión
router.post("/logout", (_req: Request, res: Response): void => {
  res.json({ msg: "Cierre de sesión exitoso" });
});

export default router;
