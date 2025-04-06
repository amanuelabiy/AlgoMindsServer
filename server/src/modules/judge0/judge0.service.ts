import axios from "axios";
import { CodeSubmissionDto } from "../../common/interface/submissionDto";
import { config } from "../../config/app.config";
import { BadRequestException } from "../../common/utils/catch-errors";
import { submissionSchema } from "../../common/validators/submission.validator";

export class Judge0Service {
  public async submitCode(submissionData: CodeSubmissionDto) {
    const { sourceCode, languageId, testCases } = submissionData;

    if (!testCases) {
      throw new BadRequestException("No test cases found for this problem.");
    }

    const submissions = testCases.map((testCase) => ({
      source_code: sourceCode,
      language_id: languageId,
      stdin: testCase.input,
      expected_output: testCase.output,
      callback_url:
        config.JUDGE0_CALLBACK_URL ??
        `http://localhost:${config.PORT}/api/v1/judge0/callback`,
    }));

    const response = await axios.post(
      `${config.JUDGE0_API_BASE_URL}/submissions/batch?base64_encoded=false&wait=false`,
      {
        submissions,
      },
      { headers: config.JUDGE0_HEADERS }
    );

    return response.data;
  }

  public async handleCallback(data: any) {
    const decodedStdout = data.stdout
      ? Buffer.from(data.stdout, "base64").toString("utf-8")
      : "No output";
    const decodedStderr = data.stderr
      ? Buffer.from(data.stderr, "base64").toString("utf-8")
      : "No error";
    console.log(decodedStdout);
    console.log("Error: ", decodedStderr);
    console.log("------------------------------");
  }
}
