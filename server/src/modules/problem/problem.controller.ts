import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { ProblemService } from "./problem.service";
import { problemQuerySchema } from "../../common/validators/problem.validator";
import {
  DEFAULT_LIMIT,
  NUMBER_OF_PROBLEMS_PER_PAGE,
} from "../../common/constants/problems";

export class ProblemController {
  private problemService: ProblemService;

  constructor(problemService: ProblemService) {
    this.problemService = problemService;
  }

  public getProblemsPagination = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const page = parseInt(req.query.page as string, DEFAULT_LIMIT);
      const perPage = parseInt(req.query.perPage as string, DEFAULT_LIMIT);

      const result = await this.problemService.getProblemsPagination({
        page,
        perPage,
      });

      return res.status(HTTPSTATUS.OK).json({
        problems: result.problems,
        page,
        perPage,
        totalPages: Math.ceil(result.totalCount / perPage),
        totalCount: result.totalCount,
      });
    }
  );

  public getProblemsWithCursor = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const { cursor } = problemQuerySchema.parse(req.query);
      const limit = NUMBER_OF_PROBLEMS_PER_PAGE;

      const problems = await this.problemService.getProblemsWithCursor(
        cursor,
        limit
      );

      return res.status(HTTPSTATUS.OK).json({
        message: "Problems Found!",
        problems,
        nextCursor:
          problems.length > 0 ? problems[problems.length - 1].id : null,
      });
    }
  );

  public getAllProblems = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
      const problems = await this.problemService.getAllProblems();

      return res.status(HTTPSTATUS.OK).json({
        message: "All Problems Found!",
        problems,
      });
    }
  );
}
