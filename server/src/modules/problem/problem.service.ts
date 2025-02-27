import { Problem } from "@prisma/client";
import { ProblemRepository } from "./problem.repository";

export class ProblemService {
  private problemRepository: ProblemRepository;

  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
  }

  public async getProblem(id: number): Promise<Problem> {
    const problem = await this.problemRepository.findById(id);
    if (!problem) {
      throw new Error(`Problem with id ${id} not found`);
    }
    return problem;
  }
}
