import { Request, Response } from "express";
import { Judge0Service } from "./judge0.service";
import { asyncHandler } from "../../middlewares/asyncHandler"; // Optional, for error handling
import { HTTPSTATUS } from "../../config/http.config";


export class Judge0Controller {
  private judge0Service: Judge0Service;

  constructor(judge0Service: Judge0Service) {
    this.judge0Service = judge0Service;
  }
  submitCode = asyncHandler(async (req: Request, res: Response) => {
    const { sourceCode, languageId, stdin } = req.body;

    if (!sourceCode || !languageId) {
      return res
        .status(400)
        .json({ error: "sourceCode and languageId are required" });
    }

    const token = await this.judge0Service.prepareCode(
      sourceCode,
      languageId,
      stdin
    );
    res.status(HTTPSTATUS.CREATED).json({ token });
  });

  getSubmissionResult = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const result = await this.judge0Service.getSubmissionResult(token);
    res.status(200).json(result);
  });
}
