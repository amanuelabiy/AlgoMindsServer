import { userService } from "../user/user.module";
import { SessionController } from "./session.controller";
import { SessionRepository } from "./session.repository";
import { SessionService } from "./session.service";

const sessionRepository = new SessionRepository();
const sessionService = new SessionService(sessionRepository, userService);
const sessionController = new SessionController(sessionService);

export { sessionService, sessionController };
