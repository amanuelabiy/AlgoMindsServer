import { Judge0Service } from "./judge0.service";
import { Judge0Controller } from "./judge0.controller";

const judge0Service = new Judge0Service();
const judge0Controller = new Judge0Controller(judge0Service);

export { judge0Controller, judge0Service };