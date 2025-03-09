import prismaClient from "../../config/prismaClient";
import { Problem } from "@prisma/client";

export class ProblemRepository {
  public async findById(id: string) {
    return prismaClient.problem.findUnique({
      where: { id },
    });
  }

  public async findSolutionByLanguage(problem_id: string, language: string) {
    console.log("language", language);
    return prismaClient.problem.findFirst({
      where: {
        id: problem_id,
      },
      select: {
        title: true,
        explanation: true,
        answer_python: language === "python",
        answer_javascript: language === "javascript",
        answer_java: language === "java",
        answer_cplusplus: language === "cplusplus",
      },
    });
  }
}
