import { Request, Response } from "express";
import { chatbotService } from "../services/chatbotService";

export const chatbotController = async (req: Request, res: Response): Promise<void> => {
    const { message } = req.body;

    if (!message) {
        res.status(400).json({ error: "El mensaje es obligatorio" });
        return;
    }

    try {
        const responseText = await chatbotService(message);
        res.json({ response: responseText });
    } catch (error) {
        res.status(500).json({ error: "Error al generar la respuesta del chatbot." });
    }
};
