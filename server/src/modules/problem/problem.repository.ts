import prismaClient from "../../config/prismaClient";
import { Problem } from "@prisma/client";

export class ProblemRepository {
  public async findById(id: string): Promise<Problem | null> {
    return prismaClient.problem.findUnique({
      where: { id },
    });
  }
}
