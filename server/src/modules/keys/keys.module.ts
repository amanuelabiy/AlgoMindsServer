import { userService } from "../user/user.module";
import { KeysController } from "./keys.controller";
import { KeysRepository } from "./keys.repository";
import { KeysService } from "./keys.service";

const keysRepository = new KeysRepository();
const keysService = new KeysService(keysRepository, userService);
const keysController = new KeysController(keysService);

export { keysController, keysService };
