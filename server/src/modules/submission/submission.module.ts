import { judge0Service } from "../judge0/judge0.module";
import { problemService } from "../problem/problem.module";
import { SubmissionController } from "./submission.controller";
import { SubmissionRepository } from "./submission.repository";
import { SubmissionService } from "./submission.service";

const submissionRepository = new SubmissionRepository();
const submissionService = new SubmissionService(
  submissionRepository,
  judge0Service,
  problemService
);
const submissionController = new SubmissionController(submissionService);

export { submissionService, submissionController };
