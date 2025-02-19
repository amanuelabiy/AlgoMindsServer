import { Router } from "express";
import { openAIController } from "./openai.module";


const openAIRoutes = Router();

openAIRoutes.get("/:submission", openAIController.runPrompt);


export default openAIRoutes;