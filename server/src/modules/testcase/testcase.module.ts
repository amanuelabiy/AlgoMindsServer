import { TestCaseRepository } from "./testcase.repository";
import { TestCaseService } from "./testcase.service";

const testcaseRepository = new TestCaseRepository();
const testCaseService = new TestCaseService(testcaseRepository);

export { testcaseRepository, testCaseService };
