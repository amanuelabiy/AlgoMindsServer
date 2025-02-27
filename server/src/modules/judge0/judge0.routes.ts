import { Router } from "express";
import { judge0Controller } from "./judge0.module";


const judge0Routes = Router();

judge0Routes.post("/submit", judge0Controller.submitCode);
judge0Routes.get("/result/:token", judge0Controller.getSubmissionResult);

export default judge0Routes;
