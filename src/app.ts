import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routers/userRoute";
import chatbotRoute from "./routers/chatbotRoute";
import authRoutes from "./routers/authRoutes"; // Corregido: importación de rutas de autenticación
import userRoutes from "./routers/userRoutes"; // Corregido: importación de rutas de usuario
dotenv.config();

const app: Application = express();

app.use(cors({
  origin: "*",  // 🔹 Permite cualquier origen
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Definir rutas
app.use("/api", userRouter);
console.log("✅ Ruta de usuario cargada en /api");

app.use("/api/chatbot", chatbotRoute);
console.log("✅ Ruta del chatbot cargada en /api/chatbot");

app.use("/api/auth", authRoutes); // <-- Corregido: Se agrega la ruta de autenticación correctamente
console.log("✅ Rutas de autenticación cargadas en /api/auth");
app.use("/api/user", userRoutes); 
export default app;
