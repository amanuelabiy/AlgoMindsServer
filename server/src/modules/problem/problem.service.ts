import { Problem } from "@prisma/client";
import { ProblemRepository } from "./problem.repository";

export class ProblemService {
  private problemRepository: ProblemRepository;

  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
  }

  public async getProblems(
    cursor?: number,
    limit: number = 14
  ): Promise<Problem[]> {
    return await this.problemRepository.getProblems(cursor, limit);
  }
}
