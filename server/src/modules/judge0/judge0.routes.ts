import { Router } from "express";
import { judge0Controller } from "./judge0.module";

const judge0Routes = Router();

judge0Routes.post("/run", judge0Controller.runSampleCode);
judge0Routes.post("/submit", judge0Controller.submitCode);

export default judge0Routes;
