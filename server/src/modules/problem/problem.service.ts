import { Problem } from "@prisma/client";
import { ProblemRepository } from "./problem.repository";
import {
  DEFAULT_LIMIT,
  NUMBER_OF_PROBLEMS_PER_PAGE,
} from "../../common/constants/problems";

export class ProblemService {
  private problemRepository: ProblemRepository;

  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
  }

  public async getProblemsPagination({ page, perPage }: ProblemsPaginationDto) {
    const validPage = isNaN(page) || page < 1 ? 1 : page;
    const validPerPage =
      isNaN(perPage) || perPage < 1 ? DEFAULT_LIMIT : perPage;

    const limit = validPerPage;
    const offset = (validPage - 1) * validPerPage;

    return await this.problemRepository.getProblemsPagination(limit, offset);
  }

  public async getProblemsWithCursor(
    cursor?: number,
    limit: number = NUMBER_OF_PROBLEMS_PER_PAGE
  ): Promise<Problem[]> {
    return await this.problemRepository.getProblemsWithCursor(cursor, limit);
  }

  public async getAllProblems(): Promise<Problem[]> {
    return await this.problemRepository.getAllProblems();
  }

  public async getTestCases(problemId: number): Promise<any> {
    return await this.problemRepository.getTestCases(problemId);
  }
}
