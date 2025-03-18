import { config } from "../../config/app.config";
import * as fs from "fs";
import * as path from "path";
import { TestCaseService } from "../testcase/testcase.service";
import { TestCase, TestcaseEnum } from "@prisma/client";
import { SubmissionService } from "../submission/submission.service";

export class Judge0Service {
  private testcaseService: TestCaseService;
  private submissionService: SubmissionService;

  constructor(
    testcaseService: TestCaseService,
    submissionService: SubmissionService
  ) {
    this.testcaseService = testcaseService;
    this.submissionService = submissionService;
  }

  async runSampleCode(
    sourceCode: string,
    languageId: number,
    problemId: number
  ) {
    const modifiedCode = (await this.prepareCode(languageId)) || "";

    const testcases: TestCase[] = await this.testcaseService.getSampleTestCases(
      problemId
    );

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
    const response = await fetch(
      `${config.JUDGE0_API_BASE_URL}/submissions/batch?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: config.JUDGE0_HEADERS,
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();
    let tokens = "";
    result.forEach((item: { token: string }) => {
      tokens = tokens.concat(item.token, ",");
    });
    tokens = tokens.slice(0, -1);

    return await this.checkSubmissionStatus(tokens);
  }

  async submitBatchedCode(
    sourceCode: string,
    languageId: number,
    problemId: number
  ) {
    const modifiedCode = (await this.prepareCode(languageId)) || "";

    const testcases: TestCase[] = await this.testcaseService.getTestAllCases(
      problemId
    );

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

    const response = await fetch(
      `${config.JUDGE0_API_BASE_URL}/submissions/batch?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: config.JUDGE0_HEADERS,
        body: JSON.stringify(body),
      }
    );

    const result = await response.json();

    let tokens = "";
    result.forEach((item: { token: string }) => {
      tokens = tokens.concat(item.token, ",");
    });
    tokens = tokens.slice(0, -1);
    this.checkSubmissionStatus(tokens);
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
    languageId: number,
    userCode: string
  ): Promise<string> {
    try {
      const pythonTemplate = fs.readFileSync(templatePath, "utf-8");
      // Locate the insertion markers
      let startMarker: string = ""
      let endMarker: string = ""
      switch (languageId){
        case(71):
        startMarker = "# Code Snippet START ====================";
        endMarker = "# Code Snippet END ====================";
        case(62):
        startMarker = "// Code Snippet END ===================="
        endMarker = "// Code Snippet END ===================="
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
      throw new Error(`Error generating Python code: ${error}`);
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
        modifiedCode = await this.generatePythonCodeWithUserCode(
          templatePath,
          language_id,
          userCode
        );
      case 62:
        templatePath = path.join(__dirname, "../templates/javaTemplate.txt"); // Template Java file
        userCode = fs.readFileSync(
          path.join(__dirname, "../templates/sampleJavaCode.txt"),
          "utf-8"
        );
        modifiedCode = await this.generatePythonCodeWithUserCode(
          templatePath,
          language_id,
          userCode
        );
    }
    return modifiedCode;

  }

  async checkSubmissionStatus(tokens: string) {
    let results = [];
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
    console.log(results)
    return results; // Return the final result
  }
}
