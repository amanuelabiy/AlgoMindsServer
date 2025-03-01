import { WaitListRepository } from "./waitlist.repository";
import { WaitListService } from "./waitlist.service";

const waitListRepository = new WaitListRepository();
const waitListService = new WaitListService(waitListRepository);

export { waitListService };
