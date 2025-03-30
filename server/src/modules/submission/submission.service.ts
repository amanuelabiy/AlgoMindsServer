import { CodeSubmissionDto } from "../../common/interface/submissionDto";
import { Judge0Service } from "../judge0/judge0.service";
import { SubmissionRepository } from "./submission.repository";

export class SubmissionService {
  private submissionRepository: SubmissionRepository;
  private judge0Service: Judge0Service;

  constructor(
    submissionRepository: SubmissionRepository,
    judge0Service: Judge0Service
  ) {
    this.judge0Service = judge0Service;
    this.submissionRepository = submissionRepository;
  }

  public async submitCode(submissionData: CodeSubmissionDto): Promise<any> {
    // Logic to submit code for evaluation
    await this.judge0Service.submitCode(submissionData);
  }
}
