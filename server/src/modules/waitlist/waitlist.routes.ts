import { Router } from "express";
import { waitListController } from "./waitlist.module";

const waitListRoutes = Router();

waitListRoutes.post("/add", waitListController.addToWaitList);

export default waitListRoutes;
