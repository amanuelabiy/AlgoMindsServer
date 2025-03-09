import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { ProblemService } from "./problem.service";
import { problemQuerySchema } from "../../common/validators/problem.validator";

export class ProblemController {
  private problemService: ProblemService;

  constructor(problemService: ProblemService) {
    this.problemService = problemService;
  }

  public getProblems = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { cursor, limit } = problemQuerySchema.parse(req.query);

      const problems = await this.problemService.getProblems(cursor, limit);

      return res.status(HTTPSTATUS.OK).json({
        message: "Problems Found!",
        problems,
        nextCursor:
          problems.length > 0 ? problems[problems.length - 1].id : null,
      });
    }
  );
}
