import prismaClient from "../../config/prismaClient";
import { Problem } from "@prisma/client";

export class ProblemRepository {
  public async getProblems(cursor?: number, limit: number = 14) {
    return await prismaClient.problem.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: "asc" },
    });
  }
}
