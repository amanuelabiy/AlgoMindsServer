import { CodeSubmissionDto } from "../../common/interface/submissionDto";
import { BadRequestException } from "../../common/utils/catch-errors";
import { CodePreparer } from "../../executor/CodePreparer";
import { Judge0Service } from "../judge0/judge0.service";
import { ProblemService } from "../problem/problem.service";
import { SubmissionRepository } from "./submission.repository";

export class SubmissionService {
  private submissionRepository: SubmissionRepository;
  private judge0Service: Judge0Service;
  private problemService: ProblemService;

  constructor(
    submissionRepository: SubmissionRepository,
    judge0Service: Judge0Service,
    problemService: ProblemService
  ) {
    this.judge0Service = judge0Service;
    this.submissionRepository = submissionRepository;
    this.problemService = problemService;
  }

  public async submitCode(submissionData: CodeSubmissionDto): Promise<void> {
    const { sourceCode, languageId, problemId } = submissionData;

    // Returns test cases in ascending order of their IDs for specific problem
    const testCases = await this.problemService.getTestCases(problemId);

    if (!testCases || testCases.length === 0) {
      throw new BadRequestException("No test cases found for this problem.");
    }

    const preparedCode = await CodePreparer.prepareCode(
      languageId,
      sourceCode,
      testCases
    );

    if (!preparedCode) {
      throw new BadRequestException("Code preparation failed.");
    }

    await this.judge0Service.submitCode({
      languageId,
      sourceCode: preparedCode,
      problemId,
      testCases,
    });
  }
}
