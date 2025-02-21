import { userService } from "../user/user.module";
import { MfaController } from "./mfa.controller";
import { MfaService } from "./mfa.service";

const mfaService = new MfaService(userService);
const mfaController = new MfaController(mfaService);

export { mfaService, mfaController };
