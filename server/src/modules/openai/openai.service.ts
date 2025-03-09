import { OpenAI } from "openai";
import { getEnv } from "../../common/utils/get-env";
import { config } from "../../config/app.config";
import { ProblemRepository } from "../problem/problem.repository";
import { ProblemService } from "../problem/problem.service";
// Initialize with your API key
const openai = new OpenAI({
  apiKey: config.OPEN_API_KEY,
});
export class OpenAIService {
  constructor(private problemService: ProblemService) {}
  public async CreateTestCases(
    problem_id: string,
    language: string
  ): Promise<string> {
    const prompt = `Solution: ${this.problemService.getSolutionByLanguage(
      problem_id,
      language
    )},
    Problem Description: 
     ${getEnv("OPENAI_TESTCASE_PROMPT")}`;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // or whichever model your version supports
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      });
      console.log("My prompt:", response);

      const messageContent = response.choices[0].message.content;
      console.log("Generated content:", messageContent);

      // Adjust based on your response structure
      const content = response.choices[0].message.content;
      if (content === null) {
        throw new Error("Received null content from OpenAI response");
      }
      return content;
    } catch (error) {
      console.error("Error running prompt:", error);
      throw error;
    }
  }
}
