import { VerificationCode } from "@prisma/client";
import {
  CreateVerificationCodeDto,
  FindByCodeAndTypeDto,
} from "../../common/interface/verificationCode";
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

  public async findByCodeAndType(
    data: FindByCodeAndTypeDto
  ): Promise<VerificationCode | null> {
    return this.verificationCodeRepository.findByCodeAndType(data);
  }

  public async deleteVerificationCodeById(
    id: string
  ): Promise<VerificationCode> {
    return this.verificationCodeRepository.deleteVerificationCodeById(id);
  }
}
