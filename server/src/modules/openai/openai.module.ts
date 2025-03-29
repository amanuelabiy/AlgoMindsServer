import { OpenAIController } from "./openai.controller";
import { OpenAIService } from "./openai.service";

const openaiService = new OpenAIService();
const openAIController = new OpenAIController(openaiService);

export { openAIController, openaiService };
