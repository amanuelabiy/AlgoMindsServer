import { sessionService } from "../session/session.module";
import { userService } from "../user/user.module";
import { MfaController } from "./mfa.controller";
import { MfaService } from "./mfa.service";

const mfaService = new MfaService(userService, sessionService);
const mfaController = new MfaController(mfaService);

export { mfaService, mfaController };
