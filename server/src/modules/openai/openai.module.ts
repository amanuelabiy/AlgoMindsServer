import { problemService } from "../problem/problem.module";
import { OpenAIController } from "./openai.controller";
import { OpenAIService } from "./openai.service";

const openaiService = new OpenAIService(problemService);
const openAIController = new OpenAIController(openaiService);

export { openAIController, openaiService };
