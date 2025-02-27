import { ProblemController } from "./problem.controller";
import { ProblemRepository } from "./problem.repository";
import { ProblemService } from "./problem.service";

const problemRepository = new ProblemRepository();
const problemService = new ProblemService(problemRepository);
const problemController = new ProblemController(problemService);
export { problemController, problemService };
