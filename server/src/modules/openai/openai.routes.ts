import { Router } from "express";
import { openAIController } from "./openai.module";

const openAIRoutes = Router();


openAIRoutes.get("/createtestcase", openAIController.CreateTestCases);

export default openAIRoutes;
