import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const conversationHistory: string[] = [];
// Función para obtener respuesta de Gemini
export const chatbotService = async (message: string): Promise<string> => {
    if (!message) return "Por favor, envía un mensaje válido.";

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Agregar mensaje al historial
        conversationHistory.push(`Usuario: ${message}`);

        // Construir contexto
        const context = conversationHistory.join("\n");

        const result = await model.generateContent(context);
        const response = result.response.text();

        // Agregar respuesta del chatbot al historial
        conversationHistory.push(`Chatbot: ${response}`);

        return response || "Lo siento, no entendí tu mensaje.";
    } catch (error) {
        console.error("Error con Gemini API:", error);
        return "Hubo un problema al procesar tu solicitud.";
    }
};