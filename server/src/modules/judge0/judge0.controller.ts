import { Request, Response } from "express";
import { Judge0Service } from "./judge0.service";
import { asyncHandler } from "../../middlewares/asyncHandler"; // Optional, for error handling
import { HTTPSTATUS } from "../../config/http.config";

export class Judge0Controller {
  private judge0Service: Judge0Service;

  constructor(judge0Service: Judge0Service) {
    this.judge0Service = judge0Service;
  }
  runSampleCode = asyncHandler(async (req: Request, res: Response) => {
    console.log("Running sample code...");
    const { userCode, languageId, problemId } = req.body;

    if (!userCode || !languageId) {
      return res
        .status(400)
        .json({ error: "sourceCode and languageId are required" });
    }

    const token = await this.judge0Service.runSampleCode(
      userCode,
      languageId,
      problemId
    );
    res.status(HTTPSTATUS.CREATED).json({ token });
  });
  submitCode = asyncHandler(async (req: Request, res: Response) => {
    const { userCode, languageId, problemId } = req.body;

    if (!userCode || !languageId) {
      return res
        .status(400)
        .json({ error: "sourceCode and languageId are required" });
    }

    const token = await this.judge0Service.submitBatchedCode(
      userCode,
      languageId,
      problemId
    );
    res.status(HTTPSTATUS.CREATED).json({ token });
  });
}
