import { Problem } from "@prisma/client";
import { ProblemRepository } from "./problem.repository";
import { NUMBER_OF_PROBLEMS_PER_PAGE } from "../../common/utils/constants";

export class ProblemService {
  private problemRepository: ProblemRepository;

  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
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
}
