import axios from "axios";
import { CodeSubmissionDto } from "../../common/interface/submissionDto";
import { config } from "../../config/app.config";

export class Judge0Service {
  public async submitCode(data: CodeSubmissionDto) {
    const { sourceCode, languageId, problemId } = data;

    const response = await axios.post(
      `${config.JUDGE0_API_BASE_URL}/submissions/batch?base64_encoded=false&wait=false`,
      {
        submissions: [
          {
            source_code: sourceCode,
            language_id: languageId,
            callback_url:
              config.JUDGE0_CALLBACK_URL ??
              `http://localhost:${config.PORT}/api/v1/judge0/callback`,
          },
        ],
      },
      { headers: config.JUDGE0_HEADERS }
    );

    console.log("Judge0 Response:", response.data);

    return response.data;
  }

  public async handleCallback(data: any) {
    console.log("Judge0 Callback hit!");
  }
}
