import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { ProblemService } from "./problem.service";



export class ProblemController {
    private problemService: ProblemService;


constructor(problemService: ProblemService) {
    this.problemService = problemService;
}

public getProblem = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        
        
        const problem = await this.problemService.getProblem(Number(req.params.id));
        
        return res
        .status(HTTPSTATUS.CREATED)
        .json({message: "Problem Found!",
            data: problem.title,
        });
    }
)

  
}