import express, { Application } from 'express';
import cors from 'cors';
import userRouter from './routers/userRoute';
//import chatbotRoute from "./routers/chatbotRoute";
import mapPointRoute from "./routers/mapPointRoute";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express(); // ✅ Declara `app` solo una vez

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', userRouter);
console.log("✅ Ruta de usuario cargada en /api");

//app.use("/api/chatbot", chatbotRoute);
//console.log("✅ Ruta del chatbot cargada en /chatbot");

app.use("/api/map", mapPointRoute);
console.log("✅ Ruta del mapa cargada en /map");

export default app; // ✅ Asegúrate de exportarlo correctamente
