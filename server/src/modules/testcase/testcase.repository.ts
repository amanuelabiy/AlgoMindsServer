import prismaClient from "../../config/prismaClient";
import { TestCase } from "@prisma/client"

export class TestCaseRepository{
public async findByProblemId(problem_id: number): Promise<TestCase[]> {
    const testcases = await prismaClient.testCase.findMany({
      where: { problemId: problem_id },
      take:2,
      orderBy: { id: 'asc' }
    });
    return testcases;
  }

  public async findAllByProblemId(problem_id: number): Promise<TestCase[]> {
    const testcases = await prismaClient.testCase.findMany({
      where: { problemId: problem_id },
      orderBy: { id: 'asc' }
    });
    return testcases;
  }

  public async findOneByProblemId(problem_id: number): Promise<TestCase | null> {
    const testcase = await prismaClient.testCase.findFirst({
      where: { problemId: problem_id },
      orderBy: { id: 'asc' },
      take: 1
    });
    return testcase;
  }
  
}