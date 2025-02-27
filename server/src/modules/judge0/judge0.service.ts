import axios, { AxiosRequestHeaders } from "axios";
import { config } from "../../config/app.config";

export class Judge0Service {
   async submitCode(sourceCode: string, languageId: number, stdin?: string) {
    try {
      const response = await axios.post(`${config.JUDGE0_API_BASE_URL}/submissions`, {
        source_code: sourceCode,  // ✅ Send as raw text (NOT Base64)
        language_id: languageId,
        stdin: stdin ? Buffer.from(stdin).toString("base64") : null,  // Keep Base64 for stdin
        expected_output: null,
        redirect_stderr_to_stdout: true,
      }, { headers: config.JUDGE0_HEADERS  });

      return response.data.token;
    } catch (error) {
      throw new Error(`Error submitting code: ${error}`);
    }
  }

   async getSubmissionResult(token: string) {
    try {
      const response = await axios.get(`${config.JUDGE0_API_BASE_URL}/submissions/${token}`, {
        headers:  config.JUDGE0_HEADERS ,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching submission result: ${error}`);
    }
  }
}
