import { Router } from "express";
import { problemController } from "./problem.modue";


const problemRoutes = Router();

problemRoutes.get("/:id", problemController.getProblem);


export default problemRoutes;