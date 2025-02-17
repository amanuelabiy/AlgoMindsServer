import { VerificationCode } from "@prisma/client";
import { CreateVerificationCodeDto } from "../../common/interface/verificationCode";
import { VerificationCodeRepository } from "./verificationCode.repository";

export class VerificationCodeService {
  private readonly verificationCodeRepository: VerificationCodeRepository;

  constructor(verificationCodeRepository: VerificationCodeRepository) {
    this.verificationCodeRepository = verificationCodeRepository;
  }

  public async createVerificationCode(
    verificationCodeData: CreateVerificationCodeDto
  ): Promise<VerificationCode> {
    return this.verificationCodeRepository.createVerificationCode(
      verificationCodeData
    );
  }
}
