import { Router } from "express";
import { submissionController } from "./submission.module";


const submissionRoutes = Router();

submissionRoutes.post("/:submission/:userId/:problemId", submissionController.submitSubmission);

// retrieve submission id for the specific USER
submissionRoutes.get("/:submissionid/:userid" , submissionController.getSubmission);

export default submissionRoutes;