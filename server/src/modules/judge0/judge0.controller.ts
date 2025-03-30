import { Request, Response } from "express";
import { Judge0Service } from "./judge0.service";
import { asyncHandler } from "../../middlewares/asyncHandler"; // Optional, for error handling
import { HTTPSTATUS } from "../../config/http.config";

export class Judge0Controller {
  private judge0Service: Judge0Service;

  constructor(judge0Service: Judge0Service) {
    this.judge0Service = judge0Service;
  }

  public handleCallback = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      await this.judge0Service.handleCallback(req.body);

      res
        .status(HTTPSTATUS.OK)
        .json({ message: "Callback handled successfully" });
    }
  );
}
