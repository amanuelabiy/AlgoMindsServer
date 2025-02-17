import { SessionRepository } from "./session.repository";
import { SessionService } from "./session.service";

const sessionRepository = new SessionRepository();
const sessionService = new SessionService(sessionRepository);

export { sessionService };
