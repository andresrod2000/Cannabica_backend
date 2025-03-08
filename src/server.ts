import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app"; // Importa la configuración de Express

dotenv.config();

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar a MongoDB:", error));

console.log("✅ Iniciando servidor...");

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
