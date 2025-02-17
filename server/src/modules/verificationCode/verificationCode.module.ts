import { VerificationCodeRepository } from "./verificationCode.repository";
import { VerificationCodeService } from "./verificationCode.service";

const verificationCodeRepository = new VerificationCodeRepository();
const verificationCodeService = new VerificationCodeService(
  verificationCodeRepository
);

export { verificationCodeService };
