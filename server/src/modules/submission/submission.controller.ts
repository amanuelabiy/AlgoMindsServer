import { submissionSchema } from "../../common/validators/submission.validator";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { SubmissionService } from "./submission.service";
import { Request, Response } from "express";

export class SubmissionController {
  private submissionService: SubmissionService;

  constructor(submissionService: SubmissionService) {
    this.submissionService = submissionService;
  }

  public submitCode = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const body = submissionSchema.parse(req.body);

      const result = await this.submissionService.submitCode(body);

      return res
        .status(HTTPSTATUS.CREATED)
        .json({ message: "Code submitted successfully", result });
    }
  );
}
