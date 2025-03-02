import { userService } from "../user/user.module";
import { WaitListController } from "./waitlist.controller";
import { WaitListRepository } from "./waitlist.repository";
import { WaitListService } from "./waitlist.service";

const waitListRepository = new WaitListRepository();
const waitListService = new WaitListService(waitListRepository, userService);
const waitListController = new WaitListController(waitListService);

export { waitListService, waitListController };
