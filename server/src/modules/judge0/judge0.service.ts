import { config } from "../../config/app.config";
import { TestCaseService } from "../testcase/testcase.service";
import { TestCase } from "@prisma/client";
import { CodeprepService } from "../codeprep/codeprep.service";
import { JsonObject } from "@prisma/client/runtime/library";
import { json } from "express";
import { Judge0Result } from "../../@types/judge0/judge0";

export class Judge0Service {
  /**
   * A testcase service instance to grab testcases from the database.
   */
  private testcaseService: TestCaseService;
  /**
   * A submission service instance to submit user code to the database.
   */

  private codeprepService: CodeprepService;

  constructor(
    testcaseService: TestCaseService,
    codeprepService: CodeprepService
  ) {
    this.testcaseService = testcaseService;
    this.codeprepService = codeprepService;
  }

  /**
   * Sends a POST Batched Submissions request to Judge0 API. This only takes 2 test cases from the database. Uses prepareCode() to modify the merge template code + users code with
   * the appropriate langauge. Uses formatAPICall to create the proper body to send to Judge0. Concatenates all tokens, then sends to checkSubmissionStatus to continiously poll Judge-
   * until submission is ready to be presented.
   * @param sourceCode The code the user writes.
   * @param languageId The langauge ID of the user written code.
   * @param problemId The problem ID of the problem being solved
   * @returns A Response object that contains stdout, time, stderr, token, compile_output, and status of each submission
   */
  async runSampleCode(
    sourceCode: string,
    languageId: number,
    problemId: number
  ) {
    const modifiedCode =
      (await this.codeprepService.prepareCode(languageId)) || "";

    const testcases: TestCase[] = await this.testcaseService.getSampleTestCases(
      problemId
    );

    const body = await this.formatAPICall(modifiedCode, languageId, testcases);

    const response = await fetch(
      `${config.JUDGE0_API_BASE_URL}/submissions/batch?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: config.JUDGE0_HEADERS,
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();
    /**
     * @type {string}
     */
    let tokens: string = "";
    //@ts-ignore #TODO: Fix this type error later remove ts-ignore
    result.forEach((item: { token: string }) => {
      tokens = tokens.concat(item.token, ",");
    });
    tokens = tokens.slice(0, -1);

    return await this.checkSubmissionStatus(tokens);
  }

  /**
   * Sends a POST Batched Submissions request to Judge0 API. This takes all test cases from the database. Uses prepareCode() to modify the merge template code + users code with
   * the appropriate langauge. Uses formatAPICall to create the proper body to send to Judge0. Concatenates all tokens, then sends to checkSubmissionStatus to continiously poll Judge-
   * until submission is ready to be presented.
   * @param sourceCode The code the user writes.
   * @param languageId The langauge ID of the user written code.
   * @param problemId The problem ID of the problem being solved
   * @returns A Response object that contains stdout, time, stderr, token, compile_output, and status of each submission
   */
  async submitBatchedCode(
    sourceCode: string,
    languageId: number,
    problemId: number
  ) {
    const modifiedCode =
      (await this.codeprepService.prepareCode(languageId)) || "";

    const testcases: TestCase[] = await this.testcaseService.getTestAllCases(
      problemId
    );

    const body = await this.formatAPICall(modifiedCode, languageId, testcases);

    const response = await fetch(
      `${config.JUDGE0_API_BASE_URL}/submissions/batch?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: config.JUDGE0_HEADERS,
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();
    console.log(result);
    /**
     * @type {string}
     */
    let tokens: string = "";
    //@ts-ignore #TODO: Fix this type error later remove ts-ignore
    result.forEach((item: { token: string }) => {
      tokens = tokens.concat(item.token, ",");
    });
    tokens = tokens.slice(0, -1);
    return await this.checkSubmissionStatus(tokens);
  }

  /**
   * Encodes all information sent to Judge0 to in Base64 for security.
   * @param templatePath Path to the appropriate language template.
   * @param languageId Appropriate language ID.
   * @param userCode User-written code.
   * @returns Base64 encoded information.
   */
  // // Not in use for testing
  // async convertFileToBase64(filePath: string) {
  //   try {
  //     // Read file as a buffer
  //     const fileBuffer = fs.readFileSync(filePath);

  //     // Convert buffer to Base64
  //     const base64String = fileBuffer.toString("base64");

  //     return base64String;
  //   } catch (error) {
  //     console.error("Error reading file:", error);
  //     return "";
  //   }
  // }

  async checkSubmissionStatus(tokens: string) {
    /**
     * @type {Array}
     */
    let results = [];
    /**
     * @type {boolean}
     */
    let allDone = false;

    do {
      const response = await fetch(
        `${config.JUDGE0_API_BASE_URL}/submissions/batch?tokens=${tokens}&base64_encoded=false&fields=stdout%2Ctime%2Cstderr%2Ctoken%2Cmessage%2Cstatus%2Ccompile_output`,
        {
          method: "GET",
          headers: config.JUDGE0_HEADERS,
        }
      );
      //@ts-ignore #TODO: Fix this type error later remove ts-ignore
      results = await response.json();
      //@ts-ignore #TODO: Fix this type error later remove ts-ignore
      allDone = results.submissions.every(
        (result: { status: { id: number } }) => {
          return result.status.id !== 1 && result.status.id !== 2;
        }
      );

      if (!allDone) {
        // Wait for 2 seconds before polling again.
        await new Promise((res) => setTimeout(res, 2000));
      }
    } while (!allDone);
    //@ts-ignore #TODO: Fix this type error later remove ts-ignore
    const numOfTestcases = results.submissions.length;
    //@ts-ignore #TODO: Fix this type error later remove ts-ignore
    return await this.judgeResults(results.submissions, numOfTestcases); // Return the final result
  }

  async judgeResults(results: Judge0Result[], numOfTestcases: number) {
    console.log(results);
    var passed: number = 0;
    let judgedOuput: any[] = []; // fix type later

    results.forEach((result: Judge0Result) => {
      if (result.status.id === 3) {
        judgedOuput.push({
          stdout: result.stdout,
          message: result.message,
          status: result.status.description,
        });
        passed += 1;
      } else if (result.status.id === 4) {
        judgedOuput.push({
          stdout: result.stdout,
          stderr: result.stderr,
          status: result.status.description,
        });
      } else {
        judgedOuput.push({
          stdout: result.stdout,
          time: result.time,
          stderr: result.stderr,
          token: result.token,
          compile_output: result.compile_output,
          status: result.status,
          message: result.message,
        });
      }
    });
    return [judgedOuput, passed];
  }
  async formatAPICall(
    modifiedCode: string,
    languageId: number,
    testcases: TestCase[]
  ) {
    const body: {
      submissions: {
        source_code: string;
        language_id: number;
        stdin: string;
        expected_output: string;
        ignore_case: boolean;
      }[];
    } = {
      submissions: [],
    };
    testcases.forEach((testcase) => {
      const formattedInput = JSON.stringify({
        type: testcase["type"],
        input: testcase["input"],
        output: testcase["output"],
      });
      const submissionBody = {
        source_code: modifiedCode,
        language_id: languageId,
        stdin: formattedInput,
        expected_output: testcase["output"],
        ignore_case: true,
        ignore_whitespace: true,
      };
      body["submissions"].push(submissionBody);
    });

    return body;
  }
}
