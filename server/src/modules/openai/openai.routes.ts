import { Router } from "express";
import { openAIController } from "./openai.module";

const openAIRoutes = Router();

openAIRoutes.post(
  "/ai-response/landing",
  openAIController.getResponseForLandingPage
);

export default openAIRoutes;
