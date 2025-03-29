import { TestCase } from "@prisma/client";
import { TestCaseRepository } from "./testcase.repository";

export class TestCaseService {
  private testcaseRepository: TestCaseRepository;

  constructor(testcaseRepository: TestCaseRepository) {
    this.testcaseRepository = testcaseRepository;
  }

  public async getTestCase(problemId: number): Promise<TestCase> {
    const testcase = await this.testcaseRepository.findOneByProblemId(
      problemId
    );
    if (!testcase) {
      throw new Error(`Testcases for id ${problemId} not found`);
    }
    return testcase;
  }
  public async getSampleTestCases(problemId: number): Promise<TestCase[]> {
    const testcases = await this.testcaseRepository.findByProblemId(problemId);
    if (!testcases) {
      throw new Error(`Testcases for id ${problemId} not found`);
    }

    return testcases;
  }

  public async getTestAllCases(problemId: number): Promise<TestCase[]> {
    const testcases = await this.testcaseRepository.findAllByProblemId(
      problemId
    );
    if (!testcases) {
      throw new Error(`Testcases for id ${problemId} not found`);
    }
    return testcases;
  }
}
