import { config } from "../../config/app.config";

export class Judge0Service {
  async submitCode(sourceCode: string, languageId: number, stdin?: string) {
    const response = await fetch(
      `${config.JUDGE0_API_BASE_URL}/submissions`,
      {
        method: "POST",
        headers: config.JUDGE0_HEADERS,
        body: JSON.stringify({
          source_code: sourceCode, // ✅ Send as raw text (NOT Base64)
          language_id: languageId,
          stdin: stdin ? Buffer.from(stdin).toString("base64") : null, // Keep Base64 for stdin
          expected_output: null,
          redirect_stderr_to_stdout: true,
        }),
      },
      
    );

    const result = await response.json();
    return result.token;
  }

  async getSubmissionResult(token: string) {
    try {
      const response = await fetch(
        `${config.JUDGE0_API_BASE_URL}/submissions/${token}`,
        {
          headers: config.JUDGE0_HEADERS,
        }
      );
      return response.json();
    } catch (error) {
      throw new Error(`Error fetching submission result: ${error}`);
    }
  }
}
