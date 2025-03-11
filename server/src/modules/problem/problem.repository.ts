import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../../common/constants/problems";
import prismaClient from "../../config/prismaClient";
import { Problem } from "@prisma/client";

export class ProblemRepository {
  public async getProblemsPagination(limit: number, offset: number) {
    const [problems, totalCount] = await prismaClient.$transaction([
      prismaClient.problem.findMany({
        take: limit || DEFAULT_LIMIT,
        skip: offset || DEFAULT_OFFSET,
        orderBy: { id: "asc" },
      }),
      prismaClient.problem.count(),
    ]);

    return {
      problems,
      totalCount,
    };
  }

  public async getProblemsWithCursor(cursor?: number, limit: number = 14) {
    return await prismaClient.problem.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: "asc" },
    });
  }

  public async getAllProblems() {
    return await prismaClient.problem.findMany({
      orderBy: { id: "asc" },
    });
  }
}
