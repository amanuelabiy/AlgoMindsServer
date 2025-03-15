import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { OpenAIService } from "./openai.service";
import { landingPageChatSchema } from "../../common/validators/openai.validator";

export class OpenAIController {
  private openAIService: OpenAIService;

  constructor(openAIService: OpenAIService) {
    this.openAIService = openAIService;
  }

  public getResponseForLandingPage = asyncHandler(
    async (req: Request, res: Response) => {
      const { message } = landingPageChatSchema.parse({ ...req.body });

      const response = await this.openAIService.getResponseForLandingPage(
        message
      );

      res.status(HTTPSTATUS.OK).json({
        message: response,
      });
    }
  );
}
