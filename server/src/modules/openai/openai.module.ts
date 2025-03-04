import { ProblemRepository } from "../problem/problem.repository";
import { ProblemService } from "../problem/problem.service";
import { OpenAIController } from "./openai.controller";
import { OpenAIService } from "./openai.service";

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);
const openaiService = new OpenAIService(problemService);

const openAIController = new OpenAIController(openaiService);

export { openAIController, openaiService };
