import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { OpenAIService } from "./openai.service";

export class OpenAIController {
  private openAIService: OpenAIService;

  constructor(openAIService: OpenAIService) {
    this.openAIService = openAIService;
  }

  public getResponseForLandingPage = asyncHandler(
    async (req: Request, res: Response) => {
      res.status(HTTPSTATUS.OK).json({
        message: "Welcome to OpenAI",
      });
    }
  );
}
