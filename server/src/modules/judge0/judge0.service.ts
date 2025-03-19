import { config } from "../../config/app.config";
import * as fs from "fs";
import * as path from "path";
import { TestCaseService } from "../testcase/testcase.service";
import { TestCase, TestcaseEnum } from "@prisma/client";
import { SubmissionService } from "../submission/submission.service";

export class Judge0Service {
  /**
   * A testcase service instance to grab testcases from the database.
   */
  private testcaseService: TestCaseService;
  /**
   * A submission service instance to submit user code to the database.
   */
  private submissionService: SubmissionService;

  constructor(
    testcaseService: TestCaseService,
    submissionService: SubmissionService
  ) {
    this.testcaseService = testcaseService;
    this.submissionService = submissionService;
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
    const modifiedCode = (await this.prepareCode(languageId)) || "";

    const testcases: TestCase[] = await this.testcaseService.getSampleTestCases(
      problemId
    );

    const body = await this.formatAPICall(modifiedCode, languageId, testcases);
    console.log(body)
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
    const modifiedCode = (await this.prepareCode(languageId)) || "";

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
    console.log(result)
    /**
     * @type {string}
     */
    let tokens: string = "";
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

  /**
   *
   * @param templatePath
   * @param languageId
   * @param userCode
   * @returns
   */
  async generateModifiedCode(
    templatePath: string,
    languageId: number,
    userCode: string
  ): Promise<string> {
    try {
      const pythonTemplate = fs.readFileSync(templatePath, "utf-8");
      // Locate the insertion markers
      /**
       * @type {string}
       */
      let startMarker: string = "";
      /**
       * @type {string}
       */
      let endMarker: string = "";
      switch (languageId) {
        case 71:
          startMarker = "# Code Snippet START ====================";
          endMarker = "# Code Snippet END ====================";
          break;
        case 62:
          startMarker = "// Code Snippet END ====================";
          endMarker = "// Code Snippet END ====================";
          break;
      }

      const startIndex = pythonTemplate.indexOf(startMarker);
      const endIndex = pythonTemplate.indexOf(endMarker);

      if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
        throw new Error("Could not find code snippet markers.");
      }

      // Inject user code dynamically (WITHOUT modifying the original file)
      const beforeCode = pythonTemplate.substring(
        0,
        startIndex + startMarker.length
      );
      const afterCode = pythonTemplate.substring(endIndex);
      const modifiedPythonCode = `${beforeCode}\n${userCode}\n${afterCode}`;

      return `${modifiedPythonCode}`;
    } catch (error) {
      throw new Error(`Error generating ${languageId} code: ${error}`);
    }
  }
  async prepareCode(language_id: number) {
    let templatePath: string; // path to the correct language template
    let modifiedCode: string = "";
    let userCode: string = "";
    // Need to update this to dynamically take user code. User code must be formatted properly
    // before sending to Judge0

    // Language ID's:

    // Python 3.8:                   71
    // C++ (Clang 7.0.1):            76
    // Java SDK 17.0.6:              91
    // JavaScript (Node.js 18.15.0): 93

    switch (language_id) {
      case 71:
        templatePath = path.join(__dirname, "../templates/pythonTemplate.txt"); // Template Python file
        userCode = fs.readFileSync(
          path.join(__dirname, "../templates/sampleUserCode.txt"),
          "utf-8"
        );
        modifiedCode = await this.generateModifiedCode(
          templatePath,
          language_id,
          userCode
        );
        break;
      case 62:
        templatePath = path.join(__dirname, "../templates/javaTemplate.txt"); // Template Java file
        userCode = fs.readFileSync(
          path.join(__dirname, "../templates/sampleJavaCode.txt"),
          "utf-8"
        );
        modifiedCode = await this.generateModifiedCode(
          templatePath,
          language_id,
          userCode
        );
        break;
    }
    return modifiedCode;
  }

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
      results = await response.json();
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
    return results; // Return the final result
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
      };
      body["submissions"].push(submissionBody);
    });

    return body;
  }
}
