import { Router } from "express";
import { openAIController } from "./openai.module";

const openAIRoutes = Router();

openAIRoutes.get(
  "/ai-response/landing",
  openAIController.getResponseForLandingPage
);

export default openAIRoutes;
