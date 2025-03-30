import { Router } from "express";
import { judge0Controller } from "./judge0.module";

const judge0Routes = Router();

judge0Routes.put("/callback", judge0Controller.handleCallback);

export default judge0Routes;
