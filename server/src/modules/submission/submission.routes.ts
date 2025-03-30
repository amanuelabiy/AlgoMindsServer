import { Router } from "express";
import { submissionController } from "./submission.module";

const submissionRoutes = Router();

submissionRoutes.post("/submit-code", submissionController.submitCode);

export default submissionRoutes;
