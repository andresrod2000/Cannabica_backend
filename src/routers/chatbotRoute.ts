import { Router } from "express";
import { chatbotController } from "../controllers/chatbotController";

const router = Router();

router.post("/", chatbotController); 

export default router;
