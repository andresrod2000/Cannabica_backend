import express from "express";
import cors from "cors";
import app from "./app";

const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// ✅ Definir una ruta para "/"
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando correctamente");
});
console.log("✅ Iniciando servidor..."); // 👈 Agregar este log
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
