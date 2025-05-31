import express, { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User";
import { sendPasswordResetEmail } from "../services/emailService";

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

// Endpoint para solicitar recuperación de contraseña
router.post("/forgot-password", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ msg: "El email es requerido" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      res.status(200).json({ 
        msg: "Si el email existe en nuestro sistema, recibirás un correo con instrucciones para recuperar tu contraseña" 
      });
      return;
    }

    // Generar token de recuperación
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hora

    // Guardar token en la base de datos
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Enviar email
    try {
      await sendPasswordResetEmail(email, resetToken);
      res.status(200).json({ 
        msg: "Si el email existe en nuestro sistema, recibirás un correo con instrucciones para recuperar tu contraseña" 
      });
    } catch (emailError) {
      console.error('Error enviando email:', emailError);
      res.status(500).json({ msg: "Error enviando email de recuperación" });
    }

  } catch (error) {
    console.error('Error en forgot-password:', error);
    res.status(500).json({ msg: "Error en el servidor", error });
  }
});

// Endpoint para restablecer contraseña
router.post("/reset-password", async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      res.status(400).json({ msg: "Token y nueva contraseña son requeridos" });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }

    // Buscar usuario con el token válido
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() } // Token no expirado
    });

    if (!user) {
      res.status(400).json({ msg: "Token inválido o expirado" });
      return;
    }

    // Hashear nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar contraseña y limpiar tokens
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ msg: "Contraseña restablecida exitosamente" });

  } catch (error) {
    console.error('Error en reset-password:', error);
    res.status(500).json({ msg: "Error en el servidor", error });
  }
});

export default router;
