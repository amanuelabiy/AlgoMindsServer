import { Problem } from "@prisma/client";
import { ProblemRepository } from "./problem.repository";

export class ProblemService {
  private problemRepository: ProblemRepository;

  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
  }

  public async getProblem(id: string): Promise<Problem> {
    const problem = await this.problemRepository.findById(id);
    if (!problem) {
      throw new Error(`Problem with id ${id} not found`);
    }
    return problem;
  }
  public async getSolutionByLanguage(problem_id: string, langauge: string) {
    const solution = await this.problemRepository.findSolutionByLanguage(
      problem_id,
      langauge
    );
    if (!solution) {
      throw new Error(
        `Solution with id: ${problem_id} and langague: ${langauge} not found`
      );
    }
    return solution;
  }
}
