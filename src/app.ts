import express, { Application } from 'express';
import cors from 'cors';
//import chatbotRoute from "./routers/chatbotRoute";

import dotenv from "dotenv";
import chatbotRoute from "./routers/chatbotRoute";
import authRoutes from "./routers/authRoutes"; // Corregido: importación de rutas de autenticación
import userRoutes from "./routers/userRoutes"; // Corregido: importación de rutas de usuario
import mapPointRoute from "./routers/mapPointRoute";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());



//app.use("/api/chatbot", chatbotRoute);
//console.log("✅ Ruta del chatbot cargada en /chatbot");

app.use("/api/map", mapPointRoute);
console.log("✅ Ruta del mapa cargada en /map");


app.use("/api/auth", authRoutes); // <-- Corregido: Se agrega la ruta de autenticación correctamente
console.log("✅ Rutas de autenticación cargadas en /api/auth");
app.use("/api/user", userRoutes);

app.use("/api/map", mapPointRoute);
console.log("✅ Ruta del mapa cargada en /map");

export default app;
