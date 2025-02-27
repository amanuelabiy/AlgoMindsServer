import { SubmissionController } from "./submission.controller";
import { SubmissionRepository } from "./submission.repository";
import { SubmissionService } from "./submission.service";


const submissionRepository = new SubmissionRepository();
const submissionService = new SubmissionService(submissionRepository);
const submissionController = new SubmissionController(submissionService);
export { submissionController, submissionService };
