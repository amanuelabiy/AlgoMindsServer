import { config } from "../../config/app.config";
import * as fs from "fs";
import * as path from "path";
import { JsonObject } from "@prisma/client/runtime/library";
import { TestCaseRepository } from "../testcase/testcase.repository";
import { TestCaseService } from "../testcase/testcase.service";
import { TestCase, TestcaseEnum } from "@prisma/client";

export class Judge0Service {

  private testcaseService: TestCaseService;

  constructor(testcaseService: TestCaseService) {
    this.testcaseService = testcaseService;
  }

  async submitSampleCode(
    sourceCode: string,
    languageId: number,
    problemId: number
  ) {
    const testcase = await this.testcaseService.getTestCase(problemId);
      const formattedInput = JSON.stringify({
        type: testcase["type"],
        input: testcase["input"],
        output: testcase["output"]
      });
      console.log(formattedInput)
    
      const response = await fetch(
        `${config.JUDGE0_API_BASE_URL}/submissions?base64_encoded=false&wait=true`,
        {
          method: "POST",
          headers: config.JUDGE0_HEADERS,
          body: JSON.stringify({
            source_code: sourceCode,
            language_id: languageId,
            stdin: formattedInput,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      return result.token;
  }

  async submitBatchedCode(sourceCode: string, languageId: number, problemId: number) {

    const testcases: TestCase[] = [await this.testcaseService.getTestCase(problemId)];


    const body = {
      submissions: [{}]
    }
    testcases.forEach(testcase => {
      const formattedInput = JSON.stringify({
        type: testcase["type"],
        input: testcase["input"],
        output: testcase["output"]
      });
      const submissionBody = {
        source_code: sourceCode,
        language_id: languageId,
        stdin: formattedInput
      }
      body["submissions"].push(submissionBody);
    });
    console.log(body)
    
    // const response = await fetch(
    //   `${config.JUDGE0_API_BASE_URL}/submissions/batch?base64_encoded=false&wait=true`,
    //   {
    //     method: "POST",
    //     headers: config.JUDGE0_HEADERS,
    //     body: JSON.stringify(body),
    //   }
    // );

    // const result = await response.json();
    // console.log(result);
    // return result.token;
  }

  async getSubmissionResult(token: string) {
    try {
      const response = await fetch(
        `${config.JUDGE0_API_BASE_URL}/submissions/${token}`,
        {
          headers: config.JUDGE0_HEADERS,
        }
      );
      return response;
    } catch (error) {
      throw new Error(`Error fetching submission result: ${error}`);
    }
  }

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

  async generatePythonCodeWithUserCode(
    templatePath: string,
    userCode: string
  ): Promise<string> {
    try {
      const pythonTemplate = fs.readFileSync(templatePath, "utf-8");
      // Locate the insertion markers
      const startMarker = "# Code Snippet START ====================";
      const endMarker = "# Code Snippet END ====================";
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
      throw new Error(`Error generating Python code: ${error}`);
    }
  }
  async prepareCode(userCode: string, language_id: number, problemId: number) {
    let templatePath: string; // path to the correct language template

    // Need to update this to dynamically take user code. User code must be formatted properly
    // before sending to Judge0
    const userCodeExample = fs.readFileSync(
      path.join(__dirname, "../templates/sampleUserCode.txt"),
      "utf-8"
    );

    // Language ID's:

    // Python 3.8:                   71
    // C++ (Clang 7.0.1):            76
    // Java SDK 17.0.6:              91
    // JavaScript (Node.js 18.15.0): 93

    if (language_id == 71) {
      templatePath = path.join(__dirname, "../templates/pythonTemplate.txt"); // Template Python file
      const modifiedCode = await this.generatePythonCodeWithUserCode(
        templatePath,
        userCodeExample
      );
      const token = await this.submitSampleCode(
        modifiedCode,
        language_id,
        problemId
      ); // Python 3 (ID: 71)
      return token;
    } else {
      throw new Error(`Language not supported!`);
    }
  }
}
