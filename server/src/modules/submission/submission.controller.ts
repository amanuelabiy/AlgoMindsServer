import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { SubmissionService } from "./submission.service";
import { HTTPSTATUS } from "../../config/http.config";



export class SubmissionController {
    private submissionService: SubmissionService;

    constructor(submissionService: SubmissionService){
        this.submissionService = submissionService;
    }


    public getSubmission = asyncHandler(
        async (req: Request, res: Response) => {
            const { submissionid, userid } = req.params;

            const submission = await this.submissionService.getSubmission(Number(submissionid), userid
        );
        return res
        .status(HTTPSTATUS.CREATED)
        .json ({message: "Submission Found!",
            problem: submission.problem_id,
            submitted_at: submission.submittedAt,
            submission_code: submission.submission
        })
    }
    )

    public submitSubmission = asyncHandler(
        async (req: Request, res: Response) => {
            const {submission, userId, problemId} = req.params;

            const submit = await this.submissionService.submitSubmission(submission,userId,problemId

            );
        return res
        .status(HTTPSTATUS.ACCEPTED)
        .json({
            message:"Submitted!"
        })
        }
    )
}