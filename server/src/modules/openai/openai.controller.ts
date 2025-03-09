import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { OpenAIService } from "./openai.service";

export class OpenAIController {
  private openAIService: OpenAIService;

  constructor(openAIService: OpenAIService) {
    this.openAIService = openAIService;
  }

  public CreateTestCases = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      // console.log("Received request body:", req.body); // Debugging
      // const { problem_id, language } = req.body;
      // const response = await this.openAIService.CreateTestCases(
      //   problem_id,
      //   language
      // );
      // return res.status(HTTPSTATUS.CREATED).json({ message: response });
    }
  );
}
